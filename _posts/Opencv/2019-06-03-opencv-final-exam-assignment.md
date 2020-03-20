---
title: "Opencv 과제 ppt 공부할 내용 정리"
excerpt: "기말고사 범위"
date: 2019-06-03
categories:
  - Opencv
tags:
  - opencv

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

# CGV-2019-팀과제-동영상-edge_ 원본_영상_blending.pptx

## 공식
$ I = /alpha F + (1 - /alpha)B$ 단, $0<= /alpha <= 1$  

## 응용
Fade-out : 비디오 장면 전환 효과 – 화면이 서서히 어두워 짐.  
- 동영상 Frame 과 Background 의 blending α = 1 -> 0  

```txt
1. cv.SetCaptureProperty 는 CvCapture 객체의 속성값을 설정하며 cv.GetCaptureProperty 는 CvCapture 객체의 속성값을 가져온다.   
2. frames 에는 cv.GetCaptureProperty 의 CV_CAP_PROP_FRAME_COUNT 로 해당 동영상의 전체 Frame 수를 가져 온다. 이 값은 Trackbar를 초기화 할때 이용된다.  
3. cv.CreateTrackbar 는 Trackbar를 생성한다. 트랙바를 슬라이드 했을 때 호출되는 callback 함수  onTrackbarSlide 은 컨트롤 정보를 담고 있는 32bit 정수값을 인자로 받는다.
4. onTrackbarSlide 에서는 cv.SetCaptureProperty 중 CV_CAP_PROP_POS_FRAMES 속성을 변경하여 프레임의 위치를 변경한다. (CV_CAP_PROP_POS_AVI_RATIO 로 설정하면 전체 동영상 길이에 대한 현재 프레임 위치의 비율로 재생 위치를 변경한다.) 
```

ppt에 있는 사진 붙히기  

# CGV-2019-영상-Edge_Detection.pptx

## 마스크 별 특징 분석

1. Sobel Mask : 수평과 수직보다 대각선 에지에 잘 반응
2. Prewitt Mask : 대각선 에지보다 수직, 수평 에지에 잘 반응
3. Roberts Mask : 잡음에 민감하여 돌출된 값을 평균화 시키는데 좋다.


 

