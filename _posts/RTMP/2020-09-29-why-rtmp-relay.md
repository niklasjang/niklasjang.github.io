---
title: "[RTMP] RTMP Relay Server를 개발하는 이유"
excerpt: ""
date: 2020-09-18
categories:
  - RTMP
tags:
  - rtmp
toc : false
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

1. 어떤 부분이 도전적인지 목표를 구체화한다.
1. 최종 목표를 구체화한다.
1. 10월 말 여러 교수님들 앞에서 중간 발표. 최소한 패킷 흐르는건 보여줘야 한다.


# 이것이 세상에 왜 필요한지 구체화한다.

1. 멀티미디어 컨텐츠의 중요성.
  - 포스트 코로나 시대에 실시간 커뮤니케이션의 중요성 대두
  - 4G 시대 이후 멀티미디어 데이터 소비량의 증가
1. how multimedia works?
  - [wowza streaming protocol 설명](https://www.wowza.com/blog/streaming-protocols)
  - 이 중에서 RTMP는 가장 전통적으로 다양한 player들이 지원하는 프로토콜
  - youtube live : 오버레이, 새로운 그래픽 효과등을 추가

