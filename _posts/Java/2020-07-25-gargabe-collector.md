---
title: "[Java] Garbage Collector 내부 구조"
excerpt: ""
date: 2020-07-26
categories:
  - Java
tags:
  - java
  - garbage collector
  - gc
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## 힙 영역의 구조

- eden
- survivor1
- survivor2
- old
- permanent

## Minor GC

eden 영역에서 old 영역 방향으로 오랫동안 참조되고 있는 메모리를 복사를 통해서 보존합니다. 가장 GC가 많이 일어나는 공간은 eden 영역입니다.  

1. 최초에 객체가 생성되면 Eden영역에 생성된다.
2. Eden영역에 객체가 가득차게 되면 첫 번째 CG가 일어난다.
3. survivor1 영역에 Eden영역의 메모리를 그대로 복사된다. 그리고 survivor1 영역을 제외한 다른 영역의 객체를 제거한다.
4. Eden영역도 가득차고 survivor1영역도 가득차게된다면, Eden영역에 생성된 객체와 survivor1영역에 생성된 객체 중에 참조되고 있는 객체가 있는지 검사한다.
5. 참조 되고있지 않은 객체는 내버려두고 참조되고 있는 객체만 survivor2영역에 복사한다.
6. survivor2영역을 제외한 다른 영역의 객체들을 제거한다.
7. 위의 과정중에 일정 횟수이상 참조되고 있는 객체들을 survivor2에서 Old영역으로 이동시킨다.
- 위 과정을 계속 반복, survivor2영역까지 꽉차기 전에 계속해서 Old로 비움

## Major GC

Minor GC보다 시간이 훨씬 많이 걸리고 실행중에 GC를 제외한 모든 쓰레드가 중지한다.

1. Old 영역에 있는 모든 객체들을 검사하며 참조되고 있는지 확인한다.
2. 참조되지 않은 객체들을 모아 한 번에 제거한다.

Old영역에 있는 참조가 없는 객체들을 표시하고 그 해당 객체들을 모두 제거하게 된다.
그러면서 Heap 메모리 영역에 중간중간 구멍(제거되고 빈 메모리 공간)이 생기는데 이 부분을 없애기 위해 재구성을 하게 된다. (디스크 조각모음처럼 조각난 메모리를 정리함) 따라서 메모리를 옮기고 있는데 다른 쓰레드가 메모리를 사용해버리면 안되기 때문에 모든 쓰레드가 정지하게 되는 것이다.

## Reference 

- [기본기를 쌓는 정아마추어 코딩블로그](https://jeong-pro.tistory.com/148)