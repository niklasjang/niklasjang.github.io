---
title: "[확장 유클리드 알고리즘]"
excerpt: ""
date: 2019-07-22
categories:
  - Algorithm
tags:
  - Identical-Element
  - Inverse
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 유클리드 알고리즘

2개의 자연수(또는 정식) a, b에 대해서 a를 b로 나눈 나머지를 r이라 하면(단, a>b), a와 b의 최대공약수는 b와 r의 최대공약수와 같다.  

$a = bp+r$ 일 때 $GCD(a,b) = GCD(b,r)$이다.  

## 유클리드 알고리즘 코드

$r = a%b$로 적을 수 있으므로  

```c
int gcd(int a, int b)
{
    //b가 0이면 a를, 아니면 gcd(b,a%b)를 호출
	return b ? gcd(b, a%b) : a; 
}
```

## 유클리드 호제법의 확장

정수 a, p 의 최대공약수(Greatest Common Divisor)를 gcd(a,p)와 나타낼 때, 확장된 유클리드 호제법을 이용하여, $ax + py = gcd(a,p)$의 해가 되는 정수 x, y 짝을 찾아낼 수 있다.
(x, y 중 한개는 보통 음수가 된다.) 이 식은 **두 정수의 최대공약수를 원래 두 수의 배수의 합으로 나타낼 수 있다**는 베주의 정리와 일치한다.  

특히 a와 p가 서로소일 때는 GCD(a,p)는 1이므로 유용하게 사용할 수 있다. 위 식은 $ax + py = 1$로 변형될 수 있고 이 식은 모듈러 연산의 곱셈의 역원이 되기 때문이다. 


$a != p$이고 $a != p의 배수$인 즉, $a와 p가 서로소$일 때 $a * x = 1 (mod p)$가 되는 x를 구하라.  

## 어떻게 위 문제가 도출되었을까? 

1. $ax+py = c$에서 c 값이 gcd(a,p)의 배수일 때만 정수해 x, y를 갖는 것이 알려져있다. (베주의 정리)  
2. $ax+py = c$가 정수해를 갖는 c의 최소값이 gcd(a,p)가 된다. (a와 p는 문제에서 주어진 서로소이고, 정수 x와 y가 가장 작을 때 c도 제일 작은 값을 가질 수 있다.)
3. 항상 a와 p가 서로소인 것은 아니지만 문제에서 서로소라고 주어진다면, $ax+py = gcd(a,p)$에서 $gcd(a,p) = 1$이므로 $ax+py = 1$로 변형이 된다. 
4. $ax+py = 1$에 대해서 양변에 mod p 연산을 수행하면 $py$항은 나머지에 영향을 미치지 않으므로 $ax = 1 (mod p)$를 얻을 수 있다. 
5. 즉 위 문제는 a를 p로 나눈 나머지의 곱셈의 역원을 구하는 문제가 된다. 





