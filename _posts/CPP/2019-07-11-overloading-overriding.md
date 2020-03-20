---
title: "[오버로딩과 오버라이딩] 차이점 "
excerpt: "C++"
date: 2019-07-11
categories:
  - CPP
tags:
  - Overriding
  - Overloading

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 정의

오버로딩(Overloading) : 같은 이름의 메소드를 여러 개 정의한 뒤, 매개변수의 유형과 개수에 따라 적절한 메소드가 호출되도록 하는 방식.
parameter를 load 한 뒤, function call을 사용한다고 생각합시다.  

오버라이딩(Overriding) : 상위 클래스가 가지고 있는 메소드를 하위 클래스에서 재정의해서 사용하는 방식. 상위 클래스 위에 하위 클래스가
올라탄다고 생각합시다.  


## operator< 오버로딩 

간단한 예제이므로 [priority-queue]()포스팅에서 사용한 코드를 그대로 가져오겠습니다. 

```cpp

#include <cstdio>
#include <queue>
using namespace std;

struct paiir {
	int first;
	int second;
	paiir(int f, int s) {
		first = f;
		second = s;
	}
};

bool operator<(const paiir &a, const paiir &b) {
	if (a.first != b.first) return a.first > b.first;
	else return a.second > b.second;
}

priority_queue<paiir> pq;
// 또는 
//priority_queue<paiir, vector<paiir> > pq;

int main(void) {
	pq.push(paiir(2, 37));
	pq.push(paiir(2, 31));
	pq.push(paiir(32, 31));
	pq.push(paiir(52, 34));
	pq.push(paiir(22, 32));
	while (!pq.empty()) {
		printf("%d,%d\n", pq.top().first, pq.top().second);
		pq.pop();
	}
	return 0;
}

```

```cpp
//출력
2,31
2,37
22,32
32,31
52,34
```

### operator()오버로딩

함수 호출 연산자 ()를 오버로딩하는 것은 함수를 호출하는 새로운 방식을 만드는 것이 아니라, 임의의 다른 parameter를 전달하는
operator function()을 만드는 것입니다.  

```cpp
#include <iostream>
using namespace std;
 
class Distance {
   private:
      int feet;             // 0 to infinite
      int inches;           // 0 to 12
      
   public:
      // required constructors
      Distance() {
         feet = 0;
         inches = 0;
      }
      Distance(int f, int i) {
         feet = f;
         inches = i;
      }
      
      // overload function call
      Distance operator()(int a, int b, int c) {
         Distance D;
         
         // just put random calculation
         D.feet = a + c + 10;
         D.inches = b + c + 100 ;
         return D;
      }
      
      // method to display distance
      void displayDistance() {
         cout << "F: " << feet << " I:" << inches << endl;
      }   
};

int main() {
   Distance D1(11, 10), D2;

   cout << "First Distance : "; 
   D1.displayDistance();

   D2 = D1(10, 10, 10); // invoke operator()
   cout << "Second Distance :"; 
   D2.displayDistance();

   return 0;
}

```

```cpp
//출력
First Distance : F: 11 I:10
Second Distance :F: 30 I:120
```


