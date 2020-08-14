var store = [{
        "title": "Post: Modified Date",
        "excerpt":"This post has been updated and should show a modified date if used in a layout. All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a...","categories": ["Blog"],
        "tags": ["Post Formats","readability","standard"],
        "url": "http://localhost:4000/blog/post-modified/",
        "teaser": null
      },{
        "title": "Post: Standard",
        "excerpt":"All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden, and she plucked another flower and ran with it to her mother. I suppose she...","categories": ["Blog"],
        "tags": ["Post Formats","readability","standard"],
        "url": "http://localhost:4000/blog/post-standard/",
        "teaser": null
      },{
        "title": "Post: Chat",
        "excerpt":"Abbott: Strange as it may seem, they give ball players nowadays very peculiar names. Costello: Funny names? Abbott: Nicknames, nicknames. Now, on the St. Louis team we have Who’s on first, What’s on second, I Don’t Know is on third– Costello: That’s what I want to find out. I want...","categories": ["Blog"],
        "tags": ["chat","Post Formats"],
        "url": "http://localhost:4000/blog/post-chat/",
        "teaser": null
      },{
        "title": "Post: Notice",
        "excerpt":"A notice displays information that explains nearby content. Often used to call attention to a particular detail. When using Kramdown {: .notice} can be added after a sentence to assign the .notice to the &lt;p&gt;&lt;/p&gt; element. Changes in Service: We just updated our privacy policy here to better service our...","categories": ["Blog"],
        "tags": ["Post Formats","notice"],
        "url": "http://localhost:4000/blog/post-notice/",
        "teaser": null
      },{
        "title": "Post: Quote",
        "excerpt":"   Only one thing is impossible for God: To find any sense in any copyright law on the planet.       Mark Twain   ","categories": ["Blog"],
        "tags": ["Post Formats","quote"],
        "url": "http://localhost:4000/blog/post-quote/",
        "teaser": null
      },{
        "title": "Post: Link",
        "excerpt":"This theme supports link posts, made famous by John Gruber. To use, just add link: http://url-you-want-linked to the post’s YAML front matter and you’re done.      And this is how a quote looks.    Some link can also be shown.  ","categories": ["Blog"],
        "tags": ["link","Post Formats"],
        "url": "http://localhost:4000/blog/post-link/",
        "teaser": null
      },{
        "title": "[기업분석] Collabee",
        "excerpt":"   업부 내역을 문서화해서 공유  ","categories": ["Review"],
        "tags": ["Collabee"],
        "url": "http://localhost:4000/review/Company-Analysis-Collabee/",
        "teaser": null
      },{
        "title": "WWWWelcome to Jekyll!",
        "excerpt":"You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run jekyll serve, which launches a web server and auto-regenerates your site when...","categories": ["blog"],
        "tags": ["Jekyll","update"],
        "url": "http://localhost:4000/blog/welcome-to-jekyll/",
        "teaser": null
      },{
        "title": "Markdown을 사용한 Post 작성 가이드",
        "excerpt":"NOTICE **Notice:** 기본적인 Notice {: .notice} **Primary Notice:** 중요한 Notice {: .notice--primary} **Info Notice:** 정보 Notice {: .notice--info} **Warning Notice:** 경고 Notice {: .notice--warning} **Danger Notice:** Danger Notice {: .notice--danger} **Success Notice:** Success Notice {: .notice--success} Changes in Service: 기본적인 Notice Primary Notice: 중요한 Notice Info Notice: 정보 Notice Warning...","categories": ["Guide"],
        "tags": ["Markdown","minimal-mistakes"],
        "url": "http://localhost:4000/guide/how-to-use-markdown/",
        "teaser": null
      },{
        "title": "Github.io에 MathJax 추가하기 & latex 사용법",
        "excerpt":"MathJax MathJax를 사용하면 Jekyll Github 블로그에서 수학식 표시 가능할 수 있습니다. MathJax 적용 방법 마크다운 엔진 변경 _config.yml 파일의 내용을 아래와 같이 수정합니다. # Conversion markdown: kramdown highlighter: rouge lsi: false excerpt_separator: \"\\n\\n\" incremental: false mathjax_support.html 파일 생성 _includes 디렉토리에 mathjax_support.html 파일 생성 후 아래 내용 입력 &lt;script type=\"text/x-mathjax-config\"&gt; MathJax.Hub.Config({...","categories": ["Guide"],
        "tags": ["Blog","MathJax","Jekyll","latex"],
        "url": "http://localhost:4000/guide/apply-mathjax-to-blog/",
        "teaser": null
      },{
        "title": "Machine Learning 개론",
        "excerpt":"Goal : Machine Learning이 무엇인지, 왜 세상을 아름답게할 수 있는 기술인지 이해한다. 개념 Machine Learning은 A.I.의 한 분야이며, ML 안에서도 다양한 분야로 구분됩니다. ML의 세부 분야는 대략 아래와 같습니다. Computer Vision Natural Language Reasoning Speech Recognition Reasoning? 추상적으로 보이는Reasoning을 간단히 설명해보겠습니다. 수 많은 데이터들에서 피부암의 형태를 가지는 데이터를 찾는 A.I....","categories": ["ML"],
        "tags": ["introduction"],
        "url": "http://localhost:4000/ml/Machine-Learning-intruduction/",
        "teaser": null
      },{
        "title": "ML의 기초 Back Propagation",
        "excerpt":"Goal : Back Propagation을 머릿 속에서 구체적으로 그릴 수 있다.   123   This formula $f(x) = x^2$ is an example.  ","categories": ["ML"],
        "tags": ["back-propagation"],
        "url": "http://localhost:4000/ml/Back-Propagation/",
        "teaser": null
      },{
        "title": "빠른 속도를 위한 Batch Normalization",
        "excerpt":"Goal : Batch-normalization 머릿 속에서 구체적으로 그릴 수 있다. Notice: 본 강의는 Coursera의 Andrew Ng의 ML 강의를 요약한 것입니다. Hyperparameter tuning Tuning process 우리가 관심을 가져야하는 Hyperparameter들을 정리해보면 아래와 같이 6개가 있습니다. $\\alpha$ : Learning rate $\\beta$ : Gradient descent with momentum $\\beta_1$, $\\beta_2$ : Adam optimization algorithm Hidden Layer의...","categories": ["ML"],
        "tags": ["batch-normalization"],
        "url": "http://localhost:4000/ml/Batch-Normalization/",
        "teaser": null
      },{
        "title": "[BFS & DFS] 연결요소 이분 그래프",
        "excerpt":"BFS와 DFS Goal : 내 손이 제 멋대로 BFS와 DFS를 짜도록 만든다. Warning Notice: 본 포스팅은 정확한 정의보다는 기억하기 쉬운 내용을 목적으로 합니다. 정의 DFS : 한 지점에서 갈 수 있을 때까지 계속 진행하고, 더이상 진행할 수 없으면 돌아온다. BFS : 한 지점에서 이어져있는 모든 노드를 진행한 뒤, 다음 노드를...","categories": ["Algorithm"],
        "tags": ["DFS","BFS","connected-component","연결요소","이분그래프","biparteti-graph","BOJ","1260","11724","1707"],
        "url": "http://localhost:4000/algorithm/DFS-BFS/",
        "teaser": null
      },{
        "title": "[Flood Fill] 플루드 필",
        "excerpt":"Goal : Flood Fill을 머릿속에 구체적으로 그릴 수 있다. 목표 어떤 위치와 연결된 모든 위치를 찾는다. (DFS/BFS알고리즘을 사용합니다. ) 문제를 통해서 위의 목표를 어떻게 달성하는지 보겠습니다. 백준 2667번 문제 : NxN크기의 정사각형이 있고 각 칸은 1x1크기이다. 집이 있는 곳은 1, 없는 곳은 0이다. 집들이 연결되어있는 것은 단지라고 정의하고, 단지가 총...","categories": ["Algorithm"],
        "tags": ["Flood-Fill","BOJ","DFS"],
        "url": "http://localhost:4000/algorithm/Flood-Fill/",
        "teaser": null
      },{
        "title": "[DP] 다이나믹 프로그래밍",
        "excerpt":"개념 큰 문제를 작은 문제로 나눠서 풀고, 다시 원래 큰 문제를 푸는 알고리즘 Dynamic Programming이라는 이름은 그냥 멋있어서 붙혀졌다고 합니다. 큰 문제를 작은 문제로 나눠서 푸는 두 개의 알고리즘 DP : 작은 문제가 여러번 나온다. 여러번 나오는 문제의 정답이 항상 같다는 것을 이용해 각각의 문제를 한 번씩 푼다. 분할 정복...","categories": ["Algorithm"],
        "tags": ["BOJ","DP"],
        "url": "http://localhost:4000/algorithm/DP/",
        "teaser": null
      },{
        "title": "BFS 문제 풀이 - 2",
        "excerpt":"Goal : 최단거리 알고리즘으로서의 BFS를 내 손이 멋대로 짜게 한다. 개념 BFS는 임의의 정점에서 모든 정점을 한 번씩만 방문하는 알고리즘입니다. 이런 BFS가 아래의 조건일 때는 최단거리 알고리즘으로 사용됩니다. 모든 가중치가 1일 때 BFS를 이용해서 해결할 수 있는 문제의 조건 최소 비용의 문제이어야 한다. 간선의 가중치가 1이어야 한다. 정점과 간선의 갯수가...","categories": ["BOJ"],
        "tags": ["BOJ","BFS","12851","13549","13913","14226","1261","2206","3055"],
        "url": "http://localhost:4000/boj/BFS-practice-2/",
        "teaser": null
      },{
        "title": "BFS 문제 풀이 - 3",
        "excerpt":"Goal : 최단거리 알고리즘으로서의 BFS를 내 손이 멋대로 짜게 한다. 개념 BFS는 임의의 정점에서 모든 정점을 한 번씩만 방문하는 알고리즘입니다. 이런 BFS가 아래의 조건일 때는 최단거리 알고리즘으로 사용됩니다. 모든 가중치가 1일 때 BFS를 이용해서 해결할 수 있는 문제의 조건 최소 비용의 문제이어야 한다. 간선의 가중치가 1이어야 한다. 정점과 간선의 갯수가...","categories": ["BOJ"],
        "tags": ["BOJ","BFS","14442","16933","16943"],
        "url": "http://localhost:4000/boj/BFS-practice-3/",
        "teaser": null
      },{
        "title": "BFS 문제 풀이 - 1",
        "excerpt":"Goal : 최단거리 알고리즘으로서의 BFS를 내 손이 멋대로 짜게 한다. 개념 BFS는 임의의 정점에서 모든 정점을 한 번씩만 방문하는 알고리즘입니다. 이런 BFS가 아래의 조건일 때는 최단거리 알고리즘으로 사용됩니다. 모든 가중치가 1일 때 BFS를 이용해서 해결할 수 있는 문제의 조건 최소 비용의 문제이어야 한다. 간선의 가중치가 1이어야 한다. 정점과 간선의 갯수가...","categories": ["BOJ"],
        "tags": ["BOJ","BFS","2178","7576","1697","14226"],
        "url": "http://localhost:4000/boj/BFS-practice/",
        "teaser": null
      },{
        "title": "[이분탐색] Binary search tree ",
        "excerpt":"이분탐색으로 정답 찾기 정답을 구하는 문제 : A에서 B까지 가는 가장 빠른 길을 찾는 문제 가능한지 살펴보는 문제 : A에서 B까지 X시간동안 갈 수 있는지 판단하는 문제(YES/NO) 1번과 같은 문제가 있을 때 정확한 답을 구하는 알고리즘을 생각하기 어려울 때가 있습니다. 그래서 예비 정답의 값을 결정한 상태에서 해당 값이 정답이 될...","categories": ["Algorithm"],
        "tags": ["BOJ","Binary-Search"],
        "url": "http://localhost:4000/algorithm/Binary-Search/",
        "teaser": null
      },{
        "title": "2019 경인지역 6개대학 연합 프로그래밍 경시대회 예선 후기",
        "excerpt":"19년 5월 26일에는 2019 Shake 예선전이 진행됐다. 한국항공대학교 대표 10인을 뽑기 위한 자리였고 학교 과학과 115에서 진행돼었다. 원래는 학교 전산실에서 공용 컴퓨터로 인터넷 연결을 끊고 진행해야하는데, 주말에는 전산실을 빌릴 수 없어서 강의실에서 모였다. 10인을 뽑기 위한 교내 예선인데 구글독스를 통해서 참가 신청을 한 인원은 대량 25명정도. 하지만 실제 예선에 온...","categories": ["Review"],
        "tags": ["BOJ","SHAKE"],
        "url": "http://localhost:4000/review/SHAKE-Qualifying/",
        "teaser": null
      },{
        "title": "기본 Python sysntax 정리 Part 1.",
        "excerpt":"PART 1 시작하기 01 파이썬 설치하기 www.python.org 02 편집기 설치하기 노트패드++ 설치 권장 새 파일 만들어서 내 문서에 확장자 .py로 저장 파워셸 실행 win + R 03 Hello World! 출력하기 () : 어떤 글자를 출력할지 알려 주는 역할 ’’ 또는 “” 사용 파워셸에서 python 실행 후 exit()로 종료 PART 2...","categories": ["Python"],
        "tags": ["python","syntax"],
        "url": "http://localhost:4000/python/python-basic-syntax-1/",
        "teaser": null
      },{
        "title": "기본 Python sysntax 정리 Part 2.",
        "excerpt":"PART 10 딕셔너리와 튜플 ###28 딕셔너리 # '이름표1' : '값1' 형태 # 값은 리스트를 포함해서 무엇이든 올 수 있다. dict1 = { '가위' : ' 보' , '보' : '바위', '바위' : ' 가위' , 1:2 , 'one': 1}로 구현. dict1 = { '가위' : ' 보' , '보' :...","categories": ["Python"],
        "tags": ["python","syntax"],
        "url": "http://localhost:4000/python/python-basic-syntax-2/",
        "teaser": null
      },{
        "title": "기본 Python sysntax 정리 Part 3.",
        "excerpt":"PART 13 논리 연산과 if문 더 알아보기 40 논리 연산 더 알아보기 and : 연결된 모든 식이 True일 때만 True :연결된 식 중 하나라도 False 이면 False : A and B 에서 A가 True 일 때 B의 결과를 따름. : A and B 에서 A가 False 이면 B는 판단하지 않고...","categories": ["Python"],
        "tags": ["python","syntax"],
        "url": "http://localhost:4000/python/python-basic-syntax-3/",
        "teaser": null
      },{
        "title": "[위상정렬] Topological Sort",
        "excerpt":"개념 사이클이 없는 유향 그래프에서, 방향성을 거스르지 않고 정점들을 나열하는 방법입니다. 즉, 방향 그래프에 존재하는 각 정점들의 선행 순서를 위배하지 않으면서 모든 정점을 나열하는 것이다. DFS를 이용한 구현 위와 같이 7개의 노드로 구성된 그래프에서 위상정렬을 구해보겠습니다. Root인 1번부터 시작해서 BFS를 진행합니다. BFS는 노란색-&gt;하늘색-&gt;빨간색 순서로 진행된다고 가정합니다. 노란색 DFS를 진행합니다. 순서대로...","categories": ["Algorithm"],
        "tags": ["Sort","Topological-Sort"],
        "url": "http://localhost:4000/algorithm/Topological-Sort/",
        "teaser": null
      },{
        "title": "[Edit distance] 편집거리",
        "excerpt":"정의 두 문자열의 유사도에서 다음 두 개의 개념이 나온다. Hamming distance: 단순히 틀린 글자수 이것은 두 문자열에 대해서 같은 index에 있는 모든 문자들을 비교하면 된다. 편집 거리 (Edit distance) 문자열 A를 문자열 B로 바꾸기 위해서는 다음 연산이 몇 번 필요한가? 한 글자 지우기 한 글자 넣기 한 글자 다른 글자로...","categories": ["Algorithm"],
        "tags": ["DP","Edit-distance"],
        "url": "http://localhost:4000/algorithm/Edit-Distance/",
        "teaser": null
      },{
        "title": "[LCS] 최장 공통 부분 서열 ",
        "excerpt":"정의 부분 서열 (subsequence) : 주어진 서열에서 0개, 또는 그 이상의 글자를 지워서 얻을 수 있는 서열 공통 부분 서열 (common subsequence) : 두 서열이 주어졌을 때, 두 서열에 공통인 부분 서열 최장 공통 부분 서열 (LCS) : 공통 부분 서열 중 가장 길이가 긴 것 알고리즘 완전 탐색 길이가...","categories": ["Algorithm"],
        "tags": ["DP","LCS"],
        "url": "http://localhost:4000/algorithm/Longest-Common-Subsequence/",
        "teaser": null
      },{
        "title": "[Idea] Maximum Square 구하기",
        "excerpt":"문제 n x n 칸이 주어져 있고, 각 칸은 흰색 아니면 검은색이다. 흰색으로만 이루어진 가장 큰 정사각형을 찾으시오. 풀이 : DP 이 문제는 , 모든 DP 문제가 다 그렇지만, DP 테이블에서 각 셀이 가지는 의미를 정의하는 것이 매우 중요합니다. D[x][y]: (x, y)가 가장 오른쪽 아래 꼭지점인 가장 큰 정사각형의 한...","categories": ["Algorithm"],
        "tags": ["Idea","DP","Maximum-square"],
        "url": "http://localhost:4000/algorithm/Maximum-Square/",
        "teaser": null
      },{
        "title": "[2252] 줄 세우기",
        "excerpt":"풀이 입력을 받으면서 인접리스트와 각 노드의 진입차수를 만든다. 모든 노드에 대해서 3. ~ 6.과정을 반복하고 종료한다. 방문하지 않았고, 루트노드인 경우 q에 넣는다. q에서 가장 앞의 노드를 빼고 해당 노드를 지우면서 연결된 노드들의 인접간선을 -1 한다. 인접간선을 변경한 노드 중에서 인접간선의 값이 0이 된 노드를 q에 넣는다. q가 empty가 되면 종료한다....","categories": ["BOJ"],
        "tags": ["BOJ","Sort","Topological-Sort"],
        "url": "http://localhost:4000/boj/2252-Topological-Sort/",
        "teaser": null
      },{
        "title": "[SHAKE][2019] 예선 1번 풀이",
        "excerpt":"풀이 특별한 알고리즘이나 자료구조는 필요하지 않았습니다. N : 전체 문제의 수 a : 이건 뭐였는지 잘 기억이 안납니다. 문제가 공개되면 수정하겠습니다. K : 맞출 수 있는 최대 문항의 수 모든 문제에 대해서 100점을 받을 수 있는지 140점을 받을 수 있는지 판단한다. 해당 문제에서 받을 수 있는 점수들을 vector에 넣는다. vector를...","categories": ["SHAKE"],
        "tags": ["BOJ","SHAKE"],
        "url": "http://localhost:4000/shake/shake-qualifying-problem-1/",
        "teaser": null
      },{
        "title": "[SHAKE][2019] 예선 2번 풀이",
        "excerpt":"풀이 본 풀이는 부분 점수 (100점/140점)을 받은 풀이입니다. 모든 선물을 0시간에 처리할 수 있으므로 a와 b의 vector에 선물 포장의 번호를 넣는다. 모든 과정이 끝나면 a와 b를 차례로 돌면서 넣었던 값들을 출력한다. 본 대회의 문제를 다시 볼 수 있게 되면 추가적인 풀이를 작성하겠습니다. 코드 #include &lt;iostream&gt; #include &lt;string&gt; #include &lt;vector&gt; using...","categories": ["SHAKE"],
        "tags": ["BOJ","SHAKE"],
        "url": "http://localhost:4000/shake/shake-qualifying-problem-2/",
        "teaser": null
      },{
        "title": "히스토그램부터 모폴로지까지",
        "excerpt":"CGV-2019-오일석-02장 영상처리.pptx 히스토그램 히스토그램 계산 영상 f의 히스토그램은 명암값이 나타난 빈도수로, [0,L - 1] 사이의 명암값 각각이 영상에 몇 번 나타나는지 표시한다. 알고리즘 (2-1) 식(2.1) 식(2.2) 예제 (2-1) 히스토그램 용도 영상의 특성 파악 어두운 영상인지, 밝은 영상인지 파악 이진화를 진행할 때 히스토그램이 어느 쪽으로 치우쳐있는지는 사용함. 두 개으 봉우리가 뚜렷하다면...","categories": ["Opencv"],
        "tags": ["opencv"],
        "url": "http://localhost:4000/opencv/opencv-chapter-2/",
        "teaser": null
      },{
        "title": "에지 검출의 기초부터 선분검출까지",
        "excerpt":"CGV-2018-오일석-03장 에지 검출 - 2017 CV 자료.pptx 의미 및 목적 에지는 물체의 경계를 표시해준다. 이 에지를 대상의 매칭에 유용한 선분이나 곡선으로 변환할 수 있다. 한계 실종된 에지 또는 거짓된 에지를 가질 수 있다. 이들을 각각 false negative : 에지가 아닌데 에지라고 추출된 에지 false positive : 에지인데 에지가 아니라고 판단된...","categories": ["Opencv"],
        "tags": ["opencv"],
        "url": "http://localhost:4000/opencv/opencv-chapter-3/",
        "teaser": null
      },{
        "title": "Opencv 과제 ppt 공부할 내용 정리",
        "excerpt":"CGV-2019-팀과제-동영상-edge_ 원본_영상_blending.pptx 공식 $ I = /alpha F + (1 - /alpha)B$ 단, $0&lt;= /alpha &lt;= 1$ 응용 Fade-out : 비디오 장면 전환 효과 – 화면이 서서히 어두워 짐. 동영상 Frame 과 Background 의 blending α = 1 -&gt; 0 1. cv.SetCaptureProperty 는 CvCapture 객체의 속성값을 설정하며 cv.GetCaptureProperty 는 CvCapture...","categories": ["Opencv"],
        "tags": ["opencv"],
        "url": "http://localhost:4000/opencv/opencv-final-exam-assignment/",
        "teaser": null
      },{
        "title": "지역 특징점 검출부터 스케일 불변 특징점 검출까지",
        "excerpt":"CGV-2019-오일석-04장 지역 특징 검출 - 필기.pptx Preview 대응점 혹은 matching points 찾기 : Key, Feature, corner point를 찾으면 된다. 같은 장면을 다른 시점에서 찍은 두 영상에서 대응하는 점의 쌍을 찾는 문제에 적용된다. 파노라마, 물체 인식/추적, 스테레오 등 컴퓨터 비전의 중요한 문제 해결의 단초이다. Mathing을 위한 세 단계는 아래와 같다. 검출...","categories": ["Opencv"],
        "tags": ["opencv"],
        "url": "http://localhost:4000/opencv/opencv-chapter-4/",
        "teaser": null
      },{
        "title": "기계학습",
        "excerpt":"PREVIEW 지식은 구별할 수 있는 근거가 된다. 학습 : 경험으로 지식을 습득한다. 실패로부터 지식을 배운다. E.g. 자전거를 타다가 넘어지지 않도록 넘어지는 방향으로 핸들을 돌린다. 오류 = 결과 - 목표 기계 학습 사람의 학습 과정을 기계로 흉내 낸다. 학습 모델은 학습 구조 또는 알고리즘을 의미한다. 훈련된 모델을 판단 모델이라고 한다. 기존의...","categories": ["Opencv"],
        "tags": ["opencv"],
        "url": "http://localhost:4000/opencv/opencv-chapter-8/",
        "teaser": null
      },{
        "title": "[Kruskal] 크루스칼 최소신장트리",
        "excerpt":"목표 모든 정점을 최소 비용으로 연결하는 최적 해답을 구하는 것 최적 해답? Kruskal MST 알고리즘에서 최적 해답은 MST로 구현됩니다. Minimum Spanning Tree의 약어로 여기에서 자세한 내용을 확인하세요. 아이디어 탐욕적인 방법(greedy method)을 이용하여 네트워크(가중치를 간선에 할당한 그래프)의 모든 노드들을 최소 비용으로 연결합니다. 탐욕적인 방법? 결정을 해야 할 때마다 그 순간에 가장...","categories": ["Algorithm"],
        "tags": ["Kruskal","MST"],
        "url": "http://localhost:4000/algorithm/Kruskal/",
        "teaser": null
      },{
        "title": "[Union-find] 유니온 파인드 ",
        "excerpt":"정의 Disjoint-set 서로 중복되지 않는 부분 집합들로 나눠진 원소들에 대해 정보를 저장하고 조작하는 자료구조입니다. 즉, 공통 원소가 없는(서로소인, 상호배타적인, 교집합이 공집합인) 부분 집합들로 나눠진 원소들을 다루는 방법입니다. Union-Find Disjoint-Set을 표현할 때 사용하는 알고리즘 입니다. 구조 집합을 구현하는데 벡터, 배열, 연결 리스트 등을 이용할 수 있으나 그 중 가장 효율적인 방법은...","categories": ["Algorithm"],
        "tags": ["Kruskal","MST","Union-find","Cycle"],
        "url": "http://localhost:4000/algorithm/Union-find/",
        "teaser": null
      },{
        "title": "[최소 신장 트리] Mimimum spanning tree",
        "excerpt":"정의 Spanning Tree 그래프 내의 모든 정점을 포함하는 트리를 말합니다. 최소 연결 부분 그래프입니다. 최소 연결이라는 것은 가장 적은 수의 간선으로 모든 정점을 연결한 것을 의미합니다. N개의 노드가 있으면 이들 모두를 연결하는 최소 에지는 N-1개입니다. N개의 에지가 N-1개의 간선으로 연결되어 있으면 이것이 바로 Spanning-tree입니다. -Minimum Spanning Tree Spanning tree인데, N개의...","categories": ["Algorithm"],
        "tags": ["spanning-tree","minimum-spanning-tree","MST"],
        "url": "http://localhost:4000/algorithm/Mimimum-spanning-tree/",
        "teaser": null
      },{
        "title": "[CCW] Counterclockwise ",
        "excerpt":"목적 세 개의 노드를 연결하는 두 에지가 시계 방향으로 연결되어있는지, 시계 반대 방향으로 연결되어 있는지 판단한다. 아이디어 두 에지의 외적을 사용해서 구현한다. 외적 값이 양수 : 좌회전, 시계 반대 반향 외적 값이 음수 : 우회전, 시계 방향 외적 값이 0 : 세 노드가 같은 직선상에 존재한다. 구현 int ccw(int x1,...","categories": ["Algorithm"],
        "tags": ["CCW"],
        "url": "http://localhost:4000/algorithm/CCW/",
        "teaser": null
      },{
        "title": "[2448] 별찍기 - 11 ",
        "excerpt":"풀이 충분한 크기의 배열을 만듭니다. 입력 n에 대해서 row는 n, col은 2n-1까지 사용합니다. n의 최대가 3072이므로 충분히 큰 배열을 만들어야 합니다. 저는 1만 * 1만으로 했습니다. 제일 꼭대기의 의 좌표를 계산해서 배열에 저장해줍니다. a[0][n - 1] = ‘’; 제일 위쪽읜 row를 0번이라고 할 때 row%3의 결과에 따라서 아래의 4 가지...","categories": ["BOJ"],
        "tags": ["if"],
        "url": "http://localhost:4000/boj/2448-Draw-Star-11/",
        "teaser": null
      },{
        "title": "[Convex Hull] 컨벡스 헐 ",
        "excerpt":"목적 모든 노드들을 감싸는 가장 작은 볼록 다각형을 구한다. 동작 원리 하나의 기준 노드를 설정한다. 보통 y축 좌표가 가장 낮은 점(1번 노드)을 선택한다. 가장 선택한 가장 낮은 점을 기준으로 그린 x축에 대해서 각이 작은 순서대로 정렬한다. 정렬된 노드들 중 1번과 2번은 항상 Convex-hull의 구성요소가 된다. 모든 노드들을 감싸는 가장 작은...","categories": ["Algorithm"],
        "tags": ["Kruskal","MST"],
        "url": "http://localhost:4000/algorithm/Convex-Hull/",
        "teaser": null
      },{
        "title": "[sort] 정렬 ",
        "excerpt":"목적 자료구조 속에 들어있는 모든 원소들을 원하는 조건에 맞추어서 정렬한다. 주의점 2개의, 혹은 3개의 argument를 필요로 하는데, 첫번째 두개의 argument는 iterator로써 정렬하는 범위를 나타냅니다. 이때 iterator는 random access와, 수정이 가능해야 합니다. stack : iterator를 생성할 수 없을 뿐만 아니라, random access도 수정도 불가능합니다. 따라서 Sort를 사용할 수 없습니다. queue :...","categories": ["Algorithm"],
        "tags": ["Sort","STL"],
        "url": "http://localhost:4000/algorithm/STL-sort/",
        "teaser": null
      },{
        "title": "[아이디어] Subset Sum",
        "excerpt":"문제 n개의 서로 다른 숫자가 주어져 있다. 이 중 k개를 더했을 때 정확하게 합이 S가 되는 것이 있는지 구하는 프로그램을 작성하시오. $O(nlogn)$ 풀이 : K = 2인 경우 모든 숫자를 정렬 two pointers : 제일 작은 값과 제일 큰 값을 가리킨다. 이들을 a, b라고 하자. a+b &lt; S : a를...","categories": ["Algorithm"],
        "tags": ["Two-Pointers","DP"],
        "url": "http://localhost:4000/algorithm/Subset-Sum/",
        "teaser": null
      },{
        "title": "[아이디어] Three Archer Problem + 1000 coins",
        "excerpt":"문제 1 : Three Archer 세 명의 궁수 A,B,C가 있습니다. 이들의 명중률은 각각 30%, 60%, 100%입니다. 이들은 서로를 죽이지 못하면 본인들이 죽습니다. A-&gt;B-&gt;C 순서대로 화살을 쏜다고할 때, A는 어디를 쏴야할까요? 정답 및 풀이 허공. Case 1. B를 쏜다. A가 B를 쏴서 B가 죽는다. : C의 선빵에 의해 A가 죽는다. A가...","categories": ["Algorithm"],
        "tags": ["Idea","Brute-Force","Greedy"],
        "url": "http://localhost:4000/algorithm/Three-Archer-problem/",
        "teaser": null
      },{
        "title": "[아이디어] 주식",
        "excerpt":"문제 n일간의 주식 가격이 n개의 서로 다른 정수로 주어져 있다. 17, 30, 42, 15, 20, 50, 10, 25 이 때 한 번 주식을 사고 한 번 팔 수 있을 때, 얻을 수 있는 최대 이익을 구하시오. 위 예에서 15에 사고 50에 팔면 35의 이익을 얻을 수 있고, 이 값이 최대이익이다....","categories": ["Algorithm"],
        "tags": ["Idea","Line-Sweeping"],
        "url": "http://localhost:4000/algorithm/stock/",
        "teaser": null
      },{
        "title": "[아이디어] 게임 ",
        "excerpt":"문제 n개의 노드로 이루어진 그래프가 있다. 이 그래프를 가지고 A, B가 게임을 하는데, A는 질문을 하고 B는 이 질문에 대해 답을 한다. 만약 질문을 하는 쪽이 그래프가 연결 그래프라는 것을 알게 되면 게임은 끝난다. 게임을 재미있게 하기 위해서, B는 모든 가능한 질문인 (n,2)개의 질문을 다 한 다음에야 A가 연결 그래프라는...","categories": ["Algorithm"],
        "tags": ["Idea","Graph","Connected-Graph"],
        "url": "http://localhost:4000/algorithm/game/",
        "teaser": null
      },{
        "title": "[SCPC][2016/5]징검다리 + 개구리 뛰기 ",
        "excerpt":"문제 : SCPC 2016 징검다리 0번부터 n번까지 번호가 매겨진 징검다리가 있다. 이 다리를 건너는데 오른쪽으로 한 칸부터 k칸까지 건너갈 수 있고, 두 가지 제약 조건이 있다. 지뢰가 묻혀진 돌들이 있어서 밟으면 안된다. 연속해서 두번 같은 칸을 뛰면 안된다. 이제 n번 돌까지 가는 가짓수를 구하시오. 풀이 : SCPC 2016 징검다리 각...","categories": ["Contest"],
        "tags": ["Line-Sweeping","Greedy"],
        "url": "http://localhost:4000/contest/SCPC-2016-stone-bridge/",
        "teaser": null
      },{
        "title": "[SCPC][2015][예선] 1번 MT 문제",
        "excerpt":"간략히 정리한 문제 원본 문제 링크 A, B 두 과 사람들이 다음과 같은 게임을 한다. A과의 학생은 a명, B과의 학생은 b명이다. N, K가 주어졌을 때 다음과 같은 게임을 한다. 1부터 시작해서 모든 학생은 1~k 개의 연속한 숫자를 부를 수 있다. A과가 먼저 시작하고 A과의 모든 학생이 자신이 정한 숫자(1~k)개의 수를...","categories": ["Contest"],
        "tags": ["SCPC","DP"],
        "url": "http://localhost:4000/contest/SCPC-2015-MT-game/",
        "teaser": null
      },{
        "title": "Lecture 10. Atomic Action",
        "excerpt":"배경 두 명의 사람이 있습니다. 생산자와 소비자입니다. 이들은 각각 공유 메모리에 데이터를 채우는 역할과 사용하는 역할을 맡습니다. 커널의 메모리는 Text,Data,BSS,Stack(이하 TDBS)로 나뉘어져서 여러 프로세스들에 의해 공유되어 사용됩니다. 공유 메모리는 Circler Queue의 형태로 표현될 수 있고, 이는 TDBS의 BSS 부분에 위치합니다. 여러 프로세스를 사용할 때, 어느 프로세스에는 생산자를 만들고 다른 프로세스에는...","categories": ["OS"],
        "tags": ["OS","atomic-action"],
        "url": "http://localhost:4000/os/LN-10-Atomic-Action/",
        "teaser": null
      },{
        "title": "Lecture 13.~15. LOCK & Condition variable",
        "excerpt":"복습 세마포를 사용할 때 자주 동기화 에러가 발생할 수 있습니다. 그래서 아래의 방법을 사용했습니다. $region V when B do S$ 공유 variavle V가 사용되는 구역에서는 Boolean expression을 사용해서 access(If ony B true)를 하고, statement S를 실행했습니다. 또 다른 방법으로는 Monitor가 있는데, 뒤에서 알아보겠습니다. Frome Semaphor to Locks &amp; Condition Variable...","categories": ["OS"],
        "tags": ["OS","Lock","Condition-Variable","Monitor","Dining-Philosophers","Dead-Lock"],
        "url": "http://localhost:4000/os/LN-13-14-Lock-Conditional-variable/",
        "teaser": null
      },{
        "title": "Lecture 11.~12. Semaphor",
        "excerpt":"Semaphor란 ? 세마포는 다익스트라가 1965년에 발명했다고 합니다. 세마포는 두 개의 atomic-operation을 지원합니다. P/wait와 V/signal입니다. 세마포는 그저 하나의 변수일 뿐입니다. 세마포는 처음에 1로 초기화됩니다. Thread는 CS에 들어가기 전에 P-세마포(이하 P)를 Call 하거나 wait-세마포(이하 wait)해야합니다. Thread는 CS를 나올 때 V-세마포(이하 V)를 Call하거나 Signal-세마포(이하 signal)해야합니다. 냉장고 우유의 예시에서 두 쓰레드는 아래의 코드를 똑같이...","categories": ["OS"],
        "tags": ["OS","Samaphor"],
        "url": "http://localhost:4000/os/LN-11-12-Semaphor/",
        "teaser": null
      },{
        "title": "Lecture 15. Readers-Writers-Priority",
        "excerpt":"The Readers/Writers Problem 항공기 예약 시스템을 볼 때 여러 명의 사람들이 공유 데이터를 읽을 수도 있고 여러 사람이 공유 데이터를 쓸 수 있어야 합니다. 하지만 반드시 한 명의 Writer가 공유 데이터의 값을 변경하고 있을 때는 다른 어떤 사람도 해당 데이터에 접근하면 안됩니다. RRR(OK) RWW(NOT-OK) RWR(NOT-OK) 이를 해결하기 위해서는 R과 W의...","categories": ["OS"],
        "tags": ["OS"],
        "url": "http://localhost:4000/os/LN-15-Readers-Writers-Prioritymd/",
        "teaser": null
      },{
        "title": "Lecture 16.~18. Scheduling",
        "excerpt":"목적 추상적으로는 아래의 두 가지를 결정하기 위함입니다. 하나의 프로세스가 얼마나 많은 시간 수행될 것인가? 어떤 프로세스가 수행될 것인가? CPU 스케줄러는 ready queue에서 기다리고 있는 하나를 골라서 CPU에서 돌아가게 합니다. 앞으로의 설명은 모든 프로세스가 메모리 안에 있고, 하나의 프로세스만 CPU에서 실행된다고 가정하겠습니다. 스케줄링은 CPU 효용을 극대화하기 위해서 결정적인 부분입니다. 구체적으로는 아래와...","categories": ["OS"],
        "tags": ["OS","Scheduling"],
        "url": "http://localhost:4000/os/LN-16-18-Scheduling/",
        "teaser": null
      },{
        "title": "Lecture 19.~21. Deadlock",
        "excerpt":"개념 프로세스가 파일을 print 하기 위해서는 두 가지의 자원을 모두 가져야 합니다. 그런데 두 개의 프로세스가 각각 하나씩을 가지고 있으면서 자신이 가진 것을 놓지 않고, 다른 프로세스가 나머지 하나를 놓아주기를 기다리고 있다면 이를 Deadlock이라고 부릅니다. 다르게 표현하면, 데드락은 두 개 이상의 프로세서가 절대 일어나지 않을 , 이 이벤트들은 서로에 의해서만...","categories": ["OS"],
        "tags": ["OS","Deadlock"],
        "url": "http://localhost:4000/os/LN-19-21-Deadlock/",
        "teaser": null
      },{
        "title": "[ICPC][2016][예선] 반지름 + 문자 인코딩 (FB)",
        "excerpt":"문제 : 반지름 (ICPC 2016 예선) n개의 점이 2차원 공간에 주어져 있다. 이 점들을 2개의 집합으로 나누는데, 같은 집합에 속한 가장 먼 두 점 사이의 거리의 합이 최소가 되게 나누고, 이 거리의 합을 구하시오. 풀이 : $N^{2}$으로 가장 먼 두 점 t1,t2를 구하고, 모든 점에 대해서 이들 중 더 가까운...","categories": ["Contest"],
        "tags": ["Sort","STL"],
        "url": "http://localhost:4000/contest/ICPC-2016-radius/",
        "teaser": null
      },{
        "title": "[IOI][2014] 선물 + 작업 배치 (FB)",
        "excerpt":"문제 : 선물 (IOI 2014) 원형 테이블을 L개의 구역으로 나누었다. 각 구역은 차례로 0부터 L-1까지 번호가 매겨져 있고, 총 N명의 사람들이 이 구역 중 하나에 앉아 있다. 이제 이 사람들에게 N개의 선물을 나누어주고 싶다. 선물은 0번 구역에 있고, 인접한 구역으로 이동하는데 1초가 걸린다. 선물은 한 명이 들고 나누어주는데, 이 사람은...","categories": ["Contest"],
        "tags": ["Sort","STL"],
        "url": "http://localhost:4000/contest/IOI-2014-present/",
        "teaser": null
      },{
        "title": "Lecture 22.~23. Memory Part 1.",
        "excerpt":"Memory Management in a Uniprogrammed System 메모리에 저장되어 있는 프로그램의 위치를 이동시키면 반드시 주소값을 변경해야 합니다. OS는 메모리의 고정된 segment를 가집니다. 한 프로세스는 하나의 메모리 세그먼트에서 한 번만 실행될 수 있습니다. 프로세스는 항상 주소 0번지에 load됩니다. 컴파일러와 링커가 물리적인 주소를 생성합니다. 최대 주소값은 전체 메모리 사이즈 - OS 사이즈 입니다....","categories": ["OS"],
        "tags": ["OS","Memory"],
        "url": "http://localhost:4000/os/LN-22-23-Memory-1/",
        "teaser": null
      },{
        "title": "[6064]카잉 달력 ",
        "excerpt":"문제 최근에 ICPC 탐사대는 남아메리카의 잉카 제국이 놀라운 문명을 지닌 카잉 제국을 토대로 하여 세워졌다는 사실을 발견했다. 카잉 제국의 백성들은 특이한 달력을 사용한 것으로 알려져 있다. 그들은 M과 N보다 작거나 같은 두 개의 자연수 x, y를 가지고 각 년도를 와 같은 형식으로 표현하였다. 그들은 이 세상의 시초에 해당하는 첫 번째...","categories": ["BOJ"],
        "tags": ["ICPC","BOJ"],
        "url": "http://localhost:4000/boj/6064-calender/",
        "teaser": null
      },{
        "title": "2019 현대차 정몽구 재단 미래산업 인재 학부 장학생 선발 과정",
        "excerpt":"감사하게도 현대자 정몽구 재단의 미래인재 학부 장학생으로 선발되었습니다. 어떤 과정을 거쳐서 선발이 돼었는지 되도록 자세하게 적어보겠습니다. 이번에 선발된 인원 중에 한국항공대 재학생이 저뿐인 것 같아서 동문들에게 도음이 되고자 합니다! 지원절차 https://www.cmkfoundation-scholarship.org/ 지원 절차는 3단계로 이루어졌습니다. 서류평가 인적성검사 인성면접 서류평가 34개 지정 대학(위 링크 참조)에서 자기 추천 전형으로 지원한 학생들의 서류를...","categories": ["Review"],
        "tags": ["Hyundai"],
        "url": "http://localhost:4000/review/Scholarship-From-Apply-To-Pass/",
        "teaser": null
      },{
        "title": "2019 경인지역 6개대학 연합 프로그래밍 경시대회 본선 후기",
        "excerpt":"결과 46등을 했다. 위 사진은 스코어보드가 얼려졌을 때 기준의 등수이고, 최종 결과를 발표했을 때는 46등이라는 결과를 받았다. 대강 기억나는 최종 결과는 아래와 같았다. 1~5등 수상권은 5문제정도 품 2문제를 풀었다면 딱 60명 중 30등! 1번 문제를 못 푼 사람은 2명뿐 되돌아보기 시작하자마자 모든 문제를 읽어보고 이해하고 5분 10분정도 풀이법을 생각해본 뒤,...","categories": ["Review"],
        "tags": ["BOJ","SHAKE"],
        "url": "http://localhost:4000/review/SHAKE-Final/",
        "teaser": null
      },{
        "title": "[priority-queue] 우선순위 큐 ",
        "excerpt":"목적 자료구조 속에 들어있는 모든 원소들을 원하는 조건에 맞추어서 ‘자동’ 정렬한다. 기본 형태 #include &lt;cstdio&gt; #include &lt;queue&gt; using namespace std; priority_queue&lt;int&gt; pq; int main(void) { pq.push(1); pq.push(3); pq.push(5); pq.push(7); pq.push(19); pq.push(17); while (!pq.empty()) { printf(\"%d \", pq.top()); pq.pop(); } return 0; } //출력 19 17 7 5 3 1 깊은...","categories": ["Algorithm"],
        "tags": ["Priority-queue","STL"],
        "url": "http://localhost:4000/algorithm/STL-priority-queue/",
        "teaser": null
      },{
        "title": "[오버로딩과 오버라이딩] 차이점 ",
        "excerpt":"정의 오버로딩(Overloading) : 같은 이름의 메소드를 여러 개 정의한 뒤, 매개변수의 유형과 개수에 따라 적절한 메소드가 호출되도록 하는 방식. parameter를 load 한 뒤, function call을 사용한다고 생각합시다. 오버라이딩(Overriding) : 상위 클래스가 가지고 있는 메소드를 하위 클래스에서 재정의해서 사용하는 방식. 상위 클래스 위에 하위 클래스가 올라탄다고 생각합시다. operator&lt; 오버로딩 간단한 예제이므로...","categories": ["CPP"],
        "tags": ["Overriding","Overloading"],
        "url": "http://localhost:4000/cpp/overloading-overriding/",
        "teaser": null
      },{
        "title": "[UCPC][2019][예선] A번 풀이",
        "excerpt":"풀이 n층까지 있는 그림과 n+1층까지 있는 그림을 그리고 비교해보면, 매번 1 X 1 크기만큼의 윤곽선이 추가되는 것을 알 수 있습니다. 코드 #include &lt;iostream&gt; using namespace std; int main(void) { int n = 0; long long ans = 0; cin &gt;&gt; n; ans = n * (long long)4; cout &lt;&lt; ans...","categories": ["UCPC"],
        "tags": ["UCPC"],
        "url": "http://localhost:4000/ucpc/UCPC-2018-qual-A/",
        "teaser": null
      },{
        "title": "[UCPC][2019][예선] B번 풀이",
        "excerpt":"풀이 문제의 조건에 따라서 m의 최대값은 15,000입니다. n의 최대값에 대한 1000에 대한 정렬의 시간 복잡도는 $nlogn 1000 * log(1000) = 3000$입니다. 매번 카드 합체를 진행할 때마다 정렬을 진행하면, 15000 * 3000 = 45,000,000이므로 1초 이상의 시간이 소요되는 것으로 생각됩니다. 때문에 priority_queue를 이용해서 전체 정렬을 하지 않고 푸는 방법을 생각해야 합니다....","categories": ["UCPC"],
        "tags": ["UCPC"],
        "url": "http://localhost:4000/ucpc/UCPC-2018-qual-B/",
        "teaser": null
      },{
        "title": "[UCPC][2019][예선] C번 풀이 미완성",
        "excerpt":"문제 UCPC 2018 예선 C번 풀이 11을 22로 바꾸거나 22를 11로 바꾸는 연산(1x1 두 개를 1x2로 합치거나, 1x2를 두 개의 1x1로 나누는 연산)을 기본 연산이라고 하겠습니다. 두 배열에 저장하기 문제에서 두 번째 줄의 입력(a1, a2, …)을 입력 받으면서 1을 입력받으면 한 칸에 1을 적고, 2를 입력 받으면 연속한 두 칸에...","categories": ["UCPC"],
        "tags": ["UCPC"],
        "url": "http://localhost:4000/ucpc/UCPC-2018-qual-C/",
        "teaser": null
      },{
        "title": "[UCPC][2019][예선] D번 풀이",
        "excerpt":"풀이 주어지는 간선의 위치를 받아서 어떤 노드와 어떤 노드가 연결되었는지 트리로 표현합니다. 모든 leaf 노드가 root까지 도달하기 위한 깊이들의 합이 홀수이면 먼저 시작하는 사람이 이기고, 짝수이면 뒤에 시작하는 사람이 이깁니다. 깊이를 찾는 방법은 Tree포스팅을 참고합니다. 코드 #include &lt;cstdio&gt; #include &lt;queue&gt; #include &lt;vector&gt; using namespace std; int n; bool check[500001]; vector&lt;int&gt;...","categories": ["UCPC"],
        "tags": ["UCPC"],
        "url": "http://localhost:4000/ucpc/UCPC-2018-qual-D/",
        "teaser": null
      },{
        "title": "[UCPC][2019][예선] G번 풀이",
        "excerpt":"풀이 UCPC가 차례대로 등장하므로 이를 쭉 읽으면서 체크하면 된다. 코드 #include &lt;cstdio&gt; #include &lt;iostream&gt; #include &lt;string&gt; using namespace std; string s; char arr[4] = { 'U','C','P','C' }; int main(void) { getline(cin,s); int idx = 0; for (int i = 0; i&lt; s.size(); i++) { if (arr[idx] == s[i]) { idx...","categories": ["UCPC"],
        "tags": ["UCPC"],
        "url": "http://localhost:4000/ucpc/UCPC-2018-qual-G/",
        "teaser": null
      },{
        "title": "[Tree] 트리 ",
        "excerpt":"개념 싸이클이 없는 그래프를 의미합니다. 따라서 정점이 N개 일 때, 간선의 갯수는 반드시 N-1개입니다. 특성 반대로 정점이 N개 간선이 N-1개인 그래프는 트리일까요? 아래 그림은 정점이 6개, 간선이 5개인 그래프이지만 싸이클이 존재합니다. 따라서 연견그래프라는 조건까지 추가적으로 제공되어야 트리라는 것을 보장할 수 있습니다. 트리 -&gt; 정점 N개, 간선 N-1개 (O) 정점 N개,...","categories": ["Algorithm"],
        "tags": ["Tree","Height","Depth"],
        "url": "http://localhost:4000/algorithm/Tree/",
        "teaser": null
      },{
        "title": "[UCPC][2019][예선] H번 풀이",
        "excerpt":"풀이 삼성 SW 엑스퍼트 사이트의 개인 역량 확인 문제가 생각나는 문제입니다. 물론 그것보다는 많이 어려웠습니다. 6번째 줄이 어떤 의미인지 이해하는 것은 이 문제에서 중요하지 않습니다. 4번째 줄은 i가 1부터 n까지 1씩 증가하므로 n번 실행됩니다. 5번째 줄은 j가 1부터 n까지 커지는데 커지는 양(이하 step)이 1,2,3, …,n-1, n으로 증가합니다. 따라서 [1,n]에서 step이...","categories": ["UCPC"],
        "tags": ["UCPC"],
        "url": "http://localhost:4000/ucpc/UCPC-2018-qual-H/",
        "teaser": null
      },{
        "title": "3학년 여름방학 되돌아보기",
        "excerpt":"방학이 시작한지 약 3주가 지났다. 지금까지는 무작정 잡히는대로 공부하고 그랬는데 앞으로 방학을 어떻게 보낼지 정리해보려고 한다. 공부 알고리즘 문제풀이 및 대회 21일동안 약 65문제를 풀었다. 백준 단계별로 풀어보기의 ‘고양이 출력하기’부터 UCPC 2018 예선의 5문제까지 다양한 난이도의 문제를 풀어보았다. 여름 방학이 시작하고 7월 7일까지는 거의 단계별로 풀어보기에 집중했다. 학기 중에 몇몇...","categories": ["Review"],
        "tags": ["Daily-Life"],
        "url": "http://localhost:4000/review/From-6-20-To-07-14/",
        "teaser": null
      },{
        "title": "알고리즘과 입출력",
        "excerpt":"입력받는 TC의 갯수를 모를 때 : EOF 까지 입력 받기 터미널에서 직접 입력을 넣으실 땐 EOF를 수동으로 넣어주셔야 합니다. 윈도우 기준으로는 Ctrl + Z, UNIX 기준으로는 Ctrl + D입니다. #include &lt;iostream&gt; #include &lt;string&gt; using namespace std; int a = 1, b=1; int main(void) { while (cin &gt;&gt; a &gt;&gt; b)...","categories": ["Algorithm"],
        "tags": ["IO"],
        "url": "http://localhost:4000/algorithm/STD-IO/",
        "teaser": null
      },{
        "title": "[1406]에디터 ",
        "excerpt":"풀이 커서의 왼쪽에 해당하는 Stack을 하나 만들고, 오른쪽에 해당하는 stack을 하나 만든다. 연산을 수행할 때마다 이들을 사용해서 구현한다. 코드 #include &lt;cstdio&gt; #include &lt;iostream&gt; #include &lt;string&gt; #include &lt;stack&gt; using namespace std; stack&lt;char&gt; l; stack&lt;char&gt; r; stack&lt;char&gt; t; string s; int n; char a, b; int main(void) { cin &gt;&gt; s; for...","categories": ["BOJ"],
        "tags": ["Stack"],
        "url": "http://localhost:4000/boj/1406-editor/",
        "teaser": null
      },{
        "title": "[기업분석] 삼성",
        "excerpt":"직무 : 삼성 사업부 정리 CE : Consumer Electronics 영상 디스플레이 생활가전사업. 혁신적 신제품. 차별화된 디자인. 프리미엄 시장. 스마트 허브를 통해서 주변 기기를 완벽 제어하는 사용자 경험. 생활 가전 소비자 일상에 대한 배려. 보다 편리한 삶. 음성인식 기능 향상. 의료 기기 의료진과 환자들에게 접근성, 정확성, 효율성이 개선된 의료기기 제공. 디자인과...","categories": ["Review"],
        "tags": ["Samsung"],
        "url": "http://localhost:4000/review/Company-Analysis-Samsung/",
        "teaser": null
      },{
        "title": "항공대 잡컨설팅 - 1",
        "excerpt":"목표 겨울방학까지 내가 원하는 가치관 + 산업 + 직무 + 기업을 위한 인턴 준비 완료하기 전환형 인턴으로 똑똑하게 취업하기 구체적인 목표 정하기 아래와 같은 순서대로 정하기 가치관 무엇을 위해서 일을 할 것인가? 어떤 환경에서 일을 할 것인가? 지금까지의 경험으로보아 되도록 치열한 경쟁을 뚫고 성취한 환경이 내 자신의 발전에 크게 도움이...","categories": ["Review"],
        "tags": [],
        "url": "http://localhost:4000/review/Job-Consulting-1/",
        "teaser": null
      },{
        "title": "[10824] 네 수",
        "excerpt":"코드 #include &lt;iostream&gt; #include &lt;string&gt; using namespace std; int a, b, c, d; string sa, sb, sc, sd; int main(void) { cin &gt;&gt; a &gt;&gt; b &gt;&gt; c &gt;&gt; d; sa = to_string(a); sb = to_string(b); sc = to_string(c); sd = to_string(d); sa += sb; sc += sd; cout &lt;&lt;...","categories": ["BOJ"],
        "tags": ["stoll","to_string"],
        "url": "http://localhost:4000/boj/String-stoi/",
        "teaser": null
      },{
        "title": "[10808] 알파벳 갯수",
        "excerpt":"내 코드 #include &lt;cstdio&gt; #include &lt;iostream&gt; #include &lt;string&gt; using namespace std; string s; int arr[26]; int main(void) { cin &gt;&gt; s; for (int i = 0; i &lt; s.length(); i++) { int idx = s[i] - 'a'; arr[idx] += 1; } for (int j = 0; j &lt; 26; j++)...","categories": ["BOJ"],
        "tags": ["Count"],
        "url": "http://localhost:4000/boj/10808-Number-Of-Alphabet/",
        "teaser": null
      },{
        "title": "[10809] 알파벳 찾기",
        "excerpt":"내 코드 #include &lt;cstdio&gt; #include &lt;iostream&gt; #include &lt;algorithm&gt; #include &lt;string&gt; using namespace std; string s; int arr[26]; int main(void) { cin &gt;&gt; s; for (int j = 0; j &lt; 26; j++) { arr[j] = -1; } for (int i = 0; i &lt; s.length(); i++) { if (arr[s[i] -...","categories": ["BOJ"],
        "tags": ["Find"],
        "url": "http://localhost:4000/boj/10809-Finding-Alphabet/",
        "teaser": null
      },{
        "title": "[10844] 쉬운 계단 수",
        "excerpt":"풀이 1차원 dp로는 풀지 못했습니다. dp[i][j]를 길이가 i이고 마지막 숫자가 j인 계단 수라고 정의합니다. 마지막 숫자가 1~8일 때는 다음 숫자를 2개 적을 수 있지만(마지막 수 = 마지막 수 +- 1), 마지막 숫자가 0 또는 9일 때는 두 개를 적을 수 없습니다. 따라서 이것을 분기 해주기 위해서 2차원 dp표를 사용합니다. 코드...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/10844-Easy-Stairs-Number/",
        "teaser": null
      },{
        "title": "[1158] 조세퍼스 문제",
        "excerpt":"풀이 N번째 값을 만날 때까지 front에 있는 값을 pop해서 back에 push 하면 된다. 내 풀이 Queue 두 개 사용해서 출력 편하게 하기. 시간은 더 오래걸림. #include &lt;cstdio&gt; #include &lt;iostream&gt; #include &lt;queue&gt; using namespace std; int n,m; queue&lt;int&gt; q; queue&lt;int&gt; out; int main(void) { cin &gt;&gt; n &gt;&gt; m; for (int...","categories": ["BOJ"],
        "tags": ["Queue"],
        "url": "http://localhost:4000/boj/1158-Josephus/",
        "teaser": null
      },{
        "title": "[11726] 타일링 1",
        "excerpt":"풀이 구해야할 것 : 2 X n 크기의 직사각형을 타일로 채우는 방법의 수 2 X n 크기는 2 x (n-1) 크기의 사각형에 가장 오른쪽에 세로로 타일을 하나 놓는 것 2 X (n-2) 크기의 사각형에 가장 오른쪽에 가로로 타일 두 개를 놓는 것 이렇게 단 두 가지 방법으로만 만들 수 있다....","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/11726-Tileing-1/",
        "teaser": null
      },{
        "title": "[11727] 타일링 2",
        "excerpt":"풀이 구해야할 것 : 2 X n 크기의 직사각형을 타일로 채우는 방법의 수 2 X n 크기는 2 x (n-1) 크기의 사각형에 가장 오른쪽에 세로로 타일을 하나 놓는 것 2 X (n-2) 크기의 사각형에 가장 오른쪽에 가로로 타일 두 개를 놓는 것 2 X (n-2) 크기의 사각형에 가장 오른쪽에 세로로...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/11727-Tileing-2/",
        "teaser": null
      },{
        "title": "[1463] 1로 만들기",
        "excerpt":"내 풀이 #include &lt;iostream&gt; int dp[3000001]; int n; int main(void) { scanf(\"%d\", &amp;n); dp[1] = 0; dp[2] = 1; dp[3] = 1; for (int i = 1; i &lt;= n; i++) { if (dp[3 * i] == 0) { dp[3 * i] = dp[i] + 1; } else { dp[3...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/1464-Make-As-One/",
        "teaser": null
      },{
        "title": "[9095] 1,2,3 더하기",
        "excerpt":"풀이 구해야할 것 : 정수 n을 1,2,3의 합으로 나타내는 방법 정수 n을 1,2,3으로 나타낼 때 가장 마지막에 적는 숫자를 생각해보면 1,2,3 세 가지 경우 뿐입니다. 코드 #include &lt;iostream&gt; int dp[1000001]; int n,t; int main(void) { scanf(\"%d\", &amp;t); while (t--) { scanf(\"%d\", &amp;n); dp[1] = 1; dp[2] = 2; dp[3] =...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/9095-Sum-of-1-2-3/",
        "teaser": null
      },{
        "title": "[header] #include <algorithm> ",
        "excerpt":"*max_element , *min_element #include &lt;iostream&gt; #include &lt;algorithm&gt; using namespace std; int main(){ int size; cin &gt;&gt; size; int *arr = new int[size]; for(int i=0; i&lt;size; i++){ cin &gt;&gt; arr[i]; } cout &lt;&lt; \"max값: \" &lt;&lt; *max_element(arr, arr+size) &lt;&lt; endl; cout &lt;&lt; \"min값: \" &lt;&lt; *min_element(arr, arr+size) &lt;&lt; endl; delete[] arr;...","categories": ["Algorithm"],
        "tags": ["header"],
        "url": "http://localhost:4000/algorithm/STL-Algorithm/",
        "teaser": null
      },{
        "title": "[11053,11722,11054] 가장 긴 X하는 부분 수열, LIS",
        "excerpt":"가장 긴 증가하는 부분 수열 $O(N^{2})$ 풀이 dp[i]는 길이가 i인 경우의 LIS(Longest Increasing Squence)의 길이를 의미합니다. $O(N^{2})$ 알고리즘으로 모든 경우를 다 훑어보는 방법을 사용합니다. 코드 #include &lt;cstdio&gt; #include &lt;algorithm&gt; #include &lt;queue&gt; using namespace std; long long v[1001]; long long dp[1001]; int n; priority_queue&lt;int, vector&lt;int&gt;, less&lt;int&gt; &gt; pq; int main(void) {...","categories": ["BOJ"],
        "tags": ["DP","LIS"],
        "url": "http://localhost:4000/boj/11053-LIS/",
        "teaser": null
      },{
        "title": "[11057] 오르막 수",
        "excerpt":"풀이 dp[i][j]가 길이가 i이고, 마지막 숫자가 j인 오르막 수의 수를 나타낸다고 생각하고 표를 그려보자. 내 코드 #include &lt;iostream&gt; long long dp[1001][10]; int n; int mod = 10007; int main(void) { scanf(\"%d\", &amp;n); for (int j = 0; j &lt; 10; j++) { dp[1][j] = 1; } for (int i =...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/11057-Ascending-Number/",
        "teaser": null
      },{
        "title": "[2156] 포도주 시식",
        "excerpt":"내 풀이 : 2차원 DP dp[i][j]는 마지막으로 마신 잔이 j번째 잔일 때, j번째 잔을 포함한 연속으로 마신 잔의 횟수가 i일 때 총 마신 양 코드 #include &lt;cstdio&gt; #include &lt;algorithm&gt; using namespace std; long long v[10001]; long long dp[3][10001]; int n; /* dp[i][j] : 마지막까지 연속되게 먹은 수가 i이게 총 j잔을...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/2156-Tasting-Wine/",
        "teaser": null
      },{
        "title": "[2193] 이친수",
        "excerpt":"풀이 1 dp[i][j]는 길이가 i이고 마지막 숫자가 j인 이친수의 수 이다. 현재 길이의 이친수가 되기 위해서는 이전 길이의 숫자 중 0과 1로 끝나는 것에 0을 붙히거나, 1로 끝나는 것에 0을 붙혀야 한다. 코드 1 #include long long dp[2][91]; int n; int main(void) { scanf(“%d”, &amp;n); dp[0][1] = 0; dp[1][1] =...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/2193-Pinary-Number/",
        "teaser": null
      },{
        "title": "[9465] 스티커",
        "excerpt":"내 풀이 dp[i][j]는 j번 열에서 i 위치의 스티커를 떼어 얻을 수 있는 최대 점수의 합 dp[0][1] = v[0][1]; dp[1][1] = v[1][1]; dp[0][2] = v[1][1] + v[0][2]; dp[1][2] = v[0][1] + v[1][2]; dp[0][3] : 3번째 열에서 0행에 있는 스티커를 얻을 때, dp[1][1]와 dp[1][2] 중 큰 값에 [0][3]번째 스티커의 가치를 추가해야 한다....","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/9465-Sticker/",
        "teaser": null
      },{
        "title": "[1912] 연속합",
        "excerpt":"풀이 dp[i] = i번째 값을 포함하는 가장 큰 연속합 정답 : dp[1:n] 중 가장 큰 값 dp[i] = max(dp[i-1] + v[i], v[i]) 현재 값을 포함해서 가장 많이 연속해서 더한 것보다, 지금 하나만 더한 것이 더 큰지 아닌지 판단. 코드 #include &lt;cstdio&gt; #include &lt;algorithm&gt; using namespace std; int v[100001]; int dp[100001];...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/1912-Serial-Sum/",
        "teaser": null
      },{
        "title": "[1699] 제곱수의 합",
        "excerpt":"정답 풀이 $O(N^{3/2})$ 숫자 N를 구성하는데 가장 마지막에 더해진 숫자가 $i^{2}$이라면 $dp[N-i^{2}]$의 최솟값에 $i^{2}$를 더하는 1을 더하면 된다. 내 코드 #include &lt;cstdio&gt; #include &lt;algorithm&gt; #include &lt;cmath&gt; using namespace std; int n; int ans = 0; int dp[100001]; int main(void) { scanf(\"%d\", &amp;n); dp[1] = 1; for (int i = 2;...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/1699-Sum-Of-Square-Number/",
        "teaser": null
      },{
        "title": "[2133] 타일링 3",
        "excerpt":"백준님 풀이 tileing-3 dp[i] += dp[i-3] * 3; dp[i] += 2; //위 그림에서 가장 아래의 두 가지 경우를 최대로 연장한 두 가지 for (int j = 2; j &lt; i - 2; j += 2) { dp[i] += dp[j] * 2; //위 그림에서 가운데 부분의 경우를 모두 고려하는 부분 }...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/2133-Tileing-3/",
        "teaser": null
      },{
        "title": "[2579] 계단 오르기",
        "excerpt":"풀이 dp[i] : i번째 계단까지 오르는데 얻을 수 있는 최대 점수 dp[1] = 첫 번째칸 dp[2] = 첫 번째칸 + 두 번째칸 dp[3] = max(첫 번째칸 , 두 번째칸) + 세 번째 칸 n-2, n-1, n번째 칸의 계단을 밟는 것을 O,X로 표현한다고 할 때 모든 경우의 수는 아래와 같습니다. XOO...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/2579-Climbing-Stairs/",
        "teaser": null
      },{
        "title": "양성평등에 반대한다.",
        "excerpt":"next : 그들이 유일하게 이해하는 말, 메갈리아 미러링 양성평등에 반대한다. 2017, 양성평등에 반대한다, 정희진, 교양인, 24page 그녀/그의 피부색이나 태어난 계급의 조건에 맞는 직업, 감정 표현, 옷차림, 섹슈얼리티, 가사 노동 등 일생 전반에 걸친 ‘역할’이 있다고 생각하는 사람은 없다. 즉 “계급 역할(당신은 가난하므로 공부를 하면 안 된다.)”이나 “인종 역할”(당신은 흑인이므로 실업자가...","categories": ["Review"],
        "tags": ["Daily-Life"],
        "url": "http://localhost:4000/review/Book-Resist-To-Gender_Equality/",
        "teaser": null
      },{
        "title": "[2011] 합분해",
        "excerpt":"2차원 DP 풀이 dp[0][i] = i번째 암호가 단독으로 문자로 치환되는 경우 dp[1][i] = i번째 암호가 i-1번째 암호 1과 함께 문자로 치환되는 경우 dp[2][i] = i번째 암호가 i-1번째 암호 2과 함께 문자로 치환되는 경우 일반적으로는 아래와 같은 점화식을 따릅니다. dp[0][i] = dp[0][j - 1] + dp[1][j - 1] + dp[2][j -...","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/2011-Secret-Code/",
        "teaser": null
      },{
        "title": "[2225] 합분해",
        "excerpt":"내 풀이 dp[k][n]는 n를 0~n의 정수를 여러번 k개 사용해서 만드는 경우의 수 dp[k][n]를 채우기 위해서는 dp[k-1][1부터 n까지]를 모두 봐야한다. dp[k-1][x]는 k-1의 수로 x를 만든 것이므로 마지막 k 번째 수를 n-(x)로 더하는 것이 결정 되어있기 때문이다. 돌려 생각하면, k를 만드는데 마지막에 더하는 값이 0부터 n까지인 모든 경우를 다 더하는 것과 같다....","categories": ["BOJ"],
        "tags": ["DP"],
        "url": "http://localhost:4000/boj/2225-Decomposition-Sum/",
        "teaser": null
      },{
        "title": "[1697] 숨바꼭질 1",
        "excerpt":"풀이 시작 위치에서 다음 위치로 갈 수 있는 값을 큐에 넣습니다. 큐에 넣으면서 다음 위치까지 걸리는 시간 = 현재까지 걸린 시간 +1로 저장합니다. 큐에서 하나씩 빼면서 목적지와 같은지 확인합니다. 주의 index 접근을 할 때에 범위 판단을 먼저 해야 out of index error가 나지 않습니다. N 0 을 입력했을 때 답은...","categories": ["BOJ"],
        "tags": ["BFS"],
        "url": "http://localhost:4000/boj/1697-Hide-And-Seek-1/",
        "teaser": null
      },{
        "title": "[2178] 미로탐색",
        "excerpt":"풀이 기본적인 BFS를 구현하면 된다. //가로세로 4 6 //맵 입력 101111 101010 101011 111011 //경로 구하기 1 0 9 10 11 12 2 0 8 0 12 0 3 0 7 0 13 14 4 5 6 0 14 15 //답 15 코드 #include &lt;cstdio&gt; #include &lt;queue&gt; using namespace std;...","categories": ["BOJ"],
        "tags": ["BFS"],
        "url": "http://localhost:4000/boj/2178-Search-Maze/",
        "teaser": null
      },{
        "title": "[확장 유클리드 알고리즘]",
        "excerpt":"유클리드 알고리즘 2개의 자연수(또는 정식) a, b에 대해서 a를 b로 나눈 나머지를 r이라 하면(단, a&gt;b), a와 b의 최대공약수는 b와 r의 최대공약수와 같다. $a = bp+r$ 일 때 $GCD(a,b) = GCD(b,r)$이다. 유클리드 알고리즘 코드 $r = a%b$로 적을 수 있으므로 int gcd(int a, int b) { //b가 0이면 a를, 아니면 gcd(b,a%b)를...","categories": ["Algorithm"],
        "tags": ["Identical-Element","Inverse"],
        "url": "http://localhost:4000/algorithm/Extended-Euclidean-Algorithm/",
        "teaser": null
      },{
        "title": "[모듈러 역원] 나머지 연산의 곱셈의 역원",
        "excerpt":"항등원 항등원이란 집합 내의 어떤 원소와 어떤 연산을 취해도 자기 자신이 되게 하는 원소를 말한다. 집합 S와 S에 대해 닫혀 있는 이항연산 *로 이루어진 마그마 (S, *)가 주어졌을 때, S의 모든 원소 a에 대해 eL * a = a가 성립한다면, eL을 좌항등원이라 한다. S의 모든 원소 a에 대해 a *...","categories": ["Algorithm"],
        "tags": ["Identical-Element","Inverse"],
        "url": "http://localhost:4000/algorithm/Identity-Element/",
        "teaser": null
      },{
        "title": "[GCD, LCM]최대 공약수, 최소 공배수",
        "excerpt":"GCD : Greatest Common Divisor $O(N)$ #include &lt;iostream&gt; #include &lt;algorithm&gt; using namespace std; int main() { int g = 0; int a = 0, b = 0; scanf(\"%d%d\", &amp;a, &amp;b); for (int i = 1; i &lt;= min(a, b); i++) { if (a%i == 0 &amp;&amp; b%i == 0) {...","categories": ["Algorithm"],
        "tags": ["GCD","LCM"],
        "url": "http://localhost:4000/algorithm/GCD-LCM/",
        "teaser": null
      },{
        "title": "[진법 변환] 10진법 -> 8진법 등",
        "excerpt":"10진법 -&gt; N진법 10진법의 수 N을 B진법의 수로 바꾸기 위해서는 N이 0이될 때까지 계속 B로 나눈 나머지를 구하면 된다. 예시 : 11을 3진법($102(3)$)으로 바꾸기 11 / 3 = 몫:3 나머지 2 3 / 3 = 몫:1 나머지 0 1 / 3 = 몫:0 나머지 1 나머지를 거꾸로 적으면 102(3) 3진법...","categories": ["Algorithm"],
        "tags": ["Number-Notation"],
        "url": "http://localhost:4000/algorithm/Number-Notation/",
        "teaser": null
      },{
        "title": "[백트래킹] Back-Tracking",
        "excerpt":"정의 : DFS 브루트포스 그러나 Pruning 백트래킹의 정의는 3가지 요소로 나뉩니다. 모든 경우를 따져보는 브루트포스 알고리즘. 브루트포스를 진행할 때 모든 노드를 한 번씩 방문하는 DFS를 사용한다. DFS를 진행할 때, 답이 될 가능성이 없다고 판단되는 것은 더이상 DFS를 진행하지 않고 현재 위치의 Parent로 돌아간다. 예시 1 : 6603번 로또 문제 아래의...","categories": ["Algorithm"],
        "tags": ["Identical-Element","Inverse"],
        "url": "http://localhost:4000/algorithm/Back-Tracking/",
        "teaser": null
      },{
        "title": "[링크 정리] 관심 기업 채용 페이지",
        "excerpt":"은행 한국 4.2.4963 농협 3.6.5023 신한 3.3.5287 기업 3.8.4940 우리 3.2.4333 KB금융그룹 4.6.4861 저축은행 새마을금고 신협 투자증권 NH투자증권 3.7.5045 신한금융투자 3.6.4000? SK증권 3.5.4875 KB금융그룹 3.3.4866 미래에셋대우 3.2.4482 한국투자증권 3.3.4414 삼성증권 3.0.4250 교보증권 3.5.?? 한양증권 3.4.? 유안타증권 3.1.4086 하나금융투자 3.0.?? 기업 삼성전자 3.7.4355 네이버 SKT SK 현대 KT LG kakao 롯데...","categories": ["Review"],
        "tags": ["Recruiting"],
        "url": "http://localhost:4000/review/Recruiting-URL/",
        "teaser": null
      },{
        "title": "[11403] 경로 찾기",
        "excerpt":"풀이 입접 행렬을 입접 리스트로 바꿔서 저장합니다. 그리고 x에서 y까지 가는 경로를 찾습니다. q에 x를 먼저 넣고 v[x]의 값들 중 y의 값과 같은 것이 있으면 찾은 것이고, 끝까지 못찾으면 x에서 y까지가는 경로가 없는 것입니다. 코드 #include &lt;cstdio&gt; #include &lt;queue&gt; #include &lt;vector&gt; #include &lt;cstring&gt; using namespace std; #define MAX 100 vector&lt;...","categories": ["BOJ"],
        "tags": ["BFS"],
        "url": "http://localhost:4000/boj/11403-Finding-Path/",
        "teaser": null
      },{
        "title": "[14226] 이모티콘",
        "excerpt":"풀이 클립보드에 있는 이모티콘의 수를 s, 클립보드에 있는 이모티콘의 수를 c라고할 때 현재상태 (s,c)에서 다음으로 진행할 수 있는 경우는 세 가지뿐입니다. (s,c) -&gt; (s,s) : 클립보드에 붙혀넣기 (s,c) -&gt; (s+c,c) :스크린에 붙혀넣기 (s,c) -&gt; (s-1,c) : 1개 지우기 이 문제의 핵심은 이 문제가 BFS 문제인 것을 알고 이를 구조화하는데 달려있다고...","categories": ["BOJ"],
        "tags": ["BFS"],
        "url": "http://localhost:4000/boj/14226-Imoticon/",
        "teaser": null
      },{
        "title": "[2667] 단지번호 붙히기",
        "excerpt":"풀이 bfs를 진행하면서 같은 단지에 속하는 좌표를 queue에 넣고, 이를 빼면서 숫자를 센다. 코드 #include &lt;cstdio&gt; #include &lt;queue&gt; #include &lt;algorithm&gt; #include &lt;vector&gt; using namespace std; int map[25][25]; bool check[25][25]; int dx[4] = { 0,0,1,-1 }; int dy[4] = { 1,-1,0,0 }; int bfs(int i, int j) { check[i][j] = true;...","categories": ["BOJ"],
        "tags": ["BFS","Connected-Component"],
        "url": "http://localhost:4000/boj/2667-Numbering-Apartment/",
        "teaser": null
      },{
        "title": "[6603] 로또",
        "excerpt":"Next-Permutation 풀이 1 2 3 5 8 13 21 34이 주어지는 경우, 앞에서부터 1개를 1로 두어 11111100을 만들고 이를 std::prev_permutation을 돌리면서 1의 위치에 있는 값들을 출력한다. 이는 첫번째로 주어지는 숫자 k가 13미만의 작은 수이기 때문에 가능하다. Next-permutation 코드 #include &lt;cstdio&gt; #include &lt;vector&gt; #include &lt;algorithm&gt; using namespace std; int main(void) {...","categories": ["BOJ"],
        "tags": ["Next-Permutation","Back-Tracking"],
        "url": "http://localhost:4000/boj/6603-Lotto/",
        "teaser": null
      },{
        "title": "[7012] 유기농 배추",
        "excerpt":"풀이 연결 요소 문제의 갯수를 구하는 문제로 아파드 단지 구하기 문제와 동일한 문제입니다. 코드 #include &lt;cstdio&gt; #include &lt;queue&gt; #include &lt;algorithm&gt; #include &lt;vector&gt; #include &lt;cstring&gt; using namespace std; #define MAX 50 int map[MAX+1][MAX + 1]; bool check[MAX + 1][MAX + 1]; int dx[4] = { 0,0,1,-1 }; int dy[4] = {...","categories": ["BOJ"],
        "tags": ["BFS"],
        "url": "http://localhost:4000/boj/7012-Organic-Vegetable/",
        "teaser": null
      },{
        "title": "[7576] 토마토",
        "excerpt":"풀이 bfs를 시작할 때 q에 처음 토마토의 위치를 모두 넣고 시작합니다. 코드 #include &lt;cstdio&gt; #include &lt;queue&gt; #include &lt;algorithm&gt; #include &lt;vector&gt; using namespace std; #define MAX 1000 int map[MAX+1][MAX + 1]; bool check[MAX + 1][MAX + 1]; int dx[4] = { 0,0,1,-1 }; int dy[4] = { 1,-1,0,0 }; int n...","categories": ["BOJ"],
        "tags": ["BFS"],
        "url": "http://localhost:4000/boj/7576-Tomato/",
        "teaser": null
      },{
        "title": "[13460] 구슬 탈출 2",
        "excerpt":"풀이 ​최적화된 풀이인지는 모르겠지만 다음과 같은 알고리즘으로 풀면 정답을 받을 수 있습니다. ​R의 좌표를 rx, ry B의 좌표를 bx, by라고 할 때, queue&lt;tuple&lt;rx,ry,bx,by&gt; &gt; q;를 사용해서 BFS를 전개합니다. 이는 R와 B의 좌표를 동시에 다뤄야 함을 의미합니다. ​2. 위에서 만든 Queue에는 R와 B의 시작 좌표 그리고 이 좌표에서부터 특정 방향으로 기울였을...","categories": ["BOJ"],
        "tags": ["BFS"],
        "url": "http://localhost:4000/boj/13460-Bead-Escape-2/",
        "teaser": null
      },{
        "title": "[14500] 테트로미노",
        "excerpt":"풀이 모든 경우를 배열에 저장해주고 모두 확인하면 됩니다. 모든 가능한 테트로미노를 그리고 4칸 중 한 칸을 기준으로 나머지 3칸의 상대적 좌표를 배열로 저장합니다. 배열의 인덱스가 벗어나는 것은 자동으로 체크할 수 있게 짭니다. 코드 #include &lt;cstdio&gt; #define MAX 500 int n, m; int map[MAX + 1][MAX + 1]; int dx[19][4] =...","categories": ["BOJ"],
        "tags": ["Brute-Force"],
        "url": "http://localhost:4000/boj/14500-Tetromino/",
        "teaser": null
      },{
        "title": "[12851] 숨바꼭질 2",
        "excerpt":"풀이 1에서 2로 갈 때 x2를 하는 것과 +1을 하는 것을 서로 다른 방법으로 count 해주어야 한다. queue에서 뺄 때 visit을 해주어서 같은 sec일 때는 하나의 값이 queue에 여러번 들어갈 수 있도록 해야한다. 1 / 2 2 0 / 4 3 4 3 / … : 아래 코드에서 q.size()를 기록하고...","categories": ["BOJ"],
        "tags": ["BFS"],
        "url": "http://localhost:4000/boj/12851-Hide-And-Seek-2/",
        "teaser": null
      },{
        "title": "[프로젝트] 인천공항 제 2 터미널 재배치 대안 평가",
        "excerpt":"프로젝트 설명 학교 교통 물류학부 김병종 교수님 밑에서 항공사 배치 대안 생성 과제에 참여하고 있습니다. 인천공항 터미널 확장 공사가 예정 중이어서 두 터미널 T1, T2에 어떤 항공사들을 배치하는 것이 효율적인지에 대해 여러가지 대안을 생성하고 평가하는 과제입니다. 개인 역할 이 과제에서 제가 맡은 부분은 아래와 같습니다. ​ 2018년 인천공항 취항항공사 목록을...","categories": ["Project"],
        "tags": ["Incheon-Airport"],
        "url": "http://localhost:4000/project/Incheon-Airport/",
        "teaser": null
      },{
        "title": "[프로젝트] 멧돼지 퇴치 시뮬레이션",
        "excerpt":"프로젝트 설명   고구마 밭을 망치는 멧돼지의 행동을 모델링하였습니다.      빨간색은 멧돼지입니다.   자주색은 고구마입니다. 색이 진할수록 높은 가치의 고구마를 의미합니다.   멧돼지가 고구마를 위를 지나가면, 피해를 입은 고구마의 가치가 떨어집니다.   프로젝트 영상      Demo 영상   프로젝트 Repo   https://github.com/niklasjang/kicking_out_wildboar   개발환경   Win10  Python 3.6.8 :: Anaconda  Matplotlib  ","categories": ["Project"],
        "tags": ["Simulation","python","matpoltlib"],
        "url": "http://localhost:4000/project/Kicking-Out-Wildboar/",
        "teaser": null
      },{
        "title": "[프로젝트] OpenCV Toy Projects",
        "excerpt":"opencv_toy_projects Python OpenCV toy projects Obecjt-Tracking 주어지는 영상에서 추적할 대상을 ROI를 사용해서 독립적인 이미지로 저장합니다. 두 영상을 Grayscale로 변환합니다. ORB object를 만들고 두 영상을 DetectAndCompute합니다. 각각의 영상에서 찾아진 특징점들을 Brute-Force 알고리즘을 사용해서 매칭시킵니다. 매칭된 쌍들을 거리에 따라 정렬을 합니다. 정렬은 작은 Window를 구성할 좌표를 결정하는데 사용됩니다. 매칭된 결과를 모두 포함하는...","categories": ["Project"],
        "tags": ["OpenCV","Python"],
        "url": "http://localhost:4000/project/OpenCV-Toy-Projects/",
        "teaser": null
      },{
        "title": "[프로젝트] 룸바  A* & PDDL 드라이버",
        "excerpt":"프로젝트 설명 아마존 창고로봇 영상을 보고 시작한 프로젝트입니다. 좁은 환경에서 다수의 로봇이 목적을 달성하기 위해 최적화된 움직임을 수행하것이 최종 목표입니다. 저를 포함한 6명의 팀원들을 A* 알고리즘과 PDDL 알고리즘을 사용해서 위 목표를 구현하였습니다. 워크플로우 서버에서 PDDL 알고리즘을 수행합니다. rosnodejs와 ROS msg 통신을 사용해서 서버로부터 결과를 받아옵니다. 이때 서버에서 연산되는 결과는 각...","categories": ["Project"],
        "tags": ["Roomba","A.I.","PDDL","A*"],
        "url": "http://localhost:4000/project/Roomba-PDDL-Driver/",
        "teaser": null
      },{
        "title": "[14501] 퇴사",
        "excerpt":"풀이 dp[i] = i일 째에 얻을 수 있는 최대 이익 = max(i번째 날에 끝날 수 있는 일 + 이 일이 시작되기 전에 얻을 수 있는 최대 이익) dp[d] = max(dp[d], dp[curr - 1] + point[curr]); point[i] = i번째 일에 시작하는 날짜의 일을 했을 때 얻을 수 있는 이익 vector[i].push_back(j) :...","categories": ["BOJ"],
        "tags": ["Brute-Force","DP"],
        "url": "http://localhost:4000/boj/14501-Leaving-The-Company/",
        "teaser": null
      },{
        "title": "[14502] 연구소",
        "excerpt":"풀이 0의 위치를 모두 벡터 v에 넣는다. v 길이와 같은 1,1,1,0,0,…,0으로 채워진 vector v2를 만든다. v2를 prev_permutation하면서 v2가 1인 idx의 v의 값이 나타내는 위치에 벽을 세운다. bfs를 통해서 바이러스를 전파시킨다. 남은 0의 갯수를 세서 갱신한다. 코드 #include &lt;cstdio&gt; #include &lt;vector&gt; #include &lt;algorithm&gt; #include &lt;cstring&gt; #include &lt;queue&gt; using namespace std; int...","categories": ["BOJ"],
        "tags": ["Brute-Force","BFS"],
        "url": "http://localhost:4000/boj/14502-Laboratory/",
        "teaser": null
      },{
        "title": "[17142] 연구소 2",
        "excerpt":"풀이 연구소 3 먼저 풀면 연구소 3의 코드를 조금만 고쳐서 통과할 수 있다. 코드 #include &lt;cstdio&gt; #include &lt;vector&gt; #include &lt;algorithm&gt; #include &lt;cstring&gt; #include &lt;queue&gt; #define MAX 50 using namespace std; int map[MAX][MAX]; int map2[MAX][MAX]; int n = 0, m = 0; bool check[MAX][MAX]; vector&lt;pair&lt;int, int&gt; &gt; v; vector&lt;int&gt; loop; queue&lt;pair&lt;int,...","categories": ["BOJ"],
        "tags": ["Brute-Force","BFS"],
        "url": "http://localhost:4000/boj/17141-Laboratory-2/",
        "teaser": null
      },{
        "title": "[17142] 연구소 3",
        "excerpt":"풀이 연구소 1번과 비슷하게 풀 수 있고 주의할 점은 다음과 같습니다. mm일 떄 걸리는 시간의 최대는 대략 2m이 아닌 m*m이라고 생각해야 한다. 바이러스가 ㄹ모양으로 퍼질 때를 고려해야 한다. 문제를 잘 읽자 : 활성 바이러스가 비활성 바이러스가 있는 칸으로 가면 비활성 바이러스가 활성으로 변한다. 코드 #include &lt;cstdio&gt; #include &lt;vector&gt; #include &lt;algorithm&gt;...","categories": ["BOJ"],
        "tags": ["Brute-Force","BFS"],
        "url": "http://localhost:4000/boj/17142-Laboratory-3/",
        "teaser": null
      },{
        "title": "[12100] 2048(Easy)",
        "excerpt":"풀이 제가 제일 못하는 구현 문제입니다. 그래도 나름 깔끔하게 짜서 결국 통과 받았습니다. 시험장에서 풀었다면 못풀었을 것 같네요.. 상하좌우로 기울일 때 배열을 읽는 방향이 중요합니다. 배열이 아래와 같다면 1 2 3 4 5 6 7 8 9 왼쪽으로 기울일 때는 right stack에 3 2 1 순서대로 넣습니다. 1이 top입니다. 그리고...","categories": ["BOJ"],
        "tags": ["Brute-Force"],
        "url": "http://localhost:4000/boj/12100-2048-Easy/",
        "teaser": null
      },{
        "title": "[13458] 시험 감독",
        "excerpt":"풀이 각 시험장에 총감독관을 한 명씩 배치하고, 남는 학생이 있으면 이들을 모두 커버할만큼 부감독관을 추가하면 된다. 코드 #include &lt;cstdio&gt; #include &lt;cmath&gt; int arr[1000000]; int main(void) { int n = 0; scanf(\"%d\", &amp;n); for (int i = 0; i &lt; n; i++) { scanf(\"%d\", &amp;arr[i]); } int b = 0, c...","categories": ["BOJ"],
        "tags": ["longlong"],
        "url": "http://localhost:4000/boj/13458-Supervisor/",
        "teaser": null
      },{
        "title": "[14499] 주사위 굴리기",
        "excerpt":"풀이 주사위 면의 이동을 잘 구현하면 된다. 기본 구현 문제인제 뭐가 틀린 것인지 아직 모르겠다. n을 m으로 적는 오타가 있었다. 코드 #include &lt;cstdio&gt; #include &lt;cmath&gt; #include &lt;vector&gt; using namespace std; int n = 0, m = 0, x = 0, y = 0, k = 0; int map[20][20]; int side[6];...","categories": ["BOJ"],
        "tags": [],
        "url": "http://localhost:4000/boj/14499-Rolling-Dice/",
        "teaser": null
      },{
        "title": "[14503] 로봇 청소기",
        "excerpt":"풀이   아직 안품  ","categories": ["BOJ"],
        "tags": ["Simulation"],
        "url": "http://localhost:4000/boj/14503-Robot-Cleaner/",
        "teaser": null
      },{
        "title": "[3190] 뱀",
        "excerpt":"풀이 뱀이 보고 있는 방향을 체크해주고 나아갈 방향을 구조화 하면 됩니다. 사과를 먹으면 없애줘야합니다. 자신의 몸에 닿아서 종료되는 경우를 추가해야합니다. 맵 밖을 벗어나면 종료합니다. 코드 #include &lt;cstdio&gt; #include &lt;deque&gt; #include &lt;queue&gt; using namespace std; #define MAX 100 #define LOOK_RIGHT 0 #define LOOK_LEFT 1 #define LOOK_DOWN 2 #define LOOK_UP 3 deque&lt;pair&lt;int,...","categories": ["BOJ"],
        "tags": ["Simulation"],
        "url": "http://localhost:4000/boj/3190-2048-Snake/",
        "teaser": null
      },{
        "title": "[1206] [S/W 문제해결 기본] 1일차 - View",
        "excerpt":"풀이 전체를 훑으면서 i,j를 기준으로 좌우 2칸씩 확인하면 된다. 코드 #include &lt;cstdio&gt; #include &lt;cstring&gt; int dx[] = {1,-1,2,-2 }; int dy[] = {0,0,0,0 }; int main(void) { int t = 1; int nx = 0, ny = 0; int ans = 0; while (t&lt;=10) { ans = 0; int n...","categories": ["SWEA"],
        "tags": [],
        "url": "http://localhost:4000/swea/1206-Day-One/",
        "teaser": null
      },{
        "title": "[4012] 요리사",
        "excerpt":"풀이 next_permutation으로 모든 경우를 돌면서 처리하면 된다. 단, i&lt;j인 부분만 판단하면 더 빠르다. next_permutation에서 0과 1부분은 나누고 한 번에 돌리면 더 빠르다. tc를 돌릴 때 마다 초기화를 잘 해주자. vector 초기화를 까먹었었다. 코드 #include &lt;cstdio&gt; #include &lt;vector&gt; #include &lt;algorithm&gt; using namespace std; int map[16][16]; vector&lt;int&gt; v; int main(void) { int...","categories": ["SWEA"],
        "tags": ["Sample-Test","Brute-Force"],
        "url": "http://localhost:4000/swea/4012-Sample-Test-Chef/",
        "teaser": null
      },{
        "title": "[2819][D4]격자판의 숫자 이어 붙이기 ",
        "excerpt":"풀이 기본 DFS를 돌리는데, 방문했던 곳에 다시 방문할 수 있도록 bool 배열을 사용하지 않으면 된다. 코드 #include &lt;cstdio&gt; #include &lt;iostream&gt; #include &lt;set&gt; #include &lt;string&gt; using namespace std; #define LEN 4 int map[LEN][LEN]; set&lt;string, less&lt;string&gt; &gt; s; set&lt;string, less&lt;string&gt; &gt;::iterator it; int dx[] = { 0,0,1,-1 }; int dy[] = {...","categories": ["SWEA"],
        "tags": ["DFS","D4"],
        "url": "http://localhost:4000/swea/2819-Attaching-Numbers-Of-Cross-Board/",
        "teaser": null
      },{
        "title": "[이력서 작성법] 이렇게만 쓴다면 나도!!",
        "excerpt":"출처 본 포스팅의 모든 내용은 여기에서 타고 들어가는 링크들을 보고 정리한 것입니다. 첫 장 개인 정보 사진 이름 이메일 연락처 github주소 블로그 주소 자기 소개 3줄 ~ 5줄 학력 한국항공대학교 입학 ~재학 보유 기술기술 C++ 어느 수준인지 어떤 것을 개발해 보았는지 Python OpenCV 어느 수준인지 어떤 것을 개발해 보았는지 교내...","categories": ["Review"],
        "tags": ["Resume"],
        "url": "http://localhost:4000/review/How-To-Write-Resume/",
        "teaser": null
      },{
        "title": "[17143] 낚시왕",
        "excerpt":"풀이 5개의 int로 구성된 tuple로 풀었더니 너무 느리다. struct를 사용해서 풀이를 작성하자. typedef struct _shark{ int y; int x; int speed; int dir; int size; bool alive; } Shark; tuple(int,int,int)map[101][101]로 하니까 매번 tie(a,b,c)를 해줘야해서 너무 느리다. int map[i][j]에는 크기가 k인 물고기가 위치한다고 배열을 저장하자. 아주 맘에 드는 풀이 https://www.acmicpc.net/source/14212010 내...","categories": ["BOJ"],
        "tags": ["Simulation"],
        "url": "http://localhost:4000/boj/17143-King-Of-Fishing/",
        "teaser": null
      },{
        "title": "[1824][D4] 혁진이의 프로그램 검증 ",
        "excerpt":"풀이 check 배열은 x, y에서 memory를 가지고 direct방향에 온 적이 있는지를 나타낸다. 같은 조건으로 같은 장소를 방문했다면 무한 루프이다. map과 pair를 따로 저장해서 특정 위치에 올 때마다 pair를 갱신한다면, 두 바퀴가 주기인 무한 루프를 잡지 못한다. 1번처럼 해야한다. check 배열에서 mem은 0~15이므로 크기가 16이 들어가야 한다. ret = ret  ...","categories": ["SWEA"],
        "tags": ["DFS","D4"],
        "url": "http://localhost:4000/swea/1824/",
        "teaser": null
      },{
        "title": "[5650] 핀볼",
        "excerpt":"풀이 스택메모리가 1MB이다. 핀볼이 벽을 튕기도 돌아갈 때는 벽까지 온 경로를 그대로 따라감에 착안하여 벽을 만나는 순간 return 하게 해야한다. 코드 #include &lt;algorithm&gt; #include &lt;iostream&gt; #include &lt;cstring&gt; using namespace std; typedef struct { //웜홀 : 저장된 적이 없으면 -1 int x1; int y1; int x2; int y2; }holl; int map[110][110];...","categories": ["SWEA"],
        "tags": ["Sample-Test","Simulation"],
        "url": "http://localhost:4000/swea/5650-Pin-Ball/",
        "teaser": null
      },{
        "title": "[1952] 수영장",
        "excerpt":"풀이 dp[i]는 i월 째까지 다닐 때 가장 적게 다닐 수 있는 비용 dp[i] = min(a,b,c,d) a : dp[i-1] + i월을 1일권으로 다니는 경우 b : dp[i-1] + i월을 1달권으로 다니는 경우 c : dp[i-3] + i-2,i-1,i월을 3달권으로 다니는 경우 d : 1년권으로 다닌 경우 코드 #include &lt;cstdio&gt; using namespace std;...","categories": ["SWEA"],
        "tags": ["Sample-Test","DP"],
        "url": "http://localhost:4000/swea/1952-Swimming-Pool/",
        "teaser": null
      },{
        "title": "[1767][미완성] 프로세서 연결하기",
        "excerpt":"DFS 풀이 가장자리에 있지 않은 모든 코어를 queue에 넣는다. dfs(idx)를 진행하는데, idx는 몇 번째의 core에 대해서 4방향으로 연결을 시도할 것인지를 나타낸다. dfs(idx)의 종료 조건은 마지막 idx의 core까지 모두 연결을 시도한 순간이 된다. idx번째의 core에 대해서 4방향으로 연결을 시도하고, 만약 연결이 가능하면 idx번째의 core는 해당 방향으로 연결된 것으로 간주하고 dfs(idx+1)한다. 만약...","categories": ["SWEA"],
        "tags": ["Sample-Test","NOT-YET"],
        "url": "http://localhost:4000/swea/1767-Connecting-Processor/",
        "teaser": null
      },{
        "title": "[4014] 활주로 건설",
        "excerpt":"풀이 아래와 같은 사항을 체크해야 한다. 가로로 모두 한 번씩 체크 세로로 모두 한 번씩 체크 높이가 높아서 경사로를 건설해야하는 경우 높이가 낮아서 경사로를 건설해야하는 경우 경사로를 건설해야하는데 이미 건설되어서 건설하지 못하는 경우 다음으로 이동해야하는 칸과 현재칸의 높이차가 2이상인 경우 코드 #include &lt;cstdio&gt; #include &lt;cstring&gt; int map[20][20]; bool check[20][20]; using...","categories": ["SWEA"],
        "tags": ["Sample-Test","Simulation"],
        "url": "http://localhost:4000/swea/4014-Constructing-Rail-Road/",
        "teaser": null
      },{
        "title": "[2383] 점심 식사시간",
        "excerpt":"풀이 SWEA의 해설을 보면서 풀이를 정리했다. 두 개의 계단에 대해서 독립적으로 코드를 작성하면서 코드 길이르 줄이고, 에러도 줄인다. 각 사람에 대해서 몇 초에 계단을 다 내려갈 수 있는지를 구하는 코드를 여러번 쓰면서 코드를 줄인다. 자세한 풀이는 [모의 SW 역량테스트 해설]포스팅에 정리하였다. 코드 #define _CRT_SECURE_NO_WARNINGS #include &lt;cstdio&gt; #include &lt;algorithm&gt; using namespace...","categories": ["SWEA"],
        "tags": ["Sample-Test","Simulation"],
        "url": "http://localhost:4000/swea/2383-Lunch-Time/",
        "teaser": null
      },{
        "title": "[2383] 점심 식사시간",
        "excerpt":"생각 이 문제에 대해서 한 3시간 넘게 시간을 쓰면서 코드를 짰다. 문제를 읽고 생각을 해보고 방법을 코드로 옮기고, TC 돌리고 커버 못하는 TC가 있으면 이를 다시 보완하는 방법을 생각해서 코드에 추가하고.. 이렇게 하나보니까 너무 시간이 오래 걸린다. 4시간 안에 하나 풀면 다행일까? 이렇게 공부하면 시험장가서 운좋게 생각을 잘 하면 통과고...","categories": ["SWEA"],
        "tags": ["Solution","DFS"],
        "url": "http://localhost:4000/swea/Solution-2383-Lunch-Time/",
        "teaser": null
      },{
        "title": "[NAVER] Open Class 지원 ",
        "excerpt":"지원 내용 장환석 01041564227 niklasjang@gmail.com 한국항공대학교 소프트웨어학과 2020.02 8월 22일 목 13시 관심있는 기술분야 또는 네이버 서비스에 대해 말씀해주세요. 네이버 크로바의 A.I. 기술에 관심이 많이 있습니다. 대한민국의 대표 검색엔진으로서 가장 많은 사용자가 찾는 검색 엔진이고, 이에 따라 데이터를 가장 잘 모을 수 있는 곳이라고 생각되기 때문입니다. 저는 크로바의 길찾기 서비스에...","categories": ["Review"],
        "tags": ["Resume"],
        "url": "http://localhost:4000/review/NAVER-Developer-Open-Class-Apply/",
        "teaser": null
      },{
        "title": "[NAVER] Open Class 후기 ",
        "excerpt":"NAVER developer Open Class 2019에 다녀왔습니다. 본 행사에서 있었던 내용 중에 기억에 남는 내용을 정리하겠습니다. 본 행사는 5일에 나워서 진행되는 것으로 알고 있고 이번 3차에서는 230명의 사람들을 불렀습니다. 내가 몰랐던 네이버 :: VLive 20대 여성들이 주로 사용하는 VLive라는 서비스가 있습니다. 셀럽들이 개인 방송을 하고 사용자들은 이를 구경합니다. 셀럽 버전 아프리카...","categories": ["Review"],
        "tags": ["naver","developer"],
        "url": "http://localhost:4000/review/NAVER-Open-Class/",
        "teaser": null
      },{
        "title": "3학년 여름방학 되돌아보기",
        "excerpt":"PS 전대프연 예선을 친구들과 참가했다. 두 문제 풀었는데 본선 진출 컷트라인은 6~7문제였다. 이 이후 PS 대회 준비는 마음을 거의 접었고 재미로만 하기로 마음 먹었다. PS는 100% 코테 통과를 목적으로 공부하기로 결정했다. 시기는 기말고사가 끝나는 날부터/ 어쩌면 개강하고나서도 조금은 풀 것 같다. 한 몇 주 동안은 재미가 안올라올 것 같다. 영어...","categories": ["Review"],
        "tags": ["Daily-Life"],
        "url": "http://localhost:4000/review/From-7-15-To-8-31/",
        "teaser": null
      },{
        "title": "[DB] Chapter 1 Database and Database Users",
        "excerpt":"교재 교재는 ‘Fundamentals of Database System’ 7th edition 구글링해서 찾기 6판에서 7판으로 개정되면서 big data 부분이 추가됨. 한글판은 6판까지만 있음 Chapter 1 Database and Database Users 개념 개념 의미 Data 함축적인 의미를 가진 저장할 수있는 알려진 사실 Database 관련된 Data의 집합. 또는 Mini-world를 관리하기 위해서 관련된 것끼리 모아놓은 것. mini-world...","categories": ["Database"],
        "tags": ["database"],
        "url": "http://localhost:4000/database/Fundatmental-Database-1/",
        "teaser": null
      },{
        "title": "[DB] Chapter 2 Database System Concepts and Architecture",
        "excerpt":"교재 교재는 ‘Fundamentals of Database System’ 7th edition 구글링해서 찾기 6판에서 7판으로 개정되면서 big data 부분이 추가됨. 한글판은 6판까지만 있음 Chapter 2 Database System Concepts and Architecture Data Model = (S, O, C) 개념 의미 데이터 추상화 데이터가 어떻게 저장되었는지는 숨기고, 사용자에게 conceptual view를 제공한다. Data Model DB의 구조를 묘사하기...","categories": ["Database"],
        "tags": ["database"],
        "url": "http://localhost:4000/database/Fundatmental-Database-2/",
        "teaser": null
      },{
        "title": "[DB] Chapter 3 Data Modeling Using the Entity-Relationship Model",
        "excerpt":"교재 교재는 ‘Fundamentals of Database System’ 7th edition 구글링해서 찾기 6판에서 7판으로 개정되면서 big data 부분이 추가됨. 한글판은 6판까지만 있음 Chapter 3 Data Modeling Using the Entity-Relationship Model Using High-Level Conceptual Data Models for Database Design data model의 개념에 따라서 나눈 구분 types of concepts 같은 뜻 의미 High Level...","categories": ["Database"],
        "tags": ["database"],
        "url": "http://localhost:4000/database/Fundatmental-Database-3/",
        "teaser": null
      },{
        "title": "[DB] Chapter 4 Enhanced Entity-Relationship and Object Modeling ",
        "excerpt":"교재 교재는 ‘Fundamentals of Database System’ 7th edition 구글링해서 찾기 6판에서 7판으로 개정되면서 big data 부분이 추가됨. 한글판은 6판까지만 있음 Chapter 4 Enhanced Entity-Relationship and Object Modeling 새로운 DB Application 두 가지 종류 Enhanced ER or EER model additional semantic data modeling concepts ER Model + specialization/generalization, category class/subclass relationship,...","categories": ["Database"],
        "tags": ["database"],
        "url": "http://localhost:4000/database/Fundatmental-Database-4/",
        "teaser": null
      },{
        "title": "[DB] Chapter 5 ",
        "excerpt":"교재 교재는 ‘Fundamentals of Database System’ 7th edition 구글링해서 찾기 6판에서 7판으로 개정되면서 big data 부분이 추가됨. 한글판은 6판까지만 있음 Chater 5 : The Relational Data Model and Relational Database Constraints History of Data Models 정보 검색에 대한 내용은 참고 사항으로만 보기!! Relational 형태가 아직까지 쓰이고 이다.라고만 설명하고 넘어감. 1970년에...","categories": ["Database"],
        "tags": ["database"],
        "url": "http://localhost:4000/database/Fundatmental-Database-5/",
        "teaser": null
      },{
        "title": "[DB] Chapter 9 ",
        "excerpt":"교재 교재는 ‘Fundamentals of Database System’ 7th edition 구글링해서 찾기 6판에서 7판으로 개정되면서 big data 부분이 추가됨. 한글판은 6판까지만 있음 Chater 9 : Relational Database Design ER- and EER-to-Relation Mapping ER과 EER을 Ration으로 mapping하는 과정은 conceptual schema 설계 이후의 logical schema 설계의 과정이다. Relation mapping의 결과 relational database schema가 생성된다....","categories": ["Database"],
        "tags": ["database"],
        "url": "http://localhost:4000/database/Fundatmental-Database-9/",
        "teaser": null
      },{
        "title": "[필기TEST] 펄어비스 게임플레이 프로그래머",
        "excerpt":"일정 9월 6일 안양에서 3시간 내외로 직무 관련 필기 TEST를 진행하게 되었다. 직무 관련 필기 면접 2시간, 인성 필기 면접 1시간이다. 후자는 좀 많은 문제를 의식의 흐름따라 쭉 체크하면 될 것으로 생각된다. 한 번도 준비해본 적이 없는 필기 면접, 제대로 준비해보자. 정렬 삽입정렬 #include &lt;cstdio&gt; #define MAX 5 void insert_sort(int...","categories": ["Review"],
        "tags": ["Job-Apply"],
        "url": "http://localhost:4000/review/Pearl-Abyss-Written-Test-Preparing/",
        "teaser": null
      },{
        "title": "[C++] 기본 Syntax 1 ",
        "excerpt":"출력 # include &lt;iostream&gt; int main(void) { int num = 20; std::cout &lt;&lt; \"hello\" &lt;&lt; std::endl; //문자열 출력 std::cout &lt;&lt; num &lt;&lt; std::endl; //변수 출력 std::cout &lt;&lt; \"hello\" &lt;&lt; \" \" &lt;&lt; num &lt;&lt; std::endl; // 문자열, 변수 동시 출력 std::cout &lt;&lt; \"Without\" &lt;&lt; std::endl; return 0; } C++도 헤더파일의...","categories": ["CPP"],
        "tags": ["cpp"],
        "url": "http://localhost:4000/cpp/cpp-basic-syntax-1/",
        "teaser": null
      },{
        "title": "[C++] 기본 Syntax 2 ",
        "excerpt":"파일 분할 //main.cpp # include &lt;iostream&gt; int num = 0; //------------------------------------------------------------------임의의 위치에서 파일 분할 void Increment(void) { num++; } int GetNum(void) { return num; } //------------------------------------------------------------------임의의 위치에서 파일 분할 int main(void) { std::cout &lt;&lt; GetNum() &lt;&lt; std::endl; using namespace std; Increment(); cout &lt;&lt; GetNum() &lt;&lt; endl; return 0; } 주석에서...","categories": ["CPP"],
        "tags": ["cpp"],
        "url": "http://localhost:4000/cpp/cpp-basic-syntax-2/",
        "teaser": null
      },{
        "title": "[C++] 기본 Syntax 3 ",
        "excerpt":"C 언어 복습 const int num = 10; //변수 num 상수화 const int num1 = 10; num1 = 20; //const 선언으로 인해 불가능! const int * ptr1 = &amp;val1; //포인터 ptr1이 가리키는 데이터를 상수화 #include&lt;iostream&gt; int main(void) { int num1 = 10; const int * ptr1 = &amp;num1; std::cout &lt;&lt;...","categories": ["CPP"],
        "tags": ["cpp"],
        "url": "http://localhost:4000/cpp/cpp-basic-syntax-3/",
        "teaser": null
      },{
        "title": "[C++] 기본 Syntax 4 ",
        "excerpt":"조건부 컴파일이란 코드의 일부분을 상황에 따라서 컴파일 하고/안하고를 구분하는 방법이다. 출력문을 출력할지 말지를 결정할 수도 있고, 헤더파일의 중복 삽입을 막을 수도 있다. #include &lt;iostream&gt; #define ADD 1 #define MIN 0 int main(void) { using namespace std; #if ADD cout &lt;&lt; \"123\" &lt;&lt; endl; #endif std::cout &lt;&lt; \"456\" &lt;&lt; std::endl; return...","categories": ["CPP"],
        "tags": ["cpp"],
        "url": "http://localhost:4000/cpp/cpp-basic-syntax-4/",
        "teaser": null
      },{
        "title": "[C++] 기본 Syntax 5 ",
        "excerpt":"const 함수 void Rectangle::ShowRecInfo() const { cout &lt;&lt; \"좌 상단 : \" &lt;&lt; '[' &lt;&lt; upLeft.GetX() &lt;&lt; \",\"; cout &lt;&lt; upLeft.GetY() &lt;&lt; ']' &lt;&lt; endl; cout &lt;&lt; \"우 하단: \" &lt;&lt; '[' &lt;&lt; lowRight.GetX() &lt;&lt; \",\"; cout &lt;&lt; lowRight.GetY() &lt;&lt; ']' &lt;&lt; endl; } 이 함수 내에서는 멤버변수에 저장된 값을...","categories": ["CPP"],
        "tags": ["cpp"],
        "url": "http://localhost:4000/cpp/cpp-basic-syntax-5/",
        "teaser": null
      },{
        "title": "[C++] 기본 Syntax 6 ",
        "excerpt":"우리는 아래와 같이 class를 정의하고 맴버변수를 초기화 해왔다. //SipleClass.h #pragma once #include &lt;iostream&gt; #ifndef __SIMPLECLASS_H__ #define __SIMPLECLASS_H__ using namespace std; class SimpleClass { private: int num = 10; public: void InitMember(int n) { num = n; } void PrintMemberValue() { cout &lt;&lt; num &lt;&lt; endl; } int GetNum() { return...","categories": ["CPP"],
        "tags": ["cpp"],
        "url": "http://localhost:4000/cpp/cpp-basic-syntax-6/",
        "teaser": null
      },{
        "title": "[C++] 기본 Syntax 7",
        "excerpt":"Rectangle::Rectangle(const int &amp;x1, const int &amp;y1, const int &amp;x2, const int &amp;y2) : upLeft(x1, y1), lowRight(x2, y2) { //Empty } 이전 포스트에서 위와 같은 멤버 이니셜라이져를 공부했습니다. 멤버 이니셜라이져는 앞서 본 예제처럼 객체를 초기화할 때도 사용할 수 있지만, 기본적으로는 멤버의 초기화에도 사용할 수 있습니다. ​ //main.cpp #include &lt;iostream&gt; #include \"SoSimple.h\"...","categories": ["CPP"],
        "tags": ["cpp"],
        "url": "http://localhost:4000/cpp/cpp-basic-syntax-7/",
        "teaser": null
      },{
        "title": "[C++] 기본 Syntax 8",
        "excerpt":"멤버함수 내에서 this라는 포인터를 사용할 수 있습니다. this는 객체 자신을 가리키는 용도로 사용합니다. //SimpleClass.h #include &lt;iostream&gt; #ifndef __SIMPLECLASS_H__ #define __SIMPLECLASS_H__ using namespace std; class SimpleClass { private: int num; public: SimpleClass() { num = 0; cout &lt;&lt; \"Address is...\" &lt;&lt; this &lt;&lt; endl; } int&amp; GetNum() { return num; }...","categories": ["CPP"],
        "tags": ["cpp"],
        "url": "http://localhost:4000/cpp/cpp-basic-syntax-8/",
        "teaser": null
      },{
        "title": "[NNStreamer] 공개 SW 컨트리뷰톤 시작하기 ",
        "excerpt":"발대식 공개 SW 컨트리뷰톤 2019에 참가하게 되었습니다. 삼성전자 리서치 소속의 멘토님이 이끌어주시는 NNstreamer 프로젝트에 선발되었습니다. 발대식 당일에는 20개팀 전체 200명정도 되는 멘토,멘티 그리고 관계자분들이 많이 참석하셨습니다. 태풍 링링으로 우산이 뒤집혀지는 날씨였는데도 많이 참석해주셨습니다. 현장에서는 오픈소스 장인분들이 엄청 많았습니다. 저는 잘 이해가 안되는 말도 먼저 알고 오신 멘티분들도 많았습니다. 전년도 컨트리뷰톤에서...","categories": ["NNstreamer"],
        "tags": ["nnstreamer"],
        "url": "http://localhost:4000/nnstreamer/Setting-Up-VirtualBox/",
        "teaser": null
      },{
        "title": "[NNStreamer] Gstreamer 설치 및 테스트 실행 ",
        "excerpt":"본 포스팅은 여기를 참조합니다. Gstreamer 이해하기 Gstreamer 설치 gstreamer공식 페이지에서 설치 명령어를 찾아서 실행합니다. $ apt-get install libgstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-doc gstreamer1.0-tools gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-qt5 gstreamer1.0-pulseaudio development environment 구축하기 gstreamer를 사용하기 위한 환경으로는 gcc compiler와 texteditor가 있습니다. GCC란? 그리고 GNU란? GCC의 정의를 찾아보면 아래와 같이...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer"],
        "url": "http://localhost:4000/nnstreamer/Installing-Gstreamer/",
        "teaser": null
      },{
        "title": "[NNStreamer] Gstreamer 기본 튜토리얼 1",
        "excerpt":"본 포스팅은 여기를 참조합니다. 목표 새로운 library를 접할 때 Hello World를 찍는 것보다 더 큰 첫 인상은 없을 것입니다. 하지만 저희가 사용하려고 하는 Gstreamer는 multimedia framework이기 때문에 hello world 대신에 비디오를 실행시켜보겠습니다. 아래의 코드가 너무 많아보여도 겁먹지 마세요. 실제로 동작하는 코드는 단 4줄뿐이고, 나머지는 cleanup code 그리고 verbose에 관한 것입니다....","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer"],
        "url": "http://localhost:4000/nnstreamer/Basic-Tutorials-For-GStreamer-1/",
        "teaser": null
      },{
        "title": "[NNStreamer] Gstreamer 기본 튜토리얼 2",
        "excerpt":"목표 이전 포스팅에서는 pipeline을 자동으로 생성했는데 이번에는 각 요소들을 instantiating하면서 manual하게 pipeline을 만들어 보겠습니다. Gstreamer 요소를 만드는 방법 각 요소를 연결하는 방법 각 요소의 behavior를 커스텀하는 방법 bus를 에러 컨디션과 메시지를 얻기 위해서 watch하는 방법 Manual Hello World //basic-tutorial-2.c #include &lt;gst/gst.h&gt; int main(int argc, char *argv[]) { GstElement *pipeline, *source,...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer"],
        "url": "http://localhost:4000/nnstreamer/Basic-Tutorials-For-GStreamer-2/",
        "teaser": null
      },{
        "title": "[NNStreamer] Gstreamer 기본 튜토리얼 3",
        "excerpt":"본 포스팅은 여기를 참조합니다. 목표 파이프 라인을 즉석에서(on the fly) building 하는 방법에 대해서 알아봅니다. Introduction 파이프라인은 playing state가 되기 전에는 완벽하게 build된 상태가 아닙니다. 만약 playing state로 설정하지 않으면 데이터는 pipeline의 end에 도달해서 error msg를 띄우고 멈출 것입니다. 이 예제에서 우리는 container file에서 오디오와 비디오가 함께 저장된(multiplxed, muxed)된 파일을...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer"],
        "url": "http://localhost:4000/nnstreamer/Basic-Tutorials-For-GStreamer-3/",
        "teaser": null
      },{
        "title": "[NNStreamer] Gstreamer 기본 튜토리얼 4",
        "excerpt":"본 포스팅은 여기를 참조합니다. 목표 이번 튜토리얼에서는 시간에 관련된 facialities들을 알아봅니다. 파이프라인에게 stream position과 duration에 관련된 질문을 하는 방법 하나의 stream 안에서 다른 position을 seek(jump)하는 방법 Introduction GstQuery는 element나 pad에게 일부 정보를 요청하도록 허락하는 매커니즘입니다. 이 예제에서는 파이프라인에게 seeking을 해도 되는지 아닌지를 물어보도록 하겠습니다. seeking이 허용되지 않는 경우로는 live streams...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer"],
        "url": "http://localhost:4000/nnstreamer/Basic-Tutorials-For-GStreamer-4/",
        "teaser": null
      },{
        "title": "[NNStreamer] Gstreamer 기본 튜토리얼 5",
        "excerpt":"본 포스팅은 여기를 참조합니다. 목표 이 튜토리얼에서는 Gstreamer에서 어떻게 GUI를 integration하는지 알아보겠습니다. 기본적으로 Gstreamer는 GUI를 사용해서 미디어의 재생을 케어합니다. 가장 흥미로운 부분은 GUI와 Gstreamer의 두 libraries가 상호작용을 하는 부분입니다. 이는 Gstreamer를 GTK+ window에 출력하도록 하고 사용자의 행동을 Gstreamer에 보냄으로서 이루어집니다. Gstreamer에게 특정한 윈도우로 비디오 출력을 보내라고 하는 방법 (Gstreamer의 window를...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer"],
        "url": "http://localhost:4000/nnstreamer/Basic-Tutorials-For-GStreamer-5/",
        "teaser": null
      },{
        "title": "[NNStreamer] GTK+ 설치 및 이해하기 ",
        "excerpt":"소개 GTK 또는 GIMP은 멀티 플랫폼에서 GUI를 생성하기 위한 toolkit입니다. 완전한 집합의 widgets을 지원하고 작은 프로젝트에서부터 큰 프로젝트까지 모두 커버할 수 있습니다. GTK는 C로 작성되었지만 C/C++ 뿐만 아니라 다양한 언어를 지원합니다. Perl이나 python을 사용한다면 효과적인 방법으로 어플리케이선 개발을 할 수 있을 것입니다. GTK는 GNU project의 오픈소스 프로젝트 입니다. 구조 GTK는...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gtk+"],
        "url": "http://localhost:4000/nnstreamer/Installing-And-Understanding-GTK+/",
        "teaser": null
      },{
        "title": "[NNStreamer] 첫 번째 미팅 정리",
        "excerpt":"제일 먼저 기본적인 Building에 대해서 설명해주셨습니다. How to Build basic terminology build란? compile이란? link란? 가장 기본적인 의미는 프로그래밍 언어를 기계어로 바꾸어주는 과정입니다. 먼저 C나 java 같은 native code에서 (native/managed 코드의 자세한 구분은 후술) *.o파일을 만드는 것을 컴파일이라고 합니다. (이는 개발자가 작성한 소스코드를 binary code로 변환하는 과정을 의미합니다.) 그리고 *.o파일에서 .exe파일을...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","meeting"],
        "url": "http://localhost:4000/nnstreamer/1st-meeting/",
        "teaser": null
      },{
        "title": "[NNStreamer] NNStreamer 둘러보기 ",
        "excerpt":"본 포스팅은 공식 Repo와 공식 Repo의 getting-started를 참조합니다. 소개 NNStreamer는 오래된 CPI와 적은 메모리 용량을 가지고 있는 컴퓨터 기반의 서버를 지원하기 위해 만들어진 오픈소스 library입니다. Gstreamer의 개발자들에게는 neural network 모델을 쉽고 효율적으로 적용할 수 있게 도와줍니다. neural network 개발자에게는 stream pipeline과 그들의 filter를 쉽고 효율적으로 관리할 수 있도록 도와줍니다. 이...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer"],
        "url": "http://localhost:4000/nnstreamer/Understanding-NNStreamer/",
        "teaser": null
      },{
        "title": "[NNStreamer] meson build tutorial ",
        "excerpt":"https://mesonbuild.com/Tutorial.html를 참조해서 포스팅합니다. meson build system 이해하기 먼저 GTK 개발도구가 설치되어 있다는 가정하에 tutorial을 시작합니다. $ sudo apt install libgtk-3-dev $ sudo apt install meson 그리고 프로젝트 디렉토리를 만들고 소스파일과 meson.build 파일을 같은 디렉토리에 생성합니다. cd ~ mkdir meson_tutorial &amp; cd meson_tutorial gedit main.c gedit meson.build //main.c #include&lt;stdio.h&gt; int main(int...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","meson"],
        "url": "http://localhost:4000/nnstreamer/meson-build-tutorial/",
        "teaser": null
      },{
        "title": "[NNStreamer]Smart Reply 이해하기 ",
        "excerpt":"Demo APK 설치 여기에서 (demo APK here)를 클릭해서 APK를 받아서 설치합니다. 이 앱은 텍스트를 입력하면 적절한 대답을 생성해주는 기능을 합니다. Model 이해하기 문맥에 따라 관련있는 대답을 one-touch로 작성할 수 있도록 도와주는 기능 device 내부적으로 동작하여 인터넷 연결이 필요없다. ms 단위의 평균 latency를 가질만큼 빠르다. 메모리를 적게 먹는다. 유저 데이터를 유출하지...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","smart-reply"],
        "url": "http://localhost:4000/nnstreamer/basic-Tflie-model-smart-reply/",
        "teaser": null
      },{
        "title": "[NNStreamer] Gstreamer 기본 튜토리얼 7",
        "excerpt":"Goal How to create new threads of execution for some parts of the pipeline What is the Pad Availability How to replicate streams Introduction Multithreading GStreamer is a multithreaded framework. This means that, internally, it creates and destroys threads as it needs them, for example, to decouple streaming from the...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer","tee"],
        "url": "http://localhost:4000/nnstreamer/Basic-Tutorials-For-Gstreaamer-7/",
        "teaser": null
      },{
        "title": "[NNStreamer] Gstreamer 기본 튜토리얼 10",
        "excerpt":"Goal How to build and run GStreamer pipelines from the command line, without using C at all! How to find out what GStreamer elements you have available and their capabilities. How to discover the internal structure of media files. Introduction $ sudo apt install gstreamer1.0-tools This tool accepts a textual...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer","gst-launch-1.0"],
        "url": "http://localhost:4000/nnstreamer/Basic-Tutorials-For-Gstreamer-10/",
        "teaser": null
      },{
        "title": "[DB] Chapter 7.1절  ",
        "excerpt":"More SQL: Complex Queries, Triggers, Views, and Schema Modification 이 장에서는 relational databases를 귀한 SQL language의 advancd 특성을 서술합니다. 7.1 More Complex SQL Retrieval Queries 7.1.1. Comparisons Invloving Null and Three-Valued Logic 먼저 NULL이 무엇인지 알아보겠습니다. NULL은 a missing value라는 의미를 가지고 있는데 보다 구체적으로는 아래의 3개 중 하나의 의미를...","categories": ["Database"],
        "tags": ["database"],
        "url": "http://localhost:4000/database/Fundatmental-Database-6/",
        "teaser": null
      },{
        "title": "[DB] Chapter 7.2절 ~ 7.4절   ",
        "excerpt":"과제 리뷰 주의! table 갯수가 n개이면 join condition은 n-1개가 반드시 나와야 합니다. 7.1.11 Discussion and Summary of SQL Queries query evaluation 순서는 FROM - WHERE - GROUP BY - HAVING - ORDER BY 순서이다. FWGAO로 외우자. 이렇게 순서가 정해진 것에는 장점과 단점이 존재합니다. 장점 : 각 사용자는 자신이 익숙한 쿼리...","categories": ["Database"],
        "tags": ["database"],
        "url": "http://localhost:4000/database/Fundatmental-Database-7/",
        "teaser": null
      },{
        "title": "[NNStreamer] Style Transfer pipelie",
        "excerpt":"nnstreamer-example/bash_script/gst-launch-object-detection-tflite.sh 먼저 nnstreamer-example/bash_script에 있는 예제부터 분석해보겠습니다. 잘 모르는 pipeline element가 있다면 여기서 찾아보았습니다. #!/usr/bin/env bash gst-launch-1.0 \\ v4l2src ! videoconvert ! videoscale ! video/x-raw,width=640,height=480,format=RGB,framerate=30/1 ! tee name=t \\ t. ! queue ! videoscale ! video/x-raw,width=300,height=300,format=RGB ! tensor_converter ! \\ tensor_transform mode=arithmetic option=typecast:float32,add:-127.5,div:127.5 ! \\ tensor_filter framework=tensorflow-lite model=tflite_model/ssd_mobilenet_v2_coco.tflite ! \\ tensor_decoder...","categories": ["NNstreamer"],
        "tags": ["nnstreamer","gstreamer","gst-launch-1.0"],
        "url": "http://localhost:4000/nnstreamer/Style-Transfer-Pipeline/",
        "teaser": null
      },{
        "title": "[DB] Chapter 1,2,5,6,7,10 정리 ",
        "excerpt":"Chapter 1 very large database에서 Data Warehouse 또는 OLAP를 사용해서 business information을 도출할 수 있다. OLAP : Online Analytical Processing 산업과 제조업에서는 Realtime/active database가 쓰인다. database search techniques는 WWW에서 활용되기도 한다. Terminology database : a collection of data data : 의미가 있고 저장할 수 있는 알려진 사실 mini-world : 실제...","categories": ["Database"],
        "tags": ["database"],
        "url": "http://localhost:4000/database/Fundamental-Database-from-1-to-7/",
        "teaser": null
      },{
        "title": "[PS]코딩테스트 준비 시작하기 ",
        "excerpt":"본 포스팅은 SWEA A+ 취득을 목표로 합니다. 문제 분류 완전탐색 완전탐색 : 개념 문제이 정의가 아닌 문제를 푸는 방법이 완전탐색인 경우에 사용합니다. 모든 정답 후보를 확인해보는 경우를 의미합니다. 완전탐색 : 기본 문제 일곱난쟁이 기본 풀이 : 9C7 개의 경우를 돌면서 (선택된 7개의 합) = 100이 되는지 판단. 짧은 풀이 :...","categories": ["PS"],
        "tags": ["ps"],
        "url": "http://localhost:4000/ps/getting-started/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 01 네트워크 프로그래밍과 소켓의 이해 ",
        "excerpt":"01 네트워크 프로그래밍과 소켓의 이해 서버 소켓 socket() : 소켓 생성 bind() : 소켓에 주소 정보 할당 listen() : 연결 가능 상태로 만들기 accept() : 연결 요청에 대한 수락 클라 소켓 socket() : 소켓 생성 connect() : 서버로 연결 요청 01.2 리눅스 기반 팡리 조작하기 저 수준 파일 입출력과 파일...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-1/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 02 소켓의 타입과 프로토콜의 설정",
        "excerpt":"02 소켓의 타입과 프로토콜의 설정 02-1 소켓의 프로토콜과 그에 따른 데이터 전송 특성 sorket(int domain, int type, int protocol) domain : 소켓이 사용할 프로토콜 체계 정보 전달, 일반적으로 PF_INET(IPv4 프로토콜 체계를 의미하는 이름) type : 소켓의 데이터 전송방식에 대한 정보 전달. 연결지향형과 비연결지향형 protocol : 두 컴퓨터 간 통신에 사용되는...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-2/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 03 주소체계와 데이터 정렬",
        "excerpt":"03 주소체계와 데이터 정렬 03-1 소켓에 할당되는 IP주소와 PORT 번호 IPv4 주소체계(책 64페이지) class A : 네트워크 ID 1BYTE 호스트 ID 3BYTE : 첫 번째 바이트 범위 [0,127] class B : 네트워크 ID 2BYTE 호스트 ID 2BYTE : 첫 번째 바이트 범위 [128,191] class C : 네트워크 ID 3BYTE 호스트...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-3/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 04 TCP 기반 서버 / 클라이언트 1",
        "excerpt":"04 TCP 기반 서버 / 클라이언트 1 인터넷 프로토콜 기반 소켓의 경우 데이터 전송방법에 따라서 TCP 소켓과 UDP 소켓으로 나뉘다. 특히 TCP 소켓은 연결지향형이기 때문에 스트림 기반 소켓이라고도 이야기한다. TCP는 Transmission Control Protocol의 약자이다. TCP가 속해있는 TCP/IP 프로코톨 스택을 먼저 설명한다. APPLICATION 계층 TCP 계층 / UDP 계층 IP 계층...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-4/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 05 TCP 기반 서버 / 클라이언트 2",
        "excerpt":"05 TCP 기반 서버 / 클라이언트 2 챕터 4의 마지막에 언급했던 문제는 echo_server에는 없고, echo_client에만 있다. 에코_클라는 read() 호출을 통해서 잣니이 전송한 문자열 데이터를 한방에 수신하기를 원하고 있다. 이를 문자열 데이터가 전송되었을 때 이를 모두 읽어서 출력하는 것으로 해결하면 된다. 즉, 클라가 수신해야할 데이터의 크기를 미리 알고 있기 때문에 이를...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-5/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 10 멀티프로세스 기반의 서버 구현",
        "excerpt":"10 멀티프로세스 기반의 서버 구현 프로세스 : 실행 중인 프로그램 멀티프로세스 기반 서버 : 다수의 프로세스를 생성하는 방식으로 서비스 제공 쿼드 코어 : 4개의 연산장치가 존재하는 CPU 코어의 수만큼 프로세스를 동시에 실행시킬 수 있다. 코어의 수를 넘어서는 프로세스가 생성되면, 프로세스 별로 코어에 할당되는 시간이 나뉜다. 멀티플렉싱 기반 서버 : 입출력...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-10/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 11 프로세스간 통신 Inter Process communication",
        "excerpt":"11 프로세스간 통신 Inter Process communication   fork 이후에 프로세스 간 데이터를 주고 받는 것이 필요한 경우  책 259 페이지를 본다.  ","categories": ["ArdentTCPIP"],
        "tags": ["NYI"],
        "url": "http://localhost:4000/ardenttcpip/chapter-11/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 12 IO 멀티플렉싱 Multiplexing",
        "excerpt":"12 IO 멀티플렉싱 Multiplexing 멀티프로세스 서버의 단점과 대안 프로세스의 생성에는 상당히 많은 대가를 지불한다. 많은 양의 연산이 요구되고, 필요한 메모리 공간도 비교적 크다. 그리고 프로세스마다 별도의 메모리 공간을 유지하기 때문에 상호간에 데이터를 주고받으려면 다소 복잡한 방법을 택할 수밖에 없다. (Inter Process Communicatino ICP는 복잡한 통신방법이다) 그리고 이의 대안이 바로 멀티플렉싱이다....","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-12/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 13 다양한 입출력 함수들",
        "excerpt":"13 다양한 입출력 함수들   데이터를 직접 보내야하는 타이밍에 읽어보자  ","categories": ["ArdentTCPIP"],
        "tags": ["NYI"],
        "url": "http://localhost:4000/ardenttcpip/chapter-13/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 14 멀티캐스트 & 브로드 캐스트",
        "excerpt":"14 멀티캐스트 &amp; 브로드 캐스트 멀티캐스트 방식의 데이터 전송은 UDP를 기반으로 한다. 따라서 당장은 보지 않는다. 14-2 브로드 캐스트 멀티캐스트는 서로 다른 네트워크상에 존재하는 호스트라 할지라도, 멀티캐스트 그룹에 가입만 되어 있으면 데이터의 수신이 가능하다. 반면 브로드캐스튼는 동일한 네트워크로 연결되어 있는 호스트로, 데이터의 전송 대상이 제한된다. 따라서 당장은 보지 않는다. rtmp...","categories": ["ArdentTCPIP"],
        "tags": ["NYI"],
        "url": "http://localhost:4000/ardenttcpip/chapter-14/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 15 Not Yet Implemented",
        "excerpt":"15   일단은 챕터 18부터 보는게 나을 것 같다.  ","categories": ["ArdentTCPIP"],
        "tags": ["NYI"],
        "url": "http://localhost:4000/ardenttcpip/chapter-15/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 16 Not Yet Implemented",
        "excerpt":"16   일단은 챕터 18부터 보는게 나을 것 같다.  ","categories": ["ArdentTCPIP"],
        "tags": ["NYI"],
        "url": "http://localhost:4000/ardenttcpip/chapter-16/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 17 Not Yet Implemented",
        "excerpt":"17   일단은 챕터 18부터 보는게 나을 것 같다.  ","categories": ["ArdentTCPIP"],
        "tags": ["NYI"],
        "url": "http://localhost:4000/ardenttcpip/chapter-17/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 18 멀티쓰레드 기반의 서버 구현",
        "excerpt":"18 멀티쓰레드 기반의 서버 구현 쓰레드를 사용하는 이유 = 멀티프로세스 기반의 단점 프로세스 생성이 무거운 과정이다. IPC를 사용해서 프로세스간 통신을 하는 것이 복잡하다. context switching에 따른 부담이 굉장히 크다. = 둘 이상의 실행흐름을 갖기 위해서 프로세스가 유지하고 있는 메모리 영역을 통째로 복사한는 과정이 부담스럽다 쓰레드와 프로세스의 차이점 프로세스 : Text...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-18/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 06 UDP는 생략",
        "excerpt":"06 UDP는 생략  ","categories": ["ArdentTCPIP"],
        "tags": ["NYI"],
        "url": "http://localhost:4000/ardenttcpip/chapter-6/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 07 소켓의 우아한 연결종료 Half-close",
        "excerpt":"07 소켓의 우아한 연결종료 Half-close 일방적인 연결종료의 문제점 리눅스의 clsoe()의 호출은 완전종류를 의미한다. 완전종료라는 것은 데이터를 전송하는 것은 물론, 수신하는 것도 더 이상 불가능한 상황을 의미한다. 때문에 한쪽에서의 일방적인 close()의 호출은 우아하지 못하다. 두 호스트가 데이터를 주고 받을 때 한 쪽이 먼저 완전종료를 해버리면 아직 송신했지만 수신되지 못한 데이터가 있을...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-7/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 08 도메인 이름과 인터넷 주소",
        "excerpt":"08 도메인 이름과 인터넷 주소 모든 컴퓨터에는 default DNS 서버의 주소가 등록되어 있는데, 이 default DNS 서버를 통해서 도메인 이름에 대한 IP주소를 얻는다. 브라우저 - 도메인 입력 - DNS 서버 - IP 주소 획득 - IP 주소로 접속 default DNS 서버가 모르면 상위 단계의 DNS 서버에게 물어보고 Root DNS 서버까지...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-8/",
        "teaser": null
      },{
        "title": "[열혈TCP/IP] 09 소켓의 다양한 옵션",
        "excerpt":"09 소켓의 다양한 옵션 09-1 소켓의 옵션과 입출력 버퍼의 크기 소켓의 옵션은 계층별로 분류된다. 책 200페이지 getsockopt &amp; setsockopt #include &lt;sys/socket.h&gt; getsockpot() #include &lt;sys/socket.h&gt; setsockpot() 소켓 타입은 소켓생성시 한번 결정되면 변경이 불가능하다 SO_SNDBUF &amp; SO_RCVBUF //소켓 입출력버퍼의 크기 확인 및 수정 09-2 SO_REUSEADDR 주소할당 에러 발생(Binding Error) 클라에서 강제로 종료를...","categories": ["ArdentTCPIP"],
        "tags": [],
        "url": "http://localhost:4000/ardenttcpip/chapter-9/",
        "teaser": null
      },{
        "title": "링크 정리 ",
        "excerpt":"Format      목적 : 링크            주의점           Tips      GCC Window 설치 : 여기에서 초록색 버튼을 클릭하여 mingw-get-setup.exe 파일 다운로드   VSCode 개발 환경 설정 on Window (build/compile/run/Debug) : 여기            cwd path에 한글 안들어가도록 주의       vscode terminal에서 system evn path 적용안되면 vscode 재부팅           ","categories": ["Guide"],
        "tags": ["guide"],
        "url": "http://localhost:4000/guide/useful-urls/",
        "teaser": null
      },{
        "title": "Github Jekyll Post Localhost에서 확인하기",
        "excerpt":"   git clone https://github.com/niklasjang/niklasjang.github.io.git   cd niklasjang.github.io   bundle install   chcp 65001 //한글을 인코딩하기 위한 code pade 변경   local에서 post 작업   bundle exec jekyll serve   localhost:4000 접속 후 확인   remote에 올리는 경우 commit &amp; push  ","categories": ["Guide"],
        "tags": ["guide"],
        "url": "http://localhost:4000/guide/how-to-preview-post/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][N자리 K진수] Chapter 0",
        "excerpt":"완전탐색의 첫 번째 알고리즘 백트래킹입니다. 백트래킹의 첫 번째 유형인 N자리 K진수에 대해서 학습합니다. 백트래킹 : 개념 백트래킹은 완전탐색의 일부입니다. 정답이 될 수 있는 모든 가능성을 살펴보는데, 정답이 될 수 없는 경우가 나오면 더이상 진행하지 않습니다. 이때 처음으로 되돌아가지 않고 한 step만 뒤로가서 다시 모든 경우를 살펴보는 방법을 의미합니다. N자리 K진수...","categories": ["PS"],
        "tags": ["ps","back-tracking"],
        "url": "http://localhost:4000/ps/back-tracking-n-digit-k-decimal-0/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][N자리 K진수] Chapter 2",
        "excerpt":"완전탐색의 첫 번째 알고리즘 백트래킹입니다. 백트래킹의 두 번째 유형인 ‘고른다/안고른다’를 학습합니다. N자리 K진수 : 개념 이전 포스팅에서는 N자리 K진수에 대해서 각 자리수에 적절한 값을 재귀적으로 한 번씩 저장하는 방법을 사용했습니다. 오름차순 N자리 K진수를 구현할 때에 recur(int depth, int start)의 param을 적용했었습니다. 이번에는 오름차순 N자리 K진수를 구현하기 위해서 특정값을 ‘선택한다/선택하지 않는다’의...","categories": ["PS"],
        "tags": ["ps","back-tracking"],
        "url": "http://localhost:4000/ps/back-tracking-n-digit-k-decimal-2/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][N자리 K진수] Chapter 1",
        "excerpt":"완전탐색의 첫 번째 알고리즘 백트래킹입니다. 백트래킹의 첫 번째 유형인 N자리 K진수를 문제에 적용해보겠습니다. N자리 K진수 : 문제 신기한 소수 N자리 K진수를 적용해서 해결하는 문제입니다. N자리 K진수의 개념은 그대로 적용되고 핵심은 두 가지 입니다. isPrime()을 작성할 수 있는가? -&gt; 소수인지 판별하는 O(sqrt(n)) 방법을 사용합니다. isPrime()을 적절한 위치에서 사용할 수 있는가? -&gt;...","categories": ["PS"],
        "tags": ["ps","back-tracking"],
        "url": "http://localhost:4000/ps/back-tracking-n-digit-k-decimal-1/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][N자리 K진수] Chapter 3",
        "excerpt":"완전탐색의 첫 번째 알고리즘 백트래킹 문제를 풀어보겠습니다. N자리 K진수 : 문제 N-Queen 코드는 여기에서 확인할 수 있습니다. arr[0]=1을 map의 0번째 row에는 1번째 col에 퀸이 위치함을 의미합니다. 이 때 각 퀸들이 같은 row/col에는 올 수 없기 때문에 visited[]를 사용합니다. 그리고 isPossible()함수는 직접 8방향으로 시뮬레이션을 하느 것이 아니라, 좌표값의 차이를 통해서 서로의...","categories": ["PS"],
        "tags": ["ps","back-tracking"],
        "url": "http://localhost:4000/ps/back-tracking-n-digit-k-decimal-3/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][N자리 K진수] Chapter 4",
        "excerpt":"소문난 칠공주 문제의 정답은 여기에서 확인할 수 있습니다. 이 문제는 1차원 백트레킹을 2차원으로 확장해서 적용해야하는 문제입니다. 반대로 생각하면 2차원의 입력을 1차원으로 바꿔서 생각하면 백트레킹으로 접근할 수 있게 됩니다. 일단 25개의 좌표 중에서 7개를 선택합니다. 7개 중 ‘S’가 4개 이상 선택되었는지 판단하고 7개에 대해서 connected component의 갯수가 1인지 판단합니다. 여기까지 통과하면...","categories": ["PS"],
        "tags": ["ps","back-tracking"],
        "url": "http://localhost:4000/ps/back-tracking-n-digit-k-decimal-4/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][DFS] Chapter 0",
        "excerpt":"완전탐색의 두 번째 알고리즘 DFS 문제를 풀어보겠습니다. DFS는 개념은 생략하고 코드에서의 스킬을 학습하겠습니다. DFS : 코드 DFS : 기본 코드 DFS의 기본 코드는 여기에서 확인할 수 있습니다. 일반적으로는 DFS를 하나의 노드에서 시작해서 갈 수 있는 마지막 노드까지 진행합니다. DFS : 모든 DFS 경로 마지막 노드까지 진행하고 백트래킹 방식을 적용해서 또...","categories": ["PS"],
        "tags": ["ps","dfs"],
        "url": "http://localhost:4000/ps/dfs-0/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][DFS] Chapter 1",
        "excerpt":"완전탐색의 두 번째 알고리즘 DFS 문제를 풀어보겠습니다. 친구 문제의 정답은 여기에서 확인할 수 있습니다. 딱 보면 bfs 문제이지만 dfs로 풀기 위해서는 방문했던 노드도 다시 방문해야합니다. 아래와 같이 싸이클이 있는 경우 5에서 3으로 방문하고, 3에서 4로 방문하면 싸이클은 모두 커버할 수 있습니다. 하지만 5 - 4 - 6으로 이어지는 6은 방문하지...","categories": ["PS"],
        "tags": ["ps","dfs"],
        "url": "http://localhost:4000/ps/dfs-1/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][DFS] Chapter 2",
        "excerpt":"완전탐색의 두 번째 알고리즘 DFS 문제를 풀어보겠습니다. 욕심쟁이 판다 문제의 정답은 여기에서 확인할 수 있습니다. 위 링크에서 댓글에 있는 시간초과 코드부터 생각해보겠습니다. dfs는 기본적으로 모든 노드를 한 번씩만 확인하는 코드입니다. 노드를 방문할 때마다 visited를 true로 바꾸어줍니다. 만약 visted를 다시 false로 바꾸는 경우가 없다면 모든 노드를 한 번씩만 방문합니다. 그런데 위...","categories": ["PS"],
        "tags": ["ps","dfs"],
        "url": "http://localhost:4000/ps/dfs-2/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][BFS] Chapter 0",
        "excerpt":"완전탐색의 세 번째 알고리즘 BFS 문제를 풀어보겠습니다. BFS는 개념은 생략하고 코드에서의 스킬을 학습하겠습니다. BFS : 문제 BFS는 바로 간단한 문제로 접근하겠습니다. 2차원 BFS : 기본 코드 미로 탐색 문제의 정답은 여기에서 확인할 수 있습니다. 2차원 BFS : 가지 치기 미로탐색 문제는 2차원 BFS의 기본 조건만 가지고 있는 문제라서 위 정답...","categories": ["PS"],
        "tags": ["ps","dfs"],
        "url": "http://localhost:4000/ps/bfs-0/",
        "teaser": null
      },{
        "title": "[PS][완전탐색][BFS] Chapter 1",
        "excerpt":"완전탐색의 세 번째 알고리즘 BFS 문제를 풀어보겠습니다. 토마토 문제의 정답은 여기에서 확인할 수 있습니다. cin으로 입력받으면 200ms 걸리고, scanf로 받으면 100ms 걸립니다. bfs를 시작할 때 1인 경우를 모두 queue에 넣고 bfs()를 진행하는 것이 핵심입니다. 자잘한 조건을 효율적으로 맞춰주는 방법을 생각해봅니다. 벽 부수고 이동하기 문제의 정답은 여기에서 확인할 수 있습니다. while(size–)를...","categories": ["PS"],
        "tags": ["ps","dfs"],
        "url": "http://localhost:4000/ps/bfs-1/",
        "teaser": null
      },{
        "title": "[PS][시뮬레이션] Chapter 0",
        "excerpt":"시뮬레이션입니다. 구현력을 높이는 과정이 길고 힘들 것 같습니다. 이동시키기 두 개의 배열을 사용한다. 하나는 객체 저장용, 하나는 중복 제거용. 낚시왕 문제의 정답은 여기에서 확인할 수 있습니다. 상어 구조체 생성하기 map에 상어 배열의 index만 저장하기 한 칸에 겹치는 경우는, 가장 큰 상어의 index만 하나 남기고 상어를 없애면 된다. R,C가 각각 100이고...","categories": ["PS"],
        "tags": ["ps","simpulation"],
        "url": "http://localhost:4000/ps/simulation-0/",
        "teaser": null
      },{
        "title": "[PS][DP] Chapter 0",
        "excerpt":"dp입니다. 쉬운 문제부터 대표적인 유형을 보겠습니다. 최대 최소 문제 최대, 최소를 구하는 문제는 그리디 혹은 DP로 접근하면 풀리는 경우가 많습니다. 1로 만들기 그리딜 접근해보면, 일단 나누기 3을 해보고 안되면 나누기 2를 해보고 안되면 1을 빼는 방법을 생각해봅니다. 하지만 이 경우는 10에서 2로 나누어 떨어지지만 9&gt;3&gt;1로 가는 것이 최소 방벙이기 때문에...","categories": ["PS"],
        "tags": ["ps","dp"],
        "url": "http://localhost:4000/ps/dp-0/",
        "teaser": null
      },{
        "title": "[PS][정수론] Chapter 0",
        "excerpt":"정수론 입니다. 대표적인 유형을 보겠습니다. [n! mod p]](https://www.acmicpc.net/problem/2193) 문제의 정답은 여기에서 확인할 수 있습니다. mod p는 p가 소수일 때만 가능합니다. [소인수 분해]](https://www.acmicpc.net/problem/11653) 문제의 정답은 여기에서 확인할 수 있습니다. mod p는 p가 소수일 때만 가능합니다. 두 번째 풀이 : n을 구성하는 가장 큰 소수가 x라고 할 때, i*i&lt;=n인 2부터 i까지 보면...","categories": ["PS"],
        "tags": ["ps","dp"],
        "url": "http://localhost:4000/ps/number-theory-0/",
        "teaser": null
      },{
        "title": "[PS][Greedy] Chapter 0",
        "excerpt":"그리디 알고리즘 입니다. 대표적인 유형을 보겠습니다. 동전 0 문제의 정답은 여기에서 확인할 수 있습니다. stack을 이용해서 가장 큰 동전부터 접근합니다. (1 ≤ Ai ≤ 1,000,000, A1 = 1, i ≥ 2인 경우에 Ai는 Ai-1의 배수) 조건에 의해서 그리디 알고리즘을 적용할 수 있습니다. 나무 자르기 문제의 정답은 여기에서 확인할 수 있습니다....","categories": ["PS"],
        "tags": ["ps","dp"],
        "url": "http://localhost:4000/ps/greedy-0/",
        "teaser": null
      },{
        "title": "[PS][이분탐색] Chapter 0",
        "excerpt":"그리디 알고리즘 입니다. 대표적인 유형을 보겠습니다. 숫자 카드 문제의 정답은 여기에서 확인할 수 있습니다. s = 정답이 될 가능성이 있는 시작 index. e = 정답이 될 가능성이 있는 마지막 index. 위 정의에 따라서 정답 가능성은 [s,e] 이 문제에서 정답 가능성 = 모든 숫자카드가 저장된 배열의 index if(mid == x)의 조건...","categories": ["PS"],
        "tags": ["ps","dp"],
        "url": "http://localhost:4000/ps/binary-search-0/",
        "teaser": null
      },{
        "title": "[ML][GAN] Chapter 0",
        "excerpt":"Goal : GAN(Generative Adversarial Networks) 개요 ML을 배울 때 처음 접하는 classification이나 image segmentation 모델은 대상을 판별(Discrimiate)라는 네트워크입니다. 이미지를 주고 개/고양이인지 여부를 판단하거나(classification) 각 픽셀이 어떤 class에 속하는지 판단(image segmentation)을 하는 네트워크 모델을 Discriminator model이라고 합니다. Discriminator(이하 D) D는 입력 데이터를 받아서 판단을 하고 출력 데이터를 내보내는 x -&gt; D(x)...","categories": ["ML"],
        "tags": [],
        "url": "http://localhost:4000/ml/GAN-0/",
        "teaser": null
      },{
        "title": "[ML][GAN][paper] CGAN",
        "excerpt":"Goal : CGAN 이해하기 Abstract CNN은 이미 많은 분야에서 공통적으로 사용되는 net가 되었습니다. CNN은 loss function을 최소화하는 방법을 배웁니다. 하지만 학습 과정이 매우 자동적으로 진행될 수 있음에도 사람의 수동적인 노력이 많이 수반되어야 합니다. 만약 우리가 CNN에게 유클리디안 거리를 최소화하라고 알려준다면 굉장히 blur한 이미지를 얻게 됩니다. 왜냐하면 유클리디안 거리는 가능한 모든...","categories": ["ML"],
        "tags": [],
        "url": "http://localhost:4000/ml/CGAN/",
        "teaser": null
      },{
        "title": "[ML][CNN] Chapter 0",
        "excerpt":"Goal : CNN Dropout 신경망의 학습 과정에서 파라미터의 동조화 현상으로 인해 overfitting이 발생하고 결과적으로 학습 효율이 떨어집니다. 이를 피하기 위한 regularization 기법으로써 dropout을 적용합니다. Dropout의 효과는 주로 fully connected layer에 적용하여 효과를 얻었습니다. max/mean pooling pooling은 sub-sampling을 통해서 feature-map의 사이즈를 줄이고, 특징을 추출할 수 있도록 해줍니다. mean pooling의 경우 depp...","categories": ["ML"],
        "tags": [],
        "url": "http://localhost:4000/ml/CNN-0/",
        "teaser": null
      },{
        "title": "[ML][CNN] Chapter 1",
        "excerpt":"Goal : CNN maxout maxout은 dropout의 효과를 극대화시키기 위해 독특한 형태의 활성함수를 고안한 것이라고 볼 수 있습니다. 이 수식은 다음과 같이 사용됩니다. 일반적으로 hidden layer를 그리면 1개의 layer를 그리기 마렵입니다. 위 그림에서 파란색 원을 무시하고 보면 일반적인 1 : 3 : 1 (in/hidden/out)의 fc구조입니다. 그런데 maxout 구조에서 하나의 hidden layer는...","categories": ["ML"],
        "tags": [],
        "url": "http://localhost:4000/ml/CNN-1/",
        "teaser": null
      },{
        "title": "[ML][GAN][paper] pix2pix",
        "excerpt":"Goal : pix2pix 이해하기 Abstract conditional adversarial net은 범용 목적의 image2image 변환 문제에 대한 해답이 될 수 있습니다. 이 네트워크는 입력 이미지에서 출력 이미지로의 mapping을 배우는 것뿐만 아니라, 이 mapping의 loss function을 배웁니다. 이 말은 단순히 training data로부터 mappipng을 배우고 암기하는 것이 아니라, loss function을 학습함으로서 새로운 데이터에 적용할 수...","categories": ["ML"],
        "tags": [],
        "url": "http://localhost:4000/ml/pix2pix/",
        "teaser": null
      },{
        "title": "[PS][기출문제] 삼성",
        "excerpt":"삼성 기출문제입니다. 주사위 윷놀이 문제의 정답은 여기에서 확인할 수 있습니다. map에서 같은 점수를 가진 여러 개의 node가 존재합니다. 따라서 점수별로 구분하는 것이 아니라, 노드에 임의의 idx를 부여해서 구별합니다. horse class를 만들고 겹치는지를 판단합니다. 시작 위치와 마지막 위치에서의 코너 케이스에 주의합니다. 모든 경우의 수에 대해서 백트래킹을 진행하면서 각각의 경우에 대해서 말을...","categories": ["PS"],
        "tags": ["ps","dp"],
        "url": "http://localhost:4000/ps/sam-sung-0/",
        "teaser": null
      },{
        "title": "[정보보호이론] Chapter 1 고전암호",
        "excerpt":"정보보호 개요 정보보호에는 세 가지 원칙이 있습니다. Confidentiality 기밀성 정보의 소유자가 원하는 대로 정보의 비밀이 유지 되어야 한다. 허가되지 않은 사용자에게 정보가 노출되서는 안된다. 반드시 인가된 자에 의해서만 접근이 가능해야 한다. Ex) 접근통제, 암호화 Integrity 무결정 허가되지 않은 사용자에 의한 정보의 변경,삭제, 생성등으로부터 보호해야한다. 정보의 정확성 및 완전성이 보장되어야 한다는...","categories": ["BlockChain"],
        "tags": ["blockcahin"],
        "url": "http://localhost:4000/blockchain/chapter-0/",
        "teaser": null
      },{
        "title": "[정보보호이론] Chapter 2 현대암호",
        "excerpt":"단순 DES 교육용 알고리즘 8비트 평문 블럭과 10비트 키를 사용 기본함수 IP : Initial Permutation : 초기 순열 f_{k} 함수 transposition permutation : 전치 substitution : 치환 키 입력에 의존 - SW : swap : 데이터의 두 절반을 상호 교환하는 함수 - f_{k}^{-1} : 초기 순열의 역인 순열 함수 알고리즘...","categories": ["BlockChain"],
        "tags": ["blockcahin"],
        "url": "http://localhost:4000/blockchain/chapter-1/",
        "teaser": null
      },{
        "title": "[ML][GAN][paper] InfoGan",
        "excerpt":"Goal : InfoGAN 이해하기 요약 엔트로피와 상호정보량(mutual information)이라는 “정보이론”에서 사용하는 개념이 있습니다. 이것을 GAN에 반영하여 비지도학습만으로 데이터의 특징을 적절히 표현할 수 있다고 합니다. 예를 들어서 강아지 사진 데이터를 Info GAN에 학습시키면 당연히 기존의 GAN과 마찬가지로 이를 모방하는 샘플을 만들어냅니다. 여기에 Info GAN은 추가적으로 이 데이터들을 잘 설명할 수 있는 변수들을...","categories": ["ML"],
        "tags": [],
        "url": "http://localhost:4000/ml/infogan/",
        "teaser": null
      },{
        "title": "[정보보호이론] Chapter 3 일방향 해시함수",
        "excerpt":"요약 컴퓨터로 처리하는 메시지에 대해서도 지문이 있었으면 할 때가 있습니다. 이 때는 2개의 메시지가 동일한지 아닌지를 조사할 때 메시지를 직접 비교하는 것이 아니라, 메시지의 지문을 비교하여 판정합니다. 일방향 해시 함수 만약 어제의 파일과 오늘의 파일이 같은 파일인지 무결성 점검을 해야한다고 생각해봅니다. 어제의 파일 전체를 안전한 장소에 보존해두고 오늘의 파일과 비교하는...","categories": ["BlockChain"],
        "tags": ["blockcahin"],
        "url": "http://localhost:4000/blockchain/chapter-2/",
        "teaser": null
      },{
        "title": "2020 Summer Coding 참여 기업 분석",
        "excerpt":"2020 Summer Coding - 여름방학 스타트업 인턴 프로그램 발란 명품 최저가 사이트 OS : CenOS, Ubuntu SQL : MariaDB(SQL based) NoSQL : MongoDB(Document based), Redis(key-value based) AWS : AMI(instance를 실행할 때 필요한 정보인 image를 제공) Search Engine : ElasticSearch(data 저장,검색,분석) 외부 API : boutique, 롯데i몰, 네이버 스마트스토어(상품정보 관리, 재고, 가격...","categories": ["Frontend"],
        "tags": ["frontend"],
        "url": "http://localhost:4000/frontend/front-end-0/",
        "teaser": null
      },{
        "title": "[RoadMap] Chap 0. Internet(Application layer)",
        "excerpt":"본 포스팅은 kamranahmedse의 개발자 로드맵을 따라서 진행됩니다. How does the internet work? 구성요소로 본 인터넷 인터넷에 연결되는 모든 장치는 호스트host 혹은 엔드 시스템end system이라고 부릅니다. host는 통신 링크communication link와 패킷 스위치packet switch의 네트워크로 연결됩니다. communication link는 광케이블, 구리선 등의 물리 매체로 구성됩니다. 이때 각각의 link는 다양한 전송률transmission rate과 대역폭bandwidth를 이용해서...","categories": ["Backend"],
        "tags": ["Backend"],
        "url": "http://localhost:4000/backend/network-layer-application/",
        "teaser": null
      },{
        "title": "[RoadMap] Chap 0. Internet(Transport layer)",
        "excerpt":"본 포스팅은 kamranahmedse의 개발자 로드맵을 따라서 진행됩니다. Application Layer은 네트워크 애플리케이션과 애플리케이션 계층 프로토콜이 있는 곳이라고 설명했습니다. HTTP가 바로 애플리케이션 계층에서 동작하는 프로토콜입니다.(만약 애플리케이션 계층 프로토콜로 RTMP를 사용하는 경우 목적지 URL이 rtmp://로 시작합니다. 즉, HTTP는 사용되지 않습니다.) 트랜스포트 계층은 클라이언트와 서버 사이에 애플리케이션 계층 메시지를 전달하는 서비스를 제공합니다. 그런데 HTTP와...","categories": ["Backend"],
        "tags": ["Backend"],
        "url": "http://localhost:4000/backend/network-layer-transport/",
        "teaser": null
      },{
        "title": "[RoadMap] Chap 1-1. Basic Frontend Knowledge - HTML",
        "excerpt":"HTML(HyperText Markup Language) 하이퍼텍스트를 가장 중요한 요소로 가지는 Marup라는 형식을 가진 프로그래밍 언어라는 의미입니다. HTML는 사용자와 컴퓨터의 약속이자 웹 페이지를 만드는 명령어입니다. Learn the basics //진하게 &lt;strong&gt; 진하게 &lt;/strong&gt; //header 1 &lt;h1&gt; header 1 &lt;/h1&gt; //새 탭으로 열기 &lt;a href=\"www.github.com/niklasjang\" target=\"_blank\"&gt; niklasjang &lt;/a&gt; //리스트 &lt;ol&gt; //ordered list. list를 묶음 &lt;li&gt;기술소개&lt;/li&gt;...","categories": ["Backend"],
        "tags": ["Backend"],
        "url": "http://localhost:4000/backend/roadmap-1-1/",
        "teaser": null
      },{
        "title": "[RoadMap] Chap 1-2. Basic Frontend Knowledge - CSS",
        "excerpt":"Learn the basics css는 &lt;style&gt; tag를 통해서 html과 함께 사용됩니다. &lt;!DOCTYPE html&gt; &lt;html&gt; &lt;head&gt; &lt;style&gt; h2{color:blue} &lt;/style&gt; &lt;/head&gt; &lt;body&gt; &lt;h1 style=\"color:red\"&gt;Hello World&lt;/h1&gt; &lt;h2&gt;Hello world&lt;/h2&gt; &lt;/body&gt; &lt;/html&gt; //선택자 선언 &lt;style&gt; li{ color:red; text-decoration:underline; } &lt;/style&gt; // 모든 li 태그 li{color:red} //id값이 select인 태그라는 뜻 #select{ font-size:50px; } //조상 자손 선택자 :...","categories": ["Backend"],
        "tags": ["Backend"],
        "url": "http://localhost:4000/backend/roadmap-1-2/",
        "teaser": null
      },{
        "title": "[RoadMap] Chap 1-3. Basic Frontend Knowledge - JavaScript",
        "excerpt":"Syntax and basic Constructs ECMAScript는 Ecma 인터내셔널에 의해 제정된 ECMA-262 기술 규격에 의해 정의된 범용 스크립트 언어입니다. JavaScript는 ECMAScript 사양을 준수하는 범용 스크립팅 언어입니다. ECMAScript 6는 ECMA-262 표준의 제 6판이며, ECMAScript 사양의 주요 변경 사항 및 개선 사항을 명세합니다. 동의어로는 ‘ES6’, ‘ES2015’, ‘ECMAScript 2015’가 있습니다. inline 방식 아래의 코드에서 onclick에...","categories": ["Backend"],
        "tags": ["Backend"],
        "url": "http://localhost:4000/backend/roadmap-1-3/",
        "teaser": null
      },{
        "title": "[Spring] ",
        "excerpt":"스프링이란 무엇인가? 스프링은 자바 엔터프라이즈 애플리케이션 갭라에 사용되는 프레임워크입니다. 앱의 기본 틀 - 스프링 컨테이너 스프링은 스프링 컨테이너 또는 애플리케이선 컨텍스트라고 불리는 스프링 런타임 엔진을 제공합니다. 스프링 컨테이너는 설정 정보를 참고해서 앱을 구성하는 오브젝트를 생성하고 관리합니다. 스프링 컨테이너는 독립적으로 동작할 수도 있지만 보통 웹 모듈에서 동작하는 서비스나 서블릿으로 등록해서 사용합니다....","categories": ["Backend"],
        "tags": ["Backend"],
        "url": "http://localhost:4000/backend/tobby-spring-0/",
        "teaser": null
      },{
        "title": "[ML][GAN][paper] cycleGAN",
        "excerpt":"Goal : pix2pix와 cycleGAN 비교하며 이해하기 CycleGAN(이하 싸이클)은 도메인 사이의 style transfer에 사용되는 GAN입니다. 스타일 변환 과정은 비지도학습으로 수행됩니다. 즉, 두 도메인 모두에서 영상을 일대일 매핑하지 않습니다. 싸이클은 Unpaired Data를 사용합니다. pix2pix는 {스케치, 사물이미지}의 paired data를 사용합니다. 사물의 경우 스케치를 그리는 것은 상대적으로 쉽습니다 하지만 싸이클은 style transfer를 하기 위함이기...","categories": ["ML"],
        "tags": [],
        "url": "http://localhost:4000/ml/cyclegan/",
        "teaser": null
      },{
        "title": "[Spring] 의존성 투입 DI",
        "excerpt":"Chapter 01 들어가며 spring 5와 java8을 사용한다. %JAVA_HOME% : C:\\Program Files\\Java\\jdk1.8.0_251 모든 스프링 모듈은 메이븐 중앙 리포지토리를 통해서 배포된다. eclipse에서 jdk path를 못찾는 경우 C:\\Users\\nikla\\eclipse\\java-2020-03\\eclipse\\eclipse.ini의 -vm를 {JAVA_HOME}\\bin으로 수정한다. 프로젝트 루트에 pom.xml을 추가하고, 프로젝트 루트에서 mvn compile을 진행 maven 로컬 repo에서 필요한 .jar가 있는지 확인. 없으면 maven 원격 repo에서 로컬로 다운로드...","categories": ["Spring"],
        "tags": ["spring"],
        "url": "http://localhost:4000/spring/spring-di/",
        "teaser": null
      },{
        "title": "[Spring] AOP",
        "excerpt":"들어가며 spring framework의 AOP 기능은 spring-aop 모듈이 제공하는데 spring-context 모듈을 의존 대상에 추가하면 spring-aop 모듈도 함께 의존 대상에 포함된다. aspectjweaver 모듈은 AOP를 설정하는데 필요한 annotation을 제공하므로 이 의존을 추가해야 한다. &lt;dependency&gt; &lt;groupId&gt;org.aspectj&lt;/groupId&gt; &lt;artifactId&gt;aspectjweaver&lt;/artifactId&gt; &lt;version&gt;1.8.13&lt;/version&gt; &lt;/dependency&gt; 프록시 객체 기존 코드를 변경하지 않고 함수의 실행 시간을 출력할 수 있따. ImpeCalculator 클래스나 RecCalculator...","categories": ["Spring"],
        "tags": ["spring"],
        "url": "http://localhost:4000/spring/spring-aop/",
        "teaser": null
      },{
        "title": "[myspl 강좌] 1강",
        "excerpt":"데이터베이스 기초 모든 데이터베이스는 input과 output을 가진다. input은 Create/Update/Delete로 나눌 수 있고 Output은 Read로 이해할 수 있다. CRUD Create Read Upload Delete 데이터를 관리할 때 중요한 4가지 기능들인데 DB는 이러한 일들을 상황에 맞게 자동으로 처리하는 역할을 해준다. file system의 발전 방향은 file -&gt; Spread Sheet(E.g. excel) -&gt; Data Base이다. Database...","categories": ["Myspl"],
        "tags": ["myspl"],
        "url": "http://localhost:4000/myspl/Inflearn-Myspl-Lecture-1/",
        "teaser": null
      },{
        "title": "[Spring] PreparedStatement",
        "excerpt":"PreparedStatement란? 아래와 같이 SQL문의 틀을 미리 생성해 놓고 ?를 이용해서 나중에 값을 지정하는 것이 java.sql.PreparedStatement이다. Member member; Connection conn = null; PreparedStatement pstmt = ull; ResultSet rs = null; try{ conn = DriverManager.getConection(\"jdbc:mysql://localhost/spring5fs\", \"spring5\", \"spring5\"); pstmt = conn.prepareStatement(\"select * from MEMBER where EMAIL=?\"); pstmt.setString(1, email); rs = pstmt.executeQuery(); if(rs.next()){ member...","categories": ["Spring"],
        "tags": ["spring"],
        "url": "http://localhost:4000/spring/spring-preparedstatement/",
        "teaser": null
      },{
        "title": "[Spring] JDBC",
        "excerpt":"들어가며 DB 연동을 처리하는 방법은 JPA, MyBatis 등을 사용하는 방법이 있지만 지금은 JDBC를 통해서 기본적인 DB 연동을 처리하는 방법을 배운다. JDBC 프로그래밍의 단점을 보완하는 스프링 JDBC API를 이용하면 DB연동에 필요한 Connection을 구한 다음 쿼리를 실행하기 위해서 PreparedStatement를 생성한다. 그리고 쿼리를 실행한 뒤에는 finally 블록에서 ResultSet, PreparedStatement, Connection을 닫는다. Member member;...","categories": ["Spring"],
        "tags": ["spring"],
        "url": "http://localhost:4000/spring/spring-jdbc/",
        "teaser": null
      },{
        "title": "[Spring] JDBC transaction",
        "excerpt":"트랜잭션 처리 이메일이 유효한지 여부를 판단하기 위해 실제로 검증 목적의 메일을 발송하는 서비스를 경험해본 적이 있다. 이들 서비스는 이메일이 함꼐 보낸 링크를 클릭하면 최종적으로 이메일이 유효하다고 판단하고 해당 이메일을 사용할 수 있도록 한다. 이렇게 이메일 인증 시점에 테이블의 데이터를 변경하는 기능은 아래 코드처럼 회원 정보에서 이메일ㅇ르 수정하고 인증 상태를 변경하는...","categories": ["Spring"],
        "tags": ["spring"],
        "url": "http://localhost:4000/spring/spring-jdbc-transaction/",
        "teaser": null
      },{
        "title": "[Spring] JDBC MVC",
        "excerpt":"스프링 MVC 시작하기 스프링을 사용하는 여러 이유가 있지만 한 가지 이유를 꼽자면 스프링이 지원하는 웹 MVC 프레임워크 때문이다. 스프링 MVC의 설정 방법만 익혀두면 웹 개발에 필요한 다영한 기능을 구현할 수 있게 된다. 일단 이 장에서는 스프링 MVC 프레임웤를 이용해서 간단한 웹 프로그램을 작성해서 실행해 보고 이후 점진적으로 입문에 필요한 내용을...","categories": ["Spring"],
        "tags": ["spring"],
        "url": "http://localhost:4000/spring/spring-jdbc-mvc/",
        "teaser": null
      },{
        "title": "[Proj NJ] Proj Login",
        "excerpt":"폴더 트리 D:\\DEV\\SPRING\\PROJECT-NIKLASJANG └─project-login ├─.settings ├─src │ └─main │ ├─java │ ├─resources │ └─webapp //HTML,CSS,JS,JSP 등 웹 앱 구현 코드 │ └─WEB-INF //web.xml 파일 │ └─view └─target //mvn compile로 생성된 디렉토리 ├─classes ├─m2e-wtp │ └─web-resources │ └─META-INF │ └─maven │ └─proj-niklasjang │ └─proj-login ├─maven-status │ └─maven-compiler-plugin │ └─compile │ └─default-compile...","categories": ["Spring"],
        "tags": ["spring"],
        "url": "http://localhost:4000/spring/proj-login/",
        "teaser": null
      },{
        "title": "[Backend] 멀티쓰레드와 비동기 IO에 대해 ",
        "excerpt":"좋은 글을 발견해서 일단 copy paste만 합니다. 멀티스레딩 프로그래을 다른 구분으로 나누면 Computed-Bounded 스레드와 IO-Bounded 스레드로 나뉠 수 있습니다. Computed-Bounded 스레드 라 하면 CPU, CPU Cache, 메인 메모리 범위에서 수행되는 작업입니다. 보통의 수학 연산이나, 메모리상의 Data 처리에 해당됩니다. IO-Bounded 스레드라고 하다면? 당근 CPU, 메모리를 제외한 HDD, 네트웍과 같이 외부저장장치와의 통신...","categories": ["Backend"],
        "tags": ["Backend"],
        "url": "http://localhost:4000/backend/multi-thread-vs-async-io/",
        "teaser": null
      },{
        "title": "[기업분석] ARCUS",
        "excerpt":"분산 메모리 캐시 클라우드 ARCUS 유연한 클라우드 Memcached 기반으로 단순한 key-value 유형 외에 list, set, b+ tree 같은 collection 유형을 제공하도록 확장함 Zookepper를 이용하여 운영 중 노두 추가 및 제거가 가능하도록 구현 데이터베이스의 앞 단에 위치해서 hot-spot 성격의 데이터를 캐싱 빠른 응답성을 제공 데이터 베이스의 부하를 감소 복잡한 계산에 의한...","categories": ["Backend"],
        "tags": ["Backend"],
        "url": "http://localhost:4000/backend/Company-Analysis-ARCUS/",
        "teaser": null
      },{
        "title": "[Git] Git branch",
        "excerpt":"브랜치 목록 확인 git branch ``` $ git branch iss53 master testing ``` 브랜치 별 가장 마지막 커밋 확인 git branch -v ``` $ git branch -v iss53 93b412c fix javascript issue master 7a98805 Merge branch ‘iss53’ testing 782fd34 add scott to the author list in the readmes ``` remote...","categories": ["Git"],
        "tags": ["git","git branch"],
        "url": "http://localhost:4000/git/git-branch/",
        "teaser": null
      },{
        "title": "[Git] Git flow",
        "excerpt":"git flow 배포했거나 배포할 코드만 master 브랜치에 Merge 해서 안정 버전의 코드만 master 브랜치에 둔다. 개발을 진행하고 안정화하는 브랜치는 develop라는 이름으로 추가로 만들어 사용한다. 이 브랜치는 언젠가 안정 상태가 되겠지만, 항상 안정 상태를 유지해야 하는 것이 아니다. 테스트를 거쳐서 안정적이라고 판단되면 master 브랜치에 Merge 한다. 개발 과정에서 여러 개의 기능을...","categories": ["Git"],
        "tags": ["git","git flow"],
        "url": "http://localhost:4000/git/git-flow/",
        "teaser": null
      },{
        "title": "[Git] Git 설치, 설정, help",
        "excerpt":"Git 설치 Ubuntu : $ sudo apt install git-all Window : https://git-scm.com/download/win Git 최초 설정 OS 적용 범위 명령어 디렉토리 Linux git config --system 시스템의 모든 사용자와 모든 저장소 /etc/gitconfig Linux git config --global 시스템의 특정 사용자의 모든 저장소 ~/.gitconfig,~/.config/git/config Linux git config --local 현재 작업중인 특정 저장소 ./ Git...","categories": ["Git"],
        "tags": ["git","git install","git config","git help"],
        "url": "http://localhost:4000/git/git-install-config-help/",
        "teaser": null
      },{
        "title": "[Git] Git 로그 관리",
        "excerpt":"로그 확인하기 기능 명령어 결과   기본 git log commit a11bef06a3f659402fe7563abf99ad00de2209e6 Author: Scott Chacon schacon@gee-mail.com Date: Sat Mar 15 10:31:28 2008 -0700 first commit   확인할 로그의 개수 설정 git log -2 git log와 같이 로그의 commit message만 확인 가능   확인할 로그의 수정된 내용까지 확인 git log -p -2...","categories": ["Git"],
        "tags": ["git log","git"],
        "url": "http://localhost:4000/git/git-log/",
        "teaser": null
      },{
        "title": "[Git] Git Merge",
        "excerpt":"Fast forward Merge C4 커밋이 C2 커밋에 기반한 브랜치이기 때문에 브랜치 포인터는 Merge 과정 없이 그저 최신 커밋으로 이동한다. $ git checkout master $ git merge hotfix 3-way Merge master와 iss53 브랜치를 merge하는 경우 두 브랜치의 조상이 다르기 때문에 ff merge를 진행할 수 없다. 이런 경우 3-way merge의 결과를 별도의...","categories": ["Git"],
        "tags": ["git","git Merge"],
        "url": "http://localhost:4000/git/git-merge/",
        "teaser": null
      },{
        "title": "[Git] Git Rebase",
        "excerpt":"Rebase? Git에서 한 브랜치에서 다른 브랜치로 합치는 방법으로는 두 가지가 있다. 하나는 Merge 이고 다른 하나는 Rebase 다. 비슷한 결과를 만드는 다른 방식으로, C3 에서 변경된 사항을 Patch로 만들고 이를 다시 C4 에 적용시키는 방법이 있다. Git에서는 이런 방식을 Rebase 라고 한다. rebase 명령으로 한 브랜치에서 변경된 사항을 다른 브랜치에...","categories": ["Git"],
        "tags": ["git","git rebase"],
        "url": "http://localhost:4000/git/git-rebase/",
        "teaser": null
      },{
        "title": "[Git] Git 저장소 및 파일 관리",
        "excerpt":"Git 저장소 만들기 기존 디렉토리를 Git 저장소로 만들어 github에 올리기 $ cd {프로젝트 디렉토리} $ git init $ 파일 작업 $ git add . $ git commit -m \"commit 설명\" $ git remote add origin https://github.com/{username}/{projecname} $ git pull origin master $ git push origin master github에 있는 저장소를 local로...","categories": ["Git"],
        "tags": ["git add remote","gitignore","git add","git commit","git rm","git mv","git status","git diff"],
        "url": "http://localhost:4000/git/git-remote-file-management/",
        "teaser": null
      },{
        "title": "[Git] Git Alias",
        "excerpt":"git은 완벽한 명령어만 알아듣는다. git config --global alias.co checkout git config --global alias.br branch git config --global alias.ci commit git config --global alias.st status git config --global alias.unstage 'reset HEAD --' 아래의 두 명령어는 정확히 같은 명령어 git unstage fileA git unstage HEAD -- fileA git config --global alias.last 'log...","categories": ["Git"],
        "tags": ["git","git Alias"],
        "url": "http://localhost:4000/git/git-tag-Alias/",
        "teaser": null
      },{
        "title": "[Git] Git tag",
        "excerpt":"Lightweight Tag lightweight 태그는 브랜치처럼 checkout할 수 있는 지점이지만, 가리키는 지점을 최신 커밋으로 이동시키지 않는다. 단순히 특정 커밋에 대한 포인터일 뿐이다. 생성 : git tag v0.0.1-lw 정보 확인 : git shw v0.0.1 lightweight가 가리키는 commit에 대한 정보를 알 수 있다. Annotation Tag Git DB를 만든 사람의 이름, 이메일, 태그를 만든...","categories": ["Git"],
        "tags": ["git","git tag"],
        "url": "http://localhost:4000/git/git-tag/",
        "teaser": null
      },{
        "title": "[Git] Git 취소하기",
        "excerpt":"unstage로 파일 상태를 변경하기   git reset HEAD {files}   Modified 파일 되돌리기   git checkout -- {file}   unstage로 바꾼 뒤 모든 변경 사항 버리기      git reset HEAD {file}   git checkout -- {file}   ","categories": ["Git"],
        "tags": ["git","git reset","git checkout --"],
        "url": "http://localhost:4000/git/git-undo/",
        "teaser": null
      },{
        "title": "[Backend] HTTP, TCP/IP 동작과정",
        "excerpt":"HTTP 동작 과정 host, 통신 링크, 라우터, 데이터, 패킷 host들은 통신 링크로 연결되며, 링크의 특성에 따라서 전송률과 대역폭이 달라집니다. 통신 링크들이 연결되는 지점을 router라고 합니다. link와 router를 통해서 전송되는 데이터는 packet의 형태를 가집니다. data를 segment로 나누고 header를 붙히면 packet이 됩니다. 네트워크 5계층 이름 정보 패킷 프로토콜 역할 애플리케이션 message HTTP,...","categories": ["Backend"],
        "tags": ["backend","WAS","web server"],
        "url": "http://localhost:4000/backend/how-http-tcp-ip-works/",
        "teaser": null
      },{
        "title": "[Backend] level trigger eidge trigger 구조",
        "excerpt":"trigger Level-Trigger Notification 상태 변화를 감지하고자 하는 fd가 준비되면 무조건 알리는 방식이다. 어떤 이벤트가 발생하고 있는 동안에 발생하는 트리거이다. 0과 1만 있는 상태에 대해서, 상태 1인 경우를 체크하기 위한 레벨 트리거는 상태가 1이면 이벤트가 발생한다. 반면에 상태가 0인 경우에는 이벤트가 발생하지 않는다. 소켓에 버퍼가 있는 동안에는 계속 반환한다. Edge-Trigger Notification...","categories": ["Backend"],
        "tags": ["backend","trigger","level trigger","edge trigger"],
        "url": "http://localhost:4000/backend/level-trigger-edge-trigger/",
        "teaser": null
      },{
        "title": "[Backend] select, poll, epoll 구조",
        "excerpt":"select 한줄로 표현하면, fd_set을 만들어 그 set에 속한 fd 중 하나라도 입력이 들어오면 블럭상태가 해제되고 원하는 루틴을 수행할 수 있다. select:: 동작 과정 싱글쓰레드로 다중 IO를 처리하는 대표적인 방법이다. select는 많은 fd를 한 번에 관찰하는 FD_SET 구조체를 사용하여 빠르고 간편하게 유저에게 fd의 상황을 알려준다. FD_SET을 통해서 fd가 IO 할 준비가...","categories": ["Backend"],
        "tags": ["backend","WAS","web server"],
        "url": "http://localhost:4000/backend/select-poll-epoll/",
        "teaser": null
      },{
        "title": "[Backend] WAS(Web Application Service) 동작 과정",
        "excerpt":"Static Pages 웹 서버는 파일 경로 이름을 받아서 경로와 일치하는 DB에서 file을 찾아서 반환합니다. 항상 동일한 페이지를 반환하는 경우를 static pages 라고 부릅니다. html, css, image, javascript 파일과 같이 컴퓨터에 저장되어 있는 파일을 의미합니다. 파일을 요청하는 url에 query string이 포함되지 않는 경우로 같은 파일에 대해서 항상 같은 url이 사용됩니다. Dynamic...","categories": ["Backend"],
        "tags": ["backend","WAS","web server"],
        "url": "http://localhost:4000/backend/was-structure/",
        "teaser": null
      },{
        "title": "[DB]  트랜잭션과 ACID",
        "excerpt":"트랜잭션이란 DB 내에서 하나의 논리적인 기능을 수행하는 단위로, 더이상 쪼갤 수 없는 작업의 논리적인 단위입니다. ACID 트랜잭션이 만족해야하는 속성으로 ACID는 다음과 같습니다. Atomicity Consistency Isolation Durablility 원자성(Atomicity) 트랜젝션 내의 모든 연산들은 반드시 한꺼번에 완전하게 전체가 정상적으로 수행이 완료되거나 아니면 어떠한 연산도 수행되지 않은 all or noting으로 수행되어야 합니다. 예를 들어...","categories": ["Database"],
        "tags": ["transaction","acid"],
        "url": "http://localhost:4000/database/transaction-acid/",
        "teaser": null
      },{
        "title": "[Java] Garbage Collector 내부 구조",
        "excerpt":"힙 영역의 구조 eden survivor1 survivor2 old permanent Minor GC eden 영역에서 old 영역 방향으로 오랫동안 참조되고 있는 메모리를 복사를 통해서 보존합니다. 가장 GC가 많이 일어나는 공간은 eden 영역입니다. 최초에 객체가 생성되면 Eden영역에 생성된다. Eden영역에 객체가 가득차게 되면 첫 번째 CG가 일어난다. survivor1 영역에 Eden영역의 메모리를 그대로 복사된다. 그리고 survivor1...","categories": ["Java"],
        "tags": ["java","garbage collector","gc"],
        "url": "http://localhost:4000/java/gargabe-collector/",
        "teaser": null
      },{
        "title": "[Java] compile",
        "excerpt":"*.jar java의 실행 가능한 파일 여러 개의 클래스 파일을 하나로 묶어서 실행할 수 있도록 해준다. 즉, .class 파일의 묶음 *.jar로 만들면 프로그램의 경로나 파일의 위치에 상관없이 실행이 가능하다 JDBC의 *.jar 데이터베이스에 connection하는 JDBC 인터페이스는 데이터베이스 프로그램을 만드는 회사에서 구현합니다. 자신의 회사의 데이터베이스에 맞게 구현한 클래스 파일 묶음인 .jar 라이브러리를 제공합니다....","categories": ["Java"],
        "tags": ["java","compile"],
        "url": "http://localhost:4000/java/java-compile/",
        "teaser": null
      },{
        "title": "[Java] JDK, JRE, JVM 차이점",
        "excerpt":"JDK : Java Development Kit JDK = JRE + Development Tools(Compiler(javac), Debugger etc) 자바 개발을 위해서 필요한 도구들 모음 JDK 안에는 JRE가 포함된다. 컴파일한 결과를 실행하기 위해서 필요하기 때문 JRE : Java Runtime Environment JRE = JVM + Libarary Classes 자바로 작성된 프로그램을 실행하기 위해서 필요한 것 자바 프로그램을 사용하기만...","categories": ["Java"],
        "tags": ["java","jdk","jre","jvm"],
        "url": "http://localhost:4000/java/jdk-jre-jvm/",
        "teaser": null
      },{
        "title": "[Java] jsp ",
        "excerpt":"JSP란   java를 기반으로하는 Server side 스크립트 언어이다. HTML 코드에 Java 코드를 넣어 동적인 웹 페이지를 생성하는 웹 어플리케이션 도구 JSP를 통해 정적인 HTML과 동적으로 생성된 contents(HTTP 요청 파라미터)를 혼합하여 사용할 수 있다. 즉, 사용자가 입력한 contents에 맞게 동적인 웹 페이지를 생성한다.  ","categories": ["Java"],
        "tags": ["java","jsp"],
        "url": "http://localhost:4000/java/jsp/",
        "teaser": null
      },{
        "title": "[Java] JVM 내부 구조",
        "excerpt":"JVM의 내부 구조 Class Loader(from *.class binary) 자바소스.java 파일을 컴파일하면 client.class와 같은 바이트코드가 생성된다. 이렇게 생성된 클래스 파일을 엮어서 JVM이 운영체제로부터 할당 받은 메모리 영역인 Runtime Data Area로 적재하는 역할을 수행한다. 자바 애플리케이션이 실행중일 때 이 작업이 수행된다. Execution Engine Class Loader에 의해서 메모리에 적재된 바이너리를 기계어로 변경해 명령어 단위로...","categories": ["Java"],
        "tags": ["java","jvm"],
        "url": "http://localhost:4000/java/jvm-structure/",
        "teaser": null
      },{
        "title": "[Java] Polymorphism 다형성 ",
        "excerpt":"다형성이란   한 인터페이스를 여러 클래스가 다양한 방식으로 구현한 경우 프로그램에서 인터페이스에 선언되 메서드를 사용할 때 각 클래스의 구현 내용과 상관없이 동일한 방식으로 사용할 수 있습니다.   같은 코드가 여러 구현 내용으로 실행되는 객체지향 특징을 다형성이라고 합니다.  ","categories": ["Java"],
        "tags": ["java","compile"],
        "url": "http://localhost:4000/java/polymorphism/",
        "teaser": null
      },{
        "title": "[Backend] blocking/non blocking/sync/async socket io",
        "excerpt":"Blocking I/O 작업은 유저레벨에서 직접 수행할 수 없다. 실제 I/O를 수행하는것은 커널레벨에서만 가능하다. 따라서 유저 프로세스(또는 쓰레드)는 커널에게 I/O를 요청해야한다. I/O에서 블로킹 형태의 작업은 유저 프로세스가 커널에게 I/O를 요청하는 함수를 호출하고, 커널이 작업을 완료되면 함수가 작업 결과를 반환한다. 만약 여러 클라이언트가 접속하는 서버를 블로킹방식으로 구현한다고 가정해보자. I/O작업이 blocking 방식으로 구현되면...","categories": ["Backend"],
        "tags": ["backend","socket","io"],
        "url": "http://localhost:4000/backend/blocking-non-blocking-io/",
        "teaser": null
      },{
        "title": "[Backend] socket io 구조",
        "excerpt":"               event       의미                       O_NONBLOCK       논 블럭킹 방식으로 데이터 전송하고자 할 때 적용하는 소켓의 attribute ( fcntl() 함수 사용)                 EAGAIN       버퍼가 꽉 차서 더 이상 전송이 불가능 할 경우에 발생하는 에러코드          ","categories": ["Backend"],
        "tags": ["backend","socket","io"],
        "url": "http://localhost:4000/backend/socket-io/",
        "teaser": null
      },{
        "title": "[AWS] AWS 서비스 간단 설명",
        "excerpt":"서비스 설명 EC2 Elastic Compute Cloud. 독립된 컴퓨터를 임대해주는 서비스. 터미널에서 ssh를 통해서 ec2의 IP주소로 접속해서 사용한다. S3 Simple Storage Serivce. bool,int,string과 같은 간단한 데이터 타입을 지원하는 저장공간이다. RDS Relational Database Service. 관계형 데이터베이스를 서비스로서 제공하는 제품이다. MySQL, MariaDB, PostgreSQL, SQL Server, ORACLE 등을 직접 운영하지 않고 AWS에 대행할 수...","categories": ["AWS"],
        "tags": ["aws"],
        "url": "http://localhost:4000/aws/socket-io/",
        "teaser": null
      },{
        "title": "[Backend] CDN 콘텐츠 분배 네트워크",
        "excerpt":"ISP, Internet Service Provider 사용자의 입장에서 접속 ISP는 텔코나 케이블 회사일 필요가 없다. 대신 대학교 또는 회사가 ISP가 될 수 있다. 이러한 연결은 종단 시스템이 연결되는 과정에서 극히 일부이고 접속 ISP들이 서로 연결되어야만 한다. 최초의 ISP 연결은 모든 접속 ISP는 하나의 글로벌 ISP와 연결하는 방법이다. 만약 또 다른 글로벌 ISP...","categories": ["Backend"],
        "tags": ["backend","cdn"],
        "url": "http://localhost:4000/backend/cdn-content-distribution-network/",
        "teaser": null
      },{
        "title": "[Java] jar, war 차이점 ",
        "excerpt":"jar와 war 모두 java의 jar 툴을 이용해서 생성도니 압축(아카이브) 파일입니다. 앱을 쉽게 배포하고 동작할 수 있도록 관련 소스들을 패키징 해주는 것이 주 역할입니다. JAR, java Archive maven 등을 통해 내려받은 라이브러리들은 CLASS 파일이 묶인 jar 파일로 구성되어 있습니다. class와 같은 java 리소스와 속성 파일, 라이브러리 등의 파일이 포함되어 있습니다. java...","categories": ["Java"],
        "tags": ["java","jsp"],
        "url": "http://localhost:4000/java/jar-war/",
        "teaser": null
      },{
        "title": "[자격증][정처기] 3과목 데이터베이스 구축 - 1",
        "excerpt":"1장 논리 데이터베이스 설계 70 데이터 베이스 설계 데이터베이스 설계 순서 요구 조건 분석 : 요구 조건 명세서 작성 개념적 설계 : 개념 스키마, 트랜잭션 모델링, ER 모델 논리적 설계 : 논리 스키마 설계,트랜잭션 인터페이스 설계 관계형 DB라면 테이블을 설계하는 단계 결과적으로 데이터베이스 스키마가 도출된다. 물리적 설계 : 물리적 구조의...","categories": ["EIP"],
        "tags": ["EIP"],
        "url": "http://localhost:4000/eip/EIP-Subject-3-1/",
        "teaser": null
      },{
        "title": "[자격증][정처기] 3과목 데이터베이스 구축 - 2",
        "excerpt":"2장 물리 데이터베이스 설계 85 사전 조사 분석 논리적 구조로 표현된 논리적 DB를 디스크 등의 물리적 저장장치에 저장할 수 있는 물리적 구조의 데이터로 변환하는 과정 물리적 DB 구조의 기본적인 데이터 단위는 저장 레코드이다. 반드시 포함되어야 하는 요소 저장 레코드의 양식 설계 Record Clustering의 분석 및 설계 접근 경로 설계 여러...","categories": ["EIP"],
        "tags": ["EIP"],
        "url": "http://localhost:4000/eip/EIP-Subject-3-2/",
        "teaser": null
      },{
        "title": "[자격증][정처기] 5과목 정보시스템 구축 관리 - 1",
        "excerpt":"1장 소프트웨어 개발 방법론 활용 157 소프트웨어 개발 방법론 소프트웨어 개발, 유지보수를 위한 수행 방법/기법을 표준화 한 것 목적 : 생산성과 품질 향상 방법론 종류 구조적 방법론 정형화된 분석 절차에 따라 사용자 요구사항을 파악해서 문서화하는 처리Process 중심의 방법론 목적 : 쉬운 이해 및 검증이 가능한 프로그램 개발 분할과 정복 원리를...","categories": ["EIP"],
        "tags": ["EIP"],
        "url": "http://localhost:4000/eip/EIP-Subject-5-1/",
        "teaser": null
      },{
        "title": "[자격증][정처기] 5과목 정보시스템 구축 관리 - 2",
        "excerpt":"2장 IT 프로젝트 정보 시스템 구축 관리 166 네트워크 관련 신기술 IoT 정보 통신 기술을 기반으로 실세계와 가상 세계의 다양한 사물을 인터넷으로 연결하여 서비스를 제공 유비쿼터스 : 어디서나 네트워크에 접속할 수 있는 환경 M2M. Machine to Machine. 사물 통신 무선 통신을 이용한 기계와 기계 사이의 통신 부호 분할 다중 접속(CDMA),...","categories": ["EIP"],
        "tags": ["EIP"],
        "url": "http://localhost:4000/eip/EIP-Subject-5-2/",
        "teaser": null
      },{
        "title": "[PS][Java] java PS 몸풀기",
        "excerpt":"터렛 풀이 1 : 두 점에서 만나는 경우를 정의하지 못한 경우. 두 명의 관측자의 좌표와 관측한 거리가 주어진다. 따라서 두 개의 원의 중심과 반지름 길이를 알 수 있다. 두 개의 원이 0,1,2 점에서 겹치는 경우를 따져보면 된다. 겹치는 점의 갯수와 상관없이 두 개의 원이 안으로 만나는지, 밖으로 만나는지를 따져야 한다....","categories": ["PS"],
        "tags": ["math","java","ps"],
        "url": "http://localhost:4000/ps/java-ps-warming-up/",
        "teaser": null
      }]
