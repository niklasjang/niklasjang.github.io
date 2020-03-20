---
title: "[2252] 줄 세우기"
excerpt: "Topological Sort, 위상정렬"
date: 2019-06-02
categories:
  - BOJ
tags:
  - BOJ
  - Sort
  - Topological-Sort

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 풀이

1. 입력을 받으면서 인접리스트와 각 노드의 진입차수를 만든다.
2. 모든 노드에 대해서 3. ~ 6.과정을 반복하고 종료한다.
3. 방문하지 않았고, 루트노드인 경우 q에 넣는다.
4. q에서 가장 앞의 노드를 빼고 해당 노드를 지우면서 연결된 노드들의 인접간선을 -1 한다.
5. 인접간선을 변경한 노드 중에서 인접간선의 값이 0이 된 노드를 q에 넣는다.
6. q가 empty가 되면 종료한다.

## 코드
```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int N, M, A, B;

vector<int> a[32001]; //주어진 데이터 연결 리스트로 저장
vector<int>::iterator it;
bool check[32001];
int b[32001]; //진입차수 저장
queue<int> q;
int main(void) {
	scanf("%d %d", &N, &M);
	for (int i = 0; i < M; i++) {
		scanf("%d %d", &A, &B);
		//진입간선의 갯수를 저장
		b[B] += 1;
		//인접리스트를 만든다.
		a[A].push_back(B);
	}

	//모든 노드에 대해서
	for (int j = 1; j <= N; j++) {
		//방문하지 않았고, 진입차수가 0이면
		if (check[j] == false && b[j] == 0) {
			//q에 넣고 방문 표시를 남긴다.
			q.push(j); check[j] = true;
			//q가 빌 때까지
			while (!q.empty()) {
				//가장 앞의 값을 빼고
				int curr = q.front();  q.pop();
				printf("%d ", curr);
				//연결된 노드 중에서 curr를 지웠을 때 진입간선이 0이 되는 것들을 q에 넣는다.
				for (it = a[curr].begin(); it != a[curr].end(); it++) {
					b[*it] -= 1;
					if (b[*it] == 0) {
						q.push(*it);
						check[*it] = true;
					}
				}
			}
		}
	}
	return 0;
}

```