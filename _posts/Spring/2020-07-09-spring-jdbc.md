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

