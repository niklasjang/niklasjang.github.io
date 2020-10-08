---
title: "맥북에서 개발하기 꿀팁 모음"
excerpt: ""
date: 2020-09-25
categories:
  - ML
tags:
  - introduction
teaser: /assets/images/neural_network.jpg
toc_label: "Table of contents"
toc_icon: "heart"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

# 터미널

1. 실행 :  command + space -> termi 입력 -> enter
1. 새로운 탭 생성 : command + t 또는 command + n
1. 새로운 탭 삭제 : command + w
1. 윈도우 닫기(모든 탭 닫기) : shift + command + t
1. 탭 이동 : command + 1/2/3
1. 글자 확대/축소 : command + +/-
1. 히스토리 확인 후 명령 재실행 : history + !{재실행할 명령 번호}

## 커서 이동
1. 커서 처음으로 이동 : ctrl + a
1. 커서 끝으로 이동 : ctrl + e
1. 커서 한 단어 이동 : opt + <-/->

## 커서 기준 삭제
1. 커서 기준 오른쪽 삭제 : ctrl + k
1. 커서 기준 행 삭제 : ctrl + u
1. 커서 기준 단어 삭제 : ctrl + w
1. 커서 기준 오른쪽 1단어 삭제 : ctrl + d

#  chrome

1. 탭 번호 이동 : command + 1/2/3
1. 탭 왼쪽 이동 : ctrl + short + tab
1. 탭 오른쪽 이동 : ctrl + tab

# 환경 변수 설정

1. 환경변수 확인 1 : echo $PATH
1. 환경변수 확인 2 :
  1. cd /usr/local/bin && ls -al
  ```
  //code 명령어가 어떤 바이너리를 보고 있는지 확인 가능
  code -> ~~생략~~/bin/code
  ```

1. 환경변수 추가 :
  1. 환경변수 파일 열기 : vi ~/.bash_profile 
  ```
  //변경 전
  niklas@niklasjcBookPro ~ % cat ~/.bash_profile 
  export JAVA_HOME=/Users/niklas/e~ 생략~~~lu-11.jdk/Contents/Home
  export PATH=${PATH}:$JAVA_HOME/bin

  //변경 후 (mysql 패스 추가)
  niklas@niklasjcBookPro ~ % cat ~/.bash_profile 
  export JAVA_HOME=/Users/niklas/ee~ 생략~~~lu-11.jdk/Contents/Home
  export PATH=${PATH}:$JAVA_HOME/bin:/usr/local/mysql/bin:
  ```
  1. 수정된 환경변수 적용 : source ~/.bash_profile

1. 모든 터미널에서 source ~/.bash_profile 되도록 추가
  - zsh = Z shell = 유닉스 셸 프로그램 이름
  1. 생성 : vim ~/.zshrc
  1. source ~/.bash_profile
  1. 저장 : esc + :wq 


# finer

숨긴 파일 보이기/숨기기 : shift + CMD + .

# Domain 설정

127.0.0.1에 local.openur.biz 이름 추가 지정. tomcat 8080 포트로 실행 시 http://localhost:8080/ 로 접근하는 것과 http://local.openur.biz:8080/로 접근하는 것이 같은 서버를 바라보게된다.

```
$cat /etc/hosts
##i
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
127.0.0.1       local.openur.biz 
127.0.0.1       local.admin.biz
# Added by Docker Desktop
# To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
# End of section
```
