---
title: "[DB System] 2장 계속 2"
excerpt: "Page 77 ~ 84 "
date: 2019-09-11
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

## 2.5  Centralized and Client/Server Architectures for DBMSs

### 2.5.1 Centralized DBMSs Architecture

![Figure 2.5]()  

하나의 컴퓨터 안에 DBMS, OS 모두 깔려있고 사용자는 이것을 사용하기만 하는 것을 Centrialized라고 함. 모든 유저는 단말기를 사용해서 중앙의 DBMS를 사용하는 것.

### 2.5.2 Basic Client/Server Architectures

서버들이 수행하는 역할을, 하나의 서버가 하나의 역할만 하도록 구분하게 되었다. File Servers, Printer Servers, Web Servers, DB Servers. Client와 각각의 역할을 하는 서버들을 network를 통해서 연결  : Two tier 아키텍쳐. 각 서버마다 클라이언트, DB, 서버 역할을 할 수도 안할 수도 있다. 최소 한 개의 역할은 하는 것 같다.    

![Figure 2.6]()

### 2.5.3 Two-Tier Client/Server Architectures for DBMSs

In relational database management systems (RDBMSs), many of which started as centralized systems, the system components that were first moved to the client side were the user interface and application programs. Because SQL (see Chapters 6 and 7) provided a standard language for RDBMSs, this created a logical dividing point between client and server. Hence, the query and transaction functionality related to SQL processing remained on the server side. In such an architecture, the server is often called a query server or transaction server because it provides these two functionalities. In an RDBMS, the server is also often called an SQL server.  

## Logical two-tire client/server architecture

택시타고 일 끝날 때까지 택시 기다리게 하기.  

Logical two-tire client/server architecture를 사용하다보면 각 서버마다 서로 다른 종류의 DBMS를 사용할 수도 있다. ORACLE/DB2/MSSQL 등등 사용자가 특정 서버의 DB에 연결하기 위해서는 서로 다른 환경을 조작할 수 있어야 한다. 이런 문제점을 해결하기 위해서 중간에 표준 interface를 추가한다. 사용자는 표준 interface만 알고 요청을 날리고, 이 interface가 oracle/DB2/MSSQL 등의 명령어로 convertion해서 query를 날려줄 수 있다. 사용자는 표준 interface만 알고있으면 되는 것이다. 이 표준 interface가 `ODBC`이다.  

- ODBC : 모든 유저는 ODBC로 access하면 된다. DB는 자신의 요청을 ODBC API로 받아와서 처리해준다. C/C++를 위한 환경
- JDBC : Java를 지원하는 ODBC의 기능 지원

### 2.5.4  Three-Tier and n-Tier Architectures for Web Applications

일 끝나고 택시 다시 부르고 왔다 갔다 시간만 돈 내기.  

수강신청할 때 DB에 동시에 접근할 수 있는 인원이 3명일 때, 3명이 각자의 권한을 놓을 때까지 나머지 사람들은 queue에서 기다리고 있어야 한다. 그런데 수강신청히 1초에 3000명 정도 로그인을 하는데 우리 학교 DB는 16~32명이 DB에 동시에 접근할 수 있다. 나머지는 모두 waiting을 하고 있다. 16~32명도 화면 띄우고 고민하다가 마지막 0.1초에만 DB에 직접 Access를 한다. 이를 해결하기 위해서 수강신청을 하는 프로그램과 DB에 Access 접근하는 프로그램을 분리한다. 수강신청을 하는 동안에는 DB를 Access하는 권한을 주지 않는다. 따라서 많은 유저가 수강신청 페이지에 Login을 할 수 있는 것이다.  

**어떻게 3가지로 나눠지는지 이름 외우기** 

client 입장에서는 GUI로 Web interface를 볼 수 있다. 웹 수강신청 페지이의 Application programs가 있다. 수강신청 페이지에서 Database에 접근할 때 Database management System을 사용한다. 활용시간 100 중에 Data management system을 사용하는 시간은 1정도.

Presentation Layer, Business Logic Layer, DB Layer 중 가은데 것을 Business Rule이라고 부르기도 하는 듯하다.  

- N-Tier Arachitectures

Presentation 앞에 Login만 처리하는 Layer를 하나 더 추가해서 Application이 터지지 않도록 한다. 

## 2.6  Classification of Database Management Systems

DBMS를 구분 분류하는 기준  

- Data Model
  - 객체지향 DBMS : 객체지향 모델을 지원하는 DBMS
- The number of users : 멀티 유저를 지원하는가 안하는가?
  - single-user systems or not
- The number of sites : DB가 얼마나 흩어져있는가?
  - centralized / distributed DBMS
  - homogeneous / heterogeneous DBMS : 동질형/이질형(여러개의 DB에 대해서 각 DB를 구성하는 모듈이 서로 다른 경우 ORACLE/MSSQL/DB2등으로 다른 경우)
  - autonomous하고 기존에 있는 DB에 접속할 수 있게 도와주는 Federated DBMS 연방 DBMS가 있다. Federated DBMS는 교육부가 여러 곳에 흩어져있는 DB를 모은 것이고 이 곳에 접근하면 모든 정보를 얻을 수 있다. distributed DB는 원래 하나를 여러 상황상 여러 나라에 흩어놓은 것이고, Federated DBMS는 원래 다른 것을 하나의 DBMS에서 볼 수 있도록 하는 차이가 있다.  
- Cost
  - 꽁짜부터 수백만 Dollar짜리. 돈 내는 방법도 여러가지. 
- The types of access payh options?
- Purpose
  - 범용이나 special purpose냐.

## History of Data Models

정보 검색에 대한 내용은 참고 사항으로만 보기!!  

Relational 형태가 아직까지 쓰이고 이다.라고만 설명하고 넘어감.

# Chater 5 : The Relational Data Model and Relational Database Constraints

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


