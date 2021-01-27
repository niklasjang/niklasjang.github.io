---
title: "[기술면접] Spring Basic"
excerpt: ""
date: 2020-11-12
categories:
  - JobInterview
tags:
  - JobInterview
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---


- @Configureation : 해당 클래스를 스프링 설정 클래스로 사용한다는 뜻
- @Bean : 
  - 여러개의 메서드에 각각 붙일 수 있다.
  - 각각의 메서드마다 한 개의 빈 객체를 생성한다.
  - 메서드 이름을 빈 객체의 이름으로 사용한다.
- DI :
  - 방법 1 : 생성자를 통해서 의존 객체를 주입 받아 member에 대입할 수 있다.
  - 방법 2 : setter를 통해서 객체를 주입 받아 member에 대입할 수 있다.
  - 방법 3 : Autowired를 사용하면 @Configuration을 붙인 설정 클래스에서 의존을 주입하지 않아도 된다.
    - @Autowired가 붙어있으면 스프링이 해당 타입의 빈 객체를 찾아서 필드에 할당한다. 
  - 자동주입이 가능한 빈이 여러개인 경우
    - 방법 1 : @Qualifier를 사용해서 특정 빈을 선택한다.
    - 방법 2 : @Qualifier가 없으면 빈의 이름을 한정자로 지정한다.
- 스프링 빈 객체의 라이프사이클
  - 객체 생성 -> 의존 설정 -> 초기화 -> 소멸
- 빈 객체는 기본적으로 singleton. @Scope("prototype")으로 설명히면 빈 객체 구할 때마다 새로운 객체를 생성한다.
- AOP
  - 정의 : 여러 객체에 공통적으로 적용할 수 있는 기능을 분리해서 재사용성을 높여주는 프로그래밍 방법
  - 특정 interface I를 다르게 구현한 클래스 A,B가 있다. 그리고 클래스 C는 I타입의 의존 객체를 주입받아서 내부 로직을 수행한다. 이때 C 객체를 생성할 때 A,B 중 어떤 것을 전달하느냐에 따라서 C의 내부 구현이 달라진다. 
  - 이때 C를 프록시 객체, A또는B를 대상각체라고 부른다. 
  - 프록시는 핵심 기능을 구현하지 않고 여러 객체에 공통적으로 적용할 수 있는 기능을 구현한다.
  - 스프링은 프록시 객체를 생성할 때 실제 생성할 빈 객체가 인터페이스를 상속하면, 인터페이스를 이용해서 프록시를 생성한다. 예를 들어 I 빈을 정의할 때 public I i(){return A}라고 되어있으면 i()를 호출하면 A가 아닌 I를 상속한 프록시 객체가 생성된다. 
  - 이 때 프록시가 아닌 A타입 객체를 생성하고 싶으면 proxyTargetClass=true를 사용한다. 
  - 런타입에 A를 주입한 C를 생성하는 과정에서 I를 
