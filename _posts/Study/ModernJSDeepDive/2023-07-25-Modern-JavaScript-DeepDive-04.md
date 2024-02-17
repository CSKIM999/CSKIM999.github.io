---
layout: post
title: Modern Javascript Deepdive [ Chapter 04 변수 ]
date: 2023-07-25 01:18 +0900
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

## [ Chapter 04 ] 변수

### 변수란 무엇이고 왜 필요할까?

변수란 하나의 값을 저장하기 위해 확보한 메모리 공간 그 자체 혹은 메모리 공간을 식별하기 위해 붙인 상징적인 이름을 의미합니다.

즉 변수는 ‘그냥’ 존재하는 것이 아니라 메모리 상에 저장되는것을 의미한다는 뜻입니다.

메모리상에 운영체제가 아닌 개발자가 직접 접근하는것은 시스템상의 치명적 오류를 야기하기에 자바스크립트는 개발자의 메모리 직접 접근을 제한합니다.

JS에서는 컴파일러 또는 인터프리터에 의해 메모리 공간 주소로 치환되어 실행되기때문에, 개발자는 변수를 통해 메모리 주소에 접근할 수 있습니다.

### 식별자

흔히 변수 이름을 **‘식별자’** 라고도 부릅니다.

식별자는 앞서 말했듯 값이 아닌 메모리 주소를 기억하고 있다. 즉, 식별자가 값을 구별 & 식별 한다는 뜻은 식별자가 메모리 공간에 저장된 값에 접근할 수 있다는 의미입니다.

### 변수 선언

변수를 사용하기 위해선 반드시 선언이 필요합니다. 변수를 선언할 땐  var , let , const 키워드를 사용하며 ES6 전까지 var는  JS 에서 변수를 선언할 수 있는 유일한 방법이었습니다.

> var 키워드가 무결하다면 이후에 let 과 const 키워드가 생기지 않았겠죠?     
> var 키워드의 여러 단점 중 대표적 단점은 블록 레벨 스코프가 아닌 함수레벨 스코프를 지원한다는 점입니다.  
> 함수레벨 스코프의 문제점은 무엇보다 의도치 않은 전역변수를 선언해버릴 수 있는 문제입니다.    
> 전역변수의 문제점은 너무나도 많아서 추후에 chapter를 따로 빼서 기술 할 예정입니다. 
{: .prompt-info}

### 알아두면 좋을 키워드
TDZ (Temporary Dead Zone)   
GC (Garbage Collector)