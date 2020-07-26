---
title: "[Git] Git branch"
excerpt: "git branch"
date: 2020-07-25
categories:
  - Git
tags:
  - git 
  - git branch
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## 브랜치 목록 확인

- `git branch`
  ```
  $ git branch
    iss53
  * master
    testing
  ```

## 브랜치 별 가장 마지막 커밋 확인

- `git branch -v`
  ```
  $ git branch -v
    iss53   93b412c fix javascript issue
  * master  7a98805 Merge branch 'iss53'
    testing 782fd34 add scott to the author list in the readmes
  ```

## remote branch

Refs는 리모트 저장소에 있는 포인터인 레퍼런스다. 리모트 저장소에 있는 브랜치, 태그, 등등을 의미한다. `git ls-remote [remote]` 명령으로 모든 리모트 Refs를 조회할 수 있다.

- `git ls-remote [remote]`
  ```
  From https://github.com/niklasjang/git-test-repo.git
  1a40d78b729846eeaf54aea882c71700285137b9        HEAD
  1a40d78b729846eeaf54aea882c71700285137b9        refs/heads/master
  c0f6f4b12ec7c28b321f6da3a49ff22b4955789c        refs/pull/1/head
  ```

git remote show [remote] 명령은 모든 리모트 브랜치와 그 정보를 보여준다.  

- `git remote show origin`
  ```
  * remote origin
    Fetch URL: https://github.com/niklasjang/git-test-repo.git
    Push  URL: https://github.com/niklasjang/git-test-repo.git
    HEAD branch: master
    Remote branches:
      master                  tracked
      refs/remotes/origin/new stale (use 'git remote prune' to remove)
    Local ref configured for 'git push':
      master pushes to master (fast-forwardable)
  ```

## git push

`git push origin serverfix`에 대해서 Git은 serverfix라는 브랜치 이름을 refs/heads/serverfix:refs/heads/serverfix 로 확장한다. 이것은 serverfix 라는 로컬 브랜치를 서버로 Push 하는데 리모트의 serverfix 브랜치로 업데이트한다는 것을 의미한다. 나중에 Git의 내부에서 `refs/heads/` 의 뜻을 자세히 알아볼 것이기 때문에 일단 넘어가도록 한다.  

리모트 저장소에 serverfix 라는 이름 대신 다른 이름을 사용하려면 git push origin serverfix:awesomebranch 처럼 사용한다.  

## git fetch

`git fetch origin somebranch`를 하면 수정할 수 없는 origin/somebranch 브랜치에 대한 포인터만 생긴다. 수정을 하기 위해서는 두 가지 방법이 있다.  

1. origin/somebranch로 merge : `git merge origin/somebranch`
1. origin/somebranch에서 다른 branch 생성 : `git checkout -b newbranch origin/somebranch`

## tracking branch

리모트 트래킹 브랜치를 로컬 브랜치로 Checkout 하면 자동으로 “트래킹(Tracking) 브랜치” 가 만들어진다 (트래킹 하는 대상 브랜치를 “Upstream 브랜치” 라고 부른다). 트래킹 브랜치는 리모트 브랜치와 직접적인 연결고리가 있는 로컬 브랜치이다. 트래킹 브랜치에서 git pull 명령을 내리면 리모트 저장소로부터 데이터를 내려받아 연결된 리모트 브랜치와 자동으로 Merge 한다.  

서버로부터 저장소를 Clone을 하면 Git은 자동으로 master 브랜치를 origin/master 브랜치의 트래킹 브랜치로 만든다. 트래킹 브랜치를 직접 만들 수 있는데 리모트를 origin 이 아닌 다른 리모트로 할 수도 있고, 브랜치도 master 가 아닌 다른 브랜치로 추적하게 할 수 있다.

- 트래킹 브랜치 만들기1 : `git checkout -b {branch_copy} {remote}/{brach_origin}`
- 트래킹 브랜치 만들기2 : `git checkout --track {remote}/{branch_origin}`
  - {branch_origin} 브랜치가 만들어지고 checkout 된다. 
  - **이는 자주 쓰이기 때문에 매우 자주 쓰여서 더 생략할 수 있다. 입력한 브랜치가 있는 (a) 리모트가 딱 하나 있고 (b) 로컬에는 없으면 Git은 트래킹 브랜치를 만들어 준다.**

## Upstream 별명  

추적 브랜치를 설정했다면 추적 브랜치 이름을 `@{upstream}` 이나 `@{u}` 로 짧게 대체하여 사용할 수 있다. master 브랜치가 origin/master 브랜치를 추적하는 경우라면 `git merge origin/master` 명령과 `git merge @{u}` 명령을 똑같이 사용할 수 있다.  

## remote branch 삭제

`git push origin --delete {branchName}`  

