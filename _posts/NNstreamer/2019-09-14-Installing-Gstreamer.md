---
title: "[NNStreamer] Gstreamer 설치 및 테스트 실행 "
excerpt: "Installing Gstreamer "
date: 2019-09-15
categories:
  - NNstreamer
tags:
  - nnstreamer
  - gstreamer
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---


본 포스팅은 [여기](https://gstreamer.freedesktop.org/documentation/installing/on-linux.html)를 참조합니다.  

# Gstreamer 이해하기

## Gstreamer 설치

[gstreamer공식 페이지](https://gstreamer.freedesktop.org/documentation/installing/on-linux.html?gi-language=c)에서 설치 명령어를 찾아서 실행합니다.  

```bash
$ apt-get install libgstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-doc gstreamer1.0-tools gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-qt5 gstreamer1.0-pulseaudio
```

## development environment 구축하기

gstreamer를 사용하기 위한 환경으로는 gcc compiler와 texteditor가 있습니다. 

### GCC란? 그리고 GNU란?

GCC의 정의를 찾아보면 아래와 같이 나옵니다.  

The GNU Compiler Collection (GCC) is a collection of compilers and libraries for C, C++, Java, ... etc. Many open source projects including the GNU tools and the Linux kernel are compiled with GCC.  

GNU는 `그누`라고 읽으며 운영체제의 하나이자 컴퓨터 소프트웨어의 모음집입니다. GNU는 "GNU's Not Unix"라는 재귀적인 정의를 가지고 있습니다. 그누 프로젝트의 창립자는 누구자 자유롭게  "실행, 복사, 수정, 배포"할 수 있고, 누구도 그런 권리를 제한하면 안 된다는 사용 허가권(License) 아래 소프트웨어를 배포합니다.  

정리하자면 GCC는 GNU 프로젝트가 제공하는 오픈소스 컴파일러를 의미합니다.  

### GCC 설치

[여기](https://linuxize.com/post/how-to-install-gcc-compiler-on-ubuntu-18-04/)를 참고했습니다.   


1. packages list를 업데이트합니다.
  ```bash
  $ sudo apt update
  ```
2. 아래의 명령어는 GCC, g++ 그리고 make를 포함하는 새로운 패키지를 설치합니다.
  ```bash
  $ sudo apt install build-essential 
  ```
3. 혹시나 나중에 사용할 수 있는 manual 페이지를 설치합니다.
  ```bash
  $ sudo apt-get install manpages-dev
  ```
4. gcc가 제대로 설치되었는지 확인합니다. 저는 아래와 같이 나옵니다.
  ```bash
  $ gcc --version
  ```
  ```bash
  $ gcc (Ubuntu 7.4.0-1ubuntu1~18.04.1) 7.4.0
  Copyright (C) 2017 Free Software Foundation, Inc.
  This is free software; see the source for copying conditions.  There is NO
  warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```

### Text Editor 설치하기 : Visual Studio Code

VS Code는 명령어가 아닌 GUI 환경에서 설치하겠습니다.  

1. Ubuntu18.04LTS 계정 로그인
2. Ubuntu Software
3. Visual Studio Code 검색
4. 설치

### GCC로 기본 코드 컴파일 해보기

1. Command line에 아래의 명령어를 입력합니다. `nano`는 Linux 계열의 기본 설치된 text editor입니다. 혹은 위에서 설치한 VS Code를 사용해서 *.c 파일을 하나 생성합니다.
  ```bash
  $ nano hello.c
  ```
2. 아래의 기본 코드를 입력하고 저장합니다. nano를 사용할 때 `^`는 `ctrl`을 의미합니다. 저장을 위해서는 `^o(ctrl + o)`를 누르면 됩니다.
  ```c
  #include <stdio.h>
  int main()
  {
    printf ("Hello World!\n");
    return 0;
  }
  ```
3. 컴파일을 위한 gcc 명령어를 입력합니다. 아래의 명령어는 hello이라는 이름으로 실행파일을 생성합니다. 
  ```bash
  $ gcc hello.c -o hello
  ```
4. 실행 파일을 실행합니다.
  ```bash
  $ ./hello
  ```

### gcc compile 명령어 -o 옵션 설명

- 기본

아래와 같은 코드를 hello.c라는 이름으로 저장했다고 가정하겠습니다.  

```c
  #include <stdio.h>
  int main()
  {
    printf ("Hello World!\n");
    return 0;
  }
```

가장 기본적으로는 아래의 명령어로 컴파일을 합니다. gcc 컴파일러로 hello.c 파일을 컴파일하면, a.out이라는 실행 파일이 생성되고, 생성된 a.out 파일을 이용하여 실행 할 수 있습니다. 컴파일 과정에서 실행파일의 이름을 지정해 주지 않으면 기본적으로 a.out 이라는 이름으로 실행파일이 생성되는 것입니다.  

- -o 옵션

위의 기본 커맨드는 현재 디렉토리에 a.out이라는 실행 파일을 생성합니다. 만약 하나의 디렉토리에서 여러 개의 프로그램을 컴파일 한다면 각자 다른 이름의 실행파일을 생성해야 합니다. -o 옵션은 컴파일 결과 생성되는 실행파일의 이름을 a.out이 아닌 다른 값으로 설정 할 수 있도록 해줍니다.  

### gcc compile 명령어 -c 옵션 설명

`-o` 옵션은 object 파일의 생성을 생략하고 바로 executable 파일을 생성합니다. `.o` 파일을 생성하기 위해서 `-c` 옵션을 사용합니다.

```bash
$ gcc -c main.c
$ gcc -c fun1.c
$ gcc -c fun2.c
$ gcc -o main main.o fun1.o fun2.o
```
빌드하기 위한 명령어가 늘어났지만 만약 fun1.c만 변경된 후에는 $gcc -o main main.c fun1.c fun2.c$와 같이 빌드하면 변경 사항이 없는 코드도 빌드하게 됩니다. 빌드가 오래걸리는 환경에서는 `-c` 옵션이 중요합니다.  

## Building applications using GStreamer

GStreamer를 필요로 하는 코드를 컴파일하거나 GStreamer core library를 사용하기 위해서는 아래의 명령어를 gcc command에 추가해야 합니다.  

```bash
$ pkg-config --cflags --libs gstreamer-1.0
```

먼저 pkg-config와 --cflags에 대해서 원론적으로 한 번 이해해보고 간략한 설명을 보겠습니다.  

1. pkg-config란?
  ```bash
  pkg-config
  ```
  먼저 이 명령어는 apt-get install 등으로 library를 설치는 했는데, 컴파일에 필요한 header 파일과 .so 파일들이 어디 있는지 찾기 힘을 때 사용합니다. .so 파일은 "Shared Object" 파일이라고 해서 컴파일된 library 파일을 의미합니다. Window에서 필요한 순간에 Library를 Link 해서 쓰는 DLL과 analogous유사한 의미를 가집니다. 그리고 아래의 명령으로 설치를 할 수 있습니다. 대부분 이미 설치가 된 상태이겠지만 한 번 확인 삼아 설치를 시도해봐도 됩니다.
  ```bash
  $ sudo apt-get install pkg-config
  ```
  위 명령어를 사용하는 방법은 아래와 같습니다.
  ```bash
  $ pkg-config --list-all
  ```
  출력은 설치된 모든 library를 확인할 수 있습니다. 이 포스트를 잘 따라왔다면 gstreamer-check-1.0와 같은 gstreamer의 내용이 포함되어야 합니다. gstreamer라는 단어가 들어가있는 package가 있는지 편하게 확인하고 싶다면 아래의 grep 명령을 추가하면 됩니다. grep command는 text를 찾기 위해서 사용됩니다.
    - grep 'word' filename : 리눅스에서 filename으로 지정한 파일 안에서 word 단어가 들어간 모든 line을 search 합니다.
      ```bash
      $ grep 'word' filename
      ```
      ```bash
      $ grep 'word' file1 file2 file3
      ```
      ```bash
      $ grep 'string1 string2' filename
      ```
  ```bash
  $ pkg-config --list-all | grep gstreamer
  ```
  위의 명령어를 입력하면 아래와 같은 결과를 얻을 수 있습니다.
  ```bash
  niklasjang@niklasjang-VirtualBox:~$ pkg-config --list-all | grep gstreamer
  gstreamer-1.0                  GStreamer - Streaming media framework
  gstreamer-net-1.0              GStreamer networking library - Network-enabled GStreamer plug-ins and clocking
  gstreamer-base-1.0             GStreamer base classes - Base classes for GStreamer elements
  gstreamer-check-1.0            GStreamer check unit testing - Unit testing helper library for GStreamer modules
  gstreamer-controller-1.0       GStreamer controller - Dynamic parameter control for GStreamer elements
  ```
2. --cflags란?
  ```bash
  $ pkg-config --cflags gstreamer-1.0
  ```
  --cflag는 환경변수 중 하나로  C/C++ 코드를 컴파일할 떄 빌드 시스템에 컴파일러 옵션을 특정하기 위해서 사용됩니다. 이 변수들은 표준화되어 있지는 않지만 이들이 사용되는 모습은 어디에서나 볼 수 있습니다. 그리고 올바르게 작성된 빌드는 추가적인 커스텀 옵션을 전달하기 위해서 이 환경변수들을 반드시 이해하고 있어야 합니다. 자세한 정보는 [GNU의 make](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables)에 관해서 찾아보면 됩니다.  
  쉽게 말하면 gstreamer-1.0를 컴파일하는데 필요한 환경 변수들을 출력해주는 역할을 합니다.
3. --libs란?
  gstreamer-1.0를 컴파일하는데 필요한 library들을 출력해주는 역할을 합니다.
  ```bash
  $ pkg-config --libs gstreamer-1.0
  ```


Visual Studio나 Eclipse 같은 IDLE를 사용하면 상관없지만 linux같은 console에서는 gcc나 g++를 사용해서 컴파일을 한다면 일반적으로 아래와 같이 컴파일과 링킹에 필요한 정보를 전달해야 합니다.  

```bash
$ gcc -o hello hello.c -I/usr/include/gstreamer-1.0 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -lgstreamer-1.0 -lgobject-2.0 -lglib-2.0
```

이처럼 모든 include의 정보와 link 정보를 기억하지 못하기 때문에 config를 사용해서 결과로 출력되는 것을 명령어의 인자로 전달시켜주는 것입니다. 이러한 디렉터리 정보를 MakeFile에 적어두고 사용한다면 git와 같은 버저 관리 시스템에서는 각 사용자마다 local의 정보가 다르기 때문에 일일이 수정을 해주어야 하는 등 상당함 노고를 치르게 됩니다.  

이와 같은 수고를 덜기 위해서 아래와 같이 gcc 커맨드에 추가하면 됩니다.

```bash
$ gcc -o test test.c `pkc-config --cflags --libs gstreamer-1.0`
```

이제 위 명령어가 이해가 되었습니다. 그리고 만약 다른 Gstreamer libraries 들을 사용하고 있다면 아래와 같이 추가해주어야 합니다.  

```bash
$ gcc -o test test.c `pkc-config --cflags --libs gstreamer-1.0 {추가적으로 사용하고 있는 lib 이름}`
```

만약에 automake/autoconf와 같은 자동 빌드 시스템을 사용해서 명시적으로 어떤 libs를 사용하고 있는지 모르는 경우에는 이와 같은 방법을 사용할 수 없습니다. 그럴 때는 다음과 같이 하라고 나와있습니다. 원문을 그대로 옮깁니다. (If your application is built with the help of libtool, e.g. when using automake/autoconf as a build system, you have to run the configure script from inside the gst-sdk-shell environment.)  

### Getting the tutorial's source code

1. Repo를 clone합니다.
  ```bash
  $ git clone https://gitlab.freedesktop.org/gstreamer/gst-docs
  ```
2. 실행해볼 폴더로 이동합니다.
  ```bash
  $ cd gst-docs/examples/tutorials/
  ```
3. 튜토링러 파일을 실행합니다.
  ```bash
  $ gcc basic-tutorial-1.c -o basic-tutorial-1 `pkg-config --cflags --libs gstreamer-1.0`
  ```
4. 처음 보는 동영상이 실행됩니다. 잘 설치된 것 같습니다.

## Note!

각 튜토리얼에서 compile을 할 때 추가서 명시해야하는 lib를 알려줄 것입니다. 그 때마다 아래와 같이 잘 지정해서 적어주어야 합니다.  

```bash
$ gcc -o test test.c `pkc-config --cflags --libs gstreamer-1.0 {추가적으로 사용하고 있는 lib 이름}`
```













