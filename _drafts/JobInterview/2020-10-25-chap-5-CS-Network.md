---
title: "[기술면접] 네트워크"
excerpt: ""
date: 2020-10-25
categories:
  - JobInterview
tags:
  - JobInterview
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

# 네트워크 구성

- host들은 통신링크와 패킷스위치로 연결된다.
- 통신링크는 고유한 전송률과 대역폭을 가진다.
- 전송률은 bps를 말한다.
- data -> segment + header  = packet

## 5계층 인터넷 프로토콜 스택

1. 애플리케이션 : 메시지     : HTTP   
2. 트랜스포트   : 세그먼트   : TCP, UDP
3. 네트워크     : 데이타그램 : IP : 세그먼트 목적지 주소를 받아서 routing하는 역할
4. 링크         : 프레임     : 다음 경로상의 노드에 전달  
5. 물리         : 비트       : 한 비트를 노드에서 노드로 전달

## OSI 7계층 프로토콜 스택

1. 애플리케이션
2. 프레젠테이션  : 애플리케이션이 교환하는 데이터의 의미를 해석하는 서비스. 데이터 압축 및 암호화
3. 세션         : 데이터 교환의 경꼐와 동기화를 제공
4. 트랜스포트
5. 네트워크
6. 링크
7. 물리

## session

host 간의 논리적 연결. **웹 서버가 session ID 파일을 만들어서 서버에 저장한다.**

### HTTP Session

1. 클라이언트 -> 서버 : 접속
1. 서버 : 요청 헤더에 세션 ID 확인. 없으면 생성
1. 서버 -> 클라이언트 : Session ID 전송

## cookie

방문자의 정보를 방문자 컴퓨터의 메모리에 저장하는 것. ID, 비밀번호 등

## socket

애플리케이션과 트랜스포트 계층 사이의 인터페이스.  메시지를 주고 받는 통로.


## TCP란 무엇인가

데이터의 송수신을 위해 IP를 이용하는 프로토콜이며 통신간에 신뢰성을 보장해주기 위해 만든 것이다.

TCP는 3-way handshake라고 불리는 연결 동작과 4-way handshake라고 불리는 연결 종료를 통해 ACK와 Sequence Number를 주고 받아 데이터 흐름의 신뢰성을 구축한다.

## TCP와 UDP의 차이점은
TCP는 연결 동작을 통해 ACK와 Sequence Number를 주고받으며 신뢰성과 흐름제어를 제공하는 방면 UDP는 IP를 거의 그대로 사용하며 단순히 Checksum말고는 데이터의 훼손을 감지할 수 없다. 또한 ACK와 Sequence Number를 주고받지 않으므로 중간에 데이터가 유실되어도 이를 다시 요청하거나 할 수 있는 방법이 없다. 또한 TCP와 다르게 UDP는 혼잡을 제어할 수 있는 방법이 없다.

## 브라우저에서 주소창에 url 입력시 어떤일이 일어나는가

1. 브라우저의 주소창에 url 입력
2. 브라우저 캐시에서 DNS 레코드를 확인하여 IP주소를 찾음 (없다면 DNS resolver를 통해 IP주소를 알아냄)
3. 브라우저가 서버와 TCP 연결을 시작함
4. 브라우저가 웹 서버에 HTTP 요청을 보냄
5. 서버가 요청을 처리하고 응답을 되돌려보냄
6. 브라우저는 서버가 보낸 HTML 내용을 표시

## CORS

## GET POST cookie? cache?