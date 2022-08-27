//manipulo o dom

//instanciando nossa classe MemoryGame
const game = new MemoryGame();

const buttonStart = document.querySelector("#inicio button");
const inicio = document.querySelector("#inicio");
const inputName = document.querySelector("#inicio input");
const name = document.querySelector("#name");
const points = document.querySelector("#points");
const score = document.querySelector("#score");

buttonStart.addEventListener("click", () => {
  if (inputName.value === "") {
    return;
  }
  //criar as cartas randomizadas
  game.renderDeck();

  //apagar a tela de inicio
  inicio.style.display = "none";
  score.style.display = "flex";

  //setar o userName do atributo da classe
  game.userName = inputName.value;
  //adicionar o nome na div score
  name.innerText = game.userName;
  //adicionar os points na div score
  points.innerText = game.points;

  settingUpGame();
});

function settingUpGame() {
  const allCardsBack = document.querySelectorAll(".show");

  allCardsBack.forEach((cardBack) => {
    //para cada carta verde, criar um event Listener para cada
    cardBack.addEventListener("click", () => {
      let cardFront = cardBack.previousElementSibling;

      cardBack.className = "hide cardBack";
      cardFront.className = "show cardFront";

      game.flip(cardFront);

      console.log(game.points);

      points.innerText = game.points;
    });
  });
}
