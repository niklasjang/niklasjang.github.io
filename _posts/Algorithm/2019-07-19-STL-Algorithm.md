---
title: "[header] #include <algorithm> "
excerpt: "C++ STL"
date: 2019-07-19
categories:
  - Algorithm
tags:
  - header

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## *max_element , *min_element

```cpp

#include <iostream>
#include <algorithm>
using namespace std;

int main(){

 int size;
 cin >> size;
 
 int *arr = new int[size];
 for(int i=0; i<size; i++){
  cin >> arr[i];
 }
 cout << "max값: " << *max_element(arr, arr+size) << endl;
 cout << "min값: " << *min_element(arr, arr+size) << endl;

 delete[] arr;
 return 0;
}
/*
5[엔터]
1 3 9 7 5[엔터]
max값: 9
min값: 1
[커서]
*/
//[출처] [C++ 강좌] 093 - 알고리즘 헤더 파일 (2) - max_element(), min_element()|작성자 라이

```

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main(){

 int size, val;
 cin >> size;
 
 vector<int> v;
 for(int i=0; i<size; i++){
  cin >> val;
  v.push_back(val);
 }
 cout << "max값: " << *max_element(v.begin(), v.end()) << endl;
 cout << "min값: " << *min_element(v.begin(), v.end()) << endl;

 return 0;
}
//[출처] [C++ 강좌] 093 - 알고리즘 헤더 파일 (2) - max_element(), min_element()|작성자 라이
/*
5[엔터]
9 1 7 3 5[엔터]
max값: 9
min값: 1
[커서]
[출처] [C++ 강좌] 093 - 알고리즘 헤더 파일 (2) - max_element(), min_element()|작성자 라이
*/
```

```cpp
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

int main(){

 string str = "algorithm";
 cout << *min_element(str.begin(), str.end()) << endl;
 cout << *max_element(str.begin(), str.end()) << endl;

 return 0;
}

/*
a
t
[커서]
[출처] [C++ 강좌] 093 - 알고리즘 헤더 파일 (2) - max_element(), min_element()|작성자 라이
*/
```