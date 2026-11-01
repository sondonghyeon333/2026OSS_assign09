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

