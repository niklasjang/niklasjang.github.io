---
title: "[2383] 점심 식사시간"
excerpt: "[모의 SW 역량테스트 해설] 뿌시기"
date: 2019-08-11
categories:
  - SWEA
tags:
  - Solution
  - DFS
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 생각

이 문제에 대해서 한 3시간 넘게 시간을 쓰면서 코드를 짰다. 문제를 읽고 생각을 해보고 방법을 코드로 옮기고, TC 돌리고 커버 못하는 TC가 있으면 이를 다시 보완하는
방법을 생각해서 코드에 추가하고.. 이렇게 하나보니까 너무 시간이 오래 걸린다. 4시간 안에 하나 풀면 다행일까? 이렇게 공부하면 시험장가서 운좋게 생각을 잘 하면 통과고 아니면 통과를 못할 것 같다. 그래서 한 문제를 풀어도 제대로 풀어야한다는 생각을 다시 했고, SWEA의 해설을 보면서 체화하는 과정을 가져보도록 하였다.  

## 2. 목표 포작

먼저 계단의 갯수가 최대 2개라는 점에서 착안하여, 각 사람이 어느 계단을 사용할 것인지 결정해야 합니다. 사람의 수는 최대 10명이므로 $O(10^{2})$의 시간 복잡도로 가장 많은 경우에도 충분히 완전탐색을 할 수 있음을 알 수 있습니다. 모든 경우를 커버하는 완전탐색을 DFS로 구현해 보겠습니다.  

### DFS 설계

1. 재귀 변수 결정 : 재귀 함수의 입력에 해당하는 변수
2. 시작 조건 결정 : 초기의 함수 호출 시, 재귀 함수 인자가 가지는 값
3. 종료 조건 결정 : 함수가 재귀 호출을 그만하고, 종료할 조건
4. 재귀 호출 조건 결정 : 재귀 호출을 수행할 조건 결정

이 문제를 본 문제에 적용하면 다음과 같습니다.

1. 재귀 변수 결정 : 각 사람의 번호를 나타내는 변수가 필요합니다.
2. 시작 조건 결정 : 사람의 번호가 0번부터 M-1번까지라면, 0을 함수 호출시에 넘어줍니다.
3. 종료 조건 결정 : M-1번이 사람까지 모두 계산한 뒤 함수를 종료합니다.
4. 재귀 호출 조건 결정 : 현재 재귀 변수가 가리키는 사람이 사용할 계단을 결정하면, 이후 남은 사람은 재귀 호출을 통해 결정할 수 있습니다. 

```cpp

#define MAX 10
int match[MAX];
//match[x] = y : x번째 사람이 y계단을 이용하도록 결정된 상태

void update(void) {
	//모든 사람이 계단을 이용하는 최소 시간을 구함
	return;
}

void dfs(int person_idx) {
	//모든 사람이 이용할 계단이 결정되면
	if (person_idx == MAX) {
		update();
		return;
	}
	for (int stair_idx = 0; stair_idx < 2; stair_idx++) {
		match[person_idx] = stair_idx;
		dfs(person_idx + 1);
	}
}
//DFS 시작
dfs(0);
```

### 최소 시간 구하기 설계

각 사람이 어떤 계단을 이용할지가 결정된 특정 상태가 되었습니다. 이제 이 상태에 대해서, 사람들이 계단을 내려가는데 걸리는 최소 시간 T를 구하려고 합니다. $T_{0}$과 $T_{1}$를 각각 첫 번째와 두 번째 계단을 이용해서 사람들이 내려가는데 걸리는 시간이라고 할 떄, 모든 사람이 전체 계단을 내려가는데 걸리는 시간 T는 $T = MAX( T_{0}, T_{1})$입니다. 그리고 각 상태 S에 대해서 계산된 T의 최솟값을 구하면 됩니다.  

그런데 각 계단을 이용하는데 걸리는 시간은 독립적입니다. 계단 1을 이용하는 것은 계단 2를 이용하는 것에 영향을 주지 않습니다. 그리고 반대의 상황에서도 영향을 주지 않습니다. 즉, 일반적인 상황에서 계단을 이용해서 내려가는 최소시간을 구하는 함수를 하나만 만들고 이를 계단 A에 대해서 그리고 B에 대해서 사용하면 됩니다.  

생각해보면 각 계단에 대해서는 먼저 도착하는 사람이 먼저 계단을 내려가면 최소 시간을 구할 수 있습니다. 이는 귀류법으로 증명이 가능합니다. 만약 먼저 도착한 사람이 바로 계단을 이용하지 않고 최적의 시간 $T_{opt}$를 구할 수 있다면, 기다리는 시간을 없애고 바로 이용할 때 구할 수 있는 최적의 시간  $T_{sub}$는  $T_{opt}$보다 작을 수 있기 때문입니다. 따라서 먼저 도착하는 사람이 먼저 내려가면 최소 시간을 구할 수 있습니다.  

N은 맵의 가로 크기, M은 전체 사람의 수라고 가정하겠습니다. 각 사람이 계단에 도착하기까지 걸리는 시간을 $t_{i}$라고 할 때, 최악의 $t_{i}$는, 전체 맵에서 한 쪽 구석에서 반대편 구석까지 가는데 걸리는 시간은, $2 * N$보다 작고, 한 사람이 계단을 내려가는데 걸리는 시간도 $M <=10$으로 작기 때문에 $t_{i} = O(2*N+10*M)$으로 작은 값을 가집니다.  $t_{i}$의 값이 매우 작기 때문에 이를 $O(n)$에 정렬하는 counting-sort를 사용해서 정렬합니다.

[카운팅 소트 강의]<https://swexpertacademy.com/main/learn/course/subjectDetail.do?subjectId=AV183wv6I7QCFAZN>  

```cpp
//카운팅 소트 예제
#include <cstdio>
int* countSort(int arr[8]) {
	static int temp[8] = { 0,}; //arr의 길이가 8
	int count[5] = { 0}; //가장 큰 원소+1만큼 길이를 할당
	for (int i = 0; i < 8 ; i++) count[arr[i]] += 1;
	for (int i = 1; i < 5; i++) count[i] += count[i - 1];
	for (int i = 0; i < 8; i++) {
		--count[arr[i]] ;
		temp[count[arr[i]]] = arr[i];
	}
	return temp;
}

int main(void) {
	int arr[8] = { 0,4,1,3,1,2,4,1 };
	int *arr2 = countSort(arr);
	for (int i = 0; i < 8; i++) printf("%d ", arr[i]);
	printf("\n");
	for (int i = 0; i < 8; i++) printf("%d ", arr2[i]);
	return 0;
}
```

위와 같은 counting-sort를 아래와 같이 적용합니다. 특정 계단에 대해서 어떤 사람이 몇 초에 도착하는지가 중요한 것이 아니기 때문에 각 사람에 대해서
정해진 계단까지 가는데 걸리는 시간을 기준으로 정렬을 해줍니다.

```cpp

#include <algorithm>

int dist(int person_idx, int stair_idx) {
	int dx = abs(people[person_idx].r - stair[stair_idx].r);
	int dy = abs(people[person_idx].c - stair[stair_idx].c);
	return dx + dy;
}

int arrival_time[N * 2] = { 0, };
//arrival_time[x] = y; x시간에 계단에 도착하는 사람의 수는 y 명
for(int person_idx = 0; person_idx < number_of_people; person_idx++) {
	if (match[person_idx] == stair_idx) {
		arrival_time[dist(person_idx, stair_idx) + 1] += 1; //idx가 0부터 시작하므로 +1에 주의
	}
}

```

특정 상태에서 각 계단에 몇 초에 몇 명이 도착하는지가 결정이 되었다면, 한 명씩 내려보내면서 그 사람이(어느 좌표에 있던 사람인지는 중요하지 않음) 계단 밑으로 도착하는 시간이 언제인지 기록하고 이를 계속해서 갱신합니다. 이와 같은 방법으로 각 계단에 대해서 독립적으로, 각 사람에 대해서 나누어서 생각해서 복잡하지 않게 코드를 짤 수 있습니다.

## 정답 코드

```cpp

#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <algorithm>
using namespace std;
struct PT {
	int r, c;
	PT() {}
	PT(int _r, int _c) : r(_r), c(_c) {}
}people[10], stair[2];

int map[10][10];
int match[11] = { 0, }; //match[x]=y : x번째 사람이 이용할 계단은 y
int ans = 0;
int dist(int pidx, int sidx) {//person_idx, stair_idx
	int dr = abs(people[pidx].r - stair[sidx].r);
	int dc = abs(people[pidx].c - stair[sidx].c);
	return dr + dc;
}

int update(int M) {
	//각 사람이 이용할 계단이 정해져있는 상태, 두 개의 계단을 독립적으로 판단
	int one_state_end = 0;
	for (int sidx = 0; sidx < 2; sidx++) {//stair_idx
		int arrive[20] = { 0, }; //arrive[x] = y : x분에 계단에 도착하는 사람의 수 y
		int on[35] = { 0, }; //on[x] = y : x분에 계단에 타고 있는 사람의 수 y
		for (int i = 0; i < M; i++) {
			if (match[i] == sidx) { //sidx 계단을 이용하고 있는 사람을 찾기
				arrive[dist(i, sidx)]++;//이 사람이 몇 초에 sidx 계단에 도착하는지 계산해서 count
			}
		}
		int one_person_end = 0;
		for (int t = 1; t <= 20; t++) {// t초 일 때의 상황
			//t초에 도착하는 사람이 있으면 이들을 모두 계단에 내려보내면서 각자가 끝나는 시간을 갱신
			int ct = t + 1; //도착한 후 1분 뒤부터 내려간다
			while (arrive[t] > 0) {//x분에 계단을 내려가기 시작하는 사람 중 한 명씩 한 명씩 내려감
				arrive[t] -= 1;
				int slen = map[stair[sidx].r][stair[sidx].c]; //계단의 길이 
				while (slen > 0) {//계단의 길이만큼
					//계단에 있는 사람이 3명이하이면 
					if (on[ct] < 3) {
						on[ct] += 1;
						slen -= 1;
						if (slen == 0) {//계단을 모두 내려가면 그 사람이 도착한 시간을 갱신
							one_person_end = max(one_person_end, ct+1); //slen만큼 내려가서 1분 뒤에!!!!! 완료
							ct = t + 1; //초기화!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
							break;
						}
					}
					ct += 1;
				}
			}
		}
		one_state_end = max(one_state_end, one_person_end);
	}
	return one_state_end;
}

void dfs(int x, int M) {
	if (x == M) {
		int tans = update(M);
		ans = min(ans, tans);
		return;
	}
	for (int sidx = 0; sidx < 2; sidx++) { //stair_idx
		match[x] = sidx;
		dfs(x + 1, M);
	}
}

int main(void) {
	int tcase = 0; scanf("%d", &tcase);
	for (int tc = 1; tc <= tcase; tc++) {
		ans = 0xFFFFFF;
		int n = 0; scanf("%d", &n);
		int M = 0, S = 0;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				scanf("%d", &map[i][j]);
				if (map[i][j] == 1) people[M++] = PT(i, j);
				else if (map[i][j] >= 2) stair[S++] = PT(i, j);
			}
		}
		dfs(0, M);
		printf("#%d %d\n", tc, ans);
	}

	return 0;
}

```

## 추가 공부

### 백트레킹 개념

아래 사이트에서 공부를 합니다. 너무 잘 정리되어 있어서 옮기는 것이 무의미하다고 생각됩니다.  

[SWEA 백트레킹 페이지](https://swexpertacademy.com/main/learn/course/subjectDetail.do?courseId=AVuPDYSqAAbw5UW6&subjectId=AV3Fvw66AAYBBARB)  


### 백트레킹 : 부분 집합

```cpp

#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <cstring>
#define MAX 3
char arr[MAX] = {'A','B','C'};

void dfs(int order[],bool check[], int k, int n) {
	//printf("DFS K is %d, n is %d\n", k, n);
	if (k == n ) {
		printf("{");
		for (int i = 0; i < n; i++) {
			if(order[i] == 1) printf("%c ", arr[i]);
		}
		printf("}\n");
		return;
	}
	for (int i = 0; i < 2; i++) {
		order[k] = i;
		dfs(order, check, k + 1, n);
	}
}

int main(void) {
	int order[MAX] = { 0, };
	bool check[MAX] = { false, };
	dfs(order, check, 0, MAX);
	return 0;
}

```

```cpp
//결과
{}
{C }
{B }
{B C }
{A }
{A C }
{A B }
{A B C }

```

### 백트레킹 : 순열

'A','B','C','D'로 만들 수 있는 모든 순열을 출력하는 코드.

```cpp
//SWEA의 강의 코드
#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <cstring>
#define MAX 4
char arr[MAX] = { 'A','B','C','D' };

void dfs(int order[],bool check[], int k, int n) {
	if (k == n) {
		for (int i = 0; i < n; i++) printf("%c ", arr[order[i]]);
		printf("\n");
	}
	else {
		memset(check, 0, sizeof(bool) * MAX); //일단 모두 선택하지 않은 것으로
		for (int i = 0; i < k; i++) check[order[i]] = true; //k개만큼 앞에서부터 선택했다고 표시
		for (int i = 0; i < n; i++) {
			if (check[i] == false) {
				order[k] = i;
				dfs(order, check, k + 1, n);
				check[order[k]] = false;
			}
		}
	}
}

int main(void) {
	int order[MAX] = { 0, };
	bool check[MAX] = { false, };
	dfs(order, check, 0, MAX);
	return 0;
}
```

```cpp
//좀 더 기억하기 쉬울 내 코드
#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <cstring>
#define MAX 4
char arr[MAX] = { 'A','B','C','D' };

void dfs(int order[],bool check[], int k, int n) {
	if (k == n) {
		for (int i = 0; i < n; i++) printf("%c ", arr[order[i]]);
		printf("\n");
		return;
	}
	else {
		for (int i = 0; i < n; i++) {
			if (check[i] == false) {
				check[i] = true;
				order[k] = i;
				dfs(order, check, k + 1, n);
				check[i] = false;
			}
		}
	}
}

int main(void) {
	int order[MAX] = { 0, };
	bool check[MAX] = { false, };
	dfs(order, check, 0, MAX);
	return 0;
}
```

```cpp
//결과
A B C D
A B D C
A C B D
A C D B
A D B C
A D C B
B A C D
B A D C
B C A D
B C D A
B D A C
B D C A
C A B D
C A D B
C B A D
C B D A
C D A B
C D B A
D A B C
D A C B
D B A C
D B C A
D C A B
D C B A
```

### 백트래킹 : 동전 거스름돈 문제

```cpp

//SWEA의 강의 코드
#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <cstring>
#define MAX 3
//int change[MAX] = { 500, 400, 100, 50, 10 }; //각 동전의 가격
int change[MAX] = { 500, 400, 100}; //각 동전의 가격
void dfs(int select[], int rest, int k, int n) {
	if (k == n) {
		for (int i = 0; i < MAX; i++) printf("%d ", select[i]);
		printf("\n");
		return;
	}
	//k번째 동전 선택
	int most_selected = rest / change[k];
	for (int j = most_selected; j >= 0; j--) {
		select[k] += j;
		rest -= (change[k] * j);
		if (k == n - 1 && rest == 0) {//마지막 동전으로 다 털 수 있으면 그만
			dfs(select, rest, k + 1, n);
			select[k] -= j; //int* 타입은  재귀에서도 하나의 메모리에만 접근하기 때문에 되돌려 주어야 한다.
			break;
		}
		else if (rest >= 0) {
			dfs(select, rest, k + 1, n); 
			select[k] -= j;
			rest += (change[k] * j);
		}
	}
}

int main(void) {
	int select[MAX] = { 0, };//각 동전에 몇 개 선택되었는지
	bool check[MAX] = { false, };
	dfs(select, 800, 0, MAX);
	return 0;
}


```

```cpp
//결과
1 0 3
0 2 0
0 1 4
0 0 8
```

```cpp
//각 동전을 고르는 갯수가 중복해서 나오는 코드
//SWEA의 강의 코드
#define _CRT_SECURE_NO_WARNINGS
#include <cstdio>
#include <cstring>
#define MAX 3
//int change[5] = { 500, 400, 100, 50, 10 }; //각 동전의 가격
int change[3] = { 500, 400, 100}; //각 동전의 가격

void dfs(int select[], int rest) {
	if (rest == 0) {
		for (int i = 0; i < MAX; i++) printf("%d ", select[i]);
		printf("\n");
		return;
	}
	for (int i = 0; i < MAX; i++) {
		select[i] += 1;
		rest -= change[i];
		if (rest >= 0) dfs(select, rest);
		select[i] -= 1;
		rest += change[i];
	}
}

int main(void) {
	int select[MAX] = { 0, };//각 동전에 몇 개 선택되었는지
	dfs(select, 800);
	return 0;
}
```

```cpp
//각 동전이 몇 개씩 선택되었는지를 나타내는 결과
1 0 3
0 2 0
0 1 4
1 0 3
0 1 4
1 0 3
0 1 4
1 0 3
0 1 4
0 1 4
0 0 8
```