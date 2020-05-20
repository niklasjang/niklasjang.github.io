---
title: "[NNStreamer]Smart Reply 이해하기 "
excerpt: "Tensorflow-lite basic model"
date: 2019-09-25
categories:
  - NNstreamer
tags:
  - nnstreamer
  - smart-reply
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## Demo APK 설치

[여기](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/lite/models/smartreply/g3doc#how-to-use-this-model)에서 (demo APK here)를 클릭해서 APK를 받아서 설치합니다. 이 앱은 텍스트를 입력하면 적절한 대답을 생성해주는 기능을 합니다.

## Model 이해하기

1. 문맥에 따라 관련있는 대답을 one-touch로 작성할 수 있도록 도와주는 기능
2. device 내부적으로 동작하여 인터넷 연결이 필요없다. ms 단위의 평균 latency를 가질만큼 빠르다.
3. 메모리를 적게 먹는다.
4. 유저 데이터를 유출하지 않는다.
5. 클라우드를 연결해서 사용하는 클라우드 모델보다 incomimg message에 대답을 제안하는 trigger rate는 부족한 모습을 보인다.
6. 이 모델이 잘 동작하는 유형의 메시지는 [여기](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/lite/models/testdata/smartreply_samples.tsv)에서 볼 수 있다. 현재는 이 파일에 있는 답변과 비슷한 상황에서 잘 동작하며 약 30-40%의 trigger rate를 보여준다.
7. trigger rate가 동작하지 않는 곳에서는 fallback 기능의 답변(Ok, Yes, No, 👍, ☺.)을 보여준다. 

1. Input Data : The input string can be 1-3 most recent messages of the conversations in form of string vector.
2. 문장 단위로 분할
3. normalization(“how are you????” ->  “how are you?”)
4. input strings을 tensor로 변환한다. 
5. Run the prediction model
6. Output



## 출처

[tensorflow-lite Repo](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/lite/models/smartreply/g3doc)

