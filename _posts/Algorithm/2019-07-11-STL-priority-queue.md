---
title: "[priority-queue] 우선순위 큐 "
excerpt: "C++ STL"
date: 2019-07-11
categories:
  - Algorithm
tags:
  - Priority-queue
  - STL

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 목적

자료구조 속에 들어있는 모든 원소들을 원하는 조건에 맞추어서 '자동' 정렬한다.

## 기본 형태

```cpp
#include <cstdio>
#include <queue>
using namespace std;
priority_queue<int> pq;

int main(void) {
	pq.push(1);
	pq.push(3);
	pq.push(5);
	pq.push(7);
	pq.push(19);
	pq.push(17);
	while (!pq.empty()) {
		printf("%d ", pq.top());
		pq.pop();
	}
	return 0;
}
```

```cpp
//출력
19 17 7 5 3 1
```

## 깊은 이해

기본 형태만 기억하고 있으면 잘 활용을 할 수 없습니다. 최근 SHAKE! 2019 본선에서 직접 뵌 갓갓 구사과님의 [블로그](https://koosaga.com/9)를 참고해서 깊은 이해를 정리합니다.  

```cpp
#include <cstdio>
#include <queue>
using namespace std;

priority_queue<int, vector<int>, less<int> > pq;

int main(void) {
	pq.push(1);
	pq.push(3);
	pq.push(5);
	pq.push(7);
	pq.push(19);
	pq.push(17);
	while (!pq.empty()) {
		printf("%d ", pq.top());
		pq.pop();
	}
	return 0;
}

```

위 코드는 기본 형태와 완전히 같은 형태입니다. 원래 priority_queue는 <자료형, 구현체, 비교 연산자>로 정의된다고 합니다.  

1. 자료형 : 기본적으로 int, double, long long과 같은 기본 자료형입니다. 또는 직접 정의한 자료형이 들어갑니다. 
2. 구현체 : 신기하게도 priority_queue는 기본적으로 vector 위에서 돌아가고 있다고 합니다. #include <vector>를 하지 않아도 잘 돌아갑니다.
3. 비교연산자 : SLT에서 기본 구현된 less<자료형>이 default입니다. greater<자료형>을 넣으면 작은 값이 가장 작은 값이 top()에 위치합니다. 

- 구현체  

default로 되어있는 vector뿐만 아니라, pair<int, int>도 들어갈 수 있습니다. 단 이때는 정의한 자료형에 따른 비교 연산자를 직접 구현해야 합니다. pair<int ,int>의 경우
first 그리고 second 순서로 오름차순으로 정렬이 기본 구현되어 있긴합니다. 이외에 따른 자료구조를 쓰거나, pair<>에서 내림차순을 구현하고 싶으면 직접 비교 연산자를 구현해야 합니다.  

~~비교 연산자를 구현하는 방법은 [STL sort](https://niklasjang.github.io/algorithm/STL-sort/)포스팅을 참고합니다.~~  

STL sort의 비교 연산자와 priority_queue의 연산자를 조금 차이를 보입니다.  

### struct로 구현

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
	if (a.first != b.first) return a.first < b.first;
	else return a.second < b.second;
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
52,34
32,31
22,32
2,37
2,31

```

먼저 직접 정의한 자료형을 첫 번째 인자로 넣어줍니다. 그리고 이 자료형을 활용하는 구현체는 vector<정의한 자료형>으로 둡니다. 그리고
비교 연산자는 operator<함수를 오버로딩해서 구현합니다.  

```cpp
priority_queue<paiir, vector<paiir> > pq;
```  

```cpp
priority_queue<paiir> pq;
```

둘 중 어떤 것을 사용해도 같은 결과가 나옵니다. 아래는 같은 기능을 하는 코드를 class로 구현한 모습입니다.  

### class로 구현

```cpp
#include <cstdio>
#include <queue>
using namespace std;

class paiir {
public :
	int first;
	int second;
public :
	paiir(int f, int s) {
		first = f;
		second = s;
	}
};

bool operator<(const paiir &a, const paiir &b) {
	if (a.first != b.first) return a.first < b.first;
	else return a.second < b.second;
}

priority_queue<paiir> pq;

int main(void) {
	pq.push(paiir(2, 37));
	pq.push(paiir(2, 31));
	pq.push(paiir(32, 31));
	pq.push(paiir(52, 34));
	pq.push(paiir(22, 32));
	while (!pq.empty()) {
		paiir temp = pq.top();
		printf("%d,%d\n", temp.first, temp.second);
		pq.pop();
	}
	return 0;
}

```


## operator()로 구현

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

struct compare {
	bool operator()(const paiir &a, const paiir &b) {
		if (a.first != b.first) return a.first < b.first;
		else return a.second < b.second;
	}
};

priority_queue<paiir, vector<paiir>, compare > pq;

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

### 정리

위 세 가지 버전으로 모두 같은 기능이 구현됐습니다. 저에게는 제일 편한 방식이 첫 번째 방식이네요. 아직은 operator()를 사용하는 것이
어색해서 operator<를 오버로딩해서 사용하려고 합니다. 차이점을 구사과님께 여쭤봤는데.. 답변이 달릴까요?  

<https://koosaga.com/9>  




