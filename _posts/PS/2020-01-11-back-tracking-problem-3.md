---
title: "[ps][백트래킹][문제] N-Queen"
excerpt: "완전탐색 - 1번째 알고리즘"
date: 2020-01-11
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

	
## [N-Queen](https://www.acmicpc.net/problem/9663)



1. 백트래킹
1. visited를 사용해서 좌우 상하는 겹치지 않도록 함
1. isCorrect()를 통해서 대각선으로 겹치는치 판단
	- 두 점이 대각선에 있으면 두 점의 x,y 좌표의 차이의 절대값이 같음 (왼쪽 대각, 오른쪽 대각 모두 판단)
1. 40분 걸림

```cpp
#include <iostream>
#include <string.h>
#include <algorithm>
using namespace std;
int n = 0;
int ans = 0;
bool visited[20];
int arr[20];

bool isCorrect(int d) {
	if (d <= 1) return true;
	for (int i = 0; i < d - 1; i++) {
		//cout << i << "," << d - 1 << "\n";
		//cout << arr[i] << "," << arr[d - 1] << "\n";
		if (abs(i - d + 1) == abs(arr[i] - arr[d - 1])) return false;
	}
	return true;
}

void recur(int depth) {
	if (!isCorrect(depth)) return;
	if (depth == n) {
		ans++;
		return;
	}

	for (int i = 0; i < n; i++) {
		if (visited[i]) continue;
		visited[i] = true;
		arr[depth] = i;
		recur(depth + 1);
		visited[i] = false;
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n;

	recur(0);
	cout << ans << "\n";
	return 0;
}
```