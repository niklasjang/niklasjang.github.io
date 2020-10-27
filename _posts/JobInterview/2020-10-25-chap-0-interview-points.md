---
title: "[면접] 면접 준비 포인트 정리"
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

# 질문 받을 수 있는 내용

0. 자기소개
1. 학점
  - 학점이 높은데 어떻게 공부했나?
2. 경력
  - 네이버 인턴에서의 어려웠던 점
  - 콜라비팀 인턴에서의 어려웠던 점
3. 자격증
  - 아마추어무선기사란?
4. 자신 있는 분야 우선순위 
  - BE/FE/Android 각각 얼마나 자신있는가?
5. CS  
  - 운영체제
  - 데이터베이스스튜디오 A+
  - 문제해결기법 A+
  - 네트워크 A0
    - session
    - 2Mbps 대역폭?
  - 자료구조와 C++프로그래밍 B+
    - B+인 이유?
    - shared_prt과 memcopy
    - linked list, array list
  - 자바와 객체지향프로그래밍 A+
  - 동영상 기술
    - P B I frame
    - rtmp
    - metataba
    - FLV
    - AMF
  - 기타
    - MSA
    - 무중단 배포
    - 싱글톤 패턴, 어댑터 패턴
  - 스프링
    - DI, IOC
    - 빈은 외부 라이브러리 참조
    - 컴포넌트는 직접 개발한 라이브러리
    - 의존성 주입 : 수정자, 생성자,  autowired 
      - 수정자와 autowired : 순환참조 이슈
      - 생성자 방식이 권장됨
  - git
    - clone
    - fetch
    - pull
    - rebase
    - merge
    - gitflow
6. 네이버 인턴
  - 에러 전파에 독립적?
  - 특정 스트림에게 RestFul한 요구를 전달?
  - 프레임워크 없이 멀티쓰레드 서버 설계
  - select, poll, epoll
  - RTMP Spec, librtmp
  - GStreamer gstrtmpsink?
  - 특징
    - 스트림에 고유 ID 부여 한 방식
    - ID를 기반으로 특정 쓰레드를 멈춘 방식
    - thread safe logging
  - 정책
    - 이미 송출되는 주소로 송출 요청이 들어오면 기존의 송출을 유지하는 정책
    - 송출자가 전송하는 데이터에 메타데이터가 포함되어 있지 않은 경우
    - 미디어 서버가 기대하는 I frame을 송출자가 전송하지 못하는 경우
  - 아쉬운 점
    - 쓰레드 풀 미적용
    - session 단위마다 thread 생성
    - CPU 코어 수 만큼 Thread를 생성? 어디서 보았나?
  - 성능 측정
    - 2Mbps 네트워크 대역폭
  - 소감
    - 모든 요구사항을 만족하지 못해 아쉬움
    - 안정과 성능 모두를 위해서 어떤 부부을 고려해야하는지 알게된 귀한 시간
7. 콜라비팀 인턴
  - 무슨일 하고 있는가?
  - 어떤 것을 배웠는가?
  - MSA로 구성
  - 무중단 배포의 과정
8. Restful RTMP 
  - 새롭게 설계 추가된 내용?
9. 코딩테스트
  - 난이도
    - 1번과 2번은 평이했지만, 3번은 tricky한 부분이 있었다고 생각한다. 
    - 다행히 3번이 처음에 생각을 잘 하고 시작해서 디버깅을 최소화할 수 있었다.
  - 1번 풀이
    - STL find를  사용해서 풀었다가, 복잡도 O(n)을 가지기 때문에 나중에 최적화했다.
  - 2번 풀이
    - 무난한 구현 문제였다고 생각한다.
  - 3번 풀이
    - 연결 끊는데 1시간이 걸리기 때문에 한 높이에 하나만 끊을 수 있다는 생각.
    - 방문처리를 통해 bfs전파가 불가능하게 함으로써 끊는 효과
    - backtracking을 통해 모든 높이에서 하나씩 끊음
    - simulataion을 통해 감염되는 갯수를 찾음
    - 인접리스트로 그래프 정보 저장
    - bfs를 통해 각 노드의 높이를 저장
    - 각 높이에 속한 노드 정보 저장