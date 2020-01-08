---
title: "[Convex Hull] 컨벡스 헐 "
excerpt: "CCW를 사용한 구현"
date: 2019-06-08
categories:
  - Algorithm
tags:
  - Kruskal
  - MST

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 목적

모든 노드들을 감싸는 가장 작은 볼록 다각형을 구한다.

## 동작 원리

![convex-hull-1](/assets/images/algorithm/convex-hull-1.jpg)  
하나의 기준 노드를 설정한다. 보통 y축 좌표가 가장 낮은 점(1번 노드)을 선택한다.

![convex-hull-2](/assets/images/algorithm/convex-hull-2.jpg)  
가장 선택한 가장 낮은 점을 기준으로 그린 x축에 대해서 각이 작은 순서대로 정렬한다.

![convex-hull-3](/assets/images/algorithm/convex-hull-3.jpg)  
정렬된 노드들 중 1번과 2번은 항상 Convex-hull의 구성요소가 된다. 모든 노드들을 감싸는 가장 작은 볼록다각형의 정의를 가지므로, convex-hull은 1번과 2번을 반드시 포함한다. convex-hull을 구할 때 노드A에서 노드B로 가는 에지를 생각하기 보다는 어떤 노드가 convex-hull을 구성하기 위해서 사용되는지 여부를 판단한다고 생각하면 된다.  

convex-hull을 구성하는 모든 노드들을 stack 넣을 것이다. 위 그림에서 가로로 긴 파란 사각형은 stack을 의미한다. 가장 위의 stack에서 몇 개의 노드를 뺀 상태가 그 아래의 파란 stack이고, 다시 몇 개의 노드를 넣은 모습이 가장 아래의 파란 stack이다. 파란 사각형의 왼쪽이 Bottom이고 가장 오른쪽을 stack의 top 이 가리키고 있다.  

다음으로는 아래의 연산을 진행한다.

1. stack에서 가장 top에 있는 두 개의 값을 꺼내서 First와 Second로  설정한다.
2. 그리고 아직 Stack에 들어간 적이 없는 가장 작은 노드를 Next로 설정한다.
3. First에서 Second로, Second에서 Next로 가는 두 개의 에지에 대해서 CCW를 적용한다. 결과가 양수(좌회전)이면 First,Second,Next를 모두 Stack에 넣는다.  

![convex-hull-4](/assets/images/algorithm/convex-hull-4.jpg)  

1. Stack에서 가장 top에 있는 두 개를 꺼내서 First와 Second로 설정했다. 현재 Stack에는 1만 남아있다.
2. 아직 Stack에 들어간 적이 없는 가장 작은 노드 4번을 Next로 설정한다. 
3. CCW의 결과가 좌회전이므로 2,3,4를 모두 Stack에 넣는다.

![convex-hull-5](/assets/images/algorithm/convex-hull-5.jpg)  

1. Stack에서 3과 4를 꺼내서 각각 first와 Second로 설정한다.
2. 아직 Stack에 들어간 적이 없는 가장 작은 노드 5를 Next로 설정한다.
3. CCW의 결과 우회전하므로 First는 Stack에 넣고, Second는 버린다.
4. Next는 아직 Stack에 들어간 적이 없다.

![convex-hull-6](/assets/images/algorithm/convex-hull-6.jpg)  

1. Stack에서 2와 3을 꺼내서 각각 First와 Second로 설정한다.
2. 아직 Stack에 들어간 적이 없는 가장 작은 노드 5번을 Next로 설정한다.
3. CCW의 결과가 양수이므로 따라서 2,3,5를 모두 Stack에 넣는다.

![convex-hull-7](/assets/images/algorithm/convex-hull-7.jpg)  

1. 앞에서와 같이 CCW의 결과가 양수이므로 3,5,6을 Stack에 넣는다.

![convex-hull-8](/assets/images/algorithm/convex-hull-8.jpg)  

1. CCW의 결과가 음수이므로 First만 Stack에 넣는다. Second는 버린다.
2. 7은 아직 Stack에 들어간 적이 없다.

![convex-hull-9](/assets/images/algorithm/convex-hull-9.jpg)  

1. 앞에서와 같이 CCW의 결과가 양수이므로  3,5,7을 Stack에 넣는다.

![convex-hull-10](/assets/images/algorithm/convex-hull-10.jpg) 

1. 앞에서와 같이 CCW의 결과가 양수이므로 5,7, 8을 Stack에 넣는다.

![convex-hull-11](/assets/images/algorithm/convex-hull-11.jpg)  

1. 앞에서와 같이 CCW의 결과가 양수이므로 7,8,9을 Stack에 넣는다.  

![convex-hull-12](/assets/images/algorithm/convex-hull-12.jpg) 

1. 앞에서와 같이 CCW의 결과가 양수이므로 8,9,1을 Stack에 넣는다.
2. 첫 번쨰 노드는 처음에 넣고 시작했으므로 첫 번째 노드를 넣는 순간을 감지해서 알고리즘을 종료한다. 
![convex-hull-13](/assets/images/algorithm/convex-hull-13.jpg)  

1. Stack에 들어있는 노드들을 모두 연결하면 Convex-hull이 된다. 그림에서는 Bottom에서 Top으로 화살표가 이어지는데 (잘못그렸다.) 어쨌든 convex-hull에 들어가는 모든 노드들을 찾았다. 

