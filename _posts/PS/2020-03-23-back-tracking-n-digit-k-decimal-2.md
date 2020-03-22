---
title: "[PS][완전탐색][N자리 K진수] 암호 만들기"
excerpt: "완전탐색 - 1번째 알고리즘"
date: 2020-03-23
categories:
  - PS
tags:
  - ps 
  - back-tracking
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

완전탐색의 첫 번째 알고리즘 백트래킹입니다. 백트래킹의 첫 번째 유형인 N자리 K진수에 대해서 학습합니다.
- - -

## N자리 K진수 : 문제

N자리 K진수를 적용해서 해결하는 문제입니다. 이 문제의 조건을 정리해보면 아래와 같습니다.

1. 길이는 L
1. 최소 한 개의 모음, 최소 두 개의 자음
1. 알파벳이 증가하는 순서대로 정렬됨
1. C개의 암호가 주어질 때 이들로 만들 수 있는 암호 출력
1. 문자 중복 선택 금지

이 문제는 C개의 문자로 길이 L의 순열을 만드는 L자리 C진수 문제로 생각할 수 있습니다. 문제의 조건을 지키도록 만드는 것이 중요합니다.  

### [암호 만들기](https://www.acmicpc.net/problem/1759)

개념 post에서 설명했던 start의 개념을 사용한 코드는 [여기](https://gist.github.com/niklasjang/86df559d452480c05ff57d6f7212ff08)에서 볼 수 있습니다. 

start를 param을 사용하지 않는 코드는 아래의 코드는 [여기](https://gist.github.com/niklasjang/b499cd634c8c763d481de0aaed0c76a2)에서도 볼 수 있습니다.  

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int n=0, k=0;
int mo=0, za=0;
char input[20];
char arr[100];
bool visited[20];
void recur(int depth, int start, int mcnt, int zcnt){
  if(depth == n){
    if(mcnt >= 1 && zcnt >=2){
      for(int i=0; i<n; i++){
        cout << arr[i];
      }
      cout<<'\n';
    }
    return;
  }
  for(int i=start; i<k; i++){
    if(visited[i]) continue;
    arr[depth] = input[i];
    visited[i] = true;
    if(input[i] == 'a' || input[i] == 'e' || input[i] == 'i' || input[i] == 'o' || input[i] == 'u'){
      recur(depth+1, i+1, mcnt+1, zcnt);
    }else{
      recur(depth+1, i+1, mcnt, zcnt+1);
    }
    visited[i] = false;
  }
}

int main (void){
  cin.tie(NULL);
  ios::sync_with_stdio("false");
  cin>> n >> k;
  for(int i=0; i<k; i++){
    cin >> input[i];
  }
  sort(input, input+k);
  recur(0, 0, 0, 0);
  return 0;
}
```

