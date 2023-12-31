---
layout: post
title: ESLint Setting Template
date: 2023-12-29 17:49 +0900
description: CSKIM's-ESLint-Setting-Template
category: [Study, Setting ]
image:
  path: /assets/img/ESLint.png
---
<!-- TOC TEST -->
<!-- # ESLint -->
## 설정에 앞서
설정에 앞서 코드의 통일성과 앞으로의 더욱 나은 개발경험을 위해 앞으로의 프로젝트에서 Lint 설정은 어느정도 규격화 된 설정을 만들어두고 그것을 따라 지키도록 할 예정이다.
나름의 근거를 바탕으로 수행 할 예정이라 다른 협업자가 생기더라도 설득할 수 있으리라 믿는다.

CRA는 기본 ESLint 설정이 되어있으나, Vite나 Next.js 의 경우엔 그렇지 않으므로 커스텀 세팅값이 필요하다.

### Airbnb Rule
사실 ESLint 에서 제공하는 기본 설정값이 있긴 하다. 하지만 우테코에서도 추천하는 컨벤션인 Airbnb 컨벤션을 준수하면 더 좋지 않을까 싶다. 실제로는 기본 설정값 정도만 준수하면 되는 곳이 있을 수 있지만, 느슨하다 빡센 것 보다는 빡센 컨벤션에서 느슨한건 어렵지 않으니까.

## ESLint 설치
### ESLint 설치 with CLI
```bash
npm i eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks -D
```

만약 CRA 같은 CLI를 사용 할 경우 `.eslintrc.json` 을 자동으로 생성해주지만, 그렇지 않은 경우 직접 만들어야 하는 경우가 있다.
```bash
$ eslint --init
```

이후 질문지에 적절하게 답변. 
내 경우엔
> How would you like to use ESLint?  
> 2 ) To check syntax and find problems // Prettier 를 사용 할 것이므로 굳이 3번을 선택할 이유 X

> What type of modules does your project use?  
> 1 ) JavaScript modules (import/export) // CommonJS 모듈 쓰는 흑우 없제?

> Which framework does your project use?  
> 1 ) React // React, Next.js 등등 대부분의 프레임워크는 React 기반이라는 점을 명심하자

> Does your project use TypeScript?  
> 2 ) Yes. // YES !

> Where does your code run?  
> 1 ) Browser // 우린 React , Next 등 Browser Script 를 작성할거니까 Browser 선택. 만약 Node.js 에서 실행한다면 2번을 선택하는게 맞다.

> What format do you want your config file to be in?  
> 3 ) JSON // 코드 구성파일을 어떤 파일로 만들 것인가? JS도 있겠지만 나는 JSON이 더 편하다

> Would you like to install them now?  
> Y // 그럼 지금 설치하지 언제 설치해

> Which package manager do you want to use?  
> 1 ) npm // 나는 npm을 사용중이다. yarn도 나중에 써봐야지

### .eslintrc.js
```js
module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
	rules: {
		"react/react-in-jsx-scope": 0,
		"react/prefer-stateless-function": 0,
		"react/jsx-filename-extension": 0,
		"react/jsx-one-expression-per-line": 0,
	},
};
```

이 정도로 설정하면 내가 원하는 초기세팅이 완료된다.
