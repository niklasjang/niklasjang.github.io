---
title: "[DB] Chapter 7.1절  "
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

# More SQL: Complex Queries, Triggers, Views, and Schema Modification

이 장에서는 `relational databases`를 귀한 `SQL language`의 advancd 특성을 서술합니다. 

## 7.1 More Complex SQL Retrieval Queries

### 7.1.1. Comparisons Invloving Null and Three-Valued Logic

먼저 `NULL`이 무엇인지 알아보겠습니다. `NULL`은 a missing value라는 의미를 가지고 있는데 보다 구체적으로는 아래의 3개 중 하나의 의미를 가지는 것으로 생각할 수 있습니다. 

1. `UNKNOWN` : 존재하기는 하는데 무엇인지 모르는 값. 예를 들어 어떤 사람의 생일을 모를 때 `NULL`으로 생각할 수도 있고, 집 전화가 있는지 없는지 상관없이 집전화 번호를 모른다고 말할 수 있습니다.
2. "value not available" : 존재는 하지만 database에서 보여주고 싶지 않은 정보일 떄 이 값을 not vailable 상태로 만듭니다. 이때는 저장되어 있지만 사용자응 이 값을 볼 수 없습니다.
3. "value not applicable" : 특정 tuple에 대해서 적용되지 않거나 정의되지가 않는 경우를 말합니다. 예를 들어 고졸인 사람에게 대학 전공이라는 값은 적용되지도 정의도지도 않습니다.

`NULL`이 위 세 가지 중 어떤 의미를 가지는 지는 정확하게 알 수 없습니다. 다만 database를 이해할 때 `NULL`이 상당히 자주 나오는 요소이기 때문에 한 번 듣고 넘어가는 것은 의미가 있다고 생각합니다. 그리고 각각의 `NULL`은 여러 개의 `NULL`이 있을 때도 개별적으로 취급됩니다. 같은 table에서도 3개 중 어떤 의미로 쓰인 것인지 다를 수 있습니다.  

만약 `NULL`을 포함하는 record를 사용해서 comparison 연산을 진행할 때 `NULL`에 따라서 결과가 달라질 수 있기 때문에 true/false/`UNKNON` 3개의 값에 대한 진리표를 정의했습니다.  

![database-1](/assets/images/database/database-1.jpg)  
//TODO Table 7.1 페이지 208

SQL은 attribut가 `NULL`인지를 확인하는 방법을 제공하는데 `=`나 `<>`보다는 `IS`와 `IS NOT`을 사용합니다. 왜냐하면 각각의 `NULL`이 개별적인 값으로 생각되기 때문에 equality를 확인하는 표현은 적합하지 않기 때문입니다. 또한 같은 이유로 `JOIN` 연산에서도 주목할만한 점이 생깁니다. 만약 `JOIN` 연산에 해당하는 attribute의 값이 `NULL`인 tuple이 있다면 해당 tuple은 `JOIN` 연산의 result에서 제외됩니다. `JOIN` 연산은 같은 값을 가지는 attribute를 찾아서 연결하지만 `NULL`은 개별적인 값으로 생각되기 때문입니다.  

```sql
//Query 18 : 상관을 가지지 않는 모든 직원들의 이름을 찾아라
SELECT      Fname, Lname
FROM        EMPLOYEE
WHERE       Super_ssn IS NULL;
```

### 7.1.2 Nested Queries, Tuples, and Set/Multiset Comparisons

DB에서 데이터를 fetch하고 다시 comparison 연산에 사용하는 쿼리들이 있습니다. 이러한 쿼리들은 `nested queries`로 공식처럼 사용할 수 있습니다. `nested queries`는 하나의 쿼리 안에 또 다른 `select-from-where` 블럭이 들어있는 쿼리를 말합니다. 이때 밖의 쿼리는 `outer query`라고 부르고 안에 있는 쿼리는 `nested queries`라고 부릅니다. `nested queries`는 `SELECT`, `FROM` , `WHERE` 어디서든 사용될 수 있다는 것을 기억해야 합니다.  

```
Query 4. Make a list of all project numbers for projects that involve an employee whose last name is ‘Smith’, either as a worker or as a manager of the department that controls the project.
```

다음과 같은 쿼리를 6.3절에서 다음과 같이 만들었습니다. 

```sql
Q4A: 
(SELECT     DISTINCT Pnumber
 FROM       PROJECT, DEPARTMENT, EMPLOYEE 
 WHERE      Dnum = Dnumber AND 
            Mgr_ssn = Ssn  AND 
            Lname = ‘Smith’ )
  UNION
(SELECT     DISTINCT Pnumber 
 FROM       PROJECT, WORKS_ON, EMPLOYEE 
 WHERE      Pnumber = Pno AND
            Essn = Ssn    AND 
            Lname = ‘Smith’ );
```

이와 같은 쿼리를 `nested queries`로 만들면 아래와 같이 작성할 수 있습니다. 첫 번째 `nested queries`는 해당 프로젝트를 관리하고 있는 부서를 찾고, 그 부서 매니저의 SSN을 직원들의 SSN과 비교하는 모습입니다. 두 번째 `nested queries`는 WORKS_ON에서 어느 Pno에서 어떤 사람이 일을 했는지를 가지고 쿼리문을 작성했습니다. 

```sql
SELECT      DISTINCT Pnumber 
FROM        PROJECT 
WHERE       Pnumber IN 
            (SELECT     Pnumber 
             FROM       PROJECT, DEPARTMENT, EMPLOYEE 
             WHERE      Dnum = Dnumber AND 
                        Mgr_ssn = Ssn  AND 
                        Lname = ‘Smith’ ) 
            OR 
            Pnumber IN 
            (SELECT     Pno 
             FROM       WORKS_ON, EMPLOYEE 
             WHERE      Essn = Ssn AND 
                        Lname = ‘Smith’ );
```

정리해보면 첫 번째 `nested queries`는 프로젝트를 관리하는 부서를 먼저 찾고, 그 부서 매니저의 SSN을 찾아야 하기 때문에 DEPARTMENT table을 사용했고, 두 번째에서는 WORKS_ON에서 어떤 프로젝트에서 어떤 사람이 일을 했는지에 대한 정보가 들어있기 때문에 바로 SSN과의 비교를 진행했습니다.  

`nested queries`는 일반적으로 하나의 값이 아닌 table을 return합니다. 위와 같이 Pnumber 또는 Pno 하나의 값이나 tuple을 return 하도록 짜는 경우에는 `IS`를 사용해도 됩니다.  

SQL은 comparison 연산에 대해서 tuple을 사용하는 것을 허용합니다.  

```sql
SELECT      DISTINCT Essn 
FROM        WORKS_ON
WHERE       (Pno, Hours) IN 
            (SELECT     Pno, Hours 
             FROM       WORKS_ON 
             WHERE      Essn = '123456789');
```

(Pno, Hours) 튜플은 nested 쿼리의 결과로 나오는 테이블과 비교해서 같은 (Pno, Hours)를 가지는 tuple에 대해서만 Essn을 출력할 것입니다. `IN` 뿐만 아니라 `>,>=,<,<=, <>` 그리고 Keyworkd `ALL`, `ANY`를 사용해서 comparison 연산을 진행할 수도 있습니다.  

`nested queries`를 진행할 때 같은 clause에 대해서 table 이름이 명시되지 않은 `unqualified attribute`의 경우 `innernost nested query`의 규칙에 따라서 가장 안쪽의 table의 attribute를 refer to 하도록 되어 있습니다. 만약 바깥의 table을 reference 하고 싶다면 `alias` `AS`를 사용해서 table 의 이름을 명시하고 사용해야 합니다.  

### 7.1.3 Correlated Nested Queries

WHERE 절의 inter query에서 outer query의 attribute를 refer to하는 모든 경우를 `correlated`라고 부릅니다. `correlated`는 outer query에 있는 모든 tuple에 대해서 한 번씩 inter query가 수행되는 것으로 이해할 수 있습니다. 

### 7.1.4 The EXISTS and UNIQUE Functions in SQL

EXIST와 NOT EXISTS의 사용법을 확인할 수 있습니다.  

```sql
SELECT      E.Fname, E.Lname 
FROM        EMPLOYEE AS E 
WHERE       EXISTS (SELECT      * 
                    FROM        DEPENDENT AS D 
                    WHERE       E.Ssn = D.Essn AND 
                                E.Sex = D.Sex  AND 
                                E.Fname = D.Dependent_name);
```

```sql
//Query 6. Retrieve the names of employees who have no dependents.
Q6: 

SELECT      Fname, Lname 
FROM        EMPLOYEE 
WHERE       NOT EXISTS (SELECT * 
                        FROM DEPENDENT 
                        WHERE Ssn = Essn );
```

```sql
//Query 7. List the names of managers who have at least one dependent.
Q7: 

SELECT      Fname, Lname 
FROM        EMPLOYEE 
WHERE       EXISTS (SELECT      * 
                    FROM        DEPENDENT 
                    WHERE        Ssn = Essn ) 
            AND
            EXISTS (SELECT      * 
                    FROM        DEPARTMENT 
                    WHERE       Ssn = Mgr_ssn );
```  

아래의 쿼리는 부서 5가 관리하는 모든 프로젝트에서 일하는 사람을 골라라입니다. 그래서 부서 5가 관리하는 모든 프로젝트에서 특정 사람이 일한 프로젝트를 모두 제외했을 때, 빈 결과가 나온다면 그 사람을 선택합니다. 왜냐하면 그 사람은 부서 5가 관리하는 모든 프로젝트를 했거나 다른 프로젝트까지 추가로한 사람이기 때문입니다. 이를 위해서 먼저 부터 5가 관리하는 프로젝트의 이름을 찾습니다. 이 때 outer query에서 돌고 있는 EMPLYEE tule의 ssn을 사용해서 '지금 (loop에서) 관심있는 사람이 일한 정보를 WORKS_ON에서 찾습니다. 그리고 이 부분의 PNO를 tuple로 만듭니다. 만약에 이렇게 만든 tuple을 제외했을 때 결과라 NOT EXISTS라면, 부터 5가 관리하는 모든 프로젝트에 참여한 것이므로 Fname과 Lname을 출력합니다.  

예를 들어서 부서 5가 관리하는 프로젝트 번호가 1,2,3,4,5일 때 WORKS_ON에 현재 보고 있는 사람이 1,2,3에만 일을 했다고 나와있다면 {4,5}가 nested query에서 출력되고 이 사람은 조건을 만족하지 못하는 사람이 됩니다. 반면에 WORKS_ON에 1,2,3,4,5,6을 일했다고 나와있다면 nest query는 아무것도 출력하지 않고 적절한 사람을 찾은 것이 됩니다.  

```sql
//The query Q3: Retrieve the name of each employee who works on all the projects controlled by department number 5 
: 부서 5가 관리하는 모든 프로젝트에서 일하는 사람을 골라라

not work on. 
Q3A: 
SELECT  Fname, Lname 
FROM    EMPLOYEE 
WHERE   NOT EXISTS ( (  SELECT    Pnumber 
                        FROM      PROJECT 
                        WHERE     Dnum = 5) 
                        EXCEPT ( SELECT  Pno 
                                FROM    WORKS_ON 
                                WHERE   Ssn = Essn) );
```

아래의 쿼리는 직원을 선택하는데 그 직원이 부서 5에서 관리하는 어떤 프로젝트도 안하지 않도록 선택해야 합니다. 즉  Q3A 쿼리문과 같은 결과를 냅니다.  자세한 설명은 //TODO !


```sql
//Reformed-query :  Select each employee such that there does not exist a project controlled by department 5 that the employee does not work on. 
Q3B: 

SELECT  Lname, Fname 
FROM    EMPLOYEE 
WHERE   NOT EXISTS ( SELECT  * 
                     FROM  WORKS_ON B 
                     WHERE (B.Pno IN (  SELECT  Pnumber 
                                        FROM PROJECT 
                                        WHERE Dnum = 5 ) 
                            AND
                            NOT EXISTS  ( SELECT * 
                                          FROM WORKS_ON C 
                                          WHERE C.Essn = Ssn AND 
                                                C.Pno = B.Pno )));
```

특정 사람을 찾을 때, WORKS_ON 종이에서 부서 5(C.Pno = B.Pno)가 관리하는 프로젝트를 그 사람(C.Essn = Ssn )이 전혀 하지 않았다면(NOT EXISTS) 

### 7.1.5 Explicit Sets and Renaming in SQL

nested 쿼리문을 아래와 같이 직접 집합으로 표현할 수도 있습니다.  

```sql
//Query 17. Retrieve the Social Security numbers of all employees who work on project numbers 1, 2, or 3.
Q17: 

SELECT       DISTINCT Essn 
FROM         WORKS_ON 
WHERE        Pno IN (1, 2, 3);
```

### 7.1.6 Joined Tables in SQL and Outer Joins

`joined table`과 `joined relaion`은 사용자들에게 `FROM` 절에서 join operation의 결과로 table을 얻을 수 있도록 하기 위해서 SQL에 통합되었습니다. 이것은 WHERE 절에서 모든 SELECT과 JOIN을 모두 진행하는 것이 복잡하기 때문에 사용자들의 이해를 돕기 위한 목적이 있습니다. 

```sql
Q1A: 
SELECT      Fname, Lname, Address
FROM        (EMPLOYEE JOIN DEPARTMENT ON Dno = Dnumber) 
WHERE       Dname = ‘Research’;
```

위의 쿼리는 FROM 절에서 하나의 joined 된 테이블을 구성합니다. 이 테이블의 모든 attribute는 EMPLOYEE에 있는 모든 attribute에 DEPARTMENT의 모든 attribute가 따라오는 형태입니다. 이러한 기본적인 형태의 JOIN 말고도 `NATURAL JOIN`이나 `OUTER JOIN`과 같은 연산을 지원합니다.  

`NATURAL JOIN`은 명시적인 `JOIN CONDITION` 제공하지 않습니다. 암묵적으로 같은 이름을 가지는 attribute를 찾아서 적절하게 join을 해줍니다. 동일한 이름을 가지는 attribute들은 각각 한 번씩만 result table에 등장합니다.  

![database-2](/assets/images/database/database-2.jpg)
//태블릿 사진 옮겨오기 TODO

만약 두 테이블을 NATURAL JOIN 하고 싶은데 두 테이블에 같은 이름의 attribute가 없다면 아래와 같이 renaming을 하고 진행하면 됩니다. 암묵적으로 단 하나의 Dno attribute만 같기 때문에 이 attribute를 기준으로 NATURAL JOIN이 이루어 집니다.  

```sql
Q1B: 
SELECT      Fname, Lname, Address
FROM        (EMPLOYEE NATURAL JOIN
            (DEPARTMENT AS DEPT (Dname, Dno, Mssn, Msdate))) 
WHERE       Dname = ‘Research’;
```

기본적인 형태의 defulat JOIN은 `inner JOIN`이라고 부릅니다. 아래의 기본적인 연산은 충분히 직관적입니다. 아래와 같은 연산의 경우 Super_ssn을 가진 employee에 대해서만 결과에 포함됩니다. super_ssn이 NULL인 경우는 포함되지 않습니다. 만약 모든 employee가 포함되기를 바란다면 `outer join`을 사용해야합니다. `outer join`에는 여러가지 방법이 있는데 바로 위에서 보았던 그림에서 다양한 형태의 `outer join`이 알기 쉽게 나와있습니다. 실제로 쿼리문을 진행하는 것은 아래와 같이 합니다.  

```sql
Q8A: 
SELECT      E.Lname AS Employee_name, S.Lname AS Supervisor_name 
FROM        EMPLOYEE AS E, EMPLOYEE AS S
WHERE       E.Super_ssn = S.Ssn;
```

```sql
Q8B: 
SELECT      E.Lname AS Employee_name, S.Lname AS Supervisor_name
FROM        (EMPLOYEE AS E LEFT OUTER JOIN EMPLOYEE AS S ON E.Super_ssn = S.Ssn);
```

`LEFT`, `RIGHT`, `FULL`의 세 가지 방식에 더해서 만약 같은 이름의 attribute가 있다면 NATURAL JOIN을 진행하는 것을 명시적으로 `NATURAL LEFT OUTER JOIN` 이렇게 나타낼 수도 있습니다.  

그리고 이미 JOIN된 table을 활용해서 JOIN을 하는 것이 가능하기 때문에 N개의 Table을 JOIN할 수도 있습니다.  

```sql
Q2A: 
SELECT      Pnumber, Dnum, Lname, Address, Bdate
FROM        ((PROJECT JOIN DEPARTMENT ON Dnum = Dnumber) 
            JOIN EMPLOYEE ON Mgr_ssn = Ssn) 
WHERE       Plocation = ‘Stafford’;
```

### 7.1.7 Aggregate Functions in SQL

`Aggregate Functions`은 여러 개의 tuple들서 요약된 정보를 하나의 tuple로 정리하기 위해서 사용됩니다. `Grouping`은 요약을 진행하기 전에 작은 그룹을 만들기 위해서 사용됩니다. `Aggregate Functions`의 종류로는 `COUNT`, `SUM`, `MAX`, `MIN`, `AVG`가 있습니다.  

`COUNT` 함수는 쿼리에서 명시된 tuple과 value의 갯수를 return 합니다. `SUM`, `MAX`, `MIN`, `AVG`는 set과 multiset 모두에 적용될 수 있고 각자 이름에 맞는 return 값을 가집니다.  

```sql
//Q19: 가장 기본적인 형태
SELECT SUM (Salary), MAX (Salary), MIN (Salary), AVG (Salary) 
FROM EMPLOYEE;
```

```sql
//Q19A:  alias를 사용하는 형태
SELECT  SUM (Salary) AS Total_Sal, MAX (Salary) AS Highest_Sal, 
        MIN (Salary) AS Lowest_Sal, AVG (Salary) AS Average_Sal
FROM EMPLOYEE;
```

```sql
Query 20. Find the sum of the salaries of all employees of the ‘Research’ department, as well as the maximum salary, the minimum salary, and the average 
salary in this department.  

Q20: 
SELECT      SUM (Salary), MAX (Salary), MIN (Salary), AVG (Salary) 
FROM        (EMPLOYEE JOIN DEPARTMENT ON Dno = Dnumber) 
WHERE       Dname = ‘Research’;
```

```sql
Queries 21 and 22. Retrieve the total number of employees in the company (Q21) and the number of employees in the ‘Research’ department (Q22).
Q21: 

SELECT COUNT (*) 
FROM EMPLOYEE;

Q22: 

SELECT COUNT (*)
FROM EMPLOYEE, DEPARTMENT
WHERE DNO = DNUMBER AND DNAME = ‘Research’;
```

COUNT(\*)의 \*는 table의 rows(tuples)를 나타내며, 따라서 COUNT(\*)은 쿼리 결과에 들어있는 tuples의 갯수를 return 합니다. 또는 아래와 같은 방법으로 column에서 갯수를 세는 연산도 가능합니다.  

```sql
Query 23. Count the number of distinct salary values in the database.
Q23: 

SELECT COUNT (DISTINCT Salary) 
FROM EMPLOYEE;
```

만약 DISTINCT 키워드를 사용하지 않으면 중복된 값이 포함되서 count가 됩니다. 주의할 점은 만약 column에서 NULL의 값을 가지는 것은 count하지 않습니다. 일반적으로 `Aggregate Functions`에서는 NULL 값이 버려지고 남은 값에 대해서 연산이 진행됩니다. 따라서 `COUNT(SALARY)`와 `AVG(SALARY)`를 진행할 때 count는 4개의 tuple에 대해서, MAX는 NULL 값이 하나 포함되어 있어서 3개의 AVG를 출력할 수도 있습니다. 이 때 몇 개의 값을 기반으로 `Aggregate Functions`를 진행했는지에 대해서는 명시적으로 출력되지 않습니다. 하지만 `COUNT()`는 그 값이 NULL이어도 tuple의 갯수를 세는데는 문제가 없기 때문에 NULL을 버리지 않고 count 합니다. 만약 모든 값이 NULL일 때, MAX MIN AVG는 NULL을 return하고 COUNT는 empty collection of values에 대해서 연산을 해야할 때는 `0`을 return 합니다.  

```sql
Q5: 
SELECT      Lname, Fname 
FROM        EMPLOYEE 
WHERE       ( SELECT COUNT (*) 
            FROM  DEPENDENT 
            WHERE Ssn = Essn ) > =  2;
```

### 7.1.8 Grouping: The GROUP BY and HAVING Clauses

`그룹`은 서로 겹치지 않는 수분 집합이라고 생각하면 됩니다. `Aggregate Functions`를 진행할 때 특정 그룹에 대해서만 진행하고 싶어서 그룹을 나눕니다.  

```sql
Query 24. For each department, retrieve the department number, the number of employees in the department, and their average salary.
Q24: 

SELECT       Dno, COUNT (*), AVG (Salary) 
FROM         EMPLOYEE 
GROUP BY     Dno;
```

위의 쿼리는 EMPLOYEE 전체에 대해서 `Aggregate Functions`를 진행하지 않고 Dno에 따라서 여러 번 진행한 후에 이를 결과로 그려줍니다. 따라서 여러 번 `Aggregate Functions`된 결과들이 어떤 기준에 따라서 여러번 수행된 것인지 명시하기 위해서 `GROUP BY`에 field로 적은 attribute는 반드시 `SELECT`에 포함되어야 합니다.  

만약에 `GROUP BY` 필드의 값이 NULL인 경우, 이 NULL들은 각각 독립적인 값으로 여겨져서 NULL을 포함하는 각 tuple에 대해서 결과가 출력됩니다.  

```sql
Query 25. For each project, retrieve the project number, the project name, and the number of employees who work on that project.
Q25: 

SELECT      Pnumber, Pname, COUNT (*) 
FROM        PROJECT, WORKS_ON 
WHERE       Pnumber = Pno 
GROUP BY    Pnumber, Pname;
```

//TODO
확인 필요한 부분!! : GROUP BY의 field를 SELECT에 안적을 수 없듯이, 반대로 SELECT에 있는 field는 반드시 GROUP BY에 들어가야한다? 안그래도 될 것같은데 뭐가 맞지?  

만약 여러 그룹으로 나눈 뒤 특정한 조건에 만족하는 그룹에 대해서만 `Aggregate Functions`를 적용하고 싶은데 이 떈 `HAVINGS`를 사용합니다.  

```sql
Query 26. For each project on which more than two employees work, retrieve the project number, the project name, and the number of employees who work on the project.
Q26: 

SELECT      Pnumber, Pname, COUNT (*) 
FROM        PROJECT, WORKS_ON 
WHERE       Pnumber = Pno 
GROUP BY    Pnumber, Pname 
HAVING      COUNT (*) > 2;
```

```sql
Query 27. For each project, retrieve the project number, the project name, and the number of employees from department 5 who work on the project.
Q27: 
SELECT      Pnumber, Pname, COUNT (*)
FROM        PROJECT, WORKS_ON, EMPLOYEE
WHERE       Pnumber = Pno AND Ssn = Essn AND Dno = 5 
GROUP BY    Pnumber, Pname;
```

주의할 사항!!  

```sql
//query  we want to count the total number of employees whose salaries exceed $40,000 in each department, but only for departments where more than five employees work. 
//잘못된 쿼리
SELECT      Dno, COUNT (*) 
FROM        EMPLOYEE 
WHERE       Salary>40000 
GROUP BY    Dno
HAVING      COUNT (*) > 5;
```

WHERE 절이 HAVING 절보다 먼저 수행되기 때문에 Salary가 4만보다 높은 사람이 추려졌을 때의 결과가 5보다 작아서 잘못된 결과를 가져올 수 있습니다. 

```sql
//Query 28. For each department that has more than five employees, retrieve the department number and the number of its employees who are making more than $40,000.
Q28: 
SELECT      Dno, COUNT (*) 
FROM        EMPLOYEE 
WHERE       Salary>40000 AND 
            Dno IN ( SELECT Dno 
                     FROM EMPLOYEE
                     GROUP BY Dno
                     HAVING COUNT (*) > 5)
GROUP BY Dno;
```

### 7.1.9 Other SQL Constructs: WITH and CASE

`WITH` 키워드는 반복되는 코드를 함수로 작성하는 것과 같은 의미와 효과를 가진다고 생각하면 됩니다. 그리고 `WITH` 키워드는 ;를 만나서 해당 쿼리가 끝나면 사라지는 특성을 가지고 있습니다. 그리고 `CASE`는 if else의 기능을 제공하는 것으로 생각할 수 있습니다.  

```sql
Q28′: 
WITH  BIGDEPTS (Dno) AS 
            ( SELECT  Dno 
              FROM   EMPLOYEE 
              GROUP BY   Dno 
              HAVING   COUNT (*) > 5) 
SELECT  Dno, COUNT (*) 
FROM   EMPLOYEE 
WHERE  Salary>40000 AND Dno IN BIGDEPTS 
GROUP BY  Dno;
```

```sql
U6′: 
UPDATE EMPLOYEE
SET Salary  = 
CASE    WHEN Dno = 5 THEN Salary + 2000 
        WHEN Dno = 4 THEN Salary + 1500 
        WHEN Dno = 1 THEN Salary + 3000 
        ELSE Salary + 0 ;
```

### 7.1.10 Recursive Queries in SQL

recursive SQL이 필요하면 교재를 천천히 읽어봅니다. 이런 것이 있다고만 알고 넘어가기로 합니다.  

1. 초기 조건 : UNION 이전의 SELECT FROM 문
2. 나중 연산 : SELECT FROM WHERE 조건
3. 다음 loop 에서는 초기 조건 = 초기 조건 UNION 나중 연산
4. 적절한 상황까지 계속 recursive 

```sql
Q29:   
WITH RECURSIVE SUP_EMP (SupSsn, EmpSsn) AS 
  ( SELECT SupervisorSsn, Ssn 
    FROM EMPLOYEE 
    UNION 
    SELECT E.Ssn, S.SupSsn 
    FROM EMPLOYEE AS E, SUP_EMP AS S 
    WHERE E.SupervisorSsn = S.EmpSsn) 
  SELECT*
  FROM SUP_EMP;
```

