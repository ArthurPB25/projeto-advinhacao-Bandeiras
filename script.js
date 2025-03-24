async function BandeiraAleatoria() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?languages=portuguese');
    const data = await response.json();
    const randomCountry = data[Math.floor(Math.random() * data.length)];
    const bandeira = randomCountry.cca2.toLowerCase();
    const countryName = randomCountry.name.common;
    const translatedName = await translateToPortuguese(countryName);
    
    document.getElementById('flag').src = `https://flagcdn.com/w320/${bandeira}.png`;
    console.log(translatedName);

  } catch (error) {
    console.error('Erro:', error);
  }
}

async function translateToPortuguese(text) {
  const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      target: 'pt'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await response.json();
  return result.data.translations[0].translatedText;
}

BandeiraAleatoria();


