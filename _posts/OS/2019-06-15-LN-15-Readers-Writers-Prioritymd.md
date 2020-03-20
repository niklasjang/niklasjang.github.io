---
title: "Lecture 15. Readers-Writers-Priority"
excerpt: "좀 어려운 부분"
date: 2019-06-16
categories:
  - OS
tags:
  - OS

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## The Readers/Writers Problem

항공기 예약 시스템을 볼 때 여러 명의 사람들이 공유 데이터를 읽을 수도 있고 여러 사람이 공유 데이터를 쓸 수 있어야 합니다. 하지만 반드시 한 명의 Writer가 공유 데이터의 값을 변경하고 있을 때는 다른 어떤 사람도 해당 데이터에 접근하면 안됩니다. 

- RRR(OK)
- RWW(NOT-OK)
- RWR(NOT-OK)  

이를 해결하기 위해서는 R과 W의 우선순위를 정해야합니다.  

- R이 W보다 우선 순위가 높다.
- W이 R보다 우선 순위가 높다.
- 대부분의 경우 우선순위가 없는 집단은 starvation을 피하기 어렵습니다.  

## Readers & Writers

```cpp
//READERS
P(MUTEX);
readers++;
if(readers == 1){
    P(write);
}
V(MUTEX);

read database

P(MUTEX);
readers--;
if(readers == 0){
    V(write);
}
V(MUTEX);
```

```cpp
//WRITERS
P(Write);
write database;
V(write);
```
### Readers 설명  

1. reader 변수에 대해서 MUTEX한 접근이 보장되어야 합니다.  그래서 P(MUTEX)와 V(MUTEX)가 사용됩니다. 
2. 하지만 database를 읽고 있는 도중에는 MUTEX가 보장될 필요가 없습니다.
3. 만약 reader가 맨 처음의 reader라면, P(Write)를 진행합니다. Semaphor P()는 현재 CS에 누가 들어가 있으면 기다리고, CS에 있는 Thread가 semaphor V()를 진행하면서 깨워주는 것을 기다리는 명령입니다. CS에 아무도 없다면 CS에 들어갑니다.
4. 만약 다른 Thread가 read하려고 한다면 P(MUTEX);에서 기다리게 됩니다.
5. 최초의 Thread가 data base를 읽고 있을 때, 다른 Thread가 따라온다면 database를 같이 읽을 수 있습니다. 
6. 마짐가 Reading Thread가 끝날 때, waiting writer가 있다면 이 중 하나를 반드시 깨워야 합니다. 

### writer 설명

1. active writer가 있다면 뒤늦게 온 writer는 기다려야 합니다.
2. active reader가 있다면 writer는 기다려야 합니다.
3. write는 data base에 active reader와 active writer가 모두 없을 때 쓸 수 습니다.
4. writer가 쓰기 작업을 끝낸다면, Reader나 writer 상관 없이 하나를 깨워야 합니다.
5. 만약 Reader가 next가 된다면,  P(write);에서 나와서  V(MUTEX);를 지나 read database를 합니다. 
6. read database를 하는 최초의 Thread가 V(MUTEX);를 나오면 다른 Thread들은 P(MUTEX) 와  V(MUTEX)를 바로 통과해서 다같이 read database를 할 수 있습니다. 


## Readers & Writers Priority  

###  Using semaphor

- AW : Active Writer
- WW : Waiting Writer
- AR : Active Reader
- WR : Waiting Writer

```cpp
//Readers
P(MUTEX);
if(AW + WW > 0){ //만약 기다리거나 활동중이 Writer가 있으면
    WR++;        //기다립니다.
}else{           //만약 기다리거나 활동중이 Writer가 없으면
    V(OKToRead); //따라 들어온 Thread도 한 번에 읽을 수 있게 미리 -1해눕니다.
    AR++;        //읽습니다.
}
V(MUTEX);        //최초의 Read가 V(MUTEX)를 진행하면 다른 Thread도 따라 들어옵니다.
P(OKToRead);     //-1 한 결과가 음수가 아니므로 따라 들어온 Thread도 동시에 read database 합니다.

read database;

AR--;            //읽기를 종료합니다.
if(AR== 0 && WW > 0){//마지막 쓰레드가 끝나고 기다리고 있는 writer가 있으면
    V(OKToWrite); // 설명 1
    WW--;        // 기다리지 말고
    AW++;        // active 하라고 말합니다.
}
V(MUTEX);
```

```cpp
//writers
P(MUTEX);
if(AW + AR > 0){ //만약 기다리거나 활동중인 Thread가 있으면
    WW++;        //기다립니다.
}else{           //활동 중인게 없으면
    V(OKToWrite); // + 1
    AW++;        //활동을 시작합니다. 
}
V(MUTEX);        // AW++ 했기 때문에 P(MUTEX)에서 들어와도 if(AW+AR > 0)를 통과 못합니다.
P(OKToWrite);    // - 1

Write database;

AW--;
if( WW > 0){     // writer의 우선순위가 read보다 높기 때문에 writer 먼저
    V(OKToWrite);// 설명 1
    AW++;        // Active writer를 올립니다.
    WW--;        // 기다리고 있는 writer 줄입니다.
}else if(WR > 0){// 우선순위가 낮은 R은 WW가 없을 때 깨어납니다.
    V(OKToRead); // 설명 2
    AR++;
    WR--;
}
V(MUTEX);
```

1. 설명 1 : write가 여러번 줄 서서 들어오려고 할 수 있습니다. 이 때 미리 +1을 해두지 않으면 P를 실행할 때 OKToWrite < 0인 경우가 발생해서 불필요한 wait를 할 수 있습니다. 이를 막기 위해서 미리 + 1을 해두는 부분입니다.
2. 설명 2 : 설명 1의 과정을 reader에게도 적용하는 부분입니다. 

### Using Lock & condition Variable Solution 1

```cpp
//Readers
acquire(MUTEX);       // Just for MUTEX, Use LOCK
while(AW + WW > 0){   // 우선순위가 더 높은 writer가 있을 때
    WR++;             // Reader는 일단 기다렸다가
    wait(OKToRead);   // 읽어도 되면
    WR--;             // wait 줄이고
}
AR++;                 // active로 전환
release(MUTEX);       // Just for MUTEX, Use LOCK

read database;        // writer가 하나도 없으면 여러 Thread 동시에 읽기 가능

acquire(mutex);       // Just for MUTEX, Use LOCK
AR--;                 // 하나씩 끝내고
if(AR== 0 && WW > 0){ // 읽는 마지막 Thread 사라질 때 WW 있으면
    signal(OKToWrite);//  깨우기
} 
release(MUTEX);       // Just for MUTEX, Use LOCK
```

```cpp
//writers
acquire(MUTEX);       // Just for MUTEX, Use LOCK
while(AW + AR > 0){   // Active가 하나라도 있으면
    WW++;             // 기다렸다가
    wait(OKToWrite);  // 써도 되면
    WW--;             // 기다리는거 줄이고
}
AW++;                 // Active 늘리기
release(MUTEX);       // Just for MUTEX, Use LOCK

Write database;       // WW를 올려도 AW+AR > 0은 변함이 없어서 하나만 Write 가능

acquire(MUTEX);       // Just for MUTEX, Use LOCK
AW--;                 // AW를 줄이는 순간 다른 Writer 들어올 수 있음
if( WW > 0){          // 종료할 때 WW있으면
    signal(OKToWrite);// 깨우고
}else {               // WW 없으면
    broadCast(OKToRead); // WR 모두 깨우기
}
Release(MUTEX);        // Just for MUTEX, Use LOCK
```

### Using Lock & condition Variable Solution 2

1. i > 0 : i counts number of active readers
2. i == 0: no one is accessing the data
3. i < 0 : there is an active writer  


이정도는 이제 바로 이해할 수 있을 것입니다. 

``cpp
acquire(MUTEX);
while(i<0){
    wait(access);
}
i++;
release(MUTEX);

read database;

acquire(MUTEX);
i--;
if(i==0){
    signal(access);
}
release(MUTEX);
```

```cpp
acquire(MUTEX);
while( i != 0){
    wait(access);
}
i--;
release(MUTEX);

write database;

acquire(MUTEX);
i = 0;
broadCast(access); //Reader와 Writer 모두 깨운다.
release(MUTEX);
```