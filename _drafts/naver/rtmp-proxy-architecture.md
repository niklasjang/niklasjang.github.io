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




1. TCP 기반으로한 RTMP 프로토콜 사용
    - 구체화 필요
    
1. Thread
    - controlServerThread
    - clientThread class
    - serverThread class
1. 