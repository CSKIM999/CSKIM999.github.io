---
layout: post
title: Effective Typescript 스터디 1주차 (Item 1 ~ 5)
date: 2023-06-17 03:18 +0900
description: Typescript Study
category: [Study, Effective TypeScript]
tags: Effective-Typescript
image:
  path: /assets/img/ets-thumbnail.png
---

![DesktopView](/assets/img/ets.png){:width='320'}

> 이 게시물은 SW 마에스트로 연수생 간 진행한 Effective Typescript 스터디의 개인 정리 내용입니다
{: .prompt-tip}

![DesktopView](/assets/img/타입계층도.png){:width='960'}
_Typescript 타입계층도_
## [ Item 01 ] TS 와 JS 의 관계 이해하기

### “타입스크립트는 자바스크립트의 상위 집합이다”

모든 자바스크립트 프로그램은 타입스크립트 라는 명제는 항상 성립하지만   
그 반대의 경우인 모든 타입스크립트 프로그램은 자바스크립트 프로그램 이라는 명제는 성립하지 않습니다.    
이와 같은 문제가 발생하는 이유는 타입스크립트의 가장 큰 특징인 타입 명시 문법 때문입니다.

초기의 JavaScript 는 간단한 기능을 구현하기 위해 만들어진 언어였습니다.   
그렇기에 느슨한 타입 관계가 간단한 기능 구현에 들어가는 공수를 크게 줄여 주었죠.

하지만 현재의 JavaScript는 초기의 의도와 다르게 복잡한 기능들을 수행하면서 
간단한 기능을 구현할 때 강점이었을 느슨한 타입 관계가 복잡한 기능을 구현해야 하면서 반대로 단점으로 작용하게 되었습니다.

따라서 타입스크립트는 정적 타입 시스템을 통해 코드 작성 과정에서 코드들을 의도한 대로 동작하도록 돕고 런타임에서 발생 할 수 있는 오류를 미리 찾아 가이드 해주어 작업을 도와줍니다.

### 결론
구구절절 얘기하긴 했으나, 해당 Item 의 골자는 TS가 JS보다 더욱 큰 범위에 존재하는 집합이라는 점입니다.    
추후에 다시 나올 개념이겠지만 타입을 집합이라고 생각하고 타입계층도를 보시면 조금 더 이해가 쉽습니다!

---

> [Migration 미완] 추가 작성 예정
{: .prompt-warning}