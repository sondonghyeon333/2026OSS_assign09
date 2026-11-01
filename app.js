const API_URL = "https://6ae2c6fcbbb54129229a63f1.mockapi.io/games";
let games = [];
// Get 조회
async function loadGames() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("HTTP " + response.status);
    games = await response.json();
    console.log(games);
    document.querySelector("#status").textContent = games.length + "개 게임 조회 완료";
  } catch (error) {
    document.querySelector("#status").textContent = "조회 실패: " + error.message;
  }
}

loadGames();