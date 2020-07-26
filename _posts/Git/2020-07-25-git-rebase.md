---
title: "[Git] Git Rebase"
excerpt: "git rebase"
date: 2020-07-25
categories:
  - Git
tags:
  - git 
  - git rebase
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## Rebase?

Git에서 한 브랜치에서 다른 브랜치로 합치는 방법으로는 두 가지가 있다. 하나는 Merge 이고 다른 하나는 Rebase 다.  

![git-3](/assets/images/git/git-3.jpg)  

비슷한 결과를 만드는 다른 방식으로, C3 에서 변경된 사항을 Patch로 만들고 이를 다시 C4 에 적용시키는 방법이 있다. Git에서는 이런 방식을 Rebase 라고 한다. rebase 명령으로 한 브랜치에서 변경된 사항을 다른 브랜치에 적용할 수 있다.

```
$ git checkout experiment
$ git rebase master
```  

**실제로 일어나는 일을 설명하자면 일단 두 브랜치가 나뉘기 전인 공통 커밋으로 이동하고 나서 그 커밋부터 지금 Checkout 한 브랜치가 가리키는 커밋까지 diff를 차례로 만들어 어딘가에 임시로 저장해 놓는다. Rebase 할 브랜치(experiment)가 합칠 브랜치(master)가 가리키는 커밋을 가리키게 하고 아까 저장해 놓았던 변경사항을 차례대로 적용한다.**  

그리고 아래와 같이 진행하면 Merge commit을 남기지 않고 rebase를 할 수 있다.  

```
$ git checkout master
$ git merge experiment
```

Rebase는 보통 리모트 브랜치에 커밋을 깔끔하게 적용하고 싶을 때 사용한다. Rebase 하고 나면 프로젝트 관리자는 어떠한 통합작업도 필요 없다. 그냥 master 브랜치를 Fast-forward 시키면 된다. 충돌나는 부분은 local에서 rebase하는 사람이 진행한다.  

## 세 개의 브랜치를 rebase하는 경우 : --onto rebase

![git-4](/assets/images/git/git-4.jpg)  

Rebase는 단순히 브랜치를 합치는 것만 아니라 다른 용도로도 사용할 수 있다. 다른 토픽 브랜치에서 갈라져 나온 토픽 브랜치 같은 히스토리가 있다고 하자. server 브랜치를 만들어서 서버 기능을 추가하고 그 브랜치에서 다시 client 브랜치를 만들어 클라이언트 기능을 추가한다. 마지막으로 server 브랜치로 돌아가서 몇 가지 기능을 더 추가한다.  

이때 테스트가 덜 된 server 브랜치는 그대로 두고 client 브랜치만 master 로 합치려는 상황을 생각해보자. server 와는 아무 관련이 없는 client 커밋은 C8, C9 이다. 이 두 커밋을 master 브랜치에 적용하기 위해서 --onto 옵션을 사용하여 아래와 같은 명령을 실행한다:

`$ git rebase --onto master server client`

이 명령은 master 브랜치부터 server 브랜치와 client 브랜치의 공통 조상까지의 커밋을 client 브랜치에서 없애고 싶을 때 사용한다. client 브랜치에서만 변경된 패치를 만들어 master 브랜치에서 client 브랜치를 기반으로 새로 만들어 적용한다. 조금 복잡하긴 해도 꽤 쓸모 있다.  

이제 master를 fast-forward 시킬 수 있다.  

![git-5](/assets/images/git/git-5.jpg)  

`$ git checkout master`  
`$ git merge client`  

server 브랜치의 일이 다 끝나면 git rebase {basebranch} {topicbranch} 라는 명령으로 Checkout 하지 않고 바로 server 브랜치를 master 브랜치로 Rebase 할 수 있다. 이 명령은 토픽(server) 브랜치를 Checkout 하고 베이스(master) 브랜치에 Rebase 한다.  

`$ git rebase master server`  

server 브랜치의 수정사항을 master 브랜치에 적용했다. 그 결과는 master 브랜치에 server 브랜치의 수정 사항을 적용 같다. 최종적으로 ff merge를 한 번 더 수행하고 branch를 지우면 된다.  

```
$ git checkout master
$ git merge server
$ git branch -d client
$ git branch -d server
```

![git-6](/assets/images/git/git-6.jpg)  


## 이미 공개 저장소에 Push 한 커밋을 Rebase 하지 마라

Rebase는 기존의 커밋을 그대로 사용하는 것이 아니라 내용은 같지만 다른 커밋을 새로 만든다. 새 커밋을 서버에 Push 하고 동료 중 누군가가 그 커밋을 Pull 해서 작업을 한다고 하자. 그런데 그 커밋을 git rebase 로 바꿔서 Push 해버리면 동료가 다시 Push 했을 때 동료는 다시 Merge 해야 한다. 그리고 동료가 다시 Merge 한 내용을 Pull 하면 내 코드는 정말 엉망이 된다.  

![git-7](/assets/images/git/git-7.jpg)  

만약 팀원이 push한 내용을 rebase 했다면 아래와 같이 rebase한 내용을 다시 rebase하면 된다.  

## Rebase한 것을 다시 Rebase하기  

![git-8](/assets/images/git/git-8.jpg)  

팀원이 push한 내용을 rebase해서 다시 push한 경우 `git rebase teamone/master`를 수행하면 된다. 이 때 동작 과정은 다음과 같다.  

1. 현재 브랜치에만 포함된 커밋을 찾는다. (C2, C3, C4, C6, C7)
2. Merge 커밋을 제외한다. (C2, C3, C4)
3. 이 중 덮어쓰지 않은 커밋들만 골라낸다. (C2, C3 그리고 C4는 C4’와 동일한 Patch다)
4. 남은 커밋들만 다시 teamone/master 바탕으로 커밋을 쌓는다.

## Rebase 명령어

`git pull --rebase`를 해도 된다. 이 명령어는 `git fetch`와 `git rebase`를 나누어서 수행한 것과 같은 효과를 낸다.  

