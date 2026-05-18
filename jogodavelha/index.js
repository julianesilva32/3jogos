// NOMES
let jogadorX = "Jogador X";
let jogadorO = "Jogador O";

// PONTOS
let pontosX = 0;
let pontosO = 0;

// TURNO
let turno = "X";

// TABULEIRO
let tabuleiro = [
    "", "", "",
    "", "", "",
    "", "", ""
];

// COMEÇAR
function comecarJogo(){

    const nome1 =
        document.getElementById(
            "nome1"
        ).value;

    const nome2 =
        document.getElementById(
            "nome2"
        ).value;

    if(nome1.trim() !== ""){
        jogadorX = nome1;
    }

    if(nome2.trim() !== ""){
        jogadorO = nome2;
    }

    document.getElementById(
        "jogador1Nome"
    ).innerHTML = jogadorX;

    document.getElementById(
        "jogador2Nome"
    ).innerHTML = jogadorO;

    document.getElementById(
        "vezJogador"
    ).innerHTML =
        "Vez de " + jogadorX;

    document.getElementById(
        "mensagem"
    ).innerHTML =
        "Jogo iniciado!";

    document.getElementById(
        "inicio"
    ).style.display = "none";

    document.getElementById(
        "jogo"
    ).style.display = "block";

}

// JOGAR
function jogar(botao,posicao){

    // IMPEDIR JOGADA DUPLA
    if(tabuleiro[posicao] !== ""){
        return;
    }

    // COLOCAR X OU O
    tabuleiro[posicao] = turno;

    botao.innerHTML = turno;

    // VERIFICAR VITÓRIA
    if(verificarVitoria()){

        if(turno === "X"){

            pontosX++;

            document.getElementById(
                "scoreX"
            ).innerHTML = pontosX;

            document.getElementById(
                "mensagem"
            ).innerHTML =
                jogadorX + " venceu!";

        }

        else{

            pontosO++;

            document.getElementById(
                "scoreO"
            ).innerHTML = pontosO;

            document.getElementById(
                "mensagem"
            ).innerHTML =
                jogadorO + " venceu!";

        }

        bloquearTabuleiro();

        return;

    }

    // EMPATE
    if(!tabuleiro.includes("")){

        document.getElementById(
            "mensagem"
        ).innerHTML =
            "Empate!";

        return;

    }

    // TROCAR TURNO
    turno = turno === "X"
        ? "O"
        : "X";

    // TEXTO
    document.getElementById(
        "vezJogador"
    ).innerHTML =
        turno === "X"
        ? "Vez de " + jogadorX
        : "Vez de " + jogadorO;

}

// VERIFICAR VITÓRIA
function verificarVitoria(){

    const vitorias = [

        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]

    ];

    for(let combinacao of vitorias){

        const [a,b,c] = combinacao;

        if(

            tabuleiro[a] &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]

        ){

            return true;

        }

    }

    return false;

}

// BLOQUEAR
function bloquearTabuleiro(){

    const casas =
        document.querySelectorAll(
            ".casa"
        );

    casas.forEach(casa => {

        casa.disabled = true;

    });

}

// REINICIAR
function reiniciar(){

    tabuleiro = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    turno = "X";

    document.getElementById(
        "mensagem"
    ).innerHTML =
        "Novo jogo iniciado!";

    document.getElementById(
        "vezJogador"
    ).innerHTML =
        "Vez de " + jogadorX;

    const casas =
        document.querySelectorAll(
            ".casa"
        );

    casas.forEach(casa => {

        casa.innerHTML = "";

        casa.disabled = false;

    });

}