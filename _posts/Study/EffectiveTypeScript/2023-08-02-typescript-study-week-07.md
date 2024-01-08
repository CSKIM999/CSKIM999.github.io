---
layout: post
title: Effective Typescript 스터디 7주차 (Item 31 ~ 35)
date: 2023-08-02 18:02 +0900
description: Typescript Study
category: [Study, Effective TypeScript]
tags: Effective-Typescript
image:
  path: /assets/img/ets-thumbnail.png
---

![DesktopView](/assets/img/ets.png){:width='320'}

> 이 게시물은 SW 마에스트로 연수생 간 진행한 Effective Typescript 스터디의 개인 정리 내용입니다
{: .prompt-tip}

## [ Item 31 ]  타입 주변에 null값 배치하기
--- 
### 타입 주변에 null값 배치하기
### StrictNullCheck

저희는 앞선 Item 2 에서 `noImplicitAny` 와 `strictNullCheck` 는 필수적으로 설정해주는것이 좋다는 저자의 추천(?) 을 받았었습니다.

타입 무결성을 보장하는 코드의 작성을 위해서 앞의 두 옵션이 제공하는 기능들은 도움이 많이 되는것이 사실이기도 하구요.

하지만 조금 더 강한 제약을 가하는 만큼, 설정하게 되면  `null` 혹은 `undefined` 값 관련 오류들을 많이 접하게 됩니다.

### Before

```tsx
function extent(nums: number[]) {
  let min, max;
  for (const num of nums) {
    if (!min) {
      min = num;
      max = num;
    } else {
      min = Math.min(min, num);
      max = Math.max(max, num);
						      // ~~~ 'number | undefined' 형식의 인수는
						      // 'number' 형식의 매개변수에 할당될 수 없습니다.
    }
  }
  return [min, max];
}
```

위 예제는 숫자배열을 넣으면 최솟값과 최댓값 배열을 반환하는 함수입니다.

이 코드는 `strictNullCheck` 없이 타입체커를 통과하지만 `strictNullCheck` 를 활성화하면 에러를 반환합니다.

1. 만약 0 이 최솟값 혹은 최댓값이라면 잘못 된 결과값이 반환됩니다.
2. 매개변수로 빈 배열이 주어진다면 [ `undefined`, `undefined` ] 라는 배열을 반환합니다.

`min` 은 조건문을 통해 확인이 끝났지만, `max` 는 여전히 타입이 좁혀지지 않았기 때문입니다.

여기서 null 을 “잘” 사용하면 다음과 같은 코드로 바꿀 수 있습니다.

### After

```tsx
function extent(nums: number[]) {
  let result : [number, number] | null = null
  for (const num of nums) {
    if (!result) {
      result = [num,num]
    } else {
      result = [Math.min(result[0], num),Math.max(result[1], num)]
    }
  }
	return result;
}
```

결과값을 단일객체로 묶어 사용해서 코드가 더 간결해지고, 단순 if 구문 한번으로 체크할 수 있게 되고 타입오류도 사라졌습니다.

특히 이런 부분은 **API 반환값을 재사용해야할 때** 굳이 다른 타입으로 나눌 것이 아니라 큰 객체로 묶은 후 null 로 분기처리 해준다면 훨씬 더 명료한 코드를 작성할 수 있습니다.

### 결론 & 개인의견

저자가 `undefined` 와 `null` 을 개발자의 의도에 따라 구분해서 사용한다는 그룹에 속하는 사람 같은데 저도 그 방향은 동의합니다.

실제로도 `undefined` 타입과 싸워야하는 경우가 종종 있어서 나름 좀 흥미로웠던 챕터인 것 같습니다.


## [ Item 32 ] 유니온의 인터페이스보단 인터페이스의 유니온을 사용하기
--- 
### 유니온의 인터페이스보단 인터페이스의 유니온을 사용하기

대뜸 등장한 말장난에 당황스럽겠지만, 간결하게 정리하자면

> 인터페이스 안에서 각각의 속성을 조합하지 말고, 
각각의 속성 인터페이스를 정의하고 정의된 인터페이스를 조합해라!
> 

가 아닌가 싶습니다! ( 아님 말고 … )

### 왜 그래야 하나요?

```tsx
interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint :FillLayout | LineLayout | PointLayout;
}
```

위와 같은 `interface` 가 있다고 가정해보겠습니다.

아마도 `Layer` 인터페이스는 속성값에 따라서 해당 속성값에 맞는 타입을 반환해주기 위해 위와 같은 인터페이스를 설정했을것으로 추정됩니다.

하지만 위 타입은 `layout` 은 `FillLayout` 속성이면서 `paint` 는 `LineLayout` 일 수 있습니다.

물론 실제 작성자의 의도는 그렇지 않았겠지만 **[ 안에서 각각의 속성을 조합한 인터페이스 ]** 는 그렇게 작동할 **‘수’** 있다는 것입니다.

그렇다면 다음으로 **[ 각각의 속성 인터페이스를 정의한 후 조합한 인터페이스 ]** 의 예시를 보겠습니다.

```tsx
interface FillLayer {
  layout: FillLayout;
  paint :FillLayout ;
}
interface LineLayer {
  layout: LineLayout;
  paint :LineLayout ;
}
interface PointLayer {
  layout: PointLayout;
  paint :PointLayout ;
}

type Layer = FillLayer | LineLayer | PointLayer
```

위와같이 조합한다면 잘못된 조합으로 설정되는 것을 근본적으로 막을 수 있습니다.

물론 아주 높은 확률로 앞선 **[ 안에서 각각의 속성을 조합한 인터페이스 ]** 를 사용하더라도 문제없이 작동 할 확률이 높습니다.

하지만 의도한 바와 다르게 사용되는 것을 확실하게 제한하는것이 타입스크립트의 목적이다보니 그 타입을 명확히 하는 방향을 지향하는 것이 좋겠습니다.

### 결론 & 개인의견

타입 하나에 여러가지 가능성을 부여하는 것은 지양해야합니다.
각각의 속성을 명확히 정의하고 그 정의된 속성을 조합하는것이 일반적으로 지향하는 방향입니다.

추가로 제어 흐름 분석에 큰 도움을 주는 앞서 설명 해 줬었던 태그 유니온패턴도 사용하는 것을 추천하고 있습니다.

… 저도 그렇게 쓰고 싶은데 마음같이 안되더라고요…


## [ Item 33 ] string 타입보다 더 구체적인 타입 사용하기
--- 
### string 타입보다 더 구체적인 타입 사용하기
저는 이 아이템의 가장 핵심이 바로

> “ㅋ” 과, 총 120만 자의 소설 모비딕 전문이 같은 string 타입이라는 점
> 

아닐까 싶습니다.

물론 contents 나 text를 적어야하는 요소의 경우엔 string 속성을 주는것이 너무나 당연하지만

많은 경우에 리터럴 유니업 타입으로도 좁힐 수 있음에도 string으로 퉁치는 경우가 많다는것이 저자의 주장입니다.

식별자나 날짜 키값 등 조건이 많지 않은 경우엔 문자열 리터럴 타입 사용이 보다 나은 방법일 수 있습니다.

혹은 객체의 속성값을 함수 매개변수로 받을 땐 string보단 keyof T 와 같은 제네릭 타입을 선언하는게 좋습니다.

… 그게 전부 아닌가요?

### 결론 & 개인의견

그냥 다른 아이템 하면서 팁 블럭에 한 문단 정도만 적어놔도 될 법한 내용을 굳이 아이템으로 만든 느낌입니다.


## [ Item 34 ] 부정확한 타입보다는 미완성 타입을 사용하기
--- 
### 부정확한 타입보다는 미완성 타입을 사용하기
타입을 정의하며 입력값이 한가지 타입이 아닌 여러가지 복합타입이 들어오는 경우를 접하곤 합니다.

그 경우 우리에게 주어지는 선택지는 대략 다음과 같을 것 입니다.

1. 모두 허용하기
2. string, number, array 등과 같은 원시타입 허용
3. string, number, 알려진 리터럴타입
4. 각각의 원소의 타입을 명시

분명 지금까지의 내용을 보았을 땐 4번을 통해서 정확하게 입력 타입을 명시하고, 타입스크립트가 제공하는 언어서비스, 정적 분석 기능을 100% 활용하는 것이 좋습니다.

실제로도 그게 가능하다면 최선의 방법입니다.

하지만 그것을 완벽하게 해내지 못한다면 안하느니만 못한 과유불급의 상태가 됩니다.

최선은 1 → 4 방향으로 최대한 타입을 명확하게 좁혀나가는 것 이겠지만, 정확하게 모델링할 수 없다면 차라리 조금 느슨한 타입 선언이 낫습니다.

### 결론 & 개인의견

참 모든 분야에서 **“적당히”** 라는게 가장 어려운 것 같습니다.

지금까지 정확한 타입 체크의 중요성을 말하다가 이제는 정확히 할 수 없다면 부정확한게 낫다니,

예시도 이해가 되지만 속상한 부분은 그 **“적당히”** 의 선을 찾아온 독자들에게 명쾌한 해답을 주지 못하는 저자의 글 입니다.



## [ Item 35 ] 데이터가 아닌 API와 명세를 보고 타입 만들기
--- 
### 데이터가 아닌 API와 명세를 보고 타입 만들기
Item 34 에서 지금까지의 무작정 정확한 타입 만들기를 부정당하고 만난 첫 번째 아이템입니다.

나름의 당근과 채찍 전략인지 이번엔 그 “적당히” 에 대한 기준을 제안하고, 이미 우리가 누리고있는 부분입니다.

바로 API 와 명세를 보고 타입을 설정하는 방법입니다.

우리가 만들어낸 타입들이라면 아직도 그 “적당히” 의 기준이 모호할 수 있지만, 우리 프론트엔드는 과할정도로 다양한 라이브러리들에서 도움을 받습니다.

그 경우 우리는 타입을 직접 작성하지 않아도 타입이 지정되어 있는 모습을 볼 수 있는데, 
이는 라이브러리에 작성 된 명세를 참고해서 타입을 생성하여 사용하고 있기 때문입니다.

만약 명세와 같은 타입에 관련한 정보가 없다면 직접 데이터를 생성해야 합니다. 하지만 이 경우엔 여전히 예외의 경우를 염두에 두고 생성해야 하기 때문에 상당히 어려운 작업입니다.

### 결론 & 개인의견

책에서도 상당히 흥미롭게 읽고, 현재 실제로 많은 도움을 받고 있는 타입 추론을 통해 여러 라이브러리들에서 반환 된 값을 보다보면 이미 타입이 정의 돼있는 경우를 어렵지 않게 볼 수 있었습니다.

어느정도 예측하긴 했지만 그것은 전부 라이브러리측에서 명시해주었기 때문에 저희가 추론을 통해 나온 타입들을 적절히 사용할 수 있는 것 이었습니다.

저자는 이정도가 그 **“적당한”** 정확도의 기준이라고 생각하는 듯 합니다.

그리고 나름의 당근과 채찍 전략을 사용하는지 앞에도 그렇고 이번에도 자꾸 타입의 **“적당한”** 정확도같이 나쁜 얘기를 하다가 이정도면 된다는 듯 한 저의 눈높이에 맞는 당근을 주곤 하는 것 같습니다.

이번 아이템은 그 중 당근 포지션의 아이템이 아니었는가 싶습니다.