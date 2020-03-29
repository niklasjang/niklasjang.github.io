---
title: "[PS]코딩테스트 준비 시작하기 "
excerpt: "SWEA A+ 목표"
date: 2020-01-02
categories:
  - PS
tags:
  - ps 
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

본 포스팅은 SWEA A+ 취득을 목표로 합니다.
- - - 

# 문제 분류

## 완전탐색

### 완전탐색 : 개념

문제이 정의가 아닌 문제를 푸는 방법이 완전탐색인 경우에 사용합니다. 모든 정답 후보를 확인해보는 경우를 의미합니다.  

### 완전탐색 : 기본 문제

1. [일곱난쟁이](https://www.acmicpc.net/problem/2309)
  - 기본 풀이 : 9C7 개의 경우를 돌면서 `(선택된 7개의 합) = 100`이 되는지 판단.
  - 짧은 풀이 : 9C2 개의 경우를 돌면서 `(9명 전체의 합) - (선택된 두 개의 합) = 100`이 되는지 판단
2. [숫자야구](https://www.acmicpc.net/problem/2503)
  - 기본 풀이 : 123부터 987까지 9\*8\*7개의 경우를 돌면서 입력된 조건들과 하나라도 맞지 않는 것은 false처리

### 완전탐색 : 알고리즘 분류

1. 백트래킹(N자리 K진수, 고른다/안고른다) : 정답이 될 가능성이 없는 경우 1 step 뒤로 간다. 
1. BFS
1. DFS

## 시뮬레이션

1. M*N에서 이동한다.
2. M*N에서 물체를 밀어서 이동시킨다.