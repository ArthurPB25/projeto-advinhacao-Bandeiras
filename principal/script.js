// Salva o nome na URL
const baseURL = ' https://d338-200-211-208-194.ngrok-free.app'
const urlParams = new URLSearchParams(window.location.search);
let nickname = urlParams.get('nickname') || '';

// Variáveis do jogo
let nome = '';
let nomeCorreto = "";
let cont = 1;
let rodada = document.querySelector('h2');
let resta = document.querySelector('h3');
let timerInterval;
let timeRemaining = 30;  // Início com 30 segundos
let ponto = 50;  // A pontuação inicial
const timerElement = document.getElementById("cronometro");
let startTime = null;
let intervalId = null;
let totalTime = 0;



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

// Atualiza cronômetro a cada 100ms
function updateTimerDisplay() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    timerElement.innerText = `Tempo Geral: ${String (minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function startTempo() {
    startTime = Date.now();
    intervalId = setInterval(updateTimerDisplay, 100);
}

function stopTempo() {
    clearInterval(intervalId);
    intervalId = null;
}

function startTimer() {
    timeRemaining = 30;
    document.getElementById('timer').textContent = 'Tempo Restante: ' + timeRemaining;

    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById('timer').textContent = 'Tempo Restante: ' +timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Tempo esgotado!");
            verificarResposta();
        }
    }, 1000);
}

// Salvar tempo final
async function salvarTempoFinal() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    totalTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const response = await fetch(`${baseURL}/guardar-nome`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json','ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ nome: nickname, tempo: totalTime })
    });
    const data = await response.json();
    console.log("Tempo final salvo:", data);
}

//verifica resposta

async function verificarResposta() {
    if (cont < 10) {
        cont++;
        let respostaJogador = document.getElementById("answer").value;
        const response = await fetch(`${baseURL}/verificar-resposta`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json','ngrok-skip-browser-warning': 'true' },
            body: JSON.stringify({ resposta: respostaJogador, correta: nomeCorreto })
        });

        const data = await response.json();
        document.getElementById("result").innerText = data.resultado;

        const somAcerto = document.getElementById("somAcerto");
        const somErro = document.getElementById("somErro");

        if (respostaJogador.trim().toLowerCase() === nomeCorreto.trim().toLowerCase()) {
            somAcerto.play(); // toca som de acerto
            await pontos();
            document.body.style.backgroundColor = "green"; // muda a cor para verde
        } else {
            somErro.play(); // toca som de erro
            document.body.style.backgroundColor = "red"; // muda a cor para vermelho
        }

        // Delay de 1 segundo antes de resetar a cor e passar para a próxima bandeira
        setTimeout(() => {
            document.body.style.backgroundColor = ""; // reseta a cor de fundo
            BandeiraAleatoria();
            startTimer();
            document.getElementById("answer").value = '';
            console.log(cont);

            rodada.innerText = `Rodada ${cont}`;
            resta.innerText = `Restam: ${11 - cont}`;
        }, 1000); // 1000ms = 1 segundo

    } else {
        await salvarTempoFinal();
        window.location.href = '../ranking/ranking.html';
    }
}



// Pontuação
async function pontos() {
    let pontosGanhos = 0;

    if (timeRemaining >= 20) {
        pontosGanhos = 10;
    } else if (timeRemaining >= 15) {
        pontosGanhos = 5;
    } else if (timeRemaining >= 11) {
        pontosGanhos = 3;
    } else if (timeRemaining > 0) {
        pontosGanhos = 2;
    }

    ponto += pontosGanhos;

    const response = await fetch(`${baseURL}/guardar-nome`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json','ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ nome: nickname, ponto: pontosGanhos })  // Só manda o quanto ganhou
    });

    const data = await response.json();
    console.log(data);
    document.getElementById('pontos').innerText = 'ponto:'+ ponto;
}


// Início do jogo
BandeiraAleatoria();
startTimer();
startTempo();
