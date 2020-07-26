---
title: "[Git] Git Alias"
excerpt: "git Alias"
date: 2020-07-25
categories:
  - Git
tags:
  - git 
  - git Alias
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## git은 완벽한 명령어만 알아듣는다.

- `git config --global alias.co checkout`
- `git config --global alias.br branch`
- `git config --global alias.ci commit`
- `git config --global alias.st status`
- `git config --global alias.unstage 'reset HEAD --'`
  - 아래의 두 명령어는 정확히 같은 명령어
  - `git unstage fileA`
  - `git unstage HEAD -- fileA`
- `git config --global alias.last 'log -1 HEAD'`

## 외부 명령어 사용해서 Alias 만들기

!를 제일 앞에 추가하면 외부 명령어를 실행한다.  

- `git config --global alias.visual '!gitk'`