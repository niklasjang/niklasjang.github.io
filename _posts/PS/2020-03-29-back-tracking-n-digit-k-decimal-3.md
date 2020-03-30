---
title: "[PS][완전탐색][N자리 K진수] Chapter 3"
excerpt: "N자리 K진수 문제에 적용하기"
date: 2020-03-29
categories:
  - PS
tags:
  - ps 
  - back-tracking
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

완전탐색의 첫 번째 알고리즘 백트래킹 문제를 풀어보겠습니다.   
- - -

## N자리 K진수 : 문제

### [N-Queen](https://www.acmicpc.net/problem/9663)

코드는 [여기](https://gist.github.com/niklasjang/2fa0b46c78e8fc831b019b807b261fd6)에서 확인할 수 있습니다.  

arr[0]=1을 map의 0번째 row에는 1번째 col에 퀸이 위치함을 의미합니다. 이 때 각 퀸들이 같은 row/col에는 올 수 없기 때문에 visited[]를 사용합니다. 그리고 isPossible()함수는 직접 8방향으로 시뮬레이션을 하느 것이 아니라, 좌표값의 차이를 통해서 서로의 대각선에 위치했는지 판별합니다.  

### [차이를 최대로](https://www.acmicpc.net/problem/10819)

코드는 [여기](https://gist.github.com/niklasjang/a5db9d774aad4b4e374902f42751c097)에서 확인할 수 있습니다.  

이 문제는 기본적인 N자리 K진수 풀이로 가능합니다. N자리 K진수의 선택한다/선택하지 않는다의 풀이는 선택되는 index가 오름차순인 경우만 고려하기 때문에 적용할 수 없는 문제입니다.

### [도영이가 만든 맛있는 음식](https://www.acmicpc.net/problem/2961)

코드는 [여기](https://gist.github.com/niklasjang/6c4333c0fd360ad0d421847abf0e470f)에서 확인할 수 있습니다.  

특정 음식에 대해서는 그 음식을 사용하든 사용하지 않든 두 가지 경우만 존재합니다. 그런데 음식을 1개 이상 사용하는 경우 모두에 대해서 ans를 갱신해야합니다. recur(int depth)에서 depth는 'depth번째 선택을 해야하는 경우'임을 생각해서 depth != 0 인 경우를 제외하고는 모두 갱신을 해줍니다.  

오름차순으로 재료를 선택하기 때문에 가장 마지막 재료를 선택한 경우에는 choice를 사용한 덕분에 더이상 진행하지않고 recur이 종료됩니다.  


## [퇴사](https://www.acmicpc.net/problem/14501)

코드는 [여기](https://gist.github.com/niklasjang/6c4333c0fd360ad0d421847abf0e470f)에서 확인할 수 있습니다.  

1. 백트레킹 1번 개념으로만 풀어여하는 문제가 있을 수 있다.
1. 이 문제의 경우 특정 날짜의 일을 한다 안한다의 개념이 확실하므로 1번 개념으로만 풀 수 있다. 
1. 백트레킹 0번 개념으로 풀이를 하면 어떤 일들을 할지 선택하고, 선택한 일들을 실제로 수행할 수 있는지를 판단하는 isCorrect()를 짜야한다. 그런데 이 과정이 너무 복잡하다. 그래서 1번 개념으로 접근한다. 
1. depth를 이전에 고른 일이 끝나고 depth번째일을 시작할지 말지 판단해야한다.로 생각하는 것이 중요하다.
1. 예를 들어 0번째 날짜의 일이 2일이 걸리면, 0번째 날짜의 일은 0일쨰와 1일째에 수행하고 2일쨰의 일을 할지말지 선택해야한다. 
1. 딱 N일 째에 일이 끝나는 경우만 생각해서 답을 갱신한다. N일을 넘으면 불가능한 일을 받아서 한 경우라서 제외한다. 

## [가르침](https://www.acmicpc.net/problem/1062)

코드는 [여기](https://gist.github.com/niklasjang/20ddcc35dacc134b00579431910e865f)에서 확인할 수 있습니다.  

백트레킹 1번 개념으로 풀이을 하였습니다. 특정 알파벳을 선택할지/말지 결정해서 k개만큼 선택할 때까지 recur를 진행합니다. 이 떄 오름차순으로 선택하는 것으로 가정하고, antatica에 포함된 5개의 알파벳을 선택해야하는데 선택하지 않은 경우에는 recur()를 중단합니다. 만약 abcedf의 경우 꼭 들어가야하는 a와 c는 들어갔지만 t i c는 포함되지 않았기 때문에 isCorrect()method에서 한 번 더 걸러줍니다.  



