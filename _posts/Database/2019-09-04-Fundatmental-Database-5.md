---
title: "[DB System] 5장"
excerpt: "2019-09-16"
date: 2019-09-16
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