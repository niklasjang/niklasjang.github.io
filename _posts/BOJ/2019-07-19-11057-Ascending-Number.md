---
title: "[11057] 오르막 수"
excerpt: "DP 뿌시기 "
date: 2019-07-19
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


## 풀이

dp[i][j]가 길이가 i이고, 마지막 숫자가 j인 오르막 수의 수를 나타낸다고 생각하고 표를 그려보자.

## 내 코드

```cpp
#include <iostream>

long long dp[1001][10];
int n;
int mod = 10007;

int main(void) {
	scanf("%d", &n);
	
	for (int j = 0; j < 10; j++) {
		dp[1][j] = 1;
	}
	for (int i = 1; i <= n; i++) {
		dp[i][0] = 1;
	}
	for (int i = 2; i <= n; i++) {
		for (int j = 1; j < 10; j++) {
			dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
			dp[i][j] %= mod;
		}
	}
	long long ans = 0;
	for (int j = 0; j < 10; j++) {
		ans += dp[n][j];
		ans %= mod;
	}
	printf("%lld\n", ans);
	return 0;
}

```

## 백준님 코드

```cpp
#include <iostream>

long long dp[1001][10];
int n;

int main(void) {
	scanf("%d", &n);
	
	for (int j = 0; j < 10; j++) {
		dp[1][j] = 1;
	}
	for (int i = 2; i <= n; i++) {
		for (int j = 0; j < 10; j++) {
			for (int k = 0; k <= j; k++) {
				dp[i][j] += dp[i - 1][k];
				dp[i][j] %= 10007;
			}
		}
	}
	long long ans = 0;
	for (int j = 0; j < 10; j++) {
		ans += dp[n][j];
		ans %= 10007;
	}
	printf("%lld\n", ans);

	return 0;
}
```