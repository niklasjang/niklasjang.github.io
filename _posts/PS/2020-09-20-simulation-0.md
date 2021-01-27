---
title: "[PS][시뮬레이션] Chapter 0"
excerpt: "이동시키기 & 순환시키기"
date: 2020-09-20
categories:
  - PS
tags:
  - ps 
  - simpulation
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

시뮬레이션입니다. 구현력을 높이는 과정이 길고 힘들 것 같습니다. 
- - -

## 이동시키기

두 개의 배열을 사용한다. 하나는 객체 저장용, 하나는 중복 제거용.  

### [낚시왕](https://www.acmicpc.net/problem/17143)

```cpp
//시간 초과 코드
#include <iostream>
#include <vector>
using namespace std;
struct Shark {
	int x, y, s, d, z;
	Shark() {
		x = y = s = d = z = 0;
	}
	Shark(int r, int c, int s, int d, int z) 
		: x(r),y(c),s(s),d(d),z(z) {}
};

Shark make_shark(int r, int c, int s, int d, int z) {
	return { r,c,s,d,z };
}

int n; //항상 세로 길이
int m; //항상 가로 길이
int k; //상어의 수
Shark fish[10010]; //정보 저장 용도
vector<int> map[110][110]; //겹치는지 판단
int answer = 0;
int dx[5] = { 0,-1,1,0,0 };
int dy[5] = { 0,0,0,1,-1 }; 
int next_dir[5] = { 0,2,1,4,3 };
void remove(int idx) {
	fish[idx] = fish[k - 1];
	k--;
}

bool in_range(int x, int y) {
	return x >= 0 && y >= 0 && n > x && m > y;
}

void move() {
	int i,j;
	int x, y;
	int nx, ny;
	for (int i = 0; i < k; i++) {
		x = fish[i].x;
		y = fish[i].y;
		for (j = 0; j < fish[i].s; j++) {
			nx = x + dx[fish[i].d];
			ny = y + dy[fish[i].d];
			if (!in_range(nx, ny)) {
				fish[i].d = next_dir[fish[i].d];

				nx = x + dx[fish[i].d];
				ny = y + dy[fish[i].d];
			} 
			x = nx;
			y = ny;
		}
	}
}

void hunt(int idx) {
	int i;
	for (i = 1; i <= n; i++) {
		if (!map[i][idx].empty()) {
			answer += fish[map[i][idx][0]].z;
			remove(map[i][idx][0]); //fish 배열에서 값 지우기
			map[i][idx].clear(); //맵에서 지우기
		}
	}
	for (int i = 0; i < k; i++) {
		map[fish[i].x][fish[i].y].clear();
	}
}

int main(void) {
	int i;
	int x, y, s, d, z;
	cin >> n >> m >> k;
	for (int i = 0; i < k; i++) {
		cin >> x >> y >> s >> d >> z;
		fish[i] = make_shark(x, y, s, d, z);
		map[x][y].push_back(i);
	}
	for (int i = 1; i <= m; i++) {
		hunt(i);
		move();
	}
	return 0;
}
```

아래는 정답코드입니다.  

```cpp
//정답 코드
#include <iostream>
#include <string.h>
using namespace std;
struct Shark {
	int x, y, s, d, z;
	Shark() {
		x = y = s = d = z = 0;
	}
	Shark(int r, int c, int s, int d, int z) 
		: x(r),y(c),s(s),d(d),z(z) {}
};

Shark make_shark(int r, int c, int s, int d, int z) {
	return { r,c,s,d,z };
}

int n; //항상 세로 길이
int m; //항상 가로 길이
int k; //상어의 수
Shark fish[10010]; //정보 저장 용도
int map[110][110]; //겹치는지 판단
int answer = 0;
int dx[5] = { 0,-1,1,0,0 };
int dy[5] = { 0,0,0,1,-1 }; 
int next_dir[5] = { 0,2,1,4,3 };
void remove(int idx) {
	//상어 인덱스틑 [1,k]이다.
	fish[idx] = fish[k];
	k--;
}

bool in_range(int x, int y) {
	return x >= 1 && y >= 1 && n >= x && m >= y;
}

void show() {
	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= m; j++) {
			cout << map[i][j] << " ";
		}
		cout << "\n";
	}
}

void hunt(int idx) {
	int i;
	for (i = 1; i <= n; i++) {
		if (map[i][idx] != 0) {
			//cout << __FUNCTION__ << char(map[i][idx] + 'A' -1) << "\n";
			answer += fish[map[i][idx]].z;
			remove(map[i][idx]); //fish 배열에서 값 지우기
			map[i][idx] = 0;
			break;
		}
	}
	memset(map, 0, sizeof(map));
}

void move() {
	int i,j;
	int x, y,d;
	int nx, ny;
	int dist; //남은 이동거리
	for (int i = 1; i <= k; i++) {
		x = fish[i].x;
		y = fish[i].y; 
		d = fish[i].d;
		dist = fish[i].s;
		//point 2 : 이동할 거리가 남아있을 때 이동에만 집중한다. 
		while (dist) {
			nx = x + dist * dx[d];
			ny = y + dist * dy[d];
			//point 3 : 현재 방향으로 끝까지 이동할 때 범위 여부를 기준으로 판단한다. 
			if (!in_range(nx, ny)) {
				//보고있는 방향 끝으로 간다.
				if (d == 1) {
					dist -= x - 1;
					x = 1;
				}
				else if (d == 2) {
					dist -= n - x;
					x = n; 
				}
				else if (d == 3) {
					dist -= m - y;
					y = m;
				}
				else {
					dist -= y - 1; 
					y = 1;
				}
				d = next_dir[d];
			}
			else {
				//dist만큼 이동한다. 
				x = nx;
				y = ny;
				dist = 0;
			}
		}
		fish[i].x = x;
		fish[i].y = y;
		fish[i].d = d;
		if (map[x][y] == 0) {
			map[x][y] = i;
		}
		else {
			int prev = map[x][y];

			//point 4 : 현재 이동중인 상어만 움직인다. 
			//도착 지점에 이미 존재하는 상어는 이전에 움직인 상어로서,
			//이전에 움직인 상어를 없애려고하면 가장 뒤의 상어가 움직이지 않게된다.
			//
			//예를 들어 1,2,3번 상어가 있을 때 1번 상어가 이동해서 기다리는 위치에 2번이 도착해야할 때,
			//1번 상어를 없애면 3번 상어 정보가 1번 상어 위치로 가게되어 i--를 해도 이동을 하지 않게 된다.
			//
			// 결론적으로는 i번째 상어를 움직이면 i번째 상어만 지울 수 있다. 
			if (fish[prev].z < fish[i].z) {
				fish[prev] = fish[i];
				remove(i);
				i--;
			}
			else {
				remove(i);
				i--;
			}
		}
	}
}

int main(void) {
	int i;
	int x, y, s, d, z;
	//freopen("input.txt", "r", stdin);
	cin >> n >> m >> k;
	//point 0 : 상어의 index를 1부터하여 hunk를 할 때 제일 먼저 입력된 상어도 찾을 수 있도록 한다.
	for (int i = 1; i <=k; i++) {
		cin >> x >> y >> s >> d >> z;
		//point 1 : 이동 주기를 통해 s를 줄인다.
		if (d < 3) {
			s %= 2 * n - 2;
		}
		else {
			s %= 2 * m - 2;
		}
		fish[i] = make_shark(x, y, s, d, z);
		map[x][y] = i;
	}
	for (int i = 1; i <= m; i++) {
		hunt(i);
		move();
	}
	cout << answer << "\n";
	return 0;
}
```

1. 상어 구조체 생성하기
1. map에 상어 배열의 index만 저장하기
1. 한 칸에 겹치는 경우는, 가장 큰 상어의 index만 하나 남기고 상어를 없애면 된다.
1. R,C가 각각 100이고 s가 1000이기 때문에 R \* C \* S \* 최대상어수(R\*C)는 당연히 시간초과가 나온다.
1. 한 방향으로 한 칸씩 움직이는 것이 아니라, 움직일 수 있는만큼 움직이는 것으로 해결한다.
1. 각 상어의 한 바퀴 주기만금 계산해서 불필요한 이동을 줄인다.
1. while()안에서 가지치기 조건 먼저 생성하고 시작한다. 
1. map에 이미 상어가 있을 때 기존의 상어 index를 remove 하는 것이 아니라, 현재 상어의 값을 기존 index에 복사하고 i를 지운다.(마지막 상어를 i번째로 가져오고)  i--를 진행해서 i++를 상쇄하고 i번째부터 시작한다. 

### [미생물 격리](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV597vbqAH0DFAVl)

### [원자 소멸 시뮬레이션](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWXRFInKex8DFAUo)

### [새로운 게임2](https://www.acmicpc.net/problem/17837)

문제의 정답은 [여기](https://gist.github.com/niklasjang/2f2923da61ecde17ba638662bd6434a2)에서 확인할 수 있습니다. 

1. 상어 문제와 같이 객체 저장과 겹치는 부분 판단을 따로 구현합니다.

## 순환시키기

이동방향의 반대로 당긴다는 느낌으로 접근한다. 마지막 값만 temp에 저장해두면 된다. 

### [미세먼지 안녕!](https://www.acmicpc.net/problem/17144)

1. 미는 방향의 반대로 당긴다고 생각한다.
1. 특정 위치의 값을 save해놔야한다.

문제의 정답은 [여기](https://gist.github.com/niklasjang/74e8b79519f90ab98cc034c4ca6551eb)에서 확인할 수 있습니다. 
 
### [원판돌리기](https://www.acmicpc.net/problem/17822)

1. k칸 회전을 1칸씩 k번 돌리는 것으로 반복해도 된다. 50 \* 50 \* 50이기 때문에 시간초과가 나지 않는다.
1. deque를 사용하면 rotate가 쉬울 것으로 보인다.

문제의 정답은 [여기](https://gist.github.com/niklasjang/4528e16424a478d24ab983583e1a517a)에서 확인할 수 있습니다. 


### [게리멘더링2]](https://www.acmicpc.net/problem/17779)

이 문제는 풀이만 공부하고 나중에 풀어보겠습니다. 

1. 그림을 보고 5번 선거구의 개형을 확인한다.
1. 5번 선거구의 테두리를 5로 칠한다.
1. 5번 선거구의 모서리에서 벽까지, 경계지점의 선거구를 칠한다.
1. 전체 사각형의 네 귀퉁이에서 map[nx][ny]==0인 지점에 대해서만 flood fill을 진행한다.
1. 5번 선거구의 내부를 5로 채운다.
  1. x,y 지점에서 dfs를 돌린다.
  1. 위의 방법만으로는 채워지지 않는 5번 지역이 있으므로 아직까지 0인 경우는 모두 5번 선거구로 처리한다.
1. 답을 출력한다.

