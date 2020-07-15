---
title: "[Spring] JDBC transaction"
excerpt: "초보 웹 개발자를 위한 스프링5 프로그래밍 입문 - 최범균"
date: 2020-07-12
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

## 트랜잭션 처리

이메일이 유효한지 여부를 판단하기 위해 실제로 검증 목적의 메일을 발송하는 서비스를 경험해본 적이 있다. 이들 서비스는 이메일이 함꼐 보낸 링크를 클릭하면 최종적으로 이메일이 유효하다고 판단하고 해당 이메일을 사용할 수 있도록 한다. 이렇게 이메일 인증 시점에 테이블의 데이터를 변경하는 기능은 아래 코드처럼 회원 정보에서 이메일ㅇ르 수정하고 인증 상태를 변경하는 두 쿼리를 실행할 것이다.  

1. jdbcTemplate("update MEMBER set EMAIL = ?", email);
1. jddcTemplate("insert into EMAIL_AUTH values (?, 'T')", email);
  - 이메일이 인증된 것인지 T/F로 판단하기 위함

첫 번째 쿼리는 성공하고 두 번째 쿼리가 실패한 경우에는 첫 번째 쿼리까지 같이 rollback해야한다. 이렇게 두 개 이상의 쿼리를 한 작업으로 실행해야 할 때 사용하는 것이 트랙젝션이다.  

트랜젝션은 여러 쿼리를 논리적으로 하나의 작업으로 묶어준다. 한 트랜잭션으로 묶인 쿼리 중 하나라도 실패하면 전체 쿼리를 실패로 간주하고 실패 이전에 실행한 쿼리를 취소한다.(rollback) 반면에 모든 트랜젝션으로 묶인 모든 쿼리가 성공하면 쿼리 결과를 DB에 실제로 반영하는 commit을 진행한다.  

```java
//jdbc 사용
Connection conn = null;
try{
  conn = DriverManager.getConnection(jdbcUrl, user, pw);
  conn.setAutoCommit(false);
  쿼리 실행
  conn.commit();
}catch(SQLException ex){
  try{
    conn.rollback();
  }catch ( SQLException e){ }
}finally{
  if( conn != null){
    try{
      conn.close();
    }catch (SQLException e){}
  }
}
```

위 내용은 @Transactional을 이용해서 간편하게 처리 가능하다.

## @Transactional을 이용한 트랜젝션 처리

트랜잭션 범위에서 실행하고 싶은 메서드에 @Transactional만 붙이면 된다. 스프링은 @Transactional이 붙은 changePassword()메서드를 동일한 트랜젝션 범위에서 실행한다. 따라서 아래의 두 쿼리는 묶여서 결과가 반영된다.  

1. memberDao.selectByEmail();
1. memberDao.changePassword();

@Transactional이 제대로 동작하려면 두 가지 스프링 설정을 추가해야 한다.

1. 플랫폼 트랜잭션 매니저 빈 설정
1. @Transactional 활성화 설정

```java

@Configuration
@EnableTrasnactionManagement
public class AppCtx{
  ...
  @ public PlatformTransactionManager transactionManager(){
    DataSourceTransactoinmanager tm = new DataSourceTransactionManager();
    tm.setDataSource(dataSource());
    return tm;
  }
}
```

```java
public class ChangePasswordService {

	private MemberDao memberDao;

	@Transactional
	public void changePassword(String email, String oldPwd, String newPwd) {
		Member member = memberDao.selectByEmail(email);
		if (member == null)
			throw new MemberNotFoundException();

		member.changePassword(oldPwd, newPwd);

		memberDao.update(member);
	}

	public void setMemberDao(MemberDao memberDao) {
		this.memberDao = memberDao;
	}

}
```

## @Transactional과 프록시

여러 빈 객체에 공통으로 적용되는 기능을 구현하는 방법으로 AOP를 설명했는데 트랜잭션도 공통 기능 중 하나이다. 스프링은 @Transactional을 이용해서 트랜잭션을 처리하기 위해 내부적으로 AOP를 사용한다. 스프링에서 AOP는 프록시를 통해서 구현된다는 점에서 트랜잭션 처리도 프록시를 통해서 이루어진다.  

@Transaction을 적용하기 위해 @EnableTransaction을 사용하면 스프링은 @Transactional이 적용된 빈 객체를 찾아서 알맞은 프록시 객체를 생성한다.

1. MainForCPS#changePassword() -> changePwdSvc빈의 프록시
1. changePwdSvc빈의 프록시#getTransaction() -> PlatformTransactionManager
1. changePwdSvc빈의 프록시#changePassword() -> ChangePasswordService
1. changePwdSvc빈의 프록시#commit()[또는 rollback()] -> PlatformTransactionManager
1. changePwdSvc빈의 프록시#return -> MainForCPS

## Exception과 Rollback

jdbcTempate은 DB 연동 과정에 문제가 있으면 DataAccessException을 발생한다. DataAccessException은 RuntimeException을 상속하고 있어 실행 도중 익셉션이 발생해도 프록시는 트랜잭션을 롤백한다.  

SQLException은 RuntimeException을 상속하지 않아서 SQLException이 발생해도 트랜잭션을 롤백하지 않는다. RuntimeException 뿐만 아니라 SQLException이 발생하는 경우에도 트랜잭션을 롤백하고 싶으면 @Transactional의 rollbackFor 속성을 사용한다.  

```java
@Transactional(rollbackFor = SQLException.class)
// @Transactional(rollbackFor = {SQLException.class, IOException.class})
// @Transactional(noRollbackFor = {SQLException.class, IOException.class})
public void someMethod(){
  ...
}
```

## 트랜잭션 전파

트랜잭션의 propagation 값의 default는 REQUIRED로 다음과 같은 의미이다.  

- 메서드를 수행하는 데 트랜잭션이 필요하다는 것을 의미한다. 현재 진행중인 트랜잭션이 존재하면 해당 트랜잭션을 사용한다. 존재하지 않으면 새로운 트랜잭션을 생성한다.  

아직 위 말이 어렵다. 아래의 코드를 보면 트랜잭션이 전파되는 특성을 알 수 있다. 

```java
public class SomeService{
  private AnyService anyService;
  
  @Transactional
  public void some(){
    anyService.any();
  }

  public void setAnyService(AnyService as){
    this.anyService = as;
  }
}

public class AnyService{
  @Transactional
  public void any(){
    ...
  }
}
```

```java
@Configuration
@EnableTransactionManagement
public class Config{
  @Bean
  public SomeService some(){
    SomeService some = new SomeService();
    some.setAnyService(any());
    return some;
  }

  @Bean
  public AnyService any(){
    return new AnyService();
  }

  //DataSourceTransactionManager 빈 설정
  //DataSource 설정
}
```

SomeService 클래스와 AnyService 클래스 모두 @Transactional을 적용하고 있다. 두 클래스에 대해 프록시가 생성되는데 @Transactional의 propagation 속성이 REQUIRED인 경우, 현재 진행 중인 트랜잭션이 존재하면 해당 트랜잭션을 사용하고 존재하지 않으면 새롱누 트랜잭션을 생성한다고 했다. 처음 some()을 호출할 때는 트랜잭션을 새로 시작한다. 하지만 some() 내부에서 any()를 호출하면 이미 some() 메서드에 의해 시작된 트랜잭션이 존재하므로 any() 메서드를 호출하는 시점에는 트랜잭션을 새로 생성하지 않는다. 즉, some()와 any()를 한 트랜잭션에 묶어서 실행한다. 


직관적으로 당연하지만, @Transactional 메서드에서 @Transactional이 없는 메서드를 호출하면 진행 중인 트랜잭션 범위에서 쿼리를 실행한다.  

## @Transactional의 주요 속성


| 속성 | 타입 | 설명 |
|:--------|:--------|:--------|
|value| String | 트랜잭션을 관리할 때 사용할 PlatformTransactionManager 빈의 이름을 지정한다. 기본값은 " "이다.|
|propagation| Propagation | 트랜잭션 전파 타입을 지정한다. 기본값은 Propagation.REQUIRED이다. |
|isolation| Isolation | 트랜잭션 격리 레벨을 지정한다. 기본값은 Isolation.DEFAULT이다. |
|timeout | int | 트랜잭션 제한 시간을 지정한다. 기본값은 -1로 데이터베이스의 타임아웃 시간을 사용한다. 초 단위로 지정한다. |

| Propagation 값 | 설명 |
|:--------|:--------|
|REQUIRED|메서드를 수행하는 데 트랜잭션이 필요하다는 것을 의미한다. 현재 진행중인 트랜잭션이 존재하면 해당 트랜잭션을 사용한다. 존재하지 않으면 새로운 트랜잭션을 생성한다.|
|MANDATORY| REQUIRED와 같지만 진행 중인 트랜잭션이 존재하지 않을 때 익셉션을 발생한다. |
|REQUIRES_NEW| 항상 새로운 트랜잭션을 시작한다. 진행 중인 트랜잭션이 존재하면 기존 트랜잭션을 일시 중지하고 새로운 트랜잭션을 시작한다. 새로 시작된 트랜잭션이 종료된 뒤에 기존 트랜잭션이 계속된다. |
|SUPPORTS| 메서드가 트랜잭션을 필요로하지는 않지만, 진행 중인 트랜잭션이 존재하면 트랜잭션을 사용한다는 것을 의미한다. 진행 중인 트랜잭션이 존재하지 않더라도 메서드는 정상적으로 동작한다.|
|NOT_SUPPORTS| 메서드가 트랜잭션을 필요로 하지 않음을 의미한다. SUPPPORTS와 달리 진행 중인 트랜잭션이 존재할 경우 메서드가 실행되는 동안 트랜잭션은 일시 중지되고 메서드 실행이 종료된 이후에 트랜잭션을 계속 진행한다.|
|NEVER| 메서드가 트랜잭션을 필요로 하지 않는다. 만약 진행 중인 트랜잭션이 존재하면 익셉션이 발생한다.|
|NESTED| 진행 중인 트랜잭션이 존재함ㄴ 기존 트랜잭션에 중첩된 트랜잭션에서 메서드를 실행한다. 진행 중인 트랜잭션이 존재하지 않으면 REQUIRED와 동일하게 동작한다. 이 기능은 JDBC 3.0 드라이버를 사용할 때에만 적용된다.|

| Isolation 값 | 설명 |
|:--------|:--------|
|DEFAULT| 기본 설정을 사용한다.|
|READ_UNCOMMITED|다른 트랜잭션이 커밋하지 않은 데이터를 읽을 수 있다.|
|READ_COMITED|다른 트랜잭션이 커밋한 데이터를 읽을 수 있다.|
|REPREATABLE_READ| 청므에 읽어 온 데이터와 두 번째 읽어 온 데이터가 동일한 값을 갖는다.|
|SERIALIZABLE| 동일한 데이터에 대해서 동시에 두 개 이상의 트랜잭션을 수행할 수 없다. 동일 데이터에 100개 연결이 접근하면 한 번에 한 개의 연결만 처리한다. 따라서 저반적인 응답 속도가 느려진다.|  




