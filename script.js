let currentRound = 1;
let score = 0;
let currentFlag = {};
let timeLeft = 30;
let totalTime = 0; // Variável para armazenar o tempo total
let timer;
let countries = [];

const flagElement = document.getElementById('flag');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit-btn');
const timeLeftElement = document.getElementById('time-left');
const pointsElement = document.getElementById('points');
const roundNumberElement = document.getElementById('round-number');
const feedbackElement = document.createElement('p');

document.getElementById('game-container').appendChild(feedbackElement);

// Função para buscar os dados dos países e bandeiras usando a API
async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all?languages=portuguese');
    const data = await response.json();
    countries = data;
    startGame();
}

// Função para iniciar o jogo
function startGame() {
    loadNextFlag();
    startTimer();
}

// Função para carregar a próxima bandeira aleatória
function loadNextFlag() {
    if (currentRound > 10) {
        endGame();
        return;
    }

    currentFlag = countries[Math.floor(Math.random() * countries.length)];

    flagElement.src = currentFlag.flags.png;
    guessInput.value = '';

    roundNumberElement.textContent = `${currentRound} / 10`;

    feedbackElement.textContent = '';
    feedbackElement.classList.remove('fade-out');
    submitButton.disabled = false; // Habilita o botão de envio
}

// Função para iniciar o timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        totalTime++; // Acumula o tempo total
        timeLeftElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            evaluateGuess();
            nextRound();
        }
    }, 1000);
}

// Função para avaliar a resposta do jogador
function evaluateGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const correctAnswer = currentFlag.name.common.toLowerCase();

    submitButton.disabled = true; // Desabilita o botão de envio após a resposta

    if (guess === correctAnswer) {
        const timeBonus = Math.max(0, 30 - timeLeft);
        score += 5 + timeBonus;
        feedbackElement.textContent = `Você acertou! +${5 + timeBonus} pontos.`;
        feedbackElement.style.color = 'green';
        document.body.classList.add('green-background');
    } else {
        score -= 3;
        score = Math.max(0, score); // Garante que os pontos não fiquem abaixo de zero
        feedbackElement.textContent = `Você errou! O país correto era: ${currentFlag.name.common}. -3 pontos.`;
        feedbackElement.style.color = 'red';
        document.body.classList.add('red-background');
    }

    pointsElement.textContent = score;
    
}

// Função para avançar para a próxima rodada após 5 segundos
function nextRound() {
    setTimeout(() => {
        document.body.classList.remove('green-background', 'red-background');
        if (currentRound < 10) {
            currentRound++;
            timeLeft = 30;
            loadNextFlag();
            startTimer();
        }
    }, 5000);  // Espera 5 segundos para avançar para a próxima rodada
}

// Função para finalizar o jogo e exibir o resumo
function endGame() {
    clearInterval(timer);
    
    // Limpa a tela
    document.getElementById('game-container').innerHTML = '';

    // Cria um novo elemento para exibir a mensagem final
    const endMessage = document.createElement('div');
    endMessage.innerHTML = `
        <h2>Fim de jogo!</h2>
        <p>Você fez ${score} pontos.</p>
        <p>Tempo total jogado: ${totalTime} segundos.</p>
    `;
    document.getElementById('game-container').appendChild(endMessage);
}

// Evento do botão de envio
submitButton.addEventListener('click', () => {
    clearInterval(timer);
    evaluateGuess();
    nextRound();
});

// Inicia o jogo chamando a API e carregando os dados
fetchCountries();
