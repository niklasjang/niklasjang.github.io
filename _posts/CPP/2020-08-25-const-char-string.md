---
title: "const char*, const char[], string 비교"
excerpt: ""
date: 2019-07-22
categories:
  - CPP
tags:
  - cpp
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

본 포스팅은 아래 코드의 차이점을 명확히하기 위한 포스팅입니다.  

```cpp
char str1[] = "abc";
//char* str2 = "abc"; //불가능
const char* str2-1 = "abc";
const char* str2-2 = "abc";
string str3 = "abc";
const char* str4 = str3.c_str();
```  

- str1 : 길이가 5인 고정 배열에 메모리를 할당하고 "abc\0" 문자열로 해당 메모리를 초기화.
  - 메모리에 할당이 되었기 때문에 내용 변경 가능
- str2 : 읽기 전용 메모리인 리터럴로 처리한다. 
  - str2-1과 str2-2가 서로 다른 값을 가진다. 컴파일러에 따라서 단일 리터럴로 결합 할 수 있다.
  - cpp에서는 const가 아니면 char*를 생성하지 못한다.
  - 컴파일러에 의해서 단일 리터럴로 결합되는 경우 const가 아니면 str2-1이 변경되었을 때 str2-2에 영향을 줄 수 있기 때문이다. 
- str3 : string type
- str4 : `const char* c_str() const noexcept;`

# string type

```cpp
string s;
cin>> s; // a b입력
cout<<s; // a만 출력

getline(cin, s); //a b 입력
cout<<s; //a b 출력
```

아래의 코드는 cin에 입력하기 위해 2'\n'를 입력하면 s에 '\n'가 입력되어 빈 문자열이 출력된다.  

```cpp
int a ;
cin>>a;  //s'\n'입력
string s;
getline(cin, s); //'\n'가 입력되어 빈 문자열이 출력됨
```

이를 막기 위해서는 cin.ignore()를 추가한다.

```cpp
int a ;
cin>>a;  //s'\n'입력
std::cin.ignore(32767, '\n'); // ignore up to 32767 characters until a \n is removed
string s;
getline(cin, s); //'\n'가 입력되어 빈 문자열이 출력됨
```

32767을 외우기 싫어보이지만 이는 아래의 긴코드를 작성하는 것보다 낫다.

```cpp
#include <limits>
std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // ignore unlimited characters until a \n is removed
```  

# const char* to string

```cpp
const char* str = "hello";
std::string s(str);
```

# string to const char*

``cpp
string s = "123";
const char* str = s.c_str();
```

