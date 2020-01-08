---
title: "[진법 변환] 10진법 -> 8진법 등"
excerpt: "xgcd()는 추후 알아보자."
date: 2019-07-22
categories:
  - Algorithm
tags:
  - Number-Notation
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 10진법 -> N진법

10진법의 수 N을 B진법의 수로 바꾸기 위해서는 N이 0이될 때까지 계속 B로 나눈 나머지를 구하면 된다.  

예시 : 11을 3진법($102(3)$)으로 바꾸기  

1. 11 / 3 = 몫:3 나머지 2 
2. 3 / 3 = 몫:1 나머지 0  
3. 1 / 3 = 몫:0 나머지 1  

나머지를 거꾸로 적으면 102(3) 3진법 완성!  

## 백준 [11005번](https://www.acmicpc.net/problem/11005) 코드

[11005번](https://www.acmicpc.net/problem/11005)

```cpp

#include <iostream>
#include <algorithm>
#include <stack>
using namespace std;

stack<char> s;
int main() {
	long long n = 0, b = 0;
	scanf("%d%d", &n, &b);
	while (n != 0) {
		int r = n % b;
		if (r < 10) {
			s.push(r + '0');
		}
		else {
			s.push(r + 55);
		}
		n /= b;
	}
	int l = s.size();
	for (int i = 0; i < l; i++) {
		printf("%c", s.top());
		s.pop();
	}
	return 0;
}

```

## 백준 11005번 reverse를 사용한 코드

```cpp
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

int main() {
	long long n = 0, b = 0;
	string ans = "";
	scanf("%d%d", &n, &b);
	while (n != 0) {
		int r = n % b;
		if (r < 10) {
			ans += char(r + '0');
		}
		else {
			ans += char(r + 55);
		}
		n /= b;
	}
	reverse(ans.begin(), ans.end());
	cout << ans << endl;
	//printf("%s\n", s.c_str());
	return 0;
}

```

## N진법-> 10진법


```cpp
//내 코드
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

int main() {
	string s="";
	int b = 0;
	cin >> s >> b;
	int len = s.size();
	long long mul = b, ans = 0;
	
	if (s[len - 1] <= '9') ans = s[len - 1] - '0';
	else ans = s[len - 1] - 'A' + 10;

	for (int i = len -2; i >= 0; i--) {
		if (s[i] <= '9') {
			ans += (s[i] - '0') * mul;
			mul *= b;
		}
		else {
			ans += (s[i] - 'A' + 10) * mul;
			mul *= b;
		}
	}
	cout << ans << "\n";

	return 0;
}
```

## 백준님 풀이

ans +=가 아니라 ans =임에 주목!

3진법 102 -> 10진법 11 

1. 1
2. 1 * 3 + 0
3. 1 * $3^{2}$ + 0 * 3 + 2

혹은  

1. 0 * 3 + 1 = 1
2. 1 * 3 + 0 = 3
3. 3 * 3 + 2 = 11

```cpp
//백준님 코드

#include <iostream>
#include <string>
using namespace std;
int main() {
	int ans = 0;
	string s;
	int b;
	cin >> s >> b;
	for (int i = 0; i < s.size(); i++) {
		if ('0' <= s[i] && s[i] <= '9') {
			ans = ans * b + (s[i] - '0');
		}
		else {
			ans = ans * b + (s[i] - 'A' + 10);
		}
	}
	cout << ans << '\n';
	return 0;
}
```

## A진법 -> B진법

1. A진법 -> 10진법 -> B진법
2. B가 음수인 경우에는, [2089](https://www.acmicpc.net/problem/2089) 문제를 풀어보자.

~2089풀이는 백준강의 PPT 기초-4-수학 1(필기) -31PAGE에 있다.~

