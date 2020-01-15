

# 3. Terminology
1. `payload` : 패킷 안의 데이터
2. `packet` : fixed header + payload data
3. `port` : 통신 프로토콜이 host computer에서 여러 목적지를 구별하기 위해 사용하는 요약정보
4. `transport address` : n/w 주소 + port. transport level의 endpoint를 식별하기 위해서 사용. 예 : IP address + TCP port
5. `message stream` : msg가 흐를 때 논리적인 커뮤니케이션 채널
6. `message stream ID` : 각각의 msg는 flow 안에서 msg stream를 식별하기 위한 식별자가 있다.
7. `chunk` : a fragment of msg. 메시지는 작은 조각으로 쪼개지고 n/w에 보내지기 전에 interleaved 된다. chunk는 모든 msg가 timestamp 순서대로 end to end로 전송되는 것을 보장한다.
8. `chunk stream` : chunk들이 특정 방향으로 흐르도록 허용하는 논리적인 커뮤니케이션 채널
1. `multiplxing` : 비디오/오디오 데이터를 동등한 stream으로 만듦으로써 여러 개의 비디오/오디오를 동시에 전송할 수 있도록 만드는 과정
1. `demultiplxing` : 비디오와 오디오를 interleaved 해서 stream을 다시 data로 만드는 과정
1. `Remote Procedure Call (PRC)` : 클라와 서버가 peer end에서 서브 루틴을 돌리 수 있도록 하는 것
1. `metadata` : data의 description
1. `application instance` : 클라가 서버에게 연결요청을 보낸 어플리케이션의 instance
1. `Action Message Format (AMF)`: compact 한 binary format. ActionScript object graphs를 serialize하는데 사용한다. AMF는 0버전과 3버전이 있다.
1. `In-band protocal` : data msg와 control msg를 동일 대역/채널/포트 연결 상에서 같이 전송 ex) HTTP
1. `out-of-ban protocal` : data msg와 control msg를 다른 대역/채널/포트/연결에서 각각 전송 ex) HTTPS 
1. `opaque` : interface 안에 명시는 되어 있지만 구체적인 structure는 정의되어 있지 않은 data type
1. `client` : 연결을 시작하는 end point
1. `epoch` : 어떤 연결이 시작될 때 timestamp_0는 0부터 시작해서 ms단위로 계속 증가할 것이다. 새로운 연결이 생긴다면 timestamp_1도 0부터 계속 증가할 것이다. 이것을 서로 다른 연결이 각각의 epoch를 갖는다고 표현한다. 

# 4. Byte Order & timestamp

## 4.1 Byte Order
1. 모든 정수 필드는 network byte order,  0byte가 먼저 도착, 0비트는 MSB. 즉 Big-endian

## 4.2 timestamp
1. ms 기준
1. 일반적으로는 0으로 시작하지만 endpoints간에 합의를 했다면 다른 epoch를 사용(0이 아닌 다른 값을 사용)할 수 있다.
1. 32bits 길이

# 5. RTMP Chunk Stream
1. `Multiplexing` + `packetizing`
2. TCP와 같이 사용될 때 여러 개의 stream에서 모든 msg의 RTMP chunk stream은 timestamp 순서대로 메시지가 도작하는 것이 보장됨.
3. `In-band protocal` 

## 5.1 Message Format
1. 메세지 포멧은 multiplexing의 과정을 통해서 chunk로 나눠지지만 아래의 사항들은 반드시 포함하고 있어야 한다.
1. `timestamp` : 4byte
1. `length` : msg payload의 길이. chunk header에서 3byte를 차지함.
1. `type id` : protocol control message를 위해서 예약된 다양한 type의 ID
1. `message stream id` : 임의의 값이 지정될 수 있암. 서로 다른 message들이 같은 chunk stream으로 multiplxed 되어도 message stream id를 통해서 각각의 stream으로 demultiplxing 될 수 있음. RTMP chunk stream에 대해서는 `opaque` 값이다. 

## 5.2 handshake

1. 3개의 static-sized chunks로 구성되어있다.
1. `client`와 서버는 각각 똑같은 3개의 chunks를 보낸다. (C0,c1,c2 / S0,s1,s2)

## 5.2.1. handshake sequence

1. client :
    1. c0와 c1를 보내면서 연결을 시작
    1. 서버의 s1 도착 이후 c2를 보내야 함.
    1. 서버의 s2 도착 이후 data를 보내야 함.
1. server : 
    1. 클라의 c0 도착 이후 s0[,s1]를 보내야 함.
    1. \[클라의 c1 도착 이후 s1를 보낼 수도 있음\]
    1. 클라의 c1 도착 이후 s2를 보내야 함.
    1. 클라의 c2 도착 이후 data를 보내야 함.

## 5.2.2. c0 and s0 format

1. c0와 s0 format은 single octet이다. single 8-bit integar field로 인식된다.
1. `version` : 8bit
    1. 클라가 c0를 통해서 RTMP 버전 요청을 보낸다.
    1. 서버는 s0를 통해서 자신이 선택한 RTMP 버전을 보낸다.
    1. 일반적으로 버전은 3이다. 클라가 요청한 버전에 응답할 수 없는 경우 서버는 버전 3으로 응답한다.
    1. 클라는 버전 3으로 degrade를 하거나 연결을 중단할 수 있다.

## 5.2.4 c1 and s1 format

1. c1과 s1는 1536 octet long이다. 
1. `time`: 4 byte
    1. timestamp를 포함하는 field이다. 이 값은 같은 endpoint로부터 보내질 모든 chunk들의 `epoch`로 사용되어야 한다.
    1. 이 값은 일반적으로 0으로 시작하지만 endpoint 간에 합의를 한다면 임의의 값일 수 있다.
1. zero : 4 byte
    1. 이 field는 반드시 모두 0이어야 한다.
1. Random data : 1528 byte
    1. 이 영역은 임의의 값을 가질 수 있다. 각각의 end point는 이미 시작된 handshake에 대한 응답인지, 아니면 또다른 handshake의 신호인지 구분하기 위해서 사용된다. 
    2. 암호화의 필요는 없다.

## 5.2.4. c2 and s2 format

1. c2와 s2는 1536 octet long으로 c1과 s1과 거의 비슷하다.
1. `time` : s1 또는 c1에서 상대방이 보냈던 timestamp를 반드시 포함해야 한다.
1. `time2` : This field must contain the timestamp at which the previous packet (s1 or c1) sent by the peer was read.

## 5.2.5. handshake diagram

1. SKIP

## 5.3. chunking

1. 핸드셰이킹 이후 연결이 되면, 한개 이상의 chunk stream이 multiplexing된다.
1. 각각의 chunk stream은 하나의 msg stream으로부터 하나의 type를 갖는다.
1. 각각의 chunk는 unique ID를 가지고 이를 `chunk stream ID`라고 부른다.
1. 각각의 chunk는 n/w를 통해서 보내질 때 반드시 full한 상태로 next chunk 전에 보내져야 한다.
1. 도착하는 end point 에서는 chunk stream ID를 통해서 다시 msg로 모아진다.
1. chunking은 큰 메시지를 작은 메세지들로 쪼개면서, 비디오와 같이  크기는 크지만 우선순위는 낮은 값이 오디오와 control처럼 우선순위가 높은 값을 block하는 것을 막는 역할을 한다.
1. 그리고 작은 데이터를 보냄으로써 overhead를 줄이는 효과가 있다.
1. chunk의 size는 `5.4.1절 set chunk size control message`에서 다룬다.
1. chunk size가 커지면 cpu 사용이 줄어들지만, large write가 커짐으로써 low bandwidth에서 지연이 생길 수 있다.

## 5.3.1. Chunk Format

1. `chunk header`
    1. `basic header` : 
        - `chunk stream ID`와 `chunk type`을 인코딩한다. 
        - chunk type은 인코딩된 `message header`를 결정한다. 
        - 이 부분의 크기는 전적으로 chunk stream ID에 의해서 결정된다. 
    1. `message header` 
    1. `extended timestamp`
        - chunk message header의 timestamp에 기반한 순환 주기를 가지고 주어지는 timestemp
1. `chunk data`
    - 최대 chunk 사이즈만큼의 data

## 5.3.1.1. Chunk Basic Header

1. chunck basic header 1
1. chunck basic header 2
1. chunck basic header 3

???

## 5.4. protocol Control Messages

RTMP Chunk Stream은 protocol control messages를 위해서 message type ID 1,2,3,5,6을 사용합니다.
- protocol control message는 반드시 msg stream ID 0(control stream이라고 알려진)을 가지고 chunk stream ID 2를 가져야 합니다.
- protocol control message는 도착하자마자 효력을 발휘하고 그들의 timestamp는 무시된다. 

## 5.4.1. Set chunk size (control msg #1)

- peer에게 새로운 최대 chunk 사이즈를 알리기 위해서 사용된다.
- default 최대 chunk 사이즈는 128 byte이고, 클라 또는 서버가 이 값을 바꾸고 상대방의 값을 업데이트하면 된다.
- 오디오 데이터는 131 byte이고 비디오는 128바이트이면, 클라가 서버에게 131byte로 바꾸라고 아리면 된다.
- 최대 chunk size는 최소 128 바이트가 좋으며, 반드시 1 바이트 이상이어야 한다. 

## 5.4.2. Abort Message(constol msg #2)

- Abort message는 피어에게 message를 모두 처리하기 위해서 chunk를 기다리고 있으면 그 chunk stream으로 받은 chunk들을 버리라고 알려준다.

## 5.4.3. Acknowledgement( control msg #3)

- 클라와 서버는 반드시 window size와 같은 크기의 바이트를 받은 이후에는 peer에게 acknowledgement 메시지를 보내야 한다.



## 5.4.4. Window Acknowledgement size( control msg #5)

## 5.4.5. Set peer BadndWidth( contol msg #6)



