---
title: "[mysql]하나의 머신에서 MySQL 여러개 실행하기" 
excerpt: ""
date: 2020-09-25
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


하나의 머신에서 여러 개의 MySQLD 인스턴스(이하 인스턴스)를 실행하는 경우는 크게 두 가지 경우입니다. 

1. 하나의 MySQLD를 운용 중일 때, 설정을 바꾸어 독립적으로 테스트하고 싶은 경우
1. 각각의 사용자에게 서로 다른 MySQLD를 서비스하고 싶은 경우 

인스턴스를 실행하는 방법에도 크게 두 가지가 있습니다.
1. 각 인스턴스를 서로 다른 MySQL serber binary로 실행
1. 각 인스턴스들을 같은 MySQL serber binary로 실행

인스턴스를 실행하는 방법에 상관없이 여러 개의 인스턴스를 실행하기 위해서는 실행 configure가 독립적으로 설정되어야 합니다. 설정은 커맨드라인/옵션파일/환경변수 등으로 지정할 수 있습니다.  

인스턴스 실행에 필요한 configure는 다음과 같습니다. 

1. 데이터가 저장되는 data directory //  --datadir=dir_name
1. 각 data directory에 할당된 port // --port=port_num
  1. 하나의 서버가 여러 개의 주소를 갖는 경우 bind_address를 설정

dbeaver Unable to load authentication plugin 'caching_sha2_password'. Unable to load authentication plugin 'caching_sha2_password'.

1. mysql -uroot -p
1. show databases;
1. use mysql;
1. select host, user from user;
1. alter user 'root'@'localhost' identified with mysql_native_password by '{비밀번호}';

