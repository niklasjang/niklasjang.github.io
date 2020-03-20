---
title: "[SHAKE][2019] 예선 1번 풀이"
excerpt: "APC는 왜 서브태스크 대회가 되었을까?"
date: 2019-06-02
categories:
  - SHAKE
tags:
  - BOJ
  - SHAKE

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---


## 풀이

특별한 알고리즘이나 자료구조는 필요하지 않았습니다.

- N : 전체 문제의 수
- a : 이건 뭐였는지 잘 기억이 안납니다. 문제가 공개되면 수정하겠습니다. 
- K : 맞출 수 있는 최대 문항의 수

1. 모든 문제에 대해서 100점을 받을 수 있는지 140점을 받을 수 있는지 판단한다.
2. 해당 문제에서 받을 수 있는 점수들을 vector에 넣는다.
3. vector를 내림차순으로 정렬한 후, 앞에서부터 K개만큼의 값들을 더한다.

## 코드

```cpp
/*
2019-06-02
장환석

*/

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int N, a, K;

bool check(int a, int b) {
	return a > b;
}

int main(void) {
	vector<int> result;
	vector<int>::iterator it;
	scanf("%d %d %d", &N, &a, &K);
	int low, max;
	for (int i = 0; i < N; i++) {
		scanf("%d %d", &low, &max);
		int temp = 0;
		if (low <= a) {
			temp += 100;
		}
		if (max <= a) {
			temp += 40;
		}
		result.push_back(temp);
	}
	sort(result.begin(), result.end(), check);

	int r = 0;
	int j = 0;
	for (it = result.begin(); it != result.end() && j < K; it++, j++) {
		r += *it;
	}
	printf("%d\n", r);
	return 0;
}
```