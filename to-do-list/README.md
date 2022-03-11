# 👨‍💻 To do list Project

> Vanilla JS로 To-do List 구현하기

- 투-두 리스트 구현
- json-server를 활용해서 로컬에 Mock REST API 구축 및 연동
- 기본적인 데이터 처리인 생성, 읽기, 수정, 삭제(CRUD)를 구현
- Pagenation 처리

---

## 🛠 적용한 기술

### strict mode

- strict mode는 엄격하게 문법 검사를 실시하여 기존에는 무시되던 오류를 발생시킴

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode)



### json-server

- 짧은 시간에 REST API를 구축해주는 패키지
- 실제 프로덕션에서는 사용하지 않음 (테스트용 MOCK data)

[https://github.com/typicode/json-server](https://github.com/typicode/json-server)



### DOMContentLoaded

- 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생 `스타일 시트, 이미지, 하위 프레임`의 로딩은 기다리지 않는다.
- HTML과 script가 로드된 시점에 발생하는 이벤트이다.
- onload 이벤트보다 먼저 발생한다. 빠른 실행속도가 필요할때 적합하다.
- (IE8 이하에서는 지원하지 않는다.)

```
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
```

[https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event](https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event)



### Javacript fetch API

- AJAX 요청으로 Back-End JSON Data를 가져온다.

[https://developer.mozilla.org/ko/docs/Web/API/Fetch_API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)



### Pagination

구현 목표 :
+ 한 페이지에 데이터 개수 5개
+ 한 화면에 페이지 개수 5개


페이지네이션을 구현하기 위한 설정값:
- currentPage: 현재 페이지
- totalCount: 총 데이터의 갯수 => 주로 backend에서 처리
- pageCount: 화면에 나타날 페이지 갯수
- limit: 한 페이지 당 나타낼 데이터의 갯수
- `json-server`의 paginate로 구현



### json-server Paginate

#### Paginate

> Use _page and optionally _limit to paginate returned data. In the Link header you'll get first, prev, next and last links.

```
GET /posts?_page=7
GET /posts?_page=7&_limit=20
```
10 items are returned by default


[https://github.com/typicode/json-server](https://github.com/typicode/json-server)


---

# 🖥 구현 결과

![todo-list](https://user-images.githubusercontent.com/89209626/157178857-c87821ea-9e07-41ca-ac6c-75ff25c32777.gif)

---

# 📝 프로젝트 회고: KPT

> Keep/ Problem/ Try

`KEEP` :
  + **json-server 사용 :** json-server을 처음 사용해보았다. 사실 firebase로 진행했던 프로젝트가 있는데, 정말 간단한 검증용 데이터는 json-server로 충분할 것 같다. 아주 좋은 라이브러리를 알게되었다.
  + **공통 모듈화 :** 이번 프로젝트를 하면서 자주 쓰이는 함수를 공통 모듈로 빼서 작성하는게 편리하다는 것을 깨닳았다.
  + **Pagination :** 페이지 네이션을 구현하기 위해 이론을 학습하고 적용해 보았다.

`PROBLEM` :
  + **재사용 가능한 코드 작성 :** 코드를 작성하면서 재사용 가능하고, 더 나은 코드를 짤 수 있을 것 같다는 생각이 계속 떠올랐다.
  + **Pagination :** 페이지네이션을 구현하면서, 총 데이터의 개수를 가져오는 로직을 작성할지 고민이되었다.

`TRY` : 
  + **재사용 가능한 코드 작성 :** 실제 프로젝트에서 모듈로 넣을 때, 재사용가능하게 리팩토링해야겠다.