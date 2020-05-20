---
title: "[NNStreamer] 공개 SW 컨트리뷰톤 시작하기 "
excerpt: "발대식, VirtualBox설치"
date: 2019-09-10
categories:
  - NNstreamer
tags:
  - nnstreamer
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

# 발대식

![nnstreamer-0](/assets/images/nnstreamer/nnstreamer-0.jpg)  

공개 SW 컨트리뷰톤 2019에 참가하게 되었습니다. 삼성전자 리서치 소속의 멘토님이 이끌어주시는 NNstreamer 프로젝트에 선발되었습니다. 발대식 당일에는 20개팀 전체 200명정도 되는 멘토,멘티 그리고 관계자분들이 많이 참석하셨습니다. 태풍 링링으로 우산이 뒤집혀지는 날씨였는데도 많이 참석해주셨습니다.  

현장에서는 오픈소스 장인분들이 엄청 많았습니다. 저는 잘 이해가 안되는 말도 먼저 알고 오신 멘티분들도 많았습니다. 전년도 컨트리뷰톤에서 멘토로 참여하셨던 분의 강의가 있었는데 아래와 같은 내용을 담고 있었습니다.

- commit을 patch라고 부르기도 한다.
- commit을 남길 때는 compile되는 단위로 남겨야한다.
- Pull Reuest는 git의 기능이 아니라 github의 기능이다.
- PR이 왜 PR이냐면 참여자가 Repo를 fork한 뒤에 commit을 남겨 놓으면 Repo의 관리자 입장에서 변경사항을 Pull하는 것이기 때문에 Pull Request이다.
- `Uftrace`를 사용해서 function call이 일어날 때마다 실행시간등을 체크해서 다양한 분야에서 도움을 받을 수 있다.
- commit의 단위도 중요하다. review 및 discussion을 진행하기에 좋은 단위로 commit을 해야한다. commit이 너무 크다면 여러개로 쪼개는 것이 좋다.
- `Issue`tab에서는 버그리포팅과 질문을 모두 할 수 있다. 버그 리포팅을할 때는 `내 개발환경 및 버전`을 말하고 코드 리뷰도 꼭 해보고 해야한다.
- 가장 쉬운 Contribute는 `Code-Clean-Up` patch이다. 오탈자인 typo를 찾아서 고치고 convection에 맞지 않는 코드를 수정해도 된다.
- force-push란? //TODO
- 팀원들과 어색한 Kick-Off 미팅을 끝내고 Slack 채널도 만들었습니다.  

# VirtualBox 세팅하기

1. 먼저 [공식사이트](https://www.virtualbox.org/)에서 프로그램을 설치했습니다.
2. Ubuntu 18.04LTS 버전을 [다운](http://releases.ubuntu.com/18.04/)받았습니다.  
3. [여기](https://extrememanual.net/7223)를 보고 가상머신 만들기를 따라했습니다. 
3. VirtualBox를 새로 만들고 2에서 다운 받은 파일을 실행했습니다.
  - ![nnstreamer-2-1](/assets/images/nnstreamer/nnstreamer-2-1.jpg)  
4. 바로 Ubuntu를 설치하는 단계에서 Virtualbox의 해상도에 문제가 있어서 `설치` 버튼을 볼 수가 없어서 해상도 조절을 먼저 진행헀습니다.
  - TryUbuntu 클릭 -> 좌상단 Activities 클릭 -> Display 검색 -> Resolution 1920 x 1600 선택 
  - ![nnstreamer-2-2](/assets/images/nnstreamer/nnstreamer-2-2.jpg)    
5. 다음으로 TryUbuntu 환경에서 바탕화면에 있는 ubuntu18.04LTS를 클릭해서 설치합니다.
  - ![nnstreamer-3](/assets/images/nnstreamer/nnstreamer-3.jpg)  
6. 파티션을 잘 나누어서 설치합니다. [여기](http://blog.dalli.kr/archives/1414)를 참고하였습니다.
  - 루트 파티션 – 주로 시스템 프로그램 관련 파일들이 설치된다. (/)
  - 부트 파티션 – 리눅스 부팅 시스템 파일들이 설치된다. (/boot)
  - 홈 파티션 – 사용자 데이터 영역 (/home)
  - var 파티션 – 시스템 데이터 영역으로 각종 로그 파일, 설치 프로그램 임시 파일 등이 생성되는 영역 (/var)
  - 스왑 파티션 – 시스템 스왑 영역 (swap)  
  - ![nnstreamer-4](/assets/images/nnstreamer/nnstreamer-4.jpg)  
7. 장치 -> 게스트 확장 CD 삽입을 누릅니다. 안되면 [여기]를 보고 Guest-Addition을 추가합니다. 그리고 위 영상에 있는 양방향 통신을 Enable합니다. 이제 Host OS와 Guest OS간 Copy/Paste가 가능합니다.
8. 인터넷/Wifi 설정
  - sudo apt update
  - sudo apt upgrade
  - [여기](https://askubuntu.com/questions/1047245/wifi-adapter-not-found-in-ubuntu-18-04)를 보고 따라합니다.  
  - 그리고 네트워크 어텝터 설정은 다음과 같이 했습니다.![nnstreamer-6](/assets/images/nnstreamer/nnstreamer-6.jpg)  
  - 재부팅을 하니 다음과 같이 인터넷 연결이 됩니다. 하지만 여전히 WIfi Adapter는 못찾는다고 나오네요. Host OS에서 렌선으로 연결하든, Wifi로 연결하든 Guest OS에서 잘 연결됩니다. 
  - ![nnstreamer-5](/assets/images/nnstreamer/nnstreamer-5.jpg)