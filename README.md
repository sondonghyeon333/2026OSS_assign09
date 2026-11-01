# Games CRUD Service

## 1. Deployment

- GitHub URL: https://github.com/2026-2-OSS/assign09-c02-22300385
- Vercel URL: https://2026ossassign09-beta.vercel.app/
- MockAPI Endpoint: https://6ae2c6fcbbb54129229a63f1.mockapi.io/games

## 2. Service

### 주제
Fetch API와 MockAPI를 활용한 게임 관리 CRUD 서비스

### 데이터 필드
- id: 게임 고유 번호
- title: 게임 제목
- genre: 게임 장르
- platform: 게임 플랫폼
- price: 게임 가격
- rating: 게임 평점

### 주요 기능
- GET: MockAPI에서 게임 목록 조회
- POST: 새로운 게임 등록
- PATCH: 기존 게임 정보 수정
- DELETE: 삭제 확인 후 게임 삭제
- Validation: 제목, 장르, 플랫폼, 가격, 평점 입력값 검증
- Search: 게임 제목 검색
- Error Handling: API 요청 실패 시 오류 메시지 표시 및 중복 클릭 방지

## 3. Key Learning

1. **fetch()와 REST API**
   - GET, POST, PATCH, DELETE 요청을 이용하여 서버의 데이터를 조회하고 수정하는 방법을 배웠다.

2. **JSON과 async/await**
   - JSON.stringify()와 response.json()으로 데이터를 변환하고, async/await로 서버 요청의 결과를 처리하는 방법을 배웠다.

3. **DOM과 이벤트 처리**
   - addEventListener()와 DOM 조작으로 사용자 입력을 처리하고, 서버에서 가져온 데이터를 화면에 출력하는 방법을 배웠다.

## 4. AI / Search Usage

- 사용 도구: ChatGPT
- 사용 목적:  오류 해결, 코드 검토, 내가 이해한 코드 작성 순서가 맞는지 확인
- 참고 및 반영한 내용:
  - 오류 메시지 처리와 중복 클릭 방지 코드 검토
  - 단계별 코드 구성 참고
- 본인 추정 AI 코드 기여율: 7%
- 배운 점: 브라우저에서 발생하는 경고와 실제 실행 오류의 차이를 이해했고, 오류 처리와 서버 통신 과정을 학습했다.

## 5. Problem & Solution / Reflection

### Problem 1. status 변수 경고
- 문제: status.textContent 사용 시 deprecated 경고가 발생하였다.
- 해결: status가 브라우저의 기존 속성과 충돌할 수 있다는 점을 확인하고, 변수명을 statusMessage로 변경하였다.

### Problem 2. GET 요청 방식에 대한 이해
- 문제: GET 조회 코드에 method: "GET"이 없어 요청 방식이 헷갈렸다.
- 해결: fetch()는 별도로 method를 지정하지 않으면 GET 방식으로 요청한다는 것을 확인하였다.

### Problem 3. 게임 수정 기능 구현
- 문제: PATCH 요청 코드만으로는 기존 게임 정보를 수정하는 전체 과정을 이해하기 어려웠다.
- 해결: find()로 수정할 게임을 찾고, 기존 값을 폼에 표시한 뒤 PATCH 요청으로 수정하도록 구성하였다.

### Reflection
이번 과제를 통해 JavaScript 배열에서만 데이터를 관리하는 방식과 MockAPI 서버에 데이터를 저장하는 방식의 차이를 알게 되었다. 또한 fetch()를 이용하여 CRUD 기능을 구현하고, async/await와 try/catch를 활용해 비동기 요청과 오류를 처리하는 방법을 학습할 수 있었다.
