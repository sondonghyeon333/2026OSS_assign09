const API_URL = "https://6ae2c6fcbbb54129229a63f1.mockapi.io/games";
const form = document.querySelector("#gameForm");
const list = document.querySelector("#gameList");
const statusMessage = document.querySelector("#status");
const saveButton = document.querySelector("#saveButton");
const search = document.querySelector("#search");

let games = [];
let editingId = null;

// 목록 출력
function renderGames(items) {
  list.replaceChildren();

  items.forEach(function(game) {
    const tr = document.createElement("tr");

    [game.title, game.genre, game.platform, game.price, game.rating].forEach(function(value) {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });

    const td = document.createElement("td");

    // 수정 버튼
    const editButton = document.createElement("button");
    editButton.textContent = "수정";
    editButton.type = "button";

    editButton.addEventListener("click", function() {
      startEdit(game.id);
    });

    td.appendChild(editButton);

    // Commit 9: 삭제 버튼 추가
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function() {
      deleteGame(game.id);
    });

    td.appendChild(deleteButton);

    tr.appendChild(td);
    list.appendChild(tr);
  });
}

// 폼 입력값 읽기
function readForm() {
  return {
    title: document.querySelector("#title").value.trim(),
    genre: document.querySelector("#genre").value.trim(),
    platform: document.querySelector("#platform").value.trim(),
    price: Number(document.querySelector("#price").value),
    rating: Number(document.querySelector("#rating").value)
  };
}

// 입력값 검증
function validateGame(game) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  if (game.title.length < 2) {
    statusMessage.textContent = "제목은 2글자 이상 입력하세요.";
    return false;
  }

  if (game.genre.length === 0 || game.platform.length === 0) {
    statusMessage.textContent = "장르와 플랫폼을 입력하세요.";
    return false;
  }

  if (game.price < 0 || !Number.isFinite(game.price)) {
    statusMessage.textContent = "가격은 0 이상이어야 합니다.";
    return false;
  }

  if (game.rating < 0 || game.rating > 5 || !Number.isFinite(game.rating)) {
    statusMessage.textContent = "평점은 0~5 사이여야 합니다.";
    return false;
  }

  return true;
}

// POST: 게임 추가
async function addGame(game) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game)
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  await loadGames();
}

// 수정할 게임 정보 불러오기
function startEdit(id) {
  const game = games.find(function(item) {
    return item.id === id;
  });

  if (!game) return;

  editingId = id;

  document.querySelector("#title").value = game.title;
  document.querySelector("#genre").value = game.genre;
  document.querySelector("#platform").value = game.platform;
  document.querySelector("#price").value = game.price;
  document.querySelector("#rating").value = game.rating;

  saveButton.textContent = "게임 수정";
  statusMessage.textContent = "수정할 내용을 입력하세요.";
}

// PATCH: 게임 수정
async function updateGame(id, game) {
  const response = await fetch(API_URL + "/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game)
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  await loadGames();
}

// DELETE : 게임 삭제
async function deleteGame(id) {
  // 삭제하기 전 확인
  if (!confirm("정말 이 게임을 삭제하시겠습니까?")) {
    return;
  }

  try {
    const response = await fetch(API_URL + "/" + id, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    // 삭제한 게임이 수정 중이었다면 폼 초기화
    if (editingId === id) {
      form.reset();
      editingId = null;
      saveButton.textContent = "게임 추가";
    }

    // 삭제 후 목록 갱신
    await loadGames();
    statusMessage.textContent = "게임 삭제 완료";

  } catch (error) {
    statusMessage.textContent = "삭제 실패: " + error.message;
  }
}

// 게임 추가 또는 수정
form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const game = readForm();

  if (!validateGame(game)) {
    return;
  }

  try {
    if (editingId === null) {
      await addGame(game);
    } else {
      await updateGame(editingId, game);
    }

    form.reset();
    editingId = null;
    saveButton.textContent = "게임 추가";
    statusMessage.textContent = "저장 완료";

  } catch (error) {
    statusMessage.textContent = "저장 실패: " + error.message;
  }
});

// GET: 게임 목록 조회
async function loadGames() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    games = await response.json();
    renderGames(games);
    statusMessage.textContent = games.length + "개 게임 조회 완료";

  } catch (error) {
    statusMessage.textContent = "조회 실패: " + error.message;
  }
}

// 페이지 시작 시 자동 조회
loadGames();
