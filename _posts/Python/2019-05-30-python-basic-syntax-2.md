---
title: "기본 Python sysntax 정리 Part 2."
excerpt: "Try! Hello world정리 Part 10.~ 12."
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

## PART 10 딕셔너리와 튜플

###28 딕셔너리

```py
# '이름표1' : '값1' 형태
# 값은 리스트를 포함해서 무엇이든 올 수 있다.
dict1 = { '가위' : ' 보' , '보' : '바위', '바위' : ' 가위' , 1:2 , 'one': 1}로 구현.
dict1 = { 
    '가위' : ' 보' , 
    '보' : '바위', 
    '바위' : ' 가위' , 
    1:2 , 
    'one': 1           #마지막 dictionary 뒤에 ,는 붙여도 되지만 붙이지 말자.
}
```

### 29 딕셔너리 수정(list와 비교)

- list = [1,2,3,4,5]
- list[2] = 33 # list = [1,2,33,4,5]로 변함.
- list.append(6) #list = [1,2,33,4,5,6] 즉, 리스트의 새 값을 하난 덧붙이는 함수.
- dict1 = { 'one' : 1, 'two' : 2}
- dict1['one'] = 11 # dict1 = {'one' : 11 , 'two' :2}로 갱신됨.
- dict1['three'] = 3 # 딕셔너리에는 .append가 없고 그냥 dict['이름표'] = '값'을 하면 추가됨.  

- list = [1,2,3,4,5]
- list.remove(1) #리스트에서 가장 앞에 있는 1 하나를 지운다. 
- list.pop(0) # pop은 해당하는 인덱스의 값을 제거한 후에 반환까지 한다. REPL에서 확인 가능.
- dict = { 'one': 1, 'two' : 2 }
- dict.pop('one') # list.pop()와 마찬가지로 삭제 후에 반환까지 함.

### 30 딕셔너리와 반복문

- 앞서 말했던 딕셔너리의 이름표와 값은 각각 key와 value가 제대로된 이름임.

```py
for key in age.key():       #for in list와 같은 방법으로 구현. age는 딕셔너리임!
    print(key)              #키가 다 출력 됨.
for value in age.value() :
    print(value)            #value 값이 다 출력 됨.
for key in age :            # 일반적으로 사용하는 값이 key이기 때문에 .key를 생략해도 key를 가져옴.
    print(key)              #key 값이 다 출력 됨. 
for key in age :
    print('{}의 값은 {}입니다.'.format(key, age[key])) #key의 값을 받아서 인덱스로서 사용하기.
for key, value in age.items() : # enumerate와 같이 key와 value를 같이 반환
    print('{}의 값은 {}입니다.'.format(key, value))
```

- dict : age를 딕셔너리로 만들었기 때문에 모든 내용이 한 번씩은 나오지만 순서는 지켜지지 않음.
- list : 순서가 중요한 경우 사용.
- dict : key를 이용해서 value를 찾을 때 사용.

### 31 리스트와 딕셔너리

![list-vs-dict](/assets/images/python/dict-vs-list.jpg)

- 위에서 삽입한 표를 다시 한번 보기.
- 값 확인: A in B: A가 B 안에 있는 것을 확인한 후에 True/False를 반환함.
- .clear() : 내용을 모두 지움.

```py
dict1 = { 1: 100, 2: 300}
dict2 = { 1: 3000, 3: 300}
dict1.update(dict2) # dict1 = {1: 3000, 2: 200, 3: 300}
dict2.update(dict1) # dict2 = {1: 100, 2: 300, 3: 300}
#키가 서로 같은 것은 각각의 키와 함께 값이 남고, 키가 같아 충돌하는 부분은 update() 함수에  
#실행인자로 넘긴 딕셔너리 값으로 업데이된다.
```

### 32  튜플 tuple

- []:대괄호: 리스트
- {}:중괄호: 딕셔너리
- ():소괄호: 튜플을 만들 때 사용한다.
- tuple1 = (1,2,3)
- type(tuple1) #<class 'tuple'>이 출력된다.
- tuple2 = 1,2,3 # 튜플의 핵심은 ()가 아님. ()를 없애도 튜플로 인식함.
- #단 ()가 있으면 튜플임을 더 명확히 나타낼 수 있음
- 튜플과 일반적인 변수 지정의 차이
    * 괄호를 넣지 않고 변수를 지정할 때, 예를 들어 a=1과 같이 하면 a는 int형으로 저장됨.
    * int를 튜플로 저장하기 위해서는 a=1,과 같이 꼭 ,를 넣어야한다. 
- list1 = [1,2,3]
- tuple3 = tuple(list1) #리스트를 튜플로 형변환 시키기.
- 튜플은 연속된 값을 저장하되, **순서와 값이 모두 고정되므로 한 번 만든 다음에는 변경할 수 없다.**
- 튜플은 값을 지울수도, 값을 넣을 수도 없다. 그래서 del와 pop도 불가능하다.
- 불편한 튜플을 쓰는 이유.
    1. 두 변수의 값을 맞바꿀 때
    2. 여러 개의 값을 한 번에 전달하고 싶을 떄
    3. 딕셔너리의 키에 값을 여러 개 넣고 싶을 때

### 33 패킹과 언패킹

- 패킹: 튜플을 이용해서 변수 하나에 값을 여러 개 대입하는 것.
- 언패킹: 패킹딘 변수에서 여러 개의 값을 꺼내오는 것.
- a,b = 1,2  # a=1, b=2가 각각 대입됨.
- a,b는 a와 b로 이루어진 튜플 하나. 1,2는 1과2로 이루어진 튜플 하나.
- 즉 튜플 하나에 튜플 하나를 할당한 것.
- c= (3,4)
- d,e = c # C의 값을 언패킹해서 d와 e에 넣었다고 말함.
- f = d,e  #f= (3,4)       #d와 e의 값을 패킹해서 f에 넣었다고 함.

```txt
#두 수로 이루어진 튜플을 언패킹해서 두 개의 문자에 할당하면 그 문자들은 각각 int형으로 저장됨.
#두 int형 문자에 해당하는 숫자를 하나의 변수에 패킹하면 그 변수는 튜플이 됨.
#이는 패킹과 언패킹에서 ,의 사용 유무를 보면 쉽게 추측이 가능함.
```

```py
x= 5
y=10
x,y = y,x    #x =10 , y=5가 대입됨. 굉장히 쉽게 두 수를 교환할 수 있음
```

- 튜플의 또 다른 유용한 점은 함수에서 여러 개의 값을 한 번에 반환할 때 사용됨.

```py
def tuple_func ():
    return 1,2
a,b = tuple_func()
#a와 b에는 각각 1과 2가 할당되며 이는 튜플이 언패킹된 결과임.
```

### 34 튜플을 이용한 함수의 반환 값

```py
list = [1,2,3,4,5]
for i ,v in enumerate(list):
    print('{}의 값은 {}'.format(i,v))
#enumerate는 list의 인덱스와 값을 튜플의 형태로 i,v에 대입.
#따라서 i에는 인덱스, v에는 값이 대응되는 것임
for a in enumerate(list):
    print('{}의 값은 {}'.format(a[0],a[1]))
#튜플을 하나의 변수에 입력할 수 있기 때문에 enumerate여도 a하나만 쓸 수 있다.
#그리고 튜플을 list[0]과 같은 형태로 쓸 수 있기 때문에 a[0], a[1]하면 첫/두번째 값을 불러옴.
for a in enumerate(list):
    print('{}의 값은 {}'.format(*a))
#이것도 귀찮으면 *을 붙인다. 이는 튜플에 든 값을 쪼개서 여러 개의 실행인자(arguments)로 만듦.
```

- 딕셔너리에서도 enumerate와 비슷한 .items가 있다.

```py
ages= {'Tod':35, 'Jane':23 , 'Paul' :62}
for key, val in ages.items() :
    print('{}의 나이는 {}세 입니다.'.format(key,val))           #가능_1
for a in ages.items() :
    print('{}의 나이는 {}세 입니다.'.format(a[0],a[1])          #가능_2
for a in ages.items() :
    print('{}의 나이는 {}세 입니다.'.format(*a)                 #가능_3
#리스트 : 인데스와 값
#딕셔너리 : key와 value 값을 리턴.
```

## PART 11 while문과 반복 제어

### 35 while문

- selected = None   #=None을 하면 아무것도 입력하지 않는다. **none는 안되니 꼭 N!**

```py
while selected not in ['가위','바위','보'] :
    selected = input('가위 바위 보 중에 입력하라>')
print('선택된 값은:',selected) # format에 치우져 이 방법을 까먹지 말자! 단순하다!
```

- while 반복문은 아래 줄에 들여 써진 블록을 원하는 만큼 반복하며, 구조는 if 조건문과 비슷함.
- 조건을 평가해서 조건이 맞으면 블록을 실행하고 아니면 실행하지 않음.
- for in 문을 while 문으로 바꿀 때 팁 : length = len(patterns)로 두고 i<length로 돌린다.

```txt
ex) for in range(len(patterns)) : ---->  while i<length :
```

-while 문이 더 복잡하므로 for문을 만들어 보고 for문이 너무 복잡해지면 while을 사용하라.

### 36 break와 continue

- break : 반복문 안에서 break가 실행되면 그 즉시 반복문 블록의 실행을 종료하고 밖으로 나감.
- continue: 이번 반복만 끝내고다음 반복을 당장 시작한느 기능. 신경쓰지 않을 부분을 제외함.
- tab이 두 번 이상 있으면 코드를 분석하기가 힘들어 진다. 따라서 continue를 이용해 깔끔하게하자.

## PART 12 예외 처리

### 37 try-except

- IndexError : list=[]한 다음에 list[0]을 불러오는 경우. 빈 리스트에서 값을 불러왔기 때문.
- ValueError: text='abc'하고 number=int(text)하는 경우. 문자열을 정수로 못바꿈.
- 이와 같은 에러 문구가 자주 나타나는데 오류의 이름을 미리 알면 코드안에서 미리 처리를 할 수 있음
- try: 에러가 발생할 가능성이 있는 코드
- except 에러 종류 : 에러가 발생했을 경우 처리할 코드 
- 에러가 발생하면 원래는 멈추어야 하는데 멈추지 말고 except를 실행시킴.
- 예를 들면 이렇게

```py
def safe_pop_print(list, index) :
    if( index < len(list)) :
        print(list.pop(index))
    else :
        print('{} index의 값을 가져올 수 없습니다.'.format(index))

safe_pop_print()
```
```py
def safe_pop_print(list, index) :
    try :
        print(list.pop(index))
    except IndexError :
         print('{} index의 값을 가져올 수 없습니다.'.format(index))

safe_pop_print([1,2,3],5)
```

- 더 쉽게 문제를 풀 수 있거나 더 쉽게 이해할 수 있는 방법으로 사용하기.
- 비슷하면 try 보다는 if가 낫다.

```py 
try :
    import my_module
except ImportError :
    print('모듈이 없습니다.')       #이렇게도 쓸 수 있다.try가 더 자연스러운 경우임.
```
- ZeroDivisionError : 3/0을 하면 나는 에러. 

### 38 모든 예외를 한 번에 처리하고 싶을 때

```py
try:
    list = []
    print(list[0])
    text = 'abc'
    number = int(text)
except :
    print('에러가 발생했습니다.')
#빈 list에서 값을 출력하려고 해서 IndexError가 발생할 것이고
#문자열을 정수형으로 바꾸려고 해서 ValueError가 발생할 것이다.
#try- except에서는 Error가 발생하면 남은 try를 모두 건너뛰고 except로 간다.
```

- 위와 같이 코드를 하면 에러 오류 종류를 알 수 없기 때문에

```py
try :
    list =[]
    print(list[0])
    string = 'abc'
    number = int(string)
except Exception as ex:         #예외 정보를 ex에 담아서 가져오는 것이다.
    print('오류가 발생했습니다', ex )
```

-이 방법은 어떤 예외가 발생하더라도 프로그램을 중단하지 않고 다음 과정을 계속 실행해 나가야 할 떄 유용하다. 
예를 들어, 웹 서버는 사용자가 어떤 페이지를 어떤 방법으로 요청하더라도 요청 하나를 처리한 다음에 다음 요청을 처리해야한다. 
요청을 처리하는 도중에 오류가 발생하더라도 웹 서버가 그대로 예외를 출력하고 멈춰 버리면 곤란하기 때문이다.

- 잡아야 하는 예외의 이름을 모를 때 Exception as에서 Exception은 모든 예외의 상위 예외이므로 Exception을 잡으면 그 코드는 어떤 예외라도 잡을 수 있다. 
따라서 모든 예외를 잡아야하는 상황이라면 하상 Exception이라는 예외를 잡으면 된다. 하지만 상위 예외 이름을 써 하위 예외를 잡으면 의도하지 않은 예외까지 
함께 잡기 때문에 디버깅하기가 어려워질 수 있다. 따라서 의도한 게 아닐라면 쓰지 않는 것이 낫다. 
- 잡아야하는 예외의 이름을 모를 때는 상위 예외를 잡는 것보다 try-except 없이 그대로 예외를 일으킨 다음 예외 이름을 확인한 뒤에 처리하는 것이 낫다.
- 파이썬에는 모든 예외를 처리하는 상황을 지원하기 위해 [traceback 모듈]<https://docs.python.org/2/library/traceback.html>을 제공한다. 이 모듈은 책에서 다루는 범위를 벗어나므로 알아서 더 찾아보도록 해라.

```py
try:
    pass   # 예외를 발생시키는 코드를 넣어 주세요.
except Exception :
    import traceback
    traceback.print_exc()   #파이썬에서 예외를 출력해 주는 코드와 같다.
      #오류 출력 후 이 다음 코드는 정상으로 실행된다.
```

### 39 raise

```py
def rsp(mine, yours) :
    allowed = ['가위','바위','보']
    if mine not in allowed :
        raise ValueError("'가위','바위','보' 가운데 하나의 값만 입력받을 수 있습니다.")
    if yours not in allowed :  #↖ 큰 따옴표를 사용한다. 
        raise ValueError   #일부러 ValueError를 일으킨다. 일부러 내가 지정한 곳에서 낸다.

rsp('가위','바')  #일부러 틀린 값인 '바'를 넣는다.

# (코드줄임)

try:
    rsp('가위','바')
except ValueError :
    print('잘못된 값을 넣었습니다.')
```

```py
classrooms = {'1반' : [172,185,198,177,175,199], '2반':[165,177,167,180,191]}
try:
    for class_id, heights in calssrooms.items():
        for height in heights:
            if height > 190 :
                print(class_id, '에 190이 넘는 학생이 있습니다.')
                raise StopIteration

except StopIteration :
    print('정상 종료.')
#classrooms 딕셔너리를 정의하고, try에서 1반과 키를 튜플로 받은 다음에
# 튜플이 class_id와 heights에 언패팅이 된 후에
# for height in heights 문에 들어가고 if문을 지나서 StopIteration이 raise된다.
```

```py
# shops라는 딕셔너리 안에 가격을 입력한 딕셔너리가 또 들어가있다.
-shops = {
            "송일문방구": {"가위": 500, "크레파스": 3000},
            "알파문구": {"풀": 800, "도화지": 300, "A4용지": 8000},
            "다이소": {"풀": 500, "목공본드": 2000, "화분": 3000}
}
for shop, products in shops.items():
    for product, price in products.items():
        if product =='풀':
            print("{}: {}원".format(shop, price))
```
