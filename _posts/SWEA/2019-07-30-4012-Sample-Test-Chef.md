---
title: "[4012] 요리사"
excerpt: "[모의 SW 역량테스트] 뿌시기"
date: 2019-07-30
categories:
  - SWEA
tags:
  - Sample-Test
  - Brute-Force
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 풀이

1. next_permutation으로 모든 경우를 돌면서 처리하면 된다.
2. 단, i<j인 부분만 판단하면 더 빠르다.
3. next_permutation에서 0과 1부분은 나누고 한 번에 돌리면 더 빠르다. 
4. tc를 돌릴 때 마다 초기화를 잘 해주자. vector 초기화를 까먹었었다. 

## 코드

```cpp
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

int map[16][16];
vector<int> v;
int main(void) {
	int tcase = 0;
	scanf("%d", &tcase);
	long long fa = 0, fb=0;
	long long ans = 10000000;
	int LEN = 0;
	int i = 0, j = 0;
	for (int tc = 1; tc <= tcase; tc++) {
		v.clear();
		fa = 0, fb = 0;
		ans = 10000000;
		scanf("%d", &LEN);
		for (i = 0; i < LEN; i++) {
			for (j = 0; j < LEN; j++) {
				scanf("%d", &map[i][j]);
			}
			v.push_back(1);
		}

		for (i = 0; i < LEN / 2; i++) v[i] = 0;
		vector<int> a, b;
		do {
			if (v[0] == 1) break;
			a.clear();
			b.clear();
			fa = 0;
			fb = 0;
			for (i = 0; i < LEN; i++) {
				if (v[i] == 0) a.push_back(i);
				else b.push_back(i);
			}
			for (int i = 0; i < LEN/2; i++) {
				for (int j = i+1; j < LEN/2; j++) {
					//printf("%d, %d %d, %d\n",i,j, a[i], a[j]);
					fa += map[a[i]][a[j]];
					fa += map[a[j]][a[i]];
					fb += map[b[i]][b[j]];
					fb += map[b[j]][b[i]];
				}
			}
			ans = min(ans, abs(fa - fb));
		} while (next_permutation(v.begin(), v.end()));
		printf("#%d %lld\n",tc, ans);
	}
	return 0;
}
```

