---
title: "[PS][이분탐색] Chapter 0"
excerpt: ""
date: 2020-04-19
categories:
  - PS
tags:
  - ps 
  - dp
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

그리디 알고리즘 입니다. 대표적인 유형을 보겠습니다. 
- - -

### [숫자 카드](https://www.acmicpc.net/problem/10815)

문제의 정답은 [여기](https://gist.github.com/niklasjang/1ce3800d7fb9fb94ad7dee9f7ddd107e)에서 확인할 수 있습니다. 

1. s = 정답이 될 가능성이 있는 시작 index.
1. e = 정답이 될 가능성이 있는 마지막 index.
1. 위 정의에 따라서 정답 가능성은 [s,e]
1. 이 문제에서 정답 가능성 = 모든 숫자카드가 저장된 배열의 index
1. if(mid == x)의 조건 : x와 같은지 확인하는 문제

### [숫자 카드2](https://www.acmicpc.net/problem/10816)

문제의 정답은 [여기](https://gist.github.com/niklasjang/f77bd8b1d4342982dcd25f38dc68dada)에서 확인할 수 있습니다. 

1. if(mid < x)의 조건 : x보다 작은 것중 가장 오른쪽 것을 구하는 문제
	1. o(s) o o o o(mid) o x x x x에서 s = 0, e = 9, mid = 4
	1. 조건이 맞으면 s = mid + 1;로 '작은 것중 가장 오른쪽'을 구하는 방향으로 범위를 줄인다.
1. if(mid > x)의 조건 : x보다 큰 것 중 가장 왼쪽 것을 구하는 문제
	1. x(s) x x x x(mid) o o o o o에서 s = 0, e = 9 mid = 4
	1. 조건이 맞으면 e = mid - 1; '큰 것 중 가장 왼쪽'을 구하는 방향으로 범위를 줄인다.

문제의 조건에 따라서 o o o o o o o x x x x x와 같이 된다/안된다의 경계가 확실한 문제는 **parametric search**라고 부릅니다.
parametric search 문제는 전체가 o이거나 전체가 x인 경우의 대응을 고민해야 합니다. 이 문제해서는 아래와 같이 두 가지 방법으로 접근합니다.  

1. maxRight와 minLeft의 초기화
	1. 방법 1 : maxRight = -1, minLeft = n으로 초기화
	1. 방법 2 : 문제 입력의 범위보다 작은 값과 큰 값을 배열에 넣고 m += 2를 해주면, maxRight와 minLeft의 초기화는 문제되지 않는다. 항상 입력으로 주어지는 값보다 작고, 큰 값이 들어간 채로 정렬되기 때문이다.  

## [나무 자르기](boj.kr/2805)

이분탐색의 시간복잡도는 (check함수의 시간복잡도)logN이기 때문에 check 함수의 시간복잡도를 줄여야 합니다. lower_bound 이후 반복적으로 합연산을 하는 부분을 미리 수행해서 간단한 수식을 통해 수행합니다.  

문제의 정답은 [여기](https://gist.github.com/niklasjang/4b74dd1342cd6421bc7f127946e09ab5)에서 확인할 수 있습니다. 

## [랜선 자르기](boj.kr/1654)

이분탐색의 max는 모든 랜선의 합 / n이기 때문에 long long 타입으로 설정해야 한다. int로 하는 경우 값이 커질 때 적절한 답을 수할 수 없다.  
문제의 정답은 [여기](https://gist.github.com/niklasjang/73a11da90de77676d5dbd721e5b466e2)에서 확인할 수 있습니다. 

## [랜선 자르기](boj.kr/1654)

check함수는 상한 예산이 가능한지 판단한다. 예산 신청 목록에서 상한보다 큰 위치를 찾는다. 만약 없다면 신청 예산이 가능한지 판단한다. 만약 있다면 상한보다 더 큰 금액을 상한으로 바꿔서 계산한다.  
문제의 정답은 [여기](https://gist.github.com/niklasjang/dcb37c421e23ac17166230c36933b8b3)에서 확인할 수 있습니다.  


