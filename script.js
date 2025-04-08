
let nomeCorreto = "";
let cont=1
let rodada=document.querySelector('h2')
let resta=document.querySelector('h3')
let timerInterval;
let timeRemaining = 10;
let ponto=50

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
    timeRemaining = 30;
    document.getElementById('timer').textContent = timeRemaining;
    clearInterval(timerInterval); // Limpa o intervalo anterior se houver
    timerInterval = setInterval(function() {
        timeRemaining--;
        document.getElementById('timer').textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Tempo esgotado!");
            verificarResposta()
        }
    }, 1000);
}


function pontos(){
  if (timeRemaining>=20){
    ponto+=10
   }
  else if (timeRemaining>=15 && timeRemaining<20){
    ponto+=5
  }
  else if (timeRemaining>=11 && timeRemaining<15){
    ponto+=3
  }
  else if (timeRemaining<=10 && timeRemaining>0){
    ponto+=2
  }
  else if (timeRemaining===0){
    ponto+=0
  }
  console.log(ponto)
}
   



async function verificarResposta() {
    while(cont<10){
    cont+=1
    
    let respostaJogador = document.getElementById("answer").value
    

      const response = await fetch("http://localhost:1880/verificar-resposta", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ resposta: respostaJogador, correta: nomeCorreto }) //faz o metodo post para a verificação
    });

    const data = await response.json();
    document.getElementById("result").innerText = data.resultado;

    if(respostaJogador.trim().toLowerCase() === nomeCorreto.trim().toLowerCase()){
      pontos()
    }
    
    BandeiraAleatoria()
    startTimer()

    respostaJogador = document.getElementById("answer").value=''

    console.log(cont)
    
    rodada.innerText=`Rodada ${cont}`
    resta.innerText=`Restam: ${11-cont}`
    break
    }
    
    }
    

BandeiraAleatoria()
startTimer()

 
