---
title: "[PS][Java] java Brute Force"
excerpt: "BOJ "
date: 2020-08-24
categories:
  - PS
tags:
  - brute force
  - java
  - ps
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

# [치킨 배달](boj.kr/15686)
## 코드
java로 구현한 코드는 [여기](https://gist.github.com/niklasjang/02c607f0be1920db1cff387f7255ddf2)에 있습니다.  

# [토너먼트](boj.kr/1057)
## 풀이
1.        1
1.    1       2
1.  1   2   3   4
1. 1 2 3 4 5 6 7 8

위의 구조를 보면 두 명이 대결을 하기 위해서는 다음 단계에서 서로 같은 번호를 부여받아야 한다. 이 때 홀수/짝수가 다음 단계에서 받을 번호를 현재의 번호를 기반으로 계산해야한다. 아래와 같은 방법이 있다. 홀수와 짝수 모두에 적용될 수 있는 동일한 식을 적용한다. 홀수가 짝수가 되고, 짝수가 홀수가 될 수 있기 때문이다.      

- a -= a/2
- b -= b/2

또는  
- a = a/2 + a%2
- b = b/2 + b%2
## 코드
java로 구현한 코드는 [여기](https://gist.github.com/niklasjang/9279831bc1419cdd16b9ecb73598c249)에 있습니다.  
