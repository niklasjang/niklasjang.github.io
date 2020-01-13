2020-01-08

1. run proxy server 
1. TCP connection
    1. publisher와 proxy server의 주소 확인
    2. handshake (c0,c1,c2 / s0,s1,s2)
    3. 세선 생성
1. create stream
1. publish
    1. 멀티미디어 raw data 생성
    1. set chunk size
    1. raw data fragmentation (chunking)
    3. raw data chunk -> H264
    4. H264 -> FLV
    5. HLV -> rtmp
1. proxy server rtmp packet 수신


=============================================================
2020-01-09


<!-- 1. pub  -> prox     : data 전달 -->
<!-- 1. prox -> media    : data 전달 -->

===============================================================
1. 전처리
    1. argc, argv 처리
    1. **signal()?**
1. controlServerThread 생성 : 'q' 입력 받아서 종료. **TFRET()??**
1. startStreaming()
    1. socket 생성 / setsockopt / bind / listen test
    1. Create serverThread / server state ?= STREAMING_ACCEPTING
1. doServe()
    1. RTMP_Alloc()
    1. **FD_SET()?**
    1. RTMP_init()
    1. RTMP_serve()
        <!-- 1. pub  -> prox     : 연결 시도 -->
        <!-- 1. prox -> LIP      : media server addr 요청 -->
        <!-- 1. LIP              : media server instance 생성 -->
        <!-- 1. LIP  -> prox     : medis server addr 전달 -->
        <!-- 1. prox -> media    : 연결 시도 -->
        <!-- 1. prox -> media    : 연결 완료 -->
        <!-- 1. prox -> pub      : 연결 완료 -->
        1. handshake()
    1. RTMP_IsConnected & RTMP_ReadPacket()
        1. RTMPpacket_IsReady
        1. ServePacket
            1. packetType switching
            1. ServeInvoke
                1. packet에서 body 추출
                1. body -> AMF object 추출. AMF_decode() [SPEC 24PAGE 7.1.1]
                1. AMF object에서 command message 추출
                1. command message switching, AVMATCH() [SPEC 29PAGE]
                    1. connect
                        1. AMFProps 처리
                        1. **SendConnectResult()**
                    <!-- 1. pub              : createStream 전달 -->
                    1. create stream
                        1. **SendResultNumber()**
                    1. play 
                        1. **RTMP_SendCtrl()**
                        1. **SendPlayStart()**
                        1. **RTMP_SendCtrl()**
                        1. **SendPlayStop()**
                    1. ***NetStream_Anthenticate_usherToken?**
                1. cleanup code AMF_Reset();
        1. RTMPPacket_Free
        1. cleanup code
<!-- 1. streaming server end -> TFRET() -->
1. CleanupSockets() / fclose() 
