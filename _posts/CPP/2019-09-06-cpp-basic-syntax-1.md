---
title: "[C++] 기본 Syntax 1 "
excerpt: "출력부터 namespace까지"
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

## 출력 

```cpp
# include <iostream>

int main(void) {
	int num = 20;
	std::cout << "hello" << std::endl;  //문자열 출력
	std::cout << num << std::endl; //변수 출력
	std::cout << "hello" << " " << num << std::endl; // 문자열, 변수 동시 출력
	std::cout << "Without" << std::endl;
	return 0;
}
```

1. C++도 헤더파일의 확장자는 C언어와 마찬가지로 .h이다. 그러나 프로그래머가 정의하는 헤더파일의 선언이 아닌, 표준 헤더파일의 선언에서는 확장자를 생략하기도 약속했다.
2. C의 printf와 달리 %d, %s와 같은 서식문자를 이용해서 별도의 출력포맷을 지정하지 않아도 데이터의 성격에 따라 적절한 출력이 이루어진다.
3. << 연산자를 사용해서 출력대상 여러개를 열거할 수 있다.
4. << 연산자를 이용한 std::endl의 출력은 개행으로 이어진다.

## 출력 2

```
C:\Users\maker\source\repos\Chapter1\Debug\Chapter1.exe(768 프로세스)이(가) 0 코드로 인해 종료되었습니다.
```
0코드로 인해 종료되었슴을 알리는 라인은 정상적으로 종료되었음을 알려준다. 0 코드가 아닌 경우 디버깅에 도움을 줄 수 있다.  

## 입력

```cpp
# include <iostream>

int main(void) {
	int val1;
	std::cout << "첫 번째 숫자입력: ";
	std::cin >> val1;

	int val2;
	std::cout << "두 번째 숫자입력: ";
	std::cin >> val2;

	int result = val1 + val2;
	std::cout << "덧셈 결과 :" << result << std::endl;
	return 0;
}
```

1. 변수의 선언은 어디서든 가능하다. C++의 모든 컴파일러는 지역변수이 선언 위치에 제한을 두지 않는다.
2. std::cout <<과 달리 std::cin >>.  <<와 >>의 방향에 주목하자.
3. 데이터 입력도 출력과 마찬가지로 별도의 포맷지정이 필요없다.


## 문자열 입력/출력

```cpp
# include <iostream>

int main(void) {
	char str[100];
	std::cin >> str;

	std::cout << str << std::endl;
	return 0;
}
```

## 여러 개의 변수 동시 입력

```cpp
# include <iostream>

int main(void) {
	int val1, val2;

	std::cin >> val1 >> val2;
	int result = 0;
	for (int idx = 0; idx < 2; idx++) {
		result += val1;
		result += val2;
	}
	std::cout << result << std::endl;
	return 0;

}
```

1. 지역변수를 어디서든 선언할 수 있어서 int idx와 같이 for문 안에서도 변수의 선언이 가능하다.


## 함수 오버로딩

```cpp
# include <iostream>

int MyFunc(int num1) {
	num1++;
	return num1;
}

int MyFunc(int num1, int num2) {
	num1++;
	num2++;
	return num1 + num2;

}

int main(void) {
	
	std::cout << MyFunc(10) << std::endl;
	std::cout << MyFunc(10,20) << std::endl;
	return 0;

}
```

1. 함수호출 시 전달되는 인자를 통해서 호출하고자 하는 함수이 구분이 가능하기 때문에 매개변수의 선언형태가 다르다면, 동일한 이름의 함수 정의를 허용할 수 있다. 이것을 Function Overloading이라고 한다.
2. 같은 이름을 가지고 있는  두 함수의 parameter의 갯수가 1개로 같아도 두 param의 타입이 다르다면 오버로딩이 가능하다.
3. 같은 이름을 가지고 있는 두 함수의 parameter의 반환형만 다른 경우는 오버로딩이 불가능하다. 함수를 호출할 때 함수의 이름과 parameter로 함수를 찾기 때문이다.

## prameter default value

```cpp
# include <iostream>

int MyFunc(int num1=300, int num2=10) {
	num1++;
	num2++;
	return num1 + num2;

}

int main(void) {
	
	std::cout << MyFunc() << std::endl;    //312 출력
	std::cout << MyFunc(20) << std::endl;  //32출력
	return 0;

}
```

```cpp
int MyFunc(int num1, int num2, int num3=30) { ... }
int MyFunc(int num1, int num2=20, int num3=30) { ... }
int MyFunc(int num1=10, int num2=20, int num3=30) { ... }
``` 

1. 매개변수에 디폴트 값이 설정되어 있으면, 선언된 매개변수의 수보다 적은 수의 인자전달이 가능하다. 그리고 전달되는 인자는 왼쪽에서부터 채워져 나가고, 부족분은 디폴트 값으로 채워진다. 
2. 부분적으로 디폴트 값을 설정할 때는 반드시 오른쪽 매개변수의 디폴트 값부터 채우는 형태로 정의해야 한다. 이것은 함수에 전달되는 인자가 왼쪽부터 오른쪽으로 채워지기 때문이다.

## prameter default value2

```cpp
# include <iostream>

int MyFunc(int num1 = 300, int num2 = 10);

int main(void) {
	std::cout << MyFunc() << std::endl;    //312 출력
	std::cout << MyFunc(20) << std::endl;  //32출력
	return 0;
}

int MyFunc(int num1, int num2 ) {
	num1++;
	num2++;
	return num1 + num2;

}
```

1. 디폴트 값은 함수의 선언 부분에만 표현해야한다.  아래 함수의 정의 부분에서도 디폴트 값을 설정하면 에러가 난다.
​

## 매크로 함수

```cpp
# include <iostream>

#define SQUARE(x) ((x)*(x))
//#define SQUARE(x) ((x)*(x))
int main(void) {
	std::cout << SQUARE(5) << std::endl;
	return 0;
}
```

1. 장점 : 일반적인 함수에 비해서 실행속도의 이점이 있다.
2. 단점 : 정의하기가 어렵다. 복잡한 함수를 매크로의 헝태로 정의하는데 함계가 있다. 디버깅하기도 어렵다.
3. 위의 코드는 std::cout << ((5)*(5)) << std::endl; 와 같은 형태로 변경된다. 함수의 몸체부분이 함수의 호출문을 대체했다.
4. 위 예제와 같이 함수의 몸체부분이 함수호출 문장을 완전히 대체했을 때 '함수가 인라인화 되었다.'라고 표현한다.

​

## 인라인함수

```cpp
# include <iostream>
inline int SQUARE(int x) {
	return x * x;
}
int main(void) {	
	std::cout << SQUARE(5) << std::endl;
	return 0;
}
```

1. 장점 : 위에서 살펴본 매크로 함수의 장점(실행속도)는 유지하되 단점(정의하기 어려움)을 제거한 것이 인라인 함수이다.
  - 매크로 : 함수의 인라인화를 전처리기에서 처리
  - inline : 함수의 인라인화를 컴파일러에 의해서 처리. 컴파일러는 함수의 인라인화가 오히려 성능에 해가 된다고 판단할 경우, 이 키워드를 무시하기도 한다. 또한 컴파일러는 필요한 경우 일부 함수를 임의로 인라인 처리하기도 한다.
2. 단점 : 매크로에서는 전달되는 인자의 type이 상관없었지만, inline에서는 param의 type을 정의해야한다. 이 부분은 Template로 보완이 가능하다.

​

## 템플릿 

부족한 부분은 뒤에서 다시 다루겠습니다. 

```cpp

# include <iostream>
template <typename T>
inline T SUQARE(T x){
	return x * x;
}
int main(void) {
	std::cout << SUQARE(5.5) << std::endl;
	std::cout << SUQARE(12) << std::endl;
	return 0;
}
```

## namespace

프로젝트를 진행하기 전에 함수 및 변수의 이름을 모두 정해서 이름 충돌이 발생하지 않게 할 수 있지만 근복적인 해결책이 되진 않는다.

```cpp
# include <iostream>
namespace BestComImpl {
	void SimpleFunc(void) {
		std::cout << "BestCom이 정의한 함수" << std::endl;
	}
}

namespace ProgComImpl {
	void SimpleFunc(void) {
		std::cout << "Procom이 정의한 함수" << std::endl;
	}
}


int main(void) {
	BestComImpl::SimpleFunc();
	ProgComImpl::SimpleFunc();
	return 0;
}

```

'::' 을 가리쳐 범위지정 연산자(scope resolution operator)라 하며, 그 이름이 의미하듯 이름공간을 지정할 때 사용하는 연산자이다.  

```cpp
#include <iostream>

namespace BestComImpl {
	void SimpleFunc(void);
	void SecondFunc(void);
}
namespace ProgComImpl {
	void SimpleFunc(void);

}


int main(void) {
	BestComImpl::SimpleFunc();
	ProgComImpl::SimpleFunc();
	return 0;
}

void BestComImpl::SimpleFunc(void) {
	std::cout << "BestCom이 정의한 함수" << std::endl;
	SecondFunc();

}

void BestComImpl::SecondFunc(void) {
	std::cout << "BestCom이 정의한 Second 함수" << std::endl;
}


void ProgComImpl::SimpleFunc(void) {
	std::cout << "Procom이 정의한 함수" << std::endl;
}
```

1. 일반적으로 사용하는 방법처럼 함수의 선언과 함수의 정의부분을 분리하였다.  헤더파일 및 파일 분할 방법
2. 동일한 네임스페이스의 경우 다시 명시할 필요가 없다.  BestComImpl::SimpleFunc에서는  SecondFunc()로만 함수를 호출해줄 수 있다.

​

## namespace의 중첩

```cpp

# include <iostream>
namespace parent {
	namespace child {
		void SimpleFunc();
	}
}

int main(void) {
	parent::child::SimpleFunc();
	return 0;
}

void parent::child::SimpleFunc(void) {
	std::cout << "123" << std::endl;
}

​```  

## using namespace 

```cpp
# include <iostream>

namespace parent {
	namespace child {
		int num = 10;
		void SimpleFunc();
	}
}


int main(void) {
	using namespace parent;
	child::SimpleFunc();
	std::cout << child::num << std::endl;

	using namespace parent::child;
	SimpleFunc();
	std::cout << num << std::endl;
	return 0;
}

void parent::child::SimpleFunc(void) {
	std::cout << "123" << std::endl;

}
```

1. using namespace를 사용하면 해당 **지역 공간에서의 namespace를 설정할 수 있다.** 이렇게하면 '이름공간 std에 선언된 모든 것에 대해 이름공간 지정의 생략'을 명령할 수 있다.
2. 전체 파일에서 namespace를 지정하려면 전역변수를 선언하는 위치에 using namespace std와 같이 추가하면 된다.

​
## namespace의 별칭

```cpp
#include<iostream>
#include "header.h"

namespace AAA {
	namespace BBB {
		namespace CCC {
			int num1;
		}
	}
}

int main(void) {
	AAA::BBB::CCC::num1 = 10;
	using namespace std;
	cout << AAA::BBB::CCC::num1 << endl;
	namespace ABC = AAA::BBB::CCC;
	cout << ABC::num1 << endl;

	return 0;
}

```

## :: 범위지정 연산자의 또 다른 기능-

```cpp

#include<iostream>
int num1 = 10;
int main(void) {
	int num1 = 100;
	num1 += 10;   //지역변수 num1의 값 증가
	::num1 += 10; //전역변수 num1의 값 증가
	using namespace std;
	cout << num1 << "   " << ::num1 << endl;
	return 0;
}
```

