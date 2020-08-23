---
title: "[PS][Java] java binary search"
excerpt: "BOJ "
date: 2020-08-23
categories:
  - PS
tags:
  - binary search
  - java
  - ps
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---


# [수 찾기](boj.kr/1920)
## 풀이 1
모든 경우를 탐색하는 O(N)  
## 코드 1
java로 구현한 코드는 [여기](https://gist.github.com/niklasjang/44ae46d8dad6e84010e42513c198bc64)에 있습니다.  
## 풀이 2
hashSet을 이용한 O(1)
## 코드 2
java로 구현한 코드는 [여기](https://gist.github.com/niklasjang/7853f497d0bdf6106f627136fff6dbcd)에 있습니다.  
## 풀이 3
이분탐색을 이용한 O(nlogn)
## 코드 3
java로 구현한 코드는 [여기](https://gist.github.com/niklasjang/240264d45d0aa4d6d0b4a6e450304b07)에 있습니다.  

# LowerBound, UpperBound 구현
## 풀이
정렬된 array에 대해서  
- Lower Bound: key보다 크거나 같은 첫번째 위치(이상)를 반환.
- Upper Bound: key보다 큰 첫번째 위치(초과)를 반환.
## 코드

Lower는 key와 같은 제일 작은 idx을 찾는다. Upper는 Key보다 큰 제일 작은 idx를 찾는다. 두 가지 모두 일단 key를 찾는 과정은 이분탐색으로 진행하기 때문에 arr(mid) > key인 경우에는 rear를 좁힌다.  
front는 mid+1로 전진하기거나 유지. rear는 mid로 좁히거나 유지이다. 결과적으로 rear가 return 된다는 것을 기억하면 된다.  
차이점은 if(arr[mid] <= key)에서 '='가 있는지 여부뿐이다.  

```java
public static int lowerBound(int arr[], int front, int rear, int key){
int mid;
	while(front<rear){
		mid = (front + rear) / 2;
		if(arr[mid] < key) front = mid + 1;
		else rear = mid;
	}
	return rear;
}

public static int upperBound(int arr[], int front, int rear, int key){
	int mid;
	while(front<rear){
		mid = (front + rear) / 2;
		if(arr[mid] <= key) front = mid + 1;
		else rear = mid;
	}
	return rear;
}
```



