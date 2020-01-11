---
title: "[ps][백트래킹][문제] 차이를 최대로"
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

	
## [차이를 최대로](https://www.acmicpc.net/problem/10819)

1. 백트래킹
1. visited를 사용해서 좌우 상하는 겹치지 않도록 함
1. 5분 걸림

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0;
int ans = -987654321;
bool visited[20];
int arr[20], nums[20];

int calculate(void) {
	int temp = 0;
	for (int i = 0; i < n - 1; i++) {
		temp += abs(arr[i] - arr[i + 1]);
	}
	return temp;
}

void recur(int depth) {
	if (depth == n) {
		int temp = calculate();
		ans = ans < temp ? temp : ans;
		return;
	}
	for (int i = 0; i < n; i++) {
		if (visited[i]) continue;
		visited[i] = true;
		arr[depth] = nums[i];
		recur(depth + 1);
		visited[i] = false;
	}

}
int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n;
	for (int i = 0; i < n; i++) {
		cin >> nums[i];
	}
	recur(0);
	cout << ans << "\n";
	return 0;
}
```