---
title: "[DB] Chapter 5 "
excerpt: ""
date: 2019-09-02
categories:
  - Database
tags:
  - database
toc : false
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

### 교재

1. 교재는 'Fundamentals of Database System' 7th edition 구글링해서 찾기   
2. 6판에서 7판으로 개정되면서 big data 부분이 추가됨. 한글판은 6판까지만 있음

# Chater 5 : The Relational Data Model and Relational Database Constraints


## History of Data Models

정보 검색에 대한 내용은 참고 사항으로만 보기!!  

Relational 형태가 아직까지 쓰이고 이다.라고만 설명하고 넘어감.

1970년에 E.F.Codd라는 박사가 처음 제시되었다. 처음 제시하면서 Relation DB에 대해서 모든 것을 다 설명했다. 뒤에 추가적인 기능이 더해지긴 했지만 기본 골격은 1명이 모두 다 만들었다. 

## Informal Definitions

- `relation` : 값을 가진 표나 텍스트를 의미하면 `flat file`이라고 불리기도 한다. 가장 일반적인 형태의 표를 생각하면 된다. 
![Figure 5.1]  

각각의 행들은 식별자를 가지고 있다. `identifier`라고 부른다. 각 column에는 들어올 수 있는 값의 범위가 정해져있다. 해당 column이 가질 수 있는 값을 Domain이라고 한다. 이는 Atomic Value로서 더이상 나눠질 수 없는 값이다. 나누는 순간 의미가 사라진다. 미국 번호의 경우 (ddd)ddd-dddd를 나누면 의미가 없어진다. Names의 경우 the set of character strings. Employee_age :15와 80 사이의 int로 정해져있다.  

단순하게 표를 표현하기 위해서 `Relation schema`를 사용한다. $(A1,A2,...,An)$. The Degreee of a relation의미. E.g. STUDENT(Name : string, SSN : int)와 같이 domain을 string/int처럼 써주기도 한다.  

Schema는 relation의 틀을 말하는 것이다. `attribute` = a rol name of a domain. HomePhone과 OfficePhone의 column이 있을 때 Domain: Phone을 사용한다.  

r(R)의미. n-tuple t의미. 

- Cartesian product : 곱을 하면 결과는 각 집합의 tuple로 나온다. 모든 가능한 matching 결과가 나온다. {0,1}과 {a,b,c}의 경우 
{ <0,a>, <0,b>, <0,c>, <1,a>, <1,b>, <1,c> } 어떤 원소의 집합을 Cardinality라고 한다. 

용어 정의 쭉 읽고 이해하고 외우기  

## Chaacteristic 

다음 시간.

### 5.1.2 Characteristics of Relations

- `Ordering of tuples` in a relation r(R)  
  - 관계는 튜플들의 집합이기 때문에 원소의 순서는 중요하지 않다고 본다. {1,2,3} = {3,2,1}
  - 따라서 ![Figure 5.2]는 동일한 표로 간주한다.
  - attribute의 순서에 대해서 원래의 `관계`의 정의를 보아도 ordered list로 순서가 있는 것처럼 보여진다. 수학적 정의를 넓혀보면 어떻게 정의를 내릴 수 있냐면, 튜플은 attribute와 value의 pair의 집합이라고 볼 수 있다. ![Figure5.3] 나오는 순서는 다르지만 나와있는 쌍들의 값은 같다. 따라서 순서가 달라고 값이 같으면 같은 튜플로 본다.
  - 관계는 순서가 없고 attribute에도 순서가 없다는 것이 일반적인 정의이다. 
- Values and NULLs in the tuples
  - atomic
    - 쪼개질 수 있는 값을 가질 수 있는는 없다.
    - 이러한 경우 Flat relational model
    - First Normal Form이라고 부른다.
    - 이를 위반하면 Nonfirst normal form or nested relations이라고 부른다.
  - 특별한 값인 `NULL`은 `unknown` 또는 `inapplicable to certain tuples`이라는 value를 나타낸다.
  - `NULL`은 `atomic` value라는 의미를 가진다. 

## 5.2  Relational Model Constraints and Relational Database Schemas

## Relation Model Constraints : 모델의 3요소 중 1개

- `Constraints` 정의
- `Constraints`의 종류 3가지
  - Inherent model-based constraints : 
    - Constraints that are inherent in the data model. We call these inherent model-based constraints or implicit constraints.
  - Schema-based constraints : 뜻
    -   Constraints that can be directly expressed in the schemas of the data model, typically by specifying them in the DDL 
  - Application-based constraints : 뜻
    - Constraints that cannot be directly expressed in the schemas of the data model, and hence must be expressed and nforced by the application programs or in some other way. 
    - 값에 대한 제약사항이므로 application에서 다루어짐
    - semantic

## Schema-based constraints

- 기본 제약조건
  - key constraints
  - constraints on NULLS
  - Entitiy
- Additional constraints