# DND 2기 Team-7 Dabeen

### 서비스 기획내용
우리동네 작은도움 서비스
> 서비스 이용자들의 주변(동네)에서 도움을 주고받게 할 수 있는 플랫폼을 제공

### 개발환경
* frontEnd
    > React Redux Redux-Saga Next.js
* backEnd
    > Springboot mySQL
----------------
### Git
Git-Flow
* Branch
    - master  
        최종적인 기능을 갖춘 웹사이트 브랜치
    - test  
        백 엔드 개발사항과 프론트 엔드 개발사항을 합하여 테스트하기 위한 브랜치 
    - backEnd  
        백 엔드 팀의 개발사항을 종합한 브랜치
    - frontEnd  
        프론트 엔드 팀의 개발사항을 종합한 브랜치  
          
    각 팀원들의 브랜치
    - choi
    - lee
    - kwon  
    - mun
    - pyo  
  
Commit Message rules
1.	메시지 양식은 “구현 중인 기능 : 구현 중인 세부사항” 으로 작성한다.  
    Ex) 검색 : 유저 검색 구현 중
2.	메시지의 내용은 되도록 간결하게 작성하며, 상세히 서술해야 할 내용은 Tag를 이용한다.
3.	메시지는 프로그램 내용 부분을 제외하고 알아보기 쉽게 한글로 적는다.
4.	구현 중인 세부사항 부분에 기능을 알아볼 수 있는 선에서 36자 안으로 남기고 싶은 말을 추가해도 된다.
  
branch 생성 유의명령어
```
git init
git remote add origin https://github.com/geonwoomun/DND2_Dabeen.git
git pull origin master
git branch [branch명]
git push origin [branch명]
```