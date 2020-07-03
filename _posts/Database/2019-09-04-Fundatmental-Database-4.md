---
title: "[DB] Chapter 4 Enhanced Entity-Relationship and Object Modeling "
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

# Chapter 4 Enhanced Entity-Relationship and Object Modeling

새로운 DB Application 두 가지 종류

- Enhanced ER or EER model
  - additional semantic data modeling concepts
  - ER Model + specialization/generalization, category
    - class/subclass relationship, type inheritance : attribute, relationship inheritance
    - UNION : 서로 다른 entity type 객체의 UNION을 표현하는 객체
- Object Data Model
  - OMT (Object Modeling Technique) 
  - UML (Universal Modeling Language)

## SuperClass/SubClass or Class/SubClass

- 실제 세계에서는 같은 entity를 나타냄
- 하지만 구체적인 역할을 명시
- Employee/(Engineer or SALARIED_EMP)

## Specialization

- entity type의 subclass들을 정의하는 프로세스
  - EMPLOYEE -> {SALARIED_EMPLOYEE,  HOURLY_EMPLOYEE}
- 일부에는 적용되지만 전체에는 적용되지 않는 attribute를 표현하기 위해
- 특정 relationship type이 subclass의 member에만 적용되는 경우

## Generalization

- abstraction의 역연산 또는 specialization의 역연산
- 여러 entity type의 특징을 추상화하여 공통된 특징만 superclass로 정의

## Sepcialization과 Generalizatino의 constraints

| 개념 | 의미 | 
|:--------|:--------|
|PREDICATE-DEFINED(or condition-defined) subclass| super class의 attribute에 조건 값을 추가하여 subclass를 구분 |
|ATTRIBUTE-DEFINED specialization | 모든 subclass가 값을 가지고 있는 super class의 attribute를 defining attribute라고 부른다. |

위 두 가지 개념이 같은 상황을 다른 시점에서 본 해석이다.  

![31](/assets/images/database/31.jpg)  

## User-Defined Subclass

| 개념 | 의미 | 
|:--------|:--------|
|user-defined subclass| subclass를 구분하는 특정한 값 없이 각 entity가 사용자에 의해서 subclass가 결정됨. |

![32](/assets/images/database/32.jpg)  

## Disjointness Constraint

| 개념 | 의미 | 특징 |
|:--------|:--------|:--------|
|Disjoint : D| entity는 최대 한 개의 subclass의 멤버가 될 수 있다. | attribute-defined specialization에서 predicate attribute가 single value인 경우 disjoint임을 암시한다. |
|Overlap : O| entity는 여러 개의 subclass의 멤버가 될 수 있다. | default case |

![33](/assets/images/database/33.jpg)  

## Completeness Constraint

| 개념 | 의미 | 특징 |
|:--------|:--------|:--------|
|TOTAL specialization constraint | EMPLOYEE  ≡ (HOURLY_EMPLOYEE  ∪ SALARIED_EMPLOYEE) | superclass와 연결하기 위해서 double line을 사용한다. |
|PARTIAL specialization constraint | (SECRETARY ∪ ENGINEER ∪ TECHNICIAN) ⊂ EMPLOYEE | superclass와 연결하기 위해서 single line을 사용한다. |

- TOTAL : super class에 있는 모든 entity는 반드시 subclass 중 하나에 속해야 한다.
- PARTIAL : entity가 sub class에 속하지 않는 것을 허용한다. 

![34](/assets/images/database/34.jpg)  

## Insertion & Deletion Rule

| 개념 | 의미 | 특징 |
|:--------|:--------|:--------|
|superclass에서 entity 지우기 | superclass에 속한 모든 subclass가 지워진다. |
|superclass에서 entity 추가하기 | predicate를 만족하는 subclass에 반드시 추가되어야 한다. |
|superclass에서 entity total participation으로 추가하기 | subclass 중 반드시 한 곳에는 추가되어야 한다. |

## A specialization/generalization hierarchy & lattice

![35](/assets/images/database/35.jpg)  

| 개념 | 의미 | 
|:--------|:--------|
|A specialization/generalization hierarchy| 모든 subclas는 class/subclass 관계에서 한 번민 침여한다. |
|A specialization/generalization lattice| 모든 subclas는 class/subclass 관계에서 여러번 침여한다. |

- lattice(multiple inheritance)의 경우 `Shared subclass`라고 불린다. 

## Specialization process

- Top Down
  1. PERSON -> {EMPLOYEE, ALUMNUS, STUDENT}
  2. EMPLOYEE -> {STAFF, FACULTY, STUDENT ASSISTANT} 
  3. STUDENT -> {GRADUATE_STUDENT, UNDERGRADUATE_ STUDENT}
  4. STUDENT_ASSISTANT -> {RESEARCH_ASSISTANT, TEACHING_ASSTSTANT}
- Bottom Up
  1. STAFF, FACULTY, ALUMNUS, GRADUATE_STUDENT, UNDER_STUDENT, RESEARCH_ASSISTANT, TEACHING_ASSISTANT, ...
  2. {GRADUATE_STUDENT,UNDERGRADUATE_STUDENT} -> STUDENT
  3. {RESEARCH_ASSISTANT, TEACHING_ASSISTANT} -> STUDENT_ASSISTANT 
  4. {STAFF, FACULTY, STUDEN_ASSISTANT} -> EMPLOYEE 
  5. {EMPLOYEE, ALUMNUS, STUDENT} -> PERSON

## Modeling of UNION Types Using Categories

| 개념 | 의미 | 
|:--------|:--------|
|`Union` Type(or `Category`)| class/subclass 관계에서 여러 개의 super class가 있고, super class가 각각의 entity type을 가지는 경우 |

- 이 때 subclass는 여러 entity type의 UNION을 나타낸다고 말한다.  
- superclassd의 특징을 상속받지만, superclass들만으로 구성되지는 않을 때 사용.
- EER의 notatino은 `U`로 적는다.

![36](/assets/images/database/36.jpg)  

## Shared Subclass 비교

![37](/assets/images/database/37.jpg)  

- 좌 : 3개의 subclass의 교집합의 부분집합
  - ENGINEERING_MANAGER는 ENGINERR, MANAGER, SALARIED_EMPLOYEE 모두에 속한다. 
- 우 : 3개의 superclass의 UNION. OWNER의 멤버는 반드시 superclass 중 하나에만 속해야 한다.
  - OWNER entity는 그 entity가 속하는 superclass에 따라 COMPANY/PERSON/BANK의 attribute를 상속받는다.
  - 따라서 UNION(category)가 attribute ingeritance적 측면에서 더 selectively하다고 할 수 있다.

![38](/assets/images/database/38.jpg)  

- 위 : TOTAL인 경우 모든 VEHICEL은 CAR 아니면 TRUCK이다. 만약 PARTIAL인 경우 CAR와 TRUCK이 아닌 MOTORCYCLE 같은 다른 entity type이 VEHICLE에 포함될 수 있다.
- 아래 : UNION은 CAR 또는 TRUCK 외에는 다른 entity type이 REGISTERED_VEHICLE일 수 없음을 나타낸다.  

## SPECIALIZATION or CATEGORIZATION ?

![39](/assets/images/database/39.jpg)  

- UNION이 total이면 specialization/generalizationis으로 대체가 가능하다.
- 만약 두 class가 같은 entity type을 나타내고, 같은 key attribute를 포함해서 많은 attribute가 같으면 specialization/generalizationis를 사용한다.
- 나머지 경우는 UNION을 사용한다.  

## Representing Specialization/Generalization and Inheritance in UML Class Diagrams

- multiple 상속이 허용된다.

| 개념 | 의미 | 
|:--------|:--------|
|base class| the root superclass|
|leaf class| leaf nodes |
|abstract class| attribute와 operation은 있지만 object가 없음|
|concrete class| class에 따라서 생성된 instance가 있음|
|template class| 다른 class를 정의하는데 사용될 수 있는 template를 명시함|

![40](/assets/images/database/40.jpg)  

## Ternary Relationship  주의 사항

![41](/assets/images/database/41.jpg)  

- 일부 database design은 ternary relationship의 정의를 허용하지 않음
- 이런 경우 **1. weak entity로 표기, 2. no partial key 3. three identifying relationships를 적용**해야 한다.  
- 이 객체는 세 개의 entity를 결합할 때만 identifing 될 수 있다.

![42](/assets/images/database/42.jpg)  

- **weak entity type이 여러 개의 owner entity types을 가지는 경우 ternary relationship이 형성될 수 있다.**

## Data Abstraction and Knowledge Representation Concepts

- `데이터 추상화`와 `AI에서 이야기하는 KR`은 비슷한 점도 있고 차이점도 있다.
- KR의 목적은 DOMAIN OF DISCOURSE(관심영역)을 정확하게 모델링하는 개념을 개발하는 것이다.
- KR의 결과 ONTOLOGY가 생성되는데 이는 관심영역을 설명하는 데이터베이스 정도로 이해할 수 있다. 
- 따라서 KR의 목적과 data modeling의 목적은 비슷하다.
- 공통점 :
  - 공통된 특성과 중요한 특성으을 identifying하기 위해서 추상화 과정을 진행한다.
  - 동시에 중요하지 않은 정보는 억제한다.
  - 공통된 추상화 개념을 가지고 있다.
    1. CLASSIFICATION and INSTANTIATION : type과 instance를 구분하는 개념.
    1. IDENTIFICATION : 서로 다른 schema에 저장된 object가 서로 같은 대상을 의미하는지 아닌지 판단하는 개념.
    1. SPECIALIZATION and GENERALIZATION : 각각 conceptual refinement, conceptual synthesis
    1. AGGREGATION and ASSOCIATION : 집단화, 연관화. 구성요소를 이용해서 복합개념을 만드는 것과 서로 다른 class 사이에 연관을 짓는 것.
      - AGGREGATION : CAR - ENGINE : CAR가 사라지면 ENGINE로 사라진다. 
      - ASSOCITATION : CAR - OWNER : CAR가 사라져도 OWNER는 사라지 않는다.
- 차이점 :
  - KR이 semantic data model보다 더 넓은 개념이다.
  - KR은 다양한 형태의 지식이 KR의 schema를 사용해서 표현된다.
  - KR은 **reasoning mechanism이 있어 추론을 통한 데이터 추출이 가능하다.**
  - data model은 schema와 meta data에 집중한다.
  - KR schema는  schema 정보와 instance 정보가 섞여서 제공된다. 유연성은 높지만 어디까지 meta인지 어디까지 instance인지 구분하기 어려워 비효율성이 나타나기도 한다. 
  - KR은 Exception Object를 지원한다. 특정 관점에서 조금 다른 객체의 존재를 인정한다.
  - KR은 Class Property를 지원한다. 전역변수와 비슷한 개념을 지원한다. 

## 사례 공부

![43](/assets/images/database/43.jpg)  

1. (b) : 지원자가 회사에서 인터뷰를 보면 반드시 잡오퍼가 들어오는 형태의 DB로 문제가 있다. 
1. (c) : 인터뷰 결과에 따라서 새로운 관계가 형성되면 되지만 이를 구현하는 DB는 잘 없다.
1. (d) : BOX친 영역을 하나의 object로 생각할 수 있지만 보편적으로 적용되는 방식은 아니다.
1. (e) : 가장 일반적인 방법으로써 INTERVIEW  weak 객체를 만들고, 이는 두 개의 owner entity를 가진다. 그리고 이 객체가 잡오퍼 관계를 갖는다. 

