---
title: "[14501] 퇴사"
excerpt: "삼성전자 기출문제 뿌시기"
date: 2019-07-29
categories:
  - BOJ
tags:
  - Brute-Force
  - DP

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 풀이

dp[i] = i일 째에 얻을 수 있는 최대 이익 = max(i번째 날에 끝날 수 있는 일 + 이 일이 시작되기 전에 얻을 수 있는 최대 이익)  
dp[d] = max(dp[d], dp[curr - 1] + point[curr]);  
point[i] = i번째 일에 시작하는 날짜의 일을 했을 때 얻을 수 있는 이익  
vector[i].push_back(j) : 시작 날짜가j인 일이 i 번째 일에 끝날 수 있으면 PUSH  
curr : for(curr : vector[i])  

## 코드

```cpp
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;
vector<vector<int> > v(16,vector<int>());
int point[16];
int dp[16];
int main(void) {
	int n = 0;
	scanf("%d", &n);
	for (int d=1; d<=n; d++){
		int t = 0, p = 0;
		scanf("%d%d", &t, &p);
		point[d] = p;
		if(d+t-1 <=n) v[d + t - 1].push_back(d);
	}
	for (int d = 1; d <= n; d++) {
		dp[d] = dp[d - 1];
		for (int i = 0; i< v[d].size(); i++) {
			int curr = v[d][i];
			dp[d] = max(dp[d], dp[curr - 1] + point[curr]);
		}
	}
	printf("%d\n", dp[n]);
	return 0;
}


```




