// Salva o nome na URL
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
 
     timerElement.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
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
 
 // Salvar tempo final
 async function salvarTempoFinal() {
     const currentTime = Date.now();
     const elapsedTime = currentTime - startTime;
 
     const totalSeconds = Math.floor(elapsedTime / 1000);
     const minutes = Math.floor(totalSeconds / 60);
     const seconds = totalSeconds % 60;
 
     totalTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
 
     const response = await fetch("https://f0a8-200-211-208-194.ngrok-free.app/guardar-nome", {
     const response = await fetch("https://10.106.208.41:1880/guardar-nome", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ nome: nickname, tempo: totalTime })
 @@ -99,7 +99,7 @@
     if (cont < 10) {
         cont++;
         let respostaJogador = document.getElementById("answer").value;
         const response = await fetch("https://f0a8-200-211-208-194.ngrok-free.app/verificar-resposta", {
         const response = await fetch("https://10.106.208.41:1880/verificar-resposta", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ resposta: respostaJogador, correta: nomeCorreto })
 @@ -140,19 +140,19 @@
 
     ponto += pontosGanhos;
 
     const response = await fetch("https://f0a8-200-211-208-194.ngrok-free.app/guardar-nome", {
     const response = await fetch("https://10.106.208.41:1880/guardar-nome", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ nome: nickname, ponto: pontosGanhos })  // Só manda o quanto ganhou
     });
 
     const data = await response.json();
     console.log(data);
     document.getElementById('pontos').innerText = ponto;
 }
 
 
 // Início do jogo
 BandeiraAleatoria();
 startTimer();
 startTempo();
