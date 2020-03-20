---
title: "Lecture 10. Atomic Action"
excerpt: "Semaphor의 배경"
date: 2019-06-15
categories:
  - OS
tags:
  - OS
  - atomic-action

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---


## 배경

두 명의 사람이 있습니다. 생산자와 소비자입니다. 이들은 각각 `공유 메모리`에 데이터를 채우는 역할과 사용하는 역할을 맡습니다. 커널의 메모리는 Text,Data,BSS,Stack(이하 TDBS)로 나뉘어져서 여러 프로세스들에 의해 공유되어 사용됩니다. 공유 메모리는 `Circler Queue`의 형태로  표현될 수 있고, 이는 TDBS의 BSS 부분에 위치합니다.  

여러 프로세스를 사용할 때, 어느 프로세스에는 생산자를 만들고 다른 프로세스에는 소비자를 만들면 조금 복잡해집니다. 하나의 프로세스 안에 생산자와 소비자를 Thread의 형태로 만들면 더욱 간단하게 생산자와 소비자의 개념을 구현할 수 있습니다. 이는 프로세스 내부의 공유 메모리를 사용하는 것이 더 간편하기 때문입니다.  

Thread의 몸통은 Function입니다. 여러 Thread가 도는 것은 각각의 Thread가 각자의 Function을 수행시키는 것으로 이해할 수 있습니다. (ROS에서는 Subscriber에 붙혀지는 Callback함수가 Thread를 구현한 형태입니다.)  

Fuction의 기능이 서로 독립적이라는 것은 Thread를 만들기 좋다는 의미입니다.  

병렬 프로세스는 거의 공유 메모리를 가집니다.  

Thread도 CPU/I.O. bound job을 구분해서 가집니다.  

다시 언급이 없을 때까지 Scheduling의 대산을 Process가 아니라 Thread입니다. 

## Atompic Action이란?

두 명의 사람이 있습니다. 이들은 냉장고에 항상 우유가 있기를 바랍니다. A가 냉장고에 우유가 없는 것을 확인하고 우유를 사러갑니다. 뒤늦게 냉장고를 확인한 B도 냉장고에 우유가 없으므로 우유를 사러 갑니다. 잠시 뒤에는 냉장고에 우유가 너무 많은 상황이 벌어집니다.  

`Atomic Action`이란 이와 같은 상황을 방지하기 위한 방법입니다. 두 개의 Thread가 하나의 변수에 접근을 합니다. Thread A도 변수 num을 +1 시키고 B도 num을 +1 시킵니다. 이후에 A와 B가 변수 num에 접근하면 이들을 모두 num+2의 값을 확인하게 되어 둘 다 만족스러운 결과를 얻지 못합니다.  

이를 해결하기 위해서는 A가 우유를 사온것을 확인한 B는 우유를 냉장고에 넣는 것이 아니라 다시 환불하러 가야합니다. 즉, A가 우유를 사온 것을 확인한 순간 B의 행동은 쓸모가 없게 되었습니다. 이때 **되다가 말면 아무것도 안한 것으로 처리해야한다.**라는 Atomic Action의 개념이 적용됩니다. Thread A가 변수를 이미 +1 시켰으면 Thread B는 num +1를 시키면 안된다는 의미입니다. 또는 **Context Switching이 안일어나게 한다.**라는 의미로 Atomic Action이 사용되기도 합니다.  

## 용어 정리 : Synchronization Terminology

중요합니다. 이 개념이 흔들리면 뒤에서 자꾸 헷갈립니다.  

1. Synchronization (동기화): 다수의 Thread가 정확한 협업을 **보장** 하기 위해서 Atomic operation을 진행하는 것을 의미합니다. 예를 들어서 휴대폰 캘린더에 있는 데이터를 다른 앱에 옮길 때에 동기화가 제대로 안된다면, 가져오지 못한 데이터가 발생하거나 중복되게 가져온 데이터가 발생합니다.  
2. Mutual Exclusion (MUTEX, 상호 배타성) : Atomic Action을 제대로 수행하기 위한 방법으로 MUTEX의 개념이 사용됩니다. 오직 하나의 Thread만 변수의 값을 바꾸는 것과 같은 특정한 행동을 할수 있도록 다른 Thread의 접근을 막는 것을 말합니다.
3. Critical Section(region) (이하 CS) : MUTEX의 개념이 적용 되어야 하는 코드를 의미합니다. 여러 Thread가 동시에 접근해서 값에 변화를 주면 냉장고 우유가 너무 많은 상황이 벌어지므로, MUTEX의 개념을 적용해야하는 부분을 의미합니다.
4. LOCK : 하나의 Thread가 CS에서 작업을 하고 있을 때, 다른 Thead가 접근을 하지 못하게 막는 mechanism입니다. 어떻게 다른 쓰레드의 접근을 막는가?에 대한 개념이라고 보시면 됩니다. LOCK은 크게 3가지의 개념을 수행합니다.

- Lock before entering a CS.
- Unlock when leaving a CS.
- Thread wanting to enter a locked CS must wait until it's unlocked.

정확하게 기억하면 좋은 부분은 CS에 들어갈 때 Lock이,  CS에서 나갈 때  Unlock이 이루어진다는 점입니다. 위 Lock의 3가지 개념은 아래의 두 가지 상황을 반드시 피하면서 진행되어야 합니다.

1. Starvation : 하나의 Thead가 CS에 들어가기 위해서 wait합니다. 기다리고 있는 이 Thread는 언젠가는 CS에 들어갈 수 있음이 보장되어야 합니다. CS에 들어가기 위해서 기다리고 있는 queue에서 CPU를 얻지 못해서 굶어 죽으면 안된다는 의미입니다.
2. Deadlock : 전체 시스템이 멈추지 않고 돌아가야함을 의미합니다. 하나의 CS에 들어가려는 많은 Thread가 있을 때 하나의 Thread는 반드시 CS에 들어가있거나, 들어가야함을 의미합니다. 예를 들어서 CS에 들어가고 싶은 Thread A,B가 있습니다. 그런데 CS에 들어가기 위한 조건이 자원 C,D를 모두 갖고 있는 것이라고 합니다. 그런데 A는 C를, B는 D를 가지고 있으면서 서로의 자원을 가지려고만 합니다. Thread가 자신이 가진 자원을 놓은 것은 CS를 지난 이후이기 때문에, 이 상황에서는 A,B 모두 CS에 들어가지 못하는 Deadlock에 걸립니다.  

또한 중요한 하나의 가정이 필요합니다. 기본적으로 Thread는 잠을 잘 수 있습니다. 예를 들어서 Join()은 다른 쓰레드가 끝나기를 기다리는 메서드입니다. 이와 같은 잠자는 메서드는 non-CS에서는 가능하지만, CS에서는 불가능하다는 점입니다. CS에 들어오고 싶은 Thread가 많은데 CS에서 잠들면, CS를 나오면서 unlock을 하지 못해서 다른 Thread가 계속 기다려야하기 때문입니다.  

## 알고리즘 

위에서 설명한 개념을 구현하기 위한 여러가지 알고리즘을 알아보겠습니다. 아래는 CS 부분에 집중한 알고리즘 입니다. 코드 전체적으로는 Parallel하게  수행되지만 CS 부분에서는 Waiting을 하는 등 Sequantial하게 수행됩니다. Sequantial 하게 수행되는 것은 Multi-threading의 개념에 반하는 것 같지만 결국에는 전체적으로 Sequntial하게수행하는 것보다 더 좋은 성능을 보이기 때문에 여전히 의미를 가집니다.   

### Algorithm 1

이글루 안에는 칠판 하나가 있습니다. 이글루는 오직 한 사람만 들어갈 수 있을 정도로 작습니다. 칠판에는 딱 하나의 숫자만 적을 수 있습니다. CS에 들어가고 싶은 Thread는 이글루 안의 칠판을 확인해봐야합니다. 만약 칠판에 자신의 숫자가 적혀있지 않다면 이글루 밖을 나가서 주의를 빙빙 돌면서(Busy Waiting)기다립니다. 잠시 뒤에 이글루 안의 칠판을 다시 확인합니다. 칠판에 자신의 숫자가 없다면 다시 주의를 빙빙 돌고, 자신의 숫자가 있다면 CS에 들어갑니다. CS에서 나온 후 다음에 CS에 들어가야하는 Thread의 번호를 적어놓습니다.  

//TODO : 문제점

### Algorithm 2

각각의 Thread는 자신의 이글루를 가지고 있습니다. 그리고 모든 이글루에는 칠판이 하나씩 있습니다. 모든 Threa는 자신의 칠판에 대해서는 관찰과 수정을 모두 할 수 있습니다. 하지만 다른 Thread의 칠판은 관찰만 할 수 있습니다. 칠판에 True라고 적혀있으면 그 Thread가 CS에 들어있는 상태를 말합니다. 다른 Thread의 칠판을 확인하고 False 라고 적혀있으면 자신의 이글루로 돌아와서 Thread에 True라고 적고 CS에 들어갑니다. CS에서 나오면 자신의 칠판을 다시 False라고 고칩니다.  

//TODO : 문제점

### Algorithm 3

<Peterson's algorithm>
심판이 등장합니다. 이 심판은 어떤 Thread의 차례인지 추적해서 알려줍니다. 만약 두 개의 Thread가 동시에 CS에 들어가고 싶어하면 심판은 어떤 Thread가 우선순위를 가지는지 알려줍니다.

<Lamport's Bakery algorithm>
CS에 들어가고 싶은 Thread가 N개 일때 적용되는 알고리즘입니다. CS에 들어가고 싶은 Thread는 점점 더 높은 숫자를 할당받습니다. 그리고 충돌이 발생할 떄에는 더 작은 숫자를 가지고 있는 Thread가 CS에 들어갑니다. 이 숫자마저 똑같을 때에는 PID를 비교해서 더 작은 수의 Thread가 CS에 들어갑니다. 

//TODO 문제점

## CS를 잘 처리하기 위한 3가지 조건

1. Progress : 공유 공간에서 잠자면 안됨. CS안에 있는 애는 나와야하고 기다리고 있으면 들어가야 한다.
2. Bounded waiting : 무한히 잠자면 안됨. 공정함을 보장하진 못한다. 누구는 오랫동안 못들어 갈 수도 있다. 1,2,3이 기다리고 있을 때 우선순위에 따라서 1,2,1,2, 반복해서 들어가고 3은 오랫동안 기다릴 수도 있다. 결국에는 들어갈 수 있다는 말이지 매번 공평하게 기다렸다가 들어감을 의미하지는 않는다.
3. MUTEX : 오직 한 사람만 실행

## 수도 코드

```cpp
do{                       //(1) 초기화
    entry section         //(2) 진입
        critical Section  //(3) CS
    exit section          //(4) 빠려나옴
        reminder sectoin  //(5) 나머지 부분
}
```

위 (1)~(5) 중에서 MUTEX해야하는 부분은 (3)과 (4)입니다. CS 부분은 혼자만 들어가야함이 명확합니다 (4)또한 CS에 다른 Thread가 들어올 수 있도록 unlock하는 부분이므로 하나의 Thread만 접근할 수 있어야 합니다. 

## Kernel의 CS

Kernel에는 CS가 많아서 Kernel code를 수행하다가 Context Switching이 이루어지면 즉시 변경하는 것이 아니라 어느정도 정해진 부분까지는 수행을 하다가 Context Switching을 진행합니다. 이는 Remainder 영역이라고 할 수 있으며 자세한 내용은 학부의  수준을 넘어선다고 합니다.




