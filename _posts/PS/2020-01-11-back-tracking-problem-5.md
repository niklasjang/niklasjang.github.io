---
title: "[ps][백트래킹][문제] 도영이가 만든 맛있는 음식"
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

	
## [도영이가 만든 맛있는 음식](https://www.acmicpc.net/problem/2961)

## 백트레킹 0번 개념 풀이

1. 백트레킹 N자리 K진수 풀이 가능 : depth 번쩨로 어떤 재료를 고를지 선택하고, 선택되는 재료의 idx가 오름차순이면 됨.
1. 아무것도 고르지 않아을 때는 ans를 갱신하면 안됨
1. 1 ~ n -1개를 골랐을 때 모두 ans를 갱신해야함. n-1개를 골랐을 때만 갱신하면 안됨.

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0;
long long arr[20][2];
long long ans = 987654321;
void recur(int depth, int start, long long a, long long b) {
	if (depth != 0) ans = ans > abs(a - b) ? abs(a - b) : ans;
	if (depth == n) return;
	for (int i = start; i < n; i++) {
		recur(depth + 1, i+	1, a * arr[i][0], b + arr[i][1]);
	}
}
int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n;
	for (int i = 0; i < n; i++) {
		cin >> arr[i][0] >> arr[i][1];
	}
	recur(0, 0, 1, 0);
	cout << ans << "\n";
	return 0;
}

```

## 백트레킹 1번 개념 풀이

1. 백트레킹 : depth번째 재료를 고른다 안고른다의 문제로 생각할 수 있음.
1. 0번 개념으로 풀이하면 arr[0]에는 재료가 반드시 하나이상 선택되기 때문에 if(depth !=0)로 접근하능
1. 하지만 1번 개념으로 풀이하면 0번 재료를 선택안하는 경우는 ans를 갱신하면 안되기 떄문에 if(b!=0)으로 접근해야함

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0;
long long arr[20][2];
long long ans = 987654321;
/*
depth : 다음에 선택할 재료의 index
a : 지금까지 고른 쓴맛의 곱
b : 지금까지 고른 신맛의 합
*/
void recur(int depth, long long a, long long b) {
	if (b != 0) ans = ans > abs(a - b) ? abs(a - b) : ans;
	if (depth == n) return;
	recur(depth + 1, a * arr[depth][0], b + arr[depth][1]);
	recur(depth + 1, a, b);
}
int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n;
	for (int i = 0; i < n; i++) {
		cin >> arr[i][0] >> arr[i][1];
	}
	recur(0, 1, 0);
	cout << ans << "\n";
	return 0;
}

```