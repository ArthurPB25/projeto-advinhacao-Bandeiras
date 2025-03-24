async function BandeiraAleatoria() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?languages=portuguese');
      const data = await response.json();
      const randomCountry = data[Math.floor(Math.random() * data.length)]; //vai gerar um número aleatório dentro da quantidade de países
      const bandeira=randomCountry.cca2.toLowerCase() //pegando a sigla do país e convertendo em minúsculo 
      document.getElementById('flag').src=`https://flagcdn.com/w320/${bandeira}.png` //trasnfora o src da tag img nesse link
      console.log(randomCountry.name.common)
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  BandeiraAleatoria();
