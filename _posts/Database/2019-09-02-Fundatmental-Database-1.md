---
title: "[DB] Chapter 1 Database and Database Users"
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

# Chapter 1 Database and Database Users

## 개념

| 개념 | 의미 | 
|:--------|:--------|
|`Data`|함축적인 의미를 가진 저장할 수있는 알려진 사실|
|`Database`|관련된 Data의 집합. 또는 Mini-world를 관리하기 위해서 관련된 것끼리 모아놓은 것.| 
|`mini-world` 또는 `Universe of Discourse`|Database에 어떤 Data가 저장되었는지에 대한 Real World의 일부. (학생을 누구는 가르쳐야하는 대상으로 생각하고 누구는 키워야하는 대상으로 생각할 것이다. 이와 같이 대상을 `보는 관점`이 여러가지가 있을 수 있음을 이야하기 하는 것이다. 같은 대상을 사용하는 목적에 따라서 필요한 데이터가 다르다.)|
|`database management system (DBMS)`| 전산화된 database를 생성,유지하기 위한 software package |
|`Database System` | DBMS 소프트웨어와 Data를 함께 지칭하는 용어|

DB는 특정한 목적을 가진 data에 따라서 설계, 운용된다. 즉, data의 특성을 파악한 뒤 이를 반영해서 DB를 설계해야한다. `Metabata`는 Database를 정의하고 설명하는 정보로 `database catalog` 또는 `dictinoary`의 형태로 DBMS에 저장이 된다. 

## DBMS가 제공하는 기능

| DBMS 특징 | 의미 | 
|:--------|:--------|
|Defining|1. 각 파일에 저장된 기록의 `structure`를 특정한다. 2. 각 기록의 데이터 요소의 `type`을 특정한다. 3. 각 데이터 요소의 `constraints`를 특정한다. |
|Constructing|1. `data`를 적절한 파일에 기록한다. 1. 기록들 간의 `relationship`을 기록한다. |
|manipulating|1. `querying` 2. `updating` |
|sharing| |
|protecting| |
|maintaining| |

## Database system이 file system과 다른점

1. database는 스스로 묘사하는 특성을 가진다. (self-describing nature)
1. 프로그램과 data의 분리가 가능하다. 
1. 데이터 추상화 : 데이터가 어떻게 저장되었는지는 숨기고, 사용자에게 conceptual view를 제공한다. 
1. 데이터를 다양한 view로 볼 수 있다.
1. 여러 사용자와 데이터를 공유한다.
1. 여러 사용자의 transaction을 처리한다.

데이터 추상화의 개념에서 사용되는 것이 data model이다. data model은 다음과 같은 logical concepts를 사용한다. data model에 대해서는 chapter 2에서 알아본다.   
1. object
1. object's property
1. object's relationship

## DBMS를 사용하는 사람들

| DBMS를 사용하는 사람들 | 의미 | 
|:--------|:--------|
|actors on the scene|거대한 DB를 매일 사용하는 직업을 가진 사람들|
|workers behind the scene|DB 시스템을 유지하는 일을 하는 사람들. 하지만 DB 자체(저장된 데이터들)에는 큰 관심을 가지지 않는다.|

actors on the scene의 종류는 다음과 같다.
1. DBA(Dababase Administrator)
1. Database Designer : DBA의 직원
1. End User
1. System Analysis
1. Application Programmer

workers behind the scene의 중류는 다음과 같다.
1. DBMS system designer
1. implementers
1. Tool developers
1. Operators
1. Maintainance Personnel

## DBMS를 사용할 때의 이점

1. 데이터를 저장할 때의 불필요한 노력을 줄일 수 있다.
1. 개발과 유지보수의 불필요한 노력을 줄일 수 있다.
1. 권한이 없는 접근을 막을 수 있다.
1. 프로그램이 사용할 데이터가 저장될 공간을 영구적으로 제공한다.
1. 데이터 구조를 표현할 때 필요한 공간을 영구적으로 제공한다.
1. 효과적인 query를 위한 기술을 제공한다.
1. 데이터 복원, 회복 기능을 제공한다.
1. 여러 사용자를 위한 interface를 제공한다.
1. 데이터들 사이의 복잡한 관계를 표현해준다.
1. 무결성 제약을 강제한다.
1. 규칙에 따른 추론과 행동을 가능하게 한다.
1. 표준을 강제함으로써 얻는 잠재력이 있다.
1. 개발 시간을 줄여준다.
1. database 구조에 대한 유연성을 제공한다.
1. 항상 최신의 데이터를 제공할 수 있다.
1. 규모의 경제가 적용된다.

이상 PPT 정리 끝.  

  - `Constructing` the database is the process of storing the data on some storage medium that is controlled by the DBMS.
    - store `data` as a record in the appropriate file
    - store `relationships` among the records
  - `Manipulating` a database includes functions such as querying the database to retrieve specific data, updating the data-base to reflect changes in the miniworld, and generating reports from the data.
  - `Sharing` a database allows **multiple users and programs** to access the database **simultaneously**. a sinle repository is maintained and then is accessed by various users.  
- `Database System` : 전체를 다 합쳐서 `DS`라고 부른다. 
- `query` typically causes some data to be retrieved

DB는 사람, H/W , S/W 모두를 포함한다. DB에서 query를 날리면 DBMS에서 Query를 처리하는 S/w가 있고, 데이터를 저장하는 H/W disk가 있다. 또 이를 가져오는 S/W to Access Stored Data가 있다. 이런 과정은 O/S의 기능을 이용하기도 하고 아니기도 한다.  

Stored Database에는 `Stored Database`와 `Stored Database Definition(Meta-Data)`이 있다. 후자는 데이터가 어떻게 저장되어있는가를 정리해놓은 것이다. 이것이 없다면 데이터를 원하는 방향으로 처리할 수 없을 것이다.  

## 1.3 Characteristics of the Database Approach

만약에 file 처리 시스템을 쓰면 C/C++/Java로 짤 때는 데이터를 이런 언어로 짜야한다. 해당되는 프로그램이 해당되는 파일을 가지고 있다. 특정 파일을 사용하는 사람이 있을 때, 다른 사람의 PC에 저장된 file에 접근할 수 없기 때문에 redendancy in defining and strogin data results in **wasted storage space** and in redundant efforts to maintain common data up-to-date를 가진다. 또한 데이터를 update할 때 데이터가 저장된 모든 app에서 데이터의 update를 해야한다.  


### 1.3.1 Self-Describing Nature of a Database System

database system contains not only the database itself but also a complete definition or description of the database structure and constraints. This definition is stored in the DBMS cata- log, which contains information such as the structure of each file, the type and storage format of each data item, and various constraints on the data. The information stored in the catalog is called meta-data, and it describes the structure of the primary database.  

주목할만한 점은 `NOSQL`은 `meta-data`를 저장하지 않는다는 점이다. 이 부분은 Chapter 24에서 다룬다.  

### 1.3.2  Insulation between Programs and Data, and Data Abstraction

In traditional file processing, the structure of data files is embedded in the application programs, so any changes to the structure of a file may require changing all programs that access that file.  

By contrast, DBMS access programs do not require such changes in most cases. The structure of data files is stored in the DBMS catalog separately from the access programs. We call this property `program-data-independence`.  

In some types of database systems, such as object-oriented and object-relational systems (see Chapter 12), users can define operations on data as part of the database definitions. An operation (also called a function or method) is specified in two parts. The interface (or signature) of an operation includes the operation name and the data types of its arguments (or parameters). The implementation (or method) ofthe operation is specified separately and can be changed without affecting the inter- 
face. User application programs can operate on the data by invoking these operations through their names and arguments, regardless of how the operations areimplemented. This may be termed `program-operation independence`. interface를 사용하는 database system에 대한 설명.

The characteristic that allows program-data independence and program-operation independence is called data abstraction. A DBMS provides users with a conceptual representation of data that does not include many of the details of how the data is stored or how the operations are implemented. 사용자에게는 데이터들이 표로 들어가있다고 생각하고 사용할 수 있도록 만들어주는 것을 말한다.

`Data model` : It is used to hide storage details and present the users with a conceptual view of the database. The data model uses logical concepts, such as objects, their properties, and their interrelationships. 

### 1.3.3 Support of Multiple Views of the Data

여러 테이블의 데이터를 한 번에 합쳐서 보고 싶은 사람이 있을 것이다. 반드시 데이터가 저장되어있는 형태로 보지 않아도 된다. 

### 1.3.4 Sharing of Data and Multiuser Transaction Processing

Multiple users access the database at the same time ` concurrency control`이라고 한다.  
  - **concurrency control** : serveral users trying to updata the same data do so in a controlled manner so that the result of the updates is correct.
Most important characteristics in distinguish a DBMS from traditional file-processing software.  

For example, when several reservation agents try to assign a seat on an airline flight, the DBMS should ensure that each seat can be accessed by only one agent at a time for assignment to a passenger. These types of applications are generally called `online transaction processing (OLTP)` applications. A fundamental role of multiuser DBMS software is to ensure that concurrent transactions operate correctly and efficiently. (`On-Line Analytical Processing (OLAP) application` : OLTP의 반대 개념)  

The concept of a transaction has become central to many database applications. A transaction is an executing program or process that includes one or more database accesses, such as reading or updating of database records. Each transaction is sup-posed to execute a logically correct database access if executed in its entirety with-out interference from other transactions. The DBMS must enforce several transaction properties. The isolation property ensures that each transaction appears to execute in isolation from other transactions, even though hundreds of transactions may be executing concurrently. The atomicity property ensures that either all the database operations in a transaction are executed or none are. We discuss transactions in detail in Part 9.  
  - `Transaction` : an executing program or process that includes one or more DB a accesses, such as reading or updating of DB records 내가 읽는 동안 다른 사람이 쓰면 안되고, 마치 가장 작은 하나의 단위처럼 생각되는 것
  - The DBMS must enforce several transaction properties.
    1. isolation property //누가 중간에 훼방을 안놓을 수 있는 특정
    2. atomicity property // 가장 작은 단위로 생각되는 것

## 1.4 Actors on the Scene

In this section we identify the people whose jobs involve the day-to-day use of a large database; we call them the actors on the scene.   

### 1.4.1 Database Administrators
Administering these resources is the responsibility of 
the database administrator (DBA). The DBA is responsible for authorizing access to the database, coordinating and monitoring its use, and acquiring software and hardware resources as needed. DataBase Administrator (DBA) : DB 전체를 관리하는 사람. 사용을 허락해주고 모니터링하고 필요한 S/W를 보충/추가해주고 보안에 대해서 책임을 지는 사람.  

### 1.4.2 Database Designers

Database designers are responsible for identifying the data to be stored in the database and for choosing appropriate structures to represent and store this data. Database designers typically interact with each potential group 
of users and develop views of the database that meet the data and processing requirements of these groups.  

### 1.4.3 End Users

End users are the people whose jobs require access to the database for querying, updating, and generating reports; the database primarily exists for their use. There are several categories of end users:  

- Naive or parametric end users make up a sizable portion of database 
end users. Their main job function revolves around constantly querying 
and updating the database, using standard types of queries and updates— 
called `canned transactions`ㅡ that have been carefully programmed and 
tested.
- Sophisticated end users include engineers, scientists, business analysts, and others who thoroughly familiarize themselves with the facilities of the DBMS in order to implement their own applications to meet their complex requirements.  
- Standalone users maintain personal databases by using ready-made pro- 
gram packages that provide easy-to-use menu-based or graphics-based 
interfaces.  


## 1.6 Advantages of Using the DBMS Approach


### 1.6.1 Controlling Redundancy

Controlling redundancy in data storage and in development and maintenance efforts. redundancy를 아예 없애지는 않고 성능을 위해서 조금은 허용한다. 최소한의 데이터의 중복을 유지하면서 data의 동일성은 계속 유지해주어야 한다.  

### 1.6.2 Restricting Unauthorized Access 

불법적인 권한에 대해서 제한을 할 수 있다. 

### 1.6.3 Providing Persistent Storage for Program Objects

Databases can be used to provide persistent storage for program objects and data structures. This is one of the main reasons for object-oriented database systems 
(see Chapter 12).  

### **1.6.8 Enforcing Integrity Constraints**

Most database applications have certain `integrity constraints` that must hold for the data.  A DBMS should provide capabilities for defining and enforcing these constraints. The simplest type of integrity constraint involves specifying a data type for each data item.  

we can specify that every section record must be related to a course record. This is known as a `referential integrity` constraint. `참조 무결성`  

Another type of constraint specifies uniqueness on data item values, such as every course record must have a unique value for Course_number. This is known as a `key` or `uniqueness constraint`.  These constraints are derived from the meaning or semantics of the data and of the miniworld it represents.  It is the 
responsibility of the database designers to identify `integrity constraints` during database design.  

### 1.6.10  Additional Implications of Using the Database Approach  

1. Potential for Enforcing Standards.
2. Reduced Application Development Time. 
3. Flexiblity to change dat structires. 데이터구조 변화에 대한 융통성. 기존의 field를 사용할 때 새로운 row나 col을 추가하는 것이 가능하다. 1개의 row에 대해서만 col을 추가하는 것도 기존의 데이터를 뒤엎지 않고 허용해준다. 
4. Providing backup and recovery services
5. Reduced application development time 
6. Availability of up-to-data information

## 1.7 A Brief History of Database Applications


## Hierarchical and Network Systems


### 1.7.1  Early Database Applications Using Hierarchical and Network Systems

- early DB applications(60'~80') maintained large numbers of records of similar structure
  - 계산 위주의 DB를 사용하다가, 어떤 데이터가 어디에 있는지 모르는 상태가 된다. 관리가 안되는 문제가 발생
- problem -> intermixing of conceptual relationships with the physical storage
  - 기록들 간의 관계를 표현하는 특별한 방법이 없었다. 트리에서 부모/자식과 같은 관계. 포인터로 지칭하는 방법밖에 없었다. 즉, 기존의 방식에서는 수많은 포인터를 사용해서 실제 디스크 주소를 찾아가서 데이터를 얻었다. 이러한 관계를 Hierarchical and Network Systems라고 부르고 데이터를 옮기면 많은 포인터를 다 바꿔야하는 문제가 있었다.

### 1.7.2  Providing Data Abstraction and Application Flexibility with Relational Databases

- Providing application flexibility : seperate the physical storage of data from its comceptual representation and provide query language.
- **관계형 DB로 되면서는 주소를 몰라도 관계를 알면 데이터를 찾을 수 있었다. 어떻게 찾는지는 DBMS가 찾아주고 사용자는 어떻게 찾는지는 몰라도 됐다.(가장 큰 차이)**

### 1.7.3  Object-Oriented Applications and the Need for More Complex Databases

- complexity of models and the lack of an early standard -> under 5% of DB market
- 이 때 객체지향 프로그래밍 language가 나왔다. C++/C#/Object-C이런 것들이 나왔다. C++의 class/object 개념을 가지는 DBMS를 만들기 위해서 노력했지만 어려워서 망했다. 어려워서 사람들이 안써서 market share가 많이 줄어들고 있다.

### 1.7.4  Interchanging Data on the Web for E-Commerce Using XML  

- XML : `eXtended Markup Language`
- 웹페이지를 DB로 관리하기 어려워서 Web Page를 DB화 관리하기 위한 language가 나타났다. 

### 1.7.5  Extending Database Capabilities for New Applications  

- Scientific applications : 유전자 염기서열 분석 및 재조립  
- Storage and retrieval of images ans videos : 케이블 TV의 DB에는 영상이 들어가있다. 
- Data mining applicaations : 
- Spatial/Time series applications : 시간에 따라 변하면 주식/시간/날씨 등을 처리
- 더 복잡해지고 새로운 데이터 타입에 새로운 indexing 방식을 사용하게 됨.  

This led DBMS developers to add functionality to their systems. 두 가지 기능이 있는데 하나는 범용 기능. 하나는 특수 기능. Some functionality was general purpose, such as incorporating concepts from object-oriented databases into relational systems. Other functionality was special purpose, in the form of optional modules that could be used for specific applications. For example, users could buy a time series module to use with their relational DBMS for their time series application.  

- general purpose functionality : incorporating concepts from OODB into relational systems. 
  - OODB의 모든 기능은 모두 reltional DB에 들어가있어서 OODB로 쓰려면 쓸 수 있다.
- special purpose functionality, in the form of optional modules
  - E.g, users could buy a time series module to use with their relational DBMS for their time series application
  - 돈을 주고 옵션을 같이 사면 추가적인 library를 사용할 수 있다. 특수 기능들을 어디서는 module 어디서는 blade라고 부른다.

### 1.7.6  Emergence of Big Data Storage Systems and NOSQL Databases

- social media Web sites, large e-commerce companies, Web search indexes, and cloud storage/backup -> data stored on large DBs and massive servers
- New types of DB Systems were necessary to mange these huge databases
  - fast search and retrieval as well as reliable and safe sotrage of nontraditional(동영상 소리 신호 등) types of data, such as social media posts and tweets/
  - Some of the requirements of these new systems were not compatible with SQL relational DBMSs
- The term `NOSQL` is generally interpreted as `Not Only SQL`
  - meaning that in systems than namage large amount of data, **some of the data is stored using SQL systems**, where as **other data would be stored using NOSQL,** depending on the application requirements.
  - 다양한 뒤죽박죽한 환경에서 미디어를 찾아주기 위한 기능으로서의 의미를 가진다.
- Main inhibitors costs of using a DBMS :
  - High initial investment in H/W, S/W, and training
  - The generality that a DBMS provides for defining and processing data - CAD, GIS
  - Overhead for prividing security, **concurrency control제일 어렵**, recovery, and integrity functions
- When a DBMS may be unnecessary :
  - Simple, well-defined database applications that are not expected to change at all
    - 한 번짜서 변경이 잘 없으면 DB를 쓰지 않아도 된다.
  - Stringent, real-time requirements for some application programs that may not be met because of DBMS overhead
    - Real time 특성이 굉장히 큰 것은 적합하지 않다. 예를 들어서 미사일 발사에서 Transaction 순서가 늦으면 죽는다.
  - Embeded systems with limited storage capacity, where a general-purpose DBMS would not fit.
  - No multiple-user access to data
