---
title: "[C++] 기본 Syntax 4 "
excerpt: "#if #endif #ifndef 조건부 컴파일, getter,setter"
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

1. 조건부 컴파일이란 코드의 일부분을 상황에 따라서 컴파일 하고/안하고를 구분하는 방법이다.
2. 출력문을 출력할지 말지를 결정할 수도 있고, 헤더파일의 중복 삽입을 막을 수도 있다.

```cpp
#include <iostream>
#define ADD 1
#define MIN 0
int main(void) {
	using namespace std;
#if ADD
	cout << "123" << endl;
#endif
	std::cout << "456" << std::endl;

	return 0;
}
```
```
//-출력-
123
456
```
```cpp
#include <iostream>
//#define ADD 1
#define MIN 0
int main(void) {
	using namespace std;
#ifdef ADD
	cout << "123" << endl;
#endif
	std::cout << "456" << std::endl;

	return 0;
}
```
```
//-출력-
456
```

```cpp
#include <iostream>
//#define ADD 1
#define MIN 0
int main(void) {
	using namespace std;
#ifndef ADD
	cout << "123" << endl;
#endif
	std::cout << "456" << std::endl;
	return 0;
}
```
```
//-출력-
123
456
```

## #else의 삽입 : #if, #ifdef, #ifndef-에만 해당

```cpp
#include <iostream>
#define ADD 2
#define MIN 0
int main(void) {
	using namespace std;
#if ADD==1
	cout << "123" << endl;
#else
	cout << "123123" << endl;
#endif
	std::cout << "456" << std::endl;

	return 0;
}
```

```
//-출력-
123123
456
```

```cpp
#elif :#if에만 해당-

#include <iostream>
#define ADD 2
#define MIN 0
int main(void) {
	using namespace std;
#if ADD==1
	cout << "123" << endl;
#elif ADD ==2
	cout << "123123" << endl;
#endif
	std::cout << "456" << std::endl;

	return 0;
}
```

```
//-출력-
123123
456
```



​
## 헤더파일의 중복 삽입 막기 

//main.cpp
#include "car.h"

int main(void) {
	Car run99;
	run99.InitMemvers("nam2312e", 100);
	run99.Accel();
	run99.Accel();
	run99.ShowCarState();

}
 //Car.h
#ifndef __car_h__
#define __car_h__
namespace CAR_CONSTANT {
	enum {
		ID_LEN = 20,
		MAX_SPD = 200,
		FUEL_STEP = 2,
		ACC_STEP = 10,
		BRK_STEP = 10
	};
}

class Car {
private:

	char gamerId[CAR_CONSTANT::ID_LEN];
	int fuelGauge;
	int curSpeed;
public:
	void InitMemvers(const char* ID, int fuel);
	void ShowCarState();
	void Accel();


};

inline void Car::Accel() {
	if (fuelGauge <= 0) {
		return;
	}
	else {
		fuelGauge -= CAR_CONSTANT::FUEL_STEP;
	}

	if (curSpeed + CAR_CONSTANT::ACC_STEP >= CAR_CONSTANT::MAX_SPD) {
		curSpeed = CAR_CONSTANT::MAX_SPD;
		return;
	}
	curSpeed += CAR_CONSTANT::ACC_STEP;
}
#endif
 1. 인라인 함수는 헤더파일에 넣는다

2. cpp파일들에서는 각각의 cpp파일에 필요한 헤더파일들을 전부 #include 하고, 헤더파일에서는 시작 부분에 #ifndef __이름_h__형태를 통해서 헤더파일의 중복 삽입을 막는다. 코드가 중복해서 포함되는 것이 문제가 안될 수도 있지만, 구조체의 정의 같은 경우는 중복 삽입되면 안되기 때문에 이와 같은 형태로 막아주어야한다.

3. #endif도 꼭 적어주어야 컴파일이 되며, #endif의 경우 이하의 내용이 무조건 컴파일 된다. 

//Car.cpp
#include <iostream>
#include <cstring>

#include "car.h"
using namespace std;

void Car::ShowCarState() {

	cout << gamerId << endl;
	cout << curSpeed << endl;
	cout << fuelGauge << endl;
}


void Car::InitMemvers(const char * ID, int fuel) {
	strcpy_s(gamerId, ID);
	fuelGauge = fuel;
	curSpeed = 0;
}


## Getter, Setter

```cpp
//main.cpp
#include <iostream>
#include "PointHeader.h"
using namespace std;

int main(void) {
	Point point;
	point.InitMembers(10, 10);
	cout << point.GetX() << " " << point.GetY() << endl;
	point.SetX(20);
	point.SetY(20);
	cout << point.GetX() << " " << point.GetY() << endl;

	return 0;

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
