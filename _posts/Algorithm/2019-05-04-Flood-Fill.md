---
title: "[Flood Fill] 플루드 필"
excerpt: "어떤 위치와 연결된 모든 위치를 찾는다."
date: 2019-05-03T15:34:30-04:00
categories:
  - Algorithm
tags:
  - Flood-Fill
  - BOJ
  - DFS

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---
Goal : Flood Fill을 머릿속에 구체적으로 그릴 수 있다.
---

## 목표  

어떤 위치와 연결된 모든 위치를 찾는다. ([DFS/BFS](https://niklasjang.github.io/algorithm/Flood-Fill/)알고리즘을 사용합니다. )

문제를 통해서 위의 목표를 어떻게 달성하는지 보겠습니다. 

## 백준 [2667번](https://www.acmicpc.net/problem/2667)

문제 :  
1. NxN크기의 정사각형이 있고 각 칸은 1x1크기이다. 
2. 집이 있는 곳은 1, 없는 곳은 0이다.
3. 집들이 연결되어있는 것은 `단지`라고 정의하고, 단지가 총 몇개가 있는지 각 단지는 몇 개의 집으로 구성되어있는지 출력한다.
4. 단, 연결은 상/하/좌/우/로만 연결된 경우이다. 대각선은 연결이 아니다.

![flood-fill](/assets/images/boj/flood-fill.jpg)

풀이 :  


```cpp
scanf("%1d", &a[i][j]);
```  
1. 먼저 위의 코드로 정수 한자리씩 입력받기를 구현해야함을 인지합니다.  
2. 입력을 제대로 입력 받았으면 모든 칸에서 dfs를 시작할 조건이 되는지 따져봅니다. 집이 있고, 아직 단지가 주어지지 않았으면 시작합니다.
3. 집이 있지만 단지가 주어졌으면 dfs를 시작하지 않습니다.
4. dfs를 한 번 실행하고 끝나면, 연결된 모든 단지에는 단지 번호가 부여될 것입니다.
5. 마지막 노드까지 dfs 실행 조건을 따져보고 완료했으면 단지 번호를 부여하는 것이 완료됩니다.
6. 마지막으로 전체를 훑으면서 단지 번호 별로 집이 몇 채인지 count하고 꼭 문제의 조건에 따라서 `정렬`까지 해줍니다.

```cpp
/*
2019-05-04
장환석

<그림 1>과 같이 정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다. 철수는 이 지도를 가지고 연결된 집들의 모임인 단지를 정의하고, 단지에 번호를 붙이려 한다. 여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다. <그림 2>는 <그림 1>을 단지별로 번호를 붙인 것이다. 지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.

입력
첫 번째 줄에는 지도의 크기 N(정사각형이므로 가로와 세로의 크기는 같으며 5≤N≤25)이 입력되고, 그 다음 N줄에는 각각 N개의 자료(0혹은 1)가 입력된다.

출력
첫 번째 줄에는 총 단지수를 출력하시오. 그리고 각 단지내 집의 수를 오름차순으로 정렬하여 한 줄에 하나씩 출력하시오.

*/

#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

int a[25][25];
int group[25][25];
int dx[] = { 0,0,-1,+1 }; //상하좌우
int dy[] = { 1,-1,0,0 };
int N = 0;
int houses[25*25]; //모두 다른 단지일 경우를 대비

void  dfs(int i, int j, int g) {
	group[i][j] = g; //현재 집 방문
	for (int k = 0; k < 4; k++) {
		int x = i + dx[k];
		int y = j + dy[k];
		if (x < 0 || x >= N) continue;
		if (y < 0 || y >= N) continue;
		if (a[x][y] == 1 && group[x][y] == 0) {
			dfs(x, y, g);
		}
	}
}

int main(void) {
	scanf("%d", &N);
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < N; j++) {
			scanf("%1d", &a[i][j]); //정수 한자리씩 입력받기
		}
	}

	int gnum = 1;
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < N; j++) {
			if (a[i][j] == 1 && group[i][j] == 0) { //집은 있는데 그룹이 없는 경우
				dfs(i, j,gnum);
				gnum++;
			}
		}
	}
	/*
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < N; j++) {
			printf("%d ", group[i][j]);
		}
		puts("");
	}*/

	printf("%d\n", gnum-1);
	

	//각 단지별 집의 수 계산
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < N; j++) {
			houses[group[i][j]] += 1;
		}
	}
	sort(houses+1, houses + gnum);
	//각 단지별 집의 수 출력
	for (int i = 1; i < gnum; i++) {
		printf("%d\n", houses[i]);
	}

	return 0;
}
```

## 백준 4963번

풀이 :  
1. 섬의 갯수를 세야한다.
2. 상하좌우 4방향 으리고 대각선까지 연결되었다고 본다.  

이 문제에 대해서는 위 문제에서 dx[] dy[]의 영역만 확장된 것입니다. (그런데 푸는데 전 1시간이나 걸렸네요..)


```cpp
/*
2019-05-05
장환석

문제
정사각형으로 이루어져 있는 섬과 바다 지도가 주어진다. 섬의 개수를 세는 프로그램을 작성하시오.

한 정사각형과 가로, 세로 또는 대각선으로 연결되어 있는 사각형은 걸어갈 수 있는 사각형이다.

두 정사각형이 같은 섬에 있으려면, 한 정사각형에서 다른 정사각형으로 걸어서 갈 수 있는 경로가 있어야 한다. 지도는 바다로 둘러쌓여 있으며, 지도 밖으로 나갈 수 없다.

입력
입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 테스트 케이스의 첫째 줄에는 지도의 너비 w와 높이 h가 주어진다. w와 h는 50보다 작거나 같은 양의 정수이다.

둘째 줄부터 h개 줄에는 지도가 주어진다. 1은 땅, 0은 바다이다.

입력의 마지막 줄에는 0이 두 개 주어진다.

출력
각 테스트 케이스에 대해서, 섬의 개수를 출력한다.
*/

#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int w, h;
int a[50][50];
int group[50][50];
int gnum;
int island[50 * 50];
//            우 좌  상  하 우상 우하 좌상 좌하
int dx[8] = { 1, -1, 0 , 0, 1 , 1, -1, -1 };
int dy[8] = { 0, 0,  1, -1, 1,  -1, 1,  -1};

void dfs(int x, int y, int g) { // g means group
	//지정된 group을 지정
	group[x][y] = g;
	int nx=0, ny=0; //next_x,_y
	for (int k = 0; k < 8; k++) {
		nx = x + dx[k];
		ny = y + dy[k];
		//벗어난 영역은 제외
		if (nx < 0 || nx >= h) continue;
		if (ny < 0 || ny >= w) continue;
		//벗어나지 않은 모든 영역에 대해서 섬이있는지 그리고 그룹이 정해졌는지 확인
		if (a[nx][ny] == 1 && group[nx][ny] == 0) {
			dfs(nx, ny, g);
		}
	}
}


int main(void) {

	while (true) {
		
		//테스트 케이스 별 rwo col 입력
		scanf("%d %d", &w, &h);

		//종료 처리
		if (w == 0 && h == 0) break;

		//row col에 해당하는 입력 받아오기 땅은 1, 바다는 0
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < w; j++) {
				scanf("%d", &a[i][j]);
			}
		}

		gnum = 0;
		//dfs 알고리즘으로 연결된 요소를 그룹으로 묶는다. 
		//모든 땅에 대해서 dfs를 시작하기
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < w; j++) {
				if (a[i][j] == 1 && group[i][j] == 0) {
					dfs(i, j, ++gnum);
				}
			}
		}

		printf("%d\n", gnum);

		//초기화
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < w; j++) {
				a[i][j] = 0;
				group[i][j] = 0;
			}
		}
	}
	
	return 0;
}

```

---

이상 연결된 모든 곳은 방문하기 위한 알고리즘인 flood-fill을 알아봤습니다.

```cpp

int dx[8] = { 1, -1, 0 , 0, 1 , 1, -1, -1 };
int dy[8] = { 0, 0,  1, -1, 1,  -1, 1,  -1};

...


for (int k = 0; k < 8; k++) {
		nx = x + dx[k];
		ny = y + dy[k];
		//벗어난 영역은 제외
		if (nx < 0 || nx >= h) continue;
		if (ny < 0 || ny >= w) continue;
```

이 부분이 핵심적인 알고리즘이었습니다. 