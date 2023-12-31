---
layout: post
title: Prettier Setting Template
date: 2023-12-29 18:29 +0900
description: CSKIM's-Prettier-Setting-Template
category: [Study, Setting ]
image:
  path: /assets/img/Prettier.png
---

# Prettier
## 설정에 앞서
prettier는 lint 와 함께 **협업** 에서 중요한 역할을 하는 플러그인이다. 
각자가 작성한 코드를 일정 규칙에 맞춰 포맷팅해주어 서로의 코드 보다 쉽게 이해할 수 있도록 도와주는 플러그인이기 때문에, 절대 정답은 없고 서로의 코드를 잘 이해할 수 있도록 돕는다면 그것이 올바른 사용법이라 믿는다.

기본적으로 VSCode에서 Prettier 확장프로그램을 설치하면 지정된 Default 값들이 존재한다. 그것을 건드리지 않고 사용해도 뭐 무방하지만, 우리 팀만의 컨벤션을 만들고싶다면 `.prettierrc.js` 파일을 생성해서 서로 공유하는 게 더 좋을 것이다.

## Prettier 설치
ESLint 와 Prettier 를 같이 사용하기 위해선 `eslint-config-prettier` 를 사용해야한다.
`prettier-eslint` 나 `eslint-plugin-prettier` 등이 있지만, Lint와 Prettier 자체에 대한 깊은 이해가 없다면, 대세를 따라가는게 혹시나 생길 이슈에 더 기민하게 대응할 수 있을 것이다.

```bash
npm i eslint-config-prettier --D
```

이후 `.eslintrc.js` 파일의 extends 에 prettier를 추가해준다.

```js
// .eslintrc.js
{
  "extends": [
    "some-other-config-you-use",
    // prettier 추가
    "prettier"
  ]
}
```


### 만약 VSCode 를 사용하고있다면
간단하게 좌측 확장 프로그램에서 Prettier를 검색해서 인증마크가 달린 Prettier를 설치해주면 된다.

이렇게만 하더라도 기본 Default 설정값으로 Prettier가 실행되며, 만약 커스텀하고싶다면 root폴더에 `.prettierrc` json 파일을 만들어서 설정해주어도 된다.


### 참고용 .prettierrc 설정값
```json
// .prettierrc
{
	"arrowParens": "always",
	"bracketSameLine": false,
	"bracketSpacing": true,
	"semi": true,
	"singleQuote": true,
	"jsxSingleQuote": true,
	"quoteProps": "as-needed",
	"trailingComma": "all",
	"singleAttributePerLine": false,
	"htmlWhitespaceSensitivity": "css",
	"vueIndentScriptAndStyle": false,
	"proseWrap": "preserve",
	"insertPragma": false,
	"printWidth": 80,
	"tabWidth": 2,
	"useTabs": true,
	"embeddedLanguageFormatting": "auto"
}
```
위 설정값들은 직접 하나하나 작성해 줄 수도 있지만, 
[프리티어 공식 페이지](https://prettier.io/) 에 가서 옵션 하나하나 설정해보고 가장 잘 맞는 값을 export 해올수도 있다.
