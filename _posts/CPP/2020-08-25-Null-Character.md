---
title: "NULL, '\0',0, nullptr"
excerpt: "DFS 브루트포스 그러나 Pruning"
date: 2019-07-22
categories:
  - CPP
tags:
  - cpp
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

본 포스팅은 아래 코드의 차이점을 명확히하기 위한 포스팅입니다.  

```cpp
int* ptr1 = NULL;
int* ptr2 = nullptr;
int* ptr3 = '\0';
int* ptr4 = 0;
```  

# 0 

상수 0은 문맥에 따라서 다양한 의미로 사용됩니다.  

먼저 포인터가 0이랑 같은지 비교가 될 때는, 포인터가 null pointer인지 확인합니다. C 표준에서 `(void *)0`는 null pointer 또는 null pointer constant의 의미를 가집니다.  

그런데 아래의 방식은 잘못된 방식입니다.  

```c
int mynull = 0;
if(pointer == mynull){ ...}
```
위 표현식은 compiler가 pointer가 null pointer인지 확인하지 않고 두 변수의 동일성을 비교합니다. mynull이 변경되지 않으면 compiler는 mynull을 상수로 바꾸기 때문에 문제없이 동작할 수도 있지만 이를 보장할 수는 없습니다.   

# NULL

readability를 위해서 stddef.h에 macro로 `#define NULL `이 존재합니다. 컴파일러에 따라서 `#undef NULL`를 사용해서 다양한 의미로 사용할 수 있습니다. 기본적으로 NULL은 null pointer 같은 것으로 정의되어 있습니다.  

```c
//stdio.h
/- Define NULL pointer value *-
#ifndef NULL
#ifdef __cplusplus
#define NULL    0
#else
#define NULL    ((void *)0)
#endif
```

# '\0'

'\0'는 null pointer가 아닌 null character로 정의되어 있습니다. 이는 모든 비트를 0으로 set하는 문자입니다. '\0'는 0값을 가지는 integer constant입니다. 사실 pointer와 다른점은 전혀 없지만 코드를 해석하는 입장에서 readability를 위해서 정의한 용어입니다. 따라서 아래의 코드가 가능합니다.  

- if(*string_pointer) : string_pointer가 not-null character를 가리키는지 확인
- if(!*string_pointer) : string_pointer가 null character를 가리키는지 확인

# nullptr

NULL의 macro가 `#define NULL 0L`로 정의되어 있어서 혼란이 있던 문제를 cpp11에서 바로잡았습니다. nullptr은 null pointer를 의미하고 int형으로 type casting되지 않습니다.  

- int a = nullptr 불가능. 
- int *p = nullptr 가능
- int *p = 0 가능
- int *p = NULl 가능

실질적으로 함수 오버로딩의 경우의 예가 있습니다.  

```cpp
void f(int *ptr);
void f(int val);

f(nullptr);    // f(int *ptr)이 호출됩니다.
f(0);          // f(int val)이 호출됩니다.
f(NULL);       // f(int val)이 호출됩니다.
```  

위 코드와 독립적인 경우의 예입니다.  

```cpp
template<typename F, typename P>
void logAndCall(F func, P param)
{
    func(param);
}

void f(int *p);

f(0);        // void f(int p)가 정의되어 있지 않으므로 f(int *p)가 정상 호출
f(nullptr); // 당연히 됩니다.

logAndCall(f, 0); // 이것도 에러가 됩니다. P의 type이 int로 평가되기 때문에 func(int)를 찾게되겠지요
logAndCall(f, NULL); // 이것도 에러입니다. 위와 같은 이유입니다.
logAndCall(f, nullptr); // 아래 설명
```  

이건 정상적으로 P가 std::nullptr_t로 추론됩니다. f(std::nullptr_t)를 찾지요. 이건 기존 포인터와 호환되므로 정상적으로 func(int *p)를 호출합니다.  

> 결론은 null pointer에서 nullptr를 사용하자! 입니다.  