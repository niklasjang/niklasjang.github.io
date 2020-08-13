---
title: "[PS][Java] java PS 첫 시작하기"
excerpt: "BOJ 1002 터렛"
date: 2020-08-13
categories:
  - BOJ
tags:
  - math
  - java
  - ps
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

# [터렛](boj.kr/1002)

## 풀이 1 : 두 점에서 만나는 경우를 정의하지 못한 경우.

두 명의 관측자의 좌표와 관측한 거리가 주어진다. 따라서 두 개의 원의 중심과 반지름 길이를 알 수 있다. 두 개의 원이 0,1,2 점에서 겹치는 경우를 따져보면 된다. 겹치는 점의 갯수와 상관없이 두 개의 원이 안으로 만나는지, 밖으로 만나는지를 따져야 한다.  

dist를 두 원의 중심 사이의 거리라고 할 때,

- 만나지 않는 경우 : 
  - 원이 원을 포함하는 경우 : r1 + dist < r2 || r2 + dist < r1 
  - 두 원이 서로 포함하지도 겹치지도 않는 경우 : r1 + r2 < dist
- 한 점에서 만나는 경우
  - 내접 : r1 + dist == r2 || r2 + dist == r1 
  - 외접 : r1 + r2 + dist
- 두 점에서 만나는 경우 
  - 나머지 경우

## 풀이 2 : 두 점에서 만나는 경우를 정의한 경우.

두 원이 두 점에서 만나는 경우는 두 원이 내접하는 경우와 외접하는 경우를 적용해서 풀 수 있다. 두 원이 내접하는 경우, 중심 사이의 거리는 |r1-r2|가 되고, 두 원이 외접하는 경우 중심 사이의 거리는 (r1+r2)가 된다. 따라서 두 원 사이의 거리가 |r1-r2|와 (r1+r2) 사이에 존재하는 경우 두 원은 두 접에서 접한다.  

- 두 점에서 만나는 경우
  - |r1-r2| < dist && dist < (r1+r2)
- 한 점에서 만나는 경우 
  - |r1-r2| == dist && dist == (r1+r2)
- 만나지 않는 경우
  - 나머지

## 코드

java로 백준에 제출할 때에는 

1. 제출 언어를 java로 설정하고
1. Main class 안에 main 함수에서 코드를 작성하고
1. package me.niklasjang; 정보를 제외하고 제출한다.  

```java
//풀이 1
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader buf = new BufferedReader(new InputStreamReader(System.in));
        int tc = Integer.parseInt(buf.readLine());
        while(tc-- > 0){
            String input = buf.readLine();
//            System.out.println(tc +":" + input);
            String[] arr = input.split(" ");

            double x1 = Double.valueOf(arr[0]);
            double y1 = Double.valueOf(arr[1]);
            double r1 = Double.valueOf(arr[2]);
            double x2 = Double.valueOf(arr[3]);
            double y2 = Double.valueOf(arr[4]);
            double r2 = Double.valueOf(arr[5]);
            double dist = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

            if(x1 == x2 && y1 == y2){//중심이 같은 경우
                if(r1 == r2){
                    System.out.println(-1);
                }else{
                    System.out.println(0);
                }
            }else if(r1 + dist == r2 || r2 + dist == r1 || r1 + r2 == dist){//한 점에서 만나는 경우
                System.out.println(1);

            }else if(r1+r2 < dist || dist + r1 < r2 || dist + r2 < r1){//만나지 않는 경우
                System.out.println(0);
            }else{ //두 점에서 만나는 경우
                System.out.println(2);
            }
        }
    }
}
```

```java
//풀이 2

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader buf = new BufferedReader(new InputStreamReader(System.in));
        int tc = Integer.parseInt(buf.readLine());
        while(tc-- > 0){
            String input = buf.readLine();
            String[] arr = input.split(" ");

            double x1 = Double.valueOf(arr[0]);
            double y1 = Double.valueOf(arr[1]);
            double r1 = Double.valueOf(arr[2]);
            double x2 = Double.valueOf(arr[3]);
            double y2 = Double.valueOf(arr[4]);
            double r2 = Double.valueOf(arr[5]);

            double dist = Math.pow(x1-x2,2)+Math.pow(y1-y2,2);
            double minDist = Math.pow(r1-r2,2);
            double maxDist = Math.pow(r1+r2,2);
            if(x1==x2 && y1==y2 && r1==r2){
                System.out.println(-1);
            }else if(minDist < dist && dist < maxDist){
                System.out.println(2);
            }else if(minDist == dist || dist == maxDist){
                System.out.println(1);
            }else{
                System.out.println(0);
            }
        }
    }
}
```

```java
//실행시간 104ms에서 92ms로 줄이는 StringTokenizer 사용
//StringTokenizer st = new StringTokenizer("string","-=,./");
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader buf = new BufferedReader(new InputStreamReader(System.in));
        int tc = Integer.parseInt(buf.readLine());
        //x1 y1 r1
        //x2 y2 r2
//        int[][][] code = new int[tc][2][3];
        int x1,y1,r1,x2,y2,r2;
        double dist, minDist, maxDist;
        StringTokenizer st;
        while(tc-- > 0){
            st =  new StringTokenizer(buf.readLine());
            x1 = Integer.parseInt(st.nextToken());
            y1 = Integer.parseInt(st.nextToken());
            r1 = Integer.parseInt(st.nextToken());
            x2 = Integer.parseInt(st.nextToken());
            y2 = Integer.parseInt(st.nextToken());
            r2 = Integer.parseInt(st.nextToken());
            dist = Math.pow(x1-x2,2)+Math.pow(y1-y2,2);
            minDist = Math.pow(r1-r2,2);
            maxDist = Math.pow(r1+r2,2);
            if(x1==x2 && y1==y2 && r1==r2){
                System.out.println(-1);
            }else if(minDist < dist && dist < maxDist){
                System.out.println(2);
            }else if(minDist == dist || dist == maxDist){
                System.out.println(1);
            }else{
                System.out.println(0);
            }
        }
    }
}
```