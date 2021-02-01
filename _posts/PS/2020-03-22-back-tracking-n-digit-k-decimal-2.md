---
title: "[PS][완전탐색][N자리 K진수] Chapter 2"
excerpt: "N자리 K진수 또 다른 접근 방법, 고른다/안고른다"
date: 2020-03-22
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

완전탐색의 첫 번째 알고리즘 백트래킹입니다. 백트래킹의 두 번째 유형인 '고른다/안고른다'를 학습합니다. 
- - -

## N자리 K진수 : 개념

이전 포스팅에서는 N자리 K진수에 대해서 각 자리수에 적절한 값을 재귀적으로 한 번씩 저장하는 방법을 사용했습니다. 오름차순 N자리 K진수를 구현할 때에 recur(int depth, int start)의 param을 적용했었습니다.  

이번에는 오름차순 N자리 K진수를 구현하기 위해서 특정값을 '선택한다/선택하지 않는다'의 방법을 적용해보겠습니다. 이 때 K는 [1,k]인 경우만 해당합니다.   

recur(int depth, int cnt)에 대해서 아래와 같은 의미를 갖습니다.  

1. depth : 지금까지 선택한(배열에 저장된) 숫자의 갯수
2. cnt : 선택할지 말지 결정해야하는 수 

```txt
//입력
3 6
//출력
1 2 3
1 2 4
1 2 5
1 2 6
1 3 4
1 3 5
1 3 6
1 4 5
1 4 6
1 5 6
2 3 4
2 3 5
2 3 6
2 4 5
2 4 6
2 5 6
3 4 5
3 4 6
3 5 6
4 5 6
```

오름차순 3자리 6진수들을 구할 때, arr[0]의 값이 1이 될 수도 있고 아닐 수도 있습니다. arr[0]값이 1로 선택되었을 때, arr[1]의 값이 2가 될 수도 있고 아닐 수도 있습니다. 이와 같은 방법으로 특정 값이 선택된다/선택되지 않는다.의 방법으로 N자리 K진수에 접근하는 방법입니다.  


## N자리 K진수 : 코드  

이를 코드로 구현하면 아래와 같습니다.    

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int n = 0, k=0;
int arr[20];

void recur(int depth, int choice) {
	if (depth == n) {
		for (int i = 0; i < n; i++) {
			cout << arr[i] << " ";
		}
		cout << "\n";
		return;
	}
  
  if(choice == k+1) return;
  arr[depth] = choice;
  recur(depth+1, choice+1); //choice를 선택한다. 
  recur(depth, choice+1); //choice를 선택하지 않는다.
}
int main(void) {
	cin.tie(NULL);
	ios::sync_with_stdio("false");
	cin >> n >> k;
	recur(0,1);
	return 0;
}
```

기본적인 N자리 K진수와 큰 틀은 비슷합니다. 가장 처음에 choice는 1로 시작하고 오름차순으로 출력되어야하니 123부터 출력되어야 합니다. 따라서 choice를 선택하는 경우가 선택하지 않는 경우보다 먼저 실행됩니다. 현재의 choice를 선택하지 않는다는 것은 choice+n의 값이 들어갈 수 있음을 의미한다고 할 수 있습니다.  

arr[0]의 값이 1로 선택된 경우(123 ~ 156)을 출력하고 arr[0]의 값이 2로 선택될지 말지를 결정해야합니다. 만약 arr[0]의 값이 2로 선택되는 경우 arr[0]의 값은 아직 저장되지 않았기 때문에 depth의 값이 0입니다. 따라서 arr[0]에 1이 저장되었던 것은 덮어써지기 때문에 고려하지 않아도 됩니다.  

## N자리 K진수 : 문제

이번에는 N자리 K진수를 선택한다/선택하지 않는다의 접근 방법으로 비내림차순 N자리 K진수를 출력해보겠습니다.

```cpp
#include <iostream>

using namespace std;

int n=0, k=0;
int arr[100];

void recur(int depth, int choice){
  if(depth == n){
    for(int i=0; i<n; i++){
      cout<<arr[i]<<' ';
    }
    cout<<'\n';
    return;
  }
  if(choice == k+1) return;
  arr[depth] = choice;
  recur(depth+1, choice); //choice + 1을 choice로 바꾸면 비내림차순!
  recur(depth, choice+1);
}

int main (void){
  cin.tie(NULL);
  ios::sync_with_stdio("false");
  cin>> n>> k;
  recur(0,1);
  return 0;
}
```

```txt
//비내림차순 3자리 6진수
3 6
1 1 1 
1 1 2
1 1 3
1 1 4
1 1 5
1 1 6
1 2 2
1 2 3
1 2 4
1 2 5 
1 2 6
1 3 3
1 3 4
1 3 5
1 3 6
1 4 4
1 4 5
1 4 6
1 5 5
1 5 6
1 6 6
2 2 2
2 2 3
2 2 4
2 2 5
2 2 6
2 3 3
2 3 4
2 3 5
2 3 6
2 4 4
2 4 5
2 4 6
2 5 5 
2 5 6
2 6 6
3 3 3
3 3 4
3 3 5
3 3 6
3 4 4
3 4 5
3 4 6
3 5 5 
3 5 6
3 6 6
4 4 4
4 4 5
4 4 6
4 5 5
4 5 6
4 6 6
5 5 5
5 5 6
5 6 6
6 6 6
```

choice+1을 choice로 바꾸는 것의 의미는, arr[0]에서 1을 선택했을 때 arr[1]의 값을 다시 1이 선택될지 안될지를 결정하겠다는 의미입니다. 만약 arr[0]에서 1이 선택되지 않았다면 2의 선택여부를 결정해야하기 때문에 선택하지 않는 경우에는 그대로 choice+1을 둡니다.  