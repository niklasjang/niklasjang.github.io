---
title: "[PS][완전탐색][N자리 K진수] Chapter 1"
excerpt: "N자리 K진수 문제에 적용하기"
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

완전탐색의 첫 번째 알고리즘 백트래킹입니다. 백트래킹의 첫 번째 유형인 N자리 K진수를 문제에 적용해보겠습니다.  
- - -

## N자리 K진수 : 문제

### [신기한 소수](https://www.acmicpc.net/problem/2023)

N자리 K진수를 적용해서 해결하는 문제입니다. N자리 K진수의 개념은 그대로 적용되고 핵심은 두 가지 입니다.

1. isPrime()을 작성할 수 있는가? -> 소수인지 판별하는 O(sqrt(n)) 방법을 사용합니다. 
1. isPrime()을 적절한 위치에서 사용할 수 있는가? -> recur()의 초입 부분에 적용해서 사용합니다.

아래의 코드는 [여기](https://gist.github.com/niklasjang/c06fbd3b76ae7a3e76cdc1811abd1d17)에서도 볼 수 있습니다.  

```cpp
#include <iostream>
using namespace std;

int n = 0;

bool isPrime(int num) {
	if (num == 0) return true;
	if (num == 1) return false;
	int cnt = 0;
	for (int i = 1; i * i <= num; i++) {
		if (num % i == 0) cnt++;
	}
	return cnt == 1;
}

void recur(int depth, int num) {
	if (!isPrime(num)) return; //recur()의 초입 부분에 isPrime()을 적용한다. 
	if(depth == n) {
		cout << num << "\n";
		return;
	}
	for (int i = 1; i <= 9; i++) {//2671처럼 6이 들어가지만 소수일 수 있습니다. 
		recur(depth + 1, num * 10 + i);
	}
}

int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n;
	recur(0, 0);
	return 0;
}
```

### [암호 만들기](https://www.acmicpc.net/problem/1759)

N자리 K진수를 적용해서 해결하는 문제입니다. 이 문제의 조건을 정리해보면 아래와 같습니다.

1. 길이는 L
1. 최소 한 개의 모음, 최소 두 개의 자음
1. 알파벳이 증가하는 순서대로 정렬됨
1. C개의 암호가 주어질 때 이들로 만들 수 있는 암호 출력
1. 문자 중복 선택 금지

이 문제는 C개의 문자로 길이 L의 순열을 만드는 L자리 C진수 문제로 생각할 수 있습니다. 문제의 조건을 지키도록 만드는 것이 중요합니다.  

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

