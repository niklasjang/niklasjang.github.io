---
title: "[4014] 활주로 건설"
excerpt: "[모의 SW 역량테스트] 뿌시기"
date: 2019-08-09
categories:
  - SWEA
tags:
  - Sample-Test
  - Simulation
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 풀이

아래와 같은 사항을 체크해야 한다.  

1. 가로로 모두 한 번씩 체크
2. 세로로 모두 한 번씩 체크
3. 높이가 높아서 경사로를 건설해야하는 경우
4. 높이가 낮아서 경사로를 건설해야하는 경우
5. 경사로를 건설해야하는데 이미 건설되어서 건설하지 못하는 경우
6. 다음으로 이동해야하는 칸과 현재칸의 높이차가 2이상인 경우

## 코드

```cpp
#include <cstdio>
#include <cstring>
int map[20][20];
bool check[20][20];
using namespace std;
int n = 0, x = 0;
bool flag = true;
bool go(int row, int col) { //가로 훑기
	bool ret = true; //계속 진행할 수 있는가?
	int temp = 0;
	int c = 0;
	while (true) {
		if (c >= n - 1) return true;
		ret = true;
		if (map[row][c] == map[row][c + 1]) {
			++c;
		}
		else if (map[row][c] - 1 == map[row][c + 1]) {
			for (int k = 1; k <= x && ret; k++) {
				if (c + k >= n) return false;
				//경사로를 쌓아야하는데 이미 경사로인 경우
				if (check[row][c + k]) return false; 
				if ( map[row][c] - 1 != map[row][c + k]) ret = false;
				else check[row][c + k] = true;
			}
			if (ret) {
				c += x;
				continue;
			}
			else {
				return false;
			}
		}
		else if (map[row][c] + 1 == map[row][c + 1]) {
			for (int k = 0; k < x; k++) {
				if (c - k < 0) return false;
				//경사로를 쌓아야하는데 이미 경사로인 경우
				if (check[row][c - k]) return false;
				if (map[row][c + 1] - 1 != map[row][c - k]) ret = false;
				else check[row][c - k] = true;
			}
			if (ret) {
				c += 1;
				continue;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
}

bool go2(int row, int col) { //세로 훑기
	bool ret = true; //계속 진행할 수 있는가?
	int r = 0;
	while (true) {
		if (r >= n - 1) return true;
		ret = true;
		if (map[r][col] == map[r + 1][col]) {
			++r;
		}
		else if (map[r][col] - 1 == map[r + 1][col]) {
			for (int k = 1; k <= x && ret; k++) {
				if (r + k >= n) return false;
				//경사로를 쌓아야하는데 이미 경사로인 경우
				if (check[r+k][col]) return false;
				if (map[r][col] - 1 != map[r + k][col]) ret = false;
				else check[r + k][col] = true;
			}
			if (ret) {
				r += x;
				continue;
			}
			else {
				return false;
			}
		}
		else if (map[r][col] + 1 == map[r + 1][col]) {
			for (int k = 0; k < x; k++) {
				if (r - k < 0) return false;
				//경사로를 쌓아야하는데 이미 경사로인 경우
				if (check[r - k][col]) return false;
				if (map[r + 1][col] - 1 != map[r - k][col]) ret = false;
				else check[r - k][col] = true;
			}
			if (ret) {
				r += 1;
				continue;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}

}

int main(void) {
	int tcase = 0; scanf("%d", &tcase);
	for (int tc = 1; tc <= tcase; tc++) {
		memset(map, 0, sizeof(map));
		memset(check, false, sizeof(check));
		int ans = 0;
		scanf("%d%d", &n, &x);
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				scanf("%d", &map[i][j]);
			}
		}
		//가로 훑기
		for (int row = 0; row < n; row++) {
			if (go(row, 0)) {
				//printf("가로 %d\n", row);
				ans += 1;
			}
		}
		memset(check, false, sizeof(check));
		//세로 훑기
		for (int col = 0; col < n; col++) {
			if (go2(0, col)) {
				//printf("세로 %d\n", col);
				ans += 1;
			}
		}
		printf("#%d %d\n", tc, ans);
	}
	return 0;
}
```
