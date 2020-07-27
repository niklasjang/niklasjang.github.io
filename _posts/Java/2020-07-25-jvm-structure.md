---
title: "[Java] JVM 내부 구조"
excerpt: ""
date: 2020-07-26
categories:
  - Java
tags:
  - java
  - jvm
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## JVM의 내부 구조

1. Class Loader(from *.class binary)  
  자바소스.java 파일을 컴파일하면 client.class와 같은 바이트코드가 생성된다. 이렇게 생성된 클래스 파일을 엮어서 JVM이 운영체제로부터 할당 받은 `메모리 영역`인 `Runtime Data Area`로 적재하는 역할을 수행한다. 자바 애플리케이션이 실행중일 때 이 작업이 수행된다.  
1. Execution Engine   
  Class Loader에 의해서 `메모리`에 적재된 바이너리를 기계어로 변경해 명령어 단위로 실행하는 역할을 수행한다. 명령어 하나 하나를 실행하는 interpreter 방식이 있고, `Just-In-Time`컴파일러를 이용하는 방식이 있다. `JIT` 컴파일러는 적절한 시간에 바이트 코드를 네이티브 코드로 변경해서 실행하여 성능을 높인다.  
1. Gargabe Collector  
  GC는 Heap 메모리 영역에서 생성된 객체들 중에서 참조되지 않는 객체들을 탐색 후 제거하는 역할을 한다. GC의 기능이 수행되는 시간은 정확히 특정할 수 없다. 즉, 참조가 없어지자마자 해제되는 것을 보장하지 않는다. 그리고 **GC가 동작하는 동안은 GC를 수행하는 쓰레드가 아닌 다른 모든 쓰레드가 일시 정지된다.** 특히 Full GC가 일어나면서 수 초간 모든 쓰레드가 정지한다면 장애로 이어질 수 있다.  
1. Runtime Data Area  
  자바 런타임 메모리 구조는 아래와 같이 나눌 수 있다.  
  - Method Area  
    필드 정보(클래스 멤버 변수의 이름, 데이터 타입, 접근 제어자 정보)와 메소드 정보(이름, 리턴 타입, 파라미터, 접근 제어자 정보), Type 정보(Interface 또는 Class), Constant Pool(문자 상수, 타입, 필드, 객체 참조가 저장됨), Static 변수, Final Class 변수 등이 저장되는 영역이다. 
  - Heap Area  
    new 키워드로 생성된 객체아 배열이 생성되는 영역이다. 메소드 영역에 로드된 클래스만 생성이 가능하고 GC가 참조되지 않는 메모리를 확인하고 제거하는 영역이다.  
  - Stack Area  
    임시 값(지역변수, 파라미터, 리턴 값, 연산에 사용되는 임시 값)등이 생성되는 영역이다. Client c = new Client()에서 c는 Stack 영역에, Client 인스턴스는 Heap 영역에 저장된다. 
  - PC register  
    쓰레드가 생성될 때마다 생성되는 영역으로 Program Counter를 의미한다. 현재 쓰레드가 실행되느 부분의 주소와 명령을 가리킨다. 
  - Native Method Stack  
    자바 외 언어로 작성된 네이티브 코드를 위한 메모리 영역이다. 보통 c/c++의 코드를 수행하기 위한 스택으로 사용된다.  