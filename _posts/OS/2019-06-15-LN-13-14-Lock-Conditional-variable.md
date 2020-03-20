---
title: "Lecture 13.~15. LOCK & Condition variable"
excerpt: "OS에서 제일 재밌는 부분"
date: 2019-06-15
categories:
  - OS
tags:
  - OS
  - Lock
  - Condition-Variable
  - Monitor
  - Dining-Philosophers
  - Dead-Lock

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 복습

세마포를 사용할 때 자주 동기화 에러가 발생할 수 있습니다. 그래서 아래의 방법을 사용했습니다.  

$region V when B do S$  

공유 variavle V가 사용되는 구역에서는 Boolean expression을 사용해서 access(If ony B true)를 하고, statement S를 실행했습니다.  

또 다른 방법으로는 Monitor가 있는데, 뒤에서 알아보겠습니다.

## Frome Semaphor to Locks & Condition Variable

세마포를 사용하는 목적은 두가지입니다.

1. Mtual Exclusion : MUTEX : protect shared data
2. Synchronization : 일시적으로 이벤트들을 연결해줍니다. 예를 들어서 V()가 실행될 때 P()에 서 기다리는  Thread가 있다면 그 쓰레드를 꺠워줍니다. V()를 실행하면서 멈춰있는 P()를 다시 실행시킬 수 있는 것입니다. 

이 두 가지 기능을 달성하기 위해서 Semaphor라는 개념을 생각해냈는데 변수 하나만으로는 잘 안됩니다. (//TODO) 그래서 두 개의 목적을 분리해보겠습니다.  

## LOCK : for MUTEX

### 목적

공유 데이터에 상호 배타적인 접근을 가능하게 한다. Lock은 lock 되거나 unlock 될 수 있다.

### Operations

1. Lock(*name) : name을 가지는 새로운 Lock을 생성합니다.
2. Lock::Acquire() : Lock이 unlock될 때까지 기다렸다가, CS에 들어가고(//TODO 맞는지 확인) 다시 lock 합니다.

3. Lock::Release() : Lock을 unlock 합니다.. 그리고 Lock::Acquire()에서 기다리고 있는 Thread 중 하나를 깨웁니다. 

### Implementation

Binary Semaphor를 사용해서 간단하게 구현할 수 있습니다. private lock semaphor를 생성하고 P와 V를 사용하면 됩니다.

### Convention

1. Lock::Acquire(): 공유 데이터에 접근하기 `전에` 특정 lock 에 대해서 Lock::Acquire()를 호출한다. 이미 Acquire 되어있는 Lock에 다시 Acquire를 하면 에러가 발생한다.
2. Lock::Release() : 공유 데이터에 접근하고 난 뒤 같은 Lock에 대해서 Lock::Release()를 호출한다. 

```cpp
//Thread A and B execute this code seperatively

milk->Acqure();      //(1)
if(noMilk);          //(2)
    buy milk;        //(3)
milk->Release();     //(4)
```

위 코드는 Semaphor를 사용했던 아래의 코드와 100% 똑같이 작동합니다.

```cpp
//Thread A and execute this code seperatively

milk->P();     //(1)
if(noMilk);    //(2)
    buy milk;  //(3)
milk->V();     //(4)
```

## Lock vs. Condition Variable

아래의 코드에서 문제점을 찾아보겠습니다. 

```cpp
//Thread A and execute this code seperatively

Queue::Add(){
  lock -> Acquire();
  add item;
  lock -> Release();
}

Queue::Remove(){
  lock -> Acquire();
  if( item on queue){
      remove item;
  }
  lock -> Release;
  return item;
}
```

Remove의 조건문에 따라서 Queue에 아이템이 있는 경우에만 remove item을 수행합니다. 하지만 Queue에 삭제할 item이 들어올 때까지 기다릴 수 있으면 더 좋을 것 같습니다. 여기서 아이템은 Lock::Acquire()에서 Unlock 되기를 기다리는 Thread가 아니라 상황에 따라 달라지는 item입니다. Queue에 item이 하나 더 추가될 수도 있고 그저 변수의 값이 달라지는 것일 수도 있습니다. 이 예시에서 item은 Queue에 item이 push 되는 것을 의미합니다. 

하지만 Queue가 비어있다고 해서 바로 Sleep 상태로 넘어갈 수는 없습니다. Thread아 lock을 가지고 잠들면, 다른 Thread는 Acquire에서 Wait해야하므로 Queue에 item을 push할 수 없어, Queue에 item에 들어오기를 기다리는 Thread는 영원히 sleep을 합니다.  

이 때 추가되는 개념이 `Condition Variable`입니다.(이하 CV) **CV는 thread가 CS안에서 잠들 수 있도록 허용합니다. 이 때 반드시 잠드는 동안에 lock을 release해야합니다. sleep에서 깨어나면 다시 이 Thread가 lock을 Acquire합니다.(Condition::wait(conditionLock))** 

## Condition Variable : for Synchronization

### Operations on CV (Nachos syntax)

1. Condition(*name) : 특정한 이름을 가지는 새로운 CV의 instance를 생성합니다. 개발자는 반드시 새로운 CV를 생성한 후 에 Lock::Lock(), 생성자, 을 호출해야 합니다. 이렇게 생성된 Lock은 CV와 연동이 됩니다. 연동이 된 Lock은 아래의 두 연산자에서 conditionLock으로 표현됩니다. 
2. Condition::Wait(conditionLock) : lock을 Release 하고 wait(sleep)합니다. sleep을 했던 Thread가 깨어나면 즉시 Lock::Acqure()을 통해서 lock을 가지려고 합니다. 이 Condition::Wait()는 다시 lock을 가지는 순간 return됩니다.
3. Condition::Signal(conditionLock) : 만약에 lock을 기다리는 다른 Thread들이 있다면, 이 중 하나를 깨우고 ready list에 넣어줍니다. 만약 기다리는 Thread가 없다면 아무것도 하지 않습니다.
4. Condition::Broadcast(conditoinLock) : 만약에 lock을 기다리는 다른 Thread들이 있다면, 이들 모두를 깨우고 ready list에 넣어줍니다. 만약 기다리는 Thread가 없다면 아무것도 하지 않습니다.  

아직 CV가 어떻게 작동하는지 잘 모르겠습니다. 아래의 코드를 보겠습니다.  

```cpp

Lock *lk;
Condition *c;

/*Producer*/
while( True ){
  lk->Acquire();
  produce next item;
  avail++;
  c->Signal(lk);
  lk->Release();
}
```

```cpp
int avail = 0;
/*consumer*/
while( True){
  lk -> Acquire();
  if( avail == 0){
    c -> Wait(lk);
  }
  consume next item;
  avail--;
  lk -> Release();
}
```

부분적으로 나눠서 보겠습니다. 먼저  lk -> Acquire(); 와 lk -> Release();는 MUTEX한 접근을 가능하게 합니다. 이제 위에서 언급한 *Queue에 삭제할 item이 들어올 때까지 기다리기*가 어떻게 구현됐는지 보겠습니다.  

Producer의 코드를 보면 Lock을 가지면 아이템을 추가하고 avail++를 진행합니다. 그리고 c->signal을 하는데 signal은 lock을 기다리고 있는 Thread가 없으면 아무것도 하지 않습니다. 그래서 지금은 무시하고 넘어갑니다. 그리고 lk를 Release합니다.  

Consumer의 코드를 보면 Producer가 lk를 Release하는 순간 lk->Acquire이 실행됩니다. 그리고 소비 가능한 아이템이 있으면 그 아이템을 소비하고 avail--;를 합니다. 그리고 lk->Release를 합니다. 만약에 Producer가 아이템을 만들고 avail을 ++하기 전에 Consumer 코드가 먼저 실행됐다면, consumer는 C->wait(lk)를 호출합니다. 이는 Lock instance인 lk와 연동된 c를 사용해서 lk가 Release 되기를 기다리는 메서드입니다. Consumer는 lk를 Release하기 전에 c->wait(lk)를 호출했으므로 lk를 Release 해줄 수 있는 Thread는 producer뿐입니다. producer의 lk가 Release 되었다는 것은 c->signal(lk)를 통해서 Consumer를 깨웠다는 의미입니다. 그리고 Producer가 lk->Release를 하는 순간, 깨어나 있는 Consumer는 c->wait(lk)에서 lk을 re-acquire()할 것입니다.  

1. Consumer : lk -> Acquire();
2. Consumer : if( avail == 0) c -> Wait(lk);
3. Consumer : lk->Release() (Wait(lk)안에서)
4. Producer : lk->Acquire();
5. Producer : produce next item; avail++;
6. Producer : c->Signal(lk);
7. Consumer : c->wait(lk)에서 깨어나서 lk->re-acquire() 시도
8. Producer : lk->Release();
9. Consumer : c->wait(lk)에서 lk->re-acquire() 성공
10. Consumer : consume next item; avail--;
11. Consumer : lk -> Release();

## Comparing Semaphor and Condition Variable

//TODO : Does this work?

### Semaphor hava a value, CV do not!

Semaphor의 V()는 기다리고 있는 Thread가 없어도 항상 value의 값을 +1 합니다. 나중에 다른 Thread가 s->P()를 호출한다면, s를 -1 시키고 계속해서 CS에 들어갈 것입니다. 즉, 여러번 V를  호출한다면, P를 여러번 실행했을 때 CS에 다수의 Thread가 들어갑니다. 이러면 안되죠!

```cpp
//P(s) or Wait(s)
wait(s){
    s = s -1;
    if(s<0){
        뒤늦게 wait(s)를 call한 Thread를 block합니다.
    }else{
        CS는 비어있습니다. 따라서 해당 Thread가 cS에 들어갑니다.
    }
}
```
```cpp
//V(s) or signal(s)
signal(s){
    s = s+1;
    if(s<=0){
        기다리고 있는 Thread 중 하나를 깨우면 됩니다. 
    }
}
```

하지만 CV의 signal은 기다리고 있는 Thread가 없으면 아무런 효과도 가지지 않습니다. 때문에 얼마나 많은 signal이 호출됐었는지와 상관없이 CV->wait()를 실행하면 wait 합니다. signal을 wait 내부에서 sleep 하고 있는 Thread 중 1개를 깨우는 것 뿐입니다. 깨운 Thread가 lk를 acquire하는 것을 보장하지 않습니다. 즉, 많은 Thread들이 깨워졌다해도 (Ready-list에 다수의 Thread가 들어가 있어 lk을 re-acquire하려고 노력한다면) 단 하나의 Thread만 lock을 가져 CS에 단 하다의 Thread만 들어가는 것을 보장할 수 있습니다. 

```cpp

Lock *lk;
Condition *c;

/*Producer*/
while( True ){
  lk->Acquire();
  produce next item;
  avail++;
  c->Signal(lk);
  lk->Release();
}
```

```cpp
int avail = 0;
/*consumer*/
while( True){
  lk -> Acquire();
  if( avail == 0){
    c -> Wait(lk);
  }
  consume next item;
  avail--;
  lk -> Release();
}
```

### Hoare-style 과 Mesa-style

전자는 c->Signal(lk)을 수행할 때 lock을 포기합니다. c->wait(lk) 하고 있는 thread가 다음 Thread가 될 것을 보장합니다.  

후자는 signal을 수행할 때 lock을 포기하지 않습니다.  c->wait(lk) 하고 있는 thread를 ready queue에 넣습니다. 이 때 특정한 우선순위를 설정하지 않습니다. 따라서 c->wait(lk)하고 있는 Thread가 next thread가 되는 것을 보장하지 않습니다. 다른 Thread가 먼저 돈 뒤에 wait하고 있는 Thread가 실행될 수도 있습니다. 후자를 사용하면 wait를 `항상` while loop으로 감쌉니다.(//TODO) 

## Monitor

모니터는 P와 V를 반복하다가 V->P 또는 P->P를 진행하는 듯 순서가 엉키는 것을 막아줍니다. Monior는 Programming-language abstractiond으로서 자동으로 Lock과 Conditino Variable를 data와 associate 시켜줍니다. Monitor는 아래의 규칙을 가지고 이 개념을 구현합니다.  

1. A monitor includes private data and a set of atomic operations(member function)
2. A monitor also has a lock, and one or more conditino variables

1번은 오직 하나의 Thread만 monitor 코드를 실행할 수 있도록 하는 것입니다. Monitor function은 오직 Monitor data에만 접근할 수 있습니다. Monitor data는 MOnitor Function 안에서만 변경될 수 있습니다.  

2번은 Compiler가 자동으로 acquire operation을 각각의 monitor function 앞에 삽입하고 끝에는 release를 삽입합니다. 다양한 환경에서 하나의 Lock에 대해서 여러개의 CV들이 유기적으로 동작하도록 합니다. 

## Dining-Philosophers

5명의 철학자들이 한 집에서 살고 있습니다. 그들은 생각하거나 먹는 행동만 합니다. 그들은 5명이서 큰 원형 테이블에 앉아서 5개의 접시화 5개이 포크를 사용합니다. 먹기 위해서는 한 철학자가 자신에게 할당된 접시에 가고 접시의 양쪽에 있는 포크를 두 개 모두 사용해야 합니다. 철학자는 먹지 않는 동안 계속 생각하고 있습니다.  

하나의 포크는 반드시 한 명의 철학자가 사용해야 합니다. (MUTEX) 그리고 DEADLOCK을 피해야 하고, Starvation을 피해야 합니다. 

[Dining-Philosophers-예시](https://www.youtube.com/watch?v=trdXKhWAGdg)  

영상을 보면 항상 4명의 철학자만 먹을 수 있는 것을 볼 수 있습니다.  

//TODO code


