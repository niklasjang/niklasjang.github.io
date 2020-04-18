---
title: "[PS][DP] Chapter 0"
excerpt: "이동시키기 & 순환시키기"
date: 2020-04-09
categories:
  - PS
tags:
  - ps 
  - dp
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

정수론 입니다. 대표적인 유형을 보겠습니다. 
- - -

### [n! mod p]](https://www.acmicpc.net/problem/2193)

문제의 정답은 [여기](https://gist.github.com/niklasjang/4cccddf19bb75caaa0e9ea57cf330f6a)에서 확인할 수 있습니다. 

1. mod p는 p가 소수일 때만 가능합니다. 

### [소인수 분해]](https://www.acmicpc.net/problem/11653)

문제의 정답은 [여기](https://gist.github.com/niklasjang/4cccddf19bb75caaa0e9ea57cf330f6a)에서 확인할 수 있습니다. 

1. mod p는 p가 소수일 때만 가능합니다.

1. 두 번째 풀이 : n을 구성하는 가장 큰 소수가 x라고 할 때, i*i<=n인 2부터 i까지 보면 n을 구성하는 모든 소수를 다 볼 수 있다.
1. 이 때 n=25일 때 i가 5일 때까지 for문이 돌지만 temp까지 넣어야 모든 소인수분해가 종료된다. 

### [조합 0의 개수]](https://www.acmicpc.net/problem/2004)

문제의 정답은 [여기](https://gist.github.com/niklasjang/1634707c0499b63cbedc3bac9351faba)에서 확인할 수 있습니다. 

1. N!에 p가 몇 번 들어가는지 구하기 : n/p + n/(p^2) + ...
1. 2와 5가 각각 몇 번 들어가는지 구하고 최소값 출력하기
1. nCm = n! / ( m! * (n-m)! )

### [k번째 소수]](https://www.acmicpc.net/problem/15956)

문제의 정답은 [여기](https://gist.github.com/niklasjang/ab20bff2799f4e59b408e3700f5bcf0a)에서 확인할 수 있습니다. 

1. 에라토스테네스의 체를 3번째 댓글대로 빠르게 짜고, n을 키워보면서 500000을 넣었을 때 답을 내는 n를 찾으면 된다.

### [GCD(n, k) = 1 ]](https://www.acmicpc.net/problem/11689)

문제의 정답은 [여기](https://gist.github.com/niklasjang/60d22293f39700dbef2a0157efac6102)에서 확인할 수 있습니다. 

1. n을 구성하는 모든 소인수를 찾는다.
1. n을 구성하는 소인수가 2,3,5라고 할 때
  1. 3,5에 대해서 선택한다/안한다의 개념을 적용하면 백트래킹으로 접근할 수 있다.
  1. 3만 선택된다는 것은 n에서 3의 배수를 모두 뺀다는 말
  1. 5만 선택된다는 것은 n에서 5의 배수를 모두 뺀다는 말
  1. 3,5가 선택된다는 것은 n에서 3의 배수와 5의 배수를 빼면서 중복으로 뺀 15의 배수를 더한다는 말
1. 이를 [포함 배제의 원리](https://en.wikipedia.org/wiki/Inclusion%E2%80%93exclusion_principle)라고 한다. 


## 거듭제곱

1. a의 b승을 구할 떄, b가 많이 크면 분할정복으로 접근한다.

``cpp
#include <iostream>
using namespace std;

int a, b, p;

//return a의 b승 mod p
//분할 정복으로 구하는 방법
long long recur(int a, int b) {
	if (b == 0) return 1;
	long long ret = 1;
	ret = recur(a, b / 2);
	ret *= ret;
	ret %= p;
	if (b % 2 == 0) return ret % p;
	else return (ret * a)%p;
}

int main(void) { 
	cin >> a >> b >> p;
	
	cout << recur(a, b) << "\n";
	return 0;
}
```

