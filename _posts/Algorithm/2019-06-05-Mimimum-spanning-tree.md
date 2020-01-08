---
title: "[최소 신장 트리] Mimimum spanning tree"
excerpt: "최소 연결 트리 구현하기"
date: 2019-06-06
categories:
  - Algorithm
tags:
  - spanning-tree
  - minimum-spanning-tree
  - MST

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## 정의

- Spanning Tree

1. 그래프 내의 모든 정점을 포함하는 트리를 말합니다.
2. **최소 연결 부분 그래프**입니다. 최소 연결이라는 것은 가장 적은 수의 간선으로 모든 정점을 연결한 것을 의미합니다.
3. N개의 노드가 있으면 이들 모두를 연결하는 최소 에지는 N-1개입니다. N개의 에지가 N-1개의 간선으로 연결되어 있으면 이것이 바로 Spanning-tree입니다.

-Minimum Spanning Tree

Spanning tree인데, N개의 노드를 연결하는 N-1개의 간선들의 가중치의 합이 최소가 되도록 선택된 경우를 말합니다. 

## 구현

- Spanning Tree

1. `DFS`와 `BFS`를 사용해서 구현합니다. 모든 정점을 한 번씩만 방문하는 두 알고리즘으로 노드를 찾고, 이 과정에서 사용된 에지들을 모두 연결하면 됩니다. (DFS와 Stack을 이용해서 위상 순서를 정렬했던 `위상정렬`보다 더 간단한 개념이네요.)
2. `싸이클`이 있는 경우 Spanning 트리의 정의를 벗어납니다. 싸이클에서 하나의 간선을 지워도 모든 노드들이 연결되어 있기 때문입니다. 이 때문에 (싸이클이 없어야하는) Spanning 트리는 정확히 N-1개의 간선을 가집니다. 양 방향 그래프에서 모든 노드에 대해, **한 노드에서 다른 한 노드로 가는 경로가 단 하나뿐이라면 이 그래프는 싸이클이 존재하지 않습니다**.


## 활용

Spanning tree는 모든 도시들을 통행할 수 있는 최소의 도로를 만드는 문제로 생각할 수 있습니다. 네트워크, 수도 등 다양한 자원의 분배 문제에서 적용될 수 있습니다.  

## Minimun Spanning Tree

MST를 구현하는 방법으로는 두 가지가 있습니다.

1. Kruskal
2. Prim

다음 포스팅은 위 두 가지 알고리즘에 대한 것입니다.

## 참조

1. [gmlwjd9405.github.io](https://gmlwjd9405.github.io/2018/08/28/algorithm-mst.html)