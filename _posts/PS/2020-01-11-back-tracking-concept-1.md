---
title: "[ps][백트래킹][개념2] 고른다 안고른다"
excerpt: "완전탐색 - 1번째 알고리즘"
date: 2020-01-11
categories:
  - PS
tags:
  - ps 
  - back-tracking
  - concept
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

## 오름차순 N자리 K진수 = N자리 K진수\[1,K\]를 오름차순으로 선택해야 하는 경우

첫 번재 개념과는 다른 방법으로 접근한다. 
1. N자리 K진수를 선택할 때 오름차순으로 선택하야하는 경우, recur(int depth, int start)와 같이 작성했었다. [N과M 2]참고
1. start를 전달하는 것과 같이 오름차순으로 선택하는 것을 recur(int depth, int cnt)와 같이 작성할 수 있다.
  - depth : 이번에 선택해야하는 숫자 main에서 recur(1,0)로 시작한다.
  - cnt : 지금까지 선택한다/안한다에서 몇 개를 선택했는지를 나타낸다. = arr[cnt-1]까지 채운 상태 = cnt개를 채운 상태

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0, k=0;
int arr[20];

void recur(int depth, int cnt) {
	if (cnt == n) {
		for (int i = 0; i < cnt; i++) {
			cout << arr[i] << " ";
		}
		cout << "\n";
		return;
	}

  //depth는 저장할 숫자 = [1,k]
	if (depth == k + 1) return;

  //depth를 선택하는 경우 cnt+1
	arr[cnt] = depth;
	recur(depth + 1, cnt + 1);
  //depth르 선택하지 않는 경우 cnt
  
  /*
  !! arr[cnt] = depth에 대한 초기화를 진행하지 않는다.
  위의 arr[cnt] = depth를 통해서 초기화가 진행된다. 
  */
	recur(depth + 1, cnt);
}
int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n >> k;
	recur(1,0);
	return 0;
}
```

```txt
//입력
3 6
//출력
1 2 3
1 2 4
1 2 5
1 2 6
1 3 4
1 3 5
1 3 6
1 4 5
1 4 6
1 5 6
2 3 4
2 3 5
2 3 6
2 4 5
2 4 6
2 5 6
3 4 5
3 4 6
3 5 6
4 5 6
```


# 비내림차순

1. arr[cnt] = depth에서 index cnt를 채웠으면 cnt+1개를 고른 것이므로 다음에 고를 때는 cnt + 1를 넘긴다.
1. 그런데 다음에도 같은 수를 고를 수 있도록 하기 위해서 depth를 같이 넘긴다.
1. recur(depth, cnt+1)이 끝났을 때는 arr[cnt]=depth를 사용해서 마지막의 수를 하나 증가시켜야 비내림차순이 된다.

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0, k=0;
int arr[20];

void recur(int depth, int cnt) {
	if (cnt == n) {
		for (int i = 0; i < cnt; i++) {
			cout << arr[i] << " ";
		}
		cout << "\n";
		return;
	}

	if (depth == k + 1) return;

	arr[cnt] = depth;
	//다음에 고를 숫자로 depth로 둔다.
	recur(depth, cnt + 1); //depth + 1을 depth로만 바꾸면 된다
	//depth는 고르지 않고 depth+1을 고를지말지 판단한다.
	recur(depth + 1, cnt);
}
int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n >> k;
	recur(1,0);
	return 0;
}
```

```txt
//입력
3 6
//출력
1 1 1
1 1 2
1 1 3
1 1 4
1 1 5
1 1 6
1 2 2
1 2 3
1 2 4
1 2 5
1 2 6
1 3 3
1 3 4
1 3 5
1 3 6
1 4 4
1 4 5
1 4 6
1 5 5
1 5 6
1 6 6
2 2 2
2 2 3
2 2 4
2 2 5
2 2 6
2 3 3
2 3 4
2 3 5
2 3 6
2 4 4
2 4 5
2 4 6
2 5 5
2 5 6
2 6 6
3 3 3
3 3 4
3 3 5
3 3 6
3 4 4
3 4 5
3 4 6
3 5 5
3 5 6
3 6 6
4 4 4
4 4 5
4 4 6
4 5 5
4 5 6
4 6 6
5 5 5
5 5 6
5 6 6
6 6 6

```