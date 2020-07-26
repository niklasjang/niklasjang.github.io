---
title: "[Git] Git 저장소 및 파일 관리"
excerpt: "gitignore, remote, add, commit, rm, mv, status, diff"
date: 2020-07-25
categories:
  - Git
tags:
  - git add remote
  - gitignore
  - git add
  - git commit
  - git rm
  - git mv
  - git status
  - git diff
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## Git 저장소 만들기

1. 기존 디렉토리를 Git 저장소로 만들어 github에 올리기
  ```txt
  $ cd {프로젝트 디렉토리}
  $ git init
  $ 파일 작업
  $ git add .
  $ git commit -m "commit 설명"
  $ git remote add origin https://github.com/{username}/{projecname}
  $ git pull origin master
  $ git push origin master
  ```
1. github에 있는 저장소를 local로 다운받기
  ```txtx
  //원래 프로젝트 이름으로 clone
  git clone https://github.com/{username}/{projecname}
  //원하는 디렉토리 이름으로 clone
  git clone https://github.com/{username}/{projecname} {디렉토리 이름}
  ```

## 리모트 저장소 살펴보기

`git remote show origin`

## 리모트 저장소 이름 변경하기

`git remote rename {name_from} {name_to}`

## 리모트 저장소 삭제하기

`gir remote remove {name}`

## 리모트 저장소 시작하기

리모트 저장소를 생성하면서 README.md 파일을 생성했다고 가정하자. 이때 로컬에서도 README.md 파일을 생성하고 `git pull`을 하려고하면 커밋 히스토리가 일치하지 않는다는 오류가 출력된다. 리모트 repo를 생성할 때 create README.md에 대한 commit이 로컬에 존재하지 않아서, 리모트와 로컬이 서로 다른 히스토리를 가진다는 의미이다.  

해결 방법으로는 두 가지가 있다.

1. 로컬에서 작업을 시작하기 전에 `git clone`을 먼저 수행한다.
1. `git pull origin (branchname) --allow-unrelated-histories`를 통해 리모트를 가져오고 로컬에서 merge 작업을 수행한다.  

## 디렉토리 상태 확인하기

`git status`

## 파일을 새로 추적하기(modified 상태에서 staged 상태로 바꾸기)

`git add {파일이름}`
`git add . `


## 디렉토리 상태를 간략하게 확인하기

- `git status -s`
  ```txt
  $ git status -s
   M README           //Staging Area: not-added    Working Tree: Modified   
  MM Rakefile         //Staging Area: Modified     Working Tree: Modified
  A  lib/git.rb       //Staging Area: Added        Working Tree: not-modified
  M  lib/simplegit.rb //Staging Area: Modified     Working Tree: not-modified
  ?? LICENSE.txt      //Staging Area: not-tracked  Working Tree: not-added
  ```

## 파일 무시하기

```
vim .gitignore
```

|.gitignore 옵션| 의미 |
|:-------------|:-----|
|*.a|확장자가 .a인 파일 무시|
|*~|~로 끝나는 파일 무시|
|*.[oa]|확장자가 .a, .o인 파일 무시|
|!lib.a|확장자가 .a인 파일은 무시하게 했지만 lib.a는 무시하지 않음|
|/TODO| 현재 디렉토리에 있는 TODO파일은 무시하고 subdir/TODO처럼 하위디렉토리에 있는 파일은 무시하지 않음|
|build/| build/ 디렉토리에 있는 모든 파일은 무시|
|doc/*.txt| doc/notes.txt 파일은 무시하고 doc/server/arch.txt 파일은 무시하지 않음|
|doc/**/*.pdf|doc 디렉토리 아래의 모든 .pdf 파일을 무시|

## working tree와 staged area 비교하기

- 마지막 commit 후 수정한 내용을 모두 보여주지 않는다. 수정했지만 add하지 않은 내용만 보여준다.  
- `git add .`를 수행했다면 아무것도 보여주지 않는다.  

`git diff`

## staged area와 committed 비교하기

`git diff --staged`  
또는  
`git diff --cached`  

## Staging Area 생략하기

`git commit -a -m "added new files"`  
또는  
`git commit -am "added new files"`  

## 파일 삭제하기

- 파일 삭제 : `rm abc.txt`
  - 여전히 Staging Area에는 남아있어 commit에 포함된다.  
- Staing Aread에서 삭제 및 working tree에서는 남기기: `git rm --cached abc.txt`
- Staing Aread에서 삭제 및 working tree에서도 지우기: `git rm -f abc.txt`

## 추적하고 있는 파일 이름 바꾸기

- `git mv file_from file_to`
  ```
  //위 명령어는 아래의 세 가지 명령어를 수행한 것과 정확히 일치한다.
  mv file_from file_to
  git rm file_from -f
  git add file_to
  ```





