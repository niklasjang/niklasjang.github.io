---
title: "[DB System] 2장 계속 "
excerpt: "Page 66 ~ 77"
date: 2019-09-09
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

## 2.2  Three-Schema Architecture and Data Independence

Three of the four important characteristics of the database approach, listed in Section 1.3, are  
1. (1) use of a catalog to store the database description (schema) so as to make it self-describing, 
2. (2) insulation of programs and data (program-data and program-operation independence), and 
3. (3) support of multiple user views.  

In this section we specify an architecture for database systems, called the three-schema architecture, that was proposed to help achieve and visualize these characteristics. Then we discuss further the concept of data independence.  

### 2.2.1 The Three-Schema Architecture

![Figure 2.2]()

1.  The internal level has an internal schema, which describes the physical storage structure of the database. The internal schema uses a physical data model and describes the complete details of data storage and access paths for the database.
2. The conceptual level has a conceptual schema, which describes the structure of the whole database for a community of users. The conceptual schema hides the details of physical storage structures and concentrates on describing enties, data types, relationships, user operations, and constraints. 
3. The external or view level includes a number of external schemas or user views. Each external schema describes the part of the database that a particular user group is interested in and hides the rest of the database from that user group.  


Schema가 있을 때 데이터는 DISK에  물리적 레벨에서 저장되어있는 상태로만 있다. 유저입장에서는 External View만 보고 사용한다. 각 유저는 자신의 schema level을 보고 파악한다. DBMS는 3개의 Schema에 대한 명령을 변환시켜주어서 데이터를 검색하고 검색한 데이터는 internal한 form으로 나온다. 이를 Conceptual -> external 형태로 변환해서 user에게 보여준다.  

유저는 'SN'을 검색했지만 Conceptual은 'SNUMBER'를 검색하는 명령으로 바꿔준다. DBMS는 'STORED-STUDENT'라는 BOX 안에 SNO라는 이름으로 4BYTE OFFSET 4바이트를 가지고 있다고  알고 이를 Conceptual scheme에게 보내준다. conceptual은 이를 integer로 바꾸고 C 스타일로 바꿔서 유저에게 보여준다.  

위와 같은 명령을 바꾸고, 검색 결과를 바꿔서 전달하는 과정을 mapping이라고 한다. 이러한 과정은 시간도 오래걸리고 비용이 크다. **이렇게 3단계 Schema가 도입된 이유는 데이터의 독립성을 위해서이다.** 어떤 데이터가 수정이 되었을 때 위의 level에는 영향을 주지 않기 위함이다. 어떤 특정레벨에서 Schema가 바뀌면 상위 사용자들에게는 영향을 주지 않는다.  


### 2.2.2 Data Independence

conceptual schema가 바뀌어도 external schema에는 영향을 주지 않는다. 이것이 어떻게 가능하냐?? view definition과 mapping만 변하면 된다?  

The three-schema architecture can be used to further explain the concept of data independence, which can be defined as the capacity to change the schema at one level of a database system without having to change the schema at the next higher level. We can define two types of data independence:  

1. `Logical data independence`  is the capacity to change the conceptual schema without having to change external schemas or application programs. We may change the conceptual schema to expand the database (by adding a record type or data item), to change constraints, or to reduce the database 
(by removing a record type or data item). In the last case, external schemas that refer only to the remaining data should not be affected. mapping 시키는 방법은 DBMS의 책임이고 user의 책임이다. user는 몰라도 된다. 이러한 것을 논리적 데이터 독립성이라 한다.
2. `Physical data independence` is the capacity to change the internal schemawithout having to change the conceptual schema. Hence, the external sche mas need not be changed as well. Changes to the internal schema may be needed because some physical files were reorganized. interal schema가 바뀌어도 conceptual/external schemal에 영향을 주지 않는다. 원래 있던 데이터가 똑같이 들어있기만 하면, 구조가 바뀌어도 윗단에 영향을 주지 않는다. mapping만 바뀌면 된다. 실제로는 `LDI`, `PDI`를 지나고 mapping하면서 시간 손실이 많이 일어난다. 그래서 실제로는 external과 conceputla 두 schema를 합쳐서 제공한다.

## 2.3 Database Languages and Interfaces

In Section 1.4 we discussed the variety of users supported by a DBMS. The DBMS must provide appropriate languages and interfaces for each category of users. In this section we discuss the types of languages and interfaces provided by a DBMS and the user categories targeted by each interface.  

### 2.3.1 DBMS Languages

Once the design of a database is completed and a DBMS is chosen to implement the database, the first step is to specify conceptual and internal schemas for the database and any mappings between the two. In many DBMSs where no strict separation of levels is maintained, one language, called the `data definition language (DDL)`, is used by the DBA and by database designers to define both schemas. The DBMS will have a DDL compiler whose function is to process DDL statements in order to identify descriptions of the schema constructs and to store the schema description in the DBMS catalog.  

일단 DB의 디자인이 완성되면 DBMS는 이를 implement해야한다. 첫 번째로는 conceptual schemas와 internal schema를 명시화하고 이 둘을 연결해주는 mapping을 명시해야한다. 구분되는 레벨이 없는 많은 DBMS에서는 `DDL`이라고 불리는 단 하나의 언어만 사용된다. 이 언어는 `DBA`와 `DB 디자이너`들에 의해서 사용된다. 

In DBMSs where a clear separation is maintained between the conceptual and internal levels, the DDL is used to specify the conceptual schema only. Another language, the `storage definition language (SDL)`, is used to specify the internal schema. The mappings between the two schemas may be specified in either one of these languages.  

반대로 conceptual and internal levels 사이에 분명한 구분이 있는 DBSM에서는 `DDL`은 오직 conceptual schema에만 사용된다. 다른 언어인 `SDL`이 interaml schema를 위해서 사용된다. 이 둘 사이의 mapping은 이 둘 중 하나의 언어로 명시될 수 있다. 

In most relational DBMSs today, there is no specific language that performs the role of SDL. Instead, the internal schema is specified by a combination of functions, parameters, and specifications related to storage of files. These permit the DBA staff to control indexing choices and mapping of data to storage.  

많은 대부분의 DBMS에서는 `SDL`의 역할을 하는 특정한 언어가 존재하지 않는다. 대신에 internal schema는 함수, 파라미터 그리고 파일과 관련된 specifiation들에 의해서 명시된다. 

For a true three-schema architecture, we would need a third language, the `view definition language (VDL)`, to specify user views and their mappings to the conceptual schema, but in most DBMSs the DDL is used to define both conceptual and external schemas. In relational DBMSs, SQL is used in the role of VDL to define user or application views as results of predefined queries (see Chapters 6 and 7). 

3가지 schema를 가지고 있는 구조에서는 3번째의 언어가 필요하고 이를 `VDL`이라고 부른다. 이것은 user view를 명시하고 user와 conceptual schema 사이의 맵핑을 명시한다. 하지만 대부분의 DBMS에서는 `DDL`은 conceptual과 external schema를 모두 명시한다. 관계형 DBMS에서는 SQL이 VDL의 역할을 한다.  

Once the database schemas are compiled and the database is populated with data, users must have some means to manipulate the database. Typical manipulations include retrieval, insertion, deletion, and modification of the data. The DBMS provides a set of operations or a language called the `data manipulation language (DML)` for these purposes.  

There are two main types of `DMLs`.   

- `A high-level or nonprocedural DML`: can be used on its own홀로 to specify complex database operations concisely. Many DBMSs allow high-level DML statements either to be entered interactively from a display monitor or terminal or to be embedded in a general-purpose programming language. In the latter case, DML statements must be identified within the program so that they can be extracted by a precompiler and processed by the DBMS. High-level DMLs, such as SQL, can specify and retrieve many records in a single DML statement; therefore, they are called set-at-a-time or set-oriented DMLs. (서울출신 모두 일어서, 한 번에 하나의 집합을 처리.) A query in a high-level DML often specifies which data to retrieve rather than how to retrieve it; therefore, such languages are also called `declarative`.택시 손님이 목적지 가는 경로를 알려준다?  
- `A low- level or procedural DML` must be embedded in a general-purpose programming language. This type of DML typically retrieves individual records or objects from the database and processes each separately. Therefore, it needs to use programming language constructs, such as looping, to retrieve and process each record from `a set of records`. for문을 돌면서 한 번에 하나의 데이터를 처리할 수 있다. 너 서울 출신이야?  

Whenever DML commands, whether high level or low level, are embedded in a general-purpose programming language, that language is called the host language and the DML is called the data sublanguage.10 On the other hand, a high-levelDML used in a standalone interactive manner is called a query language. In gen- eral, both retrieval and update commands of a high-level DML may be used inter-actively and are hence considered part of the query language.  

2. DML :
  - A high-level or nonprocedural DMl : 
    - declarative languages : .
    - set-at-a-time or set-oriented DMLs : 
  - A low-level or procedural DML
    - recored-at-a-time? : 
3. QUery language :  

4. Data sublanguage
  - host language
5. SQL
  - a comprehensive integrated language
  - a combination of DDL, VDL, and DML, as well as statements for constracint specificatino and schema evolution

### 2.3.2 DBMS Interfaces

I/O에 관한 부분은 OS의 기능을 사용한다. buffer management는 많은 DBMS들이 그들 자신의 modeul을 사용한다. 디스크에서 읽고 쓰고 하는 명령을 Stored data manager에서 전담한다.  

### 2.4 The Database System Environment

The database and the DBMS catalog are usually stored on disk. Access to the disk is controlled primarily by the operating system (OS), which schedules disk read/write. Many DBMSs have their own buffer management module to sched- ule disk read/write, because management of buffer storage has a considerable effect on performance. Reducing disk read/write improves performance consid- erably. A higher-level stored data manager module of the DBMS controls access to DBMS information that is stored on disk, whether it is part of the database or the catalog.  

Casual users and persons with occasional need for information from the database interact using the `interactive query` interface in Figure 2.3. We have not explicitly shown any menu-based or form-based or mobile interactions that are typically used to generate the interactive query automatically or to access canned transactions. These queries are parsed and validated for correctness of the query syntax, the names of files and data elements, and so on by a `query compiler` that compiles them into an internal form.  

This internal query is subjected to `query optimization` (discussed in Chapters 18 and 19). Among other things, the query optimizer is concerned with the rearrangement and possible reordering of operations, elimina- tion of redundancies, and use of efficient search algorithms during execution. It consults the system catalog for statistical and other physical information about the stored data and generates executable code that performs the necessary operations for the query and makes calls on the runtime processor.  

Application programmers write programs in host languages such as Java, C, or C++ that are submitted to a precompiler. 하나의 프로그램에 DB SQL명령과 C 명령이 같이 들어있으면 어렵다. precompiler를 지나면 하나는 C코드만 빼고 하나느 SQL 코드를 포함하는 별도의 프로그램으로 나눈다. 그리고 원래의 형태를 함수를 호출하는 부분으로 바꾼다.  The precompiler extracts DML commands from an application program written in a host programming language. These com- mands are sent to the DML compiler for compilation into object code for database access. The rest of the program is sent to the host language compiler. The object codes for the DML commands and the rest of the program are linked, forming a canned transaction whose executable code includes calls to the runtime database processor. It is also becoming increasingly common to use scripting languages such as PHP and Python to write database programs.  

- Runtime database processor
  - handles database access at run time;
- **Query Compiler + Query Optimizer효율적으로 질의를 하도록 도와줌 : Query Processor 라고도 부름..**

### 2.4.2 Database System Utilities

- 설명 간단히 하고 넘어감

In addition to possessing the software modules just described, most DBMSs have database utilities that help the DBA manage the database system. Common utili- ties have the following types of functions:  

`Loading`. A loading utility is used to load existing data files—such as text 
files or sequential files—into the database. Usually, the current (source) for- 
mat of the data file and the desired (target) database file structure are speci- 
fied to the utility, which then automatically reformats the data and stores it 
in the database. With the proliferation of DBMSs, transferring data from 
one DBMS to another is becoming common in many organizations. Some 
vendors offer conversion tools that generate the appropriate loading pro- 
grams, given the existing source and target database storage descriptions 
(internal schemas).