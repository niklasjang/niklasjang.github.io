---
title: "[PS][위상정렬] Chapter 0"
excerpt: ""
date: 2020-09-26
categories:
  - PS
tags:
  - ps 
	- Topological-Sort
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

# [부등호](boj.kr/2529)
# [줄 세우기](boj.kr/2252)

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


# [작업](boj.kr/2056)

BFS 위상정렬을 하면서 queue에 indegree가 0인 값들을 넣습니다. 그리고 q 사이즈만큼 검사해서 가장 오래 걸리는 것의 작업의 시간을 누적합니다.
모든 노드에 대해서 indegreee가 0인지 체크하면서 위 알고리즘을 적용하면 됩니다.   

# [부등호](boj.kr/2529)

