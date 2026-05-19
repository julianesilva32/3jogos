const botoes = document.querySelectorAll(".botao");
const startBtn = document.getElementById("start");
const faseTexto = document.getElementById("fase");
const recordeTexto = document.getElementById("recorde");

let sequencia = [];
let jogador = [];
let fase = 0;
let podeJogar = false;

let recorde = localStorage.getItem("recorde") || 0;
recordeTexto.innerText = recorde;

// Sons dos animais
const sons = {

  // VACA
  green: new Audio(
    "https://www.soundjay.com/animals/cow-moo-1.mp3"
  ),

  // MACACO
  red: new Audio(
    "https://www.soundboard.com/mediafiles/mj/MjQxNjI2NzYyNDE2NTY_UjE0lL2.mp3"
  ),

  // GATO
  yellow: new Audio(
    "https://www.soundjay.com/animals/cat-meow-2.mp3"
  ),

  // CACHORRO
  blue: new Audio(
    "https://www.soundjay.com/animals/dog-bark-1.mp3"
  )
};

startBtn.addEventListener("click", iniciarJogo);

function iniciarJogo() {
  sequencia = [];
  jogador = [];
  fase = 0;
  proximaRodada();
}

function proximaRodada() {
  jogador = [];
  fase++;

  faseTexto.innerText = fase;

  const cores = ["green", "red", "yellow", "blue"];
  const corAleatoria = cores[Math.floor(Math.random() * 4)];

  sequencia.push(corAleatoria);

  mostrarSequencia();
}

function mostrarSequencia() {
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

botoes.forEach(botao => {
  botao.addEventListener("click", () => {

    if (!podeJogar) return;

    const cor = botao.dataset.cor;

    jogador.push(cor);

    animarBotao(cor);

    verificarJogada(jogador.length - 1);
  });
});

function animarBotao(cor) {

  const botao = document.querySelector(
    `[data-cor="${cor}"]`
  );

  botao.classList.add("ativo");

  // toca o som
  sons[cor].currentTime = 0;
  sons[cor].play();

  // deixa o áudio curto
  setTimeout(() => {
    sons[cor].pause();
    sons[cor].currentTime = 0;
  }, 400);

  setTimeout(() => {
    botao.classList.remove("ativo");
  }, 300);
}

function verificarJogada(indice) {

  if (jogador[indice] !== sequencia[indice]) {

    alert("Você errou! 😢");

    if (fase > recorde) {
      recorde = fase;
      localStorage.setItem("recorde", recorde);
      recordeTexto.innerText = recorde;
    }

    iniciarJogo();

    return;
  }

  if (jogador.length === sequencia.length) {

    setTimeout(() => {
      proximaRodada();
    }, 1000);
  }
}