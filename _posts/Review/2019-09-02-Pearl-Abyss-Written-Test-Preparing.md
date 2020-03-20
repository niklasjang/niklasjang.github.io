---
title: "[필기TEST] 펄어비스 게임플레이 프로그래머"
excerpt: "직무 관련 필기 TEST, 준비해볼까"
date: 2019-09-02
categories:
  - Review
tags:
  - Job-Apply

toc : false
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 일정

9월 6일 안양에서 3시간 내외로 직무 관련 필기 TEST를 진행하게 되었다.  직무 관련 필기 면접 2시간, 인성 필기 면접 1시간이다. 후자는 좀 많은 문제를 의식의 흐름따라 쭉 체크하면 될 것으로 생각된다. 한 번도 준비해본 적이 없는 필기 면접, 제대로 준비해보자.

## 정렬

### 삽입정렬

```cpp
#include <cstdio>
#define MAX 5

void insert_sort(int arr[]) {
	int i = 0, j = 0;
	for (i = 1; i < MAX; i++) {
		int key = arr[i];
		for (j = i - 1; j >= 0 && arr[j] > key; j--) {
			arr[j + 1] = arr[j];
		}
		arr[j+1] = key;
	}
}

int main(void) {
	int arr[MAX] = { 5,4,3,2,1 };
	insert_sort(arr);
	for (int i = 0; i < MAX; i++) {
		printf("%d ", arr[i]);
	}
	return 0;
}
```

## 개념

### 프로그램

- 어떤 작업을 위해 실행할 수 있는 파일

### 프로세스 
- 컴퓨터에서 연속적으로 실행되고 있는 컴퓨터 프로그램
- 메모리에 올라와 실행되고 있는 프로그램의 인스턴스(독립적인 개체) 
- 운영체제로부터 `시스템 자원`을 할당받는 작업의 단위
- 즉, 독적인 개념으로는 실행된 프로그램을 의미한다.
- `시스템 자원` : CPU 시간, 메모리 주소 공간, `Code/Data/Stack/Heap`의 구조로 되어 있는 독립된 메모리 영역
  - `Code/Data/Stack/Heap` : 메모리 영역은 4가지로 구분된다.
    - Code Segment : 코드 자체를 구성하는 메모리 영역. 
    - Data Segment : 전역변수(Global)/정적변수(static)/배열/구조체 등 데이터가 저장되는 영역. `프로그램`이 실행 될 때 생성되고, `프로그램`이 종료될 때 반환된다. 함수 내부에서 선언된 static 변수는 프로그램 실행시 공간만 할당되고, 함수를 실행할 때 초기화 된다. 
    - Stack Segment : 지역변수(local)/매개변수(parameter)/리턴 값이 저장되는 영역. 프로그램이 자동으로 사용하는 임시메모리 영역. `함수` 호출 시 생성 / `함수`가 끝나면 반환. 
    - Heap Segment : 동적할당을 위해 malloc이나 new를 사용할 때 저장되는 영역
  - Heap overflow : heap이 커지다 stack을 침범하는 경우
  - Stack overflow : stack이 커지다 heap을 침범하는 경우
- 프로세스는 각각의 독립되 메모리 영역(Code/Data/Stack/Heap)을 할당받는다.
- 기본적으로 프로세스당 최소 1개의 Thread를 가지고 있다.
- 각 프로세스는 별도의 주소 공간에서 실행되며, 한 프로세스는 다른 프로세스의 변수나 자료 구조에 접근할 수 없다.
- 한 프로세스가 다른 프로세스의 자원에 접근하려면 프로세스간 통신(Inter-Process-Communication,IPC)를 사용해야한다.
- IPC의 방법으로는 Pipe, file, socket등을 이용한 통신이 있다.

### 쓰레드

- 프로세스 내에서 실행되는 여러 흐름의 단위
- 프로세스의 특정한 수행 경로
- 프로세스가 할당받은 자원을 이용하는 실행의 단위
- **쓰레드는 프로세스 내에서 각각 Stack만 따로 할당받고** Code/Data/Heap영역은 공유한다.
- 같은 프로세스 안에 있는 여러 쓰레드들은 같은 힙 공간을 공유한다. 반면에 프로세스는 다른 프로세스의 메모리에 직접 접근할 수 없다. 

### 멀티 프로세스 

- 의미 
  - 하나의 응용프로그램을 여러 개의 프로세스로 구성하여 각 프로세스가 하나의 작업을 처리하도록 하는 것

- 장점
  - 여러 개의 자식 프로세스 중 하나에 문제가 발생하면 그 자식 프로세스만 죽는 것 이상으로 영향이 확산되지 않는다.

- 단점
  - Context Switching에서의 오버헤드 : C/S의 과정에서 캐쉬 메모리 초기화 등 무거운 작업이 진행되고 많은 시간이 소모되는 등의 오버헤드가 발생하게 된다.
  - 프로세스는 각각의 독립도니 메모리 영역을 할당받기 때문에 프로세스 사이에 공유하는 메모리가 없어서, C/S가 발생하면 캐쉬에 있는 모든 데이터를 리셋하고 다시 캐쉬 정보를 불러와야 한다.
  - 서로 다른 프로세스 사이에서 자원을 접근하려면 어렵고 복잡한 Inter-Process-Communicatino, IPC를 사용해야 한다.
  - `Context Switching`? : CPU에서 여러 프로세스를 돌아가면서 작업을 처리하는데 이 과정을 C/S라고 부른다. 
  - 구체적으로, 동작 중인 프로세스가 대기를 하면서 해당 프로세스의 상태(Context)를 보관하고, 대기하고 있던 다음 순서의 프로세스가 동작하면서 이전에 보관했던 프로세스의 상태를 복구하는 작업을 말한다. 

### 멀티 쓰레드

- 의미
  - 하나의 응용프로그램을 여러 개의 쓰레드로 구성하고, 각 쓰레드로 하여금 하나의 작업을 처리하도록 하는 것이다. 
  - Window, Linux 등 많은 OS가 멀티 프로세싱을 지원하고 있지만, 멀티 쓰레딩을 기본으로 하고 있다.
  - `웹 서버`는 대표적인 멀티 쓰에드 응용 프로그램이다.

- 장점
  - 시스템 자원 소모 감소 (자원의 효율성 증대) : 여러 개의 쓰레드는 Stack만 따로 할당받고 Code/Data/Heap을 모두 공유하기 때문에 `시스템 콜`이 줄어들어 자원을 효율적으로 관리할 수 있다.
  - 시스템 처리량 증가 (처리 비용 감소) : 쓰레드 간 데이터를 주고 받는 것이 `IPC`를 사용하지 않아도 되서 간단해지고 자원 소모가 줄어들게 된다. 쓰레그 사이의 작업량이 작아 Context Switching이 더 빠르다. C/S를 진행할 때 멀티 프로세스는 Code/Data/Stack/Heap을 모두 저장했다가 복구해야하는 반면, Thread는 stack만 저장했다가 복구하면 되기 때문이다. 

- 단점
  - 설계하기가 어렵고 디버깅이 까다롭다.
  - 단일 프로세스 시스템의 경우 효과를 기대하기 어렵다.
  - 다른 프로세스에서 쓰레드를 제어할 수 없다. 즉, 프로세스 밖에서도 쓰레드 각각을 제어할 수 없다.
  - 멀티 쓰레드의 경우 자원 공유의 문제가 발생한다. (동기화 문제)
  - 하나의 쓰레드에 문제가 발생하면 전체 프로세스가 영향을 받는다.

### 멀티 프로세스 보다 멀티 쓰레드를 사용하는 이유

프로세스는 실행되고 있는 프로그램의 instance이기 때문에 멀티 쓰레드를 사용하면 여러 개의 프로그램 instance를 생성하지 않고 하나의 프로그램 안에서 여러 개의 작업을 진행할 수 있다. 

### Static? 

- Staic이란 `정적의`,`고정의`라는 뜻으로 생각하면 된다.
- 자료형에서의 Static
  - JAVA/C++ 등에서는 `int a = 1;`과 같이 데이터의 타입을 미리 결정해둔다. 이 처럼 데이터의 타입을 미리 결정해두는 것을 static하다고 표현한다.
  - 반면에 많은 script 언어들은 python의 `a = 1`또는 javascript의 `var a = 1`처럼 Dynamical Type Variable을 가진다. 
- 메모리에서의 Static
  - 자료형에서의 Static과 정확하게 구분되는 개념은 아니지만 기억하기 쉽게 나누었다.
  - `static public int a = 1;`와 같이 변수를 선언하면 변수가 저장되는 위치를 **메모리에 고정시켜 놓은 것이다.**
- static을 class에 적용해서 기억하면 왜, 어떤 경우에 static을 사용해야하는지 잘 기억할 수 있습ㄴ디ㅏ.
  - **클래스를 설계할 때, 멤버변수 중 모든 인스턴스에 공통적으로 사용해야하는 것에 static을 붙인다.** 인스턴스를 생성하면, 각 인스턴스들은 서로 독립적기 때문에 서로 다른 값을 유지한다. 경우에 따라서는 각 인스턴스들이 공통적으로 같은 값이 유지되어야 하는 경우 static을 붙인다.
  - static이 붙은 멤버변수는 인스턴스를 생성하지 않아도 사용할 수 있다.
  - static이 붙은 멤버변수(클래스변수)는 클래스가 메모리에 올라갈때 이미 자동적으로 생성되기 때문이다.
  - static이 붙은 메서드에서는 instance 변수를 사용할 수 없습니다. static은 instance의 생성없이 이미 메모리에 존재하는 데이터를 사용하기 때문에 static 안에서 instance를 사용하면 메모리의 사용이 불분명해지기 때문에 금지한다.
  - 반면에 instance method에서는 static method와 variable을 사용할 수 있다. 이미 메모리에 올라가있는 상태이기 때문이다. 
  - **즉, 메서드 내에서 인스턴스 변수를 사용하지 않는다면, static을 붙이는 것을 고려한다.**

```java
//static method 예제
public class StaticTest{
  static public int a = 1;
  public int b = 3;
  static public void add(){
    //생략
 }
}
```
- static 사용 예제

```java

class Card {
  String kind ;                           // 카드의 무늬 - 인스턴스 변수
  int number;                            // 카드의 숫자 - 인스턴스 변수
  static int width = 100 ;             // 카드의 폭 - 클래스 변수
  static int height = 250 ;            // 카드의 높이 - 클래스 변수
}
```
각 Card인스턴스는 자신만의 무늬(kind)와 숫자(number)를 유지하고 있어야 하므로 이들을 인스턴스변수로 선언하였고, 각 카드들의 폭(width)과 높이(height)는 모든 인스턴스가 공통적으로 같은 값을 유지해야하므로 클래스변수로 선언하였다.   

만일 카드의 폭을 변경해야할 필요가 있을 때는 모든 카드의 width값을 변경하지 않고, 한 카드의 width값만 변경해도 모든 카드의 width값이 변경되는 셈이다. 위 Class로 작성한 코드의 예시를 보고 싶으면 [여기](https://vaert.tistory.com/101)를 들어가보자. 

### Public/Private/Projected?





### 동기화

- Syn

- Asyn

## References

- <https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html>
- <https://heurinbada.tistory.com/27>
- <https://mommoo.tistory.com/24>
- <https://vaert.tistory.com/101>
