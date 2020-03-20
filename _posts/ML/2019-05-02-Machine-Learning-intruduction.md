---
title: "Machine Learning 개론"
excerpt: "역시, 미래는 Machine Learning이다. - niklasjang-"
date: 2019-05-02
categories:
  - ML
tags:
  - introduction
teaser: /assets/images/neural_network.jpg
toc_label: "Table of contents"
toc_icon: "heart"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

Goal : Machine Learning이 무엇인지, 왜 세상을 아름답게할 수 있는 기술인지 이해한다.
---


## 개념

Machine Learning은 A.I.의 한 분야이며, ML 안에서도 다양한 분야로 구분됩니다. ML의 세부 분야는 대략 아래와 같습니다.

1. Computer Vision
2. Natural Language
3. Reasoning
4. Speech Recognition 


### Reasoning?
추상적으로 보이는Reasoning을 간단히 설명해보겠습니다. 수 많은 데이터들에서 피부암의 형태를 가지는 데이터를 찾는 A.I. S/W를 만들 수 있을 것입니다. 하지만 이것보다 더 어려운 것은 A.I.가 Think하게 만들어서 정말로 피부함이 무엇인지 알게만드는 것은 훨씬 더 어려운 문제입니다. 쉽게 말에서 인간이 주어준 특정 데이터 패턴보다 더 효과적인 데이터 패턴이 무엇인지 스스로 생각할 수 있는 로봇을 만드는데 중점을 두는 것이 Reasoning이라고 합니다.  

알파고는 가능한 모든 경우의 수를 `game tree algorithm`으로 연산한 후 최적의 값을 도출해서 출력합니다. 인간이 결과물만 놓고 보기에는 Intelligence인 것처럼 보이지만, 인간은 이렇게 사고하지 않습니다. 알파고는 수 많은 데이터들을 통해서 `학습`을 한 결과를 보여줄 뿐입니다. 수 많은 데이터들이 입력되지 못하면 그저 깡통일 뿐입니다. 우리가 영화에서 보아온 A.I.는 스스로 데이터를 만들고 과거의 경험을 통해서 배웁니다. 그리고 인간이 실제로 만들고 싶은 형태로 이러한 Intelligence를 가지는 로봇입니다.  

아직은 알파고가 가지는 `game tree algorithm`같은 것도 `reasoning`이라고 부릅니다. 매우 제한된 frame에서의 전략이지만요. 아니면 Insta에서 사용하는 '당신이 좋아할만한 영상' 추천 목록도 제한된 수준의 `reasoning`이라고 할 수 있겠네요.  

## Why ML?
Reasoning이 아닌 다른 세 가지 분야 그리고 제가 알지 못하는 다른 모든 세부 분야는 모두 '기계에게 학습을 시켜서 인간이 원하는 결과를 얻기 위해' 존재합니다. 영상을 처리해서 특정 패던을 찾거나 사람을 찾을 수도 있고, 복잡한 소리 속에서 특정 인물의 목소리를 찾아서 또렷하게 만들 수도 있을 것 같습니다. 제가 최근에 본 연구는 자율 주행 자동차에 ML을 적용 시켜서 카메라로 촬영한 도로의 상태를 실시간으로 받아옵니다. 그리고 도로의 Feature를 찾아서 도로를 detect하고 도로가 기울어지는 방향으로 회전을 합니다. 이 연구에서 놀라웠던 것은 자동차가 왜, 어떤 이유로 오른쪽으로 회전을 했는지를 역으로 영상에 표시해주는 과정을 구현했다는 점입니다.  

로봇에게 컵을 집으라고 명령을 내리고 로봇이 이를 수행하는 과정에서는 카메라로 촬영한 영상에서 Edge를 찾아서 물체를 detect 하고, 로봇의 어깨에 3D joint, 팔꿈치에 1D joint, 손목에 3D joint 총 7개의 joint에 매 순간순간 적당한 theta값을 주는 과정을 필요로 합니다. (손가락의 관절은 제외했습니다.) 하지만 인간이 이를 손으로 계산하거나 정확한 수식을 만들어서 적용하기는 어렵습니다. 제 방식대로 표현하면 **'왜 되는지 모르겠는데, 되는 그 값'**을 찾아주는 방법이 ML이라고 생각합니다. 그리고 이 값들은 어떤 방식으로든 인간을 이롭게 하고 행복을 하게 해주겠죠. 그리고.. 개발자는 아마 부자가 될껍니다.

## Posting 순서, 공부 순서

이 부분에 대해서는 아직 잘 몰라서 한국 항공대의 최영식 교수님께서 강의해주신 내용만 그대로 옮겨 적겠습니다. 제가 더 공부하고 똑똑해진 다음에 본 포스팅을 수정하겠습니다.

1. Machine Learning
2. Neural Network
3. Deep Learning

## Reference
1. [machine-learning-vs-machine-reasoning-know-the-difference](https://edgy.app/machine-learning-vs-machine-reasoning-know-the-difference)
