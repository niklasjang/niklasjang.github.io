---
title: "[Union-find] 유니온 파인드 "
excerpt: "특정 에지가 싸이클을 구성하는지 확인하는 알고리즘"
date: 2019-06-06
categories:
  - Algorithm
tags:
  - Kruskal
  - MST
  - Union-find
  - Cycle

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 정의

- Disjoint-set

서로 중복되지 않는 부분 집합들로 나눠진 원소들에 대해 정보를 저장하고 조작하는 자료구조입니다.

즉, 공통 원소가 없는(`서로소`인, 상호배타적인, 교집합이 공집합인) 부분 집합들로 나눠진 원소들을 다루는 방법입니다.  

- Union-Find

Disjoint-Set을 표현할 때 사용하는 알고리즘 입니다. 

## 구조

집합을 구현하는데 벡터, 배열, 연결 리스트 등을 이용할 수 있으나 그 중 가장 효율적인 방법은 `트리`를 사용하는 것입니다. **이유는 다른 구조보다 아래의 연산을 진행하는데 더 적은 시간복잡도가 소요되기 때문입니다.** Union-find는 Disjoint-set을 표현하기 위해서 아래 3개의 연산을 사용합니다. 

- make-set(x)
초기화를 진행합니다. x를 유일한 원소로 하는 새로운 집합을 만듭니다.
- union(x,y)
합하는 연산입니다. x가 속한 집합과 y가 속한 집합을 합칩니다. `시간복잡도`는 $O(N)$보다 작습니다. 한쪽 트리를 구성하는 노드들을 다른 한쪽 트리의 구성원으로 넣는 연산을 진행하며 됩니다. 처음부터 두 개의 트리를 다시 만드는 것이 아닙니다.
- find(x)
x가 속한 집합의 대표값(Root 노드)을 반환합니다. 즉, x가 어떤 집합에 속해있는지 찾는 연산입니다. 밑에 있는 코드와 설명을 보면 알게되겠지만 **find 함수의 시간 복잡도에 의해서 전체의 시간 복잡도가 결정됩니다.**

![union-find-1](/assets/images/algorithm/union-find-1.jpg)  

## 활용

- 에지 싸이클 판단
Kruskal 알고리즘에서 그리디 탐색으로 최저 가중치를 가지는 에지를 Minimum spanning tree에 추가할 수 있는지 여부를 판별할 때, 싸이클이 생기는지를 판단해야합니다. 이때 union-find가 사용됩니다. 새로 추가하려는 에지의 양 끝 노드의 최고 루트가 같다면 이미 이어져있는 두 노드를 다시 연결하려는 꼴이 되는 것입니다. 

- 같은 네트워크에 속해있는가?

- 특정 연산에 대해서 결과가 닫혀있는가? 등등

## 기본적인 구현

```cpp

//트리 생성
int root[MAX_SIZE];

//초기화 : 각 노드의 루트는 자신
for (int i = 0; i < MAX_SIZE; i++)
    parent[i] = i;

/* find(x): 재귀 이용 */
int find(int x) {
    // 루트 노드는 부모 노드 번호로 자기 자신을 가진다.
    if (root[x] == x) {
        return x;
    } else {
        // 각 노드의 부모 노드를 찾아 올라간다.
        return find(root[x]);
    }
}

/* union(x, y) */
void union(int x, int y){
    // 각 원소가 속한 트리의 루트 노드를 찾는다.
    x = find(x);
    y = find(y);

    root[y] = x;
}

```

코드를 보면 x가 포함되 union의 leaf에 y의 root를 연결시키는 것이 아니라, 그저 y의 root를 x가 포함된 union의 root로 만드는 것뿐임을 알 수 있습니다. 쉽고, 확실하게 특정 노드의 root를 바꿀 수 있는 방법입니다. Union A와 Union B에는 각 노드가 a개 b개 들어있다고 생각해보겠습니다. a<=b를 만족하는 상황에서 A와 B를 합치기 위해서는 더 적은 수의 노드가 들어있는 A의 노드들의 Root를 Union B의 Root로 교체하는 O(a)의 연산이 필요합니다. a<=b를 만족하면서 가장 a가 큰 경우는 a+b일 때 a = N/2 이므로 시간복잡도 O(N/2)가 걸립니다.

하지만 이렇게 하면 모든 union(x,y)의 연산이 반복되어서 결국 모든 노드를 1 <- 2 <- 3 <- 4  <- 5  <-6 과 같이 일렬로 만든다면 연결 리스트의 형태가 됩니다. 이는 아래와 같은 문제점을 가집니다.

- 트리의 높이가 최대가 된다. 따라서 특정 노드의 find()함수의 시간복잡도가 $O(N)$이 될 수 있다.

1 <- 2 <- 3 <- 4  <- 5  <-6 는 결국 2~6의 루트가 1임을 알고 싶은데, 이를 알 수 있는 자료구조를 쉽게(위의 코드처럼) 구현하다보니 생긴 문제입니다. 이런 연결 리스트처럼 생긴 긴 트리가 아니라 **짧고 넓은**트리의 형태로 만들어도 결국 모든 노드의 Root를 빠르게 찾을 수 있습니다. 결국 트리가 저장되는 구조는 배열이기 때문에 가로로 넓어지는 것은 전혀 상관이 없습니다.  

![union-find-2](/assets/images/algorithm/union-find-2.jpg)  

이 경우 Find()함수의 시간 복잡도를 $O(logN)$으로 줄일 수 있습니다. 


## find()를 최적화 시킨 코드

```cpp

/* 초기화 */
int root[MAX_SIZE];
for (int i = 0; i < MAX_SIZE; i++) {
  root[i] = i;
}

/* find(x): 재귀 이용 */
int find(int x) {
  if (root[x] == x) {
      return x;
  } else {
      // "경로 압축(Path Compression)"
      // find 하면서 만난 모든 값의 부모 노드를 root로 만든다.
      return root[x] = find(root[x]);
  }
}

```

제 입장에서는 코드가 신기합니다. return에서 find()함수를 호출합니다. 이 호출은 root[x]==x까지 계속되다가 x의 최종 Root를 return 하겠지요. 다음으로 root[x]에 바로 최상이 Root를 대입시켜서 `가로로 긴 트리`를 만듭니다. 그리고 대입 연산의 결과 = 의 오른쪽에 있는 값이 최종적으로 return 됩니다. C++ 재밌네요!

## union()을 최적화 시킨 코드

1. **union-by-rank**(union-by-height)
2. rank에 트리의 높이를 저장한다.
3. 항상 높이가 더 낮은 트리를 높은 트리 밑에 넣는다.

```cpp

/* 초기화 */
int root[MAX_SIZE];
int rank[MAX_SIZE]; // 트리의 높이를 저장할 배열
for (int i = 0; i < MAX_SIZE; i++) {
  root[i] = i;
  rank[i] = 0; // 트리의 높이 초기화
}

/* find(x): 재귀 이용 */
int find(int x) { // 동일
}

/* union1(x, y): union-by-rank 최적화 */
void union(int x, int y){
   x = find(x);
   y = find(y);

   // 두 값의 root가 같으면(이미 같은 트리) 합치지 않는다.
   if(x == y)
     return;

   // "union-by-rank 최적화"
   // 항상 높이가 더 낮은 트리를 높이가 높은 트리 밑에 넣는다. 즉, 높이가 더 높은 쪽을 root로 삼음
   if(rank[x] < rank[y]) {
     root[x] = y; // x의 root를 y로 변경
   } else {
     root[y] = x; // y의 root를 x로 변경

     if(rank[x] == rank[y])
       rank[x]++; // 만약 높이가 같다면 합친 후 (x의 높이 + 1)
   }
}

```

##  두 원소가 속한 트리의 전체 노드의 수를 구하는 경우

이런 아이디어가 있다. 정도로 보고 넘어갑니다. 

```cpp

/* union2(x, y): 두 원소가 속한 트리의 전체 노드의 수 구하기 */
int nodeCount[MAX_SIZE];
for (int i = 0; i < MAX_SIZE; i++)
   nodeCount[i] = 1;

int union2(int x, int y){
   x = find(x);
   y = find(y);

   // 두 값의 root가 같지 않으면
   if(x != y) {
       root[y] = x; // y의 root를 x로 변경
       nodeCount[x] += nodeCount[y]; // x의 node 수에 y의 node 수를 더한다.
       nodeCount[y] = 1; // x에 붙은 y의 node 수는 1로 초기화
   }
   return nodeCount[x]; // 가장 root의 node 수 반환
}

```

## 참조

1. [gmlwjd9405.github.io](https://gmlwjd9405.github.io/2018/08/31/algorithm-union-find.html)