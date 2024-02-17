---
layout: post
title: Modern Javascript Deepdive [ Chapter 21 빌트인 객체 ]
date: 2023-09-23 11:32 +0900
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

## Chapter  _  21 빌트인 객체
## 자바스크립트 객체의 분류
자바스크립트 객체는 총 세가지로 분류됩니다.
- 표준 빌트인 객체
	- ECMAScript 사양에 정의된 객체들을 지칭합니다.
	- 빌트인 객체는 전역객체의 프로퍼티로서 제공되기 때문에, 별도의 선언 없이 전역변수처럼 사용이 가능합니다.
	- 여기엔 흔히 우리가 접하는 대다수의 객체들이 존재합니다.
	- Object, Array, String, Number, Boolean ...
	- Math, Reflect, JSON 을 제외한 표준 빌트인 객체들은 모두 생성자 함수 객체입니다.
	- 생성자 함수 객체는 프로토타입 메서드와 정적 메서드를 제공하고, 그렇지 않은 세 메서드는 정적 메서드만을 제공합니다.
	- 흔히 생성자 함수로 new Object 와 같이 사용할 수 있는 이유, new Math 로 사용하지 않는 이유가 바로 이때문입니다.
- 호스트 객체
	- ECMAScript 사양에 정의되어 있지 않으나, JS 실행환경에서 추가로 제공하는 객체를 말합니다.
	- 예를 들어 브라우저에서의 DOM, Canvas, XMLHttpRequest, fetch 와 같이 클라이언트 사이드 Web API 를 호스트 객체로 제공합니다.
- 사용자 정의 객체
	- 앞선 두 객체와 다르게 사용자가 직접 정의한 객체를 의미합니다.

## 표준 빌트인 객체
### 프로토타입의 바인딩
앞서 표준 빌트인 객체에 대해 정리하며 생성자 함수 객체는 프로토타입 메서드를 제공한다는 것을 알 수 있었습니다.   
따라서 String 객체를 생성자함수로 호출하여 생성한 String 인스턴스의 prototype 은 String.prototype 에 바인딩 되어있습니다.  
그렇기에 String 인스턴스에서도 표준 빌트인 객체 String의 프로토타입 메서드들을 사용할 수 있는 것입니다.  

```jsx
const strObj = new String('LEE') // String {"LEE"}

console.log(Object.getPrototypeOf(strObj) === String.prototype) // true
```

### 원시값의 프로토타입
`String`,`Number` ,`Boolean` 과 같이 `string`, `number`, `boolean` 으로 원시값이 존재하는데도 빌트인 생성자 함수가 존재하는 이유가 무엇일까요? 간단하게 원시값으로 생성하면 되는거 아닌가요?

```jsx
const str = 'hello' //string 원시타입 문자열 생성

console.log(str.length) // 프로퍼티 - 5
console.log(str.toUpperCase()) // 메서드 - HELLO
```

[챕터 11 의 원시값](https://cskim999.github.io/posts/Modern-JavaScript-DeepDive-11/)에서 정확히 짚고넘어가지 않은 부분이 있었습니다.  
이는 프로토타입과 관련된 내용이었기에 [챕터 19 프로토타입] 이후에 정리를 하려다가 놓친 부분이었습니다.  
챕터 11 에서 원시값은 객체가 아니라는 것을 알 수 있었습니다. 이는 동시에 프로토타입 기반 언어인 JavaScript에서는 메서드나 프로퍼티를 직접 가질 수 없다는것을 의미합니다.

즉 원래대로라면 위의 예시코드는 작동하지 않아야 할 것입니다. 아무런 프로퍼티나 메서드를 가지고있지 않은 원시타입 `string`이 `String` 타입의 프로퍼티 `length` 와 `toUpperCase` 를 사용하고있기 때문입니다.

하지만 우리는 이미 너무나도 편리하게 위와같이 코드를 작성하고 있습니다. 그 이유는 암묵적으로 해당 객체를 생성하고 그 객체의 프로토타입을 가져다 사용하기 때문입니다.

### 암묵적 변환
이러한 원시타입에 대해 암묵적으로 변환해주는 임시 객체를 래퍼객체라고 합니다.  
JavaScript 엔진은 원시값에 대해 예시와 같이 메서드나 프로퍼티를 사용하려고 하는 경우 임시적으로 연관된 객체를 생성하고 생성된 객체로 프로퍼티나 메서드를 호출한 후 원시값으로 되돌려줍니다.

위의 예시를 조금 더 구체적으로 분석한다면 다음과 같습니다.

```jsx
const str = 'hello' //string 원시타입 문자열 생성

// 여기서 원시타입의 프로퍼티에 접근하는것을 확인하고 
// 원시타입의 연관 객체인 String 생성자의 인스턴스로 변환된다
console.log(str.length) // String 객체의 프로퍼티 - 5
console.log(str.toUpperCase()) // String 객체의 메서드 - HELLO

// 모든 메서드와 프로퍼티가 호출되고 난 여기서 str은 원시타입 string으로 재변환된다.
console.log(typeof str) // 원시타입 - string

//여기서 앞서 생성된 String 래퍼객체는 더이상 참조되지 않으므로 GC의 대상이 됩니다.
```

프로퍼티와 메서드를 사용하기 위해 생성된 래퍼객체는 모든 쓸모를 다하고 더이상 참조되지 않아 GC의 대상이 됩니다. 이와 같이 GC의 측면에서 새로운 예시코드를 보겠습니다.

```jsx
const str = 'hello' // str은 원시타입 문자열이다

// 여기서 마침표 표기법으로 인해 식별자 str 은 새로 생성된 래퍼객체를 가리킨다.
// 래퍼 객체에 name 이라는 이름의 프로퍼티가 추가된다.
str.name = 'Lee'

// 여기서 string 타입으로 재변환되며 앞서 생성된 래퍼객체는 더이상 참조되지 않으므로 GC의 대상이 된다.
// 따라서 name 의 값 또한 사라지게 된다.
console.log(str.name) // undefined
```

조금 더 명확히 하자면, 원시타입 문자열은 `String` 타입 래퍼 객체의 [[NameData]] 내부슬롯에 할당 되었다가, 래퍼객체의 처리가 완료되면 내부슬롯을 초기화하여 GC의 대상이 되는 것 입니다.


## 전역 객체
### 전역객체의 특징
전역객체는 코드가 실행되기 이전에 JavaScript 엔진에 의해 최우선적으로 생성되는 특수한 객체로서 최상위 객체로 어떤 객체에도 속하지 않은 객체입니다.  
그러나 전역객체는 환경에 따라 부르는 이름이 제각각입니다. 브라우저 환경에서는 window(self, this, frames) 이지만 Node.js 환경에서는 global이 전역객체를 가리킵니다.  
여기서 전역객체가 가지는 특징은 다음과 같습니다.  
- 전역객체는 개발자가 의도적으로 생성할 수 없습니다
- 전역객체의 프로퍼티를 참조할때 window 를 생략 가능하다
- 전역객체는 표준 빌트인 객체를 프로퍼티로 가지고 있다
- 실행환경에 따른 프로퍼티와 메서드를 갖는다.
	- 브라우저 : DOM, fetch, XMLHttpRequest
	- Node.js : 고유 API
- var 키워드로 선언한 변수와 암묵적 전역 변수 그리고 전역함수를 프로퍼티로 갖는다
- let, const 키워드로 선언된 전역변수는 전역객체의 프로퍼티가 아닌 해당 렉시컬스코프 내에 존재하게 된다
- 브라우저에서의 모든 코드는 하나의 전역객체를 공유한다.

### 빌트인 전역함수
빌트인 전역함수는 애플리케이션 전역에서 호출할 수 있는 빌트인 함수를 말하며, 전역객체의 메서드입니다.

eval  
: eval함수는 문자열을 인수로 받아 런타임에서 문자열 코드를 실행합니다.
여기서 eval 함수의 특징은 자신이 호출된 위치에 해당하는 기존의 스코프를 런타임에 동적으로 수정한다는 점입니다.

```jsx
const x = 1;

function foo() {
	eval('var x = 2;')
	console.log(x) // 2
}

foo()
console.log(x) // 2
```

기존의 함수스코프는 해당 함수가 정의될 때 결정됩니다. 하지만, 위의 예시코드에서는 foo라는 함수가 실행될 때 x라는 변수가 var 키워드로 선언되고 2라는 값이 재할당되며 마지막 로그에서는 1 이 아닌 2가 출력됩니다.

즉, eval에 전달된 코드는 원래 그 자리에 위치했던 것 처럼 동작하게 됩니다.

하지만 `strict mode` 에서의 eval 함수는 기존의 스코프를 수정하지 않고, eval 함수 자체 스코프를 생성하여 사용합니다.

```jsx
const x = 1;

function foo() {
	'use strict'
eval('var x = 2; console.log(x);') // 2
console.log(x); // 1
}
foo()
console.log(x) // 1
```
위 예시코드에서 볼 수 있듯이, 만약 strict 모드를 사용한다면 eval 함수 안에 새로운 스코프가 생성되어 해당 스코프의 바깥쪽에 위치한 x 변수에는 변화가 발생하지 않습니다.

또한 만약 eval 함수가 const, let 키워드를 사용하는 변수 선언문이라면 암묵적으로 `strict mode` 가 적용됩니다.

이렇게 string값을 받아 그대로 런타임에서 스코프를 수정할 수 있다는 점이 매력적인 eval 함수이지만, 보안적인 측면에서 크나큰 취약점을 드러내기때문에 최근에는 거의 사용되지 않는 함수입니다.

isFinite
: 전달받은 인수가 유한수인지 검사하여 boolean 값을 반환하는 함수입니다.

isNaN
: 전달받은 인수가 NaN인지 검사하여 boolean 값을 반환하는 함수입니다.

parseFloat
: 전달받은 문자열 인수를 부동소수점 숫자(실수) 로 해석하고 반환하는 함수힙니다.

encodeURI / decodeURI
: encodeURI 함수는 완전한 URI 를 문자열로 받아 이스케이프 처리를 위한 인코딩 후 반환한다.  
decodeURI 는 인코딩된 URI 를 인수로 받아 이스케이프처리 이전으로 디코딩한다.

이스케이프 처리
: 웹에서 사용할 수 없거나 해석이 어려운 문자를 안전하게 전송할 수 있도록 ASCII 문자열로 변환하는 과정.  
예를 들어 '?','&' 와 같은 문자는 쿼리스트링을 구성할 때 사용되므로 이를 일반문자열로 사용하기 위해 ASCII 문자열로 변경해야하며, 공백과 같은 문자또한 의도와 다르게 작동할 수 있으므로 **%20** 라는 문자열로 변환되어 반환됩니다.

### 암묵적 전역
JavaScript를 편리하게 하고 동시에 난해하게 해주는 키워드 **암묵** 입니다.
```jsx
var x = 10;
function foo() {
	y = 20; // ???
}
foo()
console.log(x+y) // 30 ??? 
```
위 예시코드에서 함수 foo 는 선언되지 않은 변수 y 에 20을 할당하려 합니다.  
상식적으로는 에러를 출력해야하는데 실행해보면 마지막 로그에서 30을 출력합니다. 마치 y 라는 값이 전역변수로 선언되어있던 것 처럼 말이죠.

이와 같이 JavaScript 엔진은 변수를 할당하고자 할 때 스코프체인을 통해 변수의 선언을 찾고자 하나, 찾을 수 없을 때 우선 전역객체의 프로퍼티로 추가합니다.  
이렇게 추가된 전역변수 프로퍼티 `window.y` 는 마치 전역변수로 선언된 듯이 동작하게 되어 이러한 현상을 **암묵적 전역**이라고 칭합니다.

여기서 명확히 할 부분은, y는 변수가 아닌 전역변수의 프로퍼티입니다. 따라서 변수호이스팅이 발생하지 않습니다.
```jsx
console.log(x) // 호이스팅으로 인해 undefined 반환
console.log(y) // 호이스팅이 발생하지 않아 ReferenceError : y is not defined 반환

var x = 10; // 전역변수
function foo() {
	y = 20; // 전역객체 window의 프로퍼티
}
foo()

console.log(x+y) // 호이스팅과 별개로 전역변수처럼 참조는 가능하여 30 반환
```
