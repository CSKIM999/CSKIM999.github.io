---
layout: post
title: Modern Javascript Deepdive [ Chapter 17 생성자 함수에 의한 객체 생성 ]
date: 2023-08-20 12:36 +0900
description: JavaScript Study
category: [Study, Modern Javascript Deepdive]
tags: Modern-Javascript-Deepdive
image:
  path: /assets/img/mjsdd.png
---

![DesktopView](/assets/img/mjsdd.png){:width='320'}

> 이 게시물은 SW마에스트로 연수생 간 진행한 Modern JavaScript DeepDive 스터디 개인 정리 내용입니다.  
> 되도록 책의 내용을 그대로 적기보단 개인적으로 인상깊었던 부분을 구어체로 풀어쓰려 노력했습니다.
{: .prompt-tip}


# Modern JavaScript Deep Dive

## Chapter _ 17 생성자 함수에 의한 객체 생성

## 생성자 함수 사용의 이유와 장점

이번 챕터에서는 이미 객체 리터럴을 사용해서 객체를 생성할 수 있지만, 생성자 함수를 사용해서 객체를 생성하는 이유와 그 방식, 장단점을 알아보도록 하겠습니다.

사실 대다수의 경우에선 리터럴 생성에 비해 유용하진 않습니다. 생성자 함수를 사용하는게 유리한 경우는 **동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우**에 해당합니다.

만약 객체 리터럴로 생성 할 경우 매번 같은 프로퍼티를 기술해줘야 하므로 아주 비효율적입니다.

이 경우 생성자 함수를 사용한다면 클래스와 유사하게 동일 프로퍼티 구조를 갖는 객체를 여러개 생성할 수 있습니다.

```tsx
function Circle(radius) {
	this.radius = radius
	this.getDiameter = function () {
		return 2 * this.radius
	}
}

const circle1 = new Circle(5)
const circle2 = new Circle(10)

console.log(circle1.getDiameter()) // 10
console.log(circle2.getDiameter()) // 20
```

주의깊게 볼 부분은 정의한 함수가 new 연산자와 함께 호출했다는 이유로 생성자 함수로 동작한다는 점입니다.

## this

this 는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수로, this 가 가리키는 값은 함수 호출 방식에 따라 동적으로 결정됩니다.

- 일반 함수 호출 ⇒ 전역 객체
- 메서드로서 호출 ⇒ 메서드를 호출한 객체(마침표 앞의 객체)
- 생성자 함수로 호출 ⇒ 생성자 함수가 생성 할 인스턴스

```tsx
function foo() {
	console.log(this)
}
foo() // window -> 일반함수 호출
const obj = {foo}
obj.foo() // obj -> 메서드 호출
const init = new foo() // inst -> 생성자로 호출
```

## 생성자 함수의 인스턴스 생성 과정

생성자 함수에서 수행해야 하는것이 무엇일까요?

아마 탬플릿으로서 동작하여 인스턴스를 생성하고, 생성된 인스턴스를 초기화 하는 작업일 것입니다.

다음 예제 코드를 보겠습니다.

```tsx
function Circle(radius) {
	this.radius = radius
	this.getDiameter = function () {
		return 2 * this.radius
	}
}
const circle1 = new Circle(5);
```

현재 Circle 생성자 함수를 통해 새로운 인스턴스가 생성되었습니다.

하지만 Circle 함수에는 딱히 인스턴스를 생성하고 반환하는 코드는 보이지 않습니다.

사실 JS 엔진은 암묵적으로 인스턴스를 생성하고 반환합니다. 이는 new 연산자와 함께 생성자 함수를 호출하면 암묵적으로 인스턴스를 생성하고, 반환까지 해줍니다.

그 과정을 들여다 보겠습니다.

1. 인스턴스의 생성과 this 바인딩

생성자 함수 호출과 함께 암묵적으로 빈 객체가 생성됩니다. 이 객체가 인스턴스가 됩니다.

해당 인스턴스는 this와 바인딩 됩니다. 생성자 함수 내부의 this 는 생성할 인스턴스와 바인딩 되는 이유도 이것 때문입니다.

1. 인스턴스 초기화

생성자 함수에 기술되어 있는 코드가 한 줄씩 실행되며 this에 바인딩되어 있는 인스턴스를 초기화합니다.

1. 인스턴스 반환

인스턴스 초기화와 같은 모든 처리가 끝나면 인스턴스가 바인딩 된 this 를 암묵적으로 반환합니다.

여기서 만약 함수 내부에 명시적으로 반환되는 값이 있다면 해당 this값이 암묵적으로 반환되지 못하고 명시된 객체가 반환됩니다.

따라서 명시적으로 this 대신 다른 값을 반환하는 코드는 생성자 함수의 기본 동작을 훼손하기 때문에 지양해야 합니다.

## 내부 메서드 [[Call]] 과 [[Construct]]

함수는 객체이므로 일반 객체가 가지고 있는 모든 내부 슬롯과 내부 메서드를 가지고 있습니다.

하지만 아시다시피 함수 객체는 일반 객체와는 명확히 다른 점이 있습니다. 바로 호출 가능 여부입니다.

호출 가능 객체로서 함수들은 [[Environment]], [[FormalParameters]]이나 [[Call]] 과 같은 호출을 위한 메서드를 추가적으로 가지고 있습니다.

함수가 일반 함수로서 호출되면 내부 메서드 [[Call]] 가 호출되고 new 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 [[Construct]]가 호출됩니다.

여기서 [[Call]] 을 갖는 함수 객체를 callable 이라고 하며, [[Construct]]를 갖는 함수 객체를 constructor, 갖지 않는 객체를 non-constructor 라고 부릅니다. 호출할 수 없는 객체는 함수객체가 아니기 때문에 함수 객체는 항상 callable 이어야만 하지만, 항상 constructor 여야 하는건 아닙니다.

### constructor 와 non-constructor의 구분

두 객체는 함수 정의 방식에 따라서 구분됩니다.

- constructor : 함수 선언문, 함수 표현식, 클래스
- non-constructor : 메서드, **화살표 함수⭐️**

## new 연산자

일반 함수와 생성자 함수에 형식적으로 차이가 있는것은 아닙니다.

하지만 new 연산자를 붙인다면 생성자 함수로, 아니라면 일반 함수로서 동작합니다.

이는 호출하는 내부 메서드에 차이가 있기 때문이었습니다. 일반 함수라면 [[Call]] 메서드가, 생성자 함수라면 [[Construct]] 메서드가 호출됩니다. 이제는 당연한 말이지만, 생성자 함수로서 호출되는 함수는 constructor여야만 합니다.