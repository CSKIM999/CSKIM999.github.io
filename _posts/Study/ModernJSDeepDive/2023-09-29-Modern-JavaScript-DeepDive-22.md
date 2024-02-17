---
layout: post
title: Modern Javascript Deepdive [ Chapter 22 this ]
date: 2023-09-29 17:33 +0900
description: JavaScript Study
category: [Study, Modern Javascript Deepdive]
tags: Modern-Javascript-Deepdive
image:
  path: /assets/img/mjsdd.png
---

![DesktopView](/assets/img/mjsdd.png){:width='320'}

# Modern JavaScript Deep Dive

## Chapter _ 22 this

## this 란 무엇일까?
라이브러리들의 소스코드를 보거나 조금 **잘한다** 싶은 개발자의 코드를 들여다보다 보면 심심찮게 보이는 키워드가 있다.
오늘의 주제 `this` 다.

나는 `this` 를 잘 사용하지 못하다보니 다른 사람들은 어떻게 사용하고 왜 사용하는지 관심이 많은 편이다.
관심이 많이 가는 이유는 다른 이유보다도 **좀 있어보이기** 때문이기도 하다. 지적 허영심에 가깝지 않을까 싶다.

## this는 왜 필요할까?
앞선 [Chapter 19 - 프로토타입](https://cskim999.github.io/posts/Modern-JavaScript-DeepDive-19/) 에서 Javascript는 프로토타입 기반 언어라고 소개했었다.  
클래스 기반 프로그래밍 언어 Java, C++ 과는 기반이 다를 뿐 객체지향 프로그래밍 언어인 점은 같다.  

객체지향 프로그래밍에서 객체는 상태를 나타내는 프로퍼티와 동작을 나타내는 메서드를 묶어 낸 자료구조다.  
여기서 한번 생각해보자.  
객체의 메서드는 자신이 속한 객체의 프로퍼티를 참조 및 수정할 수 있어야 하는게 정상 아닐까?  
오히려 다른 객체의 프로퍼티 참조하거나 수정할 순 있어도 자신이 속한 프로퍼티(이하 '형제 프로퍼티')의 참조 및 수정이 불가능하다면 앞뒤가 안맞아 보인다.

그렇다면 객체가 자신이 속한 객체를 가리킬 수 있는 포인터 키워드가 있어야 형제 프로퍼티에도 접근할 수 있을 것이다.


## 객체 리터럴 방식
```js
const circle = {
  radius: 5,

  getDiameter() {
    return 2 * circle.radius;
  }
};

console.log(circle.getDiameter()); // 10
```
객체 리터럴 방식에서는 객체 안에서 다시 자신이 속한 객체를 가리키는 재귀방식으로 형제 프로퍼티를 참조할 수 있다.

`circle` 이라는 객체에는 이미 **radius라는 형제 프로퍼티**를 가진 객체 리터럴이 할당되었고, `getDiameter` 가 실행되는 시점에는 이미 평가되어 radius라는 프로퍼티를 가진 객체로 포인팅 되기 때문이다.

위 내용을 조금이나마 풀어서 얘기하자면, `getDiameter` 가 실행되는 순간은 circle에 이미 radius가 할당 된 이후이기 때문에 재귀를 통한 참조가 가능하다는 뜻 정도가 된다.

하지만 이러한 재귀참조방식은 바람직하지 않다고 한다.  
: **왜 바람직하지 않을까?**🧐  
이러한 재귀호출 방식은 프로퍼티와 메서드 간 결합도를 강화하여 객체 재사용성을 저해한다고 한다. 이 경우엔 매우 작고 간단한 객체지만, 만약 그 규모가 더욱 커진다면 더욱 수정하기 어려워질 것이다.  
예를 들어 객체의 이름만 바꾸어도 연쇄적으로 `getDiameter` 메서드의 코드까지 수정해줘야하는 것이다.  
( 사실 이건 요즘 IDE 의 성능이 기가막혀서 다 바꿔주긴 하지만 아무튼 그렇다 )

## 생성자 함수 방식
```js
function Circle(radius) {
  ????.radius = radius;
}

Circle.prototype.getDiameter = function () {
  return 2 * ????.radius;
};

const circle = new Circle(5);
```
객체 리터럴방식에서 발견한 자기 참조 문제를 조금 더 명확하게 확인할 수 있는 생성자함수 예제이다.

생성자 함수로 구성된 점만 빼놓고 보자면 앞선 객체리터럴 방식과 구성 자체는 완전히 동일한 코드이다.  
이 예제 코드에서 자기참조 변수의 자리에 들어가야 할 내용이 무엇일까?

이 경우엔 생성자 함수 코드 내부에서 '자신'을 참조하지만, 생성자 함수로 만든 인스턴스가 생성되기 전까지는 '자신'을 알 수가 없다. 따라서 무언가 '자신' 을 참조할 수 있는 변수가 필요하다.

## this
이러한 자기 참조 변수의 필요성에 의해 만들어진 개념이 바로 '객체 내부의 메서드(함수)에서 자기자신을 참조할 수 있는 변수' this이다.  
this는 자신이 속한 객체가 될 수도 있고, 생성자 함수가 생성한 인스턴스가 될 수도 있다. 자기 참조 변수가 필요한 다양한 방식의 함수가 있는 만큼, this가 가리키는 대상 또한 다양하다.  

여기서 this가 가리키는 대상은 함수(메서드) 호출 방식에 의해 동적으로 결정(바인딩)된다.


## 함수 호출 방식과 this 바인딩
동적으로 결정되는 this의 종류는 대략 4가지 정도이다.
1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply / call / bind 메서드에 의한 간접호출

물론 이 외에도 몇가지 추가 사항이 있지만 크게는 위 4가지 방법에 의해서 포괄된다.
- Arrow Function 호출
- 전역 컨텍스트 호출
- 클래스에서의 this
- 이벤트 핸들러 내부에서의 this
이 네가지 방법에 대해서는 나중에 **[잔뿌리 호기심](https://cskim999.github.io/categories/pettycuriosity/)**에서 알아보도록 하겠다.

### 일반 함수 호출
일반 함수에서 this를 호출하면 전역객체 (window) 가 바인딩된다.

일반 함수의 여부를 확인하는 것은 함수의 위치가 아닌 호출되는 방식에 있다.   
뒤이어 나올 메서드 호출의 경우엔 **메서드를 호출한 객체**에 바인딩된다.  
하지만 만약 **메서드의 콜백함수로 호출되더라도 일반함수로서 호출**된다면 **this는 전역객체**에 바인딩된다.  
이  뿐만 아니라 메서드 내부에 **중첩함수를 일반함수로서 구현**한다면 마찬가지로 **전역객체가 바인딩** 된다.  

하지만 일반함수에서의 this는 사용하지 않는것이 좋다.  
메서드에서의 this와 메서드 내부의 일반함수에서의 this가 일치하지 않는 점은 혼란을 야기하기에 너무나도 좋은 환경이다.

### 메서드 호출
메서드로서 this를 호출하면, 메서드를 호출한 객체가 바인딩 된다.
`Foo.boo()` 라는 식이 있다면, boo 라는 메서드를 호출한 객체 Foo 가 this에 바인딩된다는 의미이다.

이는 객체 지향 언어의 특징 중 하나인 다형성과 관계가 깊다.  
boo 라는 메서드는 Foo 라는 객체 내부에 포함되는 존재가 아닌, **개별적으로 존재하는 별도의 함수 객체**이다.   
단지 Foo 라는 객체의 boo 라는 메서드는 해당 로직이 구현되어있는 **개별적으로 존재하는 함수 객체**를 가리키는 포인터가 존재할 뿐이다.  
그렇기 때문에 해당 메서드를 다른 객체에 할당하더라도 boo 라는 메서드 자체는 변하지 않으나, 가리키는 this는 변하는 것이다.  

메서드 호출에서의 중요한 점은 **'this 바인딩 객체는 메서드를 호출하는 시점에 결정된다.'** 라는 점이다.  


### 생성자 함수 호출
생성자 함수 내부에서 호출되는 this는 미래에 **생성자 함수가 생성할 인스턴스**가 바인딩된다.  

생성자 함수의 경우엔 매우 명확하고 간단한 조건이어서 예시코드를 한번 확인해보는것이 더욱 도움이 될 것 같다.
```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```
위 예시를 통해 각각의 인스턴스가 가지는 `this.radius` 값이 다르다는것을 확인해 볼 수 있다.

### Function.prototype.apply / call / bind 에 의한 간접호출
apply, call, bind 모두 Function.prototype 의 메서드이기 때문에 함수라면 모두 상속받아 사용할 수 있다.

>**저는 apply 와 call 메서드를 사용해 본 적이 없는데 언제 사용하는 건가요?**  
>apply 와 call 메서드는 거의 모든 부분이 유사하고, 인수의 전달 방식만 다르다.  
>두 메서드의 공통점은 모두 가장 중요한 역할은 this를 바인딩 하고 다른 객체의 메서드를 빌려와서 사용하는 것이지만, 배열 형태의 인자를 전달할 때에도 유용하게 쓰였다.  
>대표적인 예시로 `Math.max()` 함수의 경우 배열을 인자로 전달하면 반환값은 NaN인 반면,  
>`Math.max.apply(null, [1,2,3,4])` 와 같이 전달하면 최댓값을 정상적으로 반환한다.  
>반대로 두 메서드의 차이점은 인수의 전달방식이 다르다는 점이다.   
>apply의 경우 인수를 배열로, call 의 경우 개별적으로 나열하여 받는다.  
{: .prompt-info}

여기서 다른 객체의 메서드를 빌려와서 사용하는 것 또한 원시타입 뿐만 아니라 다른 메서드도 가능하다.
```js
const dog = {
  sound: 'Woof',
  speak: function() {
    console.log(this.sound);
  }
}

const cat = {
  sound: 'Meow'
}

// dog의 speak 메서드를 cat에 빌려와서 사용
dog.speak.call(cat);  // 출력: Meow
```

그러나 `Math.max.apply(null, [1,2,3,4])` 와 같은 사용법은 spread operator 의 등장으로 사라졌다고 봐도 무방하다.

마지막으로 bind() 메서드는 this를 바인딩할 새로운 함수를 '생성' 하여 반환한다.
앞선 call 과 apply 의 경우 함수를 즉시 호출했지만, bind는 새로운 함수를 생성하여 반환하기에 호출하지 않는다는 차이점이 있다.
```js
const obj = {
  value: 'Hello, World!'
};

function printValue() {
  console.log(this.value);
}

// `this`가 obj를 참조하도록 printValue 함수를 바인딩
const boundPrintValue = printValue.bind(obj);

// 이제 boundPrintValue를 호출하면, obj.value가 출력됨
boundPrintValue(); // 출력: Hello, World!
```
bind()를 통해 생성된 함수는 this값이 영구적으로 바인딩되어 원본 함수와는 별개의 함수로 취급된다.
이후 함수를 호출한다면 this는 항상 bind() 메서드를 호출할 때 바인딩 된 객체를 가리킨다.

## 결론
- 객체의 메서드에게는 형제 프로퍼티를 참조할 수 있는 포인터가 필요하다.
- `this`는 자바스크립트의 자기 참조 변수로, 함수의 호출 방식에 따라 그 대상이 동적으로 결정된다.
- 객체 리터럴, 생성자 함수, 메서드 호출, 그리고 `Function.prototype.apply/call/bind` 메서드를 통한 간접 호출에서 사용되며, 호출 컨텍스트에 의해 `this`의 바인딩 대상이 결정된다.
