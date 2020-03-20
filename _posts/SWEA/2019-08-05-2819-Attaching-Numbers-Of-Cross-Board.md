---
title: "[2819][D4]격자판의 숫자 이어 붙이기 "
excerpt: "SW Expert Academy 뿌시기"
date: 2019-07-30
categories:
  - SWEA
tags:
  - DFS
  - D4
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 풀이

기본 DFS를 돌리는데, 방문했던 곳에 다시 방문할 수 있도록 bool 배열을 사용하지 않으면 된다.

## 코드

```cpp
#include <cstdio>
#include <iostream>
#include <set>
#include <string>
using namespace std;
#define LEN 4
int map[LEN][LEN];
set<string, less<string> > s;
set<string, less<string> >::iterator it;
int dx[] = { 0,0,1,-1 };
int dy[] = { 1,-1,0,0 };

void dfs(int x, int y, string curr) {
	pair<set<string>::iterator, bool> ps;
	if (curr.size() == 7 ) {
		s.insert(curr);
		//ps = s.insert(curr);
		return;
	}
	int nx = 0;
	int ny = 0;
	for (int k = 0; k < 4; k++) {
		nx = x + dx[k];
		ny = y + dy[k];
		if (nx < 0 || nx> LEN-1) continue;
		if (ny < 0 || ny> LEN-1) continue;
		curr += to_string(map[nx][ny]);
		dfs(nx, ny, curr);
		curr.erase(curr.size() - 1);
	}
}

int main(void) {
	int t = 0;
	scanf("%d", &t);
	for(int tc=1; tc<=t; tc++){
		for (int i = 0; i < LEN; i++) {
			for (int j = 0; j < LEN; j++) {
				scanf("%d", &map[i][j]);
			}
		}
		for (int i = 0; i < LEN; i++) {
			for (int j = 0; j < LEN; j++) {
				dfs(i, j,to_string(map[i][j]));
			}
		}
		printf("#%d %d\n",tc, s.size());
		s.clear();
	}

	return 0;
}
```
