---
title: "[NNStreamer] Gstreamer 기본 튜토리얼 2"
excerpt: "Custom Pipeline 만들어보기 "
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

## 목표

이전 포스팅에서는 pipeline을 자동으로 생성했는데 이번에는 각 요소들을 instantiating하면서 manual하게 pipeline을 만들어 보겠습니다. 

- Gstreamer 요소를 만드는 방법
- 각 요소를 연결하는 방법
- 각 요소의 behavior를 커스텀하는 방법
- bus를 에러 컨디션과 메시지를 얻기 위해서 watch하는 방법

## Manual Hello World

```c
//basic-tutorial-2.c
#include <gst/gst.h>

int main(int argc, char *argv[]) {
  GstElement *pipeline, *source, *sink;
  GstBus *bus;
  GstMessage *msg;
  GstStateChangeReturn ret;

  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  /* Create the elements */
  source = gst_element_factory_make ("videotestsrc", "source");
  sink = gst_element_factory_make ("autovideosink", "sink");

  /* Create the empty pipeline */
  pipeline = gst_pipeline_new ("test-pipeline");

  if (!pipeline || !source || !sink) {
    g_printerr ("Not all elements could be created.\n");
    return -1;
  }

  /* Build the pipeline */
  gst_bin_add_many (GST_BIN (pipeline), source, sink, NULL);
  if (gst_element_link (source, sink) != TRUE) {
    g_printerr ("Elements could not be linked.\n");
    gst_object_unref (pipeline);
    return -1;
  }

  /* Modify the source's properties */
  g_object_set (source, "pattern", 0, NULL);

  /* Start playing */
  ret = gst_element_set_state (pipeline, GST_STATE_PLAYING);
  if (ret == GST_STATE_CHANGE_FAILURE) {
    g_printerr ("Unable to set the pipeline to the playing state.\n");
    gst_object_unref (pipeline);
    return -1;
  }

  /* Wait until error or EOS */
  bus = gst_element_get_bus (pipeline);
  msg = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE, GST_MESSAGE_ERROR | GST_MESSAGE_EOS);

  /* Parse message */
  if (msg != NULL) {
    GError *err;
    gchar *debug_info;

    switch (GST_MESSAGE_TYPE (msg)) {
      case GST_MESSAGE_ERROR:
        gst_message_parse_error (msg, &err, &debug_info);
        g_printerr ("Error received from element %s: %s\n", GST_OBJECT_NAME (msg->src), err->message);
        g_printerr ("Debugging information: %s\n", debug_info ? debug_info : "none");
        g_clear_error (&err);
        g_free (debug_info);
        break;
      case GST_MESSAGE_EOS:
        g_print ("End-Of-Stream reached.\n");
        break;
      default:
        /* We should not reach here because we only asked for ERRORs and EOS */
        g_printerr ("Unexpected message received.\n");
        break;
    }
    gst_message_unref (msg);
  }

  /* Free resources */
  gst_object_unref (bus);
  gst_element_set_state (pipeline, GST_STATE_NULL);
  gst_object_unref (pipeline);
  return 0;
}
```

요소라고 부르는 것은 GStreamer의 기본적인 construction block입니다. 요소들은 source 요소들에서 sink 요소들로 downstream 하면서 data들을 process합니다. 그리고 이 과정에서 filter 요소들을 전달합니다.  

![nnstreamer-7](/assets/images/nnstreamer/nnstreamer-7.jpg)  

## Element Creation

```c
/* Create the elements */
source = gst_element_factory_make ("videotestsrc", "source");
sink = gst_element_factory_make ("autovideosink", "sink");
```
위의  코드에서 볼 수 있듯이 gst_element_factory_make()를 사용하면 요소를 만들 수 있고 첫 번째 인자는 어떤 요소를 만들지에 대한 정보를 전달합니다. 두 번째 인자는 이 특정 instance에 주고 싶은 이름은 전달합니다. 이름을 붙히는 것은 나중에 이들을 retrieve하는데 도움을 주기 때문에 유용합니다. 만약 null을 두 번째 인자로 전달하면 UNIQUE 한 이름을 알아서 붙혀줍니다.  

`videotestsrc`는 source element로서 test video pattern을 만드는 역할을 합니다. 이 요소는 디버깅 목적을 위해서는 유용하고 실제 application에서는 별로 좋지 않습니다.  

`autovideosink`는 sink element로서 이것이 받는 이미지를 윈도우에 출력해줍니다. OS에 따라서 그리고 필요한 기능에 따라 다양한 videosink가 있습니다. autovideosink는 여러가지 선택지 중에 best one을 선택해서 instantiate해줍니다. 그리고 자세한 것은 알아서 잘 설정을 해주고 우리의 code는 more platform-independent해집니다.  

## Pipeline creation

```c
/* Create the empty pipeline */
pipeline = gst_pipeline_new ("test-pipeline");
```

GST의 모든 요소는 반드시 사용되기 전에 pipeline 안에 포함되어 있어야 합니다. 왜냐하면 이 요소들이 clocking을 케어하기도 하고 messaging functions들을 도와주기도 하기 때문입니다. 우리는 gst_pipeline_new()로 pipeline을 생성할 수 있습니다.  

```c
/* Build the pipeline */
gst_bin_add_many (GST_BIN (pipeline), source, sink, NULL);
if (gst_element_link (source, sink) != TRUE) {
  g_printerr ("Elements could not be linked.\n");
  gst_object_unref (pipeline);
  return -1;
}
```

**pipeline은 특별한 타입의 `bin`입니다.** 이것은 다른 요소를 포함하는데 사용되는 요소입니다. 따라서 bin에 적용되는 모든 method들은 역시 pipeline에도 적용(apply to) 됩니다. 위의 코드에서는 gst_bin_add_many()는 파이프라인에 요소를 더하기 위해서 호출되었습니다. 이 함수는 더해질 요소들을 전달받고 마지막에는 NULL을 전달하면서 끝인 것을 알아차립니다. 각각의 요소들은 gst_bin_add() 함수를 통해서 더해질 수 있습니다.  

하지만 이 요소들은 아직 서로서로 linked 되지는 않았습니다. 이를 위해서 gst_element_link를 사용해야 합니다. 첫 번째 인자는 source 두 번째인자는 destination이 전달됩니다. 전달되는 순서가 중요한데 link는 반드시 data flow를 따라서 established 되어야 하기 때문입니다. 이 경우에는 source 에서 sinnk로 데이터 흐름이 전달되어서 위와 같이 전달했습니다.꼭 기억해야할 것이 **같은 bin에 있는 요소들만 linked 될 수 있습니다.** 따라서 link를 하기 전에 반드시 특별한 타입의 bin이라고 볼 수 있는 pipeline에 더하는 것을 기억하세요.  

## Properties

```c
/* Modify the source's properties */
g_object_set (source, "pattern", 0, NULL);
```

대부분의 GST 요소들은 커스텀 properties를 가지고 있습니다. named attributes는 요소의 행동을 바꾸기 위해서 수정될 수 있습니다. 또는 요소의 초기 state를 찾는 것을 inquired될 수도 있습니다. properties들은 g_object_get()과 g_object_set()를 사용해서 얻고 설정될 수 있습니다. g_object_set()은 NULL로 끝나는 list(property-name, property-value paires)를 받기 때문에 한 번에 여러 요소들을 설정할 수 있습니다.  

모든 GST의 요소들은 a particular kind of `GObject`입니다. `GObject`는 property facilities를 제공하는 entity입니다. 이러한 이유로 g_object_set이 g_ 접두사를 가지고 있는 이유입니다.  

위 코드는 videotestsrc의 pattern property를 변화시킵니다. 이것은 해당 요소가 출력하는 test video의 타입을 컨트롤 합니다. 0이 아닌 다른 값을 주고 다시 컴파일 & 실행해보면 다른 영상이 재생되는 것을 알 수 있습니다.  

```c
/* Modify the source's properties */
g_object_set (source, "pattern", 2, NULL);
```

어떤 종류의 pattern 들이 어떤 값을 가질 수 있는지는 Tutorials 10에서 다룹니다.  

## Error checking

이 시점에서 우리는 모든 pipeline의 build를 진행했고 설정을 마쳤습니다. 그리고 남은 튜토리얼은 에러체킹을 하는 것뿐입니다.  

```c
/* Start playing */
ret = gst_element_set_state (pipeline, GST_STATE_PLAYING);
if (ret == GST_STATE_CHANGE_FAILURE) {
  g_printerr ("Unable to set the pipeline to the playing state.\n");
  gst_object_unref (pipeline);
  return -1;
}
```

우리는 gst_element_set_state()를 했고 이번에는 return된 값을 체크합니다. 변화하는 state는 delicate이고 자세한 부분은 다음 튜토리얼에서 다룹니다.  

```c
/* Wait until error or EOS */
bus = gst_element_get_bus (pipeline);
msg = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE, GST_MESSAGE_ERROR | GST_MESSAGE_EOS);

/* Parse message */
if (msg != NULL) {
  GError *err;
  gchar *debug_info;

  switch (GST_MESSAGE_TYPE (msg)) {
    case GST_MESSAGE_ERROR:
      gst_message_parse_error (msg, &err, &debug_info);
      g_printerr ("Error received from element %s: %s\n", GST_OBJECT_NAME (msg->src), err->message);
      g_printerr ("Debugging information: %s\n", debug_info ? debug_info : "none");
      g_clear_error (&err);
      g_free (debug_info);
      break;
    case GST_MESSAGE_EOS:
      g_print ("End-Of-Stream reached.\n");
      break;
    default:
      /* We should not reach here because we only asked for ERRORs and EOS */
      g_printerr ("Unexpected message received.\n");
      break;
  }
  gst_message_unref (msg);
}
```

gst_bus_timed_pop_filtered()는 종료가 되기를 기다리며 GstMessage와 return을 합니다. 이전 포스팅에서는 무시가 되었던 부분입니다. 우리는 gst_bus_timed_pop_filtered()에게 에러 condition이나 EOS를 만날 때 return을 하도록 요청했습니다. 그래서 우리는 어떤 것이 발생했는지 체크를 해야하며 이에 대한 메시지를 screen에 print합니다. GstMessage는 매우 변하기 쉬운versatile 구조인데 어떤 종류의 virtual info도 전달할 수 있습니다. Gstreamer는 각 종류의 msg에 대해서 parsing function들을 제공합니다.  

  - parser란?
  parse는 컴파일러의 부분적인 프로그램으로 연속적인 프로그램 명령어, interactive online command, markup tags, etc 들의 형태를 받습니다. 그리고 이들은 작은 단위의 부분들(nouns,verbs etc)등으로 나눠서 컴파일러의 다른 프로그램들에 의해서 managed 될 수 있도록 합니다. 또한 parser는 모든 input이 제대로 들어왔는지 검사하는 기능도 가지고 있습니다.  

일단 우리가 GST_MESSAGE_TYPE()를 사용해서 msg가 에러를 포함하는 것을 알게 된다면 gst_message_parse_error()를 사용할 수 있습니다. 이것은 GLib GError 에러 구조와 디버깅을 위한 유용한 string을 return 합니다.  

## The GSTreamer bus

The GSTreamer Bus는 application에게 그리고 application thread에게, 요소에 의해서 생성된 GstMessage를 전달하는 책임을 가지고 있는 Object입니다. 메세지들은 gst_bus_timed_pop_filtered()/its siblings 를 사용해서 버스로부터 비/동기적으로 추출될 수 있습니다. 버스가 어떻게 동작하는지 따라가다보면 에러나 재생에 관련된 이슈들을 처리할 수 있습니다.  

## Exercise

If you feel like practicing, try this exercise: Add a video filter element in between the source and the sink of this pipeline. Use vertigotv for a nice effect. You will need to create it, add it to the pipeline, and link it with the other elements.

제가 추가한 코드는 아래에 //Modified 표시를 해두었습니다. source를 filter랑, filter를 sink와 각각 sink 해주어야 합니다.  

```c
#include <gst/gst.h>

int
main (int argc, char *argv[])
{
  GstElement *pipeline, *source, *filter, *sink;                                          //Modified
  GstBus *bus;
  GstMessage *msg;
  GstStateChangeReturn ret;

  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  /* Create the elements */
  source = gst_element_factory_make ("videotestsrc", "source");
  filter = gst_element_factory_make("vertigotv", "filter");                               //Modified
  sink = gst_element_factory_make ("autovideosink", "sink");

  /* Create the empty pipeline */
  pipeline = gst_pipeline_new ("test-pipeline");

  if (!pipeline || !source || !sink || !filter) {                                          //Modified
    g_printerr ("Not all elements could be created.\n");
    return -1;
  } 

  /* Build the pipeline */
  gst_bin_add_many (GST_BIN (pipeline), source, filter, sink, NULL);
  if ((gst_element_link (source, filter) && gst_element_link (filter, sink)) != TRUE) {    //Modified
    g_printerr ("Elements could not be linked.\n");
    gst_object_unref (pipeline);
    return -1;
  }

  /* Modify the source's properties */
  g_object_set (source, "pattern", 0, NULL);

  /* Start playing */
  ret = gst_element_set_state (pipeline, GST_STATE_PLAYING);
  if (ret == GST_STATE_CHANGE_FAILURE) {
    g_printerr ("Unable to set the pipeline to the playing state.\n");
    gst_object_unref (pipeline);
    return -1;
  }

  /* Wait until error or EOS */
  bus = gst_element_get_bus (pipeline);
  msg =
      gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,
      GST_MESSAGE_ERROR | GST_MESSAGE_EOS);

  /* Parse message */
  if (msg != NULL) {
    GError *err;
    gchar *debug_info;

    switch (GST_MESSAGE_TYPE (msg)) {
      case GST_MESSAGE_ERROR:
        gst_message_parse_error (msg, &err, &debug_info);
        g_printerr ("Error received from element %s: %s\n",
            GST_OBJECT_NAME (msg->src), err->message);
        g_printerr ("Debugging information: %s\n",
            debug_info ? debug_info : "none");
        g_clear_error (&err);
        g_free (debug_info);
        break;
      case GST_MESSAGE_EOS:
        g_print ("End-Of-Stream reached.\n");
        break;
      default:
        /* We should not reach here because we only asked for ERRORs and EOS */
        g_printerr ("Unexpected message received.\n");
        break;
    }
    gst_message_unref (msg);
  }

  /* Free resources */
  gst_object_unref (bus);
  gst_element_set_state (pipeline, GST_STATE_NULL);
  gst_object_unref (pipeline);
  return 0;
}

```

만약 negotiation Error가 나오면 [원문](https://gstreamer.freedesktop.org/documentation/tutorials/basic/concepts.html?gi-language=c)을 참고하세요.  


## 결론

- 요소를 만드는 방법 : gst_element_factory_make()
- 빈 파이프 라인을 만드는 방법 : gst_pipeline_new()
- 파이프 라인에 요소를 추가하는 방법 : gst_bin_add_many()
- 각각의 요소들을 link하는 방법 : gst_element_link()





