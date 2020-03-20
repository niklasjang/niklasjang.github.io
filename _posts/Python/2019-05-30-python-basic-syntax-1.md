---
title: "기본 Python sysntax 정리 Part 1."
excerpt: "Try! Hello world정리 Part 1.~ 9."
date: 2019-05-30
categories:
  - Python
tags:
  - python
  - syntax

toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide  
---

## PART 1 시작하기

### 01 파이썬 설치하기 

- www.python.org 

### 02 편집기 설치하기 

- 노트패드++ 설치 권장
- 새 파일 만들어서 내 문서에 확장자 .py로 저장
- 파워셸 실행 win + R

### 03 Hello World! 출력하기

- () : 어떤 글자를 출력할지 알려 주는 역할
- '' 또는 "" 사용
- 파워셸에서 python 실행 후 `exit()`로 종료

## PART 2 변수와 계산

### 04 변수

```python
identity = '지구인'
number_of_legs = 4
print('안녕 나는', identity ,'이야.','나는 다리가 ',number_of_legs,'개 있어.')
```

### 05 주석

- 한 줄만 주석 : #
- 여러 줄 주석 :
```py''' ~ '''``` or ```py""" ~ """```
-숫자를 '' 안에 넣으면 문자열로 인식한다. 
-거듭제곱의 꼴은 A ** B로 나타낸다. 
-두 수를 그냥 더하면 두 수의 합이 출력되고, 숫자를 ''로 감싸고 +를 하면 그대로 붙혀진다.

### 07 REPL 사용하기

- 셸에서 python + enter
- REPL : Read valuate/valuation Print Loop (python 대화형 창)
- 문자열에 숫자를 곱하면 문자열이 숫자만큼 출력된다. 

### 08 셸 사용하기

- 운영체제가 사용자와 소통하는 방법, 일반적으로 보이는 화면은 그래픽 셸
- window power shell을 명령줄 셸이라고 칭함.
- 명령어의 종류

```txt
pwd : print working directory : 현재 작업중인 디렉터리를 출력하는 명령어
        흔히 쓰는 폴더(foder)와 같은 의미이지만 명령줄 셸에서는 디렉터리라고 하기.
ls : list segments(부분, 영역) : 현재 디렉터리에 담긴 구성물을 목록형태로 보여줌.
cd : change directory : 현재 작업 중인 디렉터리를 이동할 떄 쓰는 명령어.
    상위 디렉터리로 나가려면 cd .. +enter
cp : copy : 파일 복사 명령어 ex) cp test.py test2.py(test =원본파일이름, test2= 새 파일 이름)
rm : remove : 파일을 삭제할 때 쓰는 명령어 ex) rm test2.py
```

## PART 3 조건문

### 09 if문

```py
if (조건식) :               # : 까먹으면 오류난다.
    #TODO
```

### 10 조건식

- == , <= , >= , !=
- if True: or if False: 형태로 쓸 수 있음.
- and, or , not 모두 연산자임.

### 11 블록

- 파이썬 코드에서 콜론 다음에 들여 쓴 코드를 '블록'이라고 부름.
- 같은 실행 흐름에서 순서대로 실행되는 코드 덩어리

### 12 if-else

```py
if :
    #TODO
elif:
    #TODO
else:
    #TODO
```

## PART 4 함수

### 13 함수

- root 는 a ** 0.5 형태로 구현 #제곱근 = square root  # square = 제곱

```py
def foo() :   #함수 정의
    #TODO 1
    #TODO 2

foo()         #함수 실행
```

```py
print('해는 {} 또는 {}'.format(r1, r2)) # 해는 1 또는 2
```

### 14 매개변수

```py
def print_root (a,b,c) :         # 1번
    print( a, b, c)              # 2번
    print_root(num1, num2, num3) # 3번
```    

- 1번의 a ,b, c는 매개변수(`parameter`)라고 부른다.
- 3번의 num1,num2,num3는 실행인자(`argument`)라고 부른다.
- 매개변수(parameter)의 갯수와 실행인자(argument)의 갯수를 맞추지 않으면 오류가 난다.
- 영어이름 parameter 와 argument 는 error code 를 이해하기 위해서 암기해두기.

### 15 함수의 값

- 이 책에서 retrun이 공식적으로 처음 나오는 부분.
- return이 2개라면 두 개 중에 먼저실행한 return 값이 출력됨.
- return이 실행된 즉시 함수 실행을 끝내버린다.
- 함수를 빨리 끝낼 때는 if를 사용해서 흐름을 분기한 후에 return을 사용하고, 프로그램의 종료를 원할 때는 exit() 과 sys.exit()을 상황에 맞게 사용한다.
- 파이썬에서 return 은 두 개 이상의 값을 동시에 return 할 수 있다 E.g) retrun num1, num2
- **실행인자 argument가 3개여도 result1, result2 = print_root(A,B,C)형태로 가능.**

## PART 5

### 16 format

```py
# 아래와 같이 base를 따로 저장하고 다음 줄에서 base.format형태로 쓸 수 있다.
base = '{}번 손님, {}. {}에 오신 것을 {}!'
new_way = base.format(num, greeting, place, welcome)
```

- base 뒤의 . 은 format이 base에 속함을 의미하는 함수.
- 문자열에 포함된 {} 개수와 foramt 안의 {} 갯수가 달라도 오류가 나지 않을 수 있음.
    * 문자열의 {} > format의 {} : 오류 발생
    * 문자열의 {} < format의 {} : 오류 발생하지 않음! 알아서 잘 찾기!

### 17 문자열

- 따옴표가 영어로 quote.
- 책에서 추상적으로 다룰 때는 '텍스트', 코드 안에서는 '문자열'이라고 표현하겠음.
- ''와 ""를 쓰는 결과에서는 아무런 차이가 없음
- ''를 문자열에 포함시키고 싶으면 "", ""를 문자열에 포함시키고 싶으면 ''를 사용.
- 문자열 안에 ''와 ""를 모두 포함시키고 싶을 때는 str1= '''( ''와 "" )'''or"""(''와 "")"""로 쓰기
- str1 = """ 문자열이 길어서 다음 줄에  
            넘어갈 때는 이렇게 세 개를 사용한다."""

### 18 정수와 실수

- a // b : a를 b로 나눈 몫을 출력
- int : integer 정수
- float : floating point : 부동소수점 
- print((int)5.0)  #정수로 바꾸기
- print((float)5) #실수로 바꾸기

### 19 사용자 입력받기
- print()의 ()안에 end=' ' 나오는데 이는 일단 출력 텍스트를 깔끔하게 하는 용도라고만 이해하기. #TODO 튜플 배우고 다시 오기.
- input은 사용자 입력을 받는 기능과 더불어 간단한 print 기능까지 갖고 있다.
- 사용자 입력을 여러개 받아야하는 상황에서 불가피하게 빠져나오려면 Ctrl + C 를 입력한다.

## PART 6 리스트

### 20 리스트

- list : 다른 변수를 담을 수 있는 변수
- 값을 여러 개 저장할 때 한번에 다루면서 '세 번쨰 변수'처럼 위치를 지정할 수도 있음.
- list = [37, '안경', '바위']  #각각의 값을 선택해서 지정 : list[0], list[1], list[2]
- list [0] = 'note' # 값 변경
- print(list[3]) : 리스트에 든 항목의 개수보다 큰 값을 넣으면 오류가 발생한다.
- list [-1] #-1 뒤에서 첫 번째라는 뜻이다.
- list [-4] # -4 뒤로도 한 바퀴 이상을 지정하면 오류가 발생한다.

### 21 리스트 수정

- list2= [3, 23, 42, 22, 44, 12]
- list2.append(16) # 리스트에 새로운 값을 추가하기.
- print (list2) # 출력값: [3, 23, 42, 22, 44, 12, 16] 
- list3 = list2 + [16] #리스트를 합치기
- in 연산 : ownership = 23 in list3 #ownership = False 대입됨. (리스트에 해당 값이 있는지 없는지 판별한다. True/False return)
- del : del list3[12] # list3에 있는 13번 째 값을 지운다!
- list3.remove(40) # 이 값이 리스트 안에 여러 개 들어 있어도 가장 먼저 나오는 값 하나만 지운다.
- .append 와 .remove는 ()를 사용하고,  del과 +는 [ ]를 사용한다. 
- del은 지금까지 하던대로 del(listp[3])처럼 괄호를 사용해도 된다.

```py
# +는 리스트끼리 더하는 것이므로 []를 사용한다.
# .append 는 .이 있으므로 ()를 사용한다.
# .remove는 .이 있으므로 ()를 사용한다.
# del은 print()와 같이 ()를 붙히는 것으로 암기하자. 단 지우는 값은 [index]로 지정한다.
```

## PART 7 for 반복문
### 22 for in list

```py
patterns = [1,2,3,4,5,1]
for pattern in patterns  :       #pattern에 patterns의 값을 하나씩 넣으면서 실핸한다. :도 필수!
    print(pattern)                # 착각하고 있었는데 pattern +=1이 아니다. index없어도 계속 바뀜
#for-in : in 뒤의 리스트의 크기에 관계없이 항상 모든 리스트에 대해 코드를 사용할 수 있는 장점.
```

### 23 for in range

- 리스트의 크기가 클 경우 for in list를 사용하면 for in [0,0,0,0,0,,0,0,0,0``````]와 같이 다 적어주어야 한다.
- for in range(5) :  # 0부터 순서대로 총 숫자가 5개 든 리스트와 비슷한(나중에 나올듯) 것을 만듦
- 리스트에 번호를 붙일 때 유용하다.

```py
for i in range(4) :
    name = names[i]                       #name이라는 변수에 첫 번째 인자를 넣음
    print('{}번: {}'.format(i+1, name))   # i+1로써 X번째 임을 출력
```

- 리스트에 새로운 값을 입력하려면 일일이 매번 list와 range()의 값을 일일이 바꿔주어야한다.
- len()함수는 실행인자(argument)로 전달반은 변수에 항목이 몇 개 들어 있는지 개수를 반환함.

```py
for i in range(len(names)) :
name = name[i]
print('{}번은 {}'.format(i+1, name))
```

- **enumerate : 순서와 리스트 안의 값을 한꺼번에 만들어 냄.**

```py
for i, name in enumerate(names) :
    print('{}번 : {}'.format(i+1, name))
# 값을 두 개 받을 떄 쉼표를 쓰는 것은 함수에서 값 두개를 return 할 때 쉼표를 쓰는 것과 동-원리
- for i in range(11172) : 
print(chr(44032 + i), end= ' ') # 실행결과 한글 쫘아아아악 다 나옴.
```

- for in list : 이미 내가 사용할 값의 목록이 정해져 있고, 그 목록에서 값을 하나씩 꺼내 쓰기만 할 때
- for in range : 횟수가 정해져 있거나 1씩 증가하는 숫자를 써야 할 때 # i += 1 이 여기서 나오네.

## PART 8 모듈

### 24 모듈

- module : 다른 기능을 가져와 쓰는 방법

```py
import math
math.ceil(2.5) # 출력값은 3 , 올림
math.floor(2.5) # 출력값은 2, 내림
# 반올림하는 round는 math 모듈에 업다. 그냥 round(3.5)하면 되고 math.round(3.5)는 오류뜸
```

- REPL에서 철자를 잘못 입력했을 경우 '화살표 위'를 누르면 이전에 입력한 코드가 나온다.

```py
import random
candidates = ['가위',' 바위 ',' 보']
selected = random.choice(candidates)
#random.choice(candidates)는리스트에서 하나를 무작위로 고르는 함수.
```

- import <모듈이름>.<모듈 안의 구성 요소> 와 같이 사용하며, math.pi와 같이 안에 구성요소가 아닌 변수가 들어있는 경우도 있다.

### 25 모듈 만들기

```py
#이 코드를 짠 다음에 my_module.py로 저장한다.
def random_rsp() :
    import random
    return random.choice(['가위',' 바위',' 보'])
```

- 새 창에서 `import my_module` 이라고 적는다. import my_module`.py`가 아니다!
- 모듈 안의 함수를 사용할 때는 random_value = `my_module.random_rsp()`와 같이 쓰면 된다.
- print (a ==b)를 하면 a와 b가 같은지에 대한 True/False가 출력된다. 
- 파이썬의 기본 모듈과 달리 my_module은 그 모듈을 사용할 파일과 같은 폴더에 들어있어야 한다.
- 물론 다른 파일에 있는 모듈도 불러올 수 있지만 지금에서는 이 책의 범위를 벗어난다.

## PART 9 활용하기

### 26 검색하기

1. 검색은 항상 구글에서 한다.
2. python3/python2/python/파이썬3/파이썬2/파이썬을 붙힌다.
3. 영어로 검색한다.
4. stackoverflow.com을 이용한다.
5. google에서  검색어 뒤에 site:python.org를 붙여서 검색한다.
