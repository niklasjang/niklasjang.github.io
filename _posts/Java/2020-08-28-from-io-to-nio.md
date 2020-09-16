---
title: "[Java] I/O에서 New I/O로의 흐름"
excerpt: "멀티쓰레드 구조와 Selector를 통한 성능향상"
date: 2020-08-28
categories:
  - Java
tags:
  - java
  - jsp

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

# Java I/O

New I/O(이하 nio)이전의 io는 모두 blocking으로 동작한다. `Socket socket = serverSocket.accept();`,
`in = socket.getInputStream(); len = in.read(buff);` 모두 동작 중에 blocking이 된다. 이 구조에서는 성능 문제가 있어
client 마다 thread를 생성해서 1 대 1 대응을 했다. 이러한 모델에서는 client가 많아지면 관리해야하는 thread가 많아져서 성능
향상의 한계점이 명확하다.  

이를 일차적으로 해결하는 방법이 Polling이다. `Socket socket = serverSocket.accept();`으로 생성되는 client와 연결되는 
socket을 socketList에 저장하고, 각 thread가 특정 수의 socketList에 대응하는 형태를 가진다. 여기에 더해 thread pool을 적용하면
이전보다는 성능은 향상되지만 여전히 문제점이 있다. 바로 `in = socket.getInputStream(); len = in.read(buff);`에서 read()가
blocking된다는 것이다. 이를 위해서 java 1.4에서 non-blocking read가 추가되었다.  

# Java New I/O

## Selector::accept만 non-blocking

논블럭킹 모드인 경우  
- 클라이언트의 연결 요청이 없을 경우 ServerSocketChannel.accept() 메소드는 곧바로 null을 리턴한다.
- 채널로부터 읽어올 데이터가 없는 경우 SocketChannel.read() 메소드는 곧바로 리턴되며, 인자로 전달한 ByteBuffer에는 어떤 내용도 입력되지 않는다.  

socketChannel을 non-block으로 사용하기 위해서는 아래와 같이 `socketChannel.configureBlocking(false);`를 지정해주면 된다. 

```java
while(true) {
    SocketChannel socketChannel = serverChannel.accept();
    // 소켓채널 논블럭킹 모드 지정
    socketChannel.configureBlocking(false); 
    socketList.addSocket(socketChannel);
    ...
    ...
}
```  

이렇게하면 socketList에 대응하는 thread에서 read를 해도 block 되지 않는다.  

```java
while(true) {
    Thread.sleep(100); // 0.1초간 대기
    
    for (int i = 0 ; i < socketList.size() ; i++) {
        // 클라이언트의 요청을 차례대로 처리
        SocketChannel socket = socketList.getSocket(i);
        
        buffer.clear();
        socket.read(buffer); // 블럭킹 되지 않음
        if (buffer.position() > 0) {
            ... // 소켓에서 읽어온 데이터 처리
        }
    }
}
```  

그런데 위 코드에서 `SocketChannel socketChannel = serverChannel.accept();`가 non-block으로 수행되어 임의의 시간에 접속하는 client에 빠르게 대응할 수는 있지만, while loop을 돌면서 cpu time을 소모하기 때문에 불필요한 cpu 사용량이 증가한다. 이를 막기 위해서 **non-block을 지원하는 channel에서** Selector를 등록할 수 있는 메서드 register를 지원한다.  

먼저 객체를 생성할 때 #.open()를 호출하는 nio의 특성에 따라 `Selector selector = Selector.open();`을 수행한다. 그리고 channel이 생성되면 이 selector에 channel을 등록한다.  

```java
ServerSocketChannel ssc = null;
  ..
  try {
    ssc = ServerSocketChannel.open();
    ssc.blockingConfigure(false);
    
    Selector selector = Selector.open();
    
    ssc.register(selector, SelectionKey.OP_ACCEPT, null);
    
    ...
  } catch(..) {
    ...
  }
```

selector에 등록 후 이벤트가 발생한 채널을 찾아서 로직을 수행하는 과정은 아래와 같이 진행된다.  

```java
// 1. Selector 생성   Selector selector = Selector.open();   
// 2. Selector를 등록할 수 있는 채널 생성
ServerSocketChannel channel = ServerSocketChannel.open();
...
// 3. 채널에 Selector 등록
channel.register(selector, SelectionKey.OP_ACCEPT, null);
...

while(true) {
// 4. selector를 이용하여 채널의 이벤트 대기
  int readyKey = selector.readyOps();

// 5. readyKey가 0 이상이면 이벤트가 발생한 것으로 처리
  if (readyKey > 0) {

// 6. selector로부터 채널에서 발생한 이벤트와 관련된 SelectionKey Set 구함
      Set selectionKeySet = selector.selectedKeys();

// 7. Set에서 각 SelectionKey를 차례대로 읽어와
      Iterator iter = selectionKeySet.iterator();
      while(iter.hasNext()) {
        SelectionKey selectionKey = (SelectionKey)iter.next();
        
// 8. SelectionKey로부터 채널을 구함
        ServerSocketChannel relatedChannel =
            (ServerSocketChannel)selectionKey.channel();
        
// 9. 채널을 사용하여 알맞은 작업 수행
        ...
      }
  }
}
```  

accept는 해결되었지만 여전히 문제점이 존재한다. 아래에서 등록하는 selector는 ServerSocketChannel이 등록되는 accept selector이다. 위 코드 3번에서 accept selector에 ServerSocketChannel을 등록 후, 4~8번을 동해서 client와 연결된 socketchannel을 구할 수 있다. 그런데 9번 채널을 사용하여 알맞은 작업을 수행하느 과정을 일반적으로 다른 accept를 수행하는 Thread와 다른 thread에서 수행된다. 이 때 thread는 cpu의 core만큼 생성되서 thread pool을 이룬다. thread pool 속의 단일 thread들은 각자가 관리하는 socketchannel list가 있다. 그리고 이들 channel에 데이터가 도착했을 때 return되는 read selector를 가지고 있어야 한다. 바로 이 시점에서 accpet selector에는 register된 이후 read selector에는 등록되기 이전에 데이터가 들어오면 read selector는 이를 알 수가 없어 계속 block 상태에 존재한다. 따라서 accept selector에 register 이후 read selector를 return시켜주는 read-selector.wakeup()이 필요하다.  

간단히 설명하면  

1. ServerSocketChannel thread에서 accept 이후 socketchannel을 channelQueue에 등록
1. ClientProcessor.processSocketChannelQueue에서 ClientProcessor.readSelector에 register
1. ClientProcessor.processRequest의 readSelector가 이벤트를 기다리고 있는 시점에서 1번이 수행되면 새로운 socketchannel은 readSelector에 등록되지 못함
1. 따라서 1번에서 channelQueue에 socketchannel을 add하고 ClientProcessor.readSelector를 wakeup 시켜줘야함.
1. 이를 위해서 ServerSocketChannel thread에서 channelQueue를 생성할 때 ClientProcessor가 `this.channelQueue.setReadSelector(readSelector);`를 할 수 있도록 구현해둠.
1. 그러면 ServerSocketChannel thread는 channelQueue에 channel add 이후 `readSelector.wakeup();`를 호출

```java
public class ClientProcessor extends Thread {
    private SocketChannelQueue channelQueqe
    private Selector readSelector;
    ... 

    public ClientProcessor(SocketChannelQueue channelQueue, File rootDirectory)
    throws IOException {
        this.channelQueue = channelQueue;
        ...
        readSelector = Selector.open();
        this.channelQueue.setReadSelector(readSelector);
    }

    public void run() {
        while(true) {
          try {
              processSocketChannelQueue();
              int numKeys = readSelector.select();
              if (numKeys > 0) {
                processRequest();
              }
          } catch (IOException e) {
          }
        }
    }
    
    private void processSocketChannelQueue() throws IOException {
        SocketChannel socketChannel = null;
        while ( (socketChannel = channelQueue.getFirst()) != null) {
          socketChannel.configureBlocking(false);
          socketChannel.register( readSelector, SelectionKey.OP_READ, new StringBuffer());
        }
    }
    
    private void processRequest() {
        Iterator iter = readSelector.selectedKeys().iterator();
        while( iter.hasNext() ) {
          SelectionKey key = (SelectionKey)iter.next();
          iter.remove();
          
          SocketChannel socketChannel = (SocketChannel)key.channel();
          
          try {
              socketChannel.read(readBuffer);
              readBuffer.flip();
              String result = iso8859decoder.decode(readBuffer).toString();
              StringBuffer requestString = (StringBuffer)key.attachment();
              requestString.append(result);
                
              readBuffer.clear();
              
              if(result.endsWith("\n\n") || result.endsWith("\r\n\r\n")) {
                completeRequest(requestString.toString(), socketChannel);
              }
          } catch (IOException e) {
              // 에러 발생
          }
        }
    }
```

## AsynchronousServerSocketChannel::데이터 처리되는 부분도 non-blocking

- [AsynchronousServerSocketChannel](https://docs.oracle.com/javase/7/docs/api/java/nio/channels/AsynchronousServerSocketChannel.html)

Usage Example:  

```java
final AsynchronousServerSocketChannel listener =
    AsynchronousServerSocketChannel.open().bind(new InetSocketAddress(5000));

listener.accept(null, new CompletionHandler<AsynchronousSocketChannel,Void>() {
    public void completed(AsynchronousSocketChannel ch, Void att) {
        // accept the next connection
        listener.accept(null, this);

        // handle this connection
        handle(ch);
    }
    public void failed(Throwable exc, Void att) {
        ...
    }
});
```

- [tutorial](https://examples.javacodegeeks.com/core-java/nio/channels/asynchronoussocketchannel/java-nio-channels-asynchronoussocketchannel-example/)