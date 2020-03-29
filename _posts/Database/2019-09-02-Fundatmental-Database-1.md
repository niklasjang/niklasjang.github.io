---
title: "[DB System] 개론 및 1장"
excerpt: "Page 0 ~ 47"
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

## 개요

### 교재

1. 교재는 'Fundamentals of Database System' 7th edition 구글링해서 찾기   
2. 6판에서 7판으로 개정되면서 big data 부분이 추가됨. 한글판은 6판까지만 있음

# Part 1 : Introduction to Databases

일반적으로 물건을 사고 예약을 하는 행위를 하면서 전통적인 database 시스템을 자각을 하지 못하는 사이에도 사용하고 있었다. 요즘에는 SNS를 통해서 비전통적인 데이터(posts, tweets, mages, and video clips)들을 저장하기에 이르렀다. 또한 `GIS`(Geographic informatino systems)는 맵을 저장하고 분석하고 날씨를 위한 위성 이미지를 포함한다.  

### Database Applications

- `Data warehouses` and `online analytical processing (OLAP)` systems are used in many companies to extract and analyze useful business information from very large databases to support decision making. 
- `Real-time` and `active database` technology is used to control industrial and manufacturing processes. 
- database `search techniques` are being applied to the `World Wide Web` to improve the search for information that is needed by users browsing the Internet.

## 1.1 Introduction

- `data` : known facts that can be recorded and that have implicit meaning.
- `database` : a collection of related data.
- `Mini-world` : A database represents some aspect of the real world, sometimes called the `miniworld`. Changes to the miniworld are reflected in the database.
  - **Mini-world?** : 학생을 누구는 가르쳐야하는 대상으로 생각하고 누구는 키워야하는 대상으로 생각할 것이다. 이와 같이 대상을 `보는 관점`이 여러가지가 있을 수 있음을 이야하기 하는 것이다. 같은 대상을 사용하는 목적에 따라서 필요한 데이터가 다르다. `Universe of Discourse`라고도 부른다. Mini-world를 관리하기 위해서 관련된 것끼리 모아놓은 것이 DB이다.  
- `database management system (DBMS)` : a computerized system that enables users to create and maintain a database. The DBMS is a general-purpose software system that facilitates the processes of defining, constructing, manipulating, and sharing databases among various users and applications.
  - **DBMS?** : 데이터베이스를 관리하기 위한 모든 기능을 제공하는 a collection of programs  that enables users to create and maintain a DB. 기능이란 defining(데이터를 정의), constrcuting(저장장치에 값을 저장하는 행위), manipulating(데이터를 사용(삭제or검색) 하는 행위), sharing(concurrency control), protecting, maintaining(시간에 따른 백업 및 보관)을 말한다. (`Protection`의 두 가지 기능 : system protecting(HW/SW의 고장으로부터 보호) / security protection(불법적인 사용으로부터 보호))
  - `Defining` a database involves specifying the data `types`, `structures`, and **`constraints`** of the data to be stored in the database. **The database definition or descriptive information is also stored by the `DBMS`** in the form of a database catalog or dictionary; it is called `meta-data`. Spread Sheet에서 어떤 data type인지와 같은 data의 structure를 정의하는 것.
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











