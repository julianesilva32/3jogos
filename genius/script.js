const playBtn =
  document.getElementById("playBtn");

const namePanel =
  document.getElementById("namePanel");

const inputPlayer1 =
  document.getElementById("player1");

const inputPlayer2 =
  document.getElementById("player2");

const botoes =
  document.querySelectorAll(".botao");

const startBtn =
  document.getElementById("startBtn");

const restartBtn =
  document.getElementById("restartBtn");

const roundTexto =
  document.getElementById("round");

const scoreTexto =
  document.getElementById("score");

const highScoreTexto =
  document.getElementById("highScore");

const mensagem =
  document.getElementById("message");

/* VARIÁVEIS */

let sequencia = [];

let jogador = [];

let rodada = 0;

let podeJogar = false;

let jogadorAtual = 1;

let pontos1 = 0;

let pontos2 = 0;

/* NOMES */

let nomeJogador1 = "";

let nomeJogador2 = "";

/* RECORDE */

let recorde =
  localStorage.getItem("recorde") || 0;

highScoreTexto.innerText = recorde;

/* SONS */

const sons = {

  green: new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  ),

  red: new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
  ),

  yellow: new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  ),

  blue: new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  )
};

/* BOTÃO INICIAR */

startBtn.addEventListener("click", () => {

  namePanel.style.display = "flex";
});

/* BOTÃO REINICIAR */

restartBtn.addEventListener(
  "click",
  iniciarJogo
);

/* BOTÃO COMEÇAR DO PAINEL */

playBtn.addEventListener("click", () => {

  nomeJogador1 =
    inputPlayer1.value || "Jogador 1";

  nomeJogador2 =
    inputPlayer2.value || "Jogador 2";

  namePanel.style.display = "none";

  iniciarJogo();
});

/* INICIAR JOGO */

function iniciarJogo(){

  sequencia = [];

  jogador = [];

  rodada = 0;

  pontos1 = 0;

  pontos2 = 0;

  jogadorAtual = 1;

  scoreTexto.innerText = "0 x 0";

  mensagem.innerHTML =
    `Vez de ${nomeJogador1}`;

  proximaRodada();
}

/* NOVA RODADA */

function proximaRodada(){

  jogador = [];

  rodada++;

  roundTexto.innerText = rodada;

  const cores = [
    "green",
    "red",
    "yellow",
    "blue"
  ];

  const corAleatoria =
    cores[Math.floor(Math.random() * 4)];

  sequencia.push(corAleatoria);

  mostrarSequencia();
}

/* MOSTRAR SEQUÊNCIA */

function mostrarSequencia(){

  podeJogar = false;

  sequencia.forEach((cor, index) => {

    setTimeout(() => {

      animarBotao(cor);

    }, (index + 1) * 700);

  });

  setTimeout(() => {

    podeJogar = true;

  }, sequencia.length * 700 + 500);
}

/* CLIQUES */

botoes.forEach(botao => {

  botao.addEventListener("click", () => {

    if(!podeJogar) return;

    const cor = botao.dataset.cor;

    jogador.push(cor);

    animarBotao(cor);

    verificarJogada(
      jogador.length - 1
    );
  });
});

/* ANIMAÇÃO */

function animarBotao(cor){

  const botao = document.querySelector(
    `[data-cor="${cor}"]`
  );

  botao.classList.add("active");

  sons[cor].currentTime = 0;

  sons[cor].play();

  setTimeout(() => {

    botao.classList.remove("active");

  }, 300);
}

/* VERIFICAR */

function verificarJogada(indice){

  if(
    jogador[indice]
    !==
    sequencia[indice]
  ){

    if(jogadorAtual === 1){

      pontos2++;

      jogadorAtual = 2;

      mensagem.innerHTML =
        `${nomeJogador2} pontuou!`;

    }else{

      pontos1++;

      jogadorAtual = 1;

      mensagem.innerHTML =
        `${nomeJogador1} pontuou!`;
    }

    atualizarPlacar();

    setTimeout(() => {

      mensagem.innerHTML =
        jogadorAtual === 1
        ? `Vez de ${nomeJogador1}`
        : `Vez de ${nomeJogador2}`;

      proximaRodada();

    }, 1200);

    return;
  }

  if(
    jogador.length
    ===
    sequencia.length
  ){

    mensagem.innerHTML =
      jogadorAtual === 1
      ? `${nomeJogador1} acertou!`
      : `${nomeJogador2} acertou!`;

    setTimeout(() => {

      jogadorAtual =
        jogadorAtual === 1 ? 2 : 1;

      mensagem.innerHTML =
        jogadorAtual === 1
        ? `Vez de ${nomeJogador1}`
        : `Vez de ${nomeJogador2}`;

      proximaRodada();

    }, 1000);
  }
}

/* PLACAR */

function atualizarPlacar(){

  scoreTexto.innerText =
    `${pontos1} x ${pontos2}`;

  const maiorPontuacao =
    Math.max(pontos1, pontos2);

  if(maiorPontuacao > recorde){

    recorde = maiorPontuacao;

    localStorage.setItem(
      "recorde",
      recorde
    );

    highScoreTexto.innerText =
      recorde;
  }
}