---
title: "[PS][완전탐색][N자리 K진수] 신기한 소수"
excerpt: "완전탐색 - 1번째 알고리즘"
date: 2020-03-23
categories:
  - PS
tags:
  - ps 
  - back-tracking
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

완전탐색의 첫 번째 알고리즘 백트래킹입니다. 백트래킹의 첫 번 째 유형인 N자리 K진수에 대해서 학습합니다.
- - -

## N자리 K진수 : 문제

N자리 K진수를 적용해서 해결하는 문제입니다. N자리 K진수의 개념은 그대로 적용되고 핵심은 두 가지 입니다.

1. isPrime()을 작성할 수 있는가? -> 소수인지 판별하는 O(sqrt(n)) 방법을 사용합니다. 
1. isPrime()을 적절한 위치에서 사용할 수 있는가? -> recur()의 초입 부분에 적용해서 사용합니다. 

### [신기한 소수](https://www.acmicpc.net/problem/2023)

아래의 코드는 [여기](https://gist.github.com/niklasjang/c06fbd3b76ae7a3e76cdc1811abd1d17)에서도 볼 수 있습니다.  

```cpp
#include <iostream>
using namespace std;

int n = 0;

bool isPrime(int num) {
	if (num == 0) return true;
	if (num == 1) return false;
	int cnt = 0;
	for (int i = 1; i * i <= num; i++) {
		if (num % i == 0) cnt++;
	}
	return cnt == 1;
}

void recur(int depth, int num) {
	if (!isPrime(num)) return; //recur()의 초입 부분에 isPrime()을 적용한다. 
	if(depth == n) {
		cout << num << "\n";
		return;
	}
	for (int i = 1; i <= 9; i++) {//2671처럼 6이 들어가지만 소수일 수 있습니다. 
		recur(depth + 1, num * 10 + i);
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n;
	recur(0, 0);
	return 0;
}
```

