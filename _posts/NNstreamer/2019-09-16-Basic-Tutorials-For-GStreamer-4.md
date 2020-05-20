---
title: "[NNStreamer] Gstreamer 기본 튜토리얼 4"
excerpt: "Time management "
date: 2019-09-16
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

본 포스팅은 [여기](https://gstreamer.freedesktop.org/documentation/tutorials/basic/time-management.html)를 참조합니다. 

## 목표

이번 튜토리얼에서는 시간에 관련된 facialities들을 알아봅니다.

- 파이프라인에게 stream position과 duration에 관련된 질문을 하는 방법
- 하나의 stream 안에서 다른 `position`을 seek(jump)하는 방법

## Introduction

`GstQuery`는 element나 pad에게 일부 정보를 요청하도록 허락하는 매커니즘입니다. 이 예제에서는 파이프라인에게 seeking을 해도 되는지 아닌지를 물어보도록 하겠습니다. seeking이 허용되지 않는 경우로는 live streams 등이 있습니다.  

이전 튜토리얼에서는 우리는 파이프라인은 세팅했고 실행했으며 우리의 메인 함수를 ERROR나 EOS를 `bus`를 통해서 받을 때까지 기다리게 했습니다. 여기서는 우리는 이 함수를 수정해서 주기적으로 깨우고 `stream position`에 대해서 파이프라인에게 물어보는 과정을 해보겠습니다. 이를 통해서 우리는 스크린에 print를 할 수 있을 것입니다.  이것은 미디어 플레이어가 동작하는 방식과 비슷합니다. 예를 들어서 user interface를 주기적으로 update하는 것으로 생각할 수 있습니다.  

결과적으로 `stream duration`이 쿼리되고 변화가 있을 때마다 update 됩니다.  

## Seeking example

```c
//basic-tutorial-4.c
#include <gst/gst.h>

/* Structure to contain all our information, so we can pass it around */
typedef struct _CustomData {
  GstElement *playbin;  /* Our one and only element */
  gboolean playing;      /* Are we in the PLAYING state? */
  gboolean terminate;    /* Should we terminate execution? */
  gboolean seek_enabled; /* Is seeking enabled for this media? */
  gboolean seek_done;    /* Have we performed the seek already? */
  gint64 duration;       /* How long does this media last, in nanoseconds */
} CustomData;

/* Forward definition of the message processing function */
static void handle_message (CustomData *data, GstMessage *msg);

int main(int argc, char *argv[]) {
  CustomData data;
  GstBus *bus;
  GstMessage *msg;
  GstStateChangeReturn ret;

  data.playing = FALSE;
  data.terminate = FALSE;
  data.seek_enabled = FALSE;
  data.seek_done = FALSE;
  data.duration = GST_CLOCK_TIME_NONE;

  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  /* Create the elements */
  data.playbin = gst_element_factory_make ("playbin", "playbin");

  if (!data.playbin) {
    g_printerr ("Not all elements could be created.\n");
    return -1;
  }

  /* Set the URI to play */
  g_object_set (data.playbin, "uri", "https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm", NULL);

  /* Start playing */
  ret = gst_element_set_state (data.playbin, GST_STATE_PLAYING);
  if (ret == GST_STATE_CHANGE_FAILURE) {
    g_printerr ("Unable to set the pipeline to the playing state.\n");
    gst_object_unref (data.playbin);
    return -1;
  }

  /* Listen to the bus */
  bus = gst_element_get_bus (data.playbin);
  do {
    msg = gst_bus_timed_pop_filtered (bus, 100 * GST_MSECOND,
        GST_MESSAGE_STATE_CHANGED | GST_MESSAGE_ERROR | GST_MESSAGE_EOS | GST_MESSAGE_DURATION);

    /* Parse message */
    if (msg != NULL) {
      handle_message (&data, msg);
    } else {
      /* We got no message, this means the timeout expired */
      if (data.playing) {
        gint64 current = -1;

        /* Query the current position of the stream */
        if (!gst_element_query_position (data.playbin, GST_FORMAT_TIME, &current)) {
          g_printerr ("Could not query current position.\n");
        }

        /* If we didn't know it yet, query the stream duration */
        if (!GST_CLOCK_TIME_IS_VALID (data.duration)) {
          if (!gst_element_query_duration (data.playbin, GST_FORMAT_TIME, &data.duration)) {
            g_printerr ("Could not query current duration.\n");
          }
        }

        /* Print current position and total duration */
        g_print ("Position %" GST_TIME_FORMAT " / %" GST_TIME_FORMAT "\r",
            GST_TIME_ARGS (current), GST_TIME_ARGS (data.duration));

        /* If seeking is enabled, we have not done it yet, and the time is right, seek */
        if (data.seek_enabled && !data.seek_done && current > 10 * GST_SECOND) {
          g_print ("\nReached 10s, performing seek...\n");
          gst_element_seek_simple (data.playbin, GST_FORMAT_TIME,
              GST_SEEK_FLAG_FLUSH | GST_SEEK_FLAG_KEY_UNIT, 30 * GST_SECOND);
          data.seek_done = TRUE;
        }
      }
    }
  } while (!data.terminate);

  /* Free resources */
  gst_object_unref (bus);
  gst_element_set_state (data.playbin, GST_STATE_NULL);
  gst_object_unref (data.playbin);
  return 0;
}

static void handle_message (CustomData *data, GstMessage *msg) {
  GError *err;
  gchar *debug_info;

  switch (GST_MESSAGE_TYPE (msg)) {
    case GST_MESSAGE_ERROR:
      gst_message_parse_error (msg, &err, &debug_info);
      g_printerr ("Error received from element %s: %s\n", GST_OBJECT_NAME (msg->src), err->message);
      g_printerr ("Debugging information: %s\n", debug_info ? debug_info : "none");
      g_clear_error (&err);
      g_free (debug_info);
      data->terminate = TRUE;
      break;
    case GST_MESSAGE_EOS:
      g_print ("End-Of-Stream reached.\n");
      data->terminate = TRUE;
      break;
    case GST_MESSAGE_DURATION:
      /* The duration has changed, mark the current one as invalid */
      data->duration = GST_CLOCK_TIME_NONE;
      break;
    case GST_MESSAGE_STATE_CHANGED: {
      GstState old_state, new_state, pending_state;
      gst_message_parse_state_changed (msg, &old_state, &new_state, &pending_state);
      if (GST_MESSAGE_SRC (msg) == GST_OBJECT (data->playbin)) {
        g_print ("Pipeline state changed from %s to %s:\n",
            gst_element_state_get_name (old_state), gst_element_state_get_name (new_state));

        /* Remember whether we are in the PLAYING state or not */
        data->playing = (new_state == GST_STATE_PLAYING);

        if (data->playing) {
          /* We just moved to PLAYING. Check if seeking is possible */
          GstQuery *query;
          gint64 start, end;
          query = gst_query_new_seeking (GST_FORMAT_TIME);
          if (gst_element_query (data->playbin, query)) {
            gst_query_parse_seeking (query, NULL, &data->seek_enabled, &start, &end);
            if (data->seek_enabled) {
              g_print ("Seeking is ENABLED from %" GST_TIME_FORMAT " to %" GST_TIME_FORMAT "\n",
                  GST_TIME_ARGS (start), GST_TIME_ARGS (end));
            } else {
              g_print ("Seeking is DISABLED for this stream.\n");
            }
          }
          else {
            g_printerr ("Seeking query failed.");
          }
          gst_query_unref (query);
        }
      }
    } break;
    default:
      /* We should not reach here */
      g_printerr ("Unexpected message received.\n");
      break;
  }
  gst_message_unref (msg);
}
```

## Walkthrough

```c
/* Structure to contain all our information, so we can pass it around */
typedef struct _CustomData {
  GstElement *playbin;  /* Our one and only element */
  gboolean playing;      /* Are we in the PLAYING state? */
  gboolean terminate;    /* Should we terminate execution? */
  gboolean seek_enabled; /* Is seeking enabled for this media? */
  gboolean seek_done;    /* Have we performed the seek already? */
  gint64 duration;       /* How long does this media last, in nanoseconds */
} CustomData;

/* Forward definition of the message processing function */
static void handle_message (CustomData *data, GstMessage *msg);
```

먼저 우리가 사용할 정보가 모두 들어있는 구조체를 선언합니다. 그리고 메시지를 처리하는 코드가 너무 커져서 함수로 구분했습니다.  

우리는 `playbin`이라는 단 하나의 요소로 구성된 파이프라인을 만들 것입니다. 튜토리얼 1에서 보았던 그 `playbin`입니다. `playbin`은 그 자체로 파이프라인이고 따라서 파이프라인은 단 하나의 요소로만 구성되어 있습니다. 생략할 수 있는 설명은 생략하겠습니다. `playbin`의 `URI property`에게 URI 정보를 전달하고 `state`는 `playing state`로 설정하겠습니다.  

```c
msg = gst_bus_timed_pop_filtered (bus, 100 * GST_MSECOND,
    GST_MESSAGE_STATE_CHANGED | GST_MESSAGE_ERROR | GST_MESSAGE_EOS | GST_MESSAGE_DURATION);
```

지금까지는 `gst_bus_timed_pop_filtered()`에게 `timeout`을 제공하지 않았습니다. 이것은 메세지를 받기 전까지는 return을 하지 않는다는 것을 의미했습니다. 이제 우리는 100ms의 `timeout`을 설정합니다. 그래서 만약에 $1/10$초동안 메시지를 받지 않으면 이 함수는 `NULL`을 return 할 것입니다. 우리는 우리의 `UI`를 업데이트하기 위해서 사용할 것입니다.  

사용될 `timeout`의 크기는 `GstClockTime`으로 명시되어야 합니다. nanoseconds 단위로요. nanoseconds 단위로 표시 되기 때문에, 서로 다른 시간 unit을 표현하는 숫자들은 `GST_SECOND`나 `GST_MSECOND`가 곱해져야 합니다. 읽기 쉽도록 하기 위해서요. basic-tutorials-4.c에서는 $100 곱하기 GST_MSECOND$와 같이 사용했습니다.  

만약 우리가 메시지를 받으면 우리는 `handle_message()` function을 실행합니다.  
## User Interface refreshing

```c
/* We got no message, this means the timeout expired */
if (data.playing) {
```

만약에 파이프라인이 `PLAYING` state에 있다면 이제 screen을 refresh 해야할 시간입니다. 우리는 `PLAYING` 시간이 아닐 때는 아무것도 하지 않습니다. 왜냐하면 대부분의 쿼리가 실패할 것이기 때문입니다.  

우리는 여기에 대략 1초에 10번정도로 UI를 update 하도록 했습니다. 우리는 현재 media의 `position`을 0.1초 단위로 표시할 것입니다. 이 `position`은 파이프라인에게 `query`를 날림으로서 알 수 있습니다. 쿼리를 날리는 과정은 작은 세부 과정으로 나뉘어서 설명될 수도 있긴한데, `position`과 `duration`은 매우 평범한 쿼리이기 때문에 `GstElement`는 조금 더 쉽고 이해하기 쉬운 대안을 제공합니다.  

```c
/* Query the current position of the stream */
if (!gst_element_query_position (data.pipeline, GST_FORMAT_TIME, &current)) {
  g_printerr ("Could not query current position.\n");
}
```
`gst_element_query_position()`는 우리에게 쿼리를 management하는 과정을 숨기고 바로 결과만 가져와줍니다.  

```c
/* If we didn't know it yet, query the stream duration */
if (!GST_CLOCK_TIME_IS_VALID (data.duration)) {
  if (!gst_element_query_duration (data.pipeline, GST_FORMAT_TIME, &data.duration)) {
     g_printerr ("Could not query current duration.\n");
  }
}
```
마찬가지로 `gst_element_query_duration()`를 사용하면 stream의 length를 알 수 있습니다.  

```c
/* Print current position and total duration */
g_print ("Position %" GST_TIME_FORMAT " / %" GST_TIME_FORMAT "\r",
    GST_TIME_ARGS (current), GST_TIME_ARGS (data.duration));
```

`GST_TIME_FORMAT` and `GST_TIME_ARGS` 를 사용하는 방법을 주의해서 봐주세요. `MACRO`라고 생각하고 이해하면 됩니다.  

```c
/* If seeking is enabled, we have not done it yet, and the time is right, seek */
if (data.seek_enabled && !data.seek_done && current > 10 * GST_SECOND) {
  g_print ("\nReached 10s, performing seek...\n");
  gst_element_seek_simple (data.pipeline, GST_FORMAT_TIME,
      GST_SEEK_FLAG_FLUSH | GST_SEEK_FLAG_KEY_UNIT, 30 * GST_SECOND);
  data.seek_done = TRUE;
}
```

이제 우리는 `seek`를 수행하는데 단순히 `gst_element_seek_simple()`를 call하는 것으로 충분합니다. 많은 intricacies복잡함들이 숨겨져있어서 좋습니다.  
파라미터를 review 해보겠습니다.  
- `GST_FORMAT_TIME`는 우리가 `time unit`에서 destination을 명시하고 있음을 나타냄니다. 다른 seek-format에서는 다른 유닛을 사용합니다. 비디오 데이터에서 특정 위치부터 보고 싶은 때 클릭하는 것을 `seek`로 생각할 수 있고, 보통은 시간을 기준으로 선택합니다. 하지만 때에 따라서는 몇 번 빼 byte를 볼 지도 선택할 수 있습니다. 
- 이제 `GstSeekFlags`에 대한 설명입니다.
  - `GST_SEEK_FLAG_FLUSH` : 이것은 seek를 수행하기 전에 파이프라인에 있는 모든 데이터를 버립니다. 파이프라인이 다시 채워지는 동안에 약간의 멈춤 뒤에 새로운 데이터는 나타나기 시작합니다. 하지만 application에서 `responsiveness민감도`를 매우 증가시켜줍니다. 만약  FLAG가 제공되지 않았다면 새로운 position이 파이프라인의 끝에 나타날 때까지 `stale신선하지 않은` 데이터가 나타날 것입니다. 
  - `GST_SEEK_FLAG_KEY_UNIT` : encoded된 대부분의 video stream에 대해서 임의의 position을 찾는 것은 불가능한데 `KEY FRAME`이라는 특정한 frame에서는 가능합니다. 이 flag가 사용되고 있을 때 그 때의 Seek는 가장 가까운 `KEY FRAME`으로 이동할 것입니다. 그리고 데이터를 즉시 생산할 것입니다. 만약 flag가 사용되고 있지 않는다면 내부적으로 정의되어 있는 가장 가까운 `KEY FRAME`으로 이동할 것입니다. 다른 대안이 없으니까요. 하지만 데이터는 즉시 생성되는 것이 아니라 요청된 부분까지 도달을 했을 떄 생성되기를 시작할 것입니다. 이 경우가 가장 정확하게 사용자가 요청한 position을 보여줄 수 있기는 하지만 시간이 오래걸립니다.  
    - 위 부분은 아마 동영상을 스트리밍으로 시청할 때 특정 position부터 동영상을 보고 싶어서 클릭을 했을 때는 말하는 것 같습니다. 클릭한 부분까지 데이터 로딩이 다 되어야 실행히 되는 경우가 있는 반면에 중간 부분의 데이터를 로딩하지 않고 클릭한 부분부터 바로 영상을 보여주는 경우를 말하는 것 같습니다. 사용자 경험에서는 물론 `KET FRAME`을 설정하는 것이 좋겠네요. 반대로 공급자의 입장에서 동여상을 끌어보는 것이 싫다면 가장 기본적인 `KEY FRAME`을 사용자가 마지막으로 시청한 지점으로 설정하는 등의 방법으로 막을 수 있을 것 같습니다.  
  - `GST_SEEK_FLAG_ACCURATE` : 몇몇의 미디어 클립은 충분한 indexing 정보를 제공하지 않습니다. 특정 위치로의 이동을 지원하는 것이 시간을 너무 잡아먹어서 비효율적인 경우를 말합니다. 이러한 경우에 `Gstreamer`는 indexing을 사용하는 것이 아니라 적당한 위치로 이동해서 데이터를 보여주고 꽤 괜찮게 작동합니다. 이렇게 적당한 위치로 이동하는 것이 만약 개발하고있는 application에 적합하지 않으면 FLAG를 설정해주면 됩니다. 하지만 FLAG를 설정했을 때 어쩔 수 없이 계산하는 시간이 걸려서 느릴 수 있는 것을 알아야 합니다.  

## Message Pump

`handle_message()`는 파이프라인의 버스로부터 받는 모든 메시지를 처리합니다. `ERROR`나 `EOS`를 다루는 방법은 이전 튜토리얼에서 설명한 것과 같기때문에 생략하겠습니다. 다음 설명은 handle_message()의 내부에 있는 코드에 대한 것입니다.  

```c
case GST_MESSAGE_DURATION:
  /* The duration has changed, mark the current one as invalid */
  data->duration = GST_CLOCK_TIME_NONE;
  break;
```

이 메시지는 해당 stream의 `duration`이 변경 되었을 때마다 bus에 post 됩니다. 위 코드에서 우리는 단순하게 current `duration`을 invalid 했기 떄문에 이 메시지는 나중에 다시 query 됩니다.  

```c
case GST_MESSAGE_STATE_CHANGED: {
  GstState old_state, new_state, pending_state;
  gst_message_parse_state_changed (msg, &old_state, &new_state, &pending_state);
  if (GST_MESSAGE_SRC (msg) == GST_OBJECT (data->pipeline)) {
    g_print ("Pipeline state changed from %s to %s:\n",
        gst_element_state_get_name (old_state), gst_element_state_get_name (new_state));

    /* Remember whether we are in the PLAYING state or not */
    data->playing = (new_state == GST_STATE_PLAYING);
```

`Seek`와 `time` query는 일반적으로 `PAUSED` 상태나 `PLAYING` 상태 일 때만 valid reply를 얻습니다. 왜냐하면 위 두 가지 경우에만 모든 요소들이 정보를 받고 스스로 configure할 수 있기 때문입니다. 위 코드에서 우리는 `playing` 변수(data->playing)를 사용하였는데 파이프라인이 `PLAYING`상태인 것을 확인하기 위함입니다. 또한 만약 우리가 `PLAYING` 상태에 들어간다면 우리는 첫 번째 `query`를 수행합니다. 그리고 파이프라인에게 `seeking`이 stream에서 허락되는지 물어봅니다.  

```c
if (data->playing) {
  /* We just moved to PLAYING. Check if seeking is possible */
  GstQuery *query;
  gint64 start, end;
  query = gst_query_new_seeking (GST_FORMAT_TIME);
  if (gst_element_query (data->pipeline, query)) {
    gst_query_parse_seeking (query, NULL, &data->seek_enabled, &start, &end);
    if (data->seek_enabled) {
      g_print ("Seeking is ENABLED from %" GST_TIME_FORMAT " to %" GST_TIME_FORMAT "\n",
          GST_TIME_ARGS (start), GST_TIME_ARGS (end));
    } else {
      g_print ("Seeking is DISABLED for this stream.\n");
    }
  }
  else {
    g_printerr ("Seeking query failed.");
  }
  gst_query_unref (query);
}
```
`gst_query_new_seeking()`는 `seeking` 타입의 새로운 query object를 `GST_FORMAT_TIME` format으로 생성합니다. 이것은 우리가 이동하고 싶은 새로운 시간을 명시하면서 `seek`를 진행하고 싶다는 것을 의미합니다. `GST_FORMAT_TIME`이 아니라 `GST_FORMAT_BYTES`를 사용해서 source file의 특정 byte position으로 이동할 수 있지만 이것은 별로 유용하지 않습니다.  

`query object`는 `gst_element_query()`를 사용해서 파이프라인 안으로 통과됩니다. 이 함수의 결과는 전달된 `query object` 안에 저장되고 `gst_query_parse_seeking()`를 통해서 다시 retrieved 될 수 있습니다. 결과적으로 seeking이 허락되는지 아닌지에 대한 boolean type의 값을 얻습니다.  

전체적인 흐름은
1. 특정 시간으로 이동하고 싶음을 나타내는 쿼리 객체르 만들고
2. 파이프라인에 쿼리 객체를 전달하고 쿼리가 가능한지에 대한 정보를 전달된 객체에 저장한다.
3. 이 객체에 저장된 결과 정보를 다시 꺼내서 g_print를 출력한다.
4. 쿼리가 내부적으로 어떻게 실행되는지, 실제적으로 data가 출력되는 position이 움직여지는지 여부는 아직 잘 모르겠습니다.  
5. 마지막으로 쿼리 객체르 free합니다. 

## 결론

본 포스팅에서는 아래의 내용들을 학습했습니다.  

- `GstQuery`를 사용해서 파이프라인에 정보를 쿼리하는 방법
- `gst_element_query_position()` 와 `gst_element_query_duration()`를 사용해서 일반적인 정보를 얻는 방법
- `gst_element_seek_simple()`를 사용해서 임의의 위치를 찾는 방법
- 어떤 상태에서 이러한 과정들이 실행될 수 있는지

























