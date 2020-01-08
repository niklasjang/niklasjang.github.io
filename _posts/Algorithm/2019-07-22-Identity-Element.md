---
title: "[모듈러 역원] 나머지 연산의 곱셈의 역원"
excerpt: "나눗셈은 곱셈의 역원을 구하는 과정"
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

## 항등원

항등원이란 집합 내의 어떤 원소와 어떤 연산을 취해도 자기 자신이 되게 하는 원소를 말한다.  

```txt
집합 S와 S에 대해 닫혀 있는 이항연산 *로 이루어진 마그마 (S, *)가 주어졌을 때,  
  
S의 모든 원소 a에 대해 eL * a = a가 성립한다면, eL을 좌항등원이라 한다.  
S의 모든 원소 a에 대해 a * eR = a가 성립한다면, eR을 우항등원이라 한다.  
만약 좌항등원과 우항등원이 같다면, e = eL = eR을 항등원이라 한다.  
```

일반적으로 a의 곱셈의 항등원은 1이다. a * 1 = a 이기 때문이다.  

## 곱셈의 역원

어떤 수의 곱셈의 역원은  그 수와 곱하면 곱셈의 항등원이 되는 수를 말한다.  

일반적으로 a의 곱셈의 역원은 1/a이다. a * (1/a) = 1이기 때문이다.  

## 나머지 연산의 곱셈의 역원 : 정의

(a/b) % m을 구하고 싶은데 이를 +,-,x와 같은 방식으로 정의하기에는 일관된 결과를 기대할 수 없습니다.  

[modular](/assets/images/algorithm/modular-1.jpg)  

많이 고민해보았는데, 나머지 연산의 곱셈의 역원을 위에서 설명한 항등원과 역원의 개념으로 이해하면 너무 복잡해집니다.  

따라서 나머지 연산의 곱셈의 역원인 $a_{-1}$을 또 다른 하나의 정의라고 생각합니다. 

**$a * a^{-1} \equiv 1 (mod m), 양 변은 modular 연산에 의한 결과가 같다.$** 또는 **$a * a^{-1} (mod m) = 1$**

## 나머지 연산의 곱셈의 역원 : 특징

(a/b) mod m을 구하고 싶을 때, b과 m이 서로소인 경우에만 정의가 됩니다??? 만약 b와 m이 서로소가 아닌 경우, 예를 들어서 배수 관계인 경우

1. $a/b mod m \equiv x$
2. $a/b = x (mod m)$
3. $a = bx (mod m)$
4. $a = 0$

즉, a가 0인 경우에만 성립하여 나머지 연산을 진행하는 것이 의미가 없어집니다.  $0 % m = 0$이니까요.


## 나머지 연산의 곱셈의 역원 : 구하는 방법

[한 번 보기]<https://ko.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/modular-inverses> 
```cpp

for (int i=1; i<m; i++) {
    if ((a*i) % m == 1) {
    x = i;
  }
}

```

1. 0에서 m까지의 i에 대해서 $a * i (mod m) == 1$을 만족하는 i가 a (mod m)의 모듈러 역수입니다.  
2. $a^{-1} \equiv x (mod m)$  

## 나머지 연산의 곱셈의 역원 : 예시 1

a =3, m = 7일 때 (1/3) mod 7을 구하고 싶습니다. 이 값을 x라고 하겠습니다.  

$1/3 mod 7 = x$  
$1/3 \equiv x (mod 7)$  
$1 \equiv 3x (mod 7)$  

x = 5일 때 3 * 5 (mod 7) = 1이므로 **3의 모듈러 역수** x는 5가 됩니다.  

## 나머지 연산의 곱셈의 역원 : 예시 2

a =3, m = 7일 때 (1/3) mod 7을 구하고 싶습니다. 이 값을 x라고 하겠습니다.  

$1/3 mod 7 = x$  
$1/3 \equiv x (mod 7)$  
$1 \equiv 3x (mod 7)$  

x = 5일 때 3 * 5 (mod 7) = 1이므로 **3의 모듈러 역수** x는 5가 됩니다.  

