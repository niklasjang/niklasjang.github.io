---
title: "[이분탐색] Binary search tree "
excerpt: "Binary search tree"
date: 2019-05-26
categories:
  - Algorithm
tags:
  - BOJ
  - Binary-Search

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---


## 이분탐색으로 정답 찾기

1. 정답을 구하는 문제 : A에서 B까지 가는 가장 빠른 길을 찾는 문제
2. 가능한지 살펴보는 문제 : A에서 B까지 X시간동안 갈 수 있는지 판단하는 문제(YES/NO)

1번과 같은 문제가 있을 때 정확한 답을 구하는 알고리즘을 생각하기 어려울 때가 있습니다. 그래서 예비 정답의 값을 결정한 상태에서
해당 값이 정답이 될 수 있는지 구하는 알고리즘이 간단하고 빠르다면 이 과정을 반복해서 정답을 구할 수 있습니다.  

정답이 될 수 있는 가능성이 있는 구간의 왼쪽 끝을 Left, 오른쪽 끝을 Right로 설정해서 아래와 같이 작성하면 됩니다.  

본 알고리즘은 $\log_{ RIGHT - LEFT }$ * $O(check 함수의 시간 복잡도)$ 시간 복잡도를 가집니다.  

## 문제 예시

아래의 예시 코드에서는 문제의 조건을 만족하는(check배열에서 return true를 얻을 수 있는) 가장 큰 값을 목표로한다고 가정하겠습니다. 따라서 최초의 ans는 가장 작은 값을 의미하는 -1로 두고 시작합니다. 

```cpp
bool check(int mid){
    return 문제 조건을 부합하는가?
}

int ans = -1;
int left = 1;
int right = MAX;
while(l <= r){
    int mid = (l+r)/2;
    if(check(mid)){ //조건에 부합하는가?
        if(ans < mid){ //이미 구한 답보다 더 좋은 답이면
            ans = mid;
        }
        l = mid +1;
    }else{
        r = mid -1;
    }
}
printf("%d", ans);
```