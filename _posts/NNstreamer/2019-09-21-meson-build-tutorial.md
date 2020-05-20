---
title: "[NNStreamer] meson build tutorial "
excerpt: "understanding meson build system"
date: 2019-09-21
categories:
  - NNstreamer
tags:
  - nnstreamer
  - meson
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

<https://mesonbuild.com/Tutorial.html>를 참조해서 포스팅합니다.  

## meson build system 이해하기

먼저 `GTK` 개발도구가 설치되어 있다는 가정하에 tutorial을 시작합니다.

```bash
$ sudo apt install libgtk-3-dev
$ sudo apt install meson
```

그리고 프로젝트 디렉토리를 만들고 소스파일과 meson.build 파일을 같은 디렉토리에 생성합니다.  

```bash
cd ~
mkdir meson_tutorial & cd meson_tutorial
gedit main.c
gedit meson.build
```

```c
//main.c
#include<stdio.h>

int main(int argc, char **argv) {
  printf("Hello there.\n");
  return 0;
}
```
```c
//meson.build
project('tutorial', 'c')
executable('demo', 'main.c')
```

다음으로 source 파일을 만든 디렉토리에서 아래의 명령을 입력합니다.

```bash
meson builddir
```

```bash
//output
The Meson build system
Version: 0.50.1
Source dir: /home/niklasjang/meson_tutorial
Build dir: /home/niklasjang/meson_tutorial/builddir
Build type: native build
Project name: tutorial
Project version: undefined
Native C compiler: cc (gcc 7.4.0 "cc (Ubuntu 7.4.0-1ubuntu1~18.04.1) 7.4.0")
Build machine cpu family: x86_64
Build machine cpu: x86_64
Build targets in project: 1
Found ninja-1.8.2 at /usr/bin/ninja
```

위 명령은 source 디렉토링 builddir이라는 이름으로 폴더를 하나 만들고 모든 컴파일 결과를 이 폴더에 저장합니다. 컴파일 결과를 source 파일과 분리된 곳에 저장하도록 강제하는 것은 meson만의 특징입니다. 

이제 코드를 빌드할 준비가 되었습니다.

```bash
$ cd builddir
$ ninja
```

이제 binary 코드가 생성됩니다. 실행파일입니다.

```bash
$ ./demo
```

```bash
//output
Hello there.
```
## Reference

- <https://github.com/wooksong/contributon2019-nns/issues/1>
- <https://mesonbuild.com/Tutorial.html>