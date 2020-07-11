---
title: "[Spring] PreparedStatement"
excerpt: "초보 웹 개발자를 위한 스프링5 프로그래밍 입문 - 최범균"
date: 2020-07-10
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

## PreparedStatement란?

아래와 같이 SQL문의 틀을 미리 생성해 놓고 `?`를 이용해서 나중에 값을 지정하는 것이 java.sql.PreparedStatement이다.  

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

스프링의 jdbcTemplate를 사용하면 아래와 같이 줄여서 사용할 수 있다.  

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

## PreparedStatement를 사용하는 순서

1. Connection.prepareStatement() 메소드를 사용하여 PreparedStatement 생성
1. PreparedStatement의 set()을 사용하여 필요한 값 지정
1. PreparedStatement의 execyteQyery() 또는 executeUpdate() 사용하여 쿼리 실행
1. finally 블록을 사용한 PreparedStatement close()

PreparedStatement를 생성할 때는 실행할 쿼리를 미리 입력하는데 값 부분을 '?'로 대치한 쿼리를 사용한다. 

```java
PreparedStatement pstmt = null;
pstmt = conn.prepareStatement("insert into MEMBER (MEMBERID, NAME, EMAIL) values(?,?,?)");

//pstmt.setString(int index, String x);
pstmt.setString(1,"aa");
pstmt.setString(2,"bb");
pstmt.setString(3,"cc");
```


## Reference

- <https://happynewmind.tistory.com/55>
