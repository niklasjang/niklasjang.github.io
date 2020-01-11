---
title: "[ps][백트래킹][문제] 신기한 소수"
excerpt: "완전탐색 - 1번째 알고리즘"
date: 2020-01-05
categories:
  - PS
tags:
  - ps 
  - back-tracking
  - problem
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---


## [신기한 소수](https://www.acmicpc.net/problem/2023)

1. 소수인지 판별하는 O(sqrt(n)) 방법
1. 백트래킹

을 알면 풀 수 있다.

```cpp
#include <iostream>
using namespace std;

int n = 0;

bool isPrime(int num) {
	if (num == 0) return true;
	if (num == 1) return false;
	int cnt = 0;
	for (int i = 1; i * i <= num; i++) {
		if (num % i == 0) cnt++;
	}
	return cnt == 1;
}

void recur(int depth, int num) {
	if (!isPrime(num)) return;
	if(depth == n) {
		cout << num << "\n";
		return;
	}
	for (int i = 1; i <= 9; i++) {
		recur(depth + 1, num * 10 + i);
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n;
	recur(0, 0);
	return 0;
}
```

