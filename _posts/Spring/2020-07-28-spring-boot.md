---
title: "[Spring] JDBC Boot"
excerpt: "초보 웹 개발자를 위한 스프링5 프로그래밍 입문 - 최범균"
date: 2020-07-28
categories:
  - Spring
tags:
	- spring
	- spring boot
toc : false
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## 스프링 부트

스프링 MVC를 이용해서 DB 연동이 필요한 간단한 웹 앱을 만들 때에도 준비할 것이 많다. 스프링 MVC 설정을 하고 DB 연동에 필요한 DataSource 설정, 트랜잭션 설정 등을 해야 한다. @EnableWebMVC와 같은 애노테이션 뎍에 스프링 초기 버전보다 설정 코드가 줄긴했지만 여전히 많다. 메이븐을 사용한다면 로깅, Jackson, JDBC 드라이버와 같은 모듈도 알맞은 버전을 찾아서 의존으로 추가해야 한다.  

스프링 부트는 이러한 노력ㅇ르 줄여준다. 최소한의 작업으로 JSON API 등의 스프링 프로젝트를 시작할 수 있도록 돕는다. 톰캣과 같은 서버를 설치하지 않아도 내장 서버를 이용해서 웹앱을 바로 실행할 수 있다. 모니터링을 위한 기능도 제공한다.  

간편한 설정외에도 부트의 최고장점으로 꼽는것이 단독 어플리케이션만으로 배포가 되도록 하는것이다. 이전까지만 하더라도 서버가 새로 구축되면 해당 서버에 기존 프로젝트와 동일한 버전의 Tomcat을 설치하고, Tomcat의 여러 설정 xml값을 수정하고, maven/gradle같은 build 툴을 설치하는 등 서버 하나 확장하는것이 일이였다. 하지만 Boot의 경우 JDK 설치하고, `java -jar ~~~.jar`로 실행시키면 웹서버 구축 끝이다. Tomcat에 대한 설정도 application.properties/yml로 하기 때문이다.  




