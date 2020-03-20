---
title: "[C++] 기본 Syntax 3 "
excerpt: "포인터와 참조자, const int &num을 왜 쓰는가?"
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

## C 언어 복습

1. const int num = 10;                     //변수 num 상수화

```c
const int num1 = 10;
num1 = 20; //const 선언으로 인해 불가능!
```

2. const int * ptr1 = &val1;             //포인터 ptr1이 가리키는 데이터를 상수화

```c
#include<iostream>
int main(void) {
	
	int num1 = 10;
	const int * ptr1 = &num1;
	std::cout << num1 << std::endl; //10
	
	num1 = 20;
	std::cout << num1 << std::endl; //20, num1은 변경 가능
	std::cout << *ptr1 << std::endl;//20

	*(&num1) = 30;                  //num1은 변경 가능
	std::cout << num1 << std::endl; //30
	//*ptr1 = 40;                   //ptr1이 가리키는 데이터는 변경 불가능

    int num2 = 100;
	ptr1 = &num2;                   //ptr2가 가리키는 데이터 자체를 변경시키는 것은 가능하나, 
	std::cout << *ptr1 << std::endl;
	//*ptr1 = 10000;                //ptr1이 가리키는 값을 ptr1를 사용해서 변경은 불가능
	return 0;
}
```

3. int * const ptr2 = &val2;             //포인터 ptr2가 상수화됨

```c
#include<iostream>
int main(void) {
	
	int num1 = 10;
	int * const  ptr1 = &num1;
	
	std::cout << *ptr1 << std::endl;

	int num2 = 20;
	//ptr1 = &num2;  //불가능
	std::cout << *ptr1 << std::endl;

	return 0;
}
```

4. const int * const ptr3 = &val3;  //포인터 ptr3가 상수화 되었으며, ptr3를 사용해서 val3의 값을 변경할 수 없음.

​

## 프로그램의 메모리 공간

1. code : 코드가 저장되는 부분
2. 데이터 : 전역변수가 저장되는 영역
3. 스택 : 지역변수 및 매개변수가 저장되는 영역
4. 힙 :malloc 함수 호출에 의해 프로그램이 실행되는 과정에서 동적으로 할당이 이뤄지는 영역
5. malloc & free : malloc 함수 호출에 의해 할당된 heap 메모리 공간은 free 함수호출을 통해서 소멸하지 않으면 해제되지 않는다.

## bool 형식을 지원

```cpp
#include<iostream>

#define TURE 1
#define FALSE 0

int main(void) {
	
	while (TURE) {
		break;
	}

	while (true) {
		break;
	}
	return 0;
}
```
1. true와 false는 각각 1과 0이 아니다. 이 둘을 출력하거나 정수의 형태로 형 변환을 할 때는 1, 0으로 변환되도록 정의가 되어있는 것이다.
2. true와 false는 각각 1바이트 크기의 데이터일 뿐이다.

## 자료형 bool

```cpp
#include<iostream>

bool isPositive(int num) {
	if (num > 0) {
		return true;
	}
	else {
		return false;
	}
}

int main (void){

	bool isBool = true;

	isBool = isPositive(-1);
	std::cout << isBool << std::endl;
	return 0;
}
```

## Reference, 참조자

1. 변수란? 할당된 메모리 공간에 붙혀진 이름. 그 이름을 통해서 해당 메모리 공간에 접근이 가능하다.
2. 할당된 메모리 공간에 또 다른 이름을 붙히는 것을 reference라고 하고 & 연산자를 사용한다.

```cpp
int num1 = 2018;
int &num2 = num1;
```

1. &연산자를 변수의 주소 값을 반환하는 역할을 하기도 하고
2. 새로 선언되는 변수의 이름 앞에 적으면, 이는 참조자의 선언을 뜻한다.
3. 참조자는 선언과 동시에 초기화를 해야한다.

```cpp
int num1 = 2018;
int * ptr = &num1;
int &nunm2= num1;
```

1. 변수 num1의 주소 값을 반환해서 포인터 ptr에 저장해라.
2. 변수 num1에 대한 참조자 num2를 선언해라.

```cpp
int num = 2018;
int * ptr = &num;
std::cout<< *ptr <<std::endl; //2018
*ptr -= 8;
std::cout<< num <<std::endl; //2010
int &num2 = num;
num2 -= 10;
std::cout<< num <<std::endl; //2000
```

1. C++에서 포인터와 참조자의 역할을 많은 차이가 있지는 않지만 그래도 pointer와 reference라는 이름으로 구분하자.

## 포인터의 참조자 

```cpp
#include<iostream>
int main (void){
	int num = 10;
	int * ptr = &num;
	int **dptr = &ptr;

	int &rNum = num;
	int *(&Rptr) = ptr;                 
	int **(&Rdptr) = dptr;

	std::cout << rNum << std::endl;
	std::cout << *Rptr<< std::endl;
	std::cout << **Rdptr << std::endl;
	return 0;
}
```

 1. int *(&Rptr) = ptr; 에서 int*는 ptr과 같은 int*형 type임을 의미하고, &Rptr은 Rptr이라는 ptr를 가리키는 reference를 설정한다는 의미이다.

​

## 참조자를 사용하는 이유 : 함수

우선 Call-by-value , Call-by-reference를 다시 상기해보자.

```cpp
int * SimepleFunc(int * ptr){
 ...
}
```

1. 위 의 함수는 함수의 내용에 따라서 Call-by-value/reference 둘 다 될 수 있다.

```cpp
//Call-by-value형태
int * SimepleFunc(int * ptr){
    return ptr+1;
}
```
```cpp
 //Call-by-reference 형태
int * SimpleFunc(int *ptr){
    if(ptr == NULL){
        return NULL;
    }
    *ptr = 20;
    return ptr;
}
```

1. 본래 C언어에서의 Call-by-reference는  '주소 값을 전달 받아서, 함수 외부에 선언된 변수에 접근하는 형태의 함수 호출'을 의미한다.
2. 즉, 주소 값이 외부 변수의 참조 도구로 사용되는 함수의 호출을 뜻한다. 주소 값이 전달되었다는 사실이 중요한 것이 아니라 주소 값이 참조의 도구로 사용되었다는 사실이 중요한 것이다. 이 내용을  주소 값을 이용한 Call-by-reference라고 하기도 하고 Call-by-address라고 하기도 한다.

## 참조자를 이용한 Call-by-reference

```cpp
#include<iostream>
using namespace std;
void SwapByRef2(int &ref1, int &ref2) {
	int temp = ref1;
	ref1 = ref2;
	ref2 = temp;

}

int main(void) {
	int val1 = 10;
	int val2 = 20;
	SwapByRef2(val1, val2);
	cout << val1 << ' ' << val2 << endl;
	return 0;
}
```
1. 주소값을 이용한 Call-by-reference로도, 참조자를 이용한 Call-by-reference로도 Swap 함수를 구현할 수 있다.


## 참조자를 이용한 Call-by-reference의 단점과, const를 사용한 보완-

```cpp
#include<iostream>
using namespace std;
void SimpleFunc(int &num) {
	num += 1;
}
int main(void) {
	int num = 10;
	SimpleFunc(num);
	cout << num << endl;
	return 0;
}
```

1. C++에서는 함수의 인자로 주소값이 전달되지 않은 경우라도 참조자를 사용해서 데이터의 값이 변할 수 있다.
2. 이것은 제 3자가 코드를 이해하기 위해서 함수의 내용에서 값이 변경되는 부분이 있는지 점검을 해봐야하는 불편함을 가져온다.

## const를 이용한 보완

```cpp
void SimpleFunc(const int &num) {
	num += 1;
}
```

1. 위와 같이 const 선언을 하면 참조자 ref를 통한 값의 변경이 없는 것을 함수의 내용을 직접적으로 보지 않아도 알 수 있다.
2. 인자로 int num을 받는 것과 const int &num을 받는 것은 엄연히 다르다. 데이터를 복사해서 가져오는 것과 외부의 변수에 접근을 하지만 그  데이터의 내용을 바꾸지 않는 것은 주소값에 접근할 수 있는지의 유무 등 확연한 차이를 보인다.

## Reference 형 반환값 

```cpp
//기본형
#include<iostream>
int SimpleFunc(int num) {
	num++;
	return num;
}
int main(void) {
	int num = 10;
	int num2 = SimpleFunc(num);
	std::cout << num << std::endl;   //10
	std::cout << num2 << std::endl;  //11
	return 0;
}

num2에는 num과 완전히 다른 값이 저장되어 있다. 

```cpp
//참조형으로 전달받아서 참조형을 반환
#include<iostream>

int& SimpleFunc(int &num) {
	num++;
	return num;
}

int main(void) {
	int num = 10;
	int &num2 = SimpleFunc(num);
	std::cout << num << std::endl;   //11
	std::cout << num2 << std::endl;   //11
	return 0;
}
```

num2는 num의 참조자이다.   

```cpp
//참조형의 초기화를 기본자료형으로 할 때
#include<iostream>
int SimpleFunc(int &num) {
	num++;
	return num;
}
int main(void) {
	int num = 10;
	int &num2 = SimpleFunc(num);  //Error!
	std::cout << num << std::endl;
	std::cout << num2 << std::endl;
	return 0;
}
```

참조자를 선언하고 바로 초기화를 해야하는데 초기화하는 대상이 int형 데이터이므로 에러가 발생한다.  

## 잘못된 참조자 반환

```cpp
int& SimpleFunc(int n){
    int num = 10;
    num += n;
    reteurn num;
}

int main (void){
    int val = 10;
    int &rNum = SimpleFunc(val);
    return 0;
}
```

1. SimpleFunc에서 지역변수로 선언된 num에 대한 참조자 rNum을 main에서 선언하고 있다.
2. 지역변수는 함수가 종료되면 소멸되므로 rNum이 가리키는 값이 소멸된다. 이 경우 에러도 뜨지 않고 위험한 상황이 된다.

## const와 참조자의 혼용 

```cpp
const int num = 20;
int &rNum = num;
rNum = 40; //Error
```

상수로 선언된 num을  참조자 rNum을 사용해서 변경하려고 할 때 에러가 발생한다.  

```cpp
const int num = 20;
const int &rNum = num;
```

따라서 상수화된 변수에 대한 참조자 선언은 const선언을 해주어야 한다.  

## const 상수 참조자 

```cpp
int num = 20+30;
```

1. 20과 30은 프로그램 상에서 표현되는  숫자이다. literal 또는 literal constant라 한다.
2. 이 리터럴 값들은 임시적으로 존재하는 값으로, 다음 행으로 넘어가면 존재하지 않는 상수이다.
3. 리터럴 값들이 연산되기 위해서는 메모리에 저장이 되어야하긴 하지만 다음 행으로 넘어가면 메모리에서 소멸된다고 보자.

```cpp
const int &ref = 30;
```

1. c++에서는 숫자 30이 메모리 공간에 계속 남아있어 참조할 수 있도록, const참조자로 상수를 참조할 때 임시 변수라는 것을 만든다.
2. 그리고 이 장소에 상수 30을 저장하고 참조자가 이 공간을 참조하게 만든다.

## const 상수 참조자, 왜 사용하는가?

```cpp
int Adder(const int &num1, const int &num2){
    return num1+num2;
}
```

1. 참조자 num1과 num2를 사용해서 해당 데이터의 값을 변경하지 않을 것을 알리기 위해 const를 명시하였다. 그리고
2. main 에서 Adder(3,4)와 같이 변수가 아닌 상수값을 전달해도 원하는 형태의 출력이 나오도록 하기 위해서 사용한다.
3. Adder(3,4)를 하기 위해서 굳이 변수를 지정하지 않아도 된다.

## malloc과 free를 대신하는 new 와 delete

```c
#include <iostream>
#include <string.h>
#include <stdlib.h>

using namespace std;
char* MakeStreAdr(int len) {
	char* str = (char*)malloc(sizeof(char)*len);
	return str;
}
int main(void) {
	char* str = MakeStreAdr(20);
	strcpy_s(str, 20, "I am happy");
	cout << str << endl;
	free(str);
	return 0;
}
```

1. 할당 대상의 정보를 무조건 바이트 크기 단위로 전달해야 한다.
2. 반환형이 void형 포인터이기 떄문에 적절한 형 변환을 거쳐야 한다.

```cpp
int * ptr1 = new int;
double* ptr2 = new double;
int* arr1 = new int[3];
double* arr2 = new double[7];

delete ptr1;
delete ptr2;
delete []arr1;
delete []arr2;
```

1. malloc과 free보다 더 간단하게 동적할당을 할 수 있는 new와 delete.
2. C++에서는 new와 delete만 사용하도록 한다. malloc을 사용하면 C++에서의 생성자를 사용하지 않는 등 좀 문제가 있다.  

> int num = 10;
> int &numRef = num;
> int * intPtr = new int;
> int &ptr = *intPtr; //int &numRef = num;과 비교
> ptr = 20;
> // int * &ptr = intPtr; 잘못된 문장
> std::cout<< ptr << std::endl;

1. Reference를 사용해서 참조자를 선언할 때  = 의 오른쪽에는 변수 역할을 하는 대상이 온다. 따라서 *연산을 붙힌다.
2. intPtr만 적으면 주소값만을 의미하기 때문에, 데이터를 표현하기 위해 *를 붙히는 것이다.

​
## C++에서 C의 표준 함수 호출하기

```cpp
#include <stdio.h>  -> #include <cstdio>
#include <string.h> -> #include <cstring>
```
c를 더하고 .h를 빼면 된다.  

```c
//C에서 정의된 표준 라이브러리 abs 함수
int abs(int num);
```

```cpp
//C++에서 정의된 abs 함수 (오버로딩)
long abs(long num);
float abs(float num);
double abs(double num);
long double abd(long double num);
```

이와 같이 C에서 정의된 함수를 쓸 수 있지만 C++에서 정의된 함수와 완전히 일치하지 않을 수 있으니 C++에서 정의된 함수를 사용하도록 하자.  

## 구조체 

1. C에서는 구조체를 선언할 때 다음과 같이 작성한다.
  - struct Car basicCar;
2. struct는 이어서 선언되는 자료형이 구조체를 기반으로 정의된 자료형임을 나타내고,struct를 생략하기 위해서는 typedef를 사용해야한다.
3. C++에서는 기본 자료형의 선언 방식이나 구조체를 기반으로 정의된 자료형의 변수 선언 방식에서 차이가 없다.
4. 즉, 별도의 typedef 선언 없이도 다음과 같이 변수를 선언할 수 있다.

```cpp
Car basicCar;
```

```cpp
#include <iostream>

using namespace std;

#define ID_LEN 20
#define MAX_SPD 200
#define FUEL_STEP 2
#define ACC_STEP 10
#define BRK_STEP 10


struct Car {
	char gamerId[ID_LEN];
	int fuelGauge;
	int curSpeed;
};

void ShowCarState(const Car &car) {
	cout << car.gamerId << endl;
	cout << car.curSpeed << endl;
	cout << car.fuelGauge << endl;
}

void Accel(Car &car) {
	if (car.fuelGauge <= 0) {
		return;
	}
	else {
		car.fuelGauge -= FUEL_STEP;
	}

	if (car.curSpeed + ACC_STEP >= MAX_SPD) {
		car.curSpeed = MAX_SPD;
		return;
	}
	car.curSpeed += ACC_STEP;
}

int main(void) {
	Car run99 = { "run99", 100, 0 };
	Accel(run99);
	Accel(run99);
	ShowCarState(run99);

}
```

Accel 함수와 ShowCarState함수는 Car 구조체에 종속적이지만 전체 범위에서도 호출이 가능한 문제점이 있다. 따라서 종속적인  함수임을 더 잘 나타내기 위해서 car 구조체 안에 함수를 넣을 수 있다.

```cpp
//함수를 구조체에 넣은 형태
#include <iostream>

using namespace std;

#define ID_LEN 20
#define MAX_SPD 200
#define FUEL_STEP 2
#define ACC_STEP 10
#define BRK_STEP 10


struct Car {
	char gamerId[ID_LEN];
	int fuelGauge;
	int curSpeed;

	void ShowCarState() {
		cout <<gamerId << endl;
		cout << curSpeed << endl;
		cout << fuelGauge << endl;
	}

	void Accel() {
		if (fuelGauge <= 0) {
			return;
		}
		else {
			fuelGauge -= FUEL_STEP;
		}

		if (curSpeed + ACC_STEP >= MAX_SPD) {
			curSpeed = MAX_SPD;
			return;
		}
		curSpeed += ACC_STEP;
	}

};

int main(void) {
	Car run99 = { "run99", 100, 0 };
	run99.Accel();
	run99.Accel();
	run99.ShowCarState();

}
```

```cpp
 //사용자 정의 상수도 구조체에 넣은 형태

struct Car {
	enum {
		ID_LEN = 20,
		MAX_SPD = 200,
		FUEL_STEP = 2,
		ACC_STEP = 10,
		BRK_STEP = 10
	};
   ...
}
 //사용자 정의 상수를 namespace를 사용해서 구분한 형태
namespace carConstant{
	enum {
		ID_LEN = 20,
		MAX_SPD = 200,
		FUEL_STEP = 2,
		ACC_STEP = 10,
		BRK_STEP = 10
	};
}

struct Car{
  ...
};
 //함수의 선언만 구조체에 남겨서 구조체의 분석을 용이하게한 형태
struct Car {
	enum {
		ID_LEN = 20,
		MAX_SPD = 200,
		FUEL_STEP = 2,
		ACC_STEP = 10,
		BRK_STEP = 10
	};
	char gamerId[ID_LEN];
	int fuelGauge;
	int curSpeed;
	
	void ShowCarState();
	void Accel();

};

void Car::ShowCarState() {
	...
}

void Car::Accel() {
    ...
}
```


## class 클래스

앞서 설명한 구조체에서 struct를 class로만 바꾸면 class의  선언이 된다.  

```cpp
struct Car {
	enum {
		ID_LEN = 20,
		MAX_SPD = 200,
		FUEL_STEP = 2,
		ACC_STEP = 10,
		BRK_STEP = 10
	};
	char gamerId[ID_LEN];
	int fuelGauge;
	int curSpeed;
	
	void ShowCarState();
	void Accel();

};

void Car::ShowCarState() {
	...
}

void Car::Accel() {
    ...
}

int main (void){
    Car myCar = {"nane",100,10}; //Error!!
   ...
}
```

1. struct를 class로 바꾸면 Car myCar = {"nane",100,10}; 와 같은 형태로 구조체 변수를 선언할 수 없다.
2. 이유는 클래스 내에 선언된 함수가 아닌, 다른 영역에서 변수를 초기화 하려 했기 때문이다. 클래스는 기본적으로 별도의 선언을 하지 않으면, 클래스 내에 선언되 변수는 클래스 내에 선언된 함수에서만 접근이 가능하다. 따라서 다음과 같은 형태로 클래스 변수를 선언해야 한다.

```cpp
Car myCar;
```

```cpp
strcpy(myCar.gamerID, "name");          //Error
myCar.fuelGuage = 100;          //Error
myCar.curSpeed = 0;            //Error
```
1. 위와 같은 형태의 초기화는 불가능하다.
2.  클래스 내에 선언되 변수는 클래스 내에 선언된 함수에서만 접근이 가능하기 때문이다.


## 접근제어 지시자

기억하자. 

1. public : 어디서든 접근 가능
2. protected  : 상속 관계에 놓여있을 때, 유도 클래스에서의 접근허용
3. private : 클래스 내에서만 접근 허용

> #include <iostream>
> #include <cstring>
> using namespace std;
> class Car {
> private : 	
> 	enum {
> 		ID_LEN = 20,
> 		MAX_SPD = 200,
> 		FUEL_STEP = 2,
> 		ACC_STEP = 10,
> 		BRK_STEP = 10
> 	};
> 	char gamerId[ID_LEN];
> 	int fuelGauge;
> 	int curSpeed;
> public :
> 	void InitMemvers(const char* ID, int fuel);
> 	void ShowCarState();
> 	void Accel();
> }; 
> void Car::ShowCarState() {
> 	cout << gamerId << endl;
> 	cout << curSpeed << endl;
> 	cout << fuelGauge << endl;
> }
> void Car::Accel() {
> 	if (fuelGauge <= 0) {
> 		return;
> 	}
> 	else {
> 		fuelGauge -= FUEL_STEP;
> 	}
> 	if (curSpeed + ACC_STEP >= MAX_SPD) {
> 		curSpeed = MAX_SPD;
> 		return;
> 	}
> 	curSpeed += ACC_STEP;
> }
> void Car::InitMemvers(const char * ID, int fuel) {
> 	strcpy_s(gamerId, ID);
> 	fuelGauge = fuel;
> 	curSpeed = 0;
> }
> int main(void) {
> 	Car run99;
> 	run99.InitMemvers("nam2312e", 100);
> 	run99.Accel();
> 	run99.Accel();
> 	run99.ShowCarState();
> 
> }
> 

1. main에서는 public으로 선언된 InitMembers 함수에 접근이 가능하고, InitMembers 함수는 같은 class 내에 선언된 private 변수들에 접근이 가능하다. 따라서 main에서 InitMembers함수를 통해서 Car class의 변수들에 접근한다.
2. 키워드 struct를 이용해서 정의한 구조체에 선언된 변수와 함수에 별도의 접근제어 지시자를 선언하지 않으면, 모든 변수와 함수는 public으로 선언된다.
3. 키워드 class를 이용해서 정의한 클래스에 선언된 변수와 함수에 별도의 접근제어 지시자를 선언하지 않으면, 모든 변수와 함수는 private로 선언된다.
4. 앞으로는 class로 정의된 변수들을 객체라고 부른다.
5. class 객체 안에 선언된 변수들을 맴버 변수라고 하고, 함수들을 맴버 함수들이라고 한다.

## C++에서 파일 분할

```cpp
//Car.h에 작성한 class의 선언부
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
private : 	
	char gamerId[CAR_CONSTANT ::ID_LEN];
	int fuelGauge;
	int curSpeed;
public :
	void InitMemvers(const char* ID, int fuel);
	void ShowCarState();
	void Accel();
};
```

class car의 정의부에서 작성되는 내용에 대한 컴파일 에러의 기준이 되는 선언부  

```cpp
//Car.cpp에 작성한 class car의 정의부
void Car::ShowCarState() {
	cout << gamerId << endl;
	cout << curSpeed << endl;
	cout << fuelGauge << endl;
}

void Car::Accel() {
	if (fuelGauge <= 0) {
		return;
	}
	else {
		fuelGauge -= CAR_CONSTANT ::FUEL_STEP;
	}

	if (curSpeed + CAR_CONSTANT ::ACC_STEP >= CAR_CONSTANT ::MAX_SPD) {
		curSpeed = CAR_CONSTANT ::MAX_SPD;
		return;
	}
	curSpeed += CAR_CONSTANT ::ACC_STEP;
}

void Car::InitMemvers(const char * ID, int fuel) {
	strcpy_s(gamerId, ID);
	fuelGauge = fuel;
	curSpeed = 0;
}
int main(void) {
	Car run99;
	run99.InitMemvers("nam2312e", 100);
	run99.Accel();
	run99.Accel();
	run99.ShowCarState();

}
```
1. 클래스의 정의에 해당하는 위 함수의 정의는 다른 문장의 컴파일에 필요한 정보를 가지고 있지 않다. 이 함수의 정의들은 컴파일 된 이후에, 링커에 의해 하나의 실행파일로 묶이기만 하면 된다.
2. 선언부와 정의부의 차이를 다시 한 번 확인하자.

## inline 함수는 헤더파일에 넣는다.

```cpp

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
 //main.cpp
#include "Car.h"

int main(void) {
	Car run99;
	run99.InitMemvers("nam2312e", 100);
	run99.Accel();
	run99.Accel();
	run99.ShowCarState();

}

```

1. 위와 같이 inline 함수를 cpp파일에 넣으면  main.cpp에서 에러가 난다. 
2. 컴파일러는 파일 단위로 컴파일을 한다.
3. $#include 문은 해당 파일의 내용을 그 위치에 복사하는 역할을 한다$
4. inline 함수는 해당 함수가 호출된 곳에서 함수의 몸체로 대체되어야하는데  car.cpp에서 inline으로 만들어 버리면 main.cpp에서 inline 함수를 찾을 수 없다.
5. 따라서 inline 함수는 header 파일에 넣어야 한다.