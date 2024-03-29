---
layout: post
title: Modern Javascript Deepdive [ Chapter 12 함수 ]
date: 2023-08-08 00:43 +0900
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

## Chapter _ 12 함수

## 함수란?

함수는 자바스크립트에서 가장 중요한 핵심 기능입니다.

수학에서도 너무나도 당연하게 사용되는 개념으로 저도 처음 배울 때 그림 12-1 의 예에서도 볼 수 있듯이 어떤 박스(함) 에 무언가를 넣으면, 박스(함) 안에서 가공되어 새로운 값이 나오는 것을 함수 라고 부른다! 라고 배웠던 것이 기억이 납니다.

그 함수의 정의는 프로그래밍 언어에서의 함수도 크게 다르지 않습니다.

> **일련의 과정을 문으로 구현하고, 코드 블록으로 감싸서 하나의 실행단위로 정의한 것**
> 

을 우리는 함수 라고 부릅니다.

이 때 함수 내부로 입력을 전달받는 변수를 매개변수, 입력 그 자체를 인수, 출력을 반환값 이라고 부릅니다.

함수는 **함수 정의** 를 통해 생성됩니다.

또한 정의된 함수를 명시적으로 지시하여 실행하는 과정을 **함수 호출** 이라고 칭합니다.

```tsx
// 함수 정의
function add(x, y) {
	return x + y;
}

//함수 호출
var result = add(2,5)
console.log(result)
```

이런 단어 정의가 저도 참 헷갈리고 어렵지만 앞서서 잘 정리를 해 두어야 보통 뒤 이어 오는 개념들을 정확히 이해할 수 있더라구요.

## 함수의 사용 이유

인간이 무결하다면 가장 효율적인 방식은 아마도 절차적 프로그래밍이 아닐까 싶습니다. 하지만 인간은 실수를 하기 마련이고 그 실수를 최대한 줄일 수 있고, 예방하지 못하더라도 최대한 그 피해범위를 좁혀주는 것이 바로 프로그래밍에서의 함수 입니다.

명시된 장점으로는 **유지보수의 편의성, 코드의 신뢰성, 코드의 가독성**의 향상 정도가 있습니다.

## 함수 리터럴

타입스크립트에서도 그렇고 자바스크립트에서도 ‘리터럴’ 이라는 키워드가 정말 자주 등장하는 것 같습니다.

뜻 그 자체로는 “문자 그대로의”, “직역” 등으로 해석이 될텐데, 제가 생각하는 리터럴의 개념은 “수표” 가 아닐까 싶습니다.

10만원이 적힌 수표를 들고 은행에서 사용하면 10만원을 환전 해 주듯이, 함수가 적힌 수표를 사용하면 함수를, 문자열이 적힌 수표를 사용하면 문자열을 반환해준다고 이해하면 더 직관적이지 않을까 고민해봤습니다.

함수 리터럴은 function 키워드, 함수 이름, 매개변수 목록, 함수 몸체로 구성됩니다.

다음으로는 함수 리터럴의 방식입니다

```tsx
// f 변수에 add 함수 리터럴을 할당하고 있습니다
var f = function add(x,y) {
	return x + y;
}
```

### 함수는 객체다

리터럴은 앞서 나름 생각해 봤듯이 **수표** 에 가깝습니다. 즉, 리터럴은 값을 생성하기 위한 표기법입니다.

함수 리터럴 또한 다른 리터럴처럼 평가되어 값을 생성하며 이 값은 객체입니다. 즉, 함수는 객체 입니다. ( 사실 왜 이런 플로우로 증명이 된다는건진 모르겠습니다.

하지만 일반 객체와의 다른 점이라면 일반객체는 호출할 수 없지만, 함수는 호출할 수 있으며 함수 객체만의 고유 프로퍼티를 갖습니다.

## 함수 정의

자꾸 등장하는 선언문, 표현식, 생성자 함수 등의 내용을 명확히 정리하고 넘어가면 좋을 것 같습니다.

| 함수 정의 방식 | 예시 |
| --- | --- |
| 함수 선언문 | funtion add(x,y) {
    return x+ y
} |
| 함수 표현식 | var add = function(x,y) {
    return x+y;
} |
| Function 생성자 함수 | var add = new Function(”x”,”y”,”return x+y”); |
| 화살표 함수 | var add = (x,y) ⇒ x+y |

함수는 ‘선언’ 이 아닌 ‘정의’ 한다고 표현합니다. 이것은 함수 선언문이 평가될 때 식별자가 암묵적으로 생성되고 함수 객체에 할당되기 때문입니다.

ECMAScript 사양에서도 변수는 ‘선언’ 함수는 ‘정의’ 라고 표현한다고 합니다.

### 함수 선언문

함수 선언문은 언뜻 보았을 때 함수 리터럴과 상당히 유사해 보입니다.

하지만 그 둘의 차이점은 함수 이름의 생략 가능 여부로, 함수 리터럴은 함수 이름을 생략 가능하지만 함수 선언문은 함수 이름을 생략할 수 없습니다.

또한 함수 선언문은 표현식이 아닌 문 입니다. 표현식인 문이라면 실행 시 표현식이 평가 된 값이 출력되야하나, 실제로 확인해보면 그렇지 않은 것을 알 수 있습니다.

```tsx
function add(x,y) {
	return x+y
}
>> undefined
```

하지만 5장에서 저희는 표현식이 아닌 문은 변수에 할당할 수 없음을 알 수 있었습니다. 하지만 아래의 코드를 보면 어렵지 않게 볼 수 있는 코드지만 표현식이 아닌 문이 변수에 할당되는 듯 해 보입니다.

```tsx
var add =function add(x,y) { // add 는 표현식이 아닌 문이 아니던가요?
	return x+y
}

console.log(add(2,5))
```

이것을 우선 이해해보자면 앞서서 함수 리터럴과 함수 선언문의 차이는 함수 선언문만 함수 이름을 생략할 수 없다는 점 이었습니다. 반대로 자바스크립트 엔진이 코드의 문맥에 따라 작성된 내용을 함수 선언문이 아닌, 이름이 작성된 함수 리터럴 기명 함수 리터럴로 해석 할 수 있다는 뜻 입니다.

그렇다면 이렇게 유사한 두 기능이 마지막으로 존재했던 이름에 대한 차이점마저 같다면 어떤 차이점이 있을까요?

앞선 함수 리터럴에서 우리는 함수 이름은 함수 몸체 내에서만 참조할 수 있는 식별자라고 알 수 있었습니다. 하지만 우리는 앞선 예시처럼 선언문만 작성 된 코드를 많이 봤고, 함수 이름을 호출해서 사용하는 경우 또한 많이 봐 왔습니다.

```tsx
function add(x,y) {
	return x+y
}

console.log(add(2,5)) // add 는 함수 이름이지만 호출되었습니다.
//7
```

이렇게 동작하는 이유는 함수 선언문이 자바스크립트 엔진에 의해 암묵적으로 함수 이름과 동일한 식별자를 생성하여 그 식별자에 함수를 할당하기 때문입니다.

즉, 함수를 함수 이름으로서 호출하는 것이 아니라 암묵적으로 생성된 동일한 이름의 함수 객체를 가리키는 식별자로서 호출하는 것입니다.

### 함수 표현식

자바스크립트에서 함수는 객체타입의 값입니다.

객체는 값처럼 변수에 할당될 수 있고, 프로퍼티 값이 될 수도 있으며, 배열의 요소도 될 수 있습니다. 함수는 객체 타입이기에 앞선 객체 타입의 특징을 모두 공유합니다.

이렇게 값의 성질을 갖는 객체를 **일급 객체** 라고 합니다. 따라서 자바스크립트에서 함수는 **일급 객체** 입니다.

### 함수 생성 시점과 함수 호이스팅

```tsx
console.dir(add) // *f* add(x,y)
console.dir(sub) // undefined

console.log(add(2,5)) // 7
console.log(sub) // TypeError !!

function add(x,y) {
	return x+y
}

var sub = function (x,y) {
	return x-y
}
```

< 함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수는 생성시점이 다릅니다. >

모두 알고 있듯이, 런타임 이전에 자바스크립트 엔진이 먼저 실행되어 런타임을 위한 작업이 수행됩니다.

예시 코드에서도 볼 수 있듯이 함수의 선언은 호출 이후에 이뤄졌지만, 함수 선언문의 경우 정상적으로 실행되는 것과,

마찬가지로 함수 표현식의 식별자도 RefError 가 아닌 undefined 를 반환하는 것을 볼 수 있습니다.

이렇게 마치 코드 상단으로 끌어올려져서 먼저 선언되는 듯 하게 작동하는 것을 자바스크립트의 고유 특징 **호이스팅** 이라고 합니다.

예시에서 두 함수의 차이점이라면 함수 표현식과 함수 선언문이라는 점입니다.

함수 선언문은 암묵적으로 생성된 식별자에 함수 객체로서 초기화되지만 함수 표현식은 변수에 할당되는 함수 리터럴입니다.

따라서 함수 선언문은 함수 호이스팅이 발생하지만, 함수 표현식은 변수 호이스팅이 발생하게 되어 다른 출력을 내보내는 것 입니다.

## 함수 호출

함수는 함수를 가리키는 식별자와 소괄호 안에 담기는 함수호출 연산자로 호출하게 됩니다.

소괄호 안에는 0개 이상의 인수를 쉼표로 구분해서 나열하고, 함수를 호출 할 경우 현재의 실행 흐름을 일시적으로 중단하고 호출 함수로 실행 흐름을 옮깁니다.

저는 매개변수(parameter)와 인수(argument)를 자꾸 헷갈립니다.

인수의 갯수에서 발생할 수 있는 경우의 수는 세개입니다. 적게, 알맞게, 많게.

```tsx
// 여긴 매개변수 ( parameter )
function add(x,y) { 
	return x+y
}
// 여긴 인수 ( argument )
console.log(add(2,5)) // NaN
console.log(add(2,5)) // 7
console.log(add(2,5,7))// 7
```

1. 적게 넣는 경우

함수 내부에서는 두 변수를 우선 초기화 해 둔 상태이기 때문에 만약 인수의 갯수가 부족하다면 undefined + number 가 되어 NaN 이 반환됩니다.

1. 알맞게 넣는 경우는 생략하겠습니다.
2. 많이 넣는 경우

이 경우는 초과한 인수를 무시됩니다.

## 다양한 함수의 형태

### 즉시 실행 함수

```tsx
(function () {
	var a = 1
	var b = 2
	return a*b
}())
```

이러한 형식의 함수를 즉시 실행 함수라고 칭하고, 즉시 실행 함수는 단 한번 호출되어 실행되고 다시 호출할 수 없습니다.

즉시 실행함수에도 함수이름을 넣을 순 있지만, 함수 이름은 함수 몸체에서만 접근할 수 있기때문에 여전히 외부에선 다시 호출할 수 없습니다.

### 재귀 함수

자기 자신을 호출하는 것을 재귀 호출이라고 합니다. 따라서 재귀함수는 자기 자신을 호출하는 함수를 의미합니다.

함수 이름은 함수 몸체에서만 접근할 수 있기 때문에 재귀 함수에서 자신을 다시 호출할 때 식별자 말고도 함수 이름으로서 자신을 호출할 수 있습니다.

재귀 함수의 필수 요건으로는 무한한 재귀를 막기 위해 탈출 조건을 명시해야한다는 점 입니다.

### 중첩 함수

함수 내부에 정의된 함수를 중첩 함수 혹은 내부 함수라고 칭합니다. 그리고 그것을 감싸고 있는 함수를 외부함수라 칭합니다.

중첩 함수는 외부함수 내부에서만 호출이 가능하며 일반적으로는 외부함수를 돕는 역할을 수행합니다.

특이한 점은 함수 선언문의 경우 ES6 이전에는 최상위 혹은 다른 함수 내부에서만 정의할 수 있었지만, ES6 이후로는 for, if 문 등 코드블록에서도 정의할 수 있게 되었습니다.

### 콜백 함수

함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백함수라고 합니다.

또한 매개변수를 통해 콜백함수를 전달받는 함수를 고차 함수라고 칭합니다.

고차함수는 전달받은 콜백함수의 호출시점을 결정해서 필요에 따라 인수를 전달하고 호출할 수 있습니다.

### 순수 함수와 비순수 함수

순수 함수와 비순수 함수를 구분하는 가장 큰 차이점은 부수 효과 (Side Effect) 의 여부라고 할 수 있습니다.

순수 함수는 부수효과가 없는 함수로서 동일한 인수가 들어오면 항상 같은 값을 반환하며 어떠한 외부 상태에도 의존하지 않고 외부값을 변경시키지 않습니다.

반대로 비순수  함수는 외부 상태에 의존하거나 외부값을 변경시키는 함수를 의미합니다.