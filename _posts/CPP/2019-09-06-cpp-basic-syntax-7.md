---
title: "[C++] 기본 Syntax 7"
excerpt: "member initializer, destructor, Object Array객체 배열"
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

```cpp
Rectangle::Rectangle(const int &x1, const int &y1, const int &x2, const int &y2)
 : upLeft(x1, y1), lowRight(x2, y2) {
	//Empty
}
```

이전 포스트에서 위와 같은 멤버 이니셜라이져를 공부했습니다. 멤버 이니셜라이져는 앞서 본 예제처럼 객체를 초기화할 때도 사용할 수 있지만, 기본적으로는 멤버의 초기화에도 사용할 수 있습니다.

​
```cpp
//main.cpp
#include <iostream>

#include "SoSimple.h"

int main(void) {
	return 0;
}
```

```cpp
 //SoSimple.h
#pragma once
#ifndef __SOSIMPLE_H__
#define __SOSIMPLE_H__
class SoSimple {
private:
	int num1;
	int num2;
public:
	SoSimple(int n1, int n2) :num1(n1) {
		num2 = n2;
	}
};
#endif
```

1. :num1(n1) 이 문장의 의미는 num1의 값을 n1의 값으로 초기화하라는 뜻입니다.
2. 멤버 변수를 초기화할 때는 생성자의 몸체에서 초기화하거나(num2 = n2;라고 적은 부분), 멤버 이니셜라이져로 초기화할 수 있다.
3. 많은 C++ 프로그래머는 초기화 대상을 명확히 인식할 수 있다는 점, 성능에서 약간의 이점이 있다는 부분에서 이미셜라이져를 더 선호한다. 
4. 3. 에서 언급한 전자는 int num2; num2=n2;의 두 문장을 의미하고, 후자는 int num1=n1;의 한 문장을 의미한다고 볼 수 있다.
5. 4. 를 다른 말로 설명하면 이니셜라이저를 이용하면 선언과 동시에 초기화가 이뤄지는 형태로 바이너리 코드가 생성된다.고 할 수 있다.


## 멤버 이니셜라이져를 통한 const 변수의 초기화

SoSimple(int n1, int n2) :num1(n1)에서  num1(n1)는 아래와 같은 뜻을 가지고 있다.  

int num1 = n1;  

따라서 아래와 같이 멤버변수가 const로 선언되었더라도 멤버 이니셜라이져를 통해서 초기화가 가능하다.  

```cpp
//SoSimple.h
#pragma once
#ifndef __SOSIMPLE_H__
#define __SOSIMPLE_H__
class SoSimple {
private:
	const int num1;
	int num2; //가능!
    const int num3;
public:
	SoSimple(int n1, int n2, int n3) :num1(n1) { //가능!
		num2 = n2; 
	    num3 = n3; //Error!
    }
};
#endif
```

SoSimple의 생성자의 몸체 부분에서 num3 = n3; 부분에서 const 변수가 이미 초기화 되어 있어서 바꿀 수 없다는 에러가 뜬다.  

## 멤버변수에 참조자를 넣을 경우

멤버변수에 참조자를 잘 넣지는 않지만 넣는 경우 Member Initializer를 사용해서 초기화 해야한다.

```cpp
//main.cpp
#include <iostream>

#include "SoSimple.h"
#include "AAA.h"
#include "BBB.h"
using namespace std;
int main(void) {

	AAA aaa(5);
	BBB bbb(aaa, 20);
	bbb.ShowContents();
	return 0;
}
```
```cpp
 //AAA.h
#include <iostream>
#pragma once
#ifndef __AAA_H__
#define __AAA_H__
using namespace std;
class AAA {
private:
	int num = 5;
public:
	AAA(int n) : num(n) {
		cout << "I am AAA" << endl;
	}
	void ShowYourName() {
		cout << "my num is " << num << endl;
		cout << "I'm class AAA" << endl;
	}
};
#endif
```
```cpp
 //BBB.h
#include <iostream>
#pragma once
#include "AAA.h"
#ifndef __BBB_H__
#define __BBB_H__

using namespace std;
class BBB {
private:
	AAA &ref;
	const int &num;
public:
	BBB(AAA &rr, int n) :ref(rr), num(n){
		//Empty
	}
	void ShowContents() {
		ref.ShowYourName();
	}

};
#endif
```

'main.cpp 에서 정의한 aaa'와 'bbb.h파일의 rr' 'bbb.h파일의 ref' 모두 같은 객체 aaa를 가리킨다.

## 파괴자

객체생성시 반드시 호출되는 것이 생성자라면, 객체 소멸시 반드시 호출되는 것은 소멸자이다. 

1. 소멸자는 이름 앞에 ~가 붙은 형태의 이름을 갖는다.
2. 반환형이 선언되지 않으며, 실제로 반환하지 않는다.
3. 매개변수는 void형으로 선언되어야 하기 때문에 오버로딩도, 디폴트 값 설정도 불가능하다.

```cpp
~AAA() { 
   ... 
}; 
```
 4. 디폴트 소멸자도 디폴트 생성자와 같이 정의되지 않아도 실행된다.

두 개의 클래스 정의는 똑같은 기능을 한다.

```cpp
class AAA{
   //Empty class
};
```
```cpp
class AAA{
public :
   AAA() {}
   ~AAA() {}
};
```

## 소멸자의 역할 

대게 생성자애서 할당한 리소스의 소멸에 사용된다. 예를 들어서 생성사 내에서 new 연산을 이용해서  동적 할당해 놓은 메모리 공간이 있으면, 소멸자에서 delete  연산자를 이용해서 이 메모리 공간을 소멸한다.

```cpp
//main.cpp
#include <iostream>
#include "AAA.h"
int main(void) {
	AAA aaa("niklasjang", 25);
	aaa.ShowWhayYouGot();

	return 0;
}
```

```cpp
 //AAA.h
#include <iostream>
#include <cstring>

#pragma once
#ifndef __AAA_H__
#define __AAA_H__

class AAA {
private:
	char * name;
	int age;
public:
	AAA(const char * myName, int myAge) {
		int len = strlen(myName) + 1;
		name = new char[len];
		strcpy_s(name, len, myName);
		age = myAge;
	}
	void ShowWhayYouGot() const {
		std::cout << name << age << std::endl;
	}
	~AAA() {
		delete[]name;
	}
};
#endif
```

## 객체 배열의 이해

객체의 배열도 기본자료형의 배열 선언 방식과 동일하다. 하지만 객체의 생성자에 관해서 조금 주의할 점이 있다. 

```cpp
//main.cpp
#include <iostream>
#include "SimpleClass.h"
using namespace std;
int main(void) {
	SimpleClass sc;
	sc.ShowWhatYouGot();

	SimpleClass sc2(20);
	sc2.ShowWhatYouGot();

	SimpleClass * scPtr = new SimpleClass[20]; //객체 배열 생성, default 생성자 20회 실행
	for (int i = 0; i < 20; i++) {
		scPtr[i].ShowWhatYouGot();
	}

	//SimpleClass * scPtr = new SimpleClass(40)[20]; //생성자에 인자 전달 불가능
	return 0;
}
```

1. 객체의 배열 할당 과정도 기본 자료형과 동일하다. 하지만 객체 배열이 할당될 때 배열의 길이만큼 기본 생성자가 실행이 되며, 생성자에 인자를 전달하는 방식으로 객체  배열 선언과 동시에 임의의 값으로 맴버 변수를 초기화하는 것이 불가능하다.
2. 사용자가 정의하는 값으로 초기화하기 위해서는 이후에 초기화를 다시 진행해야 한다.

```cpp
//SimpleClass.h
#pragma once
#include <iostream>
#ifndef __SIMPLECLASS_H__
#define __SIMPLECALSS_H__
using namespace std;
class SimpleClass {
private:
	int num;
public:
	SimpleClass() {
		cout << " default constructor" << endl;
		num = 10;
	}
	SimpleClass(int n) {
		cout << " constructor with one param" << endl;
		num = n;
	}
	void ShowWhatYouGot() {
		cout << num << endl;
	}
};
#endif
```

## 사용자 정의를 위해서 일일이 초기화 하는 예

```cpp

//main.cpp
#include <iostream>
#include "SimpleClass.h"
#include "person.h"
#define NAME_LEN 20
using namespace std;
int main(void) {
	//char * name; //Error!
	char name[NAME_LEN];
	char * namePtr;
	int age;
	person man;
	person *manPtr = new person[3];
	for (int i = 0; i < 3; i++) {
		cout << "name?"; cin >> name;
		cout << "age?";  cin >> age;
		namePtr = new char[strlen(name) + 1];
		strcpy_s(namePtr,strlen(name)+1, name);
		manPtr[i].SetPersonInfo(name, age);   //고정된 길이(NAME_LEN)으로 넘기기
		manPtr[i].PrintName();
		manPtr[i].SetPersonInfo(namePtr, age);//이름의 길이에 맞춰서 줄인 다음에 넘기기
		manPtr[i].PrintName();

	}
	return 0;
}
```

위의 코드는 객체 배열을 동적할당하는 방법을 사용했다. ( 아래에서는 객체 포인터 배열을 사용)

```cpp
//person.h
#ifndef __PERSON_H__
#define __PERSON_H__
#include <iostream>
#include <cstring>
using namespace std;
class person {
private:
	char * name;
	int age;
public:
	person() {
		name = NULL;
		age = 0;
	}
	person(char * myName, int myAge) {
		name = new char[strlen(myName) + 1];
		strcpy_s(name, strlen(myName)+1, myName);
		age = myAge;
	}
	void SetPersonInfo(char* myName, int myAge) {
		name = myName;
		age = myAge;
	}
	void PrintName() {
		cout << "name is ..." << name << endl;
	}
};

#endif
```

 
또는 객체 포인터 배열을 사용해서 만들 수도 있다.  

```cpp
//main.cpp
#include <iostream>
#include "SimpleClass.h"
#include "person.h"
#define NAME_LEN 20
using namespace std;
int main(void) {
	person * manPtr[3];
	char name[NAME_LEN];
	char * namePtr;
	int age;
	for (int i = 0; i < 3; i++) {
		cout << "name?"; cin >> name;
		cout << "age?";  cin >> age;
		namePtr = new char[strlen(name) + 1];
		strcpy_s(namePtr, strlen(name) + 1, name);
		manPtr[i] = new person(namePtr, age);
	}
	return 0;
}
```

```cpp
 //person.h
#ifndef __PERSON_H__
#define __PERSON_H__
#include <iostream>
#include <cstring>
using namespace std;
class person {
private:
	char * name;
	int age;
public:
	person() {
		name = NULL;
		age = 0;
	}
	person(char * myName, int myAge) {
		name = new char[strlen(myName) + 1];
		strcpy_s(name, strlen(myName)+1, myName);
		age = myAge;
	}
	void SetPersonInfo(char* myName, int myAge) {
		name = myName;
		age = myAge;
	}
	void PrintName() {
		cout << "name is ..." << name << endl;
	}
	~person() {
		delete[] name;
		cout << "Person Destructor!" << endl;
	}

};

#endif
```