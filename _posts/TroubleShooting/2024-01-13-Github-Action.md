---
layout: post
toc : true
title: Github Action를 활용한 Github Pages 배포
date: 2024-01-13 18:30 +0900
description: TroubleShooting Log
category: [Project, Trouble Shooting]
tags: Github-Action
image:
  path: /assets/img/TroubleShooting.png
---
# 로컬 빌드파일 푸시했는데 배포가 제대로 안돼요!
## 라이브러리 버전 의존성 오류
### 발견오류
오래전에 진행한 프로젝트를 리팩터링 후 빌드해서 업로드하자, 오히려 에러가 발생하며 비어있는 페이지가 배포됨.

또한 원래 GitHub Page의 Deploy from a branch 옵션을 사용해서 로컬에서 빌드한 파일을 push 하는 방식으로 배포를 진행했는데, 원래대로라면 그대로 하면 될 것을 Library version Dependency로 추정되는 이유로 인해 로컬 빌드파일이 정상적으로 배포되지 않음.  


## 오류 해결방향
소프트웨어 마에스트로 과정을 거치며 CI/CD 의 중요성을 너무 깊이 체감하여, 마침 다음 프로젝트에 도입 할 계획이었던 GitHub Action을 사용한 CI/CD 를 목표로 세웠다.

글의 카테고리는 트러블슈팅이지만 이후에 적을 내용은 **깃헙액션 & 깃헙페이지 배포 프로세스**에 가깝다.
## 혹시 Github Action을 처음 사용한다면?
> [참고] 아래 코드를 그대로 가져다 쓴다면 deploy 과정에서 에러가 발생할것입니다.
{: .prompt-info}
그 이유는 첫째로 제 프로젝트는 server와 client가 한 Repository 안에 있어서 build 및 working-directory 설정이 따로 되어있을 뿐더러,  
**둘째로 아직 당신은 Personal Access Token 을 발급받지 않았기 때문이다.**     
Github Action이 Github에 접근 후 동작을 취하기 위해선 Github을 처음 사용할 때 SSH키를 발급했듯이 Presonal Access Token을 발급받아 Action을 사용할 해당 Repository의 secret에 저장해주어야한다.

24년 1월 13일 기준, 
Github Action을 위한 토큰을 발급받는 절차를 페이지별로 구분하자면 다음과 같다.  

---
1. **우측 상단의 내 프로필 클릭**
	1. Settings 이동
2. **좌측 메뉴 중 최하단 Developer Settings 이동**
3. **Personal Access Token 드롭다운 열기**
	1. Tokens (classic) 클릭
	2. 우측 상단의 Generate new token 메뉴 열기
	3. Generate new token(classic) - For general use 이동
4. **New personal access token (classic) 페이지**
	1. Note : 토큰 이름 설정하기
	2. Expiration : 만료일자 설정하기
		   여기서 만약 Step 3.3 에서 Fine-grained 를 선택했다면 만료일자를 무한으로 설정이 불가능하다.
		   물론 `No Expiration` 을 선택하면 Github의 완곡한 만료일자 설정 제안을 볼 수 있다.
	3. Scope : 권한설정이라고 보면 된다. 나는 repo, workflow, write:packages 를 선택해줬다.
	4. 생성버튼 클릭
5. **토큰 복사 및 Secret 설정**
	1. 토큰을 생성하면 누가봐도 나 토큰이요! 하는 녹색배경의 블럭에 토큰이 생성된다. 이 토큰을 복사해두자.
	2. 이후 해당 토큰을 사용하고자 하는, 현재 Github Action을 붙이고자 하는 Repository로 이동
	3. Repository 의 Setting으로 이동 후 Secrets and variables 드롭다운 열기
	4. Actions의 Repository Secrets 블럭의 New reposirory secret 클릭
	5. 추후에 `github_token: $&lbrace;&lbrace; secrets.토큰이름 &rbrace;&rbrace;`처럼 접근할 예정이므로 토큰 이름과 토큰 정보를 기입해준다. 여기서의 `토큰이름` 은 추후에 .yml 파일을 작성할 때 사용된다.

---

## workflow .yml 파일 생성
Github Action 을 사용할것이라면 Github에게 어떤 행동을 해달라고 요청해야한다.     
여기서 '어떤 행동' 을 정의하는 것이 이 .yml 파일에 담긴다고 이해하면 될 듯 하다.  
.yml 파일의 구조는 대략 다음과 같다.    
```yaml
name: REPOSITORY_NAME

on:
    push:
    # 굳이 따옴표를 작성하지 않아도 되는데 YML 문법에 의해 작성
    branches: ["BRANCH NAME"] 

    pull: # push 뿐만 아니라 pull도!!
    branches: ['BRANCH NAME']

permission:
    contents : read

jobs:
    deploy:
        runs-on: ubuntu-latest 
        steps:
        - name: Checkout
        uses: actions/checkout@v3

        - name: Node.js
        uses: actions/setup-node@v3
        with:
        node-version: 20.x

        - name: Install Client Dependencies
        working-directory: ./client
        run: npm install --force

        - name: Build
        working-directory: ./client
        run: npm run build


        - name: Deploy Docs
        uses: peaceiris/actions-gh-pages@v3
        with:
        github_token: ${{ secrets.GH_ACTIONS_TOKEN }}
        publish_dir: ./client/build
 ```

각 Step 별로 간략하게 설명하자면    

name
: 이번 워크플로우의 이름을 지정한다.  

on
: 이번 워크플로우가 해당 Github Repository 의 어떤 행동이 이루어졌을 때 동작할 것인지 지정한다.   

permission
: 이번 워크플로우가 Repository에서 갖는 권한을 제어한다. PR을 만들거나 secret에 접근하는 등 여러가지 권한을 부여할 수 있다. 

jobs
: 워크플로우에서 실행하고싶은 작업들을 정의한다.  

secrets
: Github Secret 에 저장된 접근하고자 하는 값을 지정한다.  

## .yml 작성
참고로 
1. name
	크게 중요한 부분은 아니어서 그냥 간단하게 작성했다.
	```yml
	name: CRA CI/CD with Github Action
	```
2. on
	나는 소스코드를 Push했을때만 배포과정이 자동으로 진행되는것을 원하므로 `'main'` branch에 Push 액션이 발생할때만 실행되도록 한다.
	```yml
	on:
		push:
			branches:['main']
	```
3. permission
	 내가 알고 있는 바로는 permission 섹션을 따로 설정하지 않는 경우의 기본값은 다음과 같다.
	 - `actions`: `read`
	- `checks`: `write`
	- `contents`: `write`
	- `deployments`: `write`
	- `issues`: `write`
	- `packages`: `write`
	- `pull-requests`: `write`
	- `repository-projects`: `write`
	- `security-events`: `write`
	- `statuses`: `write`
	실제로 여러 블로그들의 깃헙액션 포스팅을 봐도 따로 permission을 설정해주지 않은것을 봐선 이정도 작업에선 굳이 설정할 필요는 없는 것 같다.
	참고로 write 옵션의 경우 읽기를 포함한 쓰기 로 read 옵션의 상위값이라고 이해하면 될 듯 하다.
4. jobs
	deploy를 위한 액션을 생성해보자
	```yml
	jobs:
	    deploy:
		    runs-on: ubuntu-latest 
		    steps:
			  - name: Checkout
		        uses: actions/checkout@v3
		
		      - name: Node.js
		        uses: actions/setup-node@v3
		        with:
		          node-version: 20.x
		
		      - name: Install Client Dependencies
		        run: npm install --force 
		        #권장되지 않으나, 이미 의존성이 엉킬만큼 엉킨 내 프로젝트에서만
		        # --force 옵션을 사용하기고 결정
		        working-directory: ./client
		
		      - name: Build
		        run: npm run build
		        working-directory: ./client
		
		      - name: Deploy Docs
		        uses: peaceiris/actions-gh-pages@v3
		        with:
		          github_token: ${{ secrets.GH_ACTIONS_TOKEN }}
		          publish_dir: ./client/build
	```
	무엇보다 jobs 는 복붙할 경우 **매우 높은 확률로 원하는 동작을 하지 않으므로** 대략적인 흐름을 이해하고 직접 작성하는것을 추천한다.
	
## 이게웬걸?
yml 작성을 마무리하고 action이 작동하기를 하염없이 기다렸다.
`Waiting for a runner to pick up this job...`
이라는 메세지를 본 지 15분째. 뭔가 잘못된 것을 직감하고 이 문제에 대해서 찾아보기로 했다.
[Github Action Waiting for a runner to pick up this job... Error](https://stackoverflow.com/questions/70959954/error-waiting-for-a-runner-to-pick-up-this-job-using-github-actions)
그 결과 위와같은 글을 보게 되어 ubuntu version의 오류인가 찾아보니 아니었다.
??? : -lastest.... 맞는데....?

그렇게 찬찬히 내 코드를 보던 중 발견하고 말았다.
```yml
jobs:
	deploy:
		runs-on: ununtu-latest # uNuntu????
```
직접 타이핑을 하다보니 우분투가 아닌 우눈투라고 작성했던 것.... 😭😭
`ubuntu-latest` 로 수정하고 push 해보니 3초도 안걸려서 실행이 되더라 😭😭

이후 2일간에 약 30번의 커밋을 통해 성공적으로 배포를 완료했다.


## 추가로 해 볼 사항
우선 깃헙액션을 활용한 배포는 성공적으로 마무리했다. 하지만 매 push마다 패키지를 설치하느라 대략 25초를 소요하고 있었다.
만약 Vite를 사용한 프로젝트라면 build 시간이 10초가 안걸리는데 패키지 설치하는데만 25초를 소요하는 것이다.
이것을 해결하기 위해 캐싱이 가능하다고 한다. 다음 기회엔 캐싱을 활용한 패키지설치 최적화를 진행해봐야겠다.