---
title: "[2225] 합분해"
excerpt: "DP 뿌시기 "
date: 2019-07-21
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


## 내 풀이

dp[k][n]는 n를 0~n의 정수를 여러번 k개 사용해서 만드는 경우의 수  

dp[k][n]를 채우기 위해서는 dp[k-1][1부터 n까지]를 모두 봐야한다. dp[k-1][x]는 k-1의 수로 x를 만든 것이므로 마지막 k 번째 수를 n-(x)로 더하는 것이 결정 되어있기 때문이다.
돌려 생각하면, k를 만드는데 마지막에 더하는 값이 0부터 n까지인 모든 경우를 다 더하는 것과 같다.  

## 내 코드

```cpp
#include <iostream>
using namespace std;

int n, k;
long long dp[201][201];
int main() {
	scanf("%d%d", &n, &k);
	for (int i = 0; i <= n; i++) dp[1][i] = 1;

	for (int i = 2; i <= k; i++) {
		for (int j = 0; j <= n; j++) {
			for (int a = 0; a <= j; a++) {
				dp[i][j] += dp[i - 1][a];
				dp[i][j] %= 1000000000;
			}
		}
	}
	printf("%lld\n", dp[k][n]);
	return 0;
}

```