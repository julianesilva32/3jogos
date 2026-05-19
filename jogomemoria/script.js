let jogador1 = "Jogador 1";
let jogador2 = "Jogador 2";

function comecarJogo(){

  jogador1 =
    document.getElementById("nome1").value.trim()
    || "Jogador 1";

  jogador2 =
    document.getElementById("nome2").value.trim()
    || "Jogador 2";

  document.getElementById("jogador1Nome").innerHTML = jogador1;

  document.getElementById("jogador2Nome").innerHTML = jogador2;

  document.getElementById("vezJogador").innerHTML =
    `Vez de ${jogador1}`;

  document.getElementById("inicio").style.display = "none";

  document.getElementById("jogo").style.display = "flex";

  iniciarMemoria();
}

function iniciarMemoria(){

  const emojis = [

    '🥰','🥺','😂','😴',
    '😇','😜','😡','😆',

    '😇','🥺','😂','😴',
    '🥰','😜','😡','😆'
  ];

  let shuf_emojis = emojis.sort(() =>
    Math.random() > 0.5 ? 1 : -1
  );

  let jogadorAtual = 1;

  let pontos1 = 0;
  let pontos2 = 0;

  let primeiraCarta = null;
  let segundaCarta = null;

  const game = document.querySelector(".game");

  game.innerHTML = "";

  for(let i = 0; i < emojis.length; i++){

    let box = document.createElement("div");

    box.className = "item";

    box.innerHTML = shuf_emojis[i];

    game.appendChild(box);

    box.onclick = function(){

      if(
        this.classList.contains("boxOpen") ||
        this.classList.contains("boxMatch")
      ){
        return;
      }

      this.classList.add("boxOpen");

      if(primeiraCarta === null){

        primeiraCarta = this;

      }else{

        segundaCarta = this;

        setTimeout(() => {

          if(
            primeiraCarta.innerHTML ===
            segundaCarta.innerHTML
          ){

            primeiraCarta.classList.add("boxMatch");

            segundaCarta.classList.add("boxMatch");

            if(jogadorAtual === 1){

              pontos1++;

              document.getElementById("score1").innerHTML = pontos1;

            }else{

              pontos2++;

              document.getElementById("score2").innerHTML = pontos2;
            }

          }else{

            primeiraCarta.classList.remove("boxOpen");

            segundaCarta.classList.remove("boxOpen");

            jogadorAtual =
              jogadorAtual === 1 ? 2 : 1;

            document.getElementById("vezJogador").innerHTML =

              jogadorAtual === 1
              ? `Vez de ${jogador1}`
              : `Vez de ${jogador2}`;
          }

          primeiraCarta = null;
          segundaCarta = null;

          if(
            document.querySelectorAll(".boxMatch").length
            === emojis.length
          ){

            let vencedor = "";

            if(pontos1 > pontos2){

              vencedor = `${jogador1} venceu! 🏆`;

            }else if(pontos2 > pontos1){

              vencedor = `${jogador2} venceu! 🏆`;

            }else{

              vencedor = "Empate! 🤝";
            }

            document.getElementById("mensagem").innerHTML =
              vencedor;
          }

        },700);
      }
    };
  }
}