---
title: "SpringBoot2.x + mysql + Mybatis + swagger + lombok 설정"
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

# mysql 생성
# mysql dbeaver 연결
# inttellij에서 mysql connection test
# intellij에서 spring-boot-devtools 추가

<https://haviyj.tistory.com/11>

1. build.gradle의 dependency
  ```
  dependencies {
    ... 
    compile('org.springframework.boot:spring-boot-devtools')
    ...
  }
  ```
1. Action 찾기 : CMD+shift+A
1. registry 검색
1. compiler.automake.allow.when.app.running을 체크

#  Intellij cache reset 

bootRun을 했을 때 'Could not resolve all artifacts for configuration ':classpath' 에러가 나는 경우 intellij idea가 cache하는 dependency가 충돌하는 경우이다. 

- File | Invalidate Caches / Restart를 눌러서 cache를 지운다. 

