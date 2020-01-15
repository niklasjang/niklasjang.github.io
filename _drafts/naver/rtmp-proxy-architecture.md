## RTMP Basic Server Architecture

1. main()
    - argv 처리
    - controlServerThread 생성
    - startStreaming() 후 return 으로 rtmpServer->State 받음
    - rtmpServer->state != STOPPED면 sleep() 1초
    - return : == STOPPED면 CleanupSockets() 이후 return RTMP_SUCCESS
1. startStreaming()
    - TCP 소켓 생성 - setsockopt - bind - listen 
    - TCP 소켓의 fd 전달하면서 TreadCraete() 호출
    - return : rtmpServer calloc 후 rtmpserver에 sockfd 넣고 return rtmpServer (main의 state는 생성시 !=STOPPED인듯)
1. ThreadCreate()
    - Thread Function serverThread(), rtmpServer 전달 받아서 
    - pthread init
    - pthread create
    - retrun pthread id
1. serverThread()
    - server->state에 따른 분기
    - server->state == STREAMING_ACCEPTING 이면 doServe(server, sockfd)
    - STREAMING_STOPPED면 TFRET(); 종료
1.  doServe(server, sockfd);
    - select로 원하는 fd에서 이벤트 확인
    - RTMP_Init()
    - RTMP_Server()
    - RTMP_IsConnected() && RTMP_ReadPacket()
    - ServePacket()
    
## RTMP Relay Server

1. [stream 마다 멀티프로세스](https://www.guru99.com/difference-between-multiprocessing-and-multithreading.html)
    - CPU를 추가함으로써 컴퓨팅 파워를 증가시킬 수 있다.
    - 직관적인 코드로 개발 시간이 줄어들 것이다.
    - stream 마다 프로세스를 할당함으로써 stream에 문제가 생겼을 때 해당 stream만 reboot하면 된다.
    - multi media 데이터의 크기가 커짐에 따라서 stream마다 프로세스를 만드는 것이 성능면에서 좋을 것이라고 판단했다.
    - stream간 통신 즉, IPC는 잘 사용되지 않을 것으로 생각했다.
    - 특정 프로세스에 우선순위를 줄 수 있어 특이점에 대응이 가능하다.
1. stream 내부에서 멀티쓰레딩
    - 같은 주소 공간을 공유하기 때문에 server/client thread 설계에 효과적이다.



## Class Diagram 설명

## RRSession
1. 서버의 ip/port 등의 정보를 저장한다.
1. 클라의 ip/port 등의 정보를 저장한다.

## RRStream
1. RRStream은 RRSession을 포함한다.
1. fromSessList는 RRServer에 연결을 시도하는 클라와 RRServer의 정보를 저장한다.
1. toSessList는 RRServer가 연결을 시도하는 서버와 RRServer의 정보를 저장한다.
1. fromSessList[0]는 publisher와 proxy server의 session이다.
1. toSessList[0]는 proxy server와 처음으로 연결된 relay server의 session이다.
1. RRRest clntRest 객체를 통해서 연결할 relay instance의 주소를 요청할 수 있다.
1. 요청받은 RRRestOut 객체를 통해 relay instance와 session을 만들어 stream을 생성한다.
1. 하나의 RRBuffer 객체를 갖는다.
1. accmDataThread를 생성하고 fromSessList[0]로부터 데이터를 받아서 RRBuff에 채운다.
1. relayDataThread를 생성해서 toSessList들에게 데이터를 relay한다.
1. RRRestOut 객체를 전달받아 stream/session을 생성 및 중단할 수 있다.
1. 위의 진행상황에 대한 state를 반환받아 저장한다.
    1. RR_STATE_
## RRBuffer
1. RRBuffer 객체는 하나의 char형 버퍼를 갖는다.
1. 이 버퍼는 RRStream에서 accmDataThread와 relayDataThread에 의해서 채워지고 비워진다.
1. 두 개의 쓰레드의 동시 접근을 막기 위해서 mutex를 사용한다.

## RRServe
1. RRServe 프로세스의 종료를 관리하는 controlThread를 생성한다.
1. 소켓을 열어 publisher의 연결 요청을 기다린다.
1. publisher와 session이 만들어지면 Stream을 만들기를 시도한다.
1. 만들어진 stream의 정보를 list로 저장한다
1. RRRest servRest 통해서 특정 stream에 대한 요구 사항이 전달되면 해당 stream에 RRRestOut 객체를 전달한다.

## RRLog
1. 모든 진행 과정은 thread safe한 single-ton RRLog instance를 통해서 출력된다.


