---
title: "[C++] 기본 Syntax 8"
excerpt: "this포인터, Self-Reference참조자"
date: 2019-09-06
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

멤버함수 내에서 this라는 포인터를 사용할 수 있습니다. this는 객체 자신을 가리키는 용도로 사용합니다.


```cpp
//SimpleClass.h
#include <iostream>
#ifndef __SIMPLECLASS_H__
#define __SIMPLECLASS_H__
using namespace std;
class SimpleClass {
private:
	int num;
public:
	SimpleClass() {
		num = 0;
		cout << "Address is..." << this << endl;
	}
	int& GetNum() {
		return num;
	}
	SimpleClass* ReturnItSelf() {
		return this;
	}

};
#endif
```

```cpp
 //main.cpp
#include <iostream>
#include "SimpleClass.h"

using namespace std;

int main(void) {
	SimpleClass sc1;
	SimpleClass &sc2 = sc1;
	SimpleClass * scPtr = sc1.ReturnItSelf();
	if (sc1.GetNum() == sc2.GetNum() &&
		sc1.GetNum() == scPtr->GetNum()){
		std::cout << "Consistent!" << std::endl;
	}

	cout << "scPtr's address is "<< scPtr << endl;
	return 0;
}
```

이처럼 this는 그 주소 값과 자료형이 정해지지 않은 포인터입니다. 사용하는 객체에 따라서 주소 값과 자료형이 정해집니다.​

## 활용

```cpp
public:
	SimpleClass(int num) {
		this->num = num;
		cout << "Address is..." << this << endl;
	}
```

다음과 같이 멤버변수와 매개변수의 이름이 같을 때 이들을 구분하기 위해 this를 사용할 수 있습니다. this->를 사용해서는 멤버변수만 가리키고 지역변수르 가리킬 수 없으므로 확실하게 구분이 됩니다. 

## Self-Reference

```cpp
//SimpleClass.h
#include <iostream>
#ifndef __SIMPLECLASS_H__
#define __SIMPLECLASS_H__
using namespace std;
class SimpleClass {
private:
	int num;
public:
	SimpleClass() {
		num = 0;
	}
	SimpleClass(int num) {
		this->num = num;
		cout << "Address is..." << this << endl;
	}
	int& GetNum() {
		return num;
	}
	SimpleClass* ReturnItSelf() {
		return this;
	}
	SimpleClass& ReturnSelfReference() {
		return *this;
	}
	SimpleClass& Adder(int n) {
		num += n;
		return *this;
	}
};
#endif
```

```cpp
 //main.cpp
#include <iostream>
#include "SimpleClass.h"

using namespace std;

int main(void) {
	SimpleClass sc;
	SimpleClass &sc2 = sc.ReturnSelfReference();
	cout << sc.GetNum() << endl;
	cout << sc2.GetNum() << endl;
	cout << sc.Adder(2).ReturnSelfReference().Adder(3).GetNum() << endl;
	return 0;
}
```

```
출력
0
0
5
```
