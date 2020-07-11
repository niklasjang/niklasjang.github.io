---
title: "[Spring] JDBC"
excerpt: "초보 웹 개발자를 위한 스프링5 프로그래밍 입문 - 최범균"
date: 2020-07-11
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

DB 연동을 처리하는 방법은 JPA, MyBatis 등을 사용하는 방법이 있지만 지금은 JDBC를 통해서 기본적인 DB 연동을 처리하는 방법을 배운다.

## JDBC 프로그래밍의 단점을 보완하는 스프링

JDBC API를 이용하면 DB연동에 필요한 Connection을 구한 다음 쿼리를 실행하기 위해서 PreparedStatement를 생성한다. 그리고 쿼리를 실행한 뒤에는 finally 블록에서 ResultSet, PreparedStatement, Connection을 닫는다.  

```java

Member member;
Connection conn = null;
PreparedStatement pstmt = ull;
ResultSet rs = null;

try{
  conn = DriverManager.getConection("jdbc:mysql://localhost/spring5fs", "spring5", "spring5");
  pstmt = conn.prepareStatement("select * from MEMBER where EMAIL=?");
  pstmt.setString(1, email);
  rs = pstmt.executeQuery();
  if(rs.next()){
    member = new Member(rs.getString("Email"),
    rs.getString("PASSWORD"),
    rs.getString("NAME"),
    rs.getTimestamp("REGDATE"));
    member.setId(rs.getLong("ID"));
    return member;
  }else{
    return null;
  }
}catch(SQLException e){
  e.printStackTrace();
  throw e;
}finally{
  if(rs != null) try(rs.close();) catch(SQLException e2){}
  if(pstmt != null) try(pstmt.close();) catch(SQLException e1){}
  if(conn != null) try(conn.close();) catch(SQLException e){}
}
```

위 코드에서 try 내부의 대부분인 중요 로직이고 나머지는 반복적으로 실행되는 부분이다.  

코드의 중복을 막기 위해서 템플릿 메서드 패턴과 전략 패턴을 함께 사용한다. 스프링은 두 패턴을 엮은 JdbcTemplate 클래스를 제공한다. 이를 활용하면 아래와 같이 변경을 할 수 있따.

```java

List<Member> results = jdbcTemplate.query(
  "select * from MEMBER Where EMAIL = ?",
  new RowMapper<Member>(){
    @Override
    public Member mapRow(ResultSet rs, int rowNum) throws SQLException{
      Member member = new Member(rs.getString("Email"),
      rs.getString("PASSWORD"),
      rs.getString("NAME"),
      rs.getTimestamp("REGDATE"));
      member.setId(rs.getLong("ID"));
      return member;
    }
  }, 
  email);
return results.isEmpty() ? null : results.get(0);
```

또 스프링은 트랜잭션 관리가 쉽다. JDBC API로 트랜잭션을 처리하려면 Connection의 setAutoCommit(false)를 이용해서 자동 커밋을 비활성화하고 commit()과 rollback()
메서드를 이용해서 트랜잭션을 커밋하거나 롤백해야 한다.  

```java

public void insert(Member member){
  Connection conn = null;
  PreparedStatement pstmt = null;
  try{
    conn = DriverManager.getConection("jdbc:mysql://localhost/spring5fs?characterEncoding=utf8", "spring5", "spring5");
    conn.setAutoCommmit(false);
    ... DB 쿼리 실행
    conn.commit();
  }
}catch(SQLException ex){
  if(conn != null){
    try{conn.rollback();} catch(SQ:Exception e) {}
  }
}finally{
  if(pstmt != null) try(pstmt.close();) catch(SQLException e1){}
  if(conn != null) try(conn.close();) catch(SQLException e){}
}
```

스프링을 사용하면 트랜잭션을 적용하고 싶은 메서드에 @Transactional을 붙이기만하면 된다. 

```java

@Transactional
public void insert(Member member){
  ...
}
```

## pom.xml

```xml
<dependency>
<!--  JdbcTemplate 등 JDBC 연동에 필요한 기능을 제공한다. -->

  <groupId>org.springframework</groupId>
  <artifactId>spring-jdbc</artifactId>
  <version>5.0.2.RELEASE</version>
</dependency>
<dependency>
  <!--  DB 커넥션풀 기능을 제공한다. -->
  <groupId>org.apache.tomcat</groupId>
  <artifactId>tomcat-jdbc</artifactId>
  <version>8.5.27</version>
</dependency>
<dependency>
  <!--  MySQL 연결에 필요한 JDBC 드라이버를 제공한다.-->
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>5.1.45</version>
</dependency>
```

DB 커넥션풀 기능은 쓰레드풀처럼 일정 갯수의 DB 커넥션을 미리 만들어두고 필요한 프로그램이 커넥션을 가져가는 방식을 말한다. DBMS 입장에서는 커넥션의 수를 일정 수준 이하로
유지하여 부하를 안정적으로 줄일 수 있다. 여기서는 Tomcatdml JDBC를 사용해서 DB 커넥션풀 기능을 사용한다.  

## MySQL 설정

| 기능 | 명령어 |
|:--------|:--------|
|접속 계정 비밀번호 변경|SET PASSWORD = PASSWORD('{new password}');|
|계정 생성| 1. create user spring5@localhost;|
|계정 비밀번호 추가| 1. mysql -uroot -p<br>2. use mysql;<br> 3.  alter user spring5@localhost identified with mysql_native_password by 'tjrdl1226';|
|database 생성| create database spring5f character set = utf8;|
|spring5fs DB에 spring5 계정이 접근할 수 있도록 권한 부여| grant all privileges on spring5fs.* to spring5@localhost;|
|spring5fs에 table 생성| create table spring5fs.MEMBER(<br>ID int auto_increment primary key,<br>EMAIL varchar(255),<br>PASSWORD varchar(100),<br>NAME varchar(100),<br>REGDATE datetime,<br>unique key(EMAIL)<br>)engine=InnoDB character set = utf8;|
|데이터베이스 선택| use spring5fs;|
|row 삽입| insert into MEMBER (EMAIL, PASSWORD, NAME, REGDATE) VALUES('niklasjang@gmail.com', 1234, 'jhs', now());|

## DataSource 설정

JDBC API는 DriverManager 외에 DataSource를 이용해서 DB 연결을 구하는 방법을 정의하고 있다. DataSource를 사용하면 다음과 같은 방식으로 Connection을 구할 수 있다.

```java
Connection conn = null;
try{
  //dataSource는 생성자 설정 메서드를 이용해서 주입받음
  conn = dataSource.getConnection();
}
```

스프링이 제공하는 DB 연동 기능은 DataSource를 사용해서 DB Connection을 구한다. DB 연동에 사용할 DataSource를 스프링 빈으로 등록하고 DB연동 기능을 구현한 빈 객체를 DataSource를 주입받아 사용한다.  

Tomcat JDBC 모듈은 javax.sql.DataSource를 구현한 DataSource 클래스를 제공한다. 이 클래스를 스프링 빈으로 등록해서 DataSource로 사용할 수 있다.  

DataSource를 구현한 클래스는 DataSource()객체를 생성하고 database server의 주소, user, pwd, 커넥션 풀 설정을 진행한 뒤에 DataSource()객체를 return 한다. 여기서 커넥션 풀의 설정을 이해하려면 상태를 알아야 한다.  

## 커넥션 풀의 상태

커넥션 풀은 커넥션으르 생성하고 유지한다. 커넥션 풀에 커넥션을 요청하면 해당 커넥션은 활성(active) 상태가 되고, 커넥션을 다시 커넥션 풀에 반환하면 유휴(idle)상태가 된다. DataSource#getConnection()을 실행하면 커넥션 풀에서 커넥션을 가져와 커넥션이 활성 상태가 된다. 반대로 커넥션을 close하면 커넥션은 풀로 돌아가서 유휴 상태가 된다. 커넥션 풀의 설정 중 maxWait()은  대기 시간 내에 반환된 커넥션이 있으면 해당 커넥션을 구하고, 없으면 익셉션을 발생시킨다.  

## 커넥션 풀을 사용하는 이유

커넥션 풀에 생성된 커넥션은 지속적으로 재사용된다. 그러네 한 커넥션이 영원히 유지되는 것은 아니다. DBMS 설정에 따라 일정 시간 내에 쿼리를 실행하지 않으면 연결을 끊기도 한다. 예를 들어서 DBMS에 5분 동안 쿼리를 실행하지 않으면 DB 연결을 끊도록 설정했다면, 특정 커넥션이 커넥션 풀에 5분 넘게 유휴 상태로 존재하면 커넥션을 연결을 끊지만 커넥션은 여전히 풀 속에 남아있다. 이 상태에서 해당 커넥션을 풀에서 가져와 사용하면 연결이 끊어진 커넥션이므로 익셉셥이 발생하게 된다.  

```java
@Bean(destroyMethod = "close")
public DataSource dataSource() {
DataSource ds = new DataSource();
ds.setDriverClassName("com.mysql.jdbc.Driver");
ds.setUrl("jdbc:mysql://localhost/spring5fs?characterEncoding=utf8");
ds.setUsername("spring5");
ds.setPassword("tjrdl1226");
//커넥션 풀을 초기화할 때 생성할 초기 커넥션 개수를 지정한다. 기본값은 10이다.
ds.setInitialSize(2);
//커넥션애서 가져올 수 있는 최대 커넥션의 갯수를 지정한다. 기본값은 100이다.
ds.setMaxActive(10);
//커넥션이 풀이 유휴 상태로 있는 동안에 검사할지 여부를 지정한다. 기본값은 false이다.
ds.setTestWhileIdle(true);
//커넥션 풀에 유휴 상태로 유지할 최소 시간을 밀리초 단위로 지정한다.
//testSHilwIdle이 true이면 이 값을 초과한 커넥션을 풀에서 제거한다. 기본값은 1분이다.
ds.setMinEvictableIdleTimeMillis(60000 * 3);
//커넥션 풀의 유휴 커넥션을 검사할 주기를 밀리초 단위로 지정한다. 기본값은 5000밀리초(5초)이다.
//이 값을 1초 이하로 설정하면 안된다. 
ds.setTimeBetweenEvictionRunsMillis(10 * 1000);
return ds;
}
```  

## JdbcTemplate를 이용한 쿼리 실행

스프링을 사용하면 DataSource나 Connection, Statement, ResultSet을 직접 사용하지 않고 JdbcTemplate을 이용해서 편리하게 쿼리를 실행할 수 있다. 

### Jdbc Template 생성

위에서 설정한 DataSource는 아래와 같이 Dao에 전달된다.  

```java
@Bean
public MemberDao memberDao() {
  return new MemberDao(dataSource());
}
```

그러면 MemberDao는 dataSource를 사용해서 JdbcTemplate를 생성한다. 

```java
import org.springframework.jdbc.core.JdbcTemplate;
public class MemberDao {
	private JdbcTemplate jdbcTemplate;
	public MemberDao(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
  ...
}
```

### JdbcTEmplate를 이용한 조회 쿼리 실행

JdbcTemplate 클래스는 SELECT 쿼리 실행을 위한 query() 메서드를 제공한다.  

1. List<T> query(String sql, RowMapper<T> rowMapper)
1. List<T> query(String sql, Object[] args, RowMapper<T> rowMapper)
1. List<T> query(String sql, RowMapper<T> rowMapper, Object... args)

query() 메서드는 sql 파라미터로 전달받은 쿼리를 실행하고 RowMapper를 이용해서 ResultSet의 결과를 자바 객체로 반환한다. sql 파라미터가 아래와 같이 인덱스 기반 파라미터를 가진 쿼리이면 args 파라미터를 이용해서 각 인덱스 파라미터의 값을 지정한다.  

```sql
select * from member where email=?
```

쿼리 실행 결과를 자바 객체로 변환할 때 사용하는 RowMapper 인터페이스는 다음과 같다.

```java
package org.springframework.jdbc.core;

public interface RowMapper<T>{
  T mapRow(ResultSet rs, int rowNum) throws SQLException;
}
```

RowMapper의 mapRow() 메서드는 SQL 실행 결과로 구한 ResultSet에서 한 행의 데이터를 읽어와 자바 객체로 변환하는 매퍼 기능을 구현한다. RowMapper 인텊이스를 구현한 클래스를 작성할 수도 있지만 임의 클래스나 람다식으로 RowMapper 인터페이스를 생성해서 Query() 메서드에 전달할 때도 많다.  

```java
//임의 클래스
public Member selectByEmail(String email) {
  List<Member> results = jdbcTemplate.query(
      "select * from MEMBER where EMAIL = ?",
      new RowMapper<Member>() {
        @Override
        public Member mapRow(ResultSet rs, int rowNum) throws SQLException {
          Member member = new Member(
              rs.getString("EMAIL"),
              rs.getString("PASSWORD"),
              rs.getString("NAME"),
              rs.getTimestamp("REGDATE").toLocalDateTime());
          member.setId(rs.getLong("ID"));
          return member;
        }
      }, 
      email); //SQL의 ?에 들어갈 값
```

```java
//lambda를 활용한 임의 클래스 작성
public Member selectByEmail(String email) {
  List<Member> results = jdbcTemplate.query(
   "select * from MEMBER where EMAIL = ?",
    (ResultSet rs, int rowNum)->{
      Member member = new Member(
          rs.getString("EMAIL"),
          rs.getString("PASSWORD"),
          rs.getString("NAME"),
          rs.getTimestamp("REGDATE").toLocalDateTime());
      member.setId(rs.getLong("ID"));
      return member;
    }, 
    email); //SQL의 ?에 들어갈 값
```

동일한 RowMapper 구현을 여러 곳에서 사용한다면 RowMapper 인터페이스를 구현한 클래스를 만들어서 코드 중복을 막을 수 있다.  

## 결과가 1행인 경우 사용하는 queryForObject()

### 실행 결과 column이 1개인 경우

쿼리문이 `SELECT count(*) FROM topic;`인 경우 결과는 1행이다. 이때는 아래와 같이 진행한다.  

```java
//jdbcTempalte.query();
public int count(){
  List<Integer> results = jdbcTemplate.query(
    "select count(*) from MEMBER",
    new RowMapper<Integer>(){
      @Override
      public Integer mapRow(ResultSet rs, int rowNum) throws SQLException{
        return rs.getInt(1);
      }
    });
  return results.get(0);
}
```

```java
//jdbcTempalte.queryForObject();
public int count(){
  List<Integer> results = jdbcTemplate.queryForObject(
    "select count(*) from MEMBER", Integer.class);
    //"select avg(height) from FURNITURE where TYPE=? and STATUS=?",Double.class, 100,"S");
  return count;
}
```

### 실행 결과 column이 두 개 이상인 경우

query()를 사용하는 기존의 방법과 차이점은 List\<T\>가 아닌 RowMapper로 변환해주는 타입(아래 코드에서는 Member)이라는 점이다. 즉, queryForObject를 사용한다는 것은 실행 결과가 1개의 row이기 때문에 column이 여러 개인 경우 Member와 같은 사용자 지정 object을 return한다. (column이 1개인 경우는 Integer.class를 적음으로써 어떤 클래스의 객체를 return할지 지정해주었다.)  

```java
Member member = jdbcTemplate.queryForObject(
  "select * from MEMBER where ID = ?",
  new RowMapper<Member>(){
    @Override
    public Member mapRow(ResultSet rs, int rowNum) throws SQLException{
      Member member = new Member(rs.getString("EMAIL"),
        rs.getString("PASSWORD"),
        rs.getString("NAME"),
        rs.getTimestamp("REGDATE").toLocalDataTime());
      member.setId(rs.getLong("ID"));
      return member;
    }
  },
  100);
```

## jdbcTemplate로 INSERT, UPDATE, DELETE 쿼리 실행하기

INSERT, UPDATE, DELETE는 아래의 메서드를 사용한다.  

1. int update(String sql)
1. int update(String sql, Object ... args)

```java
public void updae(Member member){
  jdbcTemplate.update(
    "update MEMBER set NAME=?, PASSWORD=?, where EMAIL = ?",
    member.getName(),
    member.getPassword(),
    member.getEmail());
}
```

## PreparedStatementCreator를 이용한 쿼리 실행

```java
//PreparedStatementCreator interface
package org.srpingframewor.jdbc.core;

import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.SQLException;

public interface PreparedStatementCreator{
  PreparedStatement createPreparedStatement(Connection con) throws SQLExcetion;
}
```

preparedstatement의 사용법은 [preparedstatement](https://niklasjang.github.io/spring/spring-preparedstatement/)를 참고한다. 

jdbcTemplate 클래스가 제공하는 메서드 중에 prepatedStatementCreator interface를 파라미터로 갖는 메서드는 다음과 같다.

1. List<T> query(PreparedStatementCreator psc, RowMapper<T> rowMapper)
1. int update(PreparedStatementCreator psc)
1. int update(PreparedStatementCreator psc, KeyHolder generatedKeyHolder)
  - 자동 생성되는 키값을 구할 때 사용한다. 

### INSERT 쿼리 실행 시 KeyHolder를 이용해서 자동 생성 키값 구하기


| 기능 | 명령어 |
|:--------|:--------|
|spring5fs에 table 생성| create table spring5fs.MEMBER(<br>ID int auto_increment primary key,<br>EMAIL varchar(255),<br>PASSWORD varchar(100),<br>NAME varchar(100),<br>REGDATE datetime,<br>unique key(EMAIL)<br>)engine=InnoDB character set = utf8;|

이렇게 지정한 table의 ID 칼럼은 값을 지정하지 않는다. 


| 기능 | 명령어 |
|:--------|:--------|
|row 삽입| insert into MEMBER (EMAIL, PASSWORD, NAME, REGDATE) VALUES('niklasjang@gmail.com', 1234, 'jhs', now());|

그런데 쿼리 실행 후에 생성된 키값을 알고 싶다면 어떻게 해야 할까? update() 메서드는 변경된 행의 갯수를 리턴할 뿐 생성된 키값을 리터하지는 않는다. keyHolder를 사용하면 가능하다.  

```java

import org.springframework.jdbc.suuport.GeneratedKeyHolder; 
import org.springframework.jdbc.suuport.KeyHolder;

public class MemberDao{
  private JdbcTemlate jdbcTemplate;

  public void insert(final Member member){
    KeyHolder keyHolder = new GeneratedKeyHolder();
    jdbcTemplate.update(new PreparedStatementCreator(){
      @Override
      public PreparedStatement createPreparedStatement(Connection con) throws SQLException{
        PreparedStatement pstmt = con.prepareStatement(
          "insert into MEMBER (EMAIL, PASSWORD, NAME, REGDATE)"+
          "values (?,?,?,?)",
          new String[] {"ID"});//자동생성되는 키 칼럼 목록을 지정할 때 사용한다. 
          //auto_increment로 지정된 칼럼이 ID 이기 때문에 문자열 하나만 갖는 배열을 전달한다.
        pstmt.setString(1. member.getEmail));
        pstmt.setString(2. member.getPassword());
        pstmt.setString(3. member.getName());
        pstmt.setTimestamp(4, Timstamp.valueOf(member.getRegisterDateTime());
        return pstmt;
      }
    },
    keyHolder);
    //자동 생성된 키값을 keyHolder에서 가져온다.
    Number keyValue = keyHolder.getKey();
    member.setId(keyValue.longValue());
  }
}
```


### JdbcTemplate의 Exception에서 알아야할 사항

JdbcTemplate의 update() 메서드는 DB 연동을 위해 JDBC API를 사용하는데, JDBC API를 사용하는 과정에서 SQLException이 발생하면 이 익셉션을
DataAcessException으로 변환해서 발생시킨다. 

```java
try{
  ... JDBC 활용 코드
}catch SQLException ex{
  throw converSQLToDataException(ex);
}
```

SQLException을 스프링이 제공하는 DataAccessException으로 변환해서 발생시키는 것은 연동 기술에 상관없이 동일하게 익셉션을 처리할 수 있도록 하기 위함이다.
스프링은 JDBC뿐만 아니라 JPA, 하이버네이트 등에 대한 연동을 지원하고 MyBatis는 자체적으로 스프링 연동 기능을 제공한다. 그런데 각각의 구현기술마다 익셉션ㅇ르 다르게 처리해야 한다면 개발자는 기술마다 익셉션 처리 코드를 작성해야 한다. 각 연동 기술에 따라 발생하는 익셉션을 스프링이 제공하는 익셉션으로 변환함으로써 구현 기술에 상관없이 동일한 코드로 익셉션을 처리할 수 있게 된다.  

