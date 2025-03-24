async function BandeiraAleatoria() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?languages=portuguese');
    const data = await response.json();
    const randomCountry = data[Math.floor(Math.random() * data.length)];
    const bandeira = randomCountry.cca2.toLowerCase();
    const translatedName = randomCountry.translations?.por || randomCountry.name.common;
    
    document.getElementById('flag').src = `https://flagcdn.com/w320/${bandeira}.png`;
    console.log(translatedName);

  } catch (error) {
    console.error('Erro:', error);
  }
}

BandeiraAleatoria();
