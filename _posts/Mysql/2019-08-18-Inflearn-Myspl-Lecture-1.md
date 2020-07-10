---
title: "[myspl 강좌] 1강"
excerpt: "DATABASE 1&2 - MySQL"
date: 2019-08-18
categories:
  - Myspl
tags:
  - myspl
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## 데이터베이스 기초

모든 데이터베이스는 input과 output을 가진다. input은 Create/Update/Delete로 나눌 수 있고 Output은 Read로 이해할 수 있다. 

### CRUD

1. Create
2. Read
3. Upload
4. Delete

데이터를 관리할 때 중요한 4가지 기능들인데 DB는 이러한 일들을 상황에 맞게 자동으로 처리하는 역할을 해준다. file system의 발전 방향은 file -> Spread Sheet(E.g. excel) -> Data Base이다.  

## Database Ranking

[랭킹 확인 사이트](https://db-engines.com/en/ranking)  

1. Oracle, MySQL, Microsoft SQL Server는 Relational DBMS
1. MongoDB는 Document store
1. Redis는 Key-value Store
1. Elasticsearch는 search engine
1. Cassandra는 Wide column store

## binami WAMP를 통해서 mysql 설치

[다운링크](https://bitnami.com/stack/wamp/installer)  

설치 후 bitnami manaer를 통해서 MySQL과 Apache Web Server를 제어할 수 있다.  

cmd에서 `C:\Bitnami\wampstack-7.4.7-0\mysql\bin\mysqld.exe`를 실행해야 한다. 

1. $ cd C:\Bitnami\wampstack-7.4.7-0\mysql\bin
1. $ mysql -uroot -p //mysql -uroot -p{MY_PASSWORD}를 적어도 되지만 보안상의 이유로 -p까지 친 다음에 enter
1. password 입력 

## MYSQL 구조

1. 가장 바깥 : Database Server
1. 관련된 Table 들의 집합 : Database or Schema
1. 관련된 정보들의 집합 : Table

## MYSQL CRUD 명령어

| 기능 | 명령어 |
|:--------|:--------|
|DATABASE 생성|CREATE DATABASE opentutorials;|
|DATABASE 삭제|DROP DATABASE opentutorials;|
|DATABASE 선택|USE opentutorials;|
|접속 계정 비밀번호 변경|SET PASSWORD = PASSWORD('{new password}');|
|테이블 생성| CREATE TABLE topic(<br>  id INT(11) NOT NULL AUTO_INCREMENT,<br>  title VARCHAR(100) NOT NULL,<br>  discription TEXT NULL,<br>created DATETIME NOT NULL,<br>  author VARCHAR(3) NULL,<br>  profile VARCHAR(100) NULL,<br>  PRIMARY KEY(id));|
|테이블 이름 변경|RENAME TABLE topic TO topic_backup;|
|테이블 목록 출력|SHOW tables;|
|테이블 SCHEMA 출력|DESC topic;|
|row 저장|INSERT INTO topic (title,description,created,author,profile) VALUES ('PostgreSQL', 'PostgreSQL is ...', NOW(), 'abc', 'developer');|
|row 검색|SELECT id,title,created,author FROM topic WHERE author='abc' ORDER BY id DESC;|
|row 검색|SELECT id,title,created,author FROM topic WHERE author='abc' ORDER BY id DESC LIMIT 2;|
|row 수정|UPDATE topic SET author='aaa', profile='designer' WHERE id = 1;|
|row 삭제|DELETE FROM topic WHERE id = 4;|
|테이블 구조와 데이터 복사|1. CREATE TABLE IF NOT EXISTS `복사 테이블` SELECT * FROM `원본 테이블`;<br>2. ALTER TABLE topic ADD PRIMARY KEY(id);<br>3.ALTER TABLE topic MODIFY COLUMN id INT auto_increment;<br> 4. (2.~3.을 한 번에) ALTER TABLE topic MODIFY id INT auto_increment PRIMARY KEY;|
|column 이름 변경|ALTER TABLE topic CHANGE author author_id INT;|

## Mysql Client or Windows

free client는 MySQL Workbench를 사용합니다.  

1. $ ./mysql -uroot -p -h{database server의 ip주소}
2. mysql의 cli client인 mysql monitor 실행

Mysql workbench에서는 GUI로 명령어를 수행할 수 있도록 해준다.  


## SQL JOIN

JOIN이 어려울 때는 생활코딩의 JOIN 강의를 보면된다. [강의링크](https://opentutorials.org/course/3884)