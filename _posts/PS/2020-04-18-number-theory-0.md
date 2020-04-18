---
title: "[PS][DP] Chapter 0"
excerpt: "이동시키기 & 순환시키기"
date: 2020-04-09
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

정수론 입니다. 대표적인 유형을 보겠습니다. 
- - -

### [n! mod p]](https://www.acmicpc.net/problem/2193)

문제의 정답은 [여기](https://gist.github.com/niklasjang/4cccddf19bb75caaa0e9ea57cf330f6a)에서 확인할 수 있습니다. 

1. mod p는 p가 소수일 때만 가능합니다. 

### [소인수 분해]](https://www.acmicpc.net/problem/11653)

문제의 정답은 [여기](https://gist.github.com/niklasjang/4cccddf19bb75caaa0e9ea57cf330f6a)에서 확인할 수 있습니다. 

1. mod p는 p가 소수일 때만 가능합니다.

1. 두 번째 풀이 : n을 구성하는 가장 큰 소수가 x라고 할 때, i*i<=n인 2부터 i까지 보면 n을 구성하는 모든 소수를 다 볼 수 있다.
1. 이 때 n=25일 때 i가 5일 때까지 for문이 돌지만 temp까지 넣어야 모든 소인수분해가 종료된다. 