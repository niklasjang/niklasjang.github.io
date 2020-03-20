---
title: "BFS 문제 풀이 - 3"
excerpt: "최단거리 알고리즘으로서의 BFS"
date: 2019-05-03T15:34:30-04:00
categories:
  - BOJ
tags:
  - BOJ
  - BFS
  - "14442"
  - "16933"
  - "16943"
  

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---
Goal : 최단거리 알고리즘으로서의 BFS를 내 손이 멋대로 짜게 한다. 
---


## 개념  
BFS는 임의의 정점에서 모든 정점을 한 번씩만 방문하는 알고리즘입니다. 이런 BFS가 아래의 조건일 때는 `최단거리 알고리즘`으로 사용됩니다.  

**모든 가중치가 1일 때**

## BFS를 이용해서 해결할 수 있는 문제의 조건  

1. 최소 비용의 문제이어야 한다.
2. 간선의 가중치가 1이어야 한다.
3. 정점과 간선의 갯수가 적어야 한다. (적다는 것은 문제의 조건에 맞추어서 해결할 수 있을 정도로 작다라는 의미)(시간 제한 + 메모리 제한)

즉, 최소 비용의 의미가 간선의 가중치를 의미해야 합니다. 

## 백준 14442 벽 부수고 이동하기 2

###코드
```cpp
/*
2019-05-16
장환석

*/

#include <iostream>
#include <queue>
#include <cstdio>
#include <cstring>
#include <deque>
#include <tuple>
using namespace std;

int N, M, K;
int a[1000][1000];
int check[1000][1000][11]; //(x,y,부쉈는지 아닌지) = 원점에서 지금까지 지나온 칸 수
int dh[4] = { 0, 0, 1, -1 };
int dw[4] = { 1, -1, 0, 0 };

int main(void) {
	scanf("%d %d %d", &N, &M, &K);
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			scanf("%1d", &a[i][j]);
		}
	}

	queue<tuple<int, int, int> > q; //다음에 방문할 좌표의 h,w 가 push됨
	queue<tuple<int, int, int> > next;
	check[0][0][0] = 1;      //(h,w,부쉈는지 아닌지) = 원점에서 지금까지 지나온 칸 수
	q.push(make_tuple(0, 0, 0)); // ( 다음에 방문할 h 좌표, 다음에 방문할 w 좌표, 부웠는지 아닌지)
	while (!q.empty()) {
		int h, w, p;
		tie(h, w, p) = q.front(); q.pop();
		for (int k = 0; k < 4; k++) {
			
			int nh = h + dh[k]; //next h
			int nw = w + dw[k]; //next w
			if (nh < 0 || nh >= N || nw < 0 || nw >= M) continue;

			//4가지 방향 중 한 방향만  생각하면 네 가지 방향에 모두 적용되고

			//방으로가는 경우
			//다음에 방문할 장소가 방이고, 그 방을 방문한 적이 없으면 (이전에 방문했던 p에 대해서)
			//0으로 올 때, 0에서 오는지 1에서 오는지 모두 처리
			if (a[nh][nw] == 0 && check[nh][nw][p] == 0) {
				check[nh][nw][p] = check[h][w][p] + 1;
				q.push(make_tuple(nh, nw, p));
			}

			//벽으로 가는 경우
			//지금까지 부순 벽이 없고, 벽이 있고 , 그 벽을 방문하지 않았으면
			//1로 오는 경우는 0에서 오는 경우만 처리
			if (p <= K-1 && a[nh][nw] == 1 && check[nh][nw][p + 1] == 0) {
				check[nh][nw][p+1] = check[h][w][p] + 1;
				q.push(make_tuple(nh, nw, p + 1));
			}
			
		}
	}
	
	/*for (int k = 0; k <= K; k++) {
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				printf("(%d) ", check[i][j][k]);
			}
			puts("");
		}

		puts("");
	}*/
	

	


	int result = 10000;
	for (int i = 0; i <= K; i++) {
		//printf("check[N - 1][M - 1][i] : %d\n", check[N - 1][M - 1][i]);
		if (check[N - 1][M - 1][i] > 0 && result > check[N - 1][M - 1][i]) {
			result = check[N - 1][M - 1][i];
		}
	}

	if (result == 10000) {
		printf("-1");
	}
	else {
		printf("%d", result);
	}

	return 0;
}
```

## 백준 16933 벽 부수고 이동하기 3

###코드
```cpp
/*
2019-05-16
장환석

*/

#include <iostream>
#include <queue>
#include <cstdio>
#include <cstring>
#include <deque>
#include <tuple>
using namespace std;

int N, M, K;
int a[1000][1000];
bool check[1000][1000][11]; //(x,y,부쉈는지 아닌지) = 원점에서 지금까지 지나온 칸 수
int dh[4] = { 0, 0, 1, -1 };
int dw[4] = { 1, -1, 0, 0 };
int main(void) {
	scanf("%d %d %d", &N, &M, &K);
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			scanf("%1d", &a[i][j]);
		}
	}
	//day : 1이면 언제든 갈 수 있음
	//day : 0이면 밤에는 못뿌심
	//wait : 1이면 기다린 상태
	//wait : 0이면 기움직인 상태
	deque<tuple<int, int, bool, bool, int, int> > q; //<X, Y, Day, wait, 몇개 부수고, 총 N칸 떨어짐>
	deque<tuple<int, int, bool, bool, int, int> > next; //<X, Y, Day, wait, 몇개 부수고, 총 N칸 떨어짐>
	check[0][0][0] = true;                          //방문했는지 아닌지  
	q.push_back(make_tuple(0,0,true,false,0,1));  //<X, Y, Day, wait, 몇개 부수고, 총 N칸 떨어짐>
	int min = 10000;
	while (!q.empty()) {
		int h, w, wall, dst; bool day, wait;
		tie(h, w, day, wait, wall, dst) = q.front(); q.pop_front();
		

		//현재에서 갈 수 있는 0을 모두 간다.
		for (int k = 0; k < 4; k++) {
			int nh = h + dh[k]; //next h
			int nw = w + dw[k]; //next w
			if (nh < 0 || nh >= N || nw < 0 || nw >= M) continue;
			
			//0으로 움직이는 경우
			if (a[nh][nw] == 0 && check[nh][nw][wall] == 0) {
				check[nh][nw][wall] = true;
				q.push_back(make_tuple(nh, nw, !(day), false, wall, dst + 1));
			}
			//낮에 1로 움직이는 경우 : 기다린거랑 상관없음
			if (a[nh][nw] == 1 && check[nh][nw][wall] == 0 && day == true && wall < K) {
				check[nh][nw][wall] = true;
				q.push_back(make_tuple(nh, nw, !(day), false, wall + 1, dst + 1));
			}
			//기다리는 경우
			if (a[nh][nw] == 1 && check[nh][nw][wall] == 0 && day == false && wait == false && wall < K) {
				check[nh][nw][wall] = false;
				q.push_back(make_tuple(h, w, !(day), true, wall, dst + 1));
			}
		}
		if (h == N-1 && w == M-1) {
			if (dst > 0 && min > dst) {
				min = dst;
			}
		}
	}

	if (min == 10000) {
		printf("%d\n", -1);

	}
	else {
		printf("%d\n", min);
	}
	return 0;
}
```

## 백준 16946 벽 부수고 이동하기 4


### 풀이 
모든 정점에서 BFS를 진행하면 시간 초과가 난다. 0들을 묶어서 생각해야한다. 
###코드
```cpp

//시간초과나는 모든 정점에서 BFS 진행한 풀이
/*
2019-05-17
장환석


문제
N×M의 행렬로 표현되는 맵이 있다. 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다. 한 칸에서 다른 칸으로 이동하려면, 두 칸이 인접해야 한다. 두 칸이 변을 공유할 때, 인접하다고 한다.

각각의 벽에 대해서 다음을 구해보려고 한다.

벽을 부수고 이동할 수 있는 곳으로 변경한다.
그 위치에서 이동할 수 있는 칸의 개수를 세어본다.
입력
첫째 줄에 N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 1,000)이 주어진다. 다음 N개의 줄에 M개의 숫자로 맵이 주어진다.

출력
맵의 형태로 정답을 출력한다. 원래 빈 칸인 곳은 0을 출력하고, 벽인 곳은 이동할 수 있는 칸의 개수를 10으로 나눈 나머지를 출력한다.
*/

#include <iostream>
#include <queue>
#include <cstdio>
#include <cstring>
using namespace std;
int N, M;

int a[1001][1001];
bool check[1001][1001];
int room[1001][1001];

int dx[4] = { 0,0,1,-1 };
int dy[4] = { 1, -1, 0, 0 };

int bfs(int h, int w) {
	queue<pair<int, int>> check_q;

	queue<pair<int, int>> q;
	if (a[h][w] == 1) {
		room[h][w] = 1;
		q.push(make_pair(h, w));
	}
	else {
		return -1;
	}
	while (!q.empty()) {
		pair<int, int> curr = q.front(); q.pop();
		int x = curr.first;
		int y = curr.second;
		for (int k = 0; k < 4; k++) {
			int nh = x + dx[k];
			int nw = y + dy[k];
			if (nh < 0 || nw < 0 || nh >= N || nw >= M) continue;
			if (a[nh][nw] == 0 && check[nh][nw] == false) {
				check[nh][nw] = true;

				check_q.push(make_pair(nh, nw));

				room[h][w] += 1;
				q.push(make_pair(nh, nw));
			}
		}
	}
	memset(check, false, sizeof(check));
	/*
	while (!check_q.empty()) {
		pair<int, int> temp = check_q.front();
		//printf("(%d, %d) check_q를 false로 다시 함\n", temp.first, temp.second);
		check[temp.first][temp.second] = false;
		check_q.pop();
	}*/
	return 0;

}

int main(void) {

	scanf("%d %d", &N, &M);

	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			scanf("%1d", &a[i][j]);
		}
	}

	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			bfs(i, j);
		}
	}


	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			printf("%d", (room[i][j])% 10);
		}
		printf("\n");
	}
	return 0;
}
```

```cpp
//정답 풀이

푸는 중...
```