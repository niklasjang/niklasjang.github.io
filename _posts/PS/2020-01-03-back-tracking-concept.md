---
title: "[ps][백트래킹][개념] N자리 K진수"
excerpt: "완전탐색 - 1번째 알고리즘"
date: 2020-01-03
categories:
  - PS
tags:
  - ps 
  - back-tracking
  - concept
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

## N자리 K진수 = 재귀가 N번 돌고, k번 순환하는 for문이 있는 경우

```cpp
/*
  
  */
  #include <iostream>

  using namespace std;

  int n = 0, k = 0;
  int arr[100];
  void recur(int depth) {
    //출력 후 종료
    if (depth == n) {
      for (int j = 0; j < n; j++) {
        cout << arr[j];
      }
      cout << " ";
      return;
    }
    //k번 순회
    for (i = 0; i < k; i++) {
      arr[depth] = i;
      recur(depth + 1);
    }
  }

  int main(void) {
    //빠른 표준입력
    cin.tie(NULL);
    ios::sync_with_stdio("false");
    cin >> n >> k;
    //0번부터 시작
    recur(0);
    return 0;
  }
```