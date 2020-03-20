---
title: "[C++] 기본 Syntax 2 "
excerpt: "파일 분할 개념 및 예제"
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

## 파일 분할

```cpp
//main.cpp
# include <iostream>
int num = 0;
//------------------------------------------------------------------임의의 위치에서 파일 분할
void Increment(void) {
	num++;
}

int GetNum(void) {
	return  num;
}
//------------------------------------------------------------------임의의 위치에서 파일 분할

int main(void) {
	std::cout << GetNum() << std::endl;
	using namespace std;
	Increment();
	cout << GetNum() << endl;
	return 0;
}

```
1. 주석에서  명시한 위치에서와 같이 임의의 위치에서 파일 분할을 하면(include 문을 제대로 써도) 컴파일 에러가 발생한다. 
2. 컴파일러는 파일 단위로 컴파일을 진행하기 때문이다.  따라서 변수의 선언을 못찾을 수도, 함수의 선언을 못찾을 수도 있다.

​
```cpp
extern int num;
extern void Increment(void);
void Increment(void);
```

1. int형 변수 num이 외부에 선언되어있음을 알린다.
2. Increment 함수가 외부에 선언되어있음을 알린다.
3. 함수의 경우 extern 선언을 생략할 수 있다. 

​

## static

1. 이 변수는 외부 파일에서 접근을 허용하지 않는다. 라는 의미
2. 혹은 이 변수의 접근 범위는 파일 내부로 제한한다. 라는 의미

```cpp
//main.cpp
# include <iostream>
using namespace std;
extern void Increment();
extern int GetNum();

static void SimpleFunc() {
	cout << "main 에서만 사용할 함수" << endl;

}

int main(void) {
	std::cout << GetNum() << std::endl;
	using namespace std;
	Increment();
	cout << GetNum() << endl;
	SimpleFunc();
	return 0;
}
```

```cpp
 //func.cpp
extern int num;

void Increment(void) {
	num++;
}

int GetNum(void) {
	return  num;
}
```

```cpp
 //num.cpp
int num = 0;
```

## 헤더파일의 디자인과 활용

```cpp
//header1.h
{ 
	std::cout << "123" << endl;
```

```cpp
 //header2.h
}
```
```cpp
int main(void) 
#include "header1.h"
#include "header2.h"
```

1. 위 프로그램은 정상적으로 작동이 된다.
2. "#include"의 뜻은 이 문장의 위치에다가 header.h에 저장된 내용을 가져다 놓으세요.이다.
3. "#include" 지시자는 그 이름이 의미하듯이 파일의 내용을 단순히 포함시키는 용도로 사용된다. 그 이상 그 이하도 아닌 단순한 '포함'을 의미한다.

## "#include" <헤더파일 이름> v.s. "#include" "헤더파일 이름"

1. 첫 번째 방식 : #include <헤더파일 이름>
  - 표준 헤더파일(C의 표준에서 정의하고 있는, 기본적으로 제공되는 헤더파일)이 저장되어 있는 디렉터리에서 파일을 찾게 된다. 때문에 이 방식은 <iostream>과 같은 표준 헤더파일을 포함시킬 경우 사용한다.
2. 두 번째 방식 : #include "헤더파일 이름"
  - 이 문장을 포함하는 소스파일이 저장된 디렉터리에서 헤더파일을 찾는다. 즉, 프로그래머가 정의하는 헤더파일을 포함시킬 때 사용하는 방식이다.
5. 두 번째 방식을 사용하면 절대경로를 사용해서 헤더파일을 지정할 수 있다.
  - $#include 'C:\niklasjang\document\cpp\header.h"$
6. 두 번째 방식을 사용해서 상대경로를 사용해서 헤더파일을 지정할 수 있다.
  - $#include "Release\header0.h"$ 소스파일이 있는 디렉터리의 하위 디렉터리인 Release 디렉터리에 존재하는 header0.h를 include
  - $#include "..\Release\header0.h"$ 한 단계 상위 디렉터리의 하위 디렉터리인 Release 디렉터리에 존재하는 header0.h를 include
  - $#include "..\..\Release\header0.h"$ 두 단계 상위 디렉터리의 하위 디렉터리인 Release 디렉터리에 존재하는 header0.h를 include

## 헤더파일에 어떤 파일을 넣을 것인가?

```cpp
extern int num;
extern int GetNum(void);
```

1. 외부에 선언된 변수나 함수에 접근하기 위해서 필요한 선언들이지만 매번 삽입하는 것은 번거로우니 이들 선언을 헤더파일에 모아두고 필요할 때마다 헤더파일을 포함시키는 방법을 선택한다.

```cpp
//header.h
#pragma once
#define PI 3.1415
double Add(double num1, double num2);
double Min(double num1, double num2);
double Mul(double num1, double num2);
double Div(double num1, double num2);
 //main.cpp
#include<iostream>

#include "header.h"

int main(void) {

	Add(10, 20);

	return 0;
}

double Add(double num1, double num2) {
	return num1 + num2;
}

double Min(double num1, double num2) {
	return num1 - num2;
}

double Mul(double num1, double num2) {
	return num1 * num2;
}

double Div(double num1, double num2) {
	return num1 / num2;
}
```

1. 매크로 PI에 대한 정의가 헤더파일 header.h에 삽입되어있다. 때문에 PI를 필요로 하는 소스 파일은 header.h를 포함시키기만 하면 된다.
2. 구조체의 정의도 헤더파일에서 작성하고, 구조체를 여러 개의 소스 파일에서 사용하도록 한다.
3. class 정의 과정에서 .h 파일과 .cpp파일의 사용 방법 그리고 여러개의 cpp 파일을 한꺼번에 컴파일 하는 방법은 아래 예제를 참고한다.

## 파일 분할 예제

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
	bool InitMembers(int xpos, int ypos);
	int GetX() const;
	int GetY() const;
	bool SetX(int xpos);
	bool SetY(int ypos);
};
#endif
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
	bool InitMembers(const Point &ul, const Point &lr);
	void ShowRecInfo() const;

};
#endif
```

```cpp
//point.cpp

#include <iostream>
#include "PointHeader.h"
using namespace std;

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

```cpp
//Rectangle.cpp
#include <iostream>
#include "RectangleHeader.h"
using namespace std;

bool Rectangle::InitMembers(const Point &ul, const Point &lr) {
	if (ul.GetX() > lr.GetX() || ul.GetY() < lr.GetY()) {
		cout << "Postioin Error!" << endl;
		return false;
	}
	upLeft = ul;
	lowRight = lr;
	return true;
}

void Rectangle::ShowRecInfo() const {
	cout << "좌 상단 : " << '[' << upLeft.GetX() << ",";
	cout << upLeft.GetY() << ']' << endl;
	cout << "우 하단: " << '[' << lowRight.GetX() << ",";
	cout << lowRight.GetY() << ']' << endl;
}
```

```cpp
//main.cpp
#include <iostream>
#include "PointHeader.h"
#include "RectangleHeader.h"
using namespace std;

int main(void) {
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
	Rectangle rec1;
	if (!rec1.InitMembers(pos1, pos2)) {
		cout << "초기화 실패" << endl;
	}
	rec1.ShowRecInfo();

	return 0;

}
[출처] 두 객체의 결합 : Point, Rectangel|작성자 niklasjang
```