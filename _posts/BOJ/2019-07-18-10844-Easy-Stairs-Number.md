---
title: "[10844] 쉬운 계단 수"
excerpt: "DP 뿌시기 "
date: 2019-07-18
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

1차원 dp로는 풀지 못했습니다. dp[i][j]를 길이가 i이고 마지막 숫자가 j인 계단 수라고 정의합니다.  

마지막 숫자가 1~8일 때는 다음 숫자를 2개 적을 수 있지만(마지막 수 = 마지막 수 +- 1), 마지막 숫자가 0 또는 9일 때는 두 개를 적을 수 없습니다.
따라서 이것을 분기 해주기 위해서 2차원 dp표를 사용합니다. 

## 코드

```cpp
#include <iostream>

int dp[101][10];
int n,t;

int main(void) {
	scanf("%d", &n);
	for (int i = 1; i < 10; i++) {
		dp[1][i] = 1;
	}
	for (int j = 2; j <= n; j++) {
		for (int k = 0; k < 10; k++) {
			if (k == 0) {
				dp[j][k] = dp[j - 1][k + 1];
			}else if (k == 9) {
				dp[j][k] = dp[j - 1][k - 1];
			}
			else {
				dp[j][k] = dp[j - 1][k - 1] + dp[j - 1][k + 1];
			}
			dp[j][k] %= 1000000000;
		}
	}
	long long ans = 0;
	for (int i = 0; i < 10; i++) {
		ans += dp[n][i];
		ans %= 1000000000;
	}
	printf("%lld\n", ans);
	return 0;
}

```