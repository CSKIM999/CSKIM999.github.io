---
layout: post
title: Modern Javascript Deepdive [ Chapter 18 함수와 일급객체 ]
date: 2023-08-29 11:16 +0900
description: JavaScript Study
category: [Study, Modern Javascript Deepdive]
tags: Modern-Javascript-Deepdive
image:
  path: /assets/img/mjsdd.png
---

![DesktopView](/assets/img/mjsdd.png){:width='320'}

> 이 게시물은 SW 마에스트로 연수생 간 진행한 Modern JavaScript DeepDive 스터디의 개인 정리 내용입니다.
> 되도록 책의 내용을 그대로 복사해서 붙여넣기보단 개인적으로 인상깊었던 부분을 구어체로 풀어쓰려 노력했습니다.

{: .prompt-tip}

# Modern JavaScript Deep Dive

## Chapter _ 18

## 일급 객체

다음과 같은 조건을 만족하는 객체를 일급 객체라고 합니다.

1. 무명의 리터럴로 생성할 수 있어야 한다. ( 런타임에 생성이 가능하다 )
2. 변수나 자료구조에 저장할 수 있어야 한다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

JS에서 함수는 위의 4가지 조건을 모두 만족하므로 일급 객체라고 할 수 있다.

## 함수 객체의 프로퍼티

함수 객체의 어트리뷰트는 `Object.getOwnPropertyDescriptors` 메서드로 확인해 볼 수 있습니다.

일반적으로 함수 객체에는 `arguments`, `length`, `caller`, `name`, `prototype` 프로퍼티가 포함되어있습니다.

이 객체들은 모두 일반 객체에는 없는 함수 객체의 고유 프로퍼티입니다.

하지만 `__proto__` 는 접근자 프로퍼티이고 함수 객체 고유의 프로퍼티가 아닌 `Object.prototype` 객체의 프로퍼티를 상속 받은 것입니다. 프로토 프로퍼티는 모든 객체가 상속받아 사용할 수 있습니다. 어쨌든 프로토 프로퍼티는 다음 장 프로토타입에서 알아보고 이번 챕터에서는 고유 프로퍼티를 알아보도록 하겠습니다.

## arguments 프로퍼티

함수 객체의 arguments 프로퍼티 값은 arguments 객체입다. 

arguments 객체는 함수 호출 시 전달된 인수를 담고있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 **지역 변수**처럼 사용됩니다. 즉, 함수 외부에서는 참조할 수 없습니다. 

JS 의 함수는 매개변수와 인수의 개수가 일치하는 지 확인하지 않습니다. 즉, 함수 호출 시 매개변수만큼 인수를 전달하지 않거나 초과되어도 에러가 발생하지 않습니다.

여기서 초과된 인수가 그냥 버려지는 것은 아닙니다. 모든 인수들은 arguments 객체의 프로퍼티로 보관됩니다.

arguments 객체는 객체입니다. 당연하죠?
그렇기 때문에 다시금 고유 프로퍼티를 소유하게 됩니다. 인수를 프로퍼티 값으로 소유하며, 프로퍼티 키는 인수의 순서를 나타냅니다. arguments 객체의 caller 프로퍼티가 호출되어 arguments 객체를 생성한 함수, 자신을 가리키고 arguments 객체의 length 프로퍼티는 인수의 개수를 가리킵니다.

arguments 객체는 배열 형태로 인자를 담고 있지만, 실제 배열이 아닌 유사 배열 객체입니다. 따라서 배열 메서드를 사용할 수 없습니다.

따라서 배열 메서드를 사용하기 위해선 call 혹은 apply 를 통해 bind 하여 간접 호출해야 합니다.