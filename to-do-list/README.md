## To do list

> Vanilla JS로 To-do List 구현하기

- 투-두 리스트 구현
- json-server를 활용해서 로컬에 Mock REST API 구축 및 연동
- 기본적인 데이터 처리인 생성, 읽기, 수정, 삭제(CRUD)를 구현
- Pagenation 처리

---

## 적용 기술

### strict mode

- strict mode는 엄격하게 문법 검사를 실시하여 기존에는 무시되던 오류를 발생시킴

(https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode)[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode]

---

### json-server

- 짧은 시간에 REST API를 구축해주는 패키지
- 실제 프로덕션에서는 사용하지 않음 (테스트용 MOCK data)

(https://github.com/typicode/json-server)[https://github.com/typicode/json-server]

---

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

(https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event)[https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event]

---

### Javacript fetch API

- AJAX 요청을 하기 위한 기술
- AJAX란 서버에서 추가 정보를 비동기적으로 가져올 수 있게 해주는 포괄적인 기술을 나타내는 용어
- XHR, JQuery, Fetch 등의 선택지가 있지만 이번 강의에서는 최신 기술인 fetch API를 사용

(https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)[https://developer.mozilla.org/ko/docs/Web/API/Fetch_API]

---

### Pagination

구현 목표 :
+ 한 페이지에 데이터 개수 5개
+ 한 화면에 페이지 개수 5개


페이지네이션을 구현하기 위한 설정값:
- currentPage: 현재 페이지
- totalCount: 총 데이터의 갯수 => 주로 backend에서 처리
- pageCount: 화면에 나타날 페이지 갯수
- limit: 한 페이지 당 나타낼 데이터의 갯수
- json-server의 paginate로 구현

---

### json-server Paginate

#### Paginate
Use _page and optionally _limit to paginate returned data.

In the Link header you'll get first, prev, next and last links.

```
GET /posts?_page=7
GET /posts?_page=7&_limit=20
```
10 items are returned by default


(https://github.com/typicode/json-server)[https://github.com/typicode/json-server]


---

## Result

![todo-list](https://user-images.githubusercontent.com/89209626/157178857-c87821ea-9e07-41ca-ac6c-75ff25c32777.gif)