let nomeCorreto = "";

async function BandeiraAleatoria() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const randomCountry = data[Math.floor(Math.random() * data.length)]; //vai gerar um número aleatório dentro da quantidade de países
      const bandeira=randomCountry.cca2.toLowerCase() //pegando a sigla do país e convertendo em minúsculo 
      document.getElementById('flag').src=`https://flagcdn.com/w320/${bandeira}.png` //trasnfora o src da tag img nesse link
      nomeCorreto = randomCountry.translations.por.common
      console.log(randomCountry.translations.por.common)
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  async function verificarResposta() {
    const respostaJogador = document.getElementById("answer").value;

    const response = await fetch("http://localhost:1880/verificar-resposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resposta: respostaJogador, correta: nomeCorreto }) //faz o metodo post para a verificação
    });

    const data = await response.json();
    document.getElementById("result").innerText = data.resultado;
}

  BandeiraAleatoria();