---
title: "[PS][완전탐색][N자리 K진수] Chapter 4"
excerpt: "N자리 K진수 2차원에 적용하기"
date: 2020-03-30
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

## [소문난 칠공주](https://www.acmicpc.net/problem/1941)

문제의 정답은 [여기](https://gist.github.com/niklasjang/888c3087147ac9a057cfc29237c7f25b)에서 확인할 수 있습니다. 

이 문제는 1차원 백트레킹을 2차원으로 확장해서 적용해야하는 문제입니다. 반대로 생각하면 2차원의 입력을 1차원으로 바꿔서 생각하면 백트레킹으로 접근할 수 있게 됩니다. 

1. 일단 25개의 좌표 중에서 7개를 선택합니다.
1. 7개 중 'S'가 4개 이상 선택되었는지 판단하고
1. 7개에 대해서 connected component의 갯수가 1인지 판단합니다.
1. 여기까지 통과하면 ans++;를 진행합니다. 

먼저 25개의 좌표 중에서 7개를 선택하는 것은 \[x\]\[y\]에서 항상 \[x\]\[y+1\]로 이동한다고 가정하는 방법으로 접근합니다. 일단 무조건 y를 1씩 이동하면서 진행시키고, 다음에 recur를 진행하기 전에 if(y==5){ x++; y = 0;}을 진행해서 다음 줄의 가장 왼쪽 칸으로 이동합니다. 여기서 x,y는 map\[x\]\[y\]를 선택할지 말지 정하는 좌표를 의미합니다.  

그리고 이전 포스팅에서 풀었던 문제와 같이 중복 제거는 오름차순으로 선택하면, 오름차순은 선택한다/안한다의 개념을 적용하면 자동으로 이루어집니다.  