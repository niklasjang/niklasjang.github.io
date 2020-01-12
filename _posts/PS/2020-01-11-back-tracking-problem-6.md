---
title: "[ps][백트래킹][문제] 퇴사"
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

	
## [퇴사](https://www.acmicpc.net/problem/14501)

## 백트레킹 1번 개념 풀이

1. 백트레킹 1번 개념으로만 풀어여하는 문제가 있을 수 있다.
1. 이 문제의 경우 특정 날짜의 일을 한다 안한다의 개념이 확실하므로 1번 개념으로만 풀 수 있다. 
1. 백트레킹 0번 개념으로 풀이를 하면 어떤 일들을 할지 선택하고, 선택한 일들을 실제로 수행할 수 있는지를 판단하는 isCorrect()를 짜야한다. 그런데 이 과정이 너무 복잡하다. 그래서 1번 개념으로 접근한다. 
1. depth를 이전에 고른 일이 끝나고 depth번째일을 시작할지 말지 판단해야한다.로 생각하는 것이 중요하다.
1. 예를 들어 0번째 날짜의 일이 2일이 걸리면, 0번째 날짜의 일은 0일쨰와 1일째에 수행하고 2일쨰의 일을 할지말지 선택해야한다. 
1. 딱 N일 째에 일이 끝나는 경우만 생각해서 답을 갱신한다. N일을 넘으면 불가능한 일을 받아서 한 경우라서 제외한다. 

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0;
int arr[25][2];
int ans = 0;
/*
depth : 일끝나고 depth일이 되었다. == depth 번째일을 시작할지말지 결정해야한다.
*/

void recur(int depth, int money) {
	//n+1번째에 시작해야하는 일은 할 수 없다.
	if (depth == n) {
		ans = ans < money ? money : ans;
		return;
	}
	if (depth > n) return;
	//depth 번쨰의 일을 한다.
	recur(depth + arr[depth][0], money + arr[depth][1]);
	//depth 번째의 일을 하지 않는다.
	recur(depth + 1, money);
}
int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n;
	for (int i = 0; i < n; i++) {
		cin >> arr[i][0] >> arr[i][1];
	}
	recur(0, 0);
	cout << ans << "\n";
	return 0;
}
```