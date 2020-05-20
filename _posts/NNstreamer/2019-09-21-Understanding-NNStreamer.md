---
title: "[NNStreamer] NNStreamer 둘러보기 "
excerpt: "From introduction to Build"
date: 2019-09-21
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

본 포스팅은 [공식 Repo](https://github.com/nnsuite/nnstreamer)와 [공식 Repo의 getting-started](https://github.com/nnsuite/nnstreamer/blob/master/Documentation/getting-started.md)를 참조합니다.  

## 소개

`NNStreamer`는 오래된 CPI와 적은 메모리 용량을 가지고 있는 컴퓨터 기반의 서버를 지원하기 위해 만들어진 오픈소스 library입니다. Gstreamer의 개발자들에게는 neural network 모델을 쉽고 효율적으로 적용할 수 있게 도와줍니다. neural network 개발자에게는 stream pipeline과 그들의 filter를 쉽고 효율적으로 관리할 수 있도록 도와줍니다.  
- 이 라이브러리는 gstreamer streams에게 neural network framework connectivities(e.g. tensorflow, caffe, etc)를 제공합니다. 
- Neural network 모델은 효율적이고 유연한 streaming management를 원하는데 nnstreamer가 이를 지원해줄 것입니다.
- neural network model을 media의 filter 또는 converter로 사용할 수 있습니다. 
- single stream instance에서 여러 개의 neural network 모델을 사용할 수 있도록 해줍니다. 
- neural network 모델에게 여러 개의 source 들을 사용할 수 있도록 해줍니다. 

## 사용방법

여기 부분은 [nnstreamer-example](https://github.com/nnsuite/nnstreamer-example)을 참고했습니다.  

[nnstreamer-example](https://github.com/nnsuite/nnstreamer-example) Repo는 개발자들이 nnstreamer/gstreamer를 사용해서 자신들의 앱을 만드는 방법을 알려주는 곳입니다. Ubuntu에서는 `Launchpad/PPA`를 사용해서 `prebuilt binary packages`를 다운받을 것을 권장하고 있습니다. [여기](https://launchpad.net/~nnstreamer/+archive/ubuntu/ppa)에 들어가보면 Adding this PPA to your system이라고 적혀있는 부분에 설치 명령어가 적혀있습니다.  

다음과 같은 순서대로 진행됩니다.

1. prerequisites 설치
2. nnstreamer 설치
3. 




### Prerequisites 설치

모두 설치하면 됩니다.  

- [gcc/g++](https://niklasjang.github.io/nnstreamer/Installing-Gstreamer/#gcc-%EC%84%A4%EC%B9%98)
- [gstreamer 1.0 and its relatives](https://niklasjang.github.io/nnstreamer/Installing-Gstreamer/#gstreamer-%EC%84%A4%EC%B9%98)
- glib 2.0
  ```bash
  $sudo apt install libglib2.0-dev
  ```
- meson >= 0.42
  ```bash
  $ sudo apt install meson
  ```

### nnstreamer 설치

`ppa`는 Personal Package Archive의 약어로  우분투의 공식 패키지 저장소에 없는 서드파티 소프트웨어를 위한 개인용 소프트웨어 패키지 저장소입니다.  단순히 소프트웨어의 패키지를 저장하는 것뿐만이 아닌 해당 소프트웨어의 업데이트 기능도 제공합니다. `ppa`로 repo를 지정해주지 않으면 apt update를 했을 때 서드파이 소프트웨어를 찾을 수 없습니다. 그래서 위와 같이 repo를 등록하고 update를 진행하면 해당 패키지를 찾을 수 있습니다.  

설치를 진행하기에 앞서 `apt`,`apt-get` 그리고 `git`의 차이를 짚고 넘어가는 것이 좋겠습니다.  

- `apt` : apt provides a high-level commandline interface for the package management system. It is intended as an end user interface and enables some options better suited for interactive usage by default compared to more specialized APT tools like apt-get(8) and apt-cache(8).
- `apt-get` : apt-get is the command-line tool for handling packages, and may be considered the user's "back-end" to other tools using the APT library. Several "front-end" interfaces exist, such as aptitude(8), synaptic(8) and wajig(1).
- `git` : Git is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals.  

먼저 필요한 package들을 설치합니다.  

```bash
$ sudo apt-add-repository ppa:nnstreamer
$ sudo apt install devscripts git equivs
```

- [`equivs`](https://packages.debian.org/jessie/equivs)는 Circumvent우회 Debian package dependencies의 역할을 합니다.
- [`devscripts`](https://packages.debian.org/sid/devscripts)는 scripts to make the life of a Debian Package maintainer easier의 역할을 합니다. 

이제 빌드를 진행해보겠습니다. 먼저 contributon 디렉토리를 만들고 cd 합니다.  

```bash
$ cd ~
$ mkdir -p contributon & cd contributon
```

nnstreamer repo를 clone하고 프로젝트의 루트로 이동합니다.

```bash
$ git clone https://github.com/nnsuite/nnstreamer.git
$ cd nnstreamer
```

다음으로 nnstreamer source를(git clone은 source를 받아온 것이지 package를 install한 것이 아닙니다!) package dependencies를 맞추면서 빌드를 진행합니다.  

```bash
$ mk-build-deps -i ./debian/control --root-cmd sudo
```

[mk-build-deps reference](http://manpages.ubuntu.com/manpages/cosmic/man1/mk-build-deps.1.html)  

- `-i` 옵션은 Install the generated packages and its build-dependencies. 의 역할을 합니다. 
- `root-cmd` 옵션은  Use the specified tool to gain root privileges before installing.  Ignored if used without the --install switch.의 역할을 합니다. 
- `mk-build-deps`는 내부적으로 `equivs`를 사용해서 필요한 package(nnstreamer 포함)를 설치합니다. 그래서 아까 아래의 명령을 진행했던 것입니다.  
  ```bash
  $ sudo apt-add-repository ppa:nnstreamer
  $ sudo apt install devscripts git equivs
  ```
- 이 명령을 시간이 조금 걸립니다.  

```bash
//output

dh_testdir
dh_testroot
dh_prep
dh_testdir
dh_testroot
dh_install
dh_installdocs
dh_installchangelogs
dh_compress
dh_fixperms
dh_installdeb
dh_gencontrol
dh_md5sums
dh_builddeb
dpkg-deb: building package 'nnstreamer-build-deps' in '../nnstreamer-build-deps_0.3.0.0_amd64.deb'.

The package has been created.
Attention, the package has been created in the current directory,
not in ".." as indicated by the message above!
[sudo] password for niklasjang: 

...omission...

Setting up libgstreamer1.0-dev:amd64 (1.14.5-0ubuntu1~18.04.1) ...
Setting up libgstreamer-plugins-base1.0-dev:amd64 (1.14.5-0ubuntu1~18.04.1) ...
Setting up nnstreamer-build-deps (0.3.0.0) ...
```

이렇게 필요한 dependencies들을 설치할 수 있었던 것은 ./debian/control을 사용해서 필요한 dep를 판단했기 때문입니다. 아래는 [./debian/contorl](https://github.com/nnsuite/nnstreamer/blob/master/debian/control)의 일부입니다.  

```bash
Source: nnstreamer
Section: libs
Priority: optional
Maintainer: MyungJoo Ham <myungjoo.ham@samsung.com>
Build-Depends: gcc (>=5), ninja-build, meson (>=0.42),
 debhelper (>=9),
 libgstreamer1.0-dev, libgstreamer-plugins-base1.0-dev, libglib2.0-dev,
 gstreamer1.0-tools, gstreamer1.0-plugins-base, gstreamer1.0-plugins-good,
 libgtest-dev, ssat, libpng-dev, libopencv-dev, liborc-0.4-dev,
 python, python-numpy, python3, python3-dev, python3-numpy,
 tensorflow-lite-dev, pytorch,
 tensorflow-dev [amd64], python2.7-dev, libprotobuf-dev [amd64 arm64 armhf]
Standards-Version: 3.9.6
Homepage: https://github.com/nnsuite/nnstreamer

Package: nnstreamer
Architecture: any
Multi-Arch: same
Depends: ${shlibs:Depends}, ${misc:Depends}
Description: NNStreamer plugins for Gstreamer
 Gstreamer plugins, "NNStreamer", provides access to neural network frameworks for media streams.
```

이제 meson build를 진행하고 ./build에 있는 빌드 결과를 확인합니다.  

```bash
$ meson build
$ cd build
$ ls -l
```

```bash
//output
niklasjang@niklasjang-VirtualBox:~/contributon/nnstreamer$ cd build
niklasjang@niklasjang-VirtualBox:~/contributon/nnstreamer/build$ ls
api                    ext         meson-logs           nnstreamer.ini      tests
build.ninja            gst         meson-private        nnstreamer.pc
compile_commands.json  meson-info  nnstreamer-test.ini  nnstreamer_example
niklasjang@niklasjang-VirtualBox:~/contributon/nnstreamer/build$ ls -l
total 352
drwxr-xr-x 2 niklasjang niklasjang   4096  9월 21 12:31 api
-rw-r--r-- 1 niklasjang niklasjang 178983  9월 21 12:31 build.ninja
-rw-r--r-- 1 niklasjang niklasjang 135159  9월 21 12:31 compile_commands.json
drwxr-xr-x 3 niklasjang niklasjang   4096  9월 21 12:31 ext
drwxr-xr-x 3 niklasjang niklasjang   4096  9월 21 12:31 gst
drwxr-xr-x 2 niklasjang niklasjang   4096  9월 21 12:31 meson-info
drwxr-xr-x 2 niklasjang niklasjang   4096  9월 21 12:31 meson-logs
drwxr-xr-x 2 niklasjang niklasjang   4096  9월 21 12:31 meson-private
-rw-r--r-- 1 niklasjang niklasjang    664  9월 21 12:31 nnstreamer-test.ini
-rw-r--r-- 1 niklasjang niklasjang    663  9월 21 12:31 nnstreamer.ini
-rw-r--r-- 1 niklasjang niklasjang    371  9월 21 12:31 nnstreamer.pc
drwxr-xr-x 8 niklasjang niklasjang   4096  9월 21 12:31 nnstreamer_example
drwxr-xr-x 2 niklasjang niklasjang   4096  9월 21 12:31 tests
niklasjang@niklasjang-VirtualBox:~/contributon/nnstreamer/build$ 
```

meson build와
meson buliddir & cd builddir & ninja 어떻게 다른지??











다음으로는 `pbuilde`를 사용해야 합니다. `pbuild`의 정의는 [여기](https://niklasjang.github.io/nnstreamer/1st-meeting/#pbuild%EB%9E%80-chroot%EB%9E%80)에서 정리했었습니다. 사용 방법을 설명하겠습니다. 

먼저 3가지의 패키지를 설치해야 합니다.

```bash
$ sudo apt-get install pbuilder debootstrap devscripts
```

Create a base `tarball` that will contain your `chroot` environment to build packages with.을 진행합니다. `tarball`에서 `tar`는 `Tape Archive`의 약어입니다. 그리고 `tarball` 또는 `tarfile`은 tar command를 사용해서 함께 bundle되는 파일들의 그룹 또는 아카이브를 의미합니다. 이들은 보통 `*.tar`의 확장자를 가지고 있습니다. 만약 `*.tar`파일이 `gzip` command로 압축이 된다면 `tarball` 파일은 `*.tar.gz`의 확장자를 가지게 됩니다. 이는 쉽게 생각하면 window의  `*.zip` 파일과 같은 압축파일이고 `gunzip` command를 사용해서 uncompreee할 수 있습니다. 

아래 명령어는 패키지를 빌드할 `chroot` 환경을 포함하는 특정 파일들의 묶음을 만들어냅니다. `chroot`란 change-root의 약자로 현재 실행 중인 프로세스와 child 프로세스 그룹에서 Root directory를 변경하는 작업을 말합니다. 따라서 어려운 작업이므로 생성할 파일이 많아서 위 명령어는 시간이 조금 걸리는 편입니다.  

```bash
$ sudo pbuilder create
```

`chroot`를 가상의 공간에서 빌드 체크를 한 뒤에 빌드의 결과물만 `*.deb`파일(debian 계열의 ubuntu에서 지원하는, window의 .exe와 대등한, 실행파일)을 가져다줍니다. 그래서 `가상의 공간`에서 빌드가 제대로 되어도 원래의 공간(Official build machine)에서는 빌드하는 패키지와 dependency가 맞지 않을 수 있습니다. 이를 위해서 가장 `Official build machine`과 같은 환경에서 빌드를 하기 위해서는 다음의 명령어를 입력하면 됩니다.  

```bash
$ sudo pbuilder create --debootstrapopts --variant=buildd
```

만약 지금까지 잘 되었다면 /var/cache/pbuilder/ 디렉토리에는 base.tgz 파일이 있어야 합니다.

```bash
niklasjang@niklasjang-VirtualBox:~$ ls /var/cache/pbuilder/
aptcache  base.tgz  build  ccache  pbuildd  pbuilder-mnt  result
```

가상의 환경에서 데비안 패키지를 빌드 하기 위해서는 `pdebuild`를 사용해야합니다. `pdebuild`는 ` debuild`를 진행하는 `pbuilder` 방법입니다. 이 말을 모르겠다면 [여기](https://niklasjang.github.io/nnstreamer/1st-meeting/#%EC%B2%98%EC%9D%8C-%EB%93%A4%EC%96%B4%EB%B3%B8-terminology)를 보고 오면 됩니다. `pdebuild`는 `debuild`를 진행하는 것과 같은 방법으로 빌드를 진행합니다. `debian` 디렉토리를 포함하는 곳으로 이동해서 아래의 명령어를 입력합니다.  

```bash
$ git clone https://github.com/nnsuite/nnstreamer-example.git
$ cd nnstreamer-example
$ pdebuild
```

그러면 아래와 같은 에러를 보여줄 것입니다.  

```bash
W: /home/niklasjang/.pbuilderrc does not exist
dpkg-checkbuilddeps: error: Unmet build dependencies: nnstreamer-dev libopencv-dev tensorflow-lite-dev tensorflow-dev libprotobuf-dev
```

일단 pdebuild도 builde를 위한 것이기 때문에 Development tool이 필요합니다. 이는 GCC, g++, make, libc6-dev and dpkg-dev packages와 같은 것들을 포함합니다. 이 외에도 필요한 것들을 모두 설치합니다.  

```bash
$ sudo apt install ubuntu-dev-tools
$ sudo apt install dpkg
$ sudo apt install dpkg-dev
```

pbuilder-dist precise create 해봐도 안되요

------------------------이하 Web Cam Example입니다.

```bash
niklasjang@niklasjang-VirtualBox:~/nnstreamer-example/bash_script/example_object_detection_tensorflow_lite$ hwinfo | grep "video"
       vboxvideo: module = vboxvideo
           video: /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A03:00/LNXVIDEO:00
    input device: bus = acpi, bus_id = LNXVIDEO:00 driver = video
  P: Phys=LNXVIDEO/video/input0
  E: DRIVER=video
  E: PHYS="LNXVIDEO/video/input0"
  E: LIBINPUT_DEVICE_GROUP=19/0/6:LNXVIDEO/video
  vboxvideo 36864 0 - Live 0x0000000000000000 (OE)
  ttm 102400 2 vboxvideo,vmwgfx, Live 0x0000000000000000
  drm_kms_helper 180224 2 vboxvideo,vmwgfx, Live 0x0000000000000000
  drm 479232 8 vboxvideo,vmwgfx,ttm,drm_kms_helper, Live 0x0000000000000000
  video 49152 0 - Live 0x0000000000000000
```

```bash
niklasjang@niklasjang-VirtualBox:~/nnstreamer-example/bash_script/example_object_detection_tensorflow_lite$ VBoxManage list webcams
VBoxManage: error: No extension pack by the name 'Oracle VM VirtualBox Extension Pack' was found
VBoxManage: error: Details: code VBOX_E_OBJECT_NOT_FOUND (0x80bb0001), component ExtPackManagerWrap, interface IExtPackManager, callee nsISupports
VBoxManage: error: Context: "COMGETTER(VideoInputDevices)(ComSafeArrayAsOutParam(hostVideoInputDevices))" at line 845 of file VBoxManageList.cpp
Video Input Devices: 0
```


If you are running on VMWare, you have to `vbox-extpack` on Host O/S to find `/dev/video0`. Check you VMWare version and download *.vbox-extpack from [here](http://download.virtualbox.org/virtualbox)


Host O/S에서 적절한 버전의 [*.vbox-extpack 설치](
http://download.virtualbox.org/virtualbox/6.0.12/)

```bash
$ GST_DEBUG=4 gst-launch-1.0  v4l2src ! jpegdec ! name=cam_src !  videoconvert ! videoscale ! video/x-raw,format=RGB ! queue ! videoconvert ! ximagesink name=img_origin
```

```bash

...omission...

v4l2 gstv4l2object.c:4238:gst_v4l2_object_probe_caps:<cam_src:src> probed caps: image/jpeg, width=(int)1280, height=(int)720, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; image/jpeg, width=(int)960, height=(int)540, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; image/jpeg, width=(int)848, height=(int)480, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; image/jpeg, width=(int)640, height=(int)480, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; image/jpeg, width=(int)640, height=(int)360, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; image/jpeg, width=(int)424, height=(int)240, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; image/jpeg, width=(int)352, height=(int)288, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; image/jpeg, width=(int)320, height=(int)240, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; image/jpeg, width=(int)320, height=(int)180, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; image/jpeg, width=(int)176, height=(int)144, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }

...omission...

```

안됨
1. GST_DEBUG=4 gst-launch-1.0  v4l2src ! jpegdec ! name=cam_src !  videoconvert ! videoscale ! video/x-raw,format=RGB ! queue ! videoconvert ! ximagesink name=img_origin


잘됨

1. ~/nnstreamer-example/bash_script$ gst-launch-1.0 -vv v4l2src device=/dev/video0 ! jpegdec ! video/x-raw,width=640,height=480,format=I420 ! autovideosink sync=false

2. gst-launch-1.0 -vv v4l2src  ! jpegdec ! video/x-raw,width=640,height=480,format=I420 ! autovideosink sync=false

gst-launch-1.0 -vv v4l2src  ! jpegdec ! video/x-raw,width=640,height=480,format=I420 ! ximagesink



