---
title: "[SHAKE][2019] 예선 2번 풀이"
excerpt: "세훈이의 선물가게"
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

본 풀이는 부분 점수 (100점/140점)을 받은 풀이입니다.  

1. 모든 선물을 0시간에 처리할 수 있으므로 a와 b의 vector에 선물 포장의 번호를 넣는다.  
2. 모든 과정이 끝나면 a와 b를 차례로 돌면서 넣었던 값들을 출력한다.

본 대회의 문제를 다시 볼 수 있게 되면 추가적인 풀이를 작성하겠습니다.


## 코드

```cpp
#include <iostream>
#include <string>
#include <vector>


using namespace std;
string s;
int A,B,N;
int t, h; //시간, howmany
char p; //포장지
int cnt = 0;
vector<int> a;
vector<int>::iterator it;
vector<int> b;
int main(void) {
	scanf("%d %d %d", &A, &B, &N); getchar();
	for (int i = 0; i < N; i++) {
		scanf("%d %c %d", &t, &p, &h); getchar();

		for (int j = 0; j < h; j++) {
			if (p == 'B') a.push_back(++cnt);
			if(p == 'R') b.push_back(++cnt);
		}
	}

	cout << a.size() << endl;
	for (it = a.begin(); it != a.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;
	cout << b.size() << endl;
	for (it = b.begin(); it != b.end(); it++) {
		cout << *it << " ";
	}
	cout << endl;

		

	return 0;
}
```