---
title: "[Spring] AOP"
excerpt: "초보 웹 개발자를 위한 스프링5 프로그래밍 입문 - 최범균"
date: 2020-07-08
categories:
  - Spring
tags:
  - spring
toc : false
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## 들어가며

spring framework의 AOP 기능은 spring-aop 모듈이 제공하는데 spring-context 모듈을 의존 대상에 추가하면 spring-aop 모듈도 함께 의존 대상에 포함된다. aspectjweaver 모듈은 AOP를 설정하는데 필요한 annotation을 제공하므로 이 의존을 추가해야 한다.  

```xml

<dependency>
  <groupId>org.aspectj</groupId>
  <artifactId>aspectjweaver</artifactId>
  <version>1.8.13</version>
</dependency>

```

## 프록시 객체

기존 코드를 변경하지 않고 함수의 실행 시간을 출력할 수 있따. ImpeCalculator 클래스나 RecCalculator 클래스의 코드 변경 없이 이 두 클래스의 factorial() 메서드 실행 시간을 출력할 수 있게 된다. 또, 실행 시간을 구하는 코드의 중복을 제거했다. 나노초 대신 밀리초를 사용해서 실행 시간을 구하고 싶다면 ExeTimeCalculator 클래스만 변경하면 된다.  

이것이 가능한 이유는 두 가지 규칙을 따랐기 때문이다.  
1. factorial() 기능 자체를 직접 구현하기 보다는 다른 객체에 factorial()의 실행을 위임한다.
1. 계산 기능 외에 다른 부가적인 기능을 실행한다. 여기서 부가적인 기능은 실행 시간 측정이다.  

ExeTimeCalculator처럼 핵심 기능의 실행은 다른 객체에 위임하고 부가적인 기능을 제공하는 객체를 프록시 객체라고 한다. ImpeCaculator 객체가 프록시의 대상 객체가 된다. ExeTimeCalculator를 기능 추가와 확장에 초점을 맞추어서보면 Decoderator라고 볼 수도 있지만, 핵심 기능의 실행을 다른 객체에 위임한다는 관점이 더 중요하다. 프록시는 핵심 기능을 구현하지 않는다.  

## AOP

Aspect Oriented Programming의 약자로, `여러 객체에 공통적으로 적용할 수 있는 기능을 분리`해서 `재사용성을 높여`주는 프로그래밍 기법이다. **AOP는 핵심 기능과 공통 기능의 구현을 분리함으로써 핵심 기능을 구현한 코드의 수정 없이 공통 기능을 적용할 수 있게 만들어 준다.**  

핵심 기능과 공통 기능을 구분해서 구현하는 방법은 프록시 객체를 사용하는 것이다. 스프링도 프록시를 이용해서 AOP를 구현한다. AOP의 기본 개념은 핵심 기능이 공통 기능을 삽입하는 것이다. 즉 핵심 기능의 코드를 수정하지 않으면서 공통 기능이 구현을 추가하는 것이 AOP이다. 핵심 기능에 공통 기능을 삽입하는 방법은 세 가지가 있따.

1. 컴파일 시점에 코드에 공통 기능을 삽입하는 방법
  - AOP 개발 도구가 소스 코드를 컴파일 하기 전에 공통 구현 코드를 소스에 삽입하는 방식으로 동작한다.
1. 클래스 로딩 시점에 바이트 코드에 공통 기능을 삽입하는 방법
1. 런타입에 프록시 객체를 생성해서 공통 기능을 삽입하는 방법

첫 번째와 두 번째 방법은 스프링 AOP에서는 지원히지 않으며 AspectJ와 같이 AOP 전용 도구를 사용해서 적용할 수 있다. 스프링이 제공하는 방식은 세 번째 방식이다.  

1. client :  business logic 호출
1. AOP 프록시 : 공통 기능 실행
1. AOP 프록시 : 실제 객체의 business logic 호출
1. 실제 객체 : business logic 수행
1. AOP 프록시 : 공통 기능 실행
1. AOP 프록시 : client로 return 

스프링이 제공하는 AOP 방식은 실제 객체를 실행하기 전.후에 공통 기능을 호출한다. 스프링 AOP는 프록시 객체를 자동으로 만들어준다. **따라서 ExeTimeCalculator 클래스처럼 상위 타입의 인터페이스를 상속받는 프록시 클래스를 직접 구현할 필요가 없다.** **단지 공통 기능을 구현한 클래스만 알맞게 구현하면 된다.**  

| terminology | 의미 |
|:--------|:--------|
|Advice | 언제 공통 관심 기능을 핵심 로직에 적용할 지를 정의한다. 예를 들어 메서드를 호출하기 전(언제)에 트랜잭션 시작(공통 기능) 기능을 적용한다는 것을 정의한다. |
|Joinpoint| Advice를 적용 가능한 지점을 의미한다. 메서드 호출, 필드 값 변경 등이 Jointpoint에 해당한다. 스프링은 프록시를 이용해서 AOP를 구현하기 때문에 메서드 호출에 대한 Joinpoint만 지원한다. |
|PointCut| Joinpoint의 부분 집합으로서 실제 Advice가 적용되는 Joinpoint를 나타낸다. 스프링에서는 정규 표현식이나 AspectJ 문법을 이용해서 Pointcut을 정의할 수 있다. |
|Weaving| Advice를 핵심 로직 코드에 적용하는 것을 weaving이라고 한다.|
|Aspect| 여러 객체에 공통으로 적용되는 기능을 Aspect라고 한다. 트랜잭션이나 보안 등이 Aspect의 좋은 예이다. |

스프링은 프록시를 이용해서 메서드 호출 시점에 Aspect를 적용하기 때문에 구현 가능한 Advice의 종류는 method의 실행에 관해 제한되며 종류는 아래와 같다.  
| terminology | 의미 |
|:--------|:--------|
| Before Advice |대상 객체의 method 호출 전에 공통 기능을 실행 |
| After Returning Advice |대상 객체의 method가 익셉션 없이 실행된 이후 공통 기능을 실행|
| After Throwing Advice |대상 개게의 method가 익셉션이 발생한 경우 공통 기능을 실행|
| After Advice | 익센션 발생 여부에 상관없이 대상 객체의 메서드 실행 후 공통을 실행(try-catch-finally의 finally와 비슷)|
| Arount Advice| 대상 객체의 메서드 실행 전, 후, 또는 익셉션 발생 시점에 공통 기능을 실행하는데 사용|

Around Advice가 다양한 시점에 원하는 기능을 삽입할 수 있어서 가장 잘 사용돈다. 캐시 기능, 성능 모니터링 기능과 같은 Aspect를 구현할 때에는 Around Advice를 주로 이용한다. 

1. Aspect로 사용할 클래스에 @Aspect를 붙인다.
1. @Pointcut으로 공통 기능을 적용할 POintout을 정의한다.
1. 공통 기능을 구현한 메서드에 @Around를 적용한다. 

1. ExeTImeAspect.java
  - @Aspect
  - @Pointcut
  - @Around
1. AppCtx.java
  - @EnableAspectJAutoProxy
  - @Bean AspectClass

1. Main.java
  - ctx = new AppCtx();
  - g = ctx.getBean();
  - g.factorial();

Main만 보면 g의 type이 getBean에서 명시한 객체인지 Aspect에 의한 프록시 객체인지 알 수 없다. g.getClass().getName()을 해봐야 알 수 있다. ExtimeAspect를 구현해도 AppCtx에서 @Bean으로 등록하지 않으면 AOP가 적용되지 않는다. AppCtx에서는 ExeTimeAspect를 빈 객체로 등록하고 등록되어서 인스턴스가 생성될 때 @Aspect와 @Pointcut @Around가 적용된다.  

## 프록시 생성 방식

스프링은 AOP를 위한 프록시 객체를 생성할 떄 실제 생성할 빈 객체가 인터페이스를 상속하면 인터페이스를 이용해서 프록시를 생성한다. 앞서 예에서도 RecCalculator 클래스가 Calculator 인터페이스를 상속하므로 Calculator 인터페이스를 상속받은 프록시 객체를 생성한다. 따라서 빈의 실제 타입이 RecCalculator라고 하더라도 caculator 이름에 대항하는 빈 객체의 타입은 Caculator 인터페이스를 상속받은 프록시 타입이 된다.  

RecCalculator cal = ctx.getBean("calculator", RecCalculator.class);을 하면 calculator 빈의 실제 타입은 Calculator를 상속한 프록시 타입이므로 RecCalculator 타입 변환을 할 수 없어서 익셉션이 발생한다. 빈 객체가 인터페이스를 생속할 때 인터페이스가 아닌 클래스를 이용해서 프록시를 생성하고 싶다면 아래와 같이 설정한다.  

@EnableAspectJAutoProxy(proxyTargetClass = true)  

이렇게하면 cal객 체는 RecCalculator를 상속받았으므로 RecCalculator로 변환이 가능하다. 

## execution 명시자 표현식 

execution(수식어패턴? 리턴타입패턴 클래스이름패턴?메서드이름패턴(파라미터패턴))
- 수식어패턴 : 생략가능하며 public protected 등이온다. 스프링 AOP는 public 메서드에만적용 할 수 있다.
- 메서드이름패턴 set\*: set으로 시작하는 이름을 가진 모든 메서드
- 패키지이름패턴 chap07 : chap07 패키지
- 패키지이름패턴 chap07.. : chap07 패키지와 그 하위 패키지
- 파라미터패턴 (..) : 0개 이상의 파라미터
- 파라미터패턴 (Ingeter, ..) : Ingeter 파라미터 포함해서 1개 이상의 파라미터

| terminology | 수식어패턴? | 리턴타입패턴 | 패키지이름패턴? | 클래스이름패턴? |메서드이름패턴 | 파라미터패턴 |  
|:--------|:--------|:--------|:--------|:--------|:--------|:--------|  
|execution(public void set\*(..))|public| void | 생략 | 생략 | set\* | (..) |  
|execution(\* chap07.\*.\*())|생략| \* | chap07 | \* | \* | () |  
|execution(\* chap07..\*.\*(..))|생략| \* | chap07.. | \* | \* | (..) |  
|execution(Long chap07.Calculator.factorial(..))|생략| Long | chap07 | Calculator | factorial | (..) |  
|execution(\* get\*(\*))|생략| \* | 생략 | 생략 |get\* | (\*) | 
|execution(\* get\*(\*,\*))|생략| \* | 생략 | 생략 | get\* | (\*,\*) |
|execution(\* read\*(Integer, ..)) | 생략 | \* | 생략 | 생략 | read\* | (Integer, ..) | 

