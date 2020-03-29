---
title: "[DB] Chapter 7.2절 ~ 7.4절   "
excerpt: "More Complex SQL Retrieval Queries"
date: 2019-10-02
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

## 과제 리뷰

- 주의! table 갯수가 n개이면 `join condition`은 n-1개가 반드시 나와야 합니다.


### 7.1.11 Discussion and Summary of SQL Queries

- query evaluation 순서는 **FROM - WHERE - GROUP BY - HAVING - ORDER BY** 순서이다. `FWGAO`로 외우자. 이렇게 순서가 정해진 것에는 장점과 단점이 존재합니다.
  - 장점 : 각 사용자는 자신이 익숙한 쿼리 방식을 선택할 수 있습니다.
  - 단점 : 특정한 경우에 어떤 방법을 사용하는 것이 좋은지 헷갈릴 수 있다. 또한 같은 결과를 내는 다른 방법이 존재할 것이라는 점입니다. 이상적으로는 같은 결과를 내는 쿼리는 같은 성능을 내야하지만, 현실에서는 쿼리의 방식에 따라서 결과에 차이가 존재합니다.

## 7.2  Specifying Constraints as Assertions and Actions as Triggers

선언적인 제약은 두 가지가 있습니다.  

1. `Assertion` : 쿼리의 결과를 만족하는지 체크합니다.
2. `Trigger` : 특정 event가 일어났을 때 그리고 특정 조건을 만족할 때 수행하는 action을 정의합니다. 

### 7.2.1 Specifying General Constraints as Assertions in SQL

`Assertion` : 쿼리의 결과를 만족하는지 체크합니다.  

```sql
CREATE ASSERTION SALARY_CONSTRAINT 
  CHECK ( NOT EXISTS ( SELECT *
                      FROM    EMPLOYEE E, EMPLOYEE M, DEPARTMENT D
                      WHERE   E.Salary>M.Salary AND 
                              E.Dno = D.Dnumber AND
                              D.Mgr_ssn = M.Ssn ) );
```

위 쿼리는 CHECK NOT EXISTS 이므로 이 결과가 존재하면 안되고, 없기를 기대한다는 뜻입니다.  

`CHECK`와 `constraint condition`은 각각의 attriutes와 domains에 대해서만 명시됩니다. 또는 각각의 tuples에 대해서만 적용됩니다. `CREATE ASSERTINO`과 다른 점은 `CHECK`는 tuples이 `insert`되거나 `update`될 때만 확인된다는 점입니다. 

### 7.2.2 Introduction to Triggers in SQL

`Trigger` : 특정 event가 일어났을 때 그리고 특정 조건을 만족할 때 수행하는 action을 정의합니다. 이를 다른 말로 하면 `ECA`조건을 만족한다고 하는데 `EVENT- CONDITION - ACTION`의 구조를 가지고 있습니다.  

```sql
R5: 
 
CREATE TRIGGER SALARY_VIOLATION                                
BEFORE INSERT OR UPDATE OF SALARY, SUPERVISOR_SSN ON EMPLOYEE  //EVENT
FOR EACH ROW                                                   //CONDITION
  WHEN ( NEW.SALARY > ( SELECT SALARY 
                        FROM EMPLOYEE 
                        WHERE SSN = NEW.SUPERVISOR_SSN ) ) 
INFORM_SUPERVISOR(NEW.Supervisor_ssn, NEW.Ssn );               //ACTION
```

## 7.3 Views (Virtual Tables) in SQL

`view`는 어떻게 데이터를 사용자에게 보여줄지 선택을 하는 과정입니다.  

### 7.3.1 Concept of a View in SQL

SQL에서 `view`란 다른 테이블에서 derived된 하나의 single table을 의미합니다. 다른 테이블들은 이 테이블을 만들기 위한 `base table`이라고 불립니다. 이 `view`는 실제로 물리적으로 따로 저장되는 형태가 아닙니다. `vitrual table`의 특성을 가지면서 암묵적이어서 제공되지 않아도 직관적으로 이해하는데 무리가 없는 정보나 필요없는 정보를 보여주지 않을 수 있습니다.  

`view`를 만들고나면 이런 테이블이 실제로 있다고 생각하고 쿼리문을 작성할 수 있습니다. `base table`에서 정보의 변경이 일어나면 `virtual table`인 `view`에도 데이터의 갱신이 이루어집니다. EMPLOYEE table과 DEPERTMENT table의 정보 중 몇 몇 column을 골라서 A라는 이름으로 `view`를 만들었다고 가정해보겠습니다. 이 떄 base table을 지우면 view table을 사용할 수 없게됩니다. 따라서 table을 지우는 경우는 두 가지로 나뉩니다.

1. DELETE restrict :view가 존재할 때 base table EMPLOYEE 나 DEPERTMENT를 먼저 지울 수 없습니다.
2. DELETE cascade : base table을 지우면 연쇄적으로 삭제가 이루어집니다.  

### 7.3.2 Specification of Views in SQL

```sql
V1: //SELECT의 이름을 그대로 사용하는 경우
CREATE VIEW WORKS_ON1
  AS SELECT Fname, Lname, Pname, Hours 
     FROM EMPLOYEE, PROJECT, WORKS_ON 
     WHERE Ssn = Essn AND Pno = Pnumber;
```

```sql
V2: //새로운 view의 column 이름을 정의하는 경우 
CREATE VIEW DEPT_INFO(Dept_name, No_of_emps, Total_sal) 
  AS SELECT Dname, COUNT (*), SUM (Salary) 
     FROM DEPARTMENT, EMPLOYEE 
     WHERE Dnumber = Dno 
     GROUP BY Dname;
```

### 7.3.3 View Implementation, View Update, and Inline Views

어떻게 view를 만들 것이냐의 문제가 있습니다.

1. `query modification` : 쿼리를 base table에 대한 쿼리로 바꾼다.
2. `view materialization` : 일시적으로 view table을 실제로 만든다. 

두 번째 방법의 경우 일시적으로 만든 테이블과 원래의 테이블 사이엥서 데이터를 syn하는 효율적인 방법을 고안해야 합니다. 
`incremental update`를 활용한 update 방법은 이러한 과정에서 만들어졌습니다. 첫 쿼리에서 임시 테이블을 만들고 일정시간동안 사용을 하지 않게되면 그 테이블을 지우는 방식입니다. syn를 맞추는 방법에는 두 가지가 있습니다.

1. 크게 안바뀌면 그 부분만 고친다.
2. 확 바뀌면 처음부터 다시 그린다.

`view`가 구성되는 방식을 생각해보면 두 가지로 나눌 수 있습니다.

1. Column subset view : 특정 테이블에서 몇몇 column만 골라서 보는 경우입니다.
2. Row subset view : 이거는 base table에서 일부 row만 필터링해서 보는 것으로 생각할 수 있습니다.

1번의 경우 view를 update 하는 것은 view에 포함된 column 중에 `기본키`를 가지고 있는 경우만 가능합니다. 이 테이블이 어떤 테이블과 연결되는 것인지 알 수 있어야 업데이트가 가능하기 때문입니다.  

특정 쿼리가 두 가지 의미로 해석되는 경우가 있을 수 있습니다. 만약 **컴공과 학생의 성적을 B에서 A로 바꾸시오.**라는 쿼리가 있을 때 어떤 테이블에서 변경을 수행할지 분명하지가 않습니다. 두 가지 경우 이상으로 해석될 수 있는 경우에는 결론적으로 쿼리 수행이 불가능합니다.  

그리고 통계함수가 들어가면 더덕울 불가능한 경우가 있습니다.  

### 7.3.4 Views as Authorization Mechanisms

base table에서 특정 view를 만들고 해당 view에 대한 권한만 줄 수 있습니다. 비싼 다이아가 있는지 모르게 만들어서 훔칠 생각도 못하게 만드는 것입니다.  

## 요약

- A view with a single defining table is updatable if the view attributes **contain the primary key** of the base relation
- Views defined on multiple tables using joins are generally **not updatable**
- Views defined ising grouping and aggretate functions **are not updatabble**

`WITH CHECK OPTION`  

This allows the systems to check for `view updatability` and to plan an execution strategy for view updates.



