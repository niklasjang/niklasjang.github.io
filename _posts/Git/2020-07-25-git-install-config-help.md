---
title: "[Git] Git 설치, 설정, help"
excerpt: "git install, config, help"
date: 2020-07-25
categories:
  - Git
tags:
  - git
  - git install
  - git config
  - git help
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## Git 설치

- Ubuntu : `$ sudo apt install git-all`
- Window : <https://git-scm.com/download/win>

## Git 최초 설정

| OS | 적용 범위 | 명령어 | 디렉토리 |
|:---|:---------|:-------|:---------|
|Linux|`git config --system` | 시스템의 모든 사용자와 모든 저장소|`/etc/gitconfig`|
|Linux|`git config --global` | 시스템의 특정 사용자의 모든 저장소|`~/.gitconfig`,`~/.config/git/config`|
|Linux|`git config --local` | 현재 작업중인 특정 저장소 | `./` |

## Git 사용자 정보 설정

시스템의 특정 사용자의 모든 저장소에 같은 이름과 이메일을 사용하고 싶은 경우 아래와 같이 진행한다.  

- `git config --global user.name "niklasjang"`
- `git config --global user.email "niklasjang@gmail.com"`  

## Git 편집기 설정

- `git config --global core.editor emacs`
- `git config --global core.editor "code --wait"`
  ```txt
  //vscode에서 git diff 사용할 수 있도록 추가 설정하기
  1. 아래 명령어 입력
    $ git config --global -e
  2. 아래 명령어 .gitconfig에 추가
  [diff]
    tool = default-difftool
  [difftool "default-difftool"]
    cmd = code --wait --diff $LOCAL $REMOTE
  ```

## Git 설정 확인

- `git config --list`
  ```txt
  $ git config --list
  user.name=John Doe
  user.email=johndoe@example.com
  color.status=auto
  color.branch=auto
  color.interactive=auto
  color.diff=auto
  ```
- 여러 디렉토리의 gitconfig가 적용된 경우 어떤 gitconfig파일에 의해 적용된 설정인지 확인
  ```txt
  $ git config --show-origin rerere.autoUpdate
  file:/home/johndoe/.gitconfig	false
  ```

## Git help

- 웹사이트에서 자세한 설명을 보고 싶은 경우
  ```
  git help config
  ```
- 터미널에서 옵션에 대한 간략한 설명만 보고 싶은 경우
  ```
  git config -h
  ```

## How Git works?

- 데이터를 저장하지도 취급하지도 않는다. 
- 데이터를 파일 시스템 스냅샷의 연속으로 취급하고 크기가 아주 작다.
- 데이터를 스냅샷의 스트림처럼 취급한다.  

## Git이 관리하는 세 가지 상태

![git-0](/assets/images/git/git-0.jpg)  

| 상태 |  의미 |
|:-----|:-----|
| Modified | 수정한 파일을 아직 로컬 데이터베이스에 커밋하지 않은 것을 의미한다.|
| Staged | 현재 수정한 파일을 곧 커밋할 것이라고 표시한 상태를 의미하다.|
| Committed | 데이터가 로컬 데이터베이스에서 안전하게 저장되었다는 것을 의미한다.|



