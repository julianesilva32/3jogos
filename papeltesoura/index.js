// NOMES DOS JOGADORES
let nomeJogador1 = "Jogador 1";
let nomeJogador2 = "Jogador 2";

// PONTOS
let pontos1 = 0;
let pontos2 = 0;

// CONTROLE DE TURNO
let turno = 1;

// ESCOLHAS
let escolha1 = "";
let escolha2 = "";

// COMEÇAR JOGO
function comecarJogo(){

    // PEGAR NOMES
    const nome1 =
        document.getElementById(
            "nome1"
        ).value;

    const nome2 =
        document.getElementById(
            "nome2"
        ).value;

    // VALIDAR NOME 1
    if(nome1.trim() !== ""){

        nomeJogador1 = nome1;

    }

    // VALIDAR NOME 2
    if(nome2.trim() !== ""){

        nomeJogador2 = nome2;

    }

    // COLOCAR NOMES NA TELA
    document.getElementById(
        "jogador1Nome"
    ).innerHTML = nomeJogador1;

    document.getElementById(
        "jogador2Nome"
    ).innerHTML = nomeJogador2;

    document.getElementById(
        "nomeResultado1"
    ).innerHTML = nomeJogador1;

    document.getElementById(
        "nomeResultado2"
    ).innerHTML = nomeJogador2;

    // ESCONDER MENU
    document.getElementById(
        "inicio"
    ).style.display = "none";

    // MOSTRAR JOGO
    document.getElementById(
        "jogo"
    ).style.display = "block";

    // TEXTO
    document.getElementById(
        "mensagem"
    ).innerHTML =
        "Vez de " + nomeJogador1;

}

// JOGAR
function jogar(escolha){

    // JOGADOR 1
    if(turno === 1){

        escolha1 = escolha;

        document.getElementById(
            "mensagem"
        ).innerHTML =
            "Vez de " + nomeJogador2;

        turno = 2;

    }

    // JOGADOR 2
    else{

        escolha2 = escolha;

        // MOSTRAR IMAGENS
        document.getElementById(
            "img1"
        ).src =
            "./" + escolha1 + "2.png";

        document.getElementById(
            "img2"
        ).src =
            "./" + escolha2 + "2.png";

        // VERIFICAR RESULTADO
        verificarResultado();

        // VOLTA PARA JOGADOR 1
        turno = 1;

    }

}

// VERIFICAR RESULTADO
function verificarResultado(){

    const mensagem =
        document.getElementById(
            "mensagem"
        );

    // EMPATE
    if(escolha1 === escolha2){

        mensagem.innerHTML =
            "Empate!";

    }

    // JOGADOR 1 GANHA
    else if(

        (escolha1 === "pedra" &&
         escolha2 === "tesoura")

        ||

        (escolha1 === "papel" &&
         escolha2 === "pedra")

        ||

        (escolha1 === "tesoura" &&
         escolha2 === "papel")

    ){

        pontos1++;

        document.getElementById(
            "score1"
        ).innerHTML = pontos1;

        mensagem.innerHTML =
            nomeJogador1 + " venceu!";

    }

    // JOGADOR 2 GANHA
    else{

        pontos2++;

        document.getElementById(
            "score2"
        ).innerHTML = pontos2;

        mensagem.innerHTML =
            nomeJogador2 + " venceu!";

    }

}

// REINICIAR JOGO
function reiniciar(){

    // RESETAR PONTOS
    pontos1 = 0;
    pontos2 = 0;

    // RESETAR TURNO
    turno = 1;

    // LIMPAR ESCOLHAS
    escolha1 = "";
    escolha2 = "";

    // RESETAR PLACAR
    document.getElementById(
        "score1"
    ).innerHTML = 0;

    document.getElementById(
        "score2"
    ).innerHTML = 0;

    // RESETAR MENSAGEM
    document.getElementById(
        "mensagem"
    ).innerHTML =
        "Vez de " + nomeJogador1;

    // RESETAR IMAGENS
    document.getElementById(
        "img1"
    ).src =
        "./player2.png";

    document.getElementById(
        "img2"
    ).src =
        "./player2.png";

}