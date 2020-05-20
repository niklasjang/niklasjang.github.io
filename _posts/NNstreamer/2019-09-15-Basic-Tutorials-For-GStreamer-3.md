---
title: "[NNStreamer] Gstreamer 기본 튜토리얼 3"
excerpt: "Dynamic pipeline 만들어보기 "
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

본 포스팅은 [여기](https://gstreamer.freedesktop.org/documentation/tutorials/basic/dynamic-pipelines.html?gi-language=c)를 참조합니다.  

## 목표

파이프 라인을 즉석에서(on the fly) building 하는 방법에 대해서 알아봅니다.  

## Introduction

파이프라인은 playing state가 되기 전에는 완벽하게 build된 상태가 아닙니다. 만약 playing state로 설정하지 않으면 데이터는 pipeline의 end에 도달해서 error msg를 띄우고 멈출 것입니다.  

이 예제에서 우리는 container file에서 오디오와 비디오가 함께 저장된(multiplxed, muxed)된 파일을 열어보려고 합니다. 이러한 muxer를 여는 책임이 있는 요소를 demuxer라고 부릅니다. 그리고 muxer는  Matroska (MKV), Quick Time (QT, MOV), Ogg, or Advanced Systems Format (ASF, WMV, WMA)와 같은 형태를 가집니다.  

예를 들어서 컨테이너가 multiple streams를 embed하고 있다면(예를 들어서 하나의 비디오와 두 개의 오디오), demuxer는 이들을 분리하고 각각을 서로 다른 output ports로 노출시킬 것입니다. 이러는 과정에서 다른 branch들이 pipeline 안에서 서로 다른 타입의 데이터를 다루면서 생성될 수 있습니다.(아래 그림 참고)  

GStreamer 요소들이 서로 커뮤티케이션을 하는데 사용되는 port를 pads(GstPad)라고 부릅니다. 데이터가 요소로 들어가는데 필요한 sink pads와 데이터가 요소를 나오는데 필요한 source pads가 있습니다.  

![nnstreamer-8](/assets/images/nnstreamer/nnstreamer-8.jpg)  

하나의 demuxer는 muxed된 데이터가 들어오는 sink pad와 컨테이너에서 찾아진 stream 각각을 위한 src pads를 가지고 있습니다. 

![nnstreamer-9](/assets/images/nnstreamer/nnstreamer-9.jpg)  

아래 그림은 예시가 되는 pipeline에 대한 그림이 있습니다. 하지만 아래의 그림은 예시일 뿐 본 튜토리얼에서 사용되는 pipeline에 대한 그림이 아닙니다.  

![nnstreamer-10](/assets/images/nnstreamer/nnstreamer-10.jpg)  

영상을 볼 때 오디오/비디오의 싱크가 맞지 않는다는 말에서 sink가 sink pads를 의미하는 것으로 생각됩니다.  


demuxer를 다루는 복잡함은 demuxer가 데이터를 받아서 container 안에 무엇이 들어있는지 보기 전에는 어떤 정보로 생산할 수 없다는 점에서 옵니다. demuxer는 반드시 src pads로 시작하지 않기 때문에, sink pads로만 시작하기 때문에, demuxer의 src pads에서 출력되는 데이터들을 반드시 terminate 시킬 필요가 있습니다.  

이러한 문제를 해결하는 방법은 pipeline을 source에서 demuxer로 build하는 것입니다. 만약 demuxer가 충분한 정보를 받아서 어떤 종류 그리고 얼마나 많은 streams가 있는지 알게 되었을 때 demuxer는 source pads를 생성합니다. 이 순간이 바로 우리가 pipeline build를 마치는 순간이고 pipeline을 새롭게 생성된 demuxer의 src pads에 붙혀야하는 순간입니다. 이러한 특성 때문에 Dynamic pipeline이라고 부르는 것입니다.  

본 예제에서는 간단하게 만들기 위해서 비디오는 생각하고 audio만 link해보겠습니다.  

## Dynamic Hello World

```c
//basic-tutorial-3.c
#include <gst/gst.h>

/* Structure to contain all our information, so we can pass it to callbacks */
typedef struct _CustomData {
  GstElement *pipeline;
  GstElement *source;
  GstElement *convert;
  GstElement *sink;
} CustomData;

/* Handler for the pad-added signal */
static void pad_added_handler (GstElement *src, GstPad *pad, CustomData *data);

int main(int argc, char *argv[]) {
  CustomData data;
  GstBus *bus;
  GstMessage *msg;
  GstStateChangeReturn ret;
  gboolean terminate = FALSE;

  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  /* Create the elements */
  data.source = gst_element_factory_make ("uridecodebin", "source");
  data.convert = gst_element_factory_make ("audioconvert", "convert");
  data.sink = gst_element_factory_make ("autoaudiosink", "sink");

  /* Create the empty pipeline */
  data.pipeline = gst_pipeline_new ("test-pipeline");

  if (!data.pipeline || !data.source || !data.convert || !data.sink) {
    g_printerr ("Not all elements could be created.\n");
    return -1;
  }

  /* Build the pipeline. Note that we are NOT linking the source at this
   * point. We will do it later. */
  gst_bin_add_many (GST_BIN (data.pipeline), data.source, data.convert , data.sink, NULL);
  if (!gst_element_link (data.convert, data.sink)) {
    g_printerr ("Elements could not be linked.\n");
    gst_object_unref (data.pipeline);
    return -1;
  }

  /* Set the URI to play */
  g_object_set (data.source, "uri", "https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm", NULL);

  /* Connect to the pad-added signal */
  g_signal_connect (data.source, "pad-added", G_CALLBACK (pad_added_handler), &data);

  /* Start playing */
  ret = gst_element_set_state (data.pipeline, GST_STATE_PLAYING);
  if (ret == GST_STATE_CHANGE_FAILURE) {
    g_printerr ("Unable to set the pipeline to the playing state.\n");
    gst_object_unref (data.pipeline);
    return -1;
  }

  /* Listen to the bus */
  bus = gst_element_get_bus (data.pipeline);
  do {
    msg = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,
        GST_MESSAGE_STATE_CHANGED | GST_MESSAGE_ERROR | GST_MESSAGE_EOS);

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
          terminate = TRUE;
          break;
        case GST_MESSAGE_EOS:
          g_print ("End-Of-Stream reached.\n");
          terminate = TRUE;
          break;
        case GST_MESSAGE_STATE_CHANGED:
          /* We are only interested in state-changed messages from the pipeline */
          if (GST_MESSAGE_SRC (msg) == GST_OBJECT (data.pipeline)) {
            GstState old_state, new_state, pending_state;
            gst_message_parse_state_changed (msg, &old_state, &new_state, &pending_state);
            g_print ("Pipeline state changed from %s to %s:\n",
                gst_element_state_get_name (old_state), gst_element_state_get_name (new_state));
          }
          break;
        default:
          /* We should not reach here */
          g_printerr ("Unexpected message received.\n");
          break;
      }
      gst_message_unref (msg);
    }
  } while (!terminate);

  /* Free resources */
  gst_object_unref (bus);
  gst_element_set_state (data.pipeline, GST_STATE_NULL);
  gst_object_unref (data.pipeline);
  return 0;
}

/* This function will be called by the pad-added signal */
static void pad_added_handler (GstElement *src, GstPad *new_pad, CustomData *data) {
  GstPad *sink_pad = gst_element_get_static_pad (data->convert, "sink");
  GstPadLinkReturn ret;
  GstCaps *new_pad_caps = NULL;
  GstStructure *new_pad_struct = NULL;
  const gchar *new_pad_type = NULL;

  g_print ("Received new pad '%s' from '%s':\n", GST_PAD_NAME (new_pad), GST_ELEMENT_NAME (src));

  /* If our converter is already linked, we have nothing to do here */
  if (gst_pad_is_linked (sink_pad)) {
    g_print ("We are already linked. Ignoring.\n");
    goto exit;
  }

  /* Check the new pad's type */
  new_pad_caps = gst_pad_get_current_caps (new_pad);
  new_pad_struct = gst_caps_get_structure (new_pad_caps, 0);
  new_pad_type = gst_structure_get_name (new_pad_struct);
  if (!g_str_has_prefix (new_pad_type, "audio/x-raw")) {
    g_print ("It has type '%s' which is not raw audio. Ignoring.\n", new_pad_type);
    goto exit;
  }

  /* Attempt the link */
  ret = gst_pad_link (new_pad, sink_pad);
  if (GST_PAD_LINK_FAILED (ret)) {
    g_print ("Type is '%s' but link failed.\n", new_pad_type);
  } else {
    g_print ("Link succeeded (type '%s').\n", new_pad_type);
  }

exit:
  /* Unreference the new pad's caps, if we got them */
  if (new_pad_caps != NULL)
    gst_caps_unref (new_pad_caps);

  /* Unreference the sink pad */
  gst_object_unref (sink_pad);
}

```
## Walkthrough

```c
/* Structure to contain all our information, so we can pass it to callbacks */
typedef struct _CustomData {
  GstElement *pipeline;
  GstElement *source;
  GstElement *convert;
  GstElement *sink;
} CustomData;
```

지금까지는 우리가 필요한 모든 정보들을 지역 변수로 처리했는데 여기서는 callback 함수가 사용되기 때문에 구조체를 만들어서 다루도록 하겠습니다. 
 
```c
/* Handler for the pad-added signal */
static void pad_added_handler (GstElement *src, GstPad *pad, CustomData *data);
```
pad_added_handler()가 나중에 사용될 것임을 명시해주고 있습니다. 

```c
/* Create the elements */
data.source = gst_element_factory_make ("uridecodebin", "source");
data.convert = gst_element_factory_make ("audioconvert", "convert");
data.sink = gst_element_factory_make ("autoaudiosink", "sink");
```
각각의 요소들을 생성합니다.  

`uridecodebin`는 내부적으로 필요한 모든 요소들(sources, demuxers and decoders)을 instantiate합니다. 이는 URI를 raw audio와 raw video stream으로 전환시키기 위해서 필요합니다. 전전 포스팅에서 playbin을 다음과 같이 설명했었습니다.
  - playbin은 source 처럼 그리고 sink 처럼 행동하는 특별한 요소입니다. 그리고 이것은 완전한 pipeline입니다. 내부적으로 이것은 media를 실행하는데 필요한 모든  요소들을 생성하고 연결합니다.  

따라서 uridecodebin는 온전한 기능을 하는 playbin과 비교했을 때 절반의 역할을 해주는 것으로 생각할 수 있습니다. 왜냐하면 uridecodebin는 demuxer를 포함하기 때문에 이것의 source pads는 처음에는 사용될 수 없습니다. 대신에 나중에 즉석에서 link가 되어야 합니다.  

`audioconvert`은 서로 다른 format의 video type을 converting 하는데 도움을 줍니다. 즉 이 예제가 어떤 플랫폼에서도 동작하도록 도와줍니다. 플랫폼에 따라서 최종적으로 sound data가 출력되는 부분의 sink pads(데이터가 들어오는 부분)가 기대하는 포멧으로 audio decoder가 데이터를 생산해주기 때문입니다.  

`autoaudiosink`는 이전 튜토리얼에서 사용했던 autovideosink와 똑같다고 보면 됩니다. 단지 audio를 위한 것 뿐입니다. 이것이 audio card를 위해서 audio stream을 생산해줄 것입니다.  

첫 번째 그림에서 source element / filter / sink element 3개의 사각형 그림에서 filte라는 것이 있습니다. data.source = gst_element_factory_make ("uridecodebin", "source"); 명령어로 source라는 이름의 GstElement를 만들 때 같이 만들어지는 demuxer는 muxed된 파일 속에서 stream들을 구분한다고 했습니다. 이렇게 구분된 stream들 중 필요한 stream만 가져와서 source pads로 출력을 한다고 생각하면 됩니다. 결과적으로는 source element와 convert element가 link될 것이기 때문에 source element의 내부에 있는 demuxer와 convert element가 어떻게 통신하는지는 아직 몰라도 된다고 생각합니다.  

```c
if (!gst_element_link (data.convert, data.sink)) {
  g_printerr ("Elements could not be linked.\n");
  gst_object_unref (data.pipeline);
  return -1;
}
```
여기에서 우리는 converter 요소와 sink 요소를 link 합니다. 강조하지만 우리는 아직 source 요소와 converter 요소의 link를 진행하지 않습니다. 왜냐하면 이 시점에서는 converter element가 아직 source pad를 포함하고 있지 않기 때문입니다. converter element의 source pad가 생성되는 시점은 충분한 info 가 demuxer에게 전달된 시점이라고 설명했었습니다.  

converter와 demuxer의 개념이 흔들리므로 정리해보겠습니다. demuxer는 uridecodebin가 내부적으로 필요한 요소들을 만들 때 같이 생성되는 객체입니다. muxed 된 file에서 각 stream들을 분리해주는 역할을 합니다. converter는 우리가 명시적으로 생성한 요소로서 demuxer에 충분한 info가 전달되면 이를 바탕으로 몇 개의 sourcd pads를 만들어야 하는지 판단해서 만드는 주체입니다.   

또한 source와 source pads 그리고 sink와 sink pads의 개념도 헷갈리니 정리해보겠습니다. 저희가 코드에서 명시적으로 선언한 source와 sink는 GstElement 객체입니다. 그리고 source pads와 sink pads는 각각의 GstElement 객체에 포함되는 `포트`를 의미합니다.  
```c
/* Set the URI to play */
g_object_set (data.source, "uri", "https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm", NULL);

```
우리는 여기에서 파일의 URI를 property를 통해서 설정합니다. gobject에 대해서는 전 포스팅에서 다음과 같이 설명했었습니다.
  - 모든 GST의 요소들은 a particular kind of `GObject`입니다. GObject는 property facilities를 제공하는 entity입니다. gobject를 통해서 property들을 set/get할 수 있습니다.

## Signals

```c
/* Connect to the pad-added signal */
g_signal_connect (data.source, "pad-added", G_CALLBACK (pad_added_handler), &data);
```

GSignal을 GSTreamer의 중요한 포인트 입니다. 이들은 콜백을 사용해서 흥미로운 것이 일어났을 때 알려주는 역할을 합니다. Signal들은 name으로 구분되고 각각의 GObject 들은 각자의 Signal을 가지고 있습니다.  

위 코드에서 우리는 pad-added라는 이름의 signal을 source에게 붙힙니다. 이를 위해서 g_signal_connect를 사용하며 G_CALLBACK을 인자로 전달합니다. GStreamer는 전달되는 data의 포인터에 아무런 것도 하지 않습니다. 이것은 그저 데이터 안에 들어있는 정보를 콜백과 공유하기 위해서 전달한 것뿐입니다. (필요하면 정보를 변경할 수 있는 것으로 생각됩니다.) 어떤 signal이 생성되는지는 튜토리얼 10에서 다룹니다.  

## The callback

우리의 source 요소가 충분한 정보를 받고 드디어 데이터를 생산할 수 있는 때가 되었을 때 source pads를 생산하고 pad-added signal을 trigger할 것입니다. 바로 이 시점이 우리의 callback이 실행되는 순간입니다.  

convert와 sink 요소를 link 하는 것이 data flow의 방향을 따라서 진행되었던 것을 생각하면 source element에 일정한 정보가 들어가는 것은 sink pads가 아닌 아직 모르는 형태로 전달이 되고, 이후에 source 요소의 source pads로부터 데이터가 시작된다고 생각할 수 있습니다. 

```c
static void pad_added_handler (GstElement *src, GstPad *new_pad, CustomData *data) {
```

- src는 signal을 tirgger하는 GstElement입니다. 이 예제에서 src는 오직 uridecodebin만이 될 수 있습니다. 왜냐하면 이 신호만이 우리가 유일하게 부착한 signal이기 때문입니다. g_signal_connect를 할 떄 첫 번째 인자로 data.source를 전달했던 것을 기억하면 받아들일 수 있습니다. 콜백함수를 만들어보지는 않았지만 data.source가 GstElement pointer 타입임을 생각하면 이 부분을 이해하는데 어렵지 않을 것입니다. 
- new_pad는 src에 방금 부착된 새로운 pad입니다. 이것은 보통 우리가 link 하기를 원하는 pad입니다. 
- data는 우리가 signal에 부착할 때 제공한 포인터입니다. 이 예제에서는 CustomData Pointer 입니다.

```c
GstPad *sink_pad = gst_element_get_static_pad (data->convert, "sink");
```

data->convert는 CustomData 포인터 형인 data가 가리키는 대상의 property인 convert입니다. 즉 우리는 data로부터 convert(element)를 retrieve하고 gst_element_get_static_pad를 사용해서 이것(convert element)의 sink pad를 retrieve 합니다. 이 pad가 우리가 new_pad를 link하고 싶은 pad입니다. 이전 튜토리얼에서 우리는 요소와 요소를 연결했을 뿐입니다. 그리고 GStreamer가 알아서 적절한 pad를 고르도록 했습니다.(gst_element_link (source, filter) 이제 우리가 직접 pads들을 link해보겠습니다. 

```c
/* If our converter is already linked, we have nothing to do here */
if (gst_pad_is_linked (sink_pad)) {
  g_print ("We are already linked. Ignoring.\n");
  goto exit;
}
```

**uridecodebin는 자기가 볼 때 괜찮은 pads들을 생성할 것이고 그 때마다 이 콜백이 실행될 것입니다.** 이 라인은 new_pad를 이미 link된 pad와 link하는 것을 막는 역할을 합니다. 콜백을 붙히는 g_signal_connect에서는 첫 번 째인자로 data.source를 전달했고 gst_element_get_static_pad()의 첫 번째 인자는 data.convert임을 명심합니다. 그리고 pad_added_handler()의 두 번째 인자는 source element의 new-source-pad를 의미합니다.  

```c
/* Check the new pad's type */
new_pad_caps = gst_pad_get_current_caps (new_pad, NULL);
new_pad_struct = gst_caps_get_structure (new_pad_caps, 0);
new_pad_type = gst_structure_get_name (new_pad_struct);
if (!g_str_has_prefix (new_pad_type, "audio/x-raw")) {
  g_print ("It has type '%s' which is not raw audio. Ignoring.\n", new_pad_type);
  goto exit;
}
```

우리는 audio를 생성하는 pads에만 관심이 있기 때문에 new_pad가 출력하는 데이터의 타입을 확인할 것입니다. 우리는 이전에 audio를 다루는 파이프라인을 만들었습니다. (gst_element_link (data.convert, data.sink) 이 파이프라인은 audio에 관한 것이므로 video에 link 될 수 없습니다.  

gst_pad_get_current_caps()는 전달되는 pad의 current capabilities(이하 caps)를 retrieve 합니다. 그리고 이것은 GstCaps의 타입으로 캐스팅되어 검색됩니다. new_pad가 지원할 수 있는 모든 가능한 caps들은 quried 됩니다. 하나의 pad는 많은 cap들을 제공할 수 있기 때문에 Gstcaps는 많은 GstStructure를 포함할 수 있습니다. 각각의 GstStructure는 서로 다른 cap를 나타냅니다. (new_pad는 file data가 충분히 들어왔을 때 어떤 stream들을 구성할 수 있는지 파악한다고 했습니다. 여기서 capabilities들이란 어떤 stream들을 구성할 수 있는지에 대한 구조를 GstStructure의 타입으로 제공한다는 의미인 것 같습니다.) 현재의 pad에 대한 cap들은 항상 하나의 GstStructure를 가지고 있고 이는 a single media format을 의미합니다. 만약 어떤 caps도 가능하지 않다면 null을 return 합니다.  

이 예제에서 우리는 우리가 원하는 pad(new_pad)가 하나의 capability를 가지고 있는 것을 알고 있습니다. 따라서 우리는 첫 번째 GstStructure를 gst_caps_get_structure()를 사용해서 검색합니다.  

마지막으로 gst_structure_get_name()를 사용해서 우리는 structure의 이름을 회복합니다. 이 이름은 format의 main description을 포함합니다. (its media type, actually)  

만약 이 이름이 `audio/x-rax`가 아니라면, decoded된 audio pad가 아니라면 관심이 없는 것입니다. 

```c
/* Attempt the link */
ret = gst_pad_link (new_pad, sink_pad);
if (GST_PAD_LINK_FAILED (ret)) {
  g_print ("Type is '%s' but link failed.\n", new_pad_type);
} else {
  g_print ("Link succeeded (type '%s').\n", new_pad_type);
}
```

link를 시도합니다. gst_pad_link()는 두 개의 pads를 link하려고 시도합니다. gst_element_link()에서 그랬던 것처럼 source에서 sink로 명시되어서 link 되어야 합니다. 그리고 역시 이들 요소들은 같은 bin(or pipeline)에 상주residing하고 있어야 합니다.  

이제 끝났습니다. 만약 적절한 종류의 pad가 나타나면 나머지의 audio-processing pipeline에 link될 것이고 Error나 EOS까지 실행이 될 것입니다. 하지만 본 포스팅에서는 state의 종류까지 알아보기까지 해보겠습니다.  

## Gstreamer States

지금까지 우리는 pipeline이 `PLAYING` state가 되기 전에는 실행되지 않는다고 말했었습니다. 여기에 다른 4가지의 상태가 있습니다.

- NULL :	the NULL state or initial state of an element.
- READY : the element is ready to go to PAUSED.
- PAUSED : the element is PAUSED, it is ready to accept and process data. Sink elements however only accept one buffer and then block.
- PLAYING : the element is PLAYING, the clock is running and the data is flowing.

여기에 적혀있는 순서가 중요합니다. 인접한 상태로만 변경이 될 수 있습니다. NULL에서 PLAYING으로 바로 변경될 수 없는 것을 말합니다. 반드시 READY와 PAUSED 상태를 지나서 변경되어야 합니다. 만약 PLAYING 상태로 바꾸면 Gstreamer가 알아서 중간 단계를 거쳐서 변경해줍니다.  

```c
case GST_MESSAGE_STATE_CHANGED:
  /* We are only interested in state-changed messages from the pipeline */
  if (GST_MESSAGE_SRC (msg) == GST_OBJECT (data.pipeline)) {
    GstState old_state, new_state, pending_state;
    gst_message_parse_state_changed (msg, &old_state, &new_state, &pending_state);
    g_print ("Pipeline state changed from %s to %s:\n",
        gst_element_state_get_name (old_state), gst_element_state_get_name (new_state));
  }
  break;
```

우리는 메시지 상태가 변하는 것을 알아차리기 위해서 코드를 조금 추가했습니다. 그리고 이 메시지를 화면으로 출력해줍니다. 모든 요소들은 각자의 현재 상태에 대한 정보를 bus에 전달합니다. 그래서 우리는 pipeline에서 보고 싶은 요소들만 필터링해서 볼 수도 있습니다.  

## Exercise 

Dynamic pad linking has traditionally been a difficult topic for a lot of programmers. Prove that you have achieved its mastery by instantiating an autovideosink (probably with an videoconvert in front) and link it to the demuxer when the right pad appears. Hint: You are already printing on screen the type of the video pads.

먼저 기본 예제를 실행하면 다음과 같은 결과를 볼 수 있습니다. 

```bash
Pipeline state changed from NULL to READY:
Received new pad 'src_0' from 'source':
It has type 'video/x-raw' which is not raw audio. Ignoring.
Received new pad 'src_1' from 'source':
Link succeeded (type 'audio/x-raw').
Pipeline state changed from READY to PAUSED:
Pipeline state changed from PAUSED to PLAYING:
^C
```
src_0에서는 적절한 타입을 찾지 못해서 무시되고 src_1에서는 적절한 타입의 cap을 찾아서 link를 진행하고 노래 같은 소리가 나오기까지 합니다. 그럼 연습 문제를 풀어보겠습니다.  


```c
#include <gst/gst.h>

/* Structure to contain all our information, so we can pass it to callbacks */
typedef struct _CustomData
{
  GstElement *pipeline;
  GstElement *source;
  GstElement *convert;
  GstElement *sink;
} CustomData;

/* Handler for the pad-added signal */
static void pad_added_handler (GstElement * src, GstPad * pad,
    CustomData * data);

int
main (int argc, char *argv[])
{
  CustomData data;
  GstBus *bus;
  GstMessage *msg;
  GstStateChangeReturn ret;
  gboolean terminate = FALSE;

  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  /* Create the elements */
  data.source = gst_element_factory_make ("uridecodebin", "source");
  data.convert = gst_element_factory_make ("videoconvert", "convert");
  //data.sink = gst_element_factory_make ("autoaudiosink", "sink");
  data.sink = gst_element_factory_make ("autovideosink", "sink");

  /* Create the empty pipeline */
  data.pipeline = gst_pipeline_new ("test-pipeline");

  if (!data.pipeline || !data.source || !data.convert || !data.sink) {
    g_printerr ("Not all elements could be created.\n");
    return -1;
  }

  /* Build the pipeline. Note that we are NOT linking the source at this
   * point. We will do it later. */
  gst_bin_add_many (GST_BIN (data.pipeline), data.source, data.convert,
      data.sink, NULL);
  if (!gst_element_link (data.convert, data.sink)) {
    g_printerr ("Elements could not be linked.\n");
    gst_object_unref (data.pipeline);
    return -1;
  }

  /* Set the URI to play */
  g_object_set (data.source, "uri",
      "https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm",
      NULL);

  /* Connect to the pad-added signal */
  g_signal_connect (data.source, "pad-added", G_CALLBACK (pad_added_handler),
      &data);

  /* Start playing */
  ret = gst_element_set_state (data.pipeline, GST_STATE_PLAYING);
  if (ret == GST_STATE_CHANGE_FAILURE) {
    g_printerr ("Unable to set the pipeline to the playing state.\n");
    gst_object_unref (data.pipeline);
    return -1;
  }

  /* Listen to the bus */
  bus = gst_element_get_bus (data.pipeline);
  do {
    msg = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,
        GST_MESSAGE_STATE_CHANGED | GST_MESSAGE_ERROR | GST_MESSAGE_EOS);

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
          terminate = TRUE;
          break;
        case GST_MESSAGE_EOS:
          g_print ("End-Of-Stream reached.\n");
          terminate = TRUE;
          break;
        case GST_MESSAGE_STATE_CHANGED:
          /* We are only interested in state-changed messages from the pipeline */
          if (GST_MESSAGE_SRC (msg) == GST_OBJECT (data.pipeline)) {
            GstState old_state, new_state, pending_state;
            gst_message_parse_state_changed (msg, &old_state, &new_state,
                &pending_state);
            g_print ("Pipeline state changed from %s to %s:\n",
                gst_element_state_get_name (old_state),
                gst_element_state_get_name (new_state));
          }
          break;
        default:
          /* We should not reach here */
          g_printerr ("Unexpected message received.\n");
          break;
      }
      gst_message_unref (msg);
    }
  } while (!terminate);

  /* Free resources */
  gst_object_unref (bus);
  gst_element_set_state (data.pipeline, GST_STATE_NULL);
  gst_object_unref (data.pipeline);
  return 0;
}

/* This function will be called by the pad-added signal */
static void
pad_added_handler (GstElement * src, GstPad * new_pad, CustomData * data)
{
  GstPad *sink_pad = gst_element_get_static_pad (data->convert, "sink");
  GstPadLinkReturn ret;
  GstCaps *new_pad_caps = NULL;
  GstStructure *new_pad_struct = NULL;
  const gchar *new_pad_type = NULL;

  g_print ("Received new pad '%s' from '%s':\n", GST_PAD_NAME (new_pad),
      GST_ELEMENT_NAME (src));

  /* If our converter is already linked, we have nothing to do here */
  if (gst_pad_is_linked (sink_pad)) {
    g_print ("We are already linked. Ignoring.\n");
    goto exit;
  }

  /* Check the new pad's type */
  new_pad_caps = gst_pad_get_current_caps (new_pad);
  new_pad_struct = gst_caps_get_structure (new_pad_caps, 0);
  new_pad_type = gst_structure_get_name (new_pad_struct);
  if (!g_str_has_prefix (new_pad_type, "video")) {
    g_print ("It has type '%s' which is not raw audio. Ignoring.\n",
        new_pad_type);
    goto exit;
  }

  /* Attempt the link */
  ret = gst_pad_link (new_pad, sink_pad);
  if (GST_PAD_LINK_FAILED (ret)) {
    g_print ("Type is '%s' but link failed.\n", new_pad_type);
  } else {
    g_print ("Link succeeded (type '%s').\n", new_pad_type);
  }

exit:
  /* Unreference the new pad's caps, if we got them */
  if (new_pad_caps != NULL)
    gst_caps_unref (new_pad_caps);

  /* Unreference the sink pad */
  gst_object_unref (sink_pad);
}

```