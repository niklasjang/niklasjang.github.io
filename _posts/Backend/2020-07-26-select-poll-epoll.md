---
title: "[Backend] select, poll, epoll 구조"
excerpt: ""
date: 2020-07-26
categories:
  - Backend
tags:
  - backend
  - WAS
  - web server
toc : false
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## select

한줄로 표현하면, fd_set을 만들어 그 set에 속한 fd 중 하나라도 입력이 들어오면 블럭상태가 해제되고 원하는 루틴을 수행할 수 있다.

### select:: 동작 과정

싱글쓰레드로 다중 IO를 처리하는 대표적인 방법이다. select는 많은 fd를 한 번에 관찰하는 FD_SET 구조체를 사용하여 빠르고 간편하게 유저에게 fd의 상황을 알려준다. FD_SET을 통해서 fd가 IO 할 준비가 되었는지 알 수 있기 때문에, fd가 할당받은 커널buffer에 데이터를 복사해주기만 하면 된다.  

FD_SET은 fd의 상태를 하나의 비트로 표현한다. fd의 번호는 고유하기 때문에 fd의 번호를 인덱스로하여 해당 비트가 어떤 값을 가지고 있느냐에 따라서 준비상황을 통지받을 수 있다.  

먼저 fd의 번호를 FD_SET에 등록하면 해당 비트의 값이 1로 설정된다. 그리고 IO 준비가 되면 SELECT를 통해서 해당 비트의 값을 갱신하고 프로세스는 변경된 값만 보고 커널 버퍼에 데이터를 복사하면 된다.  

### select :: 세부 사항

FD의 개수가 계속해서 바뀔 수 있으므로, 전체 fd의 개수를 저장하는 변수가 필요하다. 그리고 select()의 인자로 넘긴 FD_SET은 값이 변경되기 때문에 관차할 FD의 목록이 바뀌지 않는다면, 값이 변하기 전에 복사해준 FD_SET을 매번 다시 전달한다.  

### select :: 한계

검사할 수 있는 fd 최대 갯수가 1024개로 제한된다. 그리고 IO할 준비가 된 fd들에 대해서만 recv()를 호출하기 위해서 모든 fd를 순회하면서 FD_ISSET으로 체크하는 비효율이 존재한다. 관리하는 FD 목록 전체를 전달하는 것이 아니라 실제로 변화된 fd의 목록만 전달한다면 더 빠르게 동작할 수 있을 것이다.  

또, 프로세스가 커널에게 직접 상황 체크를 요청해야 한다. 프로세스가 커널의 상황을 지속적으로 확인해야 하고 커널은 이에 대응하는 형태로 구성되어 있다. 프로세스와 커널이 서로 동기화 되어 정보를 주고 받는 형태이다. 따라서 `동기형 통지방식`이라고도 부른다.  

### select :: blocking/non-blocking

select 자체는 IO를 담당하지 않고 timeout에 따라서 blocking/non-blocking 형태가 결정된다. timeout을 설정하지 않으면 관찰 대상이 변경되지 않는 이상 반환되지 않기 때문에 blocking 함수가 된다. timeout 시간이 설정되면 주어진 시간이 지나면 시간이 다 되었다는 정보를 반환하므로 non-blocking 함수가 된다.  

간단한 채팅서버의 경우를 살펴보자. 서버가 어떠한 일을 해야 하는 시점은 이용자 누군가가 데이터를 보내왔을 때인데, 아무도 아무 말도 하지 않는다면 서버는 굳이 프로세싱을 할 이유가 없다. 이럴 때 timeout을 (-1)로 지정해두고 이용자들의 입력이 없는 동안 운영체제에 프로세싱 타임을 넘기도록 한다.  

온라인게임(특히 MMORPG)의 경우에는 이용자의 입력이 전혀 없는 도중이라도, 몬스터에 관련된 처리, 적절한 저장, 다른 서버와의 통신들을 해야 하므로 적절한 timeout을 지정해 주도록 한다.  

별도 thread를 구성하여 이 thread 가 입출력을 전담하도록 프로그램을 작성하고자 하는 경우에는 당연히 timeout을 (-1)로 설정하여 남는 시간을 다른 thread, 혹은 운영체제에 돌려 주도록 한다.  

## poll

한줄로 표현하면, 각각의 fd마다 이벤트를 지정해줄 수 있다. 하지만 select와 마찬가지로 fd_set 모두에 대해서 준비된 fd를 찾는다. 

## epoll

```c
//epoll_event 구조체
typedef union epoll_data {
  void *ptr;
  int fd;
  __uint32_t u32;
  __uint64_t u64;
} epoll_data_t;

struct epoll_event {
  __uint32_t events; /* Epoll events */
  epoll_data_t data; /* User data variable */
};

int EpollAdd(const int fd)
{
  struct epoll_event ev;
  ev.events = EPOLLIN | EPOLLOUT | EPOLLERR;
  ev.data.fd = fd;
  return epoll_ctl(fd_epoll, EPOLL_CTL_ADD, fd, &ev);
}
```

```c
#define MAX_EVENTS 100 // 최대 100개를 한번에 처리할 것이다.

struct epoll_event events[MAX_EVENTS];
int nfds, n;
for(;;){
  // 발생한 사건의 갯수를 얻어낸다. 0인 경우는 아무 일도 발생하지 않은 것
  nfds = epoll_wait(fd_epoll, events, MAX_EVENTS, 10);
  if(nfds < 0) {
    // critical error
    fprintf(stderr, "epoll_wait() error : %s\n", strerror(errno));
    exit(-1);
  }
  // 아무 일도 일어나지 않았다.
  if(nfds == 0){
    // idle
    continue;
  }
  for(n=0; n < nfds; ++n) 
    OnEvent(&events[n]);
}

int OnEvent(const struct epoll_event *event)
{
  int nread;
  char buf[1024];
  if( event->events & EPOLLIN ){
    nread = read(event->data.fd, buf, 1024);
    if( nread < 1){
      fprintf(stdout, "nread returns : %d\n", nread);
    } else {
      fprintf(stdout, "data : %s\n", buf);
      buf[0] = 0;
    }
  }
  if( event->events & EPOLLOUT){
    //
  }
  if( event->events & EPOLLERR){
    return 1;
  }
}
```

1. epoll_create()를 통해서 epoll 객체를 만든다.
1. epoll_ctl()에게 epoll fd, 등록할 fd를 전달하면서 fd등록/fd삭제/이벤트 발생상황 변경에 대한 설정을 진행한다. 
1. epoll_wait()에게 epoll fd, epoll events 주소, timeout을 전달하여 이벤트가 발생한 fd와 이벤트의 종류를 return 받는다. 

epoll_wait() 덕분에 모든 fd에 대해서 순회하면서 체크할 필요가 없다. 이벤트가 있는 fd들이 배열에 담겨오고 그 갯수를 알 수 있으니 꼭 필요한 event만 순회하면서 처리할 수 있다는 장점이 있다.  

## epoll events

| event | 의미 |
|:-----|:-----|
| EPOLLIN | 수신할 데이터가 존재하는 상황 |
| EPOLLOUT | 출력버퍼가 비워져서 당장 데이터를 전송할 수 있는 상황 |
| EPOLLERR | 에러가 발생한 상황 |
| EPOOLET | 이벤트의 감지를 엣지 트리거 방식으로 동작 |
| EPOOLONESHOT | 이벤트가 한 번 감지되면, 해당 fd에서는 더 이상 이벤트를 발생시키지 않는다. 따라서 epool_ctl 함수의 두 번째 인자로 EPOOL_CTL_MOD를 전달해서 이벤트를 재설정해야 한다. |

