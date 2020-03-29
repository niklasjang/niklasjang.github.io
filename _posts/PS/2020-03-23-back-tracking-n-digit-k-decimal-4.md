---
title: "[PS][완전탐색][N자리 K진수] Chapter 4"
excerpt: "N자리 K진수 2차원에 적용하기"
date: 2020-03-29
categories:
  - PS
tags:
  - ps 
  - back-tracking
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

## [소문난 칠공주](https://www.acmicpc.net/problem/1941)

## 백트레킹 2번 개념 풀이

1. 2차원 백트레킹은 구조가 비슷해서 아래의 코드를 보면서 이해한다.
1. \[x\]\[y\]에서 항상 \[x\]\[y+1\]로 이동한다고 가정한다 : 1차원 백트레킹으로 생각
1. recur()로 백트래킹을 호출할 때는 항상 1차원 백트래킹처럼 생각하고, `가치지기`와 `기저(return;)`부분에서 2차원으로 바꾸는 코드를 넣는다.
1. if (selected[i][j]  && !visited[i][j] && dfs(i, j) != 7) return false;의 경우는 설명할 것이 많다.
	- 선택한 것 && 아직 방문하지 않은 것 && dfs(i,j) == 7 인 경우 return true;로 해도 되지만 dfs()를 더 많이 호출한다. 실행시간이 길다. 7인 경우보다 7이 아닌 경우를 찾아서 return false;를 하는 것이 더 빠르다.
	- char visited\[N\]\[M\]를 선언한 경우 sizeof(visited)/sizeof(char)를 해보면 v\*m이 나온다. 
	- ```cpp
		char arr2[10][10];
		cout << sizeof(arr2) / sizeof(char) << "\n"; //100
		cout << sizeof(arr2[0]) / sizeof(char) << "\n";//10
		```
	- ```cpp
		cout << &arr2 << "\n"; //0115F930
		cout << &(arr2[0]) << "\n"; //0115F930
		```

```cpp
#include <iostream>
#include <algorithm>
#include <string.h>
using namespace std;
int n = 0;
char map[10][10];
int ans = 0;
bool visited[10][10];
bool selected[10][10];
int dx[4] = { 1, -1, 0 ,0 };
int dy[4] = { 0, 0, 1 ,-1 };

int dfs(int x, int y) {
	visited[x][y] = true;
	int ret = 1;
	for (int k = 0; k < 4; k++) {
		int nx = x + dx[k];
		int ny = y + dy[k];
		if (nx < 0 || nx >= 5) continue;
		if (ny < 0 || ny >= 5) continue;
		if (!visited[nx][ny] && selected[nx][ny]) 
			ret += dfs(nx, ny);
	}
	return ret;
}

bool isCorrect(void) {
	memset(visited, 0, sizeof(visited));
	for (int i = 0; i < 5; i++) {
		for (int j = 0; j < 5; j++) {
			//!visited[7]을 지울 수 없는게, dfs()==7이 나오면 
			if (selected[i][j]  && !visited[i][j] && dfs(i, j) != 7) return false;
		}
	}
	return true;
}

/*
cnt : 지금까지 고른 이다솜파의 수
*/
void recur(int x, int y, int depth, int cnt ) {
	if (depth == 7) {
		if (cnt < 4) return;
		if (isCorrect()) ans++;
		return;
	}

	if (y == 5) {
		y = 0;
		x++;
	}
	if (x == 5) return;
	selected[x][y] = true;
	recur(x, y + 1, depth+1, cnt + (map[x][y] == 'S'));
	selected[x][y] = false;
	recur(x, y + 1, depth, cnt);
}
int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	for (int i = 0; i < 5; i++) {
		cin >> map[i];
	}

	recur(0, 0, 0,0);
	cout << ans << "\n";
	return 0;
}
```