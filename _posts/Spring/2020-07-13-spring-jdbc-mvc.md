---
title: "[Spring] JDBC MVC"
excerpt: "초보 웹 개발자를 위한 스프링5 프로그래밍 입문 - 최범균"
date: 2020-07-13
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

## 스프링 MVC 시작하기

스프링을 사용하는 여러 이유가 있지만 한 가지 이유를 꼽자면 스프링이 지원하는 웹 MVC 프레임워크 때문이다. 스프링 MVC의 설정 방법만 익혀두면 웹 개발에 필요한 다영한 기능을 구현할 수 있게 된다. 일단 이 장에서는 스프링 MVC 프레임웤를 이용해서 간단한 웹 프로그램을 작성해서 실행해 보고 이후 점진적으로 입문에 필요한 내용을 공부해 나간다.  


- src/main/java
- src/main/webapp : HTML,CSS,JS,JSP 등 웹 애플리케이션을 구현하는데 필요한 코드가 위치
- src/main/webapp/WEB-INF : web.xml이 위치
- src/main/webapp/WEB-INF/view

**Info Notice:**  
서플릿 스펙에 따르면 WEB-INF 풀더의 하위 폴더로 lib 폴더와 classes 폴더를 생성하고 각각의 폴더에 필요한 jar 파일과 컴파일 된 클래스 파일이 위치해야 한다. 하지만 메이븐/그레이들 프로젝트의 경우 필요한 jar 파일은 pom.xml/build.gradle 파일의 의존을 통해 지정하고 컴파일된 결과는 target/build 폴더에 위치한다. 때문에 WEB-INF 폴더 밑에 lib폴더나 classes 폴더를 생성할 필요가 없다.  
{: .notice--info}


## 스프링 MVC를 위한 설정

스프링 MVC를 사용하려면 다양한 구성 요소를 설정해야 한다. 이 요소를 처음부터 끝까지 직접 구성하면 설정이 매우 복잡해진다. 실제로 스프링 2.5나 3 버전에서 스프링 MVC를 사용하려면 상황에 맞는 설정을 일일이 구성해야 했다. 이런 복잡한 설정을 대신해 주는 것이 바로 @EnableWebMvc이다.  

@EnableWebMvc를 사용함ㄴ 내부적으로 다양한 빈 설정을 추가해준다. 이 설정을 직접 하려면 수십 줄에 가까운 코드를  작성해야 한다.  

@EnableWebMvc이 스프링 MVC를 사용하는데 필요한 기본적인 구성을 설정해준다면, WebMvcConfigure 인터페이스는 스프링 MVC의 개별 설정을 조정할 때 사용한다.  

- configureDefaultServeletHandling() : 디폴트 서블릿의 설정을 조정
- configureViewResolver() : ViewResolver와 관련된 설정을 조정

```java
package config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//스프링 MVC 설정을 활성화 한다.
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {
	// 매핑 경로를 /로 주었을 때, JSP, HTML, CSS 등을 올바르게 처리하기 위한 설정을 추가한다.
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}
	//JSP를 이용해서 컨트롤러의 실행 결과를 보여주기 위한 설정을 추가한다. 
	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		registry.jsp("/WEB-INF/view/", ".jsp");
	}
}
```

아직은 무슨 말인지 모르겠지만 아주 간단하게 MVC를 위한 초기 설정을 완료했다고 생각하면 된다.  

## Web MVC 기초

- Controller : 웹 요청을 처리하고 그 결과를 뷰에 전달하는 스프링 빈 객체
  - @Controller를 붙여야 함
  - @GetMapping(or @PostMapping)을 사용해서 처리할 경로를 지정해야 함
- @RequestParam : HTTP 요청 파라미터의 값을 메서드의 파라미터로 전달할 때 사용
  - name 요청 파라미터의 값을 name 파라미터로 전달
- Model : 컨트롤러의 처리 결과를 뷰에 전달할 때 사용됨

```java
//요청 : http://host:part/sp5-charp09/hello?name=bk
@Controller
public class HelloController {

	@GetMapping("/hello")
	public String hello(Model model,
			@RequestParam(value = "name", required = false) String name) {
		model.addAttribute("greeting", "안녕하세요, " + name);
		return "hello";
	}
}
```

### @GetMapping의 서블릿 컨텍스트 경로(웹 앱 경로)

@GetMapping은 서플릿 컨텍스트 경로를 기준으로 한다.

톰캣에서 webapps\sp5-chap09 폴더는 http://host/sp5-chap09에 대응한다. 이 때 sp5-chap09 폴터가 컨텍스트 경로가 된다.  

따라서 http://host/sp5-chap09/main/list 경로를 처리하기 위한 컨트롤러는 @GetMapping("/main/list")를 사용한다. 
@GetMapping("/hello")의 경우 http://host/sp5-chap09/hello의 요청이 처리된다. 

## 스프링 MVC 핵심 구성 요소

1. 웹브라우저의 요청 전송을 DispatcherServlet가 받음
1. \<\<spring bean\>\> HandlerMapping에게 요청을 처리할 컨트롤러 검색 요청
  - HandlerMapping은 클라이언트의 요청 경로를 이용해서 이를 처리할 컨트롤러 빈 객체를 DiapatcherServlet에게 전달
1. \<\<spring bean\>\> HandlerAdapter에요청을 처리할 컨트롤러 검색 요청
  - @Controller, Controller 인터페이스, HttpRequestHandler 인터페이스를 동일한 방식으로 처리하기 위해 HandlerAdapter 빈을 거침
  - 컨트롤러의 알맞은 메서드를 호출해서 요청을 처리하고 그 결과를 DispatcherServlet에게 리턴
  - 이 때 컨트롤러는 처리 결과를 ModelAndView라는 객체로 변환해서 리턴
1. 결과를 보여주기 위한 View를 찾기 위해 ViewResolver를 사용
  - viewResolver는 매번 새로운 View 객체를 생성해서 DispatcherServlet에 리턴
1. DispatcherServlet은 ViewResolver가 리턴한 View 객체에게 응답 결과 생성을 요청
  - JSP를 사용하는 경우 View 객체는 JSP를 실행함으로써 웹 브라우저에서 전송할 응답 결과를 생성

### ControllerMapping이 아닌 HandlerMapping인 이유

스프링 MVC는 웹 요청을 처리할 수 있는 범용 프레임워크이다. 이 책에서는 @Controller를 붙인 클래스를 이용해서 클라이언트의 요청을 처리하지만 원한다면 자신이 직접 만든 클래스를 이용해서 클라이언트의 요청을 처리할 수도 있다. 즉 DIapatcherServlet 입장에선늨 ㅡㄹ라이언트 요청을 처리하는 객체의 타입이 반드시 @Controller를 적용한 클래스일 필요는 없다. 실제로 스프링이 클라이언트의 요청을 처리하기 위해 제공하는 HttpRequestHandler도 존재한다.  

DispatcherServlet은 핸들러 객체의 타입에 상관없이 ModelAndView라는 타입으로만 실행 결과를 받을 수 있으면 된다. 그런데 핸들러가 리턴하는 객체가 ModelAndView가 아닐 수도 있기 때문에 ModelAndView로 변환해주는 객체가 필요하고 HandlerAdapter가 이 변환을 처리한다.  

DispatcherServlet은 설정 파일에서 빈에 대한 정의를 가져와서 스프링 컨테이너는 생성하다. 그 컨테이너 안에는 HandlerMapping, HandlerAdapter, controller bean, viewResolver의 빈 객체가 들어있다.  

## WebMvcConfigure 인터페이스와 설정

```java
@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer{
	@Override
	public void configureDefaultServletHandling(
		DefaultServletHandlerCOnfigurer configurer){
			configurer.enable();
	}

	@Override
	public void configureViewResolver(ViewResolverRegistry registry){
		registry.jsp("/WEB-INF/view/",".jsp");
	}
}
```  

여기서 설정 클래스는 WebMvcConfigurer 인터페이스를 상속하고 있따. @Configurer를 붙인 클래스 역시 컨테이너에 빈으로 등록되므로 mvcConfig 클래스는 WebMvcConfigurer 타입의 빈이 된다.  

## 디폴트 핸들러와 HandlerMapping의 우선순위

- src/main/webapp/WEB-INF/view/web.xml에서 url-pattern이 '/'인 경우 .jsp로 끝나는 요청을 제외한 모든 요청을 DispatcherServlet이 처리한다. .html,  .css 확장자도 DispatcherServlet이 처리한다.  

@GetMapping을 사용해서 모든 경로를 처리하기 위한 컨트롤러 객체를 직접 구현할 수도 있다. 그보다는 WebMvcConfigure의
configureDefaultServeletHandling 메서드를 사용하는 것이 편리하다.  

```java
@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer{
	@Override
	public void configureDefaultServletHandling(
		DefaultServletHandlerCOnfigurer configurer){
			configurer.enable();
	}
```


