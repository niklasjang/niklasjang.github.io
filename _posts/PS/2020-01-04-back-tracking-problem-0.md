---
title: "[ps][백트래킹][문제] N과M 1~8"
excerpt: "완전탐색 - 1번째 알고리즘"
date: 2020-01-04
categories:
  - PS
tags:
  - ps 
  - back-tracking
  - problem
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

[N과M](https://www.acmicpc.net/workbook/view/2052)는 3 - 1 - 2 - 4 - 7 - 5 - 6 - 8의 순서로 풀이하는 것이 좋습니다.

오른쪽의 TOC를 클릭해서 보면 좋습니다. 

## N과 M (3)

- 1부터 N까지 자연수 중에서 M개를 고른 수열
- 같은 수를 여러 번 골라도 된다.

```cpp
#include <iostream>
using namespace std;

int n = 0, k = 0;
int arr[10];
void recur(int depth) {
  if(depth == n) {
    for (int i = 0; i < depth; i++) {
      cout << arr[i]<<" ";
    }
    cout << "\n";
    return;
  }
  for (int i = 1; i <= k; i++) {
    arr[depth] = i;
    recur(depth + 1);
  }
}

int main(void) {
  cin.tie(NULL);
  ios::sync_with_stdio("false");
  cin >> k >> n;
  recur(0);
  return 0;
}
```

## N과 M (1)

- 1부터 N까지 자연수 중에서 M개를 고른 수열
- **같은 수를 여러 번 고르면 안된다.**

```cpp
#include <iostream>
using namespace std;

int n = 0, k = 0;
int arr[10];
bool visited[10];
void recur(int depth) {
	if(depth == n) {
		for (int i = 0; i < depth; i++) {
			cout << arr[i]<<" ";
		}
		cout << "\n";
		return;
	}
	for (int i = 1; i <= k; i++) {
		if (visited[i]) continue;
		visited[i] = true;
		arr[depth] = i;
		recur(depth + 1);
		visited[i] = false;
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> k >> n;
	recur(0);
	return 0;
}
```

## N과 M (2)

- 1부터 N까지 자연수 중에서 M개를 고른 수열
- **같은 수를 여러 번 고르면 안된다.**
- **고른 수열은 오름차순이어야 한다.**

```cpp
#include <iostream>
using namespace std;

int n = 0, k = 0;
int arr[10];
bool visited[10];
//start : for문의 i가 시작해야 하는 수 = 이전 recur()에서 마지막으로 입력한 수 + 1
void recur(int depth, int start) {
	if(depth == n) {
		for (int i = 0; i < depth; i++) {
			cout << arr[i]<<" ";
		}
		cout << "\n";
		return;
	}
	for (int i = start; i <= k; i++) {
		if (visited[i]) continue;
		visited[i] = true;
		arr[depth] = i;
		recur(depth + 1, i);
		visited[i] = false;
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> k >> n;
	recur(0,1);
	return 0;
}
```

## N과 M (4)

- 1부터 N까지 자연수 중에서 M개를 고른 수열
- **같은 수를 여러 번 고르면 안된다.**
- **고른 수열은 비내림차순이어야 한다. 길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ AK-1 ≤ AK를 만족하면, 비내림차순이라고 한다.**

```cpp
#include <iostream>
using namespace std;

int n = 0, k = 0;
int arr[10];
//start : for문의 i가 시작해야 하는 수 = 이전 recur()에서 마지막으로 입력한 수 + 1
void recur(int depth, int start) {
	if(depth == n) {
		for (int i = 0; i < depth; i++) {
			cout << arr[i]<<" ";
		}
		cout << "\n";
		return;
	}
	for (int i = start; i <= k; i++) {
		arr[depth] = i;
		recur(depth + 1, i);
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> k >> n;
	recur(0,1);
	return 0;
}
```

## N과 M (7)

- N과 M (3)과 같은 방법

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0, k = 0;
int nums[10001];
int arr[100];
void recur(int depth) {
	if (depth == n) {
		for (int j = 0; j < n; j++) {
			cout << arr[j] << " ";
		}
		cout << "\n";
		return;
	}
	for (int i = 0; i < k; i++) {
		arr[depth] = nums[i];
		recur(depth + 1);
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> k >> n;
	for (int i = 0; i < k; i++) {
		cin >> nums[i];
	}
	sort(nums, &nums[k]);
	recur(0);
	return 0;
}
```
## N과 M (5)

- N과 M (1)과 같은 방법

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0, k = 0;
int nums[10001];
int arr[100];
bool visited[10001];
void recur(int depth) {
	if (depth == n) {
		for (int j = 0; j < n; j++) {
			cout << arr[j] << " ";
		}
		cout << "\n";
		return;
	}
	for (int i = 0; i < k; i++) {
		if (visited[nums[i]]) continue;
		arr[depth] = nums[i];
		visited[nums[i]] = true;
		recur(depth + 1);
		visited[nums[i]] = false;
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> k >> n;
	for (int i = 0; i < k; i++) {
		cin >> nums[i];
	}
	sort(nums, &nums[k]);
	recur(0);
	return 0;
}
```

## N과 M (6)

- N과 M (2)과 같은 방법

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0, k = 0;
int nums[10001];
int arr[100];
void recur(int depth, int start) {
	if (depth == n) {
		for (int j = 0; j < n; j++) {
			cout << arr[j] << " ";
		}
		cout << "\n";
		return;
	}
	for (int i = start; i < k; i++) {
		arr[depth] = nums[i];
		recur(depth + 1, i+1);
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> k >> n;
	for (int i = 0; i < k; i++) {
		cin >> nums[i];
	}
	sort(nums, &nums[k]);
	recur(0,0);
	return 0;
}
```

## N과 M (8)

- N과 M (4)과 같은 방법

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0, k = 0;
int nums[10001];
int arr[100];
void recur(int depth, int start) {
	if (depth == n) {
		for (int j = 0; j < n; j++) {
			cout << arr[j] << " ";
		}
		cout << "\n";
		return;
	}
	for (int i = start; i < k; i++) {
		arr[depth] = nums[i];
		recur(depth + 1, i);
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> k >> n;
	for (int i = 0; i < k; i++) {
		cin >> nums[i];
	}
	sort(nums, &nums[k]);
	recur(0, 0);
	return 0;
}
```
