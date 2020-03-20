---
title: "[2579] 계단 오르기"
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

## 풀이

dp[i] : i번째 계단까지 오르는데 얻을 수 있는 최대 점수  

dp[1] = 첫 번째칸  
dp[2] = 첫 번째칸 + 두 번째칸  
dp[3] = max(첫 번째칸 , 두 번째칸) + 세 번째 칸  

n-2, n-1, n번째 칸의 계단을 밟는 것을 O,X로 표현한다고 할 때 모든 경우의 수는 아래와 같습니다.  

1. XOO
2. OXO

1번의 경우 dp[i] = d[i-1] + v[i]라고하면, 연속해서 3번 이상의 계단을 밟는 것을 고려하기 때문에 연속해서 두 개까지만 밟는 것으로 제한해야합니다.
2번의 경우 한 칸을 띄워서 밟기 때문에 어떤 경우가 오더라도 연속해서 3번 이상의 계단을 밟는 경우는 없습니다.  

dp[n] =max(dp[i-3] + v[i-1] + v[i], dp[i-2] + v[i])

## 코드

```cpp
#include <cstdio>
#include <algorithm>
using namespace std;
int v[301];
int dp[301];
int n;

int main(void) {
	scanf("%d", &n);
	for (int i = 1; i <= n; i++) {
		scanf("%d", &v[i]);
	}
	dp[1] = v[1];
	dp[2] = v[1] + v[2];
	dp[3] = max(v[1], v[2]) + v[3];
	for (int i = 4; i <= n; i++) {
		dp[i] = max(dp[i - 3] + v[i - 1], dp[i - 2]) + v[i];
	}
	printf("%d\n", dp[n]);

	return 0;
}

```


## 2차원 DP 풀이

dp[i][j]는 마지막 j번째 계단을 연속해서 i개째 밟은 경우의 점수 (1<=i<=2)  

1차원 풀이와 마차가지로 OXO, XOO의 경우를 확인해보는 풀이

## 코드

```cpp
#include <cstdio>
#include <algorithm>
using namespace std;
int v[301];
int dp[3][301];
int n;

int main(void) {
	scanf("%d", &n);
	for (int i = 1; i <= n; i++) {
		scanf("%d", &v[i]);
	}
	dp[1][1] = v[1];
	dp[2][1] = 0;
	dp[1][2] = v[2];
	dp[2][2] = v[1] + v[2];
	dp[1][3] = v[1] + v[3];
	dp[2][3] = v[2] + v[3];
	for (int i = 4; i <= n; i++) {
		dp[1][i] = max(dp[1][i - 2], dp[2][i - 2]) + v[i];
		dp[2][i] = max(dp[1][i - 3], dp[2][i - 3]) + v[i - 1] + v[i];
	}
	printf("%d\n", max(dp[1][n], dp[2][n]));
	return 0;
}

```

## 2차원 DP 백준님 풀이

i번째 계단을 연속 1개로 밟는 경우, i-2번째까지 최적으로 밟고 i-1 띄고 i를 밟아야 한다. 생각해보면 dp[1][0]과 dp[2][0]가 0이어서 잘 돌아간다.  
dp[1][i] = max(dp[1][i - 2], dp[2][i - 2]) + v[i];  

i번째 계단을 연속 2개로 밟는 경우, i-1를 밟고 i를 밟아야 하는데 i-1를 밟는 것은 연속 1개째 밟는 것이어야 한다.
dp[2][i] = dp[1][i - 1] + v[i];
## 코드

```cpp

#include <cstdio>
#include <algorithm>
using namespace std;
int v[301];
int dp[3][301];
int n;

int main(void) {
	scanf("%d", &n);
	for (int i = 1; i <= n; i++) {
		scanf("%d", &v[i]);
	}
	dp[1][1] = v[1];
	for (int i = 2; i <= n; i++) {
		dp[1][i] = max(dp[1][i - 2], dp[2][i - 2]) + v[i];
		dp[2][i] = dp[1][i - 1] + v[i];
	}
	printf("%d\n", max(dp[1][n], dp[2][n]));
	return 0;
}

```