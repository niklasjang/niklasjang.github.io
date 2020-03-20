---
title: "기본 Python sysntax 정리 Part 3."
excerpt: "Try! Hello world정리 Part 13.~ 15."
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

## PART 13 논리 연산과 if문 더 알아보기

### 40 논리 연산 더 알아보기

- and : 연결된 모든 식이 True일 때만 True
- :연결된 식 중 하나라도 False 이면 False
- : A and B 에서 A가 True 일 때 B의 결과를 따름.
- : A and B 에서 A가 False 이면 B는 판단하지 않고 False  

- or    : 연결된 모든 식 중 하나만 True이면 True
- :  연결된 모든 식이 False 일 때만 False
- : A or B에서 A가 True 일 때는 B를 판단하지 않고 True
- : A or B에서 A가 Falses 일 떄는 B의 결과를 따름.

![else](/assets/images/python/basic-syntax-1.jpg)

19번 줄 : return_false가 False 이기 때문에 and 뒤의 return_True 값에 상관없이 False 이기 때문에 and 뒤를 진행하지 않고 바로 else : 로 들어간다.

- 단락 평가 : 위 같이 필요 없는 연산을 하지 않는 것을 `단락 평가`를 지원한다.고 말함.
- 활용 구문 :

```py
if "Key1" in dictionary and dictionary["Key1"] == "Value 1" :
    print("Key1도 있고, 그 값은 Value1이다.")
#and를 기준으로 if 두 개를 중첩한 구문을 사용할 수 있지만  위와 같이 써도 효율적인 코드이다.
```

### 41 bool 값과 논리 연산

- bool 형식이 아닌 값이 논리 연산에서 어떻게 평가되는지 살펴본다.
- bool(0) # False
- bool(1) # True
- bool(-1) # True    ##0이 아닌 모든 숫자를 다 True
- bool([]) #빈 list는 모두 False
- bool([3]) #값을 가지는 list는 True
- bool(None) # Fales
- bool(' ') # False
- bool('hi') #True

```PY
if 'Hi' :
    print('이 문장은 출력 됨.')
```

- 활용 : value = input('입력해 주세요>') or '아무것도 못 받았어'

```txt
#입력된 값이 있기만 하면 그 문자열은 True로 인식되어 or 뒤의 연산을 진행하지 않는다.
#만약 input 구문에서 바로 enter만 입력한다면 빈 문자열이 되므로 or 뒤의 연산을 진행한다.
#이 경우 value = '아무것도 못 받았어'로 저장된다.
```

## PART14 리스트 더 알아보기

## 42 리스트의 다양한 기능

- list1 = [135,467, 27, 2753, 234]
- list1.index(27) # 2(출력)     #.index()는 실행인자로 받은 값이 리스트의 몇 번째에 있는지 조사함.
- list1.index(50) # ValueError

```py
if 50 in list1 :
list1.index(50) #if문으로 50이 list1에 없는 경우를 걸러내므로 오류가 발생하지 않음.
```

- list2 = [1,2,3] + [4,5,6]
- list3 = [1,2,3]
- list3.extend([9,10,11])
- list.append(16) #append() takes exactly one argument
- list3.insert(2, 999) #index 2 자리에 999를 집어 넣는다
- list3.insert(-1, 100) #가장 마지막 자리에 100을 넣는다. [1,2,3] 이었으면 [1,2,100,3]으로 변함.
- **index -1은 index 2를 의미하므로 list3[2] = 100이 되고 3은 list3[3]이 되는게 맞다.**
- 그냥 list3[1000]하면 index를 벗어나므로 IndexError가 발생.
- 근데 list3.insert(1000,555)를 하면 list3의 가장 뒤에 붙음. [1,2,3]이었으면 [1,2,3,555]가 됨.
- list3.sort() # 오름차순 정렬
- list3.reverse() #내림차순 정렬

### 43 리스트와 문자열
- list1 = [ 1,2,3,4,5,6]
- list1[0] # 1
- list1[1]# 2
- str1= "Hello World"
- st1[0] = 'H'
- str1[1] = 'e'
- str1.index("r") # 8
- characters = list("abcdef") # characters = ['a',b','c','d','e','f']
- words = "우리는 하나다"
- words_list = words.split() # ['우리는','하나다']
- time_str = "10:12:23"
- time_list = time_str.split(":") # ['10','12','23']
- ":".join(time_list)  # "10:12:23"    #2 " "로 한다면 "10 12 23", ""로한다면 "101223"
- #"".join에서 ""안의 값을 기준으로 붙이고  .split("")의 ""안의 값 기준으로 나눈다.

### 44슬라이스

- list = ['영','일','이','삼','사','오']
- list[1:3] # ['일','이']
- list[0:2] # ['영','일']
- list[2:len(list)] #['이','삼','사','오']
- list[0:2] # ['영','일']    #2 list[:2]와 같음.
- list[2:] #['이','삼','사','오']
- list[:] # list와 출력값이 같음. #2 전체를 모두 출력
- list와 list[:]은 같은 값이 나오지만 원래 있던 리스트를 넘겨주는 것이 아니다. 똑같은값을가지는 새로운리스트를 만들어 넘겨주는 것이다. 즉, 리스트가 복사된 것이다.

### 45 듬성듬성한 슬라이스

- list1 = list(range(20)) # [0,1,2,~~,19,20]
- list1[5:15:2] # 세번째 자리에 오는 숫자(2)를 step이라고 부른다. 5부터 14까지 2칸씩 건너 뛴다.
- list1[5:15:3] # [5,8,11,14]
- #step을 지정하지 않는다면 1로 지정한 것과 같은 결과

### 46 슬라이스로 리스트 수정
- numbers = list(range(10))
- del numbers[0] # [1,2,~8,9]
- del numbers[:5] #[6,7,8,9]
- numbers[1:3] = [77,88] # [6,77,88,9]
- numbers[1:3] = [77,88,99] # [6,77,88,99,9]  #2 리스트에 들어 있는 값의 갯수를 맞출필요없음
- number2[1:4] = [8] # [6,8,9]

## PART15 클래스와 객체 지향 프로그래밍

### 47 자료형 다루기
- type(42) #<class 'int'>
- type(42.0) #<class 'float'>
- 42 == 42.0  # True! #2자료형은 다르지만 값을 같으므로 True 출력.
- isinstance() # 수가 정수인지 실수인지를 판단해주는 함수
- isinstance(42, int) # True
- isinstance(42.0, int) # False

### 48 인스턴스(instance)

- 클래스, 인스턴스에 대한 설명을 아래에 적음.
- numbers1 = []
- type(nubmers) # <class 'list'>
- character = list("Hello") 와 Character = list(range(10))  모두 list 형임.
- type()로 출력되는 <class 'list'> 따위를 클래스라고 부름. list는 클래스의 한 종류
- nubmerbers1 = [] 한 다음에 numbers == list 를 하면 False가 나옴.
- #동등 연산자 (==)로 검사해 보면 물론 같지 않다 (False)라고 나옵니다. numbers1이 리스트는 맞지만(isinstance), 그렇다고 완전히 같은 것(==)은 아니라는 말이다. 앞 문장에서 말한 'numbers1은 리스트이다.'라는 말을 엄밀히 적으면 'numbers1은 리스트(list) 클래스의 인스턴스 가운데 하나다.'라는 뜻.

- 48장에서의 코드에 대해서, nubmers1이 리스트의 한 인스턴스이고, character와 Character도 각각 다른 리스트의 인스턴스임. class의 한 종류가 list이고, list에 해당하는 각각을 인스턴스라고 이해하자.
- list1 = []
- list2 = list1
- list3 = []
- list1과 list2가 가리키는 인스턴스는 같음. list3가 가리키는 인스턴스는 다른 인스턴스.
- list1.append(2)
- list2.append(1)
- list3.append(3)
- print(list1) # [2,1]
- print(list2) # [2,1]
- print(list3) # [3]       으로 같은 인스턴스인지 다른 인스턴스인지를 확인할 수 있다.

### 49 클래스

```py
class Human() : 
#'''사람''' # 클래스를 만드는 간단한 방법.
person1 = Human() #Human 클래스의 인스턴스를 하나 생성한다.
person2 = Human() # Human 클래스의 또 다른 인스턴스를 하나 생성한다.
```

- list 클래스에는 append(), extend(), insert(), pop()과 같은 기능들이 이미 구현되어 있는 상태.
- dict 클래스는 특정한 키(key)에 원하는 값을 저장할 수는 있지만 순서를 저장할 수는 없다.
- Human 클래스의 기능을 설명할 때 이 책에서는 '특징'와 '행동'이라고 설명하고 있다.
- 일단은 특징을 설명하고, 행동을 다음에 설명하겠다. 
- 먼저 간략하게 말해도면 행도은 class안에 함수를 넣는 것이고, 특징은 class에 속하는 값을 만드는 것.

```py
person1 = Human()
person2 = Human()
person1.language = '한국어'   
person2.language = 'English'   
#class Human() : 아래에 따로 코드를 적은 것은 없지만 ,이렇게 하면 person2.language 자체가 Human 클래스 안에 있는 하나의 값으로 저장이 된다. math module의 pi를 생각해보자.
person1.name = '서울시민'
person2.name = '인도인' #'특징'은 얼마든지 만들 수 있다.
```

-클래스와 인스턴스를 사용하는 이유 : 꼭 사용할 필요하지는 않은 인위적인 도구이다. 클래스를 쓴다고 해서 이전에 풀 수 없었던 문제를 풀 수 있는 것은 아니다. 그럼에도 불구하고 클래스와 인스턴스를 이용하면 데이터와 코드를 사람들이 더 쉽게 이해할 수 있도록 포장할 수 있다. 이해하기 쉽게 만들어줌!
-language 나 name과 같은 '값' 뿐만 아니라 '행동'(함수)를 클래스 안에 담아둘 수도 있다.

```py
def speak(person) :
    print("{}이 {}로 말을 합니다.".format(person.name, person.language)

speak(person1)
speak(person2 ) 이렇게만 쓸 수도 있지만 이렇게만 하면 클래스 안에는 아무것도 들어있지 않다.
Human.speak = speak   #이와  같이 한 줄을 적어주면 Human 클래스 안에 speak 함수가 속함.
#물론 Human.speak 보다 speak라고 적는 것이 코드를 작성할 때는 짧지만 전자가 더 이해하기 쉽
person1.speak()
person2.speak() #Human class 안에 speak()가 들어가서 이와 같은 형태로 구현할 수 있음
#person1이라는 Human 클래스 안에 속해 있는 speak 함수를 호출하는 것이다.
#Human 클래스의 인스턴스를 person1으로 정해놓고 함수 이름을 speak로 하고
#speak 안에 print를 구현해 놓으면 person1이 print문을 speak한다고 이해할 수 있다.
#speak(person1)는 speak가 중심일 때 person1을 argument로 주는 것이다.
#person1.speak()는 person1을 중심으로 말하는 것이다.
#class에 대한 추가설명은 51강에 있으니까 이 부분을 읽고 있다면 51강까지는 꼭 읽자
```

### 50 모델링

```py

class Human() :
'''인간'''
    person = Human()    
    person.name = '철수'
    person.weight = 60.5   #이 것을 매번 반복하는 것이 귀찮다.
```

```py
class Human () :

    def creat_human(name, weight) :
        person = Human ()
        person .name = name
        person.weight = weight
        return person
        Human.creat = creat_human #Human 클래스의 creat 함수로 creat_human 함수를 지정
        person = Human.create("철수", 60.5) # Human.create의 retrun 값이 인스턴스

    def eat(person) :
        person.weight += 0.1
        print("{}가 먹어서 {}kg이 되었습니다.".format(person.name, person.weight))

    def walk (person) :
        person.weight -= 0.1
        print("{}가 걸어서 {}kg이 되었습니다.".format(person.name, person.weight))

Human.eat =eat         #Human class에 넣기
Human.walk = walk

person.walk()     #실제 사람(인스턴스)에 적용하기.
person.eat()
person.walk()  #이렇게 코드로 현실의 개념을 표현하는 것을 '모델링'이라고 한다.
```

### 51메서드

- 메서드: 클래스에 포함된 함수를 가리키는 다른 이름일 뿐임.
- 지금까지는 빈 클래스와 함수를 따로 만들고, 다시 함수를 클래스에 넣는 방식을 사용
- def로 정의한  함수 내용을 indent만 해주면 class 안에 들어감.

```py
class Human () :
    def creat_human(name, weight) :
    person = Human ()
    person =name = name
    person.weight = weight
    return person
```

- 이와 같이 쓰면 person = Human() 한 다음에 Human.create = creat_human(a,b)하지 않다도 됨. 코드만 봐도 Human 클래스가 가진 메서드가 무엇인지 더 잘 드러난다. 뿐만 아니라 함수를 만들었다가 따로 클래스에 대입해 넣는 번거로운 작업을 하지 않아도 된다. 하지만 이는 기능은 완벽하지만 아직 관습에 맞지 않는 부분이 있음
- **메서드에 대한 특별한 규칙 중에 '메서드를 호출할 때 첫 번쨰 인자를 생략하면 인스턴스 자신으로 채워준다.'라는 규칙이 있다. 파이썬에서는 자기 자신을 자동으로 넘겨주는 매개변수라는 뜻으로 self 매개변수를 사용한다.** 단, 인스턴스에서 호출하지 않고 Human 클래스에서 바로 호출하는 create()함수는 예외로 둔다. # person = Human.create(a,b)형태로 Human.create 적는 것은 self 안씀

![else](/assets/images/python/basic-syntax-2.jpg)
eat 함수와 walkf 함수의 모든 person 을 self로 바꾼 모습  

- eat 함수를 class 밖으로 빼고 eat(person)으로 실행하면 같은 결과가 나옴.
- 단, eat()와 같이 실행인자를 적어주지 않으면 self parameter에는 들어갈 것이 없어서 오류남.
- eat을 class 안에 넣고 person.eat()을 한다면 자동으로 첫 번째 인자에 person을 넣어서 오류가 안남.
- 매개변수가 여러 개인 경우

```py
class Human():
    (코드줄임)
    def speak(self, message) :
        print(message)

person.speak("안녕하세요.")
```