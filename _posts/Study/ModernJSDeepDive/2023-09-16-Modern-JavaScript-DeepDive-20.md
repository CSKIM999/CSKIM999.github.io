---
layout: post
title: Modern Javascript Deepdive [ Chapter 20 Strict Mode ]
date: 2023-09-16 14:21 +0900
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

## Chapter _ 20 Strict Mode

## Strict Mode란 ?

아래 코드를 보고 실행결과를 예측해 봅시다.

```jsx
function foo() {
	x = 10;
}
foo();
console.log(x) // ??
```

지금까지 공부한 내용을 바탕으로 추론하자면, x 라는 변수가 어디에 어떻게 선언되어있는지 스코프체인을 통해 탐색할 것입니다.

함수스코프를 탐색하고 전역스코프로 넘어갔지만 역시나 x라는 변수는 선언되어있지 않습니다.

선언되어있지 않은 변수에 값을 할당하려 하고 있으므로 `ReferenceError`가 발생해야합니다.

하지만 실제로는 에러가 발생하지 않습니다. 이 또한 과도하게 친절한 JS 의 암묵적 프로퍼티 동적 생성때문입니다.

이러한 현상을 **암묵적 전역**이라고 칭합니다.

앞선 많은 예시들을 통해 알 수 있듯이 개발자의 의도와 상관없이 친절한 JS 의 암묵적 행동들은 오류를 발생시키는 원인이 됩니다.

이러한 오류를 방지하기 위해 ES5 부터 추가된 기능이 **Strict Mode** 입니다.

ESLint 와 같은 린트 도구를 사용해도 strict mode와 유사한 효과를 얻을 수 있고 거의 대부분의 개발자가 Lint 컨벤션을 정하여 팀 내 정적 분석 도구로 사용하고 있습니다.

## Strict Mode의 적용

### 전역에서의 Strict Mode

전역에 적용한 strict mode는 스크립트 단위로 적용됩니다.

언뜻 생각했을 땐 ESLint 를 사용한 것과 유사하게 작동하지 않나 생각할 수 있지만, 외부 서드파티 라이브러리를 사용할 때 라이브러리가 non-strict-mode 라이브러리인 경우도 있을 수 있기 때문에 전역 strict mode 적용은 바람직하지 않다.

### 함수 단위 Strict Mode

함수단위로도 Strict Mode 적용이 가능하다.

하지만 모든 함수에 strict mode를 명시하는것은 번거로우며 만약 strict mode 설정이 어긋난다면 또 다른 문제가 발생할 수 있기 때문에 이 또한 권장되지 않는다.

굳이 사용한다면 즉시실행 함수로 감싼 스크립트 단위로 사용하는것이 좋다.

```jsx
(function () {
	// non - strict mode
	var let = 10;
	function foo() {
		'use strict'
		let = 20; // SyntaxError !!!
	}
	foo()
}());
```