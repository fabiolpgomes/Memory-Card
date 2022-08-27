// construir minha classe

class MemoryGame {
  constructor() {
    this.userName = ""; //vai vir do inputName
    this.points = 10; //estado de derrota quando points <= 0
    this.deck = [
      "./assets/harmonia.svg",
      "./assets/poder.svg",
      "./assets/projetar.svg",
      "./assets/refletir.svg",
      "./assets/harmonia.svg",
      "./assets/poder.svg",
      "./assets/projetar.svg",
      "./assets/refletir.svg",
    ];
    this.cardsSelected = [];
  }

  renderDeck() {
    //randomizar a array this.deck e entregar ela pro forEach já randomizada.
    let deckRandom = this.deck.sort(() => {
      return Math.random() - 0.5;
    });

    //capturando o meu board
    let board = document.querySelector("#board");

    //iterar pelo meu deck
    deckRandom.forEach((imgSrc) => {
      let imgTag = document.createElement("img"); // <img />
      imgTag.src = imgSrc; // <img src="./assets/algumacoisa.svg" /> FRONT - CARD
      imgTag.classList.add("hide"); // <img src="./assets/algumacoisa.svg" class="hide" />
      imgTag.classList.add("cardFront"); // <img src="./assets/algumacoisa.svg" class="hide" />

      let backImg = document.createElement("img"); // <img />
      backImg.src = "./assets/fe.svg";
      backImg.classList.add("show");
      backImg.classList.add("cardBack");

      board.appendChild(imgTag);
      board.appendChild(backImg);
    });
  }

  flip(card) {
    //pegar a carta virada e adicionar na array this.cardsSelected
    this.cardsSelected.push(card);

    if (this.cardsSelected.length === 2) {
      console.log("duas cartas selecionadas. vamos checar se elas são iguais!");
      this.checkPair();
    }
  }

  checkPair() {
    if (this.cardsSelected[0].src === this.cardsSelected[1].src) {
      console.log("cartas iguais! Acertou! :D");

      this.cardsSelected[0].classList.add("turn");
      this.cardsSelected[1].classList.add("turn");

      this.cardsSelected = [];
      this.checkStatus();
    } else {
      console.log("Errou!! Cartas diferentes");
      this.points -= 2;

      setTimeout(() => {
        console.log("FECHAR AS DUAS CARTAS");
        console.log(this.cardsSelected);

        //escondendo as cartas que estão abertas (card-front)
        this.cardsSelected[0].className = "hide cardFront";
        this.cardsSelected[1].className = "hide cardFront";

        //MOSTRANDO os card-back
        this.cardsSelected[0].nextElementSibling.className = "show cardBack";
        this.cardsSelected[1].nextElementSibling.className = "show cardBack";

        this.checkStatus();

        this.cardsSelected = [];
      }, 1000);
    }
  }

  checkStatus() {
    console.log("checando se alguem ganhou ou perdeu");

    if (this.points === 0) {
      //PERDER POR PONTOS
      console.log("VOCÊ PERDEU O JOGO");
      let cardsFront = document.querySelectorAll(".cardFront");
      let cardsBack = document.querySelectorAll(".cardBack");

      console.log(cardsFront);
      console.log(cardsBack);

      cardsFront.forEach((cardFront) => {
        cardFront.className = "show";
      });

      cardsBack.forEach((cardBack) => {
        cardBack.className = "hide";
      });

      let div = document.createElement("div");
      div.innerHTML = `
        Você <strong>perdeu</strong>, meu fi!
      `;
      let board = document.querySelector("#board");
      board.appendChild(div);
    }

    let cardsTurn = document.querySelectorAll(".turn");
    if (cardsTurn.length === 8) {
      //estado de vitória
      console.log("Ganhou o jogo!!");

      let board = document.querySelector("#board");
      let score = document.querySelector("#score");
      board.style.display = "none";
      score.style.display = "none";

      let div = document.createElement("div");
      div.innerHTML = `
        <h1>Você ganhou ${this.userName}!! Parabéns!!!!!!</h1>
      `;
      let gameDiv = document.querySelector("#game");
      gameDiv.appendChild(div);
    }
  }
}
