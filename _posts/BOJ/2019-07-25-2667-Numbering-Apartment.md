---
title: "[2667] 단지번호 붙히기"
excerpt: "BFS 뿌시기"
date: 2019-07-25
categories:
  - BOJ
tags:
  - BFS
  - Connected-Component

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 풀이

bfs를 진행하면서 같은 단지에 속하는 좌표를 queue에 넣고, 이를 빼면서 숫자를 센다. 

## 코드

```cpp

#include <cstdio>
#include <queue>
#include <algorithm>
#include <vector>
using namespace std;

int map[25][25];
bool check[25][25];
int dx[4] = { 0,0,1,-1 };
int dy[4] = { 1,-1,0,0 };

int bfs(int i, int j) {
	check[i][j] = true;
	queue<pair<int, int> > q;
	q.push(make_pair(i, j));
	pair<int, int> curr, next;
	int ans = 0;
	while (!q.empty()) {
		curr = q.front(); q.pop();
		ans += 1;
		for (int k = 0; k < 4; k++) {
			next.first = curr.first + dx[k];
			next.second = curr.second + dy[k];
			if (next.first < 0 || next.first >= 25) continue;
			if (next.second < 0 || next.second >= 25) continue;
			if (map[next.first][next.second] == 1 && check[next.first][next.second] == false) {
				check[next.first][next.second] = true;
				q.push(make_pair(next.first, next.second));
			}
		}
	}
	return ans;

}
int main(void) {
	int n = 0;
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			scanf("%1d", &map[i][j]);
		}
	}

	vector<int> v;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			if (map[i][j] == 1 && check[i][j] == false) {
				v.push_back(bfs(i, j));
			}
		}
	}
	sort(v.begin(), v.end());
	printf("%d\n", v.size());
	for (int i = 0; i < v.size(); i++) {
		printf("%d\n", v[i]);
	}

	return 0;
}

```