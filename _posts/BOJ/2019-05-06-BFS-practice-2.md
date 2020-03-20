---
title: "BFS 문제 풀이 - 2"
excerpt: "최단거리 알고리즘으로서의 BFS"
date: 2019-05-03T15:34:30-04:00
categories:
  - BOJ
tags:
  - BOJ
  - BFS
  - "12851"
  - "13549"
  - "13913"
  - "14226"
  - "1261"
  - "2206"
  - "3055"
  

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


## 백준  12851번 숨바꼭질2

###  풀이
N에서 K까지 가능 방법의 수를 출력해야 하므로 **Pop을 할 때 count를 해야한다.** 

```cpp
#include <iostream>
#include <cstdio>
#include <cstring>
#include <queue>
using namespace std;
int N, K;
int check[200000]; //0은 방문하지 않음. 시작은 1 다음 step은 2 ~~~ 총 step 갯수는 최대값 -1
void bfs(int start) {
	queue<int> q;
	queue<int> next_q;
	q.push(start);
	int temp = 0;
	int second = 0;
	while (!q.empty()) {
		int curr = q.front(); 
		q.pop(); check[curr] += 1; //숨바꼭질 2문제에서는 pop을 할 때 count를 해준다.
		temp = curr * 2;
		if (0 <= temp && temp < 200000) {
			if (check[temp] == 0) {
				next_q.push(temp);
			}
		}
		temp = curr + 1;
		if (0 <= temp && temp < 200000) {
			if (check[temp] == 0) {
				next_q.push(temp);
			}
		}
		temp = curr - 1;
		if (0 <= temp && temp < 200000) {
			if (check[temp] == 0) {
				next_q.push(temp);
			}
		}

		if (q.empty()) {
			if (check[K] != 0) {
				printf("%d\n", second);
				printf("%d\n", check[K]);
				break;
			}
			second += 1;
			q = next_q;
			next_q = queue<int>();
		}
	}
}

int main(void) {
	scanf("%d %d", &N, &K);
	bfs(N);
	return 0;
}

```

## 백준 13549번 숨바꼭질3

### 풀이  

1. queue에 들어가는 데이터는 가중치의 차이가 1인 것들만 들어갈 수 있다. 
2. queue에 들어있는 어떤 데이터를 선택해도 인접한 데이터와의 가중치 차이는 1이다.  
3. 문제에서 가중치가 0인 조건을 포함해야한다고 선언하면, 가중치가 0인 데이터만 넣는 queue를 따로 만든다. 
4. 즉, queue를 두 개 사용한다.  

문제에 맞춰서 위 개념을 변형하면 아래와 같이 진행된다.  

1. 0초가 걸리는 operation은 0초 queue에 다 넣고
2. 1초가 걸리는 operation은 1초 queue에 다 넣는다.
3. 0초 queue에서 fornt르 pop하고 이에 대해서 1초 queue에 넣어야하는 것들을 모두 넣는다. 
4. 0초가 걸리는 것들은 시작하는 t에서 모두 이루어질 수 있으므로 0초 queue에 들어갈 수 있는 것들을 모두 다 넣고 다시 빼서 처리까지 해줘야한다.
5. 2초 큐, 3초큐 등등 계속해서 큐를 만드는 것이 아니라 current-queue와 next-queue 두 개만 만든다.
6. 현재의 큐가 empty가 되면 next queue를 현재의 큐로 만들고 next queue는 비어있는 새로운 큐로 다시 만든다. 
7. 만약 dequeue를 사용하면 double ended queue이므로 앞으로 넣고, 앞에서 뺄 수도 있다. 따라서 0초인 것은 앞으로 넣고, 1초가 필요한 것은 
뒤에 push를 하는 것으로 queue 하나로 풀 수도 있따. 
![13549](/assets/images/boj/13549.jpg)


## 백준 13549번 숨바꼭질4

### 풀이  

1. 이전 문제와 같이 두 개의 queue를 사용해서 언제 현재의 step이 끝나는지 확인합니다.
2. queue에서 pop할 때마다 첫 번때 stack에 넣어서 이전의 경로를 탐색할 수 있는 조건을 만듭니다.
3. stack에 넣는 pair는 <현재의 값, 이전의 값>을 의미합니다. stack에서 top을 가져와서 현재의 값이 되기 바로 직전의 값을 aim으로 두고 stack이 빌 때까지 계속 찾습니다.
4. 3번에서 찾는 것은 두 번쨰 stack에 다시 넣고 top에서 부터 순서대로 출력하면 됩니다. 

```cpp

#include <iostream>
#include <cstdio>
#include <cstring>
#include <queue>
#include <stack>

using namespace std;
int N, K;
int check[200000]; //0은 방문하지 않음. 시작은 1 다음 step은 2 ~~~ 총 step 갯수는 최대값 -1
void bfs(int start) {
	queue<pair<int, int> > q;
	queue<pair<int, int> > next_q;
	stack<pair<int, int> > stck;
	stack<int > output;
	q.push(make_pair(start,-1));  check[start] = 1; //넣을 때 check
	int temp = 0;
	int second = 0;
	while (!q.empty()) {
		int curr = 0, prv = 0;
		curr = q.front().first;
		prv = q.front().second;
		q.pop(); //뺄 때 stack에 넣어두기
		stck.push(make_pair(curr, prv));
		temp = curr * 2;	
		if (0 <= temp && temp < 200000) {
			if (check[temp] == 0) {
				next_q.push(make_pair(temp, curr));
				check[temp] = check[curr] +1;
			}
		}
		temp = curr + 1;
		if (0 <= temp && temp < 200000) {
			if (check[temp] == 0) {
				next_q.push(make_pair(temp, curr));
				check[temp] = check[curr] + 1;
			}
		}
		temp = curr - 1;
		if (0 <= temp && temp < 200000) {
			if (check[temp] == 0) {
				next_q.push(make_pair(temp, curr));
				check[temp] = check[curr] + 1;
			}
		}

		if (q.empty()) {
			//현재의 큐가 비어 있을 때 check를 확인하고
			//이전 t에서 queue에 넣으면서 check를 했으면
			if (check[K] == check[curr]) {
				printf("%d\n", second);
				break;
			}
			second += 1;
			q = next_q;
			next_q = queue<pair<int, int> >();
		}
	}
	int aim = K;
	while (!stck.empty()) {
		pair<int, int> curr = stck.top();
		stck.pop();
		if (curr.first == aim) {
			output.push(curr.first);
			aim = curr.second; //aim = prv;
		}
	}

	while (!output.empty()) {
		printf("%d ", output.top());
		output.pop();
	}
}

int main(void) {
	scanf("%d %d", &N, &K);
	bfs(N);
	return 0;
}
```


## 백준 : 1261 

### 풀이  
1. 가중치 = 문제에서 최소로 구해야하는 값  
2. 빈칸으로 움직이는 것은 가중치가 0
3. 벽을 부수는 것은 가중치가 1
4. 가중치가 0또는 1만 나오는 것은 deque를 사용하는 것이 좋다.


```cpp
//BFS를 사용해서 일단 방문하고, 다음 BFS 턴에서 이미 방문한 점이라도 현재의 칸을 지나서 가는 것이 더 벽을 덜 부수는 경우라면
//현재의 칸에서 다음 지점으로 이동한다.
/*
2019-00-00
장환석

*/

#include <iostream>
#include <queue>
#include <cstdio>
#include <cstring>
using namespace std;

int N, M;
int a[101][101];
int check[101][101]; //얼마나 많은 벽을 부수고 왔는지를 카운트, 방문하지 않았으면 -1
int dh[4] = { 0, 0, 1, -1 };
int dw[4] = { 1, -1, 0, 0 };
int main(void) {
	scanf_s("%d %d", &M, &N);
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++){
			scanf_s("%1d", &a[i][j]);
		}
	}

	memset(check, -1, sizeof(check));

	queue<pair<int, int> > q;

	check[0][0]= 0; //방문, 0개 부수고 옴
	q.push(make_pair(0, 0)); 
	int index = 0;
	while (!q.empty()) {
		pair<int, int> curr = q.front(); q.pop();
		int h = curr.first; int w = curr.second;
		for (int k = 0; k < 4; k++) {
			int nh = h + dh[k]; //next h
			int nw = w + dw[k]; //next w
			if (nh <0 || nh >= N) continue;
			if (nw <0 || nw >= M) continue;
			if (check[nh][nw] == -1 ) {
				//다음 방문할 곳이 벽이면 1 추가 아니면 그대로
				check[nh][nw] = check[h][w] + a[nh][nw]; 
				q.push(make_pair(nh, nw));
			}else{
				//이미 방문한 곳이면 기존의 값이랑 현재에서 가는 값이랑 비교에서 작은 걸로 저장
				if (check[nh][nw] > check[h][w] + a[nh][nw]) {
					check[nh][nw] = check[h][w] + a[nh][nw];
					q.push(make_pair(nh, nw)); //기존에 방문했던 점이라도 현재의 점을 지나서 방문하면 q에 넣어줘야 한다.
				}
			}
		}
	}
	/*
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			printf("%d ", check[i][j]);
		}
		puts("");
	}*/

	printf("%d ", check[N - 1][M - 1]);
	
	
	return 0;
}
```

```cpp
//deque를 이용한 풀이
/*
2019-00-00
장환석

*/

#include <iostream>
#include <queue>
#include <cstdio>
#include <cstring>
#include <deque>
using namespace std;

int N, M;
int a[101][101];
int check[101][101]; //얼마나 많은 벽을 부수고 왔는지를 카운트, 방문하지 않았으면 -1
int dh[4] = { 0, 0, 1, -1 };
int dw[4] = { 1, -1, 0, 0 };
int main(void) {
	scanf("%d %d", &M, &N);
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			scanf("%1d", &a[i][j]);
		}
	}

	memset(check, -1, sizeof(check));

	deque<pair<int, int> > q;

	check[0][0] = 0; //방문, 0개 부수고 옴
	q.push_front(make_pair(0, 0));
	int index = 0;
	while (!q.empty()) {
		pair<int, int> curr = q.front(); q.pop_front();
		int h = curr.first; int w = curr.second;
		for (int k = 0; k < 4; k++) {
			int nh = h + dh[k]; //next h
			int nw = w + dw[k]; //next w
			if (nh < 0 || nh >= N) continue;
			if (nw < 0 || nw >= M) continue;
			if (check[nh][nw] == -1) {
				//다음 방문할 곳이 벽이면 1 추가 아니면 그대로
				if (a[nh][nw] == 0) {
					check[nh][nw] = check[h][w] + a[nh][nw];
					q.push_front(make_pair(nh, nw));
				}
				else {
					check[nh][nw] = check[h][w] + a[nh][nw];
					q.push_back(make_pair(nh, nw));
				}
			}
			else {
				//이미 방문한 곳이면 기존의 값이랑 현재에서 가는 값이랑 비교에서 작은 걸로 저장
				if (a[nh][nw] == 0) {
					if (check[nh][nw] > check[h][w]) {
						check[nh][nw] = check[h][w];
						q.push_front(make_pair(nh, nw)); //기존에 방문했던 점이라도 현재의 점을 지나서 방문하면 q에 넣어줘야 한다.
					}
				}
				else {
					if (check[nh][nw] > check[h][w] + a[nh][nw]) {
						check[nh][nw] = check[h][w] + a[nh][nw];
						q.push_back(make_pair(nh, nw)); //기존에 방문했던 점이라도 현재의 점을 지나서 방문하면 q에 넣어줘야 한다.
					}
				}
			}
		}
	}
	/*
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			printf("%d ", check[i][j]);
		}
		puts("");
	}
	*/
	printf("%d ", check[N - 1][M - 1]);


	return 0;
}
```

## 백준 : 2206 벽 부수고 이동하기

### 풀이
1. 벽을 부순 적이 없으면 빈칸으로 가거나 벽을 부수고 이동할 수 있다.
2. 벽을 부수 적이 있으면 빈칸으로만 이동할 수 있다. 
3. 좌표 i,j에 벽을 부순적이 있는지 없는지를 나타내는 k를 추가해서 tuple(i,j,k)로 푼다
4. 벽을 부수는 조건은 (0. 빈칸으로 갈 수 없다. 1. 벽을 부순 적이 없다. 2. 벽이 있다. 3. 해당 벽을 방문한 적이 없다. )
5. 정답을 출력할 때는 아래의 4가지를 점검합니다.

1. 벽을 안부수고도 오고, 벽을 부수고도 왔다. -> 둘 중 min을 출력
2. 벽을 안부수고 왔다.
4. 벽을 부수고 왔다.
4. 오지 못했다.

```cpp
#include <tuple>
queue<tuple<int,int,int>> q;
q.push(make_tuple(0,0,0));
int x,y,z;
tie(x,y,z) = q.front(); q.pop(); 

```
를 사용해서 해결합니다. 

```cpp

/*
2019-05-15
장환석

*/

#include <iostream>
#include <queue>
#include <cstdio>
#include <cstring>
#include <deque>
#include <tuple>
using namespace std;

int N, M;
int a[1000][1000];
int check[1000][1000][2]; //(x,y,부쉈는지 아닌지) = 원점에서 지금까지 지나온 칸 수
int dh[4] = { 0, 0, 1, -1 };
int dw[4] = { 1, -1, 0, 0 };

int main(void) {
	scanf("%d %d", &N, &M);
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			scanf("%1d", &a[i][j]);
		}
	}
	
	queue<tuple<int,int,int> > q; //다음에 방문할 좌표의 h,w 가 push됨

	check[0][0][0]= 1;      //(h,w,부쉈는지 아닌지) = 원점에서 지금까지 지나온 칸 수
	q.push(make_tuple(0,0,0)); // ( 다음에 방문할 h 좌표, 다음에 방문할 w 좌표, 부웠는지 아닌지)
	while (!q.empty()) {
		int h, w, p; 
		tie(h,w,p) = q.front(); q.pop();
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
			if (p == 0 && a[nh][nw] == 1 && check[nh][nw][p+1] == 0) {
				check[nh][nw][1] = check[h][w][p] + 1;
				q.push(make_tuple(nh, nw, p+1));
			}
		}
	}
	/*
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			printf("(%d) ", check[i][j][0]);
		}
		puts("");
	}

	puts("");

	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			printf("(%d) ", check[i][j][1]);
		}
		puts("");
	}*/


	if (check[N - 1][M - 1][0] != 0 && check[N - 1][M - 1][1] != 0) {
		printf("%d ", check[N-1][M-1][1] > check[N-1][M - 1][0] ? check[N-1][M - 1][0] : check[N-1][M - 1][1]);
	}
	else if (check[N - 1][M - 1][0] != 0) {
		printf("%d ", check[N - 1][M - 1][0]);
	}
	else if (check[N - 1][M - 1][1] != 0) {
		printf("%d ", check[N - 1][M - 1][1]);
	}
	else {
		printf("%d\n", -1);
	}

	return 0;
}
```


## 백준 : 3055

### 풀이  

1. 물이 이동하는 시간이 있고, 고슴도치가 이동하는 시간이 있다.
2. 이 둘을 동시에 queue를 돌리면 귀찮아진다. 두 개의 queue를 동시에 돌려야하니까. 
3. 먼저 물이 도달하는 시간을 매 칸마다 다 정해두고, 고슴도치가 해당 시간보다 일찍 도착할 수 있는지를 체크한다.