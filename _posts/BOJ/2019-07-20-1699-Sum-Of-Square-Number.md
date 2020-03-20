---
title: "[1699] 제곱수의 합"
excerpt: "DP 뿌시기 "
date: 2019-07-20
categories:
  - BOJ
tags:
  - DP

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 정답 풀이 $O(N^{3/2})$

숫자 N를 구성하는데 가장 마지막에 더해진 숫자가 $i^{2}$이라면 $dp[N-i^{2}]$의 최솟값에 $i^{2}$를 더하는 1을 더하면 된다. 

## 내 코드

```cpp
#include <cstdio>
#include <algorithm>
#include <cmath>
using namespace std;
int n;
int ans = 0;
int dp[100001];

int main(void) {
	scanf("%d", &n);
	dp[1] = 1;
	for (int i = 2; i <= n; i++) {
		dp[i] = i;
		int sq = floor(sqrt(i));
		for (int j = 1; j <= sq; j++) {
			if (dp[i - j * j] + 1 < dp[i]) {
				dp[i] = dp[i - j * j] + 1;
 			}
		}
	}
	printf("%d\n", dp[n]);
	return 0;
}
```

## 백준님 코드

```cpp
#include <cstdio>
#include <algorithm>
#include <cmath>
using namespace std;
int n;
int ans = 0;
int dp[100001];

int main(void) {
	scanf("%d", &n);
	dp[1] = 1;
	for (int i = 2; i <= n; i++) {
		dp[i] = i;
		for (int j = 1; j*j<=i; j++) {
			if (dp[i - j * j] + 1 < dp[i]) {
				dp[i] = dp[i - j * j] + 1;
 			}
		}
	}
	printf("%d\n", dp[n]);
	return 0;
}

```
## 틀린 풀이

항상 sqrt()를 해서 가장 큰 제곱수를 선택한다.

틀린 예시 : 12 = $3^{2} + 1 + 1 + 1$   
최적 : 12 = $2^{2} + 2^{2} + 2^{2}$  

## 틀린 코드

```cpp

#include <cstdio>
#include <algorithm>
#include <cmath>
using namespace std;
int n;

int ans = 0;

int go(int x) {
	if (x == 1) {
		return ans + 1;
	}
	else if (x == 0) {
		return ans;
	}
	int sq = floor(sqrt(x));
	ans += 1;
	go(x - sq * sq);
}

int main(void) {
	scanf("%d", &n);
	printf("%d\n", go(n));
	return 0;
}

```
or

```cpp

#include <cstdio>
#include <algorithm>
#include <cmath>
using namespace std;
int n;
int ans = 0;
int dp[100001][320];

int go(int x, int m) {
	//printf("x is %d, m is %d\n", x, m);
	if (x == 1) {
		return ans += 1;
	}
	else if (x == 0) {
		return ans;
	}
	while (x < m*m) {
		m -= 1;
	}
	ans +=( x / (m*m));
	go(x % (m * m), m);
}

int main(void) {
	scanf("%d", &n);
	int sq = floor(sqrt(n));
	for (int i = 1; i <= sq; i++) {
		//printf("*** i is %d\n", i);
		dp[n][i] = go(n, i);
		ans = 0;
		printf("%d'th *** : %d\n", i, dp[n][i]);
	}
	printf("%d\n", *min_element(dp[n]+1, dp[n]+sq+1));
	
	return 0;
}

```

