---
layout: post
title: Effective Typescript 스터디 3주차 (Item 11 ~ 15)
date: 2023-07-01 20:34 +0900
description: Typescript Study
category: [Study, Effective TypeScript]
tags: Effective-Typescript
image:
  path: /assets/img/ets-thumbnail.png
---

![DesktopView](/assets/img/ets.png){:width='320'}

> 이 게시물은 SW 마에스트로 연수생 간 진행한 Effective Typescript 스터디의 개인 정리 내용입니다
{: .prompt-tip}

## [ Item 11 ]  잉여 속성 체크의 한계 인지하기
--- 
### 잉여 속성 체크의 한계 인지하기

```tsx
interface Room {
	test1 : number;
	test2 : number;
}

const A : Room = {
	test1 : 1,
	test2 : 2,
	test3 : 3
// 여기서 test3 에 대한 에러가 반환된다. 
}
```

우리는 Item4 에서 느슨한? 관대한? 타입스크립트의 Open타입 시스템을 알수 있었습니다.

하지만 해당 Item4 예제에서와는 다르게 위 예제에선 에러를 직면합니다.

새로운 예제를 보시죠!

```tsx
const obj = {
	test1 : 1,
	test2 : 2,
	test3 : 3,
}
const alpha : Room = obj // 여기서는 에러가 반환되지 않는다.
```

분명 obj 와 앞선 예제에서 객체 리터럴의 내용은 똑같지만, 에러를 반환하지 않습니다.

### Why??

두 예제의 가장 큰 차이점은 객체를 할당 하는것과 객체 리터럴 방식으로 할당하는 것입니다.

그 두 방식이 어떤 이유로 다른 결과물을 도출하게 되는 것일까요?

여기서 이번 아이템의 키워드인 **“잉여 속성 체크”** 의 과정 수행 여부에 따라서 에러 여부가 갈리게 됩니다.

### 잉여 속성 체크

일반적으로 타입 시스템에서 이루어지는 할당 가능 검사와는 명백히 다른 과정으로서, 객체 리터럴 할당 방식을 사용할 때 이루어지는 중요한 오류를 잡을 수 있도록 도와주는 부가적인 기능입니다.

```tsx
interface Options {
	title : string;
	darkMode?:boolean
}
function createWindow(options: Options) {
	if (options.darkMode) {
		setDarkMode();
	}
	// . . .
}

createWindow({
	title:'sudo',
	darkmode:true,
	// error 반환. darkMode 를 사용하려고 하셨나요~~~??? 어쩌구
}) 
```

함수의 매개변수를 객체 리터럴 방식으로 전달하려고 할 때, darkMode 가 아닌 darkmode 로 전달하여 오타 에러를 반환하는 예제입니다.

앞선 Options 타입은 사실상 title 속성만을 가진 매우 넓은 범위의 타입입니다. 따라서 잉여 속성 체크가 이루어지지 않는다면 거의 모든 경우 ( title 속성과 또 다른 어떤 속성을 가진 객체 ) 는 Options 타입의 범위 안에 속하게 됩니다.

하지만 잉여 속성 체크가 이루어진다면, 객체 리터럴에 ‘의도하지 않은’ 속성을 허용하지 않는 것으로 원치 않는 문제를 사전에 방지할 수 있습니다.

### 결론

그 이후에 어쩌구 저쩌구 추가적인 내용들이 있지만, 이 Item 의 골자는 객체 리터럴 방식을 사용할 때 “잉여 속성 체크” 라는 과정이 수행되며, 이것은 우리가 원하는 “의도대로 작동하는 코드” 를 작성하는 데 큰 도움이 된다 라는 것 같습니다.

다만, 거의 대부분의 기능이 그러하듯 이 또한 한계가 있고 일반적으로 수행되는 ‘구조적 할당 가능성 체크’ 와는 분명히 다른 작업이란 점을 인식해야 합니다.

### 개인의견

이걸 100% 이해하고 사용하기엔 역시나 어려운 기능인 것 같다. 사실 내가 아직 TS 베이비라서 그런 것 같기도 하고.

하지만, 나중에 이 개념을 알고서 접하는 것과 모르고 접하는 것은 분명 큰 차이가 있으리라 생각합니다.



## [ Item12 ] 함수 표현식에 타입 적용하기
---
### 함수 표현식에 타입 적용하기

이번 Item 과는 사실 큰 연관이 없는 얘기긴 하지만

나는 사실 대부분의 경우 Arrow Function 을 사용한 함수표현식을 씁니다.

부끄러운 얘기지만 왜? 라고 지금 질문한다면 대답할 수 없을 것 같습니다.

당연히 그냥 “직관적이어서.” , ”손에 익어서” 나 “조금 더 최신에 나온 방법이니까” , “뭐 Arrow Funtion 이 그냥 Funtion 보다 어떤게 좋다고 했던 것 같은데?” 라고 정도는 대답하겠지만.

왜, 어떤게 일반 Function 방식보다 낫기 때문에 이런 이유로 Arrow Function 을 사용한다 라고는 말을 못할 것 같습다.

어쨌든간에 TS 에서는 함수 표현식을 사용하는게 좋다고 합니다.


> 추가적으로 공부한 일반 함수 표현식과 Arrow Function의 차이        
> Arrow Function 은 문법이 간결하고 this의 목표가 블록 스코프로 선언됩니다.     
> 일반 함수 표현식은 생성자 함수로 활용이 가능하며 메서드로 사용 시 상위 객체의 this 를 상속받지 않고 자기 자신을 가리키게 됩니다.      
{: .prompt-info}

사실 이 Item 은 별 내용이 없어서 한줄로 요약하자면.     

**"TS 에는 함수 타입 선언이 있어서 함수표현식에 사용하면 반복 코드를 줄일 수 있어!"** 다.

### 결론 ( 사실상 개인의견 )

사실 코드 반복을 줄인다는 것이 얼마나 이상적인 일인가요?

공수가 줄어드는 것은 물론이고, 심지어 코드 변화에도 유연하게 대처할 수 있으니까요.

누가 봐도 중복인 코드를 줄이는 것은 입문자도 할 수 있을 것 입니다.

하지만 정작 우리가 짜는 코드는 유사한 작업을 진행해도 다른 방법으로 구현해 버려서 중복 코드를 줄일 수 없게 구현하니, 우리의 스킬이 문제가 아닐까 싶습니다.

## [ Item 13 ] 타입과 인터페이스의 차이점 알기
---

### 타입과 인터페이스의 차이점 알기

거의 대부분의 상황에서 타입과 인터페이스는 동일하게 동작합니다.

굳이 비슷하게 동작하는 경우를 작성하진 않겠습니다.

솔직한 마음으로 저는 어떤 상황에서 어떤 것을 써야하는지가 궁금한 것이지 아직까진 어떤 것이 동일하게 동작하고 어떤 것에서 차이점을 보이는지는 궁금하지가 않으니까요.

### Type 의 장점

Union 을 통해서 타입에 조건을 부여할수도 있고, 튜플이나 배열 타입도 Type 키워드를 사용할 때 더욱 간결하게 표현 할 수 있습니다.

```tsx
type TEST = (TYPE_A | TYPE_B) & {name:string}
```

과 같이 유니온을 이용한 여러가지 고급 기능 활용 가능성이 존재합니다.

### Interface 의 장점

**확장이 가능하다.**

TS 에서는 ‘보강’한다고 표현하나, 속성을 확장한다고 이해하는 것이 더 빠르고 편할 듯 합니다.

```tsx
interface alpha {
	test1:string;
	test2:string;
}

interface alpha {
	test3:string
}

const beta : alpha = {
	test1:'a',
	test2:'b',
	test3:'c'
} // 오류 없음.
```

이와같이 속성을 확장하는 방법을 ‘선언 병합’ 이라고 칭합니다.

### 결론

**복잡한 조건의 조합이 필요하다면 타입이 적절**합니다.

반대로 **확장이 필요할 것으로 예상되는 조건이라면 인터페이스가 적절**할 것입니다.

또한 어느 것을 사용하던 **한가지 일관된 스타일 확립이 더욱 중요**합니다.

### 개인의견

조금 극단화 하자면 **타입은 유니온이 가능**하고, **인터페이스는 선언병합**이 가능하다. 가 가장 큰 차이점이 아닐까 싶습니다.

그런 점에서 ‘복잡한 조건’ 이라는 문제에서부터 아직까진 저에게 인터페이스가 적절할 것 같습니다.

## [ Item 14 ] 타입 연산과 제너릭으로 반복 줄이기
---

### 타입 연산과 제너릭으로 반복 줄이기

이 쯤에서 다시 한번 기억하는 우리가 이 책을 읽고, 타입스크립트를 사용하는 이유는 다음과 같습니다.

**“유효한 프로그램은 통과시키고 무효한 프로그램은 오류를 발생시킨다.”**
 

저희가 TS 를 사용하는 이유는 우리가 짠 코드가 우리의 의도대로 작동하길 바라기 때문입니다. 다만 책을 읽을수록 살짝 그 의미가 흐려지는 듯 한 기분이 들었는데 글쓴이부터 그걸 좀 느꼈는지 대뜸 이 말을 써놓은 게 좀 인상깊었다.

개발자에게 있어 반복을 줄인다는 것은 단순히 공수를 줄이는 것이 끝이 아닌 그 이후의 유지보수성에도 아주 긴밀하게 연결됩니다.

해당 파트에서는 여러가지 중복 타입 코드를 줄일 수 있는 표준 라이브러리에 존재하는 제너릭 타입을 소개해줍니다.

### Union Type

```tsx
interface Person {
	firstName : string;
	lastName : string;
}
interface CSKIM {
	firstName : string;
	lastName : string;
	birth: Date;
	// Bad Case
}
interface CSKIM extends Person {
	birth : Date;
}
// or
type CSKIM Person & {birth : Date};
```

매번 firstName, lastName 속성을 추가할 것이 아니라 Person 을 extends 혹은 intersection ( & ) 연산자로 확장하는 방법.

### Pick

처음으로 등장한 표준 라이브러리 제너릭 타입입니다. 백문이 불여일견. 일단 한번 봐봅시다. ( Pick 은 객체를 반환한다 )

```tsx
interface State {
	userId : string;
	pageTitle : string;
	recentFiles : string[];
	pageComponents : string;
}

interface TopNavState {
	userId : string;
	pageTitle : string;
	recentFile : string[];
}
// 앞선 방법과 동일하게 겹치는 부분이 있다고 TopNavState 를 extends 해서
// State 를 구성하는 것은 앞으로의 유지보수를 생각해서라도 바람직하지 않다.

type TopNavState = {
	[k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
};

// 이 방법이면 앞선 방법보다 훨씬 간결해졌다. 하지만 이번 타이틀 Pick 은 등장
// 하지 않았다. 다음 예제를 봐보자.

// type Pick<T,K> = {[k in K]: T[k]}
type TopNavState = Pick<State,  'userId' | 'pageTitle' | 'recentFiles'>
```

마치 반복문을 돌리고 해당 interface 에 있다면 해당 type  을 가져오게 하는 듯한 나름? 직관적인 구조여서 말 그대로 Pick 해오는 듯 한 기능입니다.

### keyof & Partial

생성 후 업데이트 되는 클래스를 정의한다고 했을 때, update 값을 담아두는 interface 는 생성자와 동일한 선택적 매개변수를 가지는 필드가 생성 될 것입니다. 

사실 적고서도 한자어가 너무 많아서 이해가 빨리 되진 않는 부분이었습니다. 다음 예제를 한번 봐보는게 빠를 것입니다.

```tsx
interface Options {
    width:number;
    height:number;
    color:string;
    label:string;
}

// type OptionsUpdate = {
//     width?: number;
//     height?: number;
//     color?: string;
//     label?: string;
// }

type OptionsUpdate = {[k in keyof Options]?: Options[k]}

class UIWidget {
	constructor (init:Options)
	//update(options:OptionsUpdate)
	update(options:Partial<Options>)
}
```

OptionUpdate 타입은 Options의 모든 매개변수가 같지만 선택적 필드입니다.

이런 상황에서의 keyof 는 6줄짜리 코드를 단 한줄로 간결하게 줄여줍니다!

심지어 Partial<> 은? 그것마저도 더 짧게 줄여줍니다!

### typeof

상수값의 형태에 해당하는 타입을 정의하고 싶을 때도 있을 수 있습다. 그 때 사용하는것이 typeof 입니다.

여기서의 typeof 는 우리가 흔히 아는 JS 런타임의 typeof 와는 명백히 다릅니다.

```tsx
const INIT_OPTIONS = {
  witdh:100,
  height:50,
  color:'FFF000',
  label:'VGA'
}

interface Options {
  width:number;
  height:number;
  color:string;
  label:string;
}

type Options2 = typeof INIT_OPTIONS
// type Options2 = {
//     witdh: number;
//     height: number;
//     color: string;
//     label: string;
// }
```

사실… 이것도 앞선 keyof 와 똑같습니다. Options 와 같은 interface 를 생성하고싶을 때. 그냥 고생고생하면서 하나하나 작성하지 말고 typeof 쓰면 한줄만에 간결하게 구현할 수 있습니다.

### 결론

TS 의 타입에도 DRY 원칙은 적용되어야 합니다.

제너릭은 타입을 위한 함수와도 같습니다.

TS 에서의 DRY 원칙을 가장 확실하게 수행할 수 있는 방법은 제너릭을 잘 활용하는 것입니다.

### 개인의견

아직까진 제너릭을 이해도, 사용도 제대로 못하는 상황이지만

지금까지의 아이템중에 제일 좀 쓸모있는 실전에 써먹을법한 챕터였던 것 같습니다.

## [ Item15 ] 동적 데이터에 인덱스 시그니처 사용하기
---

### 동적 데이터에 인덱스 시그니처 사용하기

어떤 값이 들어올 지 모르는 상태에서 타입을 정의해야 하는 경우가 분명히 생깁니다.

그 경우 사용할 수 있는게 ‘인덱스 시그니처’ 입니다.

```tsx
type test = [property: string]:string
```

위와 같이 사용하는 방법이 ‘인덱스 시그니처’ 이며 다음 세가지 의미를 내포합니다.

1. 키의 이름 : 키의 위치만 표시하는 용도로 타입 체커에서는 활용하지 않는 참고정보.
2. 키의 타입 : string 이나 number 또는 symbol의 조합이어야 하지만 일반적으론 string을 사용합니다.
3. 값의 타입 : 어떤 타입이든 될 수 있습니다.

### 인덱스 시그니처를 사용했을 때의 단점

1. 모든 키를 허용합니다. 그게 잘못된 키일지라도.
2. 특정 키가 필요하지 않아집니다. 따라서 {} 라는 빈 객체도 해당 타입에 속하게 됩니다.
3. 키마다 무조건 하나의 타입을 가져야 하기 때문에 다른 타입을 가질 수 없습니다.
4. 타입스크립트의 자동완성과 같은 언어 서비스를 활용할 수 없습니다.

### Why?

단점은 명확합니다. 그렇다면 왜 사용하는걸까요?

P 86의 예제만 보더라도 이미 속성이 명확한 경우엔 인덱스 시그니처보다는 타입이 명시되는 interface 를 사용하는것이 확실히 좋습니다.

하지만 우리 모두가 알듯이 어느 순간 어떤 값이 들어올 지 모르는 상태에서 타입을 정의해야하는 경우가 생깁니다.

그 경우에 비록 불완전한 타입선언이지만 타입선언이 필요할 때 사용하는 것이 인덱스 시그니처라고 할 수 있겠습니다.

### 결론

이 아이템에서는 선택변수와 같이 인덱스 시그니처를 우회하는 여러가지 스킬들을 알려줍니다.

확실히 해야 할 부분은 런타임까지 객체의 속성을 알 수 없는 경우에만 인덱스 시그니처를 사용해야 한다는 것 입니다.

이외에 가능한 한 최대한의 경우엔 정확한 타입을 명시해주는것이 좋습니다.