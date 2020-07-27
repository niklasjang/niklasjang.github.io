---
title: "[Java] compile"
excerpt: ""
date: 2020-07-26
categories:
  - Java
tags:
  - java
  - compile

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

##  *.jar
- java의 실행 가능한 파일
- 여러 개의 클래스 파일을 하나로 묶어서 실행할 수 있도록 해준다. 즉, .class 파일의 묶음
- *.jar로 만들면 프로그램의 경로나 파일의 위치에 상관없이 실행이 가능하다

## JDBC의 *.jar

- 데이터베이스에 connection하는 JDBC 인터페이스는 데이터베이스 프로그램을 만드는 회사에서 구현합니다.
- 자신의 회사의 데이터베이스에 맞게 구현한 **클래스 파일 묶음인 .jar 라이브러리**를 제공합니다.
- 우리는 이 라이브러리를 로딩하고 Connection 인터페이스에 선언된 메서드를 사용하기만 하면 됩니다.
- 각 회사에서 만든 Connection 인터페이스를 어떻게 구현했는지 알 필요는 없습니다. 

## compile 

- $ javac 파일명
- $ java 파일명 args
- javac로 컴파일하는 파일이 여러 개의 class를 사용하는 경우 각각의 *.class 파일이 생성된다.
  - 아래 예의 경우 컴파일 한 번에 3개의 class 파일이 생성되었다. 

```
$ javac rscMain.java

$ ls
ngramToken.class  rsc.class  rscMain.class  rscMain.java

// java archive(*.jar) 파일을 만들기 위해 사용할 클래스 파일들의 위치를 지정해주는 파일
$ vi manifest.txt 

// *.jar 파일 생성
$ jar -cvmf manifest.txt rsc.jar rscMain.class rsc.class ngramToken.class 

// *.jar 실행
$ java -jar rsc.jar 
```

## javac / java / javap

- javac : 자바 컴파일러, 자바 소스를 바이트 코드로 변환
- java : 자바 인터프리터, 바이트 코드를 실행
- javap : 역어셈블러, 컴파일된 클래스의 파일을 원래 소스로 변환