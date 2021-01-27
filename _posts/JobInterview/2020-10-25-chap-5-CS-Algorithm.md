---
title: "[기술면접] 알고리즘"
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

# Sort

## Stable하다는 뜻은?

vector<pair>에서 first로 정렬을 할 때, 동일한 first의 값을 가지는 second들의 순서는 바뀌지 않는 것을 말한다.
(4,2) (2,3) (2,2) (1,1)을 정렬했을 때 (1,1) (2,3) (2,2) (4,2)로 정렬된다. (2,3)와 (2,2)의 순서가 바뀌지 않는다.  

## 종류

공간복잡도 : 얼마나 많은 저장 공간이 필요한지

| 이름 | 최고 | 평균 | 최악 | 공간복잡도 |
|:-----|:----|:-----|:-----|:----------|
| 버블 | O(n) | O(n^2) | O(N^2) | O(1) |
| 퀵 | O(nlogn) | O(nlogn) | O(N^2) | O(logN) |
| 병합 | O(nlogn) | O(nlogn) | O(nlogn) | O(N) |
| 삽입 | O(N) | O(N^2) | O(N^2) | O(1) |
| 선택 | O(N^2) | O(N^2) | O(N^2) | O(1) |

퀵소트 :
  - 제일 왼쪽 pivot
  - left = pivot + 1.
  - right = 제일 끝
  - right : 왼쪽으로 이동하며 pivot보다 작은 첫 번째 값에서 멈춤
  - left : 오른쪽으로 이동하며 pivot보다 큰 첫 번째 값에서 멈춤
  - left < right 라면 둘을 바꾸고 
병합정렬 : 분할과정 + 병합 과정
  - 분할 과정 : 반을 쪼갠다. 크기가 0 또는 1일때까지 반복한다.
  - 병합 과정 : 두 개를 비교해서 정렬하며 새로운 배열에 넣는다. 둘 중 하나가 먼저 끝나면 나머지는 뒤에 붙인다.
  - 분할은 O(logN), 병합은 O(N). 분할마다 병합이 이루어져서 O(NlogN)
삽입정렬 : i번째 값부터 [0,i)를 비교하며 가능한 앞으로 옮긴다. 이때 기존의 값은 하나씩 뒤로 밀린다.
선택정렬 : i번째 인덱스에 올 값을 [i+1,N)에서 찾아서 swap
