---
title: "[DB] Chapter 3 Data Modeling Using the Entity-Relationship Model"
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

# Chapter 3 Data Modeling Using the Entity-Relationship Model

## Using High-Level Conceptual Data Models for Database Design

data model의 개념에 따라서 나눈 구분  

| types of concepts | 같은 뜻 | 의미 |
|:--------|:--------|:--------|
|High Level data model| Conceptual data model| `entity`, `attribute`, `relationship`의 개념 사용 | 
|Representational data model| Implementation data model| Relational Data Model, Network and hierarchical Model, OO Models .. etc |
|Low Level data model| Physical data model| recored format, recored ordering, access path의 개념 사용|

database를 3개의 layer로 나눈 아키텍쳐  

| level | shema | view | 의미 | 
|:--------|:--------|:--------|:--------|
|External level| external schema | Individual User View| 특정 유저 그룹이 관심있는 영역만을 묘사하고 나머지는 숨김.|
|Conceptual level| conceptual schema | Community(Organization) User View| 사용자 커뮤니티를 위한 전체 DB의 구조를 묘사. entity, data types,  relationships, user operations, constraints를 묘사하는데 집중 |
|internal level| internal schema| Storage View| database의 물리적인 저장 구조를 묘사 |

database design 대략적인 프로세스

- data model의 S,O,C가 명시된 뒤에 이를 만족하는 database를 설계해야하기 때문에 data model의 정의가 우선적이다.

1. 요구사항 수집 및 분석
1. conceptual design
1. logical design or data model mapping
1. physical design

![3](/assets/images/database/3.jpg)  

database designd의 자세한 프로세스

1. 요구사항 수집 및 분석
1. 기능적 요구사항과 데이터 요구사항을 구분
1. 기능적 요구사항 순서

| 순서 | 입력 | 출력 |
|:--------|:--------|:--------|
| 기능 분석 | functinoal requirement | High-level transaction specification(input,output만 명세) | 
| 애플리케이션 프로그램 디자인 | High-level transaction specification | 아키텍쳐 |
| transaction 구현 | 아키텍쳐 | Application Program |

1. 데이터 요구사항 순서

| 순서 | 입력 | 출력 |
|:--------|:--------|:--------|
| conceptual design | database requirement | conceptual schema(of high level data model) | 
| logical design | conceptual schema | logical schema(3-tier 관점에서는 conceptual schema라고 부름) |
| physical design | logical schema | internal schema |

1. **두 가지 요구사항의 상관관계**
  - 기능분석이 이루어지면 기능들의 input, output이 결정된다. 이것들이 결정되면 기능별 사용 빈도를 요추할 수 있고, 이를 통해서 데이터를 물리적으로 저장할 때의 index와 sort의 기준이 정해진다.
  - logical design의 결과 data type이 결정되고, SQL schema가 결정됨. 이를 통해서 JDBC 개발의 아키텍쳐를 설계할 수 있음.

![4](/assets/images/database/4.jpg)  

## Entitiy Relationship Diagram

- 데이터에 어떤 일이 일어나는지는 기록하지 않는다.
- 데이터 자체의 구조에 집중해서 작성한다. 
- high level data model의 한 종류이다. 
- 요구사항 속의 모든 정보를 담는 것을 목표로 한다.
- 각각의 정보는 한 번만 등장한다.
- 추론할 수 있는 정보는 표기하지 않는다.

## ERD와 구분되는 Data flow Diagram 예시

- DFD : 누가 어디에 등록을 하고 싶어한다.
- ERD : 누가 어디게 등록되었다.

- DFD : 사용자는 ATM에서 돈을 인출한다.
- ERD : 현금이 언제 어디에서 인출되었다.

## Entity

- 실제 세계에서 독립적으로 존재하는 것
- 물리적인 존재인 사람, 차, 집 등
- 개념적인 존재인 직업, 회사 등도 가능

## Attribute

- 한 entity를 묘사하는 특정한 성질
- 어떤 값을 가지는 특성(name) : `ATOMIC` or `SIMPLE`
- 어떤 값들의 복합어(first name, last name) : `COMPOSITE` 
- 다수의 값을 가지는 특성(addresses) : `MULTI-VALUED`
- 유추될 수 있는 특성(age from birth day) : `DERIVED`
- 휘발성(`VOLATILE`) 특성 : 비휘발성 용어로 대체하기
- `NULL` value : `값이 존재하긴 하는데 miss된 특성(height, weight)` 또는 `값이 존재하는지 모르는 특성(home phone)`

## Entity Types, Entity Sets

![5](/assets/images/database/5.jpg)  

| 개념 | 의미 | 특징 |
|:--------|:--------|:--------|
|Entity Types 또는 Entity Class| 같은 attribute를 가진 entity 집합 | 같은 구조를 가진 entity의 schema(intension) |
|Entity Instance| 특정 entity의 ocurrence |
|Entitiy Set| 특정 시간에 DB에 저장된 특정 Entity type에 속한 모든 entity들의 집합. entity type의 state(extension)|

## Keys
`

| 개념 | 의미 | 특징 |
|:--------|:--------|:--------|
|Key Attibute 또는 Identifier| Entity type에 속한 특정 Entity 들 사이에 구분되는 값을 가진 attribute | Uniqueness Constraint를 따름. minimal composite key. |

- Minimal Composite Key : composite attribute의 모든 구성요소는 unique한 속성을 갖는 형태로 포함되어야 한다. 즉, 3개의 attribute로 구성된 복합키에서 2개는 distinctive하고 1개는 아니라면 이는 Minimal Composite Key의 조건을 만족하지 않는다. 

## Value Sets

| 개념 | 의미 | 특징 |
|:--------|:--------|:--------|
|Domain| attribute의 value set | 각각의 entity들에게 value set이 할당될 수 있다. | 예를 들어 age의 경우 16~70세까지의 값만 저장될 수 있도록 할 수 있다. | 
| V | entity type E의  attribute A의 value set | |
|A(e)| entity e의 attribute A의 value | |
|P(V)| V의 power set | power set : 멱집합. 주어진 집합의 모든 부분 집합들로 구성된 집합 |
|composite attribute A에 대한 V| P(V1) X P(V2) X P(V3) |

- A : E -> P(V)
  - 해석 : Entity type E가 주어졌을 때, E의 A의 domain은 E의 A의 value set의 power set이다.
  - A가 single attribute면 E의 A의 value set 그 자체일 것이고,
  - A가 composite attrubte면 E의 A의 value set의 power set이다. 

## Relationship, Relationship Type

![6](/assets/images/database/6.jpg)  


- Relationship
  - 특정 Antity type의 attribute가 다른 entity type을 참조하면 이를 relationship이라고 한다. 
  - ERD에서 이러한 참조는 attribute가 아닌 relationship으로 표현되어야 한다.
  - ERD 디자인 초기에는 attribute로 표기했다가, 정재하면서 entity type 사이의 relationship으로 표현된다. 
- Relationship Type
  - N 개의 entity types E1, E2, ..., EN 사이의 relationship type R은 entity types들 사이의 `assocications` 혹은 `relationship set`을 정의한다. 
  - r_{i}는 N개의 entities(e1,e2,e3,...,en)를 연관시키는 relationship instance일 때, R은 r_{i}의 집합이다. 

![7](/assets/images/database/7.jpg)  


## Attribute로서의 Relationship

WORKS FOR라는 relationship을 표현하기 위해서 EMPLOYEE entity는 department를 나타내는 attribute를 가지고, DEPARTMENT entity는 employee를 나타내는 attribute를 갖는다. 만약 이 두 가지 attribute가 모두 존재한다면 이들이 서로 가지는 값은 서로 반대일 것이다. 

## Role Name

| 개념 | 의미 | 특징 |
|:--------|:--------|:--------|
|Role Name| relaionship instance에 대해서 entity type의 특정 entity가 수행하는 역할 | 만약 r에 참여하는 모든 entity가 다른 경우 각각의 entity type name은 role의 이름으로 사용될 수 있다. |
|Recursive Relationship| relationship type에 대해서 같은 entity type이 서로 다른 역할로 여러번 나타나는 경우 | SUPERVISION: EMPLOYEE(supervisor) → EMPLOYEE(supervisee)|

## Relationship Type에 대한 Constraints

- relationship set에 참여할 수 있는 entities의 조합을 제한한다.
- relationship이 묘사하는 mini-world의 상황으로부터 constraints가 결정된다.
  - e.g., WORKS_FOR : each employee must work for exactly one department

| Types of relationship constraints | 의미 | 종류 |
|:--------|:--------|:--------|
| CARDINALITY RATIO| 집합의 크기 비율. entity가 참여할 수 있는 relationship instance의 수 | binary relationship type의 경우 1:1, 1:N, M:N |
| PARTICIPATION | entity의 존재는 relatinoship type을 통해 다른 entity와 관련되어 있는지 여부에 의해서 결정된다. | TOTAL, PARTIAL Participation |

## Relationship의 Attribute

- R도 attribute를 가질 수 있다.
- 1 : 1, 1 : N의 경우 R의 attribute가 E의 attribute로 표기될 수 있다.
- 단, 1 : N의 경우 반드시 N에 대응하는 Entity가 R의 attribute를 표현해야 한다. 만약 1에 대응하는 E에 표현한다면 대응하는 반대쪽 N개의 E 중에서 어떤 E의 attribute인지 알 수 없다. 
  - 예를 들어 선생님이 두 명의 학생을 가르칠 때, 과외 시작날짜를 선생님이 가지고 있으면 두 명 중 어떤 학생의 정보인지 알 수 없다. 
- 1 : N의 경우 각각 parent entity와 child entity로 불린다. 
## Weak Entity

![8](/assets/images/database/8.jpg)  

- key attribute를 가지지 않은 entity
- 일반적인 entity는 strong entity하고 칭함.
- weak entity는 일반적으로 partial key를 가진다.

## ID-dependent entity

![25](/assets/images/database/25.jpg)  

- ID-dependent entity는 weak entity이다.
  - 정의 identifier가 다른 entity의 identiier를 포함하는 entity 
  - logical extension 또는 subunit of the parent이다. 
  - id-dependent entity로부터 parent로의 minimum cardinality는 항상 1이다. 

- Non id-dependent entity도 weak entity가 될 수 있다. 
  - parent의 idnetifier가 weak child entity의 identifier에 등장하지 않는 경우

![26](/assets/images/database/26.jpg)  

![24](/assets/images/database/24.jpg)  

| 개념 | 의미|
|:--------|:--------|
|Identifying Entity Type| Weak Entity는 관련된 다른 entity type에 속한 entity에 의해서 Identify된다.|
|Identifying Relationship of Weak entity type| weak entity는 항상 TOTAL PARTICIPATION constraint를 가진다.|



![9](/assets/images/database/9.jpg)  

- weak entity type이 여러 level일 수 있다.
- identifying entity가 여러 개 일 수 있다.
- identifiying relationship이 여러 level일 수 있다.

## Proper Naming of Schema COnstructs

- 작명이 항상 간단하지는 않다.
- 의미를 전달하는 이름을 선택하라
- entity 이름은 명사
- relationship 이름은 동사
- **relationship 이름은 왼쪽->오른쪽, 위쪽->아래 방향으로 읽을 수 있도록 작성하라.**

## Refinement

- 초기에는 attribute로 선언되었다가 정재과정에서 relationship으로 변경될 수 있다.
- 여러 entity type이 공통으로 가지는 attribute는 독립적인 entity type으로 구성될 수 있다.
- 독립적인 entity type을 반대로 공통 attribute로 퍼뜨릴 수 있다.

## ERD (min,max) notation

![10](/assets/images/database/10.jpg)  

- min=0 implies PARTIAL PARTICIPATION
- min>0 implies TOTAL PARTICIPATION.

## UML Class Diagram Notation

- Object modeling methodologies
  1. UML (Unified Modeling Language) 
  2. OMT (Object Modeling Technique)
  - developed mainly for software design

### UML Terminology

| UML Terminology | ERD Terminology|
|:--------|:--------|
| Associations | Relationship Types |
| Links | Relationship Instances | 
| multiplicities | relationship constraints |
| reflexive association | recursive relationship |
### UML

![12](/assets/images/database/12.jpg)  

![11](/assets/images/database/11.jpg)  

- a CLASS is displayed as a box
  - the top section: class name 
  - the middle section: the attributes for individual objects of the class 
  - the last section: operations that can be applied to these objects
- associations은 연관된 entity를 연결하는 것으로 표현
- associations의 attribute는 점선 아래 Box에 표현

### Aggregation

- **Aggregation** : 전체 object와 구성요소 간의 관계를 나타내기 위해서 마름모꼴의 notation을 사용한다. 
to represent a relationship between a whole object and its component 
parts, and it has a distinct diagrammatic notation. 

![13](/assets/images/database/13.jpg)  

| Aggregation | Relationship |
|:--------|:--------|
|구조적 특성은 같음| 구조적 특성은 같음 |
|Enhanced Entity Relationship(EER)에서는 | 둘 다 Relationship으로 표현됨. |

- Bi-directional associations/aggregations : default. 
- Unidirectional associations/aggregations : at only one direction for accessing related objects is needed

### The Operations

- design이 정재된 뒤 더욱 자세한 사항이 요구됨.
- functional description과 sequence diagram을 명시함.

### Weak Entity

![14](/assets/images/database/14.jpg)  

- partial key를 identifying entity의 BOX 밑에 표시한다.
- aggregation을 사용해서 identifying relationship 임을 표시한다. 


## ERD Notation 깊게 알아보기

- chen notatino의 O는 자신이 partial participation인 것을 의미하고
- double/single line는 상대방이 total/partial인 것을 의미한다.

![15](/assets/images/database/15.jpg)  

1. Department는 반드시 한 명의 employee에 의해서 관리 되어야 한다.
2. Employee 중에서 Department를 manage하지 않는 사람도 있다.
3. 따라서 is-managed-by의 관계에서는 Department가 Optional이다. 

![16](/assets/images/database/16.jpg)  

- optional/mandatory가 안쪽에 표기되어 있음에 주목
- 1 : N의 구조는 그대로 1 : N의 관계를 나타냄. 괜히 반대로 생각하지 말기
1. Offices는 0~N 명의 직원이 차지할 수 있다. 
2. 직원은 반드시 하나의 Office를 차지해야한다.
3.  따라서 is-occuied-by 관계에서는 직원이 optional이다.
- Recursive 구조에서 (1,1) : (0,N)임에 주목하자.

![17](/assets/images/database/17.jpg)  

- Chen notation을 (min,max)로 바꿀 때는 복잡하게 생각하지 않고 그대로 변환한다. 
- IE Crow's Notation은 (min, max)를 상대방의 정보를 자신쪽에 쓴다. (아래에서 추가 설명)

### Ternary Relationship

![18](/assets/images/database/18.jpg)

- (1:1:1), (1:1:N), (1:N:N), (N:N:N) 모두 가능하다.
- 일반적으로 1이 명시된 participation의 경우 relationship set의 key의 부분으로써 요구되지 않는다. 
- 아래는 Functional Dependency에 대한 내용으로, N으로 참여하는 entitiy의 key를 알면 나머지 참영 객체를 특정할 수 있다는 의미이다.
  - 함수종속 관계에서 왼쪽의 결정자가 후보키가됨. 1:1:1이라도 한 개체의 식별자만으로는 키가 안됨.  
 
- (1:1:1)
  - 한 명의 기술자가 하나의 프로젝트에서 하나의 노트북을 사용한다.
  - 하나의 노트북은 한 명의 기술자와 하나의 프로젝트에 속한다.
  - **한 명의 기술자는 여러 개의 프로젝트를 진행할 수 있다.(프로젝트 당 노트북은 1개만 사용한다.)**  
  
| Functional Dependency | 충분조건 | 필요조건 |
|:--------|:--------|:--------|
|(1:1:1)|emp-id, project-name| notebook-no|
|(1:1:1)|emp-id, notebook-no| project-name|
|(1:1:1)|project-name, notebook-no| emp-id|
  
- (1:1:N)
  - 한 프로젝트는 여러 직원에게 할당되고, 이 프로젝트는 하나의 장소에서 진행된다.
  - 한 장소에서 직원들은 하나의 프로젝트만 진행한다.
  - **동시에 여러 프로젝트가 진행 중일 수 있다.**  

| Functional Dependency | 충분조건 | 필요조건 |
|:--------|:--------|:--------|
|(1:1:N)|emp-id, location-name| project-name|
|(1:1:N)|emp-id, project-name| location-name|
  
- (1:N:N)
  - 특정 프로젝트에서 일하고 있는 각각의 엔지니어들은 정확하게 한 명의 매니저가 있다.
  - 특정 프로젝트의 매니저는 여러 엔지니어를 관리할 수 있다.
  - 특정 엔지니어의 매니저는 여러 프로젝트의 엔지니어를 관리한다.  

| Functional Dependency | 충분조건 | 필요조건 |
|:--------|:--------|:--------|
|(1:N:N)|emp-id, project-name| manager-id|
  
- (N:N:N)
  - 직원은 많은 스킬을 다양한 프로젝트에서 사용할 수 있다.
  - 각각의 프로젝트는 많은 직원과 스킬을 필요로 한다.  

| Functional Dependency | 충분조건 | 필요조건 |
|:--------|:--------|:--------|
| NONE | NONE | NONE |
  

### Exclusion Constraints

![19](/assets/images/database/19.jpg)  

- 일반적인 관계를 inclusion 관계이다. 동시에 여러 개의 관계가 적용될 수 있다. 
- 하지만 exclusion 관계는 Root와 연관된 여러 entity 중 최대 1개만 Root Entity에 연관될 수 있다.  

## Data Model 깊게 알아보기

- data model은 database design의 계획이자 청사진 역할을 한다.
- 따라서 data model은 database design 보다 일반화/추상화 되어 있다.
- ER Model은 conceptual schema를 표현하기 위한 개념과 그래픽의 집합이다.
- ER Model 버전
  - Original ER Model
  - Extended ER Model
  - Information Engineering(IE) : crow's foot notatoin 사용
  - IDEF1X
  - Unified Modeling Language

## IE Crow's Foot Notatino

헷갈림 주의! 이대로 외우기  

![20](/assets/images/database/20.jpg)  

- 가장 위의 notation
  - Department는 (1,N)개의 Employee를 가진다.
  - Employee는 (0,1)개의 Department를 가진다.
  - 이 때 (min, max) notation은 상대방의 정보를 자신쪽에 쓴다. 
- 두 번째 notation
  - D는 최대 N개의 E를 가진다.
  - D가 가지는 최소 E는 |로 표현되어 있다.
  - D는 (1,N)개의 E를 가진다.ㅏ
  - E는 최대 1개의 D를 가진다.
  - E가 가지는 최소 D는 O로 표현되어 있다.
  - E는 (0,1)개의 D를 가진다.
  - 이 때 (min, max) notation은 상대방의 정보를 자신쪽에 쓴다. 
- 세 번째 notation
  - (min, max) notation은 상대방의 정보를 자신쪽에 쓴다. 
- 네 번째 notation
  - 특이점! =/-로 TOTAL PARTIAL을 표현하는 경우, 이는 상대방의 최소를 자신쪽에 표현하는 것이다.

![21](/assets/images/database/21.jpg)  

위와 똑같은 상황이다.  

- Department는 (1,N)개의 Employee를 가진다.
- Employee는 (0,1)개의 Department를 가진다.
- 이 때 (min, max) notation은 상대방의 정보를 자신쪽에 쓴다.   

### Notation 안보고 정확하게 하기 연습 문제

두 가지 경우에 대해서 모두 연습하기  

![22](/assets/images/database/22.jpg)   

![23](/assets/images/database/23.jpg)   

## Subtype Entity

- supertype entitiy의 special case
- super type : STUDENT
- subtype : UNDERGRADUATE, GRADUATE
- subtype은 super type의 공통 attribute를 모두 가지고, 자신만의 구체적인 attribute를 가진다.
- supertype은 subtype을 구별하기 위한 discriminator attribute를 가진다.

![27](/assets/images/database/27.jpg)  

### Exclusive / Inclusive

- exclusive : supertype이 최대 1개의 subtype과 연관된다.
- inclusive : supertype이 1개 이상의 subtype과 연관된다.

![28](/assets/images/database/28.jpg)  

- subtype IS-A supertype
- **모든 super type의 identifier와 모든 subtype의 identifier는 같아야 한다.**
- subtype은 value-inappropriate NULL을 피하기 위해서 사용된다.  

## ID-Dependent Relationships: The Association Pattern

![29](/assets/images/database/29.jpg)  

## ID-Dependent Relationships: The Archetype/Instance Pattern

IDdependent child entity 가 the physical manifestation(instance) of an abstract,logical parent인 경우

![30](/assets/images/database/30.jpg)  


### Weak entity, Identification dependency, Existence dependency 

- Existence dependency
  -자식 개체는 부모 개체가 없으면 존재할 수 없음 - 의미상 문제
    - 예: 아파트 100동 101호가 있을 때 만약 건물 100동이 철거되면 101호는 더 이상 존재할 수 없음.
- Identification dependency
  - 자식 개체는 부모 개체의 식별자가 있어야 식별 가능함 - 구조적 문제
  - 존재 종속 여부와는 무관하게 부모 개체의 식별자가 자식 개체의 식별자에 포함되어 있는지의 여부만 고려.
  - 그러나 DB에서 식별자가 없는 개체는 존재할 수 없으므로 식별 종속이면 존재 종속이 되어 버림.
- Weak entity
  - 자식 개체가 식별되기 위해서는 반드시 부모 개체의 식별자가 필요한 개체. 즉 부모 개체에 식별 종속이 존재하는 개체이며, 자연히 부
모 개체에 존재 종속이 발생.
- 분류: P(부모개체), C(자식개체) 간의 관계는 다음 4가지 경우가 가능함.
  1. id dependent, existence dependent -> C를 weak entity로 표현 (P의 키가 FK 형태로 C의 식별자 일부로 포함 - 식별 관계)
  2. id dependent, existence independent -> C를 weak entity로 표현 - 의미상으로는 C가 존재 독립이지만 DB에는 부모 P가 없이 존재 할 수 없어 존재 종속이 됨. 식별자가 null이 되므로
ppt 개념 끝. 
  3. id independent, existence dependent -> weak entity 아님. P의 키가 C에 FK로 첨가되나 식별자에는 포함되지 않음. 하지만 not null 제약을 통해 반드시 부모 P가 있어야 DB에 표현할 수 있도록 할 수 있음. 결과 효과는 (1)의 경우와 동일함.
  4. id independent, existence independent -> weak entity 아님. P의 키가 C에 FK로 첨가되나 식별자의 일부도 아니고 null도 허용. C 개체는 P와 무관하게 존재 가능. 
  > 1~4의 표현은 결국 설계자가 설계하고자 하는 Miniworld의 업무 규칙(business rule)에 따라 판단/결정할 사항임.
  
  예시 기반으로 공부할 때 4~5주차 강의자료 아래 부분 보기.  





