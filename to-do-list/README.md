## To do list

> Vanilla JS로 To-do List 구현하기

- 투두-리스트 구현
- json-server를 활용해서 로컬에 Mock REST API 구축 및 연동
- 기본적인 데이터 처리인 생성, 읽기, 수정, 삭제(CRUD)를 구현
- Pagenation 적용

---

## 적용 기술

### strict mode

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode

- 엄격하게 문법 검사를 실시하여 기존에는 무시되던 오류를 발생시킴

### json-server

https://github.com/typicode/json-server

- 짧은 시간에 REST API를 구축해주는 패키지
- 실제 프로덕션에서는 사용하지 않음
- npm을 통해 설치 가능

### DOMContentLoaded

https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event

- 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생

```
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
```

### Javacript fetch API

https://developer.mozilla.org/ko/docs/Web/API/Fetch_API

- AJAX 요청을 하기 위한 기술
- AJAX란 서버에서 추가 정보를 비동기적으로 가져올 수 있게 해주는 포괄적인 기술을 나타내는 용어
- XHR, JQuery, Fetch 등의 선택지가 있지만 이번 강의에서는 최신 기술인 fetch API를 사용


### HTML data-\*

https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes

- custom attibute를 만들 때 사용
- 표준이 아닌 속성이나 추가적인 DOM 속성

#### javascript에서 접근하기

- dataset 객체를 통해 data 속성을 가져오기 위해서는 속성 이름의 data- 뒷 부분을 사용
- 대시들은 camelCase로 변환되는 것에 주의

```
var article = document.getElementById('electriccars');

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

#### javascript로 할당하기

```
var article = document.getElementById('electriccars');

article.dataset.columns = 3
article.dataset.indexNumber = "12314"
```
