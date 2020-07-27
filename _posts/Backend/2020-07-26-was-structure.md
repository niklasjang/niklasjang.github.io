---
title: "[Backend] WAS(Web Application Service) 동작 과정"
excerpt: ""
date: 2020-07-26
categories:
  - Backend
tags:
  - backend
  - WAS
  - web server
toc : false
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## Static Pages

웹 서버는 파일 경로 이름을 받아서 경로와 일치하는 DB에서 file을 찾아서 반환합니다. 항상 동일한 페이지를 반환하는 경우를 static pages 라고 부릅니다. html, css, image, **javascript** 파일과 같이 컴퓨터에 저장되어 있는 파일을 의미합니다. 파일을 요청하는 url에 query string이 포함되지 않는 경우로 같은 파일에 대해서 항상 같은 url이 사용됩니다.  

## Dynamic Pages

인자의 내용에 맞추어 동적인 contents를 반환합니다. WAS 위에서 돌아가는 Java Program을 `Servlet`이라고 합니다. 즉, sevlet에 의해서 만들어진 결과물을 return하는 페이지를 말합니다. 개발자는 servlet에서 get/post 요청을 받았을 때 수행될 코드를 작성합니다. 즉, 같은 화면에서 보여줄 내용이라도 매번 url에 포함된 query string이 달라집니다.    

## WAS, Web Server, Web Container의 포함 관계

```
client - WAS(web server + web container(JSP, servlet)) - DB
```

`WAS` 내부에 `Web Server`와 `Web Container(JSP, Servlet)`가 존재합니다. client는 web server에 문서를 요청하고 필요한 경우 web container에게 문서를 다시 요청하고 받아서 client에게 전달합니다. web container는 web server가 요청한 문서를 DB 연동을 통해서 생성해서 web server에게 전달합니다.  

## Apache/Nginx v.s. Apache Tomcat/JBoss

web server는 client의 요청에 http 프로토콜을 기반으로 응답합니다. 일반적으로 `Apache http server`와 `Nginx`가 웹 서버로의 기능을 수행합니다.  

WAS는 web server와 web container를 포함합니다. WAS는 프로그램 실행 환경을 가지고 DB에 접속합니다. 그리고 여러 개의 트랜잭션(더이상 쪼갤 수 없는 논리적인 작업 단위)를 관리하는 기능을 가집니다. 일반적으로 `Apache Tomcat` `JBoss`가 WAS로서의 기능을 수행합니다.  

## WAS가 있는데 Web Server는 왜 필요한가?

- Web Server가 필요한 이유  
  클라이언트에게 이미지 파일을 보내는 과정을 생각해보자. 이미지 파일과 같은 정적인 파일은 웹 문서가 클라이언트로 보내질 때 함께 보내지는 것이 아니다. 클라이언트는 HTML 문서를 먼저 받고 그에 맞게 필요한 이미지를 다시 서버로 요청한 이후에 이미지 파일을 받을 수 있다. Web Server를 통해 정적인 파일들을 Application Server까지 가지 않고 앞단에서 빠르게 보내줄 수 있다. 즉, 웹 서버의 캐시와 같은 기능을 통해 **Application 서버의 부담을 줄일 수 있다.**  
- WAS가 필요한 이유  
  사용자의 요청에 맞게 적절한 동적 컨텐츠를 만들어서 제공해야 하는 경우가 있다. 동적인 컨텐츠들을 모두 만들어 놓을 수 없기 때문에 필요한 자원을 DB에서 가져와서 비즈니스 로직에 맞게 그 때 그 때 결과를 만들어서 제공하여 **자원을 효율적으로 사용하다.** 
- Web Server의 기능을 WAS가 대신 수행하는 구조의 문제점
  1. WAS는 DB 조회와 같은 다양한 로직을 처리하기 때문에 정적인 컨텐츠를 제공하는 것은 Web Server로 분리하는 것이 더 빠르다.
  2. SSL에 대한 암호화/복호화 처리를 Web Server에서 처리한다.
 