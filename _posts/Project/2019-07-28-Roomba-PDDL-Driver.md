---
title: "[프로젝트] 룸바  A* & PDDL 드라이버"
excerpt: "2019.3. ~ 2019.6."
date: 2019-07-28
categories:
  - Project
tags:
  - Roomba
  - A.I.
  - PDDL
  - A*
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 프로젝트 설명

[아마존 창고로봇](https://www.youtube.com/watch?v=Ox05Bks2Q3s) 영상을 보고 시작한 프로젝트입니다. 좁은 환경에서 다수의 로봇이 목적을 달성하기 위해 최적화된 움직임을 수행하것이 최종 목표입니다. 저를 포함한 6명의 팀원들을 A* 알고리즘과 PDDL 알고리즘을 사용해서 위 목표를 구현하였습니다. 

## 워크플로우

![CallBack-Thread-all](/assets/images/projects/roomba/CallBack-Thread-all.jpg)  

1. 서버에서 PDDL 알고리즘을 수행합니다.
2. rosnodejs와 ROS msg 통신을 사용해서 서버로부터 결과를 받아옵니다. 이때 서버에서 연산되는 결과는 각 룸바가 수행해야하는 연속된 명령을 순차적으로 보내줍니다.
3. 드라이버는 각 룸바가 수행해야하는 명령이 도착하면 runChecker에게 신호를 보냅니다.
4. RunChecker가 모든 룸바에게 명령을 전달받았다는 신호를 받으면 모든 룸바에게 명령을 수행하라는 신호를 보냅니다.

![driver_rqt_graph](/assets/images/projects/roomba/driver_rqt_graph.jpg)

위 그림은 두 대의 룸바를 사용할 때 rqt_graph를 그려본 모습입니다.  

1. 파란색 : 서버로부터 각 룸바가 수행해야 하는 명령을 ROS msg 통신으로 보내줍니다.
2. 빨간색 : 각 룸바의 rddl_driver가 메시지를 수신하면 runchecker에게 신호를 보냅니다.
3. 노란색 : runchecker가 모든 rddl_driver로부터 메시지를 받았으면 각자의 명령을 수행하라는 /run 메시지를 보냅니다.

![pddl-driver-diagram](/assets/images/projects/roomba/pddl-driver-diagram.jpg)  

각각의 pddl_driver는 룸바에 연결된 라즈베이파이에서 동작하며, RunChecker는 독립적인 컴퓨터에서 수행됩니다. 

## 프로젝트 Demo 영상


[Gazebo 시뮬레이터 영상](https://youtu.be/uGnAFQer308)  
룸바 8대를 가지고 A* 알고리즘을 실행하는 모습을 Gazebo Sim에서 구현하였습니다. 90 Degree 회전을 측정하는 센서의 오차값으로 인해 전달된 명령을 정확하게 수행하지 못하는 **한계**가 있습니다.  

[다중 룸바 단일 명령 수행 영상](https://youtu.be/i-6bfpRTpEc)  
룸바 2대를 가지고 PDDL 알고리즘을 실행하는 모습을 촬영하였습니다.  서버에서 연산된 PDDL 결과를 룸바에세 전송하였을 때 짧은 명령을 수행할 때에는 90도 회전이 정확하게 수행되는 모습입니다. 하지만 아래 링크의 영상처럼 연속된 명령을 수행하면 90도 회전을 측정하는 자이로 센서의 오차값으로 경계선에서 벗어나는 **한계**를 가지고 있습니다.  

[다룸 룸바 연속 명령 수행 영상](https://youtu.be/GrBQo4zfoUY)  
룸바 2대를 가지고 PDDL 알고리즘을 실행하는 모습을 촬영하였습니다.  서버에서 연산된 PDDL 결과를 룸바에세 전송하였을 때 짧은 명령을 수행할 때에는 90도 회전이 정확하게 수행되는 모습입니다. 하지만 본 영상처럼 연속된 명령을 수행하면 90도 회전을 측정하는 자이로 센서의 오차값으로 경계선에서 벗어나는 **한계**를 가지고 있습니다.  

## 프로젝트 Repo

<https://github.com/niklasjang/path_planning>  

## 개발환경

Ubuntu : 16.04 LTS  
ROS version : Kinetic  
CMake version : 3.5.1 (minimum_required 2.8.3)  
Git/Github  

H/W  
Raspberry pi 3 Model B  
Irobot create 2(https://www.irobot.com/about-irobot/stem/create-2)  

통합개발환경  
Sublimetext  
