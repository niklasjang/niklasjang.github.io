---
title: "[NNStreamer] GTK+ 설치 및 이해하기 "
excerpt: "GTK+란?"
date: 2019-09-17
categories:
  - NNstreamer
tags:
  - nnstreamer
  - gtk+
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## 소개

`GTK` 또는 `GIMP`은 멀티 플랫폼에서 GUI를 생성하기 위한
 toolkit입니다. 완전한 집합의 `widgets`을 지원하고 작은 프로젝트에서부터 큰 프로젝트까지 모두 커버할 수 있습니다.  

`GTK`는 C로 작성되었지만 C/C++ 뿐만 아니라 다양한 언어를 지원합니다. `Perl`이나 `python`을 사용한다면 효과적인 방법으로 어플리케이선 개발을 할 수 있을 것입니다.  

`GTK`는 `GNU project`의 오픈소스 프로젝트 입니다.   

## 구조

`GTK`는 4개의 라이브러리를 기반으로 빌드되었습니다. 구조를 설명하는 부분은 짧기 때문에 원문을 가져오겠습니다. 

![nnstreamer-13](/assets/images/nnstreamer/nnstreamer-13.jpg)  

- `GLib` : a low-level core library that forms the basis of GTK. It provides **data structure handling for C, portability wrappers and interfaces for such run-time functionality** as an event loop, threads, dynamic loading and an object system.
- `Pango` :  a library for layout and rendering of text with an emphasis on internationalization. It forms **the core of text and font handling** for GTK.
- `Cairo` : a library for **2D graphics** with support for multiple output devices (including the X Window System, Win32) while producing a consistent output on all media while taking advantage of display hardware acceleration when available.
- `ATK` : a library for a set of interfaces providing **accessibility**. By supporting the ATK interfaces, an application or toolkit can be used with tools such as screen readers, magnifiers, and alternative input devices.  


## 설치

먼저 `GTK`를 설치하기 전에 `toolkit`이 먼지 알아보겠습니다. O/S에 따라서 screen에 버튼이나 text box같은 간단한 `widget`을 띄우려고 해도 어떤 모양으로 클릭했을 때 어떤 동작을 하는지 등과 같은 세부적인 사항까지 모두 빌드해야합니다. 이러한 번거로움을 덜기 위해서 간단하게 버튼과 더 복잡한 GUI 객체들을 가져다가 쓸 수 있도록 만들어주는 것이 `toolkit`입니다.  

`GTK+`는 `GTK2.0`과 `GTK3.0`을 버전에 상관없이 한 번에 부를 때 사용하는 말이라고 합니다. `Gstreamer`에서 사용하는 `GTK`도 `GTK+`라고 표기 되어 있어서 `2.0`을 사용하든 `3.0`을 사용하든 차이가 없어 보입니다. 굳이 `2.0`과 `3.0`의 차이점을 알아봐도 되지만 여기서는 그냥 `3.0`을 설치하고 다시 `Gstreaemer` tutorial 포스팅으로 돌아가겠습니다.  

아래의 명령으로 설치합니다.  

```bash
$ sudo apt-get update
$ apt-get install libgtk-3-dev        
//$ sudo apt-get install libgtk2.0-dev
```

2.0 설치는 아래와 같이 합니다.  

```bash
$ sudo apt-get update
$ sudo apt-get install libgtk2.0-dev
```