---
title: "[10824] 네 수"
excerpt: "to_string, stoll 사용하기"
date: 2019-07-18
categories:
  - BOJ
tags:
  - stoll
  - to_string

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---


## 코드

```cpp
#include <iostream>
#include <string>
using namespace std;

int a, b, c, d;
string sa, sb, sc, sd;

int main(void) {
	cin >> a >> b >> c >> d;
	sa = to_string(a);
	sb = to_string(b);
	sc = to_string(c);
	sd = to_string(d);
	sa += sb;
	sc += sd;
	cout << stoll(sa) + stoll(sc) << "\n";
	return 0;
}

```