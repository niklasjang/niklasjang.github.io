---
title: "2019 경인지역 6개대학 연합 프로그래밍 경시대회 본선 후기"
excerpt: "shake! 46/60등!"
date: 2019-07-07
categories:
  - Review
tags:
  - BOJ
  - SHAKE

toc : false
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---


## 결과 

![poster](/assets/images/contest/shake/2019/SHAKE_2019_final_result.jpg)  

46등을 했다. 위 사진은 스코어보드가 얼려졌을 때 기준의 등수이고, 최종 결과를 발표했을 때는 46등이라는 결과를 받았다. 대강 기억나는 최종 결과는 아래와 같았다.  

1. 1~5등 수상권은 5문제정도 품
2. 2문제를 풀었다면 딱 60명 중 30등!
3. 1번 문제를 못 푼 사람은 2명뿐

## 되돌아보기

시작하자마자 모든 문제를 읽어보고 이해하고 5분 10분정도 풀이법을 생각해본 뒤, A번으로 넘어와서 A번을 풀었다. A번은 고민을 꽤 많이하고
최적의 대안을 찾아서 40분만엔가 1번만에 통과했다.  

A번을 풀었던 시점에서 사람들이 제일 많이 푼 문제가 F번이었기 때문에 A번 다음에 F번을 풀었다. 맨 처음에 문제를 쭉 다 읽으면서
제일 깊게까지 풀이법이 생각난 문제였기도 했다. 딱 읽어도 dp로 푸는 문제였다. (사실 내가 생각한 방법은 틀린건 아니었지만 그리디 알고리즘이었다.)  

F번을 처음에는 복잡한 풀이를 생각해서 반정도 구현했는데, 테스트를 하다가 더 간단한 방법이 생각나서 후자의 방법으로 코드를 짰다. 내가 넣은
TC를 여러개 넣어 보면서 오류를 수정하고, 생각하지 못했던 empty 예외도 처리하고 제출을 했다. 시간 초과가 났다. 결국에는 시간초과를 해결하지 못하고
1문제풀고 F번 2번 try한걸로 마무리했다.  

![poster](/assets/images/contest/shake/2019/2019-07-07-BOJ-158-solved.jpg)  

만족한다. 19년 7월 7일 시점에서 백준에서 158문제를 풀고 운좋게 학교 대표로 좋은 경험까지 했다. 되게 욕심없게 느껴질 수도 있지만, 모든 참가자들이 
풀도록 낸 문제는 쉽게(?) 풀었고, 복잡한 알고리즘 없이 그리디로 푸는 문제를 생각하고 구현까지 나름 완벽하게 했다.  

이번 대회에서 느낀 것은 이제 머릿속으로 떠오르는 기본 개념과 아이디어를 구현하는 것은 어느정도 됐다는 것이다. 아직 제대로된 알고리즘과 자료구조를 사용하는
문제는 시도도 못하는 실력이지만, 방학시작할 때 생각했던 '구현력 올리기'는 어느정도 성과를 낸 것 같아서 기분이 좋다. 느려도 제대로 공부하고 있다는 느낌이 든다. 

SHAKE! 2020에는 높은 등수로 예선 통과하고 본선에서 절반의 문제를 푸는 것을 목표로 한다!  

## A번 패턴문제 정답 코드

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;

int num[9]; //입력받은 패턴이 저장되는 곳
bool visit[10];
int l;//입력받을 패턴의 길이

bool isCorner(int x) {
	if (x == 1 || x == 3 || x == 7 || x == 9) return true;
	else return false;
}

bool check(int a, int b) {
	//방문한 곳을 또 방문하는 경우
	if (visit[b] == true) {
		//cout << "방문했던 곳" << "\n";
		return false;
	}
	else visit[b] = true;

	//합이 10인데 5를 방문하지 않은 경우
	if (a + b == 10 && visit[5] == false) {
		//cout << "합이 10인데 5를 방문하지 않은 경우" << "\n";
		return false;
	}
	//모서리의 두 값인데 가운데 값을 방문하지 않은 경우
	if (isCorner(a) && isCorner(b) && visit[(a + b) / 2] == false) {
		//cout << "모서리의 두 값인데 가운데 값을 방문하지 않은 경우" << "\n";
		return false;
	}
	return true;
}

int main(void) {
	cin >> l;
	for (int i = 0; i < l; i++) {
		cin >> num[i];
	}
	
	//처음 입력 받은 숫자를 무조건 방문
	visit[num[0]] = true;
	for (int j = 0; j < l - 1; j++) {
		if (!check(num[j], num[j + 1])) {
			cout << "NO" << endl;
			return 0;
		}
	}
	cout << "YES" << "\n";
	return 0;
}
```

## F번 사탕 배달 코드 : 정답 유무는 사이트에서 문제 열리면 수정

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
#define MAX(a,b) a > b ? a : b
typedef long long ll;
int n, w;
pair<int, int > dp[1250010], front; //각 무게별로 담을 수 있는 최대 당도를 가지는 3g와 5g의 갯수
vector<ll> g3 ; //3gram
vector<ll> g5 ; //5gram
vector<pair<int, int>> temp;
vector<pair<int, int>> temp2;
vector<pair<int, int>>::iterator it;

bool descend(pair<int, int>a, pair<int, int>b) {
	if (a.first != b.first) return a.first > b.first;
	else return  a.second > b.second;
}

ll t1, t2;
ll getSum(int a, int b) {
	ll asum=0, bsum=0;
	vector<ll>::iterator it;

	if (!g3.empty()) {
		it = g3.end(); it--;
		for (int i = 0; i < a; i++) {
			asum += *it;
			if (it == g3.begin()) break;
			it--;
		}
	}
	if (!g5.empty()) {
		it = g5.end(); it--;
		for (int j = 0; j < b; j++) {
			bsum += *it;
			if (it == g5.begin()) break;
			it--;
		}
	}
	//cout << "asum is " << asum << "\n";
	//cout << "bsum is " << bsum << "\n";
	return asum + bsum;
}

pair<int, int> isBigger(int sum, pair<int, int> a, int sum2, pair<int, int> b) {
	if (sum >= sum2) {
		return a;
	}
	else {
		return b;
	}
}

int main(void) {
	//사탕 갯수와 무게 제한을 입력 받는다.
	cin >> n>> w;
	//입력받는 사탕의 당도를 3g과 5g로 나눠서 저장한다.
	int gram; ll value;
	for (int i = 0; i < n; i++) {
		cin >> gram >> value;
		if (gram == 3) {
			g3.push_back(value);
		}
		else {
			g5.push_back(value);
		}
	}
	
	//이들 사탕 주머니를 내림차순 정렬한다.
	if (!g3.empty()) sort(g3.begin(), g3.end());
	if (!g5.empty()) sort(g5.begin(), g5.end());

	//무게 제한이 3g일 때부터 w가 될 때까지 dp를 진행한다.
	dp[0] = make_pair(0, 0);
	dp[1] = make_pair(0, 0);
	dp[2] = make_pair(0, 0);
	dp[3] = make_pair(1, 0);
	dp[4] = make_pair(1, 0);
	t1 = getSum(0, 1); t2 = getSum(1, 0);
	dp[5] = isBigger(t1,make_pair(0,1), t2, make_pair(1,0));
	t1 = getSum(0, 1); t2 = getSum(2, 0);
	dp[6] = isBigger(t1, make_pair(0, 1), t2, make_pair(2, 0));
	dp[7] = dp[6];
	
	for (int i = 8; i <= w; i++) {
		//cout << "weight is " << i << "\n";
		//3g짜리 하나 추가하는 경우
		temp.push_back(make_pair(dp[i-3].first + 1, dp[i-3].second));
		//5g짜리 넣을 수 있을 때 3g 넣을지 5g넣을지 비교하는 경우
		temp.push_back(make_pair(dp[i - 5].first + 1, dp[i - 5].second));
		temp.push_back(make_pair(dp[i - 5].first , dp[i - 5].second + 1));
		
		//3g짜리 빼고 5g짜리 넣는 것이 이득인지 판단하는 경우
		if (dp[i - 2].first > 0) {
			temp.push_back(make_pair(dp[i - 2].first - 1, dp[i - 2].second + 1));
		}
		sort(temp.begin(), temp.end());
		pair<int, int>f = temp[0];
		temp2.push_back(f);
		for (int i = 1; i < temp.size(); i++) {
			if (f.first > temp[i].first || f.second > temp[i].second) {
				temp2.push_back(temp[i]);
			}
		}
		//적어도 이전 만큼은 넣는다.
		dp[i] = dp[i - 1];
		//temp에서 가장 단 것을 많이 넣을 수 있는 조합을 dp[i]에 저장
		
		front = temp2.back();
		//cout << "front : " << front.first << "," << front.second << "\n";
		temp2.pop_back();
		while(!temp2.empty()){
			if (getSum(front.first, front.second) <= getSum(temp2.back().first, temp2.back().second)) {
				front = make_pair(temp2.back().first, temp2.back().second);
				//cout << "front : " << front.first << "," << front.second << "\n";
			}
			temp2.pop_back();
		}
		dp[i] = front;
		temp.clear();
	}
	cout << getSum(dp[w].first, dp[w].second) << "\n";
	return 0;
}
```




