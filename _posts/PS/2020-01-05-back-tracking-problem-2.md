---
title: "[ps][백트래킹][문제] 암호 만들기"
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


## [암호 만들기](https://www.acmicpc.net/problem/1759)

1. 백트래킹
1. 모음과 자음의 갯수 체크

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int n = 0, k = 0;
char alpha[20];
char pwd[20];
bool flag = false; // if alpha[i] is 모음, true otherwise false

void recur(int depth,int start, int mCnt, int zCnt) {
	if(depth == n) {
		if (mCnt < 1 || zCnt < 2) return;
		for (int i = 0; i < n; i++) {
			cout << pwd[i];
		}
		cout << "\n";
		return;
	}
	for (int i = start; i < k; i++) {
		pwd[depth] = alpha[i];
		if (alpha[i] == 'a' || alpha[i] == 'e' || alpha[i] == 'i' || alpha[i] == 'o' || alpha[i] == 'u') {
			recur(depth + 1, i + 1, mCnt + 1, zCnt);
		}
		else {
			recur(depth + 1, i + 1, mCnt , zCnt + 1);
		}
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n >> k;
	for (int i = 0; i < k; i++) cin >> alpha[i];
	sort(alpha, alpha + k);
	recur(0,0,0,0);
	return 0;
}
```