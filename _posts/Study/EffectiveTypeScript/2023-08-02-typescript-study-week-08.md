---
layout: post
title: Effective Typescript 스터디 8주차 (Item 36 ~ 40)
date: 2023-08-09 14:52 +0900
description: Typescript Study
category: [Study, Effective TypeScript]
tags: Effective-Typescript
image:
  path: /assets/img/ets-thumbnail.png
---

![DesktopView](/assets/img/ets.png){:width='320'}

> 이 게시물은 SW 마에스트로 연수생 간 진행한 Effective Typescript 스터디의 개인 정리 내용입니다
{: .prompt-tip}

## [ Item 36 ]  타입 주변에 null값 배치하기
--- 
### 해당 분야의 용어로 타입 이름 짓기

아무래도 이 부분은 서비스가 커지거나 코드를 공유해야하는 사람이 많아질 때 적용해 볼 내용인 듯 싶습니다.

```tsx
interface Animal {
	name:string;
  endangered:boolean;
  habitat:string;
}
const leopard: Animal = {
  name:'Snow Leopard',
  endangered:false,
  habitat:'tundra'
}
```

굳이굳이 예시를 조금 들자면 위 예시와 같이 모호한 타입 이름들보다는

name 을 commonName,genus,species 등 더욱 구체적인 용어들로 대체하는 등 되도록이면 해당 value 값을 유추할 수 있게 타입 이름을 짓기를 추천하고 있습니다.

### 결론 & 개인의견

가독성과 코드의 추상화 수준을 높이기 위해선 용어의 **적절한** 선택이 중요하다고 합니다.

아마 현재 소마에서도 대다수의 팀이 프론트엔드가 한 명이다보니 타입이름을 지을 때 솔직히 좀 막 짓는 경향이 있는 것 같기는 합니다.

최근에 최대한 추상화하여 타입을 정의하고 있다보니 아주 조금은 이해가 가는 아이템이었지만, 이번 아이템의 결론도 **적절한** 으로 귀결되는 듯 해서 썩 유쾌하진 않습니다


## [ Item 37 ] 공식 명칭에는 상표 붙이기
--- 
### 공식 명칭에는 상표 붙이기

타입스크립트를 사용하다 보면 어떤 절차를 거치고 나서는 타입 구조가 달라지는 경우를 핸들링해줘야 하는 경우를 마주하곤 합니다.

예를 들면 api 응답값 혹은 에러값을 현재 팀 내 API 공통응답 포맷에 맞춰서 핸들링 해 준다던지…

하지만 그 경우에 타입을 지정해주는것도 좋겠지만 그게 쉽지 않은 작업이라면 상표를 붙이는 방법으로도 해결이 가능합니다.

```tsx
interface Vector2D {
  _brand:'2d';
  x:number;
  y:number;
}

function vec2D(x:number,y:number):Vector2D {
  return {x,y,_brand:'2d'}
}
function calculateNorm(p:Vector2D) {
  return p.x*p.x + p.y*p.y
}
calculateNorm(vec2D(3,4))
const vec3D = {x:3,y:4,z:5}
calculateNorm(vec3D) // TYPE ERROR !
```

이전에 다뤘던 태그 기법과 유사해보이나, 자세히 보면 조금은 다른 듯 합니다.

태그기법의 경우 모든 값에 태그를 두고 함수 내부에서 태그의 값에 따라 필터링해줬다면, 이번 상표 기법은 `vec3D` 의 경우 `vec2D` fucntion 을 거치지 않아 _brand 키를 가지고있지 않기 때문에 특별한 필터링 없이 타입체킹에서 잘못 된 코드임을 확인할 수 있습니다.

### 결론 & 개인의견

처음 봤을 땐 태그 기법과 너무 많이 유사해서 도대체 왜…? 라는 생각을 갖고 있었지만 자세히 보니 아주 조금은 다른 방법론인 듯 합니다.

이번 아이템은 최근에 비슷하게 핸들링해줘야 하는 일이 조금 있었어서 적용해보면 좋겠다는 생각에 흥미로웠으나, 이번 타입 설계 파트의 대부분 아이템이 그러하듯 만약 이런 필요성 마저도 없었으면 또 비슷한 거 나왔네 하고 넘어가지 않았을까 싶습니다.


## [ Item 38 ] Any 타입은 가능한 한 좁은 범위에서만 사용하기
--- 
### Any 타입은 가능한 한 좁은 범위에서만 사용하기

초반에 `noImplicitAny` 옵션을 반 강제하던 저자의 Any 사용 가이드라니, 조금 열받습니다.

다만 여전히 Any 사용을 지양하는 자세를 제안하며, 무려 **“ Any 의 장점은 살리면서 단점을 줄이는 “** 방법을 알려준다고 하니 한번 들어나 보면 좋겠습니다.

### 변수에 Any 를 선언하기보단 단언을 사용하기

변수 자체에 Any 를 선언한다면 그 Any 타입은 다른 타입들에게도 영향을 미치지만

마지막에 단언을 통해 타입을 정의한다면 그 Any 타입은 블럭 바깥으로 영향을 미치지 않는다고 합니다.

### 결론 & 개인의견

어쨋든간에 any 의 사용은 최소화 해야 합니다.
특히 함수의 반환타입이 any 타입일 경우 다른 타입들에게도 영향을 미치기 때문에 타입 안정성이 급격히 떨어지게 됩니다.

…. any 쓰지 말라면서요…. ㅜ


## [ Item 39 ] any를 구체적으로 변형해서 사용하기
--- 
### any를 구체적으로 변형해서 사용하기

any를 사용하더라도 구체적으로 변형한다면 최대한 그 범위를 좁혀서 사용 가능합니다.

배열 속 배열 안에 타입 관계 없는 원소가 들어있는 타입을 정의할 때

any 를 사용해도 문제없겠지만 any[][] 를 사용한다면 그야말로 any를 사용하지만 최대한 타입을 좁히는 결과를 도출할 수 있습니다.

### 결론 & 개인의견

any 를 사용해야 할 때가 정말 존재할 수도 있습니다. 하지만 그 경우에도 정말 모든 값을 허용해야 하는 지, 타입을 조금이라도 더 좁힐수는 없는지 고민해 볼 필요가 있습니다.

똥물에도 위아래가 있다더니 any 사이에도 위아래가 있었네요… 아마 되도록이면 any를 사용하지 않기야 하겠지만 만약 사용하게 되더라도 이렇게 최대한 타입을 좁히며 사용하면 나중에 혹시혹시혹시나 왜 any 사용했냐고 물어봐도 대답할만한 근거가 되지 않을까 싶습니다.


## [ Item 40 ] 함수 안으로 타입 단언문 감추기
--- 
### 함수 안으로 타입 단언문 감추기

** 함수를 작성하다보면 외부로 드러나는 타입 정의는 간단하지만 내부 로직에서는 안전하게 구현하기 어려운 경우가 많답니다 **

물론 모든 부분에서 안정적인 타입을 구현하는게 최선이겠지만, **“적절한”** 타협점을 찾는 것 또한 중요합니다.

복잡하다면 타입 내부에는 타입 단언을 사용하고 외부에 드러나는 타입을 정확히 명시하는 정도로 끝내는 게 좋다고 합니다.

```tsx
function shallowObjectEqual<T extends object>(a:T, b:T) :boolean {
  for (const [k,aVal] of Object.entries(a)) {
    // 여기서 뒷부분 aVal !== b[k] 으로 바꾸면 타입 에러가 발생합니다.
    if(!(k in b) || aVal!== (b as any)[k]) { 
      return false
    }
  }
  return Object.keys(a).length === Object.keys(b).length
}
```

위 예시는 아마 저자가 의도적으로 타입스크립트 문맥 활용 오류를 발생 시킨 코드인 듯 합니다.

어쨌든 문맥 활용 오류로 인해 분명 런타임 코드 상으로는 문제가 없는 코드이지만, 타입 체크 과정에서 오류를 발생시킵니다.

이 경우 함수 안에 any 단언을 사용하는 것으로 타입 설정에 불필요한 시간 소비를 줄일 수 있습니다.

### 결론 & 개인 의견

이번 결론 또한 **적절한** 이 들어가긴 하나, 그래도 이전과는 다르게 **함수 안** 이라는 나름 구체적인 가이드를 제시해주어서 의미가 있는 아이템이었던 것 같습니다.

앞선 아이템 37에서 얘기했듯이 최근에 API 응답값을 핸들링 하며 타입 단언을 사용하곤 했는데 이게 나름 현실적인 활용방안이라는 점에서 위안을 얻습니다 ㅋㅋ