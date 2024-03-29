---
layout: post
title: Modern Javascript Deepdive [ Chapter 15 스코프 ]
date: 2023-08-14 11:08 +0900
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

## Chapter _ 15 let,const 키워드와 블록레벨 스코프

바로 직전 챕터 Chapter 14 에서 저희는 전역 변수의 문제점을 알 수 있었습니다.

ES6 이전의 `var` 키워드는 전역변수로 할당되었기 때문에 앞선 그 많은 단점들을 해결해야했지만, 현재 ES6 이후의 문법에서는 해당 문제를 개선한 `let`, `const` 키워드가 생겼습니다.

이 외에도 `var` 키워드의 단점은 몇 가지 더 있습니다.

## var 키워드의 변수 문제점

### 변수 중복 선언 허용

백문이 불여일견. 우선 예시를 보도록 하겠습니다.

```tsx
var x = 1;
var y = 1;

// var 키워드의 변수는 같은 스코프 내에서 중복 선언이 허용됩니다.
// 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 듯 동작합니다.
var x = 100;
var y; // 여기서 초기화문이 없는 변수 선언문은 무시된다.

console.log(x) // 당연히 1 대신 100 출력
console.log(y) // 따라서 undefined 가 아닌 1 이 출력
```

위 예제에서 `var` 키워드로 선언된 x 와 y 변수는 중복 선언 되었습니다.

여기서 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 `var` 키워드가 없는 것 처럼 동작하고 초기화문이 없는 변수 선언문은 무시됩니다.

### 함수 레벨 스코프

앞서 함수레벨 스코프의 문제점을 한번 짚고 넘어왔지만 `var` 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정합니다.

즉, 함수가 아닌 조건문, 반복문 등에서 선언된 변수들 모두 전역변수로 선언하게 됩니다.

이러한 함수 레벨 스코프는 전역변수를 의도치 않게 남발하는 부작용을 낳습니다.

전역 변수의 문제점은 Chapter 14 에서 충분히 말했기 때문에 굳이 작성하지 않겠습니다.

### 변수 호이스팀

변수 선언문이 스코프의 제일 윗부분으로 끌어올려지는 듯 동작하는 것이 호이스팅입니다.

변수 호이스팅에 의해 끌어올려진 `var` 키워드는 할당 이전에 참조하게 되면 `undefined` 를 반환합니다.

사실 이러한 호이스팅은 로직 자체에 에러를 발생시키진 않지만 프로그램 흐름 상 옳지 않을 뿐더러 가독성이 떨어지고(?) 오류 발생의 여지를 남깁니다.

## let 키워드

앞서 `var` 키워드의 단점을 보완하기 위해 새로운 변수 선언 키워드 중 `let` 을 살펴보도록 하겠습니다.

### 변수 중복 선언 금지

`let` 키워드는 재할당은 가능하나 재선언은 불가능합니다. 만약 중복선언 하려고 시도한다면 문법 에러가 발생하게 됩니다.

### 블록 레벨 스코프

블록 레벨 스코프는 함수 레벨 스코프에 더해 반복문, 조건문, try-catch 문 등의 블록 레벨도 지역 레벨로 인정하는 스코프입니다.

블록 레벨 스코프는 전역변수 최소화에 더불어 개발자로 하여금 조금 더 명확하고 가독성 좋은 코드를 쉽게 작성할 수 있게 해줍니다.

### 변수 호이스팅

앞서 살펴본 `var` 키워드에서는 암묵적으로 선언과 초기화(`undefined` 초기화)가 동시에 진행되어서 `undefined` 가 반환되는 경우를 확인할 수 있었습니다.

하지만 `let`, `const`, `class` 등의 키워드는 변수의 선언이후 초기화 이전까지의 참조가 금지됩니다.

따라서 호이스팅으로 인해 스코프 내에 선언되는 시작시점부터, 초기화가 이뤄지는 지점까지의 참조가 불가능한 구간. TDZ ( Temporary Dead Zone )가 생성됩니다.

이전의 `var` 키워드를 테스트했던 방식으로 `let` 키워드의 호이스팅을 체크해보면 Ref Error 를 발생시키며 마치 호이스팅이 이뤄지지 않는 듯 작동합니다.

**하지만, 실제론 호이스팅이 이뤄지고 있습니다.**

ES6 의 모든 키워드들은 호이스팅이 이뤄집니다. 하지만  `let`, `const`, `class` 키워드들은 변수 선언과 초기화가 분리되어 이뤄지기 때문에 호이스팅이 발생하지 않는 듯 동작하게 됩니다.

- let, const, class는 왜 ?
    
    이 세가지 모두 다른 키워드들과 마찬가지로 호이스팅이 이뤄지긴 하지만, 이 세가지 키워드들은 선언과 초기화가 분리되어 이루어집니다. 즉, TDZ 가 생기게 됩니다.
    
    이런 설계를 의도한 이유는 무엇보다도 ES5 에서 큰 문제를 일으켰던 var와의 차별성을 두기 위함이 아닐까 생각됩니다.
    
    이 설계의 의도는 ‘변수의 스코프를 보다 엄격히 제어하기 위해’ 입니다.
    
    이후에 나올 내용이겠지만, ECMAScript2015 문서에서는 let 과 const 는 LexicalEnvironment 에 정의된다고 합니다. 이를 통해 이전에 있었던 var의 치명적인 함수레벨 스코프의 단점들을 예방할 수 있습니다.
    
    문서 자체에 “이 설계의 의도는 변수 스코프의 엄격한 제어를 위해서다” 라는 문장은 없지만 대략적으로 그런 이유임을 유추할 수 있었습니다.
    

## const 키워드

const 키워드는 상수(Constant) 를 선언하기 위해 사용됩니다. 하지만 **상수가 불변성을 보장하지는 않습니다**. 이 부분은 추후에 추가적으로 보충 될 예정입니다.

### 선언과 초기화

const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화 해야 합니다.

앞서서 선언과 초기화가 분리된다고 하지 않았나요?? 라는 질문이 있겠지만, 이는 작성하는 관점에서의 동시 입니다. 예시를 보도록 하겠습니다.

```tsx
const a; // SyntaxError
a = 10;

// ===
const a = 10 // 정상
```

이런 의미로서의 “동시” 임을 기억하면 좋겠습니다.

### 재할당 금지

const로 선언된 변수는 `var` , `let` 키워드와 다르게 재할당이 제한됩니다.

하지만 앞서 객체를 다룰 때 알 수 있었듯이 객체의 경우 const 키워드로 작성하더라도 그 내부의 값은 변경할 수 있습니다.

그렇기 때문에 **상수가 불변성을 보장하지는 않는다**는 말을 덧붙였던 것입니다.

## ES6 를 사용한다면?

기본적으로 ES6 를 사용한다면 다음의 가이드를 따르는 것을 추천한다고 합니다.

- var 키워드 사용 지양하기
- 재할당이 필요한 땐 let을 사용하되 그것도 스코프의 크기를 최소화하기
- 읽기 전용으로 사용되는 값은 const 를 사용하기

생각보다 변수를 재할당 해야하는 경우는 꽤나 드물다고 합니다. 그래서 아마도 저자는 되도록이면 const 키워드를 사용하는 것을 추천하는 듯 합니다.