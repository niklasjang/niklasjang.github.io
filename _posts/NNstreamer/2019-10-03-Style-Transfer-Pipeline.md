---
title: "[NNStreamer] Style Transfer pipelie"
excerpt: "드디어 응용 "
date: 2019-10-03
categories:
  - NNstreamer
tags:
  - nnstreamer
  - gstreamer
  - gst-launch-1.0
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## nnstreamer-example/bash_script/gst-launch-object-detection-tflite.sh

먼저 nnstreamer-example/bash_script에 있는 예제부터 분석해보겠습니다. 잘 모르는 pipeline element가 있다면 [여기][7]서 찾아보았습니다.  

```bash
#!/usr/bin/env bash
gst-launch-1.0 \
	v4l2src ! videoconvert ! videoscale ! video/x-raw,width=640,height=480,format=RGB,framerate=30/1 ! tee name=t \
	t. ! queue ! videoscale ! video/x-raw,width=300,height=300,format=RGB ! tensor_converter ! \
		tensor_transform mode=arithmetic option=typecast:float32,add:-127.5,div:127.5 ! \
		tensor_filter framework=tensorflow-lite model=tflite_model/ssd_mobilenet_v2_coco.tflite ! \
		tensor_decoder mode=bounding_boxes option1=tflite-ssd option2=tflite_model/coco_labels_list.txt  option3=tflite_model/box_priors.txt option4=640:480 option5=300:300 ! \
		compositor name=mix sink_0::zorder=2 sink_1::zorder=1 ! videoconvert ! ximagesink \
	t. ! queue leaky=2 max-size-buffers=10 ! mix.

```

1. `v4l2src` : video for linux version 2라는 뜻으로 webcam이나 tvcards와 같은 v4l2 device에서 비디오를 캡쳐합니다.
2. `videoconvert` : colorspace를 변환합니다. RBG에서 YUV나 ARGB 등으로 변환할 수 있습니다.
3. `videoscale` : resize video frame
4. `video/x-raw ~~` : [여기][12]를 먼저 읽어봐야합니다. input으로 들어오는 data를 raw video frames and timestamps로 파싱을 해줍니다. input buffer에서 부족한  프래임이나 여러 개의 프래임이 있을 때 output이 정확하게 1개의 frame일 것은 보장해줍니다. gstreamer document에서 `rawvideoparse`를 검색하면 해당 내용이 나옵니다. 그리고 아래의 `imagefreeeze` element 설명 부분에 추가적인 설명이 있습니다.
5. tee : 흐름을 분기합니다.
6. queue : leaky=2라고 되어 있는 부분은 queue의 buffer 사이즈가 max가 되었을 떄 새로 들어오는 정보를 버릴지, 이미 있는 정보를 버릴지 결정하는 옵션입니다.
7. [tensor_converter][1] : input으로 들어오는 데이터는 $uint8[height][width][RGB]$로서 이미 converted 된 데이터를 받습니다. 그리고 output은 항상 other/tensor type입니다. 
8. [tensor_transform][2] : other/tensor 데이터의 dimension과 type을 바꾸기 위해서 사용됩니다. 위 예제에서는 -127.5로 빼고 127.5로 나누어서 normalizing을 진행하고 있습니다.
9. [tensor_filter][3] : 필터로서 general neural network frameworks를 사용할 수 있도록 도와주는 gstreamer plugin 입니다.
    - 필터는 말 그대로 필터링을 해주는 역할을 합니다.(Filters typically are applied to data in the data processing stage or the preprocessing stage. Filters enhance the clarity of the signal that's used for machine learning.)
10. [tensor_decoder][4] : NNStreamer tensor-decoder subplugin으로서, 예를 들어 옵션으로 "bounding boxes"를 지정할 수 있습니다. 그러면 tensors를 video stream w/ boxes on transparent background으로 변환해주는 역할을 합니다. 
11. [compositor][5] : compositor는 AYUV, ARGB and BGRA video streams을 받을 수 있습니다. 각각의 `requested sink pads`에 대해서 들어오는 `incoming geometry` and `framerate`를 비교하고 output parameter 정의합니다. geometry는 들어오는 데이터의 가장 큰 것을, framerate는 가장 빠른 것을 사용한다고 합니다. 결국 위 예제에서는 두 개의 queue로 부터 입력을 받아서 결과를 합쳐주는 역할을 합니다.  
    - video의 geometry가 무엇인지 모르면 [여기][6]를 보면 좋습니다.

## 여러가지 element 분석

style-transfer pipeline을 구성하기 전에 여러가지 element들을 찾아보고 정리하겠습니다. 

1. [imagefreeze][9]
    이미지로 들어오는 데이터를 still한 상태의 video로 바꿔주는 역할을 합니다. framerate는 downstream에서 요청하는대로 보여줍니다. seeking and answers queries를 지원합니다. 이 element를 사용해서 jpg를 비디오로 만들 수 있습니다.
    ```bash
    $ gst-launch-1.0.exe -v filesrc location=output.jpg ! decodebin ! imagefreeze ! autovideosink
    ```
    만약 RAW 이미지를 다른 이미지로 변환하고 싶으면 아래와 같이 하면 됩니다. 반드시 raw data를 사용할 때는 blocksize를 사용해야 합니다.
    ```bash
    $ gst-launch-1.0.exe -v filesrc location=dumped.bin blocksize=1920000 ! video/x-raw,format=BGRA,width=800,height=600,framerate=1/1 ! videoconvert ! video/x-raw,format=RGB,framerate=1/1 ! jpegenc ! filesink location=out.jpg
    ```
    이 예제를 보면 `video/x-raw`를 어떻게 사용하는지 더 잘 감이 오네요. v4l2에서 보내주는 데이터가 raw 데이터이고 이를 frame으로 잘 변환하기 위해서 gst-launch-object-detection-tflite.sh에서 `video/x-raw`를 사용했던 것입니다. 위 파이프라인은 [여기][10]에서 찾았습니다. 
2. [jpegenc][11]
    Encodes jpeg images.
    ```bash
    $ gst-launch-1.0 videotestsrc num-buffers=50 ! video/x-raw, framerate='(fraction)'5/1 ! jpegenc ! avimux ! filesink location=mjpeg.avi
    ```
3. [avimux][12]
    Muxes raw or compressed audio and/or video streams into an AVI file.  
    ```bash
     gst-launch-1.0 videotestsrc num-buffers=250 ! 'video/x-raw,format=(string)I420,width=320,height=240,framerate=(fraction)25/1' \
    ! queue ! mux. \
    audiotestsrc num-buffers=440 ! audioconvert ! 'audio/x-raw,rate=44100,channels=2' ! queue ! mux. \
    avimux name=mux ! filesink location=test.avi
    ```
4. [tensormux]

## 몰랐던 부분 정리

### Media type의 의미

All audio types
- `video/x-raw` : Unstructured and uncompressed raw audio data.
All video types.
- `video/*` : All video types
All raw video types.
- `video/x-raw` : Unstructured and uncompressed raw video data.
All image types.
- `image/jpeg` : Joint Picture Expert Group Image.

### `Pixel Format`?

Videos, images and other visual media contain a value called Pixel Format. It describes the layout of each and every pixel in the image data of a picture or video.  

The Pixel Format is related to the color channel or color space of the visual data. It describes how the color data is encoded and organized. Usually, the value given for the Pixel Format in a file includes the bits per pixel (bpp) and the color channel or model. This includes, among others:

- `YCbCr`
- `RGB`
- `YUVJ`
- `MJPG` : 멀티미디어에서 모션 JPEG는 각 비디오 프레임이나 비월 주사 방식의 디지털 오디오 시퀀스가 JPEG 이미지로 따로 압축되어 있다는 영상 포맷 계열을 가리키는 비공식 이름이다.

### dev/video*의 타입 확인하기

```bash
$ v4l2-ctl --list-formats-ext

ioctl: VIDIOC_ENUM_FMT
	Index       : 0
	Type        : Video Capture
	Pixel Format: 'MJPG' (compressed)  
	Name        : Motion-JPEG
		Size: Discrete 640x480
			Interval: Discrete 0.033s (30.000 fps)
			Interval: Discrete 0.040s (25.000 fps)
			Interval: Discrete 0.050s (20.000 fps)
			Interval: Discrete 0.067s (15.000 fps)
			Interval: Discrete 0.100s (10.000 fps)
			Interval: Discrete 0.200s (5.000 fps)
		Size: Discrete 176x144
			Interval: Discrete 0.033s (30.000 fps)
			...omission...
```

### What is `blob`?

http://blog.naver.com/PostView.nhn?blogId=magnking&logNo=220950061851&parentCategoryNo=&categoryNo=20&viewDate=&isShowPopularPosts=false&from=postView



## style-transfer pipeline

[여기][8]에 있는 이슈를 구현하는 파이프라인을 만들어보겠습니다. 

```bash
filesrc (style)
   |
tensor_converter
   |
tensor_filter (Style predict model)
   |
tensor_mux - tensor_filter (Style transform model) - tensor_decoder - videoconvert - ximagesink (stylized) 
   |
tensor_converter
   |
videoscale
   |
v4l2src (content)
```

## TODO

1. png는 sink 되는데 jpg는 왜 안되냐
2. 

[1]: https://github.com/nnsuite/nnstreamer/blob/master/gst/nnstreamer/tensor_converter/tensor_converter.h
[2]: https://github.com/nnsuite/nnstreamer/blob/master/gst/nnstreamer/tensor_transform/tensor_transform.h
[3]: https://github.com/nnsuite/nnstreamer/blob/master/gst/nnstreamer/tensor_filter/tensor_filter.h
[4]: https://github.com/nnsuite/nnstreamer/blob/master/ext/nnstreamer/tensor_decoder/tensordec-boundingbox.c
[5]: https://gstreamer.freedesktop.org/documentation/compositor/index.html?gi-language=c#compositor-page
[6]: https://darkpgmr.tistory.com/77?category=460965
[7]: https://gstreamer.freedesktop.org/documentation/
[8]: https://github.com/wooksong/contributon2019-nns/issues/8
[9]: https://gstreamer.freedesktop.org/documentation/imagefreeze/index.html?gi-language=c#imagefreeze-page
[10]: https://stackoverflow.com/questions/26931886/how-to-convert-raw-bgra-image-to-jpg-using-gstreamer-1-0/58213669#58213669
[11]: https://gstreamer.freedesktop.org/documentation/jpeg/jpegenc.html?gi-language=c#jpegenc-page
[12]: https://stackoverflow.com/questions/22272057/what-effect-does-the-media-type-string-inserted-in-a-gstreamer-pipeline-have

                    v4l2 gstv4l2object.c:4238:gst_v4l2_object_probe_caps:<cam_src:src> probed caps: 
                    image/jpeg, width=(int)1280, height=(int)720, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; 
                    image/jpeg, width=(int)960, height=(int)540, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; 
                    image/jpeg, width=(int)848, height=(int)480, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; 
                    image/jpeg, width=(int)640, height=(int)480, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 };
                    image/jpeg, width=(int)640, height=(int)360, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; 
                    image/jpeg, width=(int)424, height=(int)240, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; 
                    image/jpeg, width=(int)352, height=(int)288, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; 
                    image/jpeg, width=(int)320, height=(int)240, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; 
                    image/jpeg, width=(int)320, height=(int)180, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }; 
                    image/jpeg, width=(int)176, height=(int)144, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction){ 30/1, 25/1, 20/1, 15/1, 10/1, 5/1 }


video/x-raw, format=(string)I420, width=(int)1280, height=(int)720, 
interlace-mode=(string)progressive, multiview-mode=(string)mono, multiview-flags=(GstVideoMultiviewFlagsSet)0:

/right-view-first/left-flipped/left-flopped/right-flipped/right-flopped/half-aspect/mixed-mono, 
pixel-aspect-ratio=(fraction)1/1, chroma-site=(string)mpeg2, colorimetry=(string)1:4:0:0, framerate=(fraction)30/1

Internal data stream error를 잡는 연습을 하기 위해서 아래의 두 파이프라인을 비교해봤습니다.

```
$ gst-launch-1.0 -v v4l2src ! typefind ! jpegdec ! typefind ! ximagesink //Internal data stream error
$ gst-launch-1.0 -v v4l2src ! typefind ! jpegdec ! typefind ! videoconvert ! ximagesink //실행 가능
```

```
//옳바른 pipeline이라도 typefind를 많이 넣으면 Internal datastream error가 발생
$ gst-launch-1.0 -v v4l2src ! typefind name=tf0 ! jpegdec ! typefind name=tf1 ! videoconvert ! typefind name=tf2 ! ximagesink //ERROR!
$ gst-launch-1.0 -v v4l2src ! jpegdec ! videoscale ! videoconvert ! ximagesink  //정상 작동하는 pipeline
```

gst-launch-1.0 -v v4l2src ! jpegdec ! videoconvert ! ximagesink | grep Gst

GstV4l2Src:`v4l2src`0.GstPad:`src`: caps = image/jpeg, width=(int)1280, height=(int)720, framerate=(fraction)30/1
GstJpegDec:`jpegdec`0.GstPad:`sink`: caps = image/jpeg, width=(int)1280, height=(int)720, framerate=(fraction)30/1
GstJpegDec:`jpegdec`0.GstPad:`src`: caps = video/x-raw, format=(string)I420, width=(int)1280, height=(int)720
GstVideoConvert:`videoconvert`0.GstPad:`src`: caps = video/x-raw, width=(int)1280, height=(int)720
GstXImageSink:`ximagesink`0.GstPad:`sink`: caps = video/x-raw, width=(int)1280, height=(int)720
GstVideoConvert:`videoconvert`0.GstPad:`sink`: caps = video/x-raw, format=(string)I420, width=(int)1280, height=(int)720


1. 첫 번째 typefind의 결과를 보니 `v4l2src`는 `image/jpeg` 타입을 전달합니다.
2. jpegdec에서 jpeg를 

```

```
//첫 번째 typefind
found caps image/jpeg, width=(int)1280, height=(int)720, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)30/1, colorimetry=(string)2:4:7:1, interlace-mode=(string)progressive, probability=100
```


```
//두 번째 typefind
found caps video/x-raw, format=(string)I420, width=(int)1280, height=(int)720, interlace-mode=(string)progressive, multiview-mode=(string)mono, multiview-flags=(GstVideoMultiviewFlagsSet)0:ffffffff:/right-view-first/left-flipped/left-flopped/right-flipped/right-flopped/half-aspect/mixed-mono, pixel-aspect-ratio=(fraction)1/1, chroma-site=(string)mpeg2, colorimetry=(string)1:4:0:0, framerate=(fraction)30/1, probability=100
```

```
//gst-inspect-1/0 ximagesink

Long-name                Video sink
Klass                    Sink/Video
Description              A standard X based videosink

Pad Templates:
  SINK template: 'sink'
    Availability: Always
    Capabilities:
      video/x-raw
              framerate: [ 0/1, 2147483647/1 ]
                  width: [ 1, 2147483647 ]
                 height: [ 1, 2147483647 ]
```

```
//gst-inspect-1.0 jpegdec
Long-name                JPEG image decoder
Klass                    Codec/Decoder/Image
Description              Decode images from JPEG format

Pad Templates:
  SINK template: 'sink'
    Availability: Always
    Capabilities:
      image/jpeg
  
  SRC template: 'src'
    Availability: Always
    Capabilities:
      video/x-raw
                 format: { (string)I420, (string)RGB, (string)BGR, (string)RGBx, (string)xRGB, (string)BGRx, (string)xBGR, (string)GRAY8 }
                  width: [ 1, 2147483647 ]
                 height: [ 1, 2147483647 ]
              framerate: [ 0/1, 2147483647/1 ]
```

```
//gst-inspect-1.0 videoconvert
Long-name                Colorspace converter
Klass                    Filter/Converter/Video

Description              Converts video from one colorspace to another
Pad Templates:
  SINK template: 'sink'
    Availability: Always
    Capabilities:
      video/x-raw
                 format: { (string)I420, (string)YV12, (string)YUY2, (string)UYVY, (string)AYUV, (string)RGBx, (string)BGRx, (string)xRGB, (string)xBGR, (string)RGBA, (string)BGRA, (string)ARGB, (string)ABGR, (string)RGB, (string)BGR, (string)Y41B, (string)Y42B, (string)YVYU, (string)Y444, (string)v210, (string)v216, (string)NV12, (string)NV21, (string)GRAY8, (string)GRAY16_BE, (string)GRAY16_LE, (string)v308, (string)RGB16, (string)BGR16, (string)RGB15, (string)BGR15, (string)UYVP, (string)A420, (string)RGB8P, (string)YUV9, (string)YVU9, (string)IYU1, (string)ARGB64, (string)AYUV64, (string)r210, (string)I420_10BE, (string)I420_10LE, (string)I422_10BE, (string)I422_10LE, (string)Y444_10BE, (string)Y444_10LE, (string)GBR, (string)GBR_10BE, (string)GBR_10LE, (string)NV16, (string)NV24, (string)NV12_64Z32, (string)A420_10BE, (string)A420_10LE, (string)A422_10BE, (string)A422_10LE, (string)A444_10BE, (string)A444_10LE, (string)NV61, (string)P010_10BE, (string)P010_10LE, (string)IYU2, (string)VYUY, (string)GBRA, (string)GBRA_10BE, (string)GBRA_10LE, (string)GBR_12BE, (string)GBR_12LE, (string)GBRA_12BE, (string)GBRA_12LE, (string)I420_12BE, (string)I420_12LE, (string)I422_12BE, (string)I422_12LE, (string)Y444_12BE, (string)Y444_12LE, (string)GRAY10_LE32, (string)NV12_10LE32, (string)NV16_10LE32 }
                  width: [ 1, 2147483647 ]
                 height: [ 1, 2147483647 ]
              framerate: [ 0/1, 2147483647/1 ]
      video/x-raw(ANY)
                 format: { (string)I420, (string)YV12, (string)YUY2, (string)UYVY, (string)AYUV, (string)RGBx, (string)BGRx, (string)xRGB, (string)xBGR, (string)RGBA, (string)BGRA, (string)ARGB, (string)ABGR, (string)RGB, (string)BGR, (string)Y41B, (string)Y42B, (string)YVYU, (string)Y444, (string)v210, (string)v216, (string)NV12, (string)NV21, (string)GRAY8, (string)GRAY16_BE, (string)GRAY16_LE, (string)v308, (string)RGB16, (string)BGR16, (string)RGB15, (string)BGR15, (string)UYVP, (string)A420, (string)RGB8P, (string)YUV9, (string)YVU9, (string)IYU1, (string)ARGB64, (string)AYUV64, (string)r210, (string)I420_10BE, (string)I420_10LE, (string)I422_10BE, (string)I422_10LE, (string)Y444_10BE, (string)Y444_10LE, (string)GBR, (string)GBR_10BE, (string)GBR_10LE, (string)NV16, (string)NV24, (string)NV12_64Z32, (string)A420_10BE, (string)A420_10LE, (string)A422_10BE, (string)A422_10LE, (string)A444_10BE, (string)A444_10LE, (string)NV61, (string)P010_10BE, (string)P010_10LE, (string)IYU2, (string)VYUY, (string)GBRA, (string)GBRA_10BE, (string)GBRA_10LE, (string)GBR_12BE, (string)GBR_12LE, (string)GBRA_12BE, (string)GBRA_12LE, (string)I420_12BE, (string)I420_12LE, (string)I422_12BE, (string)I422_12LE, (string)Y444_12BE, (string)Y444_12LE, (string)GRAY10_LE32, (string)NV12_10LE32, (string)NV16_10LE32 }
                  width: [ 1, 2147483647 ]
                 height: [ 1, 2147483647 ]
              framerate: [ 0/1, 2147483647/1 ]
  
  SRC template: 'src'
    Availability: Always
    Capabilities:
      video/x-raw
                 format: { (string)I420, (string)YV12, (string)YUY2, (string)UYVY, (string)AYUV, (string)RGBx, (string)BGRx, (string)xRGB, (string)xBGR, (string)RGBA, (string)BGRA, (string)ARGB, (string)ABGR, (string)RGB, (string)BGR, (string)Y41B, (string)Y42B, (string)YVYU, (string)Y444, (string)v210, (string)v216, (string)NV12, (string)NV21, (string)GRAY8, (string)GRAY16_BE, (string)GRAY16_LE, (string)v308, (string)RGB16, (string)BGR16, (string)RGB15, (string)BGR15, (string)UYVP, (string)A420, (string)RGB8P, (string)YUV9, (string)YVU9, (string)IYU1, (string)ARGB64, (string)AYUV64, (string)r210, (string)I420_10BE, (string)I420_10LE, (string)I422_10BE, (string)I422_10LE, (string)Y444_10BE, (string)Y444_10LE, (string)GBR, (string)GBR_10BE, (string)GBR_10LE, (string)NV16, (string)NV24, (string)NV12_64Z32, (string)A420_10BE, (string)A420_10LE, (string)A422_10BE, (string)A422_10LE, (string)A444_10BE, (string)A444_10LE, (string)NV61, (string)P010_10BE, (string)P010_10LE, (string)IYU2, (string)VYUY, (string)GBRA, (string)GBRA_10BE, (string)GBRA_10LE, (string)GBR_12BE, (string)GBR_12LE, (string)GBRA_12BE, (string)GBRA_12LE, (string)I420_12BE, (string)I420_12LE, (string)I422_12BE, (string)I422_12LE, (string)Y444_12BE, (string)Y444_12LE, (string)GRAY10_LE32, (string)NV12_10LE32, (string)NV16_10LE32 }
                  width: [ 1, 2147483647 ]
                 height: [ 1, 2147483647 ]
              framerate: [ 0/1, 2147483647/1 ]
```


```
$ git clone https://github.com/nnsuite/nnstreamer.git
$ cd nnstreamer
$ mk-build-deps -i ./debian/control --root-cmd sudo
$ ninja -C build
```

```
Dependency tensorflow-lite found: YES 1.14
```


https://patrickelectric.work/streaming_with_gstreamer/