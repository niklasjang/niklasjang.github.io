---
title: "[7012] 유기농 배추"
excerpt: "BFS 뿌시기"
date: 2019-07-25
categories:
  - BOJ
tags:
  - BFS

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 풀이

연결 요소 문제의 갯수를 구하는 문제로 아파드 단지 구하기 문제와 동일한 문제입니다. 

## 코드

```cpp

#include <cstdio>
#include <queue>
#include <algorithm>
#include <vector>
#include <cstring>
using namespace std;
#define MAX 50
int map[MAX+1][MAX + 1];
bool check[MAX + 1][MAX + 1];
int dx[4] = { 0,0,1,-1 };
int dy[4] = { 1,-1,0,0 };
queue<pair<int, int> > q;

int bfs(int x, int y, int n,int m) {
	check[x][y] = true;
	q.push(make_pair(x, y));
	pair<int, int> curr, next;
	while (!q.empty()) {
		curr = q.front(); q.pop();
		check[curr.first][curr.second] = true;
		for (int k = 0; k < 4; k++) {
			next.first = curr.first + dx[k];
			next.second = curr.second + dy[k];
			if (next.first < 0 || next.first >= n) continue;
			if (next.second < 0 || next.second >= m) continue;
			if (map[next.first][next.second] == 1 && check[next.first][next.second] == false) {
				check[next.first][next.second] = true;
				q.push(make_pair(next.first, next.second));
			}
		}
	}
	return 1;
}
int main(void) {
	int t = 0, m=0, n=0, k=0, x=0, y=0;
	scanf("%d", &t);
	while (t--) {
		scanf("%d%d%d", &m, &n, &k);
		for (int i = 0; i < k; i++) {
			scanf("%d%d", &x, &y);
			map[y][x] = 1;
		}
		int ans = 0;
		for (int row = 0; row < n; row++) {
			for (int col = 0; col < m; col++) {
				if (map[row][col] == 1 && check[row][col] == false) {
					ans += bfs(row, col,n,m);
				}
			}
		}
		printf("%d\n", ans);
		//map초기화
		for (int j = 0; j < n; j++) {
			memset(map[j], 0, sizeof(map[j]));
			memset(check[j], 0, sizeof(check[j]));
		}
	}

	

	return 0;
}
```
