---
title: "[백트래킹] Back-Tracking"
excerpt: "DFS 브루트포스 그러나 Pruning"
date: 2019-07-22
categories:
  - Algorithm
tags:
  - Identical-Element
  - Inverse
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 정의 : DFS 브루트포스 그러나 Pruning

백트래킹의 정의는 3가지 요소로 나뉩니다.

1. 모든 경우를 따져보는 브루트포스 알고리즘.
2. 브루트포스를 진행할 때 모든 노드를 한 번씩 방문하는 DFS를 사용한다.
3. DFS를 진행할 때, 답이 될 가능성이 없다고 판단되는 것은 더이상 DFS를 진행하지 않고 현재 위치의 Parent로 돌아간다.  

## 예시 1 : 6603번 로또 문제

아래의 포스팅에 간단한 백트레킹 문제가 설명되어 있습니다.  

[6603번 로또]()  

## 예시 2:

DFS를 제대로 이용해서 백트래킹을 적용하는 문제는 DFS 뿌시기를 진행할 떄 포스팅하겠습니다.  

