let nomeCorreto = "";
let cont = 1;
let rodada = document.querySelector('h2');
let resta = document.querySelector('h3');
let timerInterval;
let timeRemaining = 10;
let ponto = 50;
const timerElement = document.getElementById("cronometro");
let startTime = null;
let intervalId = null;
let totalTime = 0; // Variável para armazenar o tempo total

// Função para salvar o nome do jogador
async function salvarNome() {
    let nickname = document.getElementById('nickname').value;
    const response = await fetch("http://10.106.208.41:1880/guardar-nome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nickname })
    });
    const data = await response.json();
    console.log(data);
    document.getElementById('jogador').innerText = data.nome;
}

// Função para iniciar o jogo
function startGame() {
    let nickname = document.getElementById('nickname').value;
    alert('Iniciando o jogo para: ' + nickname);
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1000);
    salvarNome();
}

// Função para obter uma bandeira aleatória
async function BandeiraAleatoria() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const randomCountry = data[Math.floor(Math.random() * data.length)];
        const bandeira = randomCountry.cca2.toLowerCase();
        document.getElementById('flag').src = `https://flagcdn.com/w320/${bandeira}.png`;
        nomeCorreto = randomCountry.translations.por.common;
        console.log(randomCountry.translations.por.common);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para iniciar o cronômetro
function startTimer() {
    timeRemaining = 30;
    document.getElementById('timer').textContent = timeRemaining;
    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById('timer').textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Tempo esgotado!");
            verificarResposta();
        }
    }, 1000);
}

// Função para atualizar a exibição do tempo
async function updateTimerDisplay() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    totalTime = elapsedTime / 1000; // Armazena o tempo total em segundos
    timerElement.innerText = totalTime.toFixed(2) + "s";
}

// Função para iniciar o tempo
function startTempo() {
    startTime = Date.now();
    intervalId = setInterval(updateTimerDisplay, 100); // Atualiza a cada 100ms
}

// Função para parar o tempo
function stopTempo() {
    clearInterval(intervalId);
    intervalId = null;
}

// Função para salvar o tempo após a 10ª rodada
async function salvarTempoFinal() {
    const response = await fetch("http://10.106.208.41:1880/guardar-nome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempo: totalTime }) // Envia o tempo total
    });
    const data = await response.json();
    console.log("Tempo final salvo:", data);
}

// Função para verificar a resposta do jogador
async function verificarResposta() {
    if (cont < 10) {
        cont++;
        let respostaJogador = document.getElementById("answer").value;
        const response = await fetch("http://10.106.208.41:1880/verificar-resposta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resposta: respostaJogador, correta: nomeCorreto })
        });
        const data = await response.json();
        document.getElementById("result").innerText = data.resultado;

        if (respostaJogador.trim().toLowerCase() === nomeCorreto.trim().toLowerCase()) {
            pontos();
        }

        BandeiraAleatoria();
        startTimer();
        respostaJogador = document.getElementById("answer").value = '';
        console.log(cont);

        rodada.innerText = `Rodada ${cont}`;
        resta.innerText = `Restam: ${11 - cont}`;
    } else {
        // Ao final da 10ª rodada, salvar o tempo total e redirecionar para a página de ranking
        await salvarTempoFinal();
        window.location.href = 'ranking.html';
    }
}

// Função para calcular os pontos do jogador
async function pontos() {
    if (timeRemaining >= 20) {
        ponto += 10;
    } else if (timeRemaining >= 15 && timeRemaining < 20) {
        ponto += 5;
    } else if (timeRemaining >= 11 && timeRemaining < 15) {
        ponto += 3;
    } else if (timeRemaining <= 10 && timeRemaining > 0) {
        ponto += 2;
    } else if (timeRemaining === 0) {
        ponto += 0;
    }

    await fetch("http://10.106.208.41:1880/pegar-nome", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const response = await fetch("http://10.106.208.41:1880/guardar-nome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ponto: ponto })
    });
    const data = await response.json();
    console.log(data);
    document.getElementById('pontos').innerText = data.ponto;
}

// Função para iniciar o cronômetro e as rodadas
BandeiraAleatoria();
startTimer();
startTempo();
