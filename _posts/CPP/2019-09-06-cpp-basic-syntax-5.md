---
title: "[C++] 기본 Syntax 5 "
excerpt: "const, const 함수, 캡슐화"
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

## const 함수

```cpp
void Rectangle::ShowRecInfo() const {
	cout << "좌 상단 : " << '[' << upLeft.GetX() << ",";
	cout << upLeft.GetY() << ']' << endl;
	cout << "우 하단: " << '[' << lowRight.GetX() << ",";
	cout << lowRight.GetY() << ']' << endl;
}
```
1. 이 함수 내에서는 멤버변수에 저장된 값을 변경하지 않겠다. 라는 뜻이다.
2. 매개변수도, 지역변수도 아닌, 멤버변수의 값을 변경하지 않는 것이다.

## const 함수 2

```cpp
int Rectangle::GetUpLeftXpos() const {
	return upLeft.GetX();
}
 
int Point::GetX() const {
	return x;
}
```

1. 다음과 같이 const함수에서 선언하는 함수의 경우 const 함수 내에서 호출되는 함수도 const 선언이 되어 있어야 한다.
2. int Point::GetX()와 같이 const 선언이 없다면 GetX()안에서 멤버변수의 변경이 일어날 수 있으므로 컴파일 에러가 난다.
3. 즉, const 함수 내에서는 const가 아닌 함수의 호출이 제한된다.

## const 참조자 객체의 멤버함수 호출

```cpp
//main.cpp
#include <iostream>
#include "EasyClass.h"
#include "LiveClass.h"
int main(void) {
	EasyClass easy;
	LiveClass live;
	return 0;
}
```

```cpp
 //EasyClass.h
#ifndef __EASYCLASS_H__
#define __EASYCLASS_H__
class EasyClass {
private:
	int num;
public:
	void InitNum(int n) {
		num = n;
	}
	int GetNum() const { //이 곳에 const 선언을 하지 않으면
		return num;
	}
};
#endif
 //LiveClass.h
#ifndef __LIVECLASS_H__
#define __LIVECLASS_H__

#include "EasyClass.h"
class LiveClass {
private:
	int num;
public:
	void InitNum(const EasyClass &easy) {
		num = easy.GetNum();  //이곳에서 에러가 발생한다.
	}
};

#endif
```

1. EasyClass의 GetX()를 const 선언하지 않는다면 LiveClass에서 EasyClass &easy를 const선언해서, 참조자 easy로 해당하는 값을 바꿀 수 없어야하지만 바꿀 수 있는 가능성이 생기는 것이므로 에러가 난다.
2. 비록 GetX() 함수는 멤버 변수를 바꾸는 기능이 없지만 바뀔 수 있는 가능성을 원천 차단하는 것이다.

## Encapsulation

먼저 아래와 같은 코드가 있다고 가정하자.

```cpp
//Coldpatient.h
#include <iostream>
#ifndef __COLDPATIENT_H__
#define __COLDPATIENT_H__
#include "RunnyNoseCap.h"
#include "SneezeCap.h"
#include "SnuffleCap.h"
using namespace std;
class ColdPatient {
private :
public:
	void TakeRunnyNoseCap(const RunnyNoseCap &cap) {
		cap.Take();
	}
	void TakeSneezeCap(const SneezeCap &cap) {
		cap.Take();
	}
	void TakeSnuffleCap(const SnuffleCap &cap) {
		cap.Take();
	}
};
#endif
```

```cpp
 //RunnyNoseCap.h
#include <iostream>
#ifndef __RUNNYNOSECAP_H__
#define __RUNNYNOSECAP_H__
using namespace std;
class RunnyNoseCap {

private:
public:
	void Take() const {
		cout << "콧물이 멈춥니다." << endl;
	}
};
#endif
```

```cpp
 //sneezeCap.h
#include <iostream>
#ifndef __SNEEZECAP_H__
#define __SNEEZECAP_H__
using namespace std;
class SneezeCap {
private:
public:
	void Take() const {
		cout << "재채기가 멎습니다." << endl;
	}
};
#endif
```

```cpp
 //SnuffleCap.h
#include <iostream>
#ifndef __SNUFFLECAP_H__
#define __SNUFFLECAP_H__
using namespace std;
class SnuffleCap {
private:
public:

	void Take() const {
		cout << "코가 뻥 뚤립니다." << endl;
	}
};
#endif
```

```cpp
 //main.cpp
#include <iostream>
#include "Coldpatient.h"
#include "RunnyNoseCap.h"
#include "SneezeCap.h"
#include "SnuffleCap.h"
extern void CodeDivideTest(void);
int main(void) {
	ColdPatient patient;
	RunnyNoseCap Rcap;
	SneezeCap Scap;
	SnuffleCap SnCap;
	patient.TakeRunnyNoseCap(Rcap);
	patient.TakeSneezeCap(Scap);
	patient.TakeSnuffleCap(SnCap); //두 개의 cpp 파일을 사용하는 것을 연습 하기 위함
	CodeDivideTest();
	return 0;
}
 //secondCppCode.cpp
//두 개의 cpp 파일을 사용하는 것을 연습 하기 위함
#include <iostream>
using namespace std;
void CodeDivideTest(void) {
	cout << "123" << endl;
}
```

```cpp
 출력 : 

콧물이 멈춥니다.

재채기가 멎습니다.

코가 뻥 뚤립니다.

123

C:\Users\maker\source\repos\Encapsulation\Debug\Encapsulation.exe(19308 프로세스)이(가) 0 코드로 인해 종료되었습니다.

이 창을 닫으려면 아무 키나 누르세요.
```

```cpp
//너무 길고 복잡하다.
    RunnyNoseCap Rcap;
	SneezeCap Scap;
	SnuffleCap SnCap;
	patient.TakeRunnyNoseCap(Rcap);
	patient.TakeSneezeCap(Scap);
	patient.TakeSnuffleCap(SnCap);
```
 위의 코드는 약을 먹는 과정이 번거롭고 꼭 정해진 순서대로 콧물/재채기/코막힘 약을 먹어야하는 불편함이 있다.

​

아래와 같이 간단하게 만들 수 있다.

```cpp
//main.cpp
#include <iostream>
#include "Coldpatient.h"
#include "ColdPill.h"
extern void CodeDivideTest(void);
int main(void) {
	ColdPatient patient;
	ColdPill pill;
	patient.TakePill(pill);
	//두 개의 cpp 파일을 사용하는 것을 연습 하기 위함
	CodeDivideTest();
	return 0;
}
```

```cpp
 //SnuffleCap.h
#include <iostream>
#ifndef __SNUFFLECAP_H__
#define __SNUFFLECAP_H__
using namespace std;
class SnuffleCap {
private:
public:

	void Take() const {
		cout << "코가 뻥 뚤립니다." << endl;
	}
};
#endif
```

```cpp
 //RunnyNoseCap.h
#include <iostream>
#ifndef __RUNNYNOSECAP_H__
#define __RUNNYNOSECAP_H__
using namespace std;
class RunnyNoseCap {

private:
public:
	void Take() const {
		cout << "콧물이 멈춥니다." << endl;
	}
};
#endif
```

```cpp
 //sneezeCap.h
#include <iostream>
#ifndef __SNEEZECAP_H__
#define __SNEEZECAP_H__
using namespace std;
class SneezeCap {
private:
public:
	void Take() const {
		cout << "재채기가 멎습니다." << endl;
	}
};
#endif
```

```cpp
 //Coldpatient.h
#include <iostream>
#ifndef __COLDPATIENT_H__
#define __COLDPATIENT_H__
#include "ColdPill.h"
using namespace std;
class ColdPatient {
private :
public:
	void TakePill(const ColdPill &pill) {
		pill.Take();
	}
};
#endif
```

```cpp
 //ColdPill.h
#include <iostream>
#ifndef __COLDPILL_H__
#define __COLDPILL_H__
#include "RunnyNoseCap.h"
#include "SneezeCap.h"
#include "SnuffleCap.h"
class ColdPill {
private:
	RunnyNoseCap Rcap;
	SneezeCap Scap;
	SnuffleCap SnCap;
public:
	void Take(void) const {
		Rcap.Take();
		Scap.Take();
		SnCap.Take();
	}
};
#endif
```

1. ColdPill class를 따로 만들어서 Take() 함수 하나로 세 개의 약을 먹는 효과를 나타내었다.
2. ColdPatient는 세 개의 약을 먹는 순서를 신경쓰지 않고 약을 먹는 행위만을 하면 되도록 바뀌었다.
3. 비록 ColdPill이라는 class가 하나 추가되었지만 patient 입장에서는 3개의 Cap class를 알아야했다가, CodlPill class만 알면 되는 것으로 코드가 변경되었다.
4. main.cpp부분에서 inclue문도 아래와 같이 두 줄로 변경되었다.

```cpp
#include "Coldpatient.h"
#include "ColdPill.h"
```

## 정보은닉과 캡슐화의 차이점 

정보은닉은 제한된 방법으로의 접근만 데이터 접근을 허용해서 잘못된 값이 저장되지 않도록 돕는 개념이다. private와 public을 잘 구분해서 사용하면 된다.

캡슐화는 현실 상황을 반영하는 개념이다. 감기환자가 항상 특정한 증상을 동반한다면 Coldpill은 해당하는 증상을 치료하는 기능을 담도록 설정해야 한다. (종합감기약) 하지만 감기 환자가 특정 증상 하나 만을 나타낸다면 해당 증상만을 위한 약을 먹어야하는 것이다. 그래서 캡슐화에는 정답이 없고, 상황을 잘 판단해서 코드 아키텍쳐를 짜야한다.  