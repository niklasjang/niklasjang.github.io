---
title: "[10808] 알파벳 갯수"
excerpt: "count 써보기"
date: 2019-07-18
categories:
  - BOJ
tags:
  - Count

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
#include <string>
using namespace std;
string s;
int arr[26];
int main(void) {
	cin >> s;
	for (int i = 0; i < s.length(); i++) {
		int idx = s[i] - 'a';
		arr[idx] += 1;
	}
	for (int j = 0; j < 26; j++) {
		printf("%d ", arr[j]);
	}
	return 0;
}
```

## 백준님 코드

```cpp

#include <algorithm>
#include <iostream>
#include <string>
using namespace std;
int main() {
    string s;
    cin >> s;

    for (int i='a'; i<='z'; i++) {
        cout << count(s.begin(), s.end(), i) << ' ';
    }

    cout << '\n';
    

    return 0;
}

```

## std::count

```cpp

#include <algorithm>
[first,last)에서 value가 몇 번 등장하는지 count 

```

reference  

```cpp
// count algorithm example
#include <iostream>     // std::cout
#include <algorithm>    // std::count
#include <vector>       // std::vector

int main () {
  // counting elements in array:
  int myints[] = {10,20,30,30,20,10,10,20};   // 8 elements
  int mycount = std::count (myints, myints+8, 10);
  std::cout << "10 appears " << mycount << " times.\n";

  // counting elements in container:
  std::vector<int> myvector (myints, myints+8);
  mycount = std::count (myvector.begin(), myvector.end(), 20);
  std::cout << "20 appears " << mycount  << " times.\n";

  return 0;
}


```