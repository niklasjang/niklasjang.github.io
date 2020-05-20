---
title: "[NNStreamer] Gstreamer 기본 튜토리얼 5"
excerpt: "GUI toolkit integration "
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

본 포스팅은 [여기](https://gstreamer.freedesktop.org/documentation/tutorials/basic/toolkit-integration.html?gi-language=c)를 참조합니다.  

## 목표

이 튜토리얼에서는 `Gstreamer`에서 어떻게 GUI를 integration하는지 알아보겠습니다. 기본적으로 `Gstreamer`는 GUI를 사용해서 미디어의 재생을 케어합니다. 가장 흥미로운 부분은 `GUI`와 `Gstreamer`의 두 `libraries`가 상호작용을 하는 부분입니다. 이는 `Gstreamer`를 `GTK+ window`에 출력하도록 하고 사용자의 행동을 `Gstreamer`에 보냄으로서 이루어집니다.  

- `Gstreamer`에게 특정한 윈도우로 비디오 출력을 보내라고 하는 방법 (Gstreamer의 window를 생성하는 대신)
- `Gstreamer`의 정보를 계속해서 `window`에 refresh 하는 방법
- `Gstreamer`의 멀티 쓰레드로부터 GUI를 update 하는 방법, 대부분의 GUI toolkits에서는 금지되는 동작
- 모든 msg에 응답하지 않고 원하는 메세지에만 응답하는 방법

## Introduction

우리는 `GTK+`를 사용해서 미디어 플레이어를 빌드해볼 것입니다. 하지만 개념은 `Qt`와 같은 다른 툴킷들에 적용됩니다. `GTK+`에 대한 최소한의 이해가 본 포스팅을 이해하는데 도움을 줄 것입니다.  

가장 중심이 되는 부분은 `Gstreamer`에게 비디오 출력을 어떤 `window`로 보낼지를 말해주는 부분에 있습니다. 구체적인 매커니즘은 O/S에 따라서 달라집니다. 하지만 `Gstreamer`는 플랫폼에 독립적인 추상 layer를 가지고 있습니다. 이 독립적인 특성은 `GstVideoOverLay` interface를 통해서 가능해집니다. 이것은 application에게 vieo sink에서 원하는 window의 handler로 말하는 것을 허용해줌으로서 가능해집니다.  

**Primary Notice:**  
`GStreamer`가 사용하는 `Gobject` interface는 element가 implement 할 수 있는 함수들의 집합입니다. 그래서 특정한 interface를 지원하는 것으로 말할 수 있습니다. 예를 들어서 `video sink`는 일반적으로 자신의 window를 생성해서 video를 출력합니다. 하지만 외부의 window에 출력을 보낼 수도 있습니다. 이를 위해서는 `GstVideoOverlay` interface를 implement 하고 특정 window를 선택하는 함수를 제공하면 됩니다. application 개발자의 관점에서는 특정 interface를 implement를 하는 것으로 생각하면 됩니다. 게다가 우리는 `playbin`을 사용하고 있습니다. 이것은 자동적으로 내부적인 element에 의해 지원되는 interfaces 들에게 자동으로 expose를 해줍니다.( it will automatically expose some of the interfaces supported by its internal elements) (잘 모르겠지만 알아서 해준다는 말입니다.) 우리는 우리의 interface 함수를 `playbin`에서 고를 수 있습니다, 누가 interface 함수들을 implementing하고 있는지 모르는 상태로요!
{: .notice--primary}  

또 다른 이슈는 GUI toolkits들은 보통 그래픽적인 `widgets`들을 `main thread`에서만 동작을 허용합니다. 이 `main thread`는 `Gstreamer`가 보통 다른 일들을 처리하기 위해서 많은 `thread`들을 생산하는 곳입니다. `GTK+` 함수들을 콜백에서 호출하는 것은 보통 실패를 합니다. 왜냐하면 콜백은 호출을 하고 있는 `thread`에서 실행이되는데 이 `thread`는 `main thread`가 아니기 때문입니다. 이 문제는 콜백 안에서 `Gstreamer bus`에게 `msg`를 post하는 것으로 해결될 수 있습니다. 이 `msg`는 `main thread`에서 받기 때문에 정상적으로 동작할 것입니다.  

## A media player in GTK+

`playbin`에 기초한 간단한 다른 미디어 플레이어를 작성해보겠습니다. 이번에는 GUI를 추가할 것입니다.  

아래에 제시될 코드를 컴파일 하기 위해서는 먼저 설치해야하는 libraries가 있습니다.

```bash
$ sudo apt-get install libgstreamer-plugins-base1.0-dev        //gstreamer-video-1.0를 포함한 기본 libs 설치
$ sudo apt-get install libgtk-3-dev                            //gtk3.0 설치
```

`GTK`가 무엇인지 모른다면 짧은 [포스팅]()을 보고 오는 것이 좋습니다.  

아래의 코드는 위의 두 가지 libraries를 설치했다면 basic_tutorial.c를 아래의 명령으로 컴파일 할 수 있습니다.  

```bash
$ gcc basic-tutorial-5.c -o basic-tutorial-5 `pkg-config --cflags --libs gstreamer-video-1.0 gtk+-3.0 gstreamer-1.0`
```

```c
///basic_tutorial-5.c
#include <string.h>

#include <gtk/gtk.h>
#include <gst/gst.h>
#include <gst/video/videooverlay.h>

#include <gdk/gdk.h>
#if defined (GDK_WINDOWING_X11)
#include <gdk/gdkx.h>
#elif defined (GDK_WINDOWING_WIN32)
#include <gdk/gdkwin32.h>
#elif defined (GDK_WINDOWING_QUARTZ)
#include <gdk/gdkquartz.h>
#endif

/* Structure to contain all our information, so we can pass it around */
typedef struct _CustomData {
  GstElement *playbin;           /* Our one and only pipeline */

  GtkWidget *slider;              /* Slider widget to keep track of current position */
  GtkWidget *streams_list;        /* Text widget to display info about the streams */
  gulong slider_update_signal_id; /* Signal ID for the slider update signal */

  GstState state;                 /* Current state of the pipeline */
  gint64 duration;                /* Duration of the clip, in nanoseconds */
} CustomData;

/* This function is called when the GUI toolkit creates the physical window that will hold the video.
 * At this point we can retrieve its handler (which has a different meaning depending on the windowing system)
 * and pass it to GStreamer through the VideoOverlay interface. */
static void realize_cb (GtkWidget *widget, CustomData *data) {
  GdkWindow *window = gtk_widget_get_window (widget);
  guintptr window_handle;

  if (!gdk_window_ensure_native (window))
    g_error ("Couldn't create native window needed for GstVideoOverlay!");

  /* Retrieve window handler from GDK */
#if defined (GDK_WINDOWING_WIN32)
  window_handle = (guintptr)GDK_WINDOW_HWND (window);
#elif defined (GDK_WINDOWING_QUARTZ)
  window_handle = gdk_quartz_window_get_nsview (window);
#elif defined (GDK_WINDOWING_X11)
  window_handle = GDK_WINDOW_XID (window);
#endif
  /* Pass it to playbin, which implements VideoOverlay and will forward it to the video sink */
  gst_video_overlay_set_window_handle (GST_VIDEO_OVERLAY (data->playbin), window_handle);
}

/* This function is called when the PLAY button is clicked */
static void play_cb (GtkButton *button, CustomData *data) {
  gst_element_set_state (data->playbin, GST_STATE_PLAYING);
}

/* This function is called when the PAUSE button is clicked */
static void pause_cb (GtkButton *button, CustomData *data) {
  gst_element_set_state (data->playbin, GST_STATE_PAUSED);
}

/* This function is called when the STOP button is clicked */
static void stop_cb (GtkButton *button, CustomData *data) {
  gst_element_set_state (data->playbin, GST_STATE_READY);
}

/* This function is called when the main window is closed */
static void delete_event_cb (GtkWidget *widget, GdkEvent *event, CustomData *data) {
  stop_cb (NULL, data);
  gtk_main_quit ();
}

/* This function is called everytime the video window needs to be redrawn (due to damage/exposure,
 * rescaling, etc). GStreamer takes care of this in the PAUSED and PLAYING states, otherwise,
 * we simply draw a black rectangle to avoid garbage showing up. */
static gboolean draw_cb (GtkWidget *widget, cairo_t *cr, CustomData *data) {
  if (data->state < GST_STATE_PAUSED) {
    GtkAllocation allocation;

    /* Cairo is a 2D graphics library which we use here to clean the video window.
     * It is used by GStreamer for other reasons, so it will always be available to us. */
    gtk_widget_get_allocation (widget, &allocation);
    cairo_set_source_rgb (cr, 0, 0, 0);
    cairo_rectangle (cr, 0, 0, allocation.width, allocation.height);
    cairo_fill (cr);
  }

  return FALSE;
}

/* This function is called when the slider changes its position. We perform a seek to the
 * new position here. */
static void slider_cb (GtkRange *range, CustomData *data) {
  gdouble value = gtk_range_get_value (GTK_RANGE (data->slider));
  gst_element_seek_simple (data->playbin, GST_FORMAT_TIME, GST_SEEK_FLAG_FLUSH | GST_SEEK_FLAG_KEY_UNIT,
      (gint64)(value * GST_SECOND));
}

/* This creates all the GTK+ widgets that compose our application, and registers the callbacks */
static void create_ui (CustomData *data) {
  GtkWidget *main_window;  /* The uppermost window, containing all other windows */
  GtkWidget *video_window; /* The drawing area where the video will be shown */
  GtkWidget *main_box;     /* VBox to hold main_hbox and the controls */
  GtkWidget *main_hbox;    /* HBox to hold the video_window and the stream info text widget */
  GtkWidget *controls;     /* HBox to hold the buttons and the slider */
  GtkWidget *play_button, *pause_button, *stop_button; /* Buttons */

  main_window = gtk_window_new (GTK_WINDOW_TOPLEVEL);
  g_signal_connect (G_OBJECT (main_window), "delete-event", G_CALLBACK (delete_event_cb), data);

  video_window = gtk_drawing_area_new ();
  gtk_widget_set_double_buffered (video_window, FALSE);
  g_signal_connect (video_window, "realize", G_CALLBACK (realize_cb), data);
  g_signal_connect (video_window, "draw", G_CALLBACK (draw_cb), data);

  play_button = gtk_button_new_from_icon_name ("media-playback-start", GTK_ICON_SIZE_SMALL_TOOLBAR);
  g_signal_connect (G_OBJECT (play_button), "clicked", G_CALLBACK (play_cb), data);

  pause_button = gtk_button_new_from_icon_name ("media-playback-pause", GTK_ICON_SIZE_SMALL_TOOLBAR);
  g_signal_connect (G_OBJECT (pause_button), "clicked", G_CALLBACK (pause_cb), data);

  stop_button = gtk_button_new_from_icon_name ("media-playback-stop", GTK_ICON_SIZE_SMALL_TOOLBAR);
  g_signal_connect (G_OBJECT (stop_button), "clicked", G_CALLBACK (stop_cb), data);

  data->slider = gtk_scale_new_with_range (GTK_ORIENTATION_HORIZONTAL, 0, 100, 1);
  gtk_scale_set_draw_value (GTK_SCALE (data->slider), 0);
  data->slider_update_signal_id = g_signal_connect (G_OBJECT (data->slider), "value-changed", G_CALLBACK (slider_cb), data);

  data->streams_list = gtk_text_view_new ();
  gtk_text_view_set_editable (GTK_TEXT_VIEW (data->streams_list), FALSE);

  controls = gtk_box_new (GTK_ORIENTATION_HORIZONTAL, 0);
  gtk_box_pack_start (GTK_BOX (controls), play_button, FALSE, FALSE, 2);
  gtk_box_pack_start (GTK_BOX (controls), pause_button, FALSE, FALSE, 2);
  gtk_box_pack_start (GTK_BOX (controls), stop_button, FALSE, FALSE, 2);
  gtk_box_pack_start (GTK_BOX (controls), data->slider, TRUE, TRUE, 2);

  main_hbox = gtk_box_new (GTK_ORIENTATION_HORIZONTAL, 0);
  gtk_box_pack_start (GTK_BOX (main_hbox), video_window, TRUE, TRUE, 0);
  gtk_box_pack_start (GTK_BOX (main_hbox), data->streams_list, FALSE, FALSE, 2);

  main_box = gtk_box_new (GTK_ORIENTATION_VERTICAL, 0);
  gtk_box_pack_start (GTK_BOX (main_box), main_hbox, TRUE, TRUE, 0);
  gtk_box_pack_start (GTK_BOX (main_box), controls, FALSE, FALSE, 0);
  gtk_container_add (GTK_CONTAINER (main_window), main_box);
  gtk_window_set_default_size (GTK_WINDOW (main_window), 640, 480);

  gtk_widget_show_all (main_window);
}

/* This function is called periodically to refresh the GUI */
static gboolean refresh_ui (CustomData *data) {
  gint64 current = -1;

  /* We do not want to update anything unless we are in the PAUSED or PLAYING states */
  if (data->state < GST_STATE_PAUSED)
    return TRUE;

  /* If we didn't know it yet, query the stream duration */
  if (!GST_CLOCK_TIME_IS_VALID (data->duration)) {
    if (!gst_element_query_duration (data->playbin, GST_FORMAT_TIME, &data->duration)) {
      g_printerr ("Could not query current duration.\n");
    } else {
      /* Set the range of the slider to the clip duration, in SECONDS */
      gtk_range_set_range (GTK_RANGE (data->slider), 0, (gdouble)data->duration / GST_SECOND);
    }
  }

  if (gst_element_query_position (data->playbin, GST_FORMAT_TIME, &current)) {
    /* Block the "value-changed" signal, so the slider_cb function is not called
     * (which would trigger a seek the user has not requested) */
    g_signal_handler_block (data->slider, data->slider_update_signal_id);
    /* Set the position of the slider to the current pipeline positoin, in SECONDS */
    gtk_range_set_value (GTK_RANGE (data->slider), (gdouble)current / GST_SECOND);
    /* Re-enable the signal */
    g_signal_handler_unblock (data->slider, data->slider_update_signal_id);
  }
  return TRUE;
}

/* This function is called when new metadata is discovered in the stream */
static void tags_cb (GstElement *playbin, gint stream, CustomData *data) {
  /* We are possibly in a GStreamer working thread, so we notify the main
   * thread of this event through a message in the bus */
  gst_element_post_message (playbin,
    gst_message_new_application (GST_OBJECT (playbin),
      gst_structure_new_empty ("tags-changed")));
}

/* This function is called when an error message is posted on the bus */
static void error_cb (GstBus *bus, GstMessage *msg, CustomData *data) {
  GError *err;
  gchar *debug_info;

  /* Print error details on the screen */
  gst_message_parse_error (msg, &err, &debug_info);
  g_printerr ("Error received from element %s: %s\n", GST_OBJECT_NAME (msg->src), err->message);
  g_printerr ("Debugging information: %s\n", debug_info ? debug_info : "none");
  g_clear_error (&err);
  g_free (debug_info);

  /* Set the pipeline to READY (which stops playback) */
  gst_element_set_state (data->playbin, GST_STATE_READY);
}

/* This function is called when an End-Of-Stream message is posted on the bus.
 * We just set the pipeline to READY (which stops playback) */
static void eos_cb (GstBus *bus, GstMessage *msg, CustomData *data) {
  g_print ("End-Of-Stream reached.\n");
  gst_element_set_state (data->playbin, GST_STATE_READY);
}

/* This function is called when the pipeline changes states. We use it to
 * keep track of the current state. */
static void state_changed_cb (GstBus *bus, GstMessage *msg, CustomData *data) {
  GstState old_state, new_state, pending_state;
  gst_message_parse_state_changed (msg, &old_state, &new_state, &pending_state);
  if (GST_MESSAGE_SRC (msg) == GST_OBJECT (data->playbin)) {
    data->state = new_state;
    g_print ("State set to %s\n", gst_element_state_get_name (new_state));
    if (old_state == GST_STATE_READY && new_state == GST_STATE_PAUSED) {
      /* For extra responsiveness, we refresh the GUI as soon as we reach the PAUSED state */
      refresh_ui (data);
    }
  }
}

/* Extract metadata from all the streams and write it to the text widget in the GUI */
static void analyze_streams (CustomData *data) {
  gint i;
  GstTagList *tags;
  gchar *str, *total_str;
  guint rate;
  gint n_video, n_audio, n_text;
  GtkTextBuffer *text;

  /* Clean current contents of the widget */
  text = gtk_text_view_get_buffer (GTK_TEXT_VIEW (data->streams_list));
  gtk_text_buffer_set_text (text, "", -1);

  /* Read some properties */
  g_object_get (data->playbin, "n-video", &n_video, NULL);
  g_object_get (data->playbin, "n-audio", &n_audio, NULL);
  g_object_get (data->playbin, "n-text", &n_text, NULL);

  for (i = 0; i < n_video; i++) {
    tags = NULL;
    /* Retrieve the stream's video tags */
    g_signal_emit_by_name (data->playbin, "get-video-tags", i, &tags);
    if (tags) {
      total_str = g_strdup_printf ("video stream %d:\n", i);
      gtk_text_buffer_insert_at_cursor (text, total_str, -1);
      g_free (total_str);
      gst_tag_list_get_string (tags, GST_TAG_VIDEO_CODEC, &str);
      total_str = g_strdup_printf ("  codec: %s\n", str ? str : "unknown");
      gtk_text_buffer_insert_at_cursor (text, total_str, -1);
      g_free (total_str);
      g_free (str);
      gst_tag_list_free (tags);
    }
  }

  for (i = 0; i < n_audio; i++) {
    tags = NULL;
    /* Retrieve the stream's audio tags */
    g_signal_emit_by_name (data->playbin, "get-audio-tags", i, &tags);
    if (tags) {
      total_str = g_strdup_printf ("\naudio stream %d:\n", i);
      gtk_text_buffer_insert_at_cursor (text, total_str, -1);
      g_free (total_str);
      if (gst_tag_list_get_string (tags, GST_TAG_AUDIO_CODEC, &str)) {
        total_str = g_strdup_printf ("  codec: %s\n", str);
        gtk_text_buffer_insert_at_cursor (text, total_str, -1);
        g_free (total_str);
        g_free (str);
      }
      if (gst_tag_list_get_string (tags, GST_TAG_LANGUAGE_CODE, &str)) {
        total_str = g_strdup_printf ("  language: %s\n", str);
        gtk_text_buffer_insert_at_cursor (text, total_str, -1);
        g_free (total_str);
        g_free (str);
      }
      if (gst_tag_list_get_uint (tags, GST_TAG_BITRATE, &rate)) {
        total_str = g_strdup_printf ("  bitrate: %d\n", rate);
        gtk_text_buffer_insert_at_cursor (text, total_str, -1);
        g_free (total_str);
      }
      gst_tag_list_free (tags);
    }
  }

  for (i = 0; i < n_text; i++) {
    tags = NULL;
    /* Retrieve the stream's subtitle tags */
    g_signal_emit_by_name (data->playbin, "get-text-tags", i, &tags);
    if (tags) {
      total_str = g_strdup_printf ("\nsubtitle stream %d:\n", i);
      gtk_text_buffer_insert_at_cursor (text, total_str, -1);
      g_free (total_str);
      if (gst_tag_list_get_string (tags, GST_TAG_LANGUAGE_CODE, &str)) {
        total_str = g_strdup_printf ("  language: %s\n", str);
        gtk_text_buffer_insert_at_cursor (text, total_str, -1);
        g_free (total_str);
        g_free (str);
      }
      gst_tag_list_free (tags);
    }
  }
}

/* This function is called when an "application" message is posted on the bus.
 * Here we retrieve the message posted by the tags_cb callback */
static void application_cb (GstBus *bus, GstMessage *msg, CustomData *data) {
  if (g_strcmp0 (gst_structure_get_name (gst_message_get_structure (msg)), "tags-changed") == 0) {
    /* If the message is the "tags-changed" (only one we are currently issuing), update
     * the stream info GUI */
    analyze_streams (data);
  }
}

int main(int argc, char *argv[]) {
  CustomData data;
  GstStateChangeReturn ret;
  GstBus *bus;

  /* Initialize GTK */
  gtk_init (&argc, &argv);

  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  /* Initialize our data structure */
  memset (&data, 0, sizeof (data));
  data.duration = GST_CLOCK_TIME_NONE;

  /* Create the elements */
  data.playbin = gst_element_factory_make ("playbin", "playbin");

  if (!data.playbin) {
    g_printerr ("Not all elements could be created.\n");
    return -1;
  }

  /* Set the URI to play */
  g_object_set (data.playbin, "uri", "https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm", NULL);

  /* Connect to interesting signals in playbin */
  g_signal_connect (G_OBJECT (data.playbin), "video-tags-changed", (GCallback) tags_cb, &data);
  g_signal_connect (G_OBJECT (data.playbin), "audio-tags-changed", (GCallback) tags_cb, &data);
  g_signal_connect (G_OBJECT (data.playbin), "text-tags-changed", (GCallback) tags_cb, &data);

  /* Create the GUI */
  create_ui (&data);

  /* Instruct the bus to emit signals for each received message, and connect to the interesting signals */
  bus = gst_element_get_bus (data.playbin);
  gst_bus_add_signal_watch (bus);
  g_signal_connect (G_OBJECT (bus), "message::error", (GCallback)error_cb, &data);
  g_signal_connect (G_OBJECT (bus), "message::eos", (GCallback)eos_cb, &data);
  g_signal_connect (G_OBJECT (bus), "message::state-changed", (GCallback)state_changed_cb, &data);
  g_signal_connect (G_OBJECT (bus), "message::application", (GCallback)application_cb, &data);
  gst_object_unref (bus);

  /* Start playing */
  ret = gst_element_set_state (data.playbin, GST_STATE_PLAYING);
  if (ret == GST_STATE_CHANGE_FAILURE) {
    g_printerr ("Unable to set the pipeline to the playing state.\n");
    gst_object_unref (data.playbin);
    return -1;
  }

  /* Register a function that GLib will call every second */
  g_timeout_add_seconds (1, (GSourceFunc)refresh_ui, &data);

  /* Start the GTK main loop. We will not regain control until gtk_main_quit is called. */
  gtk_main ();

  /* Free resources */
  gst_element_set_state (data.playbin, GST_STATE_NULL);
  gst_object_unref (data.playbin);
  return 0;
}
```

## Walkthrough

앞으로는 코드의 snapshot를 설명할 때 프로그램의 순서대로 설명되지 않을 수 있습니다. 설명의 명확함을 위해서이니 전체적인 흐름을 다시 볼 때는 몇 번째 라인의 코드인지 보면서 이해하면 됩니다.  

```c
#include <gdk/gdk.h>
#if defined (GDK_WINDOWING_X11)
#include <gdk/gdkx.h>
#elif defined (GDK_WINDOWING_WIN32)
#include <gdk/gdkwin32.h>
#elif defined (GDK_WINDOWING_QUARTZ)
#include <gdk/gdkquartzwindow.h>
#endif
```

먼저 숙지하고 가야하는 점은 이제 더이상 완벽하게 플랫폼에 독립적이지는 않다는 것입니다. 우리는 우리가 사용할 `windowing system`을 위해서 적절한 `GDK` header를 포함해야합니다. 운이 좋게도 많은 `windowing system`이 존재하지는 않아서 위의 3 줄만 추가하면 됩니다. 첫 번째는 `linux`를 위해서, 두 번째와  세 번째는 win32와 macOS를 위해서 추가합니다.  

이번 튜토리얼은 많은 부분이 `Gstreamer`나 `GTK`에 의해서 호출되는 `callback`으로 이루어져있습니다. 따라서 main 함수에서 어떻게 콜백을 등록하는지 보고 넘어가겠습니다.  

```c
int main(int argc, char *argv[]) {
CustomData data;
GstStateChangeReturn ret;
GstBus *bus;

/* Initialize GTK */
gtk_init (&argc, &argv);

/* Initialize GStreamer */
gst_init (&argc, &argv);

/* Initialize our data structure */
memset (&data, 0, sizeof (data));
data.duration = GST_CLOCK_TIME_NONE;

/* Create the elements */
data.playbin = gst_element_factory_make ("playbin", "playbin");

if (!data.playbin) {
  g_printerr ("Not all elements could be created.\n");
  return -1;
}

/* Set the URI to play */
g_object_set (data.playbin, "uri", "https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm", NULL);
```

standard한 `GStreamer`의 초기화 작업과 `playbin pipeline`생성을 합니다. 새로운 것은 없습니다. 

```c
/* Connect to interesting signals in playbin */
g_signal_connect (G_OBJECT (data.playbin), "video-tags-changed", (GCallback) tags_cb, &data);
g_signal_connect (G_OBJECT (data.playbin), "audio-tags-changed", (GCallback) tags_cb, &data);
g_signal_connect (G_OBJECT (data.playbin), "text-tags-changed", (GCallback) tags_cb, &data);
```

우리는 새로운 `TAGS`가  stream에 나타났을 때를 알고 싶습니다. 간단하게 코드를 짜기 위해서 모든 종류의 `tags`에 대해서 같은 콜백(tags_cb)을 호출하겠습니다.  

```c
/* Create the GUI */
create_ui (&data);
```

모든 `GTK+` 위젯 생성과 신호를 registration하는 것은 이 함수 안에서 일어납니다. 이것은 `GTK`와 관련된 함수들을 호출합니다. 따라서 우리는 이 함수의 정의를 더이상 설명하지 않고 넘어가겠습니다. `GTK` 내부적으로 일어나고 `GStreamer`의  함수를 call하거나 하지 않기 때문입니다. 이 함수가 등록하는 `signal`들은 callback을 reviewing할 때 `user commands`를 전달합니다.  

```c
 /* Instruct the bus to emit signals for each received message, and connect to the interesting signals */
bus = gst_element_get_bus (data.playbin);
gst_bus_add_signal_watch (bus);
g_signal_connect (G_OBJECT (bus), "message::error", (GCallback)error_cb, &data);
g_signal_connect (G_OBJECT (bus), "message::eos", (GCallback)eos_cb, &data);
g_signal_connect (G_OBJECT (bus), "message::state-changed", (GCallback)state_changed_cb, &data);
g_signal_connect (G_OBJECT (bus), "message::application", (GCallback)application_cb, &data);
gst_object_unref (bus);
```

튜토리얼 1에서 보았듯이 `gst_bus_add_watch()`는 `Gstreamer bus`에 등록되는 모든 종류의 `msg`를 받는 함수를 등록하기 위해서 사용됩니다. 그리고 우리가 관심이 있는 메시지만 등록하면 granularity세분화된 특성을 얻을 수 있습니다. `gst_bus_add_signal_watch()`를 호출함으로써 우리는 `bus`에게 `msg`를  받는 모든 시점에서 신호를 보내라고 지시할 수 있습니다. 이 신호는 `message::detail`이라는 이름을 가지고 있습니다. `detail`은 신호의 emission을 trigger하는 메시지입니다. 예를 들어서 `bus`는 `EOS msg`를 받았을 때 `message::eos`로 된 신호를 emit합니다.  

만약에 "message" 신호를 등록했으면 모든 신호로부터 콜백함수를 실행하는 것이 됩니다. 이 신호를 Catch하기 위해서 `GTK+`를 구성하는 `GLib`에서 `main loop`을 돌립니다.  

```c
/* Register a function that GLib will call every second */
g_timeout_add_seconds (1, (GSourceFunc)refresh_ui, &data);
```

`GTK+`에게 `control`을 주기 전에 또 다른 콜백을 등록합니다. 이 콜백은 매 초마다 실행이 될 것이며 `refresh_ui`의 기능을 수행하게 됩니다.  

```c
/* This function is called when the GUI toolkit creates the physical window that will hold the video.
 * At this point we can retrieve its handler (which has a different meaning depending on the windowing system)
 * and pass it to GStreamer through the VideoOverlay interface. */
static void realize_cb (GtkWidget *widget, CustomData *data) {
  GdkWindow *window = gtk_widget_get_window (widget);
  guintptr window_handle;

  if (!gdk_window_ensure_native (window))
    g_error ("Couldn't create native window needed for GstVideoOverlay!");

  /* Retrieve window handler from GDK */
#if defined (GDK_WINDOWING_WIN32)
  window_handle = (guintptr)GDK_WINDOW_HWND (window);
#elif defined (GDK_WINDOWING_QUARTZ)
  window_handle = gdk_quartz_window_get_nsview (window);
#elif defined (GDK_WINDOWING_X11)
  window_handle = GDK_WINDOW_XID (window);
#endif
  /* Pass it to playbin, which implements VideoOverlay and will forward it to the video sink */
  gst_video_overlay_set_window_handle (GST_VIDEO_OVERLAY (data->playbin), window_handle);
}
```

위 주석에 적혀있는 그대로 입니다. `window`의 `handler`를 가져와서 `gst_video_overlay_set_window_handle()` interface를 사용해서 `GstVideoOverlay`를 통해서 `playbin`에게 전달합니다.  

```c
/* This function is called when the PLAY button is clicked */
static void play_cb (GtkButton *button, CustomData *data) {
  gst_element_set_state (data->playbin, GST_STATE_PLAYING);
}

/* This function is called when the PAUSE button is clicked */
static void pause_cb (GtkButton *button, CustomData *data) {
  gst_element_set_state (data->playbin, GST_STATE_PAUSED);
}

/* This function is called when the STOP button is clicked */
static void stop_cb (GtkButton *button, CustomData *data) {
  gst_element_set_state (data->playbin, GST_STATE_READY);
}
```

3개의 콜백은 GUI의 `PLAY`, `PAUSE`, `STOP` 버튼과 연동됩니다. 우리는 파이프라인을 적절한 상태에 맞춰서 설정합니다. State를 `NULL` 상태로 만들 수도 있지만 상태전이translation이 더 느려질 수 있습니다. 몇몇의 자원들이 re-acquired 되는데 시간이 걸릴 수 있기 때문입니다.  

```c
/* This function is called when the main window is closed */
static void delete_event_cb (GtkWidget *widget, GdkEvent *event, CustomData *data) {
  stop_cb (NULL, data);
  gtk_main_quit ();
}
```
`gtk_main_quit()`는 결과적으로 main 함수에 있는 `gtk_main_run()`를 종료시킵니다. 이 경우에 프로그램이 종료합니다. 여기에서 우리는 window가 종료되었을 때 파이프라인을 멈추고 위 함수를 실행합니다.  

```c
/* This function is called everytime the video window needs to be redrawn (due to damage/exposure,
 * rescaling, etc). GStreamer takes care of this in the PAUSED and PLAYING states, otherwise,
 * we simply draw a black rectangle to avoid garbage showing up. */
static gboolean draw_cb (GtkWidget *widget, cairo_t *cr, CustomData *data) {
  if (data->state < GST_STATE_PAUSED) {
    GtkAllocation allocation;

    /* Cairo is a 2D graphics library which we use here to clean the video window.
     * It is used by GStreamer for other reasons, so it will always be available to us. */
    gtk_widget_get_allocation (widget, &allocation);
    cairo_set_source_rgb (cr, 0, 0, 0);
    cairo_rectangle (cr, 0, 0, allocation.width, allocation.height);
    cairo_fill (cr);
  }

  return FALSE;
}
```

위 주석 그대로 이해하면 됩니다.  

```c
/* This function is called when the slider changes its position. We perform a seek to the
 * new position here. */
static void slider_cb (GtkRange *range, CustomData *data) {
  gdouble value = gtk_range_get_value (GTK_RANGE (data->slider));
  gst_element_seek_simple (data->playbin, GST_FORMAT_TIME, GST_SEEK_FLAG_FLUSH | GST_SEEK_FLAG_KEY_UNIT,
      (gint64)(value * GST_SECOND));
}
```
이 예제는 `seeker bar`를 만드는 예제입니다. `Gstreamer`와 `GTK` 덕분에 쉽게 만들 수 있습니다. 새로운 위치로 seeker가 드래그 되면 `GSTreamer`에게 `gst_element_seek_simple()`를 통해서 새로운 position을 찾으라고 말합니다.  

//TODO 





















