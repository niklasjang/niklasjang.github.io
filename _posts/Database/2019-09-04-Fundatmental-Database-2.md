---
title: "[DB System] 1장 마무리 및 2장"
excerpt: "Page 47 ~ 66 "
date: 2019-09-04
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


# Chapter 2

## 2.1 Data Models, Schemas, and Instances

`Data abstraction` generally refers to the suppression of details of data organization and storage, and the highlighting of the essential features for an improved understanding of data. One of the main characteristics of the database approach is to support data abstraction so that different users can perceive data at their preferred level of detail.
- hiding details of data storage that are not needed by most database users.  



A `data model` a collection of concepts that can be used to describe the structure of a database—provides the necessary means to achieve this abstraction.   

By structure of a database we mean the data types, relationships, and constraints that apply to the data. Most data models also include a set of basic operations for specifying retrievals and updates on the database.  

### 2.1.1 Categories of Data Models

High-level or conceptual data models provide concepts that are close to the way many users perceive data, whereas low-level or physical data models provide concepts that describe the details of how data is stored on the computer storage media, typically magnetic disks.  

Conceptual data models use concepts such as entities, attributes, and relationships.  
- An `entity` represents a real-world object or concept, such as an employee or a project from the miniworld that is described in the database. 
- An `attribute` represents some property of interest that further describes an entity, such as the employee’s name or salary. 
- `relationship` among two or more entities represents an association among the entities, for example, a works-on relationship between an employee and a project.  

### 2.1.2 Schemas, Instances, and Database State

In a data model, it is important to distinguish between the description of the database and the database itself. The description of a database is called the database schema, which is specified during database design and is not expected to change frequently.6 Most data models have certain conventions for displaying schemas as diagrams.7 A displayed schema is called a schema diagram.  

![Figure 2.1]()  

We call each object in the schema—such as STUDENT or COURSE a `schema construct`.  

The data in the database at a particular moment in time is called a database state or snapshot. It is also called the current set of occurrences or instances in the database.  

The distinction between database schema and database state is very important. When we define a new database, we specify its database schema only to the DBMS. At this point, the corresponding database state is the empty state with no data. We get the initial state of the database when the database is first populated or loaded with the initial data.  

At any point in time, the database has a current state.8 The DBMS is partly responsible for ensuring that every state of the database is a valid state—that is, a state that satisfies the structure and constraints specified in the schema. Hence, specifying a correct schema to the DBMS is extremely important and the schema must be designed with utmost care. The DBMS stores the descriptions of the schema constructs and constraints—also called the meta-data—in the DBMS catalog so that DBMS software can refer to the schema whenever it needs to. The schema 
is sometimes called the intension, and a database state is called an extension of the schema.  

### Data Model = ( S,O,C ) : Structure & Operations & Constraints제약조건

- a collection of concepts to describe the structure of a DB and certain constraints that the DB sould obey
- provides t he necessary **means to achieve the abstraction**
- **structure & operations**
  - structure : data types, relationships and **!!constraints제약조건!!**
  - a set of basic operations for specifying retrievals and updates
  - 요즘엔 C와 S를 합쳐서 S와 O 두 개로 얘기하기도 한다. 

### We can catagorize them according to the types of concepts they use to describe the database structure

- High-level or conceptual data models
  - use concepts such as **entity, attribute, relationship**
- Representational ( or implementation) data models
  - 사람이 이해하기도, 구현하기도 편한 중간 형태
  - provide concepts between CDM and PDM (Conceptual Data Model / Physical Data Model) 
  - **record-based data models** : used most frequently in traditional commercial DBMSs
  - relational data model, network and hierarchical models, OO models ...
- Low-level or physical data models
  - 데이터가 컴퓨터애 어덯게 저장되는가?
    - record formats, record orderings, and **access paths**
- entity를 record로 표현하고 실제로는 format으로 구현되는 흐름이다.

## Database Schemas

- the description of a database - **meta-data** stored in a system catalog
  - 어려운 말로는 **intension**이라고 한다. 한국어로는 **내포**
- Schema diagram

## Database state or snapshot

- the data in the database at a particular moment in time
- **extension외연**
- **the current set of occuences or instances in the DB**

# Schenasm Instances, and Database State

- Define : 정의하는 것
- populate : 처음의 데이터를 넣는다. -> initial state -> update -> new state
- At any point in time, the database has a current state
- The DBMS는 이 안에 들어있는 데이터는 원래 정해진 조건에 부합되는 데이터들!
- **Valid state** is a state that satisfies the structure and constraints specified in the schema
- **Schema Evolution** : changes need to be applied to the schema


```
//chapter 1 , 2 review True/False quiz

1. 보호(protection)는 하드웨어 또는 소프트웨어 오동작(또는 붕괴)으로부터 시스템을 보호하는 기능(security protection )과 권한이 없는 또는 악의적인 접근을 하려는 보안 위협으로부터 보호하는 기능(system protection)을 포함한다. False
2. 어떤 특정 시점에 데이터베이스에 들어 있는 데이터를 데이터베이스 상태(state), 스키마의 내포(intension), 또는 스냅삿(snapshot)이라고 한다. False intension은 아님
3. 데이터 모델은 데이터 추상화(data abstraction)를 달성하는 데 필요한 수단을 제공한다. 데이터 타입, 관계성(relationship), 데이터에 대한 제약조건 등의 데이터베이스 구조를 기술하는데 필요한 개념을 포함하지만, 기본 연산 집합은 포함하지 않는다. False S,O,C 모두 포함
4. 데이터베이스 설계자(database designer)는 데이터베이스에 저장될 데이터를 선정하고, 데이터를 나타내고 저장하는 구조를 정의하는 역할을 담당한다.
5. 3단계-스키마 아키텍처의 목적은 물리적 데이터베이스로부터 사용자 응용들을 분리하는 것이다. 3단계-스키마 아키텍처는 데이터 독립성의 개념을 설명하기 위해 사용될 수 있다.
6. 데이터베이스는 서로 연관된 데이터들의 모임이다. 데이터는 기록될 수 있으며 어떤 의미를 내포하고 있는, 알려진 사실(fact)이다.
7. 데이터 모델은 데이터를 구조화하는 스키마에 대한 규칙을 제공하며, 스키마는 현실 세계를 표현하는 데이터 인스턴스가 유효한지를 검증하는 규칙을 제공한다.
8. DBMS를 접근하는 응용 프로그램들은 데이터 파일의 구조가 응용 프로그램과 분리되어 DBMS 카탈로그에 저장된다. 따라서 데이터 파일의 구조가 변경되어도 응용 프로그램은 거의 변하지 않게 된다. 이러한 성질을 프로그램-데이터 독립성 (program-data independence) 이라 한다.
9. 표현(representational) 데이터 모델들은 일반 사용자들이 쉽게 이해할 수 있는 개념을 제공하지만, 컴퓨터 저장 장치에서 데이터가 구성되는 방식과는 완전히 무관하다.
10. 데이터의 중복성(redundancy)은 여러 가지 문제점을 초래한다. 논리적으로는 한 번의 변경이지만 데이터가 중복된 횟수만큼 반복해서 변경해야 하고 메모리 낭비도 초래한다.
```