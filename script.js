async function getPost() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?languages=portuguese');
      const data = await response.json();
      const randomCountry = data[Math.floor(Math.random() * data.length)];
      const bandeira=randomCountry['altSpellings'][0].toLowerCase()
      console.log(`https://flagcdn.com/w320/${bandeira}.png`)//
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  getPost();
