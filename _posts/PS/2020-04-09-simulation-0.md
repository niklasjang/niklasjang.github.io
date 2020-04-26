---
title: "[PS][시뮬레이션] Chapter 0"
excerpt: "이동시키기 & 순환시키기"
date: 2020-04-09
categories:
  - PS
tags:
  - ps 
  - simpulation
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

시뮬레이션입니다. 구현력을 높이는 과정이 길고 힘들 것 같습니다. 
- - -

## 이동시키기

두 개의 배열을 사용한다. 하나는 객체 저장용, 하나는 중복 제거용.  

### [낚시왕](https://www.acmicpc.net/problem/17143)

문제의 정답은 [여기](https://gist.github.com/niklasjang/62123bafe459e58ad0344681a7240f92)에서 확인할 수 있습니다. 

1. 상어 구조체 생성하기
1. map에 상어 배열의 index만 저장하기
1. 한 칸에 겹치는 경우는, 가장 큰 상어의 index만 하나 남기고 상어를 없애면 된다.
1. R,C가 각각 100이고 s가 1000이기 때문에 R \* C \* S \* 최대상어수(R\*C)는 당연히 시간초과가 나온다.
1. 한 방향으로 한 칸씩 움직이는 것이 아니라, 움직일 수 있는만큼 움직이는 것으로 해결한다.
1. 각 상어의 한 바퀴 주기만금 계산해서 불필요한 이동을 줄인다.
1. while()안에서 가지치기 조건 먼저 생성하고 시작한다. 
1. map에 이미 상어가 있을 때 기존의 상어 index를 remove 하는 것이 아니라, 현재 상어의 값을 기존 index에 복사하고 i를 지운다.(마지막 상어를 i번째로 가져오고)  i--를 진행해서 i++를 상쇄하고 i번째부터 시작한다. 

### [미생물 격리](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV597vbqAH0DFAVl)

### [원자 소멸 시뮬레이션](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWXRFInKex8DFAUo)

### [새로운 게임2](https://www.acmicpc.net/problem/17837)

문제의 정답은 [여기](https://gist.github.com/niklasjang/2f2923da61ecde17ba638662bd6434a2)에서 확인할 수 있습니다. 

1. 상어 문제와 같이 객체 저장과 겹치는 부분 판단을 따로 구현합니다.

## 순환시키기

이동방향의 반대로 당긴다는 느낌으로 접근한다. 마지막 값만 temp에 저장해두면 된다. 

### [미세먼지 안녕!](https://www.acmicpc.net/problem/17144)

1. 미는 방향의 반대로 당긴다고 생각한다.
1. 특정 위치의 값을 save해놔야한다.

문제의 정답은 [여기](https://gist.github.com/niklasjang/74e8b79519f90ab98cc034c4ca6551eb)에서 확인할 수 있습니다. 
 
### [원판돌리기](https://www.acmicpc.net/problem/17822)

1. k칸 회전을 1칸씩 k번 돌리는 것으로 반복해도 된다. 50 \* 50 \* 50이기 때문에 시간초과가 나지 않는다.
1. deque를 사용하면 rotate가 쉬울 것으로 보인다.

문제의 정답은 [여기](https://gist.github.com/niklasjang/4528e16424a478d24ab983583e1a517a)에서 확인할 수 있습니다. 


### [게리멘더링2]](https://www.acmicpc.net/problem/17779)

이 문제는 풀이만 공부하고 나중에 풀어보겠습니다. 

1. 그림을 보고 5번 선거구의 개형을 확인한다.
1. 5번 선거구의 테두리를 5로 칠한다.
1. 5번 선거구의 모서리에서 벽까지, 경계지점의 선거구를 칠한다.
1. 전체 사각형의 네 귀퉁이에서 map[nx][ny]==0인 지점에 대해서만 flood fill을 진행한다.
1. 5번 선거구의 내부를 5로 채운다.
  1. x,y 지점에서 dfs를 돌린다.
  1. 위의 방법만으로는 채워지지 않는 5번 지역이 있으므로 아직까지 0인 경우는 모두 5번 선거구로 처리한다.
1. 답을 출력한다.

