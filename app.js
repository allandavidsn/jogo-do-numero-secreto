// GUARDAR O ELEMENTO DO TÍTULO - A DIFERENÇA É A TAG E O "TEXTO"
// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do Número Secreto";

// GUARDAR O CAMPO DO PARÁGRAFO - A A DIFERENÇA É A TAG E O "TEXTO"
// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um Número entre 1 e 10";

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1;

function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, "Brazilian Portuguese Female", {rate: 2});
}
function exibirMensagemInicial () {
    exibirTextoNaTela ("h1","Jogo do Número Secreto");
    exibirTextoNaTela ("p", "Escolha um Número entre 1 e 10");
}

exibirMensagemInicial ();

function verificarChute(){
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela ("h1", "Você encontrou o número secreto, parabéns!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você encontrou com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela ("p", mensagemTentativas);
        document.getElementById ("reiniciar").removeAttribute ("disabled");

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ("p", "Tente novamente, mas com um número menor");
        } else {
            exibirTextoNaTela ("p", "Tente novamente, mas com um número maior");
        }
        tentativas++;
        limparCampo();
    }
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random () * numeroLimite +1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // PEDIR PARA QUE UM NOVO NÚMERO SEJA GERADO, CASO O NÚMERO JÁ ESTEJA NA LISTA ACIMA.
        return gerarNumeroAleatorio ();
    } else {
        // O PUSH PEGANDO O PARÁMETRO ENTRE PARÉNTESE E COLOCANDO AO FINAL DA LISTA
        listaDeNumerosSorteados.push (numeroEscolhido);
        return numeroEscolhido;

    }
}

function limparCampo () {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial ();
    document.getElementById("reiniciarJogo").setAttribute("disabled", true);
}