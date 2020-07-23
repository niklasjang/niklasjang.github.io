---
title: "[기업분석] ARCUS"
excerpt: "ICT 인턴쉽 기업 분석"
date: 2020-07-21
categories:
  - Backend
tags:
  - Backend 
toc : true
toc_label: "=== Contents ==="
toc_icon: "heart"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

# 분산 메모리 캐시 클라우드 ARCUS

## 유연한 클라우드

- `Memcached` 기반으로 단순한 key-value 유형 외에 list, set, b+ tree 같은 collection 유형을 제공하도록 확장함
- `Zookepper`를 이용하여 운영 중 노두 추가 및 제거가 가능하도록 구현
- 데이터베이스의 앞 단에 위치해서 hot-spot 성격의 데이터를 캐싱
  - 빠른 응답성을 제공
  - 데이터 베이스의 부하를 감소
- 복잡한 계산에 의한 결과물 또는 웹 처리상의 중간 데이터 등을 신속히 저장 및 조회할 수 있다.
- `In-Memory Cache` : 데이터 읽기 성능을 개선하기 위해 데이터베이스와 같은 영구저장소로부터 데이터를 로드하여 RAM에 저장할 수 있는 아키텍쳐를 말한다. 

## 개요

- 응용 수준의 데이터 캐싱을 구현
- 고성능/수평 확장이 가능
  - 높은 처리 용량 : 초당 10k/ 1 노드 
  - 클러스터 크기 만큼의 요청 처리량 : (10K * 캐시노드수)/ 1초
  - 빠른 응답 속도 : 평균 1 ms
- Memcached 클러스터는 노드를 계속 추가할 수록 데이터를 저장할 수 있는 공간이 늘어난다.
  - 1.3GB 메모리를 제공하는 cache2.m1.small 캐시 노드를 3개 연결하면 3.9GB를 사용할 수 있다.  

## 필요성

웹 서비스의 사용자가 증가하고 요청량이 많아지고 데이터가 증가함에 따라 느린 응답/처리량 부족, DB scale-out 어려움이 발생한다.

## Memcached

- 무료로 사용할 수 있는 분산 메모리 캐싱 시스템
- 데이터 베이스의 부하를 줄여 동적 웹 앱의 속도개선을 위해 사용됨
- DB나 API 호출 또는 렌더링 등으로부터 받아오는 결과 데이터를 작은 단위의 key-value 형태로 메모리에 저장
- 두 개의 웹서버가 64MB의 캐시 스페어를 각각 가지고 있을 때 두 서버가 분리되어 있을 때는 최대 사용 가능 캐시 사이즈는 64MB. Memcached를 통해서 논리적으로 연결된 각 웹서버가 사용할 수 있는 캐시 크기는 128MB.

## Redis

- NoSQL DBMS로 분류 되기도 하고, Memcached와 같이 인메모리 솔루션으로 분류되기도 한다.
- 성능은 memcached에 버금가면서 다양한 데이터 구조체를 지원함으로써 Message Queue, Shared Memory, Remote Dictinoary 용도로도 사용될 수 있어 다양한 서비스에 사용되고 있다.
- NoSQL 관점에서 봤을 때 Redis는 가장 단순한 key-value 타입을 사용하고 있따. 데이터 모델이 복잡할수록 성능이 떨어지므로 redis는 다순한 구조를 통해 높은 성능을 보장한다.
- NoSQL로서의 Redis가 주목 받는 이유
  1. 데이터 저장소로 가장 IO가 빠른 메모리를 채택
  1. 단순한 구조의 데이터 모델인 key-value 방식을 통해 빠른 속도를 보장
  1. 캐시 및 데이터스토어에 유리
  1. 다양한 API 지원
- `global cache` 방식을 사용. (java heap 영역에서 조회되는 `local cache`가 아닌)
  - `global cache`
    1. All the nodes user the same single cache space
    1. 각 요청은 Global Cache에 데이터를 질의하고 해당 캐시에 요청에 대한 응답 데이터가 없는 경우 저장공간에 데이터를 질의 하여 응답값을 보냄
    1. 로컬에 저장된 값이 아니기 때문에 느리고, 네트워크 트래픽이 발생한다.
    1. Cache 저장 데이터가 변경되어도 추가적인 작업 필요없음
    1. 서비스 확장으로 WAS 인스턴스가 늘어나고 Cache 데이터가 커질수록 효과적인 이유
  - `Local cache`
    1. 로컬 장비 내에서만 사용되어 Java Heap 영역에서 데이터 조회가 가능. 네트워크 트래픽이 없어 빠름
    1. Cache에 저장된 데이터가 변경되는 경우, 해당 서버를 제외한 모든 peer에 변경 사항 전달
    1. All to All Replication
    1. WAS 인스턴스가 늘어나고 Cache 저장 데이터 크기가 커지면 성능이 저하되는 이유는 이 때문

- 급격한 사용자가 집중되는 상황이나 대규모의 확장이 예정되어 있는 환경에 적합.
- global cache 방식이 적용되어 was 인스턴스 확장에는 유리하지만 cache 및 redis 세션 등 관리 포인트가 늘어난다는 단점이 있다. 

## Memcached V.S. Radis

| Memcached |   Radis  |
|:----------|:---------|
| multiple core를 사용 | Single Core를 사용 |
| 100k 이상의 데이터를 관리할 때 성능 우수 | - |
| simple key-value 구조만 지원 | richer data types 지원<br> (String, Hash, List, Set, Sorted Set)<br> 자료구조를 표현하기 위해서 내부적으로 redisObject만 사용함.|
|모든 데이터 저장이 메모리 안에서 일어남 | 모든 데이터 저장이 메모리 안에서 일어나지는 않음.<br>key 정보만 메모리에 저장<br>물리 메모리가 가득차면 오래 사용안된 값을 disk와 swap<br>이 특징으로인해 메모리 용량보다 더 큰 사이즈의 데이터를 유지할 수 있음.|
| 많은 수의 client가 존재할 때 적합한다. | 읽으려는 value의 key가 메모리에 없으면 swap file에서 load해서 요청에 응답한다.<br> IO thread pool에서 혼잡이 발생하면 모든 swap file이 load된 뒤에 응답한다. <br> 따라서 적은 수의 client가 존재할 때 batch 연산에는 적합하다.<br> 하지만 IO thread pool 사이즈를 조절하거나 swap file을 바꾸기 위한 read 요청에 concurrent 요청을 수행해서 혼잡시간을 줄일 수 있다. | 
|Slab Allocation mechanism을 사용한다.<br> key-value 데이터를 저장하기 위해서 meme을 미리 정의된 chunk 사이즈로 나누고 해당 길이의 record를 저장해서 mem fregment 문제를 해결합니다.<br> mem을 다양한 사이즈의 chunk로 나누고 같은 사이즈의 Slab Class로 grouping 합니다. <br> 여기서 chunk는 key-value 데이터를 저장하는 가장 작은 단위입니다. <br>Slab Class의 사이즈가 점차 증가하도록 Growth Factor를 지정할 수 있습니다.<br> 데이터를 처음 client로부터 전달받으면 가장 적합한 크기의 slab class를 찾습니다. <br> 그리고 데이터를 저장할 slab chunk list를 query합니다. <br>데이터가 버려진 chunk는 chunk list로 돌아와서 재사용됩니다.<br> chunk size보다 작은 데이터를 저장하고 남은 공간은 버려지는 큰 단점이 있습니다.| malloc을 사용해서 return되는 eal_ptr과 header에 저장된 mem block size를 사용해서 ret_ptr을 계산합니다. <br> ret_ptr을 통해서 쉽게 real_ptr을 계산하고 release를 할 수 있습니다.<br> |

## 공통점

C 언어에서의 malloc과 free는 아래와 같은 문제점을 야기한다.

1. unmatched malloc과 free는 mem leak를 야기한다.
1. 자주 malloc/free를 진행하면 mem framents의 재사용을 어렵게한다. 적어도 일반적인 함수보다는 더 많은 오버헤드를 소비하게 한다.

따라서 memory management solution은 malloc/free를 직접적으로 호출하지 않는다. self-designed된 memory management mechanism을 사용하지만 구현과정은 매우 다양하다.  


# 면접 준비

## 프로젝트 기술 스택, 기술의 최신 트랜드

## 손코딩

- 화이트보드 손코딩
- 스택 짜봐라
- B 트리에서 리프노드와 논 리프노드의 차이

## 알고리즘에 대한 설명

- 차수 m인 B트리의 특성

## Database Functional Dependencies 함수적 종속성

- 한 table 내의 attribute 간의 관계. 이 FD가 있어야 Anomaly가 생기지 않는다.  
- X -> Y
  - determinant -> dependant
  - X가 유일하게 Y의 값을 결정한다.
  - Y의 값은 X에 의해서 결정된다.
  - 학점 -> 이름 (O)
  - 이름 -> 학번 (X)
- X의 원소인 A에 대해서 X -{A} -> Y를 만족하는 경우 `Partial Functional Dependency`부분 함수 종속이라고 한다. 
- CK도 아니고 어떤 key의 부분집합도 아닌 attribute Z에 대해서 X -> Z, Z -> Y를 만족할 때 `Transitive Dependency`라고 한다.

## Normal Forms Based on Primary Keys

함수적 종속적 FD와 PK를 통해 NF 단계를 지정할 수 있다. 숫자가 커질수록 테이블을 작은 단위로 나누어서 중복과 연산이 많아진다.  

"FD를 사용해서 하나의 테이블이 얼마나 잘 설계되었는지 판단하는 과정이다."   

테이블을 나눌 때는 두 가지를 고려한다.  
1. Lossless join or nonadditive join property : 분리할 때 FK, PK 관계를 만족해서 join condition이 가능하게 한다.
1. Dependency preservation property : 종속성 보존 법칙. FD 관계 속의 X와 Y를 가능한 한 테이블에 넣는다.

유일성 : 테이블의 모든 R을 결정할 수 있는 특성
최소성 : 부분 집합으로 테이블의 모든 R을 결정할 수 없는 특성
Super key : 포괄적인 key의 개념
Candidate key(CK) : 유일성 + 최소성
Primary Key(PK) : CK 중 선정된 key. NULL일 수 없음
Alternate Key(AK) : CK - PK = AK

1. 1st normal form (1NF)
  - attribute는 반드시 atomic(single) value를 가져야 한다.
  - locations의 값을 {a,b,c}로 갖는 경우 테이블을 분리하면 1NF을 만족시킬 수 있다. 
1. 2nd normal form (2NF)
  - nonprime attribue는 PK에 대해서 fully FD해야한다.
  - PK의 부분 집합으로 FD가 가능한 attribute가 존재하는 경우 해당 attribute를 다른 테이블로 분리한다.
1. 3rd normal form (3NF)
  - 2NF를 만족하고, nonprime attribute는 transitive dependency를 만족하면 안된다. 
1. Boyce-Codd normal form (BCNF)
1. 4th normal form (4NF) - Multivalued dependency
1. 5th normal form (5NF) - Join dependency  

## Hash 충돌

- Collision Resolution
  1. Open Address : 충돌 후 비어있는 뒷 주소를 찾는다.
  1. Chaining : 충돌 후 비어있는 뒷 주소를 찾아서 저장하고, 저장한 주소를 충돌한 위치에 기록한다.
  1. Multiple hashing : 다른 hash 함수를 적용한다. 
- hash table의 70~90%만 채워서 충돌을 방지한다. 
- External Hashing for Disk Files
  - bucket : 또 다른 하나의 disk block 또는 연결된 block들의 cluster
  - hash function : key -> a relative bucket number
  - 충돌의 경우 chaining을 사용한다.
  - 삭제의 경우 chaining을 통해서 충돌되었던 값에서 하나를 복사해온다.
  - 검색의 경우 해시 필드 이외의 일부 필드 값이 제공된 데이터를 검색하는 것은 정렬되지 않은 데이터를 검색하는 것만큼 비싸다.

## RAID

<https://harryp.tistory.com/806> 

- bit/block-wise data striping을 통해서 disk 성능을 향상
- 데이터 유실을 막기 위함

1. Level 0
  - Disk 1/2에 홀짝 Block-level striping
  - 중복이 없음
1. Level 1
  - Disk 2에 1의 내용을 그대로 복사
1. Level 2
  - m+1개의 disk와 m개의 parity disk로 구성
  - 1개의 디스크 에러 시 복구 가능
  - bit-level striping
1. Level 3
  - byte-level striping
1. Level 4 
1. Level 5
  - 제일 사용 빈도가 높은 RAID Level
  - Block-level striping
  - 패리티를 저장하는 디스크를 고정하지 않고 매 번 다른 디스크에 저장
  - 용량 및 성능이 단일 디스크 대비 N-1배 증가
1. Level 6
  - Block-level striping
  - Level 5와 같은 방법이지만 패리티를 2개의 디스크에 저장
  - 용량 및 성능이 단일 디스크 대비 N-2배 증가
  
## Terminology

- `노드` : 네트워크 또는 데이터 구조를 구성하는 각각의 개체. 네트워크에서 연결 포인트 혹은 데이터 전송의 종점, 재분배점 등을 의미.
- `클러스터` : 여러 대의 컴퓨터들이 연결되어 하나의 시스템처럼 동작하는 컴퓨터들의 집합
- `Memcached` : 분산 메모리 캐시 시스템.
- `Redis` : Hash, List, Set, Sorted Set 등 다양한 데이터 형식을 제공하는 key-value 데이터 저장소
- `scale-out` : 접속된 서버의 대수를 늘려 처리 능력을 향상시키는 것. `수평 스케일`
- `scale-in` : 서버 자체를 증강하여 처리 능력을 향상시키는 것. `수직 스케일`
- `NoSQL` : json을 저장하고 갖다 쓴다. 데이터를 schema에 맞춰서 이해해야하고, 안맞으면 schema를 추가해야하는 문제를 해결.
- `Query Off Loading` : Master는 write, Slave는 read를 담당하는 아키텍쳐를 사용한다.
- `Sharding` : 데이터의 용량이 늘어났을 때 key 대역폭을 정해서 데이터를 나누어서 저장한다. 
