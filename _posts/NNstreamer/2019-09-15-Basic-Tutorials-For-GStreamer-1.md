---
title: "[NNStreamer] Gstreamer 기본 튜토리얼 1"
excerpt: "Hello World 찍어보기 "
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

본 포스팅은 [여기](https://gstreamer.freedesktop.org/documentation/tutorials/basic/hello-world.html?gi-language=c)를 참조합니다.  

## 목표

새로운 library를 접할 때 Hello World를 찍는 것보다 더 큰 첫 인상은 없을 것입니다. 하지만 저희가 사용하려고 하는 Gstreamer는 multimedia framework이기 때문에 hello world 대신에 비디오를 실행시켜보겠습니다. 아래의 코드가 너무 많아보여도 겁먹지 마세요. 실제로 동작하는 코드는 단 4줄뿐이고, 나머지는 cleanup code 그리고 verbose에 관한 것입니다.  

## 실행해보기 

이전 포스팅에서 git clone을 할 때 디렉토리를 바꾸지 않았다면

```bash
$ ~/gst-docs/examples/tutorials
```

위치에서 basic-tuturials-$*$.c 파일들을 찾을 수 있습니다. 먼저 첫 번째 파일부터 뜯어보겠습니다. 

```c
//basic-tuturials-1.c
#include <gst/gst.h>

int
main (int argc, char *argv[])
{
  GstElement *pipeline;
  GstBus *bus;
  GstMessage *msg;

  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  /* Build the pipeline */
  pipeline =
      gst_parse_launch
      ("playbin uri=https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm",
      NULL);

  /* Start playing */
  gst_element_set_state (pipeline, GST_STATE_PLAYING);

  /* Wait until error or EOS */
  bus = gst_element_get_bus (pipeline);
  msg =
      gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,
      GST_MESSAGE_ERROR | GST_MESSAGE_EOS);

  /* Free resources */
  if (msg != NULL)
    gst_message_unref (msg);
  gst_object_unref (bus);
  gst_element_set_state (pipeline, GST_STATE_NULL);
  gst_object_unref (pipeline);
  return 0;
}
```

그리고 위 프로그램을 실행시킵니다.  

```bash
$ gcc basic-tutorial-1.c -o basic-tutorial-1 `pkg-config --cflags --libs gstreamer-1.0`
$ ./basic-tutorial-1 
```
위 프로그램은 인터넷에서 특정 동영상을 fetch 해서 가져와서 보여줍니다. 새로운 window 창이 뜨는데 몇 초정도 시간이 소요될 수 있습니다. latency management(buffering) 기능도 없는 기본적인 코드입니다.  

## 하나씩 이해하기

```c
/* Initialize GStreamer */
gst_init (&argc, &argv);
```

이 코드는 항상 첫 번째 GStreamer command여야 합니다.
 - 모든 interal structures들을 모두 초기화합니다.
 - 어떤 plug-in들이 사용가능한지 체크합니다.
 - Gstreamer에 의도된 모든 command-line option들을 실행합니다.
만약 command-line parameters `argc`와 `argv`를 전달한다면 GStreamer의 기본 command-line options들의 혜택을 얻게됩니다.  

```c
/* Build the pipeline */
pipeline =
    gst_parse_launch
    ("playbin uri=https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm",
    NULL);
```
이 라인이 이 tutorial의 핵심이 되는 코드입니다. 이 코드는 gst_parse_launch와 playbin의 사용법을 이해시켜줄 것입니다.  

### gst_parse_launch

Gstreamer는 multimedia flow들을 다루기 위해서 디자인 되었습니다. Media는 producer인 "source" 요소로부터 consumers인 "sink"까지 여행을 합니다. 그리고 이 여행은 모든 종류의 일을 처리하는 중간 요소들을 전달하면서 진행됩니다. 모든 서로 연결된 이(the) 요소들의 집합을 "pipeline"이라고 부릅니다.  

GStreamer 안에서 우리는 manually 개인 요소들을 모아서 pipleline을 build 합니다. 그러나 pileline이 충분히 쉬워서 advanced 된 요소들이 필요없을 때는 `gst_parse_launch()`를 사용할 수 있습니다.  

이 함수는 파이프라인의 textual representation을 받고 이를 실제의 pipeline으로 바꿔줍니다. 완전 쉽죠. 위의 코드에서 text로 전달된 uri를 받아서 실제 비디오를 stream하기 위한 pipeline(데이터가 우리의 local까지 도달하는데 필요한 모든 요소들의 집합)을 만들어서 데이터를 보내준 것입니다.  

### playbin

우리는 어떤 형태의 pipeline을 gst_parse_launch()에게 만들어달라고 했을까요? 여기에 우리가 주목해야하는 두 번째 키 포인트가 있습니다. 우리는 playbin이라는 하나의 요소로 구성된 pipeline을 building 하고 있습니다.  

playbin은 source 처럼 그리고 sink 처럼 행동하는 특별한 요소입니다. 그리고 이것은 완전한 pipeline입니다. 내부적으로 이것은 media를 실행하는데 필요한 모든  요소들을 생성하고 연결합니다. 이 튜토리얼에서 우리는 palybin이라는 단 하나의 parameter를 전달하고 있습니다. 그리고 이것은 우리가 보고자하는 영상의 URI입니다. 이 값을 원하는 값으로 바꿔고 잘 동작합니다. `http://`로 바꿔도 `file://`로 바꿔고 playbin은 적절한 GStreamer source를 투명하게 instantiate(인스턴스화)할 것입니다.  

만약에 URI가 잘못 입력되거나 해당 파일이 존재하지 않는다면 그리고 만약 plug-in이 missing되었다면 Gstreamer는 여러 종류의 notification mechasisms를 제공합니다. 그러나 이 튜토리얼에서는 그저 에러가 발생했을 때 이를 빠져나가는 방법을 알아보고 있을 뿐입니다. 이 이상의 feedback은 당장은 필요없습니다.

### gst_element_set_state

```c
/* Start playing */
gst_element_set_state (pipeline, GST_STATE_PLAYING);
```
이 한 줄은 state라는 것을 설정합니다. 모든 GStreamer 요소들은 연관된 state를 가집니다. 이는 일반적인 DVD player에 존재하는 PLAY/PAUSE 버튼을 생각해도 됩니다. 지금으로서는 GST_STATE_PLAYING로 세팅하지 않으면 playback이 시작하지 않을 것이라는 것만 알고 있으면 됩니다.  

위의 한 줄의 코드에 대해서 state를 지정하고 있는 대상은 pipeline입니다. state를 지정하면서 playback재생을 시작하고 있습니다.  

### gst_element_get_bus & gst_bus_timed_pop_filtered
```c
/* Wait until error or EOS */
bus = gst_element_get_bus (pipeline);
msg =
    gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,
    GST_MESSAGE_ERROR | GST_MESSAGE_EOS);
```

이 라인들은 에러가 발생할 때까지 기다리거나 stream이 종료될 때까지 기다립니다. 이 함수는 pileline의 버그를 검색하고 gst_bus_timed_pop_filtered()는 이 버그를 통해서 에러나 EOS(End-Of-Stream)를 얻을 때까지 차단됩니다. 어떻게 이 함수가 실행되는지는 GStreamer의 Bus에 대해서 다루는 Tutorials 2에 나와있습니다. 다음 포스팅에서 이어집니다.  

### That's it!

이게 전부입니다. 실행은 에러가 발생하거나 EOS에 도달할 때까지 혹은 사용자가 Ctrl+C를 command line에서 누를 때까지 이어집니다. 

### Clean up

appplication을 종료하기 전에 우리 스스로 치워야할 것들이 조금 있습니다. 

```c
/* Free resources */
if (msg != NULL)
  gst_message_unref (msg);
gst_object_unref (bus);
gst_element_set_state (pipeline, GST_STATE_NULL);
gst_object_unref (pipeline);
```

당신이 사용하는 모든 함수에 대해서 document를 읽고 항상 free 해주어야 하는 objects가 있는지 확인하세요. 이 경우에 gst_bus_timed_pop_filtered()는 어떤 것이 freed 되어야 하는지에 대한 정보를 담고 있습니다. 

## 정리

- 어떻게 GStreamer를 초기화할 것인가 : gst_init()
- 어떻게 textual descripting으로부터 pipeline을 build할 것인가 : gst_parse_launch()
- 자동으로 재생 pipeline를 만드는 방법 : playbin
- Gstreamer가 실행상태가 되도록 신호를 보내는 방법 : gst_element_set_state()
- 어떻게 하면 편안하게 작업을 할 수 있는가 : gst_element_get_gus(), get_bus_timed_pop_fitered()
