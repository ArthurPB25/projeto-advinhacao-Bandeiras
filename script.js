let nomeCorreto = "";
let cont=1
let rodada=document.querySelector('h2')
let resta=document.querySelector('h3')
let ultimoClique=0
let penultimoClique=0
let timerInterval;
let timeRemaining = 10;
let pontos = 0 


//função para utilizar a API e gerar bandeiras aleatorias
async function BandeiraAleatoria() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')//puxando as informações da api
        const data = await response.json() //transformando em JSON
        
        const randomCountry = data[Math.floor(Math.random() * data.length)] //vai gerar um número aleatório dentro da quantidade de países
        const bandeira=randomCountry.cca2.toLowerCase() //pegando a sigla do país e convertendo em minúsculo 
        document.getElementById('flag').src=`https://flagcdn.com/w320/${bandeira}.png` //trasnfora o src da tag img nesse link
        
        nomeCorreto = randomCountry.translations.por.common //a variavel vira o nome traduzido do país
        
        console.log(randomCountry.translations.por.common)

    } catch (error) {
      console.error('Erro:', error);
    }
  }

  function startTimer() {
    timeRemaining = 10;
    document.getElementById('timer').textContent = timeRemaining;
    clearInterval(timerInterval); // Limpa o intervalo anterior se houver
    timerInterval = setInterval(function() {
        timeRemaining--;
        document.getElementById('timer').textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Tempo esgotado! Resposta incorreta.");
            showNextQuestion(); // Mostra a próxima pergunta
        }
    }, 1000);
}




  async function verificarResposta() {
    while(cont<10){
    cont+=1
    
    let respostaJogador = document.getElementById("answer").value
    while (document.getElementById("answer").value == "Certo"){
      pontos=+10
      if (pontos<0){
        break

      }
    }
    

      const response = await fetch("http://localhost:1880/verificar-resposta", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ resposta: respostaJogador, correta: nomeCorreto }) //faz o metodo post para a verificação
    });

    const data = await response.json();
    document.getElementById("result").innerText = data.resultado;

    respostaJogador = document.getElementById("answer").value=''

    BandeiraAleatoria()
    startTimer()

    console.log(cont)
    rodada.innerText=`Rodada ${cont}`
    resta.innerText=`Restam: ${11-cont}`
    pontos.innerText = `Pontos: ${pontos}`
    break
    }
    
    }
    

BandeiraAleatoria()
startTimer()