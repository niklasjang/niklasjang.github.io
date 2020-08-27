---
title: "[C++] sizeof(pointer)"
excerpt: ""
date: 2020-08-25
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

## 32/64 bit executable

sizeof()연산자는 오브젝트의 bytes 사이즈를 계산해준다. 각각의 자료형은 고유한 byte size를 가지고 있다. 그런데 포인터는 결국 주소값만 저장하기 때문에 자료형의 크기와 상관없이 항상 동일한 byte size를 가진다. pointer의 byte size는 exe 실행파일의 아키텍쳐에 따라서 달라진다. 즉, CPU가 처리하는 데이터의 최소 단위 = 레지스터의 bit 크기 = 32bit/64bit에 따라서 달라진다. 64bit 운영체제에서 컴파일을 해도 32bit executable로 처리될 수 있다.    

```cpp
int x = 10;
int * xPtr = &x;
char y = 'a';
char * yPtr = &y;

std::cout << sizeof(x) << "\n";    //4
std::cout << sizeof(xPtr) << "\n"; //4
std::cout << sizeof(y) << "\n";    //1
std::cout << sizeof(yPtr) << "\n"; //4
```

64bit 운영체제에서 visual studio 2019로 컴파일했을 때 4Byte = 32bit가 출력되는 것은 visual studio가 32bit 기반으로 컴파일하기 때문이다. 

```cpp
struct Trie {
	bool finish;    //끝나는 지점을 표시해줌
	Trie* next[26];    //26가지 알파벳에 대한 트라이
	Trie() : finish(false) {
			memset(next, 0, sizeof(next));
			cout << sizeof(Trie) << "\n";               // 108
			cout << sizeof(Trie*) << "\n";              // 4
			cout << sizeof(next) << "\n";               // 104
			cout << sizeof(bool) << " ";                // 1
			cout << sizeof(finish) << "\n";             //1
			cout << sizeof(next)/sizeof(Trie*) << "\n"; // 26
	}
```

1. 108  : 아래에서 설명
1. 4    : 자료형에 상관없이 포인터는 4byte이다.
1. 104  : 64bit 
1. 1    : 배열의 첫 번째 요소에 대해 sizeof을 진행하면 길이 x 자료형의 크기 출력
1. 1    : 변수이므로 길이 1 x bool 자료형 크기 1 = 1
1. 26   : 배열의 길이 출력

## Data structure alignment

아래의 MyStruct1의 경우 Byte Size는 1이다. 그런데 MyStruct2의 Byte Size는 8이다. 이후 arr의 길이가 1 늘어날 때마다 int의 byte size만큼 크기가 늘어난다.  

```cpp
struct MyStruct1{
	bool visit;
};

struct MyStruct2{
	bool visit;
	int arr[1];
};
```  

그리고  MyStruct3의 경우 Byte Size는 8이고, MyStruct4는 12이다. 즉, visit과 a는 총 2byte만 사용하지만 데이터 정렬의 편의를 위해서 2byte를 건너뛴 위치에서 arr의 주소값이 시작된다. 

```cpp
struct MyStruct3{
	bool visit;
	bool a;
	int arr[1];
};

struct MyStruct4{
	bool visit;
	int arr[1];
	bool a;
};

MyStruct3 my3;
MyStruct4 my4;
printf("%p\n", &my3.visit); //00AFFB78
printf("%p\n", &my3.a);     //00AFFB79 (+1)
printf("%p\n", &my3.arr);   //00AFFB7C (+3)

printf("%p\n", &my4.visit); //00AFFB64 
printf("%p\n", &my4.arr);   //00AFFB68 (+4)
printf("%p\n", &my4.a);     //00AFFB6C (+4)
```  

이처럼 데이터 구조의 alignment를 지키는 이유는 정렬되지 않은 경우 퍼포먼스와 에러의 확률이 증가하기 때문이다.  

## 32bit 아키텍쳐 컴퓨터의 RAM 제한 4GB

추가적으로 32bit 컴퓨터가 4GB RAM만 가질 수 있는 이유는 레리스터 bit 크기의 한계이다. 2^32 = 4,294,967,296 의 경우의 수를 가지는데, 각 경우의 수마다 한 바이트의 주소를 가질 수 있으므로(메모리 주소가 bit가 아닌 Byte 단위로 주어진다.) 4,294,967,296Byty = 4GB의 주소만 저장할 수 있다.  