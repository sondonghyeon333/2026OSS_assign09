const API_URL = "https://6ae2c6fcbbb54129229a63f1.mockapi.io/games";
const form = document.querySelector("#gameForm");
const list = document.querySelector("#gameList");
const status = document.querySelector("#status");
const saveButton = document.querySelector("#saveButton");
const search = document.querySelector("#search");
let games = [];
//목록 출력
function renderGames(items) {
  list.replaceChildren();
  items.forEach(function(game) {
    const tr = document.createElement("tr");
    [game.title, game.genre, game.platform, game.price, game.rating].forEach(function(value) {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tr.appendChild(document.createElement("td"));
    list.appendChild(tr);
  });
}

function readForm() {
  return {
    title: document.querySelector("#title").value.trim(),
    genre: document.querySelector("#genre").value.trim(),
    platform: document.querySelector("#platform").value.trim(),
    price: Number(document.querySelector("#price").value),
    rating: Number(document.querySelector("#rating").value)
  };
}


//오류 처리
function validateGame(game) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  if (game.title.length < 2) { status.textContent = "제목은 2글자 이상 입력하세요."; return false; }
  if (game.genre.length === 0 || game.platform.length === 0) { status.textContent = "장르와 플랫폼을 입력하세요."; return false; }
  if (game.price < 0 || !Number.isFinite(game.price)) { status.textContent = "가격은 0 이상이어야 합니다."; return false; }
  if (game.rating < 0 || game.rating > 5 || !Number.isFinite(game.rating)) { status.textContent = "평점은 0~5 사이여야 합니다."; return false; }
  return true;
}
//게임 추가
async function addGame(game) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game)
  });
  if (!response.ok) throw new Error("HTTP " + response.status);
  await loadGames();
}

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  try {
    await addGame(readForm());
    form.reset();
    status.textContent = "게임 등록 완료";
  } catch (error) {
    status.textContent = "등록 실패: " + error.message;
  }
});

// Get 조회
async function loadGames() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("HTTP " + response.status);
    games = await response.json();
    renderGames(games);
    status.textContent = games.length + "개 게임 조회 완료";
  } catch (error) {
    status.textContent = "조회 실패: " + error.message;
  }
}

loadGames();

