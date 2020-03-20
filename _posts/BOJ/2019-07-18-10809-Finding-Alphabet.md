---
title: "[10809] 알파벳 찾기"
excerpt: "find 써보기"
date: 2019-07-18
categories:
  - BOJ
tags:
  - Find

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 내 코드

```cpp

#include <cstdio>
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;
string s;
int arr[26];
int main(void) {
	cin >> s;
	for (int j = 0; j < 26; j++) {
		arr[j] = -1;
	}
	for (int i = 0; i < s.length(); i++) {
		if (arr[s[i] - 'a'] == -1) {
			arr[s[i] - 'a'] = i;
		}
	}

	for (int j = 0; j < 26; j++) {
		cout << arr[j] << " ";
	}
	return 0;
}
```

## 백준님 코드

```cpp

#include <cstdio>
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;
string s;
int arr[26];
int main(void) {
	cin >> s;
	
	for (int i = 'a'; i <= 'z'; i++) {
		auto pos = find(s.begin(), s.end(), i);
		if (pos == s.end()) {
			printf("-1 ");
		}
		else {
			printf("%d ", pos - s.begin());
		}
	}
	printf("\n");
	return 0;
}

```