---
title: "[C++] 기본 Syntax 6 "
excerpt: "constructor"
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

우리는 아래와 같이 class를 정의하고 맴버변수를 초기화 해왔다.

```cpp
//SipleClass.h
#pragma once
#include <iostream>
#ifndef __SIMPLECLASS_H__
#define __SIMPLECLASS_H__
using namespace std;
class SimpleClass {
private:
	int num = 10;
public:
	void InitMember(int n) {
		num = n;
	}
	void PrintMemberValue() {
		cout << num << endl;
	}
	int GetNum() {
		return num;
	}
};
#endif
```

```cpp
 //main.cpp
#include <iostream>
#include "SimpleClass.h"
int main(void) {
	SimpleClass sc;
	sc.PrintMemberValue();
	sc.InitMember(20);
	sc.PrintMemberValue();
	return 0;
}
```

1. 이를 위해서는 객체의 생성을 한 뒤에 따로 InitMember()함수를 호출해야하는 번거로움이 있다.
2. Visual Studio 2018에서는 private에 선언한 맴버변수에 바로 초기화가 가능한데 2010버전에서는 불가능했던거로 기억된다.
3. 객체의 생성과  초기화를 한 번에 진행하는 과정이 생성자Constructor이다.  

음  

​```cpp
 //SipleClass.h
#include <iostream>
#ifndef __SIMPLECLASS_H__
#define __SIMPLECLASS_H__
using namespace std;
class SimpleClass {
private:
	int num = 10;
public:
	SimpleClass(int n) {
		num = n;
	}
	void PrintMemberValue() {
		cout << num << endl;
	}
	int GetNum() {
		return num;
	}
};
#endif
```

```cpp
 //main.cpp
#include <iostream>
#include "SimpleClass.h"
int main(void) {
	SimpleClass sc(20);
	sc.PrintMemberValue();
	return 0;
}
```

1. 기능은 InitMember 함수를 따로 정의한 뒤에 사용하는 것과 동일하다.
2. 사용 방법이 SimpleClass sc(20)에서와 같이 더 간단하다는 장점이 있다.
3. 클래스의 이름과 함수의 이름이 동일하다.
  - 반환형이 선언되어 있지 않으며, 실제로 반환하지 않는다.
  - 객체 생성시 딱 한 번 호출된다.
  - 생성자도 함수의 일종이니 오버로딩이 가능하다.
  - 생성자도 함수의 일종이니 매개변수에 default 값 설정이 가능하다.
4. 아래와 같이 동적할당을 하는 부분에서도 사용이 가능하다.

```cpp
//SipleClass.h 
//위와 동일함
```

```cpp
//main.cpp
#include <iostream>
#include "SimpleClass.h"
int main(void) {
	SimpleClass sc(20);
	sc.PrintMemberValue();

	SimpleClass* scPtr = new SimpleClass(40);
	(*scPtr).PrintMemberValue(); //같은 내용
	scPtr->PrintMemberValue();   //같은 내용
	return 0;
}
```
1. -> 연산자는 해당 포인터의 맴버에 접근할 때 사용 가능한 연산자이다. (*~~).보다 더 편리하다.

## 생성자의 오버로딩

```cpp
//SipleClass.h
#pragma once
#include <iostream>
#ifndef __SIMPLECLASS_H__
#define __SIMPLECLASS_H__
using namespace std;
class SimpleClass {
private:
	int num1 = 10;
	int num2;
public:
	SimpleClass() {
		num1 = 0;
		num2 = 0;
	}

	SimpleClass(int n) {
		num1 = n;
	}
	SimpleClass(int n1, int n2) {
		num1 = n1;
		num2 = n2;
	}
	void PrintMemberValue() {
		cout << num1 << endl;
		cout << num2 << endl;
	}
	int GetNum() {
		return num1;
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
	SimpleClass sc(20);
	sc.PrintMemberValue();
	cout << endl;

	SimpleClass sc2(30, 40); //생성자 오버로딩
	sc2.PrintMemberValue();
	cout << endl;

	SimpleClass sc3;
	sc3.PrintMemberValue();

	//SimpleClass sc4();//Error!
	//sc4.PrintMemberValue(); //Error!
	return 0;
}
```

1. 중요한 것은 SimpleClass sc1()이 불가능 하다는 것이다.
  - SimepleClass sc1() : 불가능 <----------------------------------------주의
  - SimepleClass sc1(10) : 가능
  - SimepleCalss * scPtr = new SimpleClass() : 가능
  - SimepleCalss * scPtr = new SimpleClass(10) : 가능

## SimepleClass sc1()의 ()가 불가능한 이유

우리는 main 함수 아래에서 함수를 정의하면 main 함수 위 부분에 함수의 원형을 선언을 한다.

```cpp
#include <iostream>

void PrintTest(void); //함수의 원형 선언
int main (void){
    printTest();
    return 0;
}

void PrintTest(void){
    std::cout<<"!23"<<std::endl;
}
```
그런데 SimpleClas sc1();과 같이 객체를 만들려고 하면 이것이  반환형이 SimpleClass이고 함수 이름이 sc1이고 매개변수가 void인 함수의 원형 선언으로 해석될 수도 있다. (함수의 원형 선언은 보통 전역적으로 이루어지지만 지역적으로도 할 수 있다고 한다.)

결론은  

```
SimpleClass sc1;
```

와 같이 선언을 하면 기본생성자  

```cpp
SimpleClass(){
    num1 = 0;
    num2 = 0;
}
```

가 자동으로 실행이 된다고 받아들이자.  

*SimpleClass * ptr = new SimpleClass();가 가능한 것은 원래 매개변수가 없을 때 ()를 생략할 수도 있고, 안할 수도 있는 상식으로 이해하자. (위에서 설명한 함수의 원형 선언과 헷갈릴 수 있어서 불가능 한 것이 특별한 케이스이다.)

## 생성자의 활용 

Point& Rectangle 예제의 재활용 : 여기서 사용한 코드를 수정해서 사용합니다.

```cpp
//main.cpp
#include <iostream>
#include "PointHeader.h"
#include "RectangleHeader.h"
using namespace std;

int main(void) {
	/*
	Point pos1;
	if (!pos1.InitMembers(-2, 10)) {
		cout << "초기화 실패" << endl;
	}
	if (!pos1.InitMembers(2, 10)) {
		cout << "초기화 실패" << endl;
	}
	Point pos2;
	if (!pos2.InitMembers(6, 5)) {
		cout << "초기화 실패" << endl;
	}
	*/
	Rectangle rec1(1,2,3,4);
	rec1.ShowRecInfo();
	cout << rec1.ShowRecInfo << endl;
	return 0;

}
```

```cpp
 #pragma once
//RectangleHeader.h
#ifndef __RECTANGELHEADER_H__
#define __RECTANGELHEADER_H__

#include "PointHeader.h"

class Rectangle {
private:
	Point upLeft;
	Point lowRight;
public:
	Rectangle(const int &x1, const int &y1, const int &x2, const int &y2);
	bool InitMembers(const Point &ul, const Point &lr);
	void ShowRecInfo() const;
	int GetUpLeftXpos() const;
};
#endif
```

```cpp
 //Rectangle.cpp
#include <iostream>
#include "RectangleHeader.h"
using namespace std;

Rectangle::Rectangle(const int &x1, const int &y1, const int &x2, const int &y2)
 : upLeft(x1, y1), lowRight(x2, y2) {
	//Empty
}

bool Rectangle::InitMembers(const Point &ul, const Point &lr) {
	if (ul.GetX() > lr.GetX() || ul.GetY() < lr.GetY()) {
		cout << "Postioin Error!" << endl;
		return false;
	}
	upLeft = ul;
	lowRight = lr;
	return true;
}

int Rectangle::GetUpLeftXpos() const {
	return upLeft.GetX();
}

void Rectangle::ShowRecInfo() const {
	cout << "좌 상단 : " << '[' << upLeft.GetX() << ",";
	cout << upLeft.GetY() << ']' << endl;
	cout << "우 하단: " << '[' << lowRight.GetX() << ",";
	cout << lowRight.GetY() << ']' << endl;
}
```

```cpp
 #pragma once
//PointHeader.h
#ifndef __POINT_H__
#define __POINT_H__

class Point {
private:
	int x;
	int y;
public:
	Point(const int &xpos, const int &ypos);
	bool InitMembers(int xpos, int ypos);
	int GetX() const;
	int GetY() const;
	bool SetX(int xpos);
	bool SetY(int ypos);
};

#endif
```

```cpp
 //point.cpp

#include <iostream>
#include "PointHeader.h"
using namespace std;

Point::Point(const int &xpos, const int &ypos) {
	x = xpos;
	y = ypos;
}

bool Point::InitMembers(int xpos, int ypos) {
	if (xpos < 0 || ypos < 0) {
		cout << "position under Zero Error" << endl;
		return false;
	}
	x = xpos;
	y = ypos;
	return true;
}

int Point::GetX() const {
	return x;

}

int Point::GetY() const {
	return y;
}

bool Point::SetX(int xpos) {
	if (xpos < 0 || xpos > 100) {
		cout << "position under Zero Error" << endl;
		return false;
	}
	x = xpos;
	return true;
}

bool Point::SetY(int ypos) {
	if (ypos < 0 || ypos > 100) {
		cout << "position under Zero Error" << endl;
		return false;
	}
	y = ypos;
	return true;
}
```

1. 아래의 코드는 맴버 이니셜라이져라고 부릅니다.
2. 이니셜라이져를 통해서 멤버변수/객체의 초기화를 진행하는 부분입니다.
3. 실행 순서는 객체생성을 위한 메모리 공간 할당 -> 멤버 이니셜라이져 -> 생성자의 몸체 부분 실행 순서입니다.

```cpp
Rectangle::Rectangle(const int &x1, const int &y1, const int &x2, const int &y2)
 : upLeft(x1, y1), lowRight(x2, y2) {
	//Empty
}
```

## default 생성자

객체의 메모리 공간 할당 이후에 생성자의 호출까지 완료되어야 '객체'라고 할 수 있다. 즉 객체가 되기 위해서는 반드시 하나의 생성자가 호출되어야 한다. 그리고 이러한 기준에 예외를 두지 않기 위해서 생성자를 정의하지 않은 클래스에 대해서는 컴파일러가 default 생성자를 호출한다.

```cpp
//아무일도 하지 않는 default 생성자
class AAA{
private:
public:
   AAA(){}
   ... 
};
```

주의할 점  

1. AAA * ptr = new AAA;
  - new를 사용해서 객체를 생성하면 생성자가 호출된다. 생성자를 정의하지 않았다면 defualt 생성자가 호출되다.
2. AAA * ptr = (AAA*)malloc(sizeof(AAA));
  - malloc을 사용하면 바이트 크기의 메모리만 할당이 되고 생성자가 호출되지 않는다. 따라서 객체를 생성할 때에는 반드시 new를 사용해야한다. (객체가 되기 위해서는 생성자가 호출되어야 하므로)

## default 생성자 2

```cpp
//main.cpp
#include <iostream>
#include "AAA.h"
int main(void) {
	AAA aaa(5);              //가능
	aaa.ShowWhatYouGot();    //가능

	AAA aab();               //함수의 원형 선언과 헷갈릴 수 있으므로 불가능 
	aab.ShowWhatYouGot();    //aab가 정의되지 않아서 불가능

	AAA aac;                 //빈 생성자를 정의하면 가능
	aac.ShowWhatYouGot();    //빈 생성자를 정의하면 가능


	return 0;
}
```
```cpp
 //AAA.h
#include <iostream>
#pragma once
#ifndef __AAA_H__
#define __AAA_H__
class AAA {
private:
	int num;
public:
	AAA(){ }
	AAA(int n) : num(n) {
		//Empty Body
	}
	void ShowWhatYouGot() {
		std::cout << num << std::endl;
	}
};
#endif
```

## private 생성자

```cpp
//AAA.h
#include <iostream>
#pragma once
#ifndef __AAA_H__
#define __AAA_H__
class AAA {
private:
	int num;
	AAA(int n) : num(n) {
		//Empty Body
	}
public:
	AAA(){ }
	AAA& CreateInitObj(int n) {
		AAA * ptr = new AAA(n);
		return *ptr;
	}
	void ShowWhatYouGot() {
		std::cout << num << std::endl;
	}
};
#endif
```

```cpp
 //main.cpp
#include <iostream>
#include "AAA.h"
int main(void) {
	AAA aaa;
	AAA &aab = aaa.CreateInitObj(5);
	aab.ShowWhatYouGot();

	return 0;
}

소멸자Destructor는 다음 포스트에서 이어집니다.  