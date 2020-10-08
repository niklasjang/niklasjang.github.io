---
title: "[mysql]dbeaver Unable to load authentication plugin 'caching_sha2_password'. Unable to load authentication plugin 'caching_sha2_password" 
excerpt: ""
date: 2020-09-25
categories:
  - Myspl
tags:
  - myspl
  - dbeaver
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

왼쪽 위의 연결 버튼을 눌러서 아래와 같이 입력합니다. 

![dbeaver-mysql-connect](/assets/images/mysql/dbeaver-mysql.jpg)  

```
dbeaver Unable to load authentication plugin 'caching_sha2_password'. Unable to load authentication plugin 'caching_sha2_password'.
```  

mysql 8 버전에서 다음과 같은 에러가 나오면 먼저 아래와 같이 mysql_native_password로 변경합니다. 

1. mysql -uroot -p
1. show databases;
1. use mysql;
1. select host, user from user;
1. alter user 'root'@'localhost' identified with mysql_native_password by '{비밀번호}';

```
No timezone mapping entry for 'Auto-detect' No timezone mapping entry for 'Auto-detect'
```  

와 같은 에러가 나오면 timezome을 Asia/Seoul로 명시해서 연결 합니다. 





