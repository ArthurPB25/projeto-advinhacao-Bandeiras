const baseURL = 'https://projeto-advinhacao-bandeiras-1.onrender.com';
async function ranking() {
    const response = await fetch(`${baseURL}/pegar-nome`, { method: "GET" });
    const data = await response.json();
    console.log(data); // Conferir a estrutura dos dados

    let html = '';

    // Transformar o objeto em um array de valores e ordenar por pontos (decrescente)
    const rankingArray = Object.values(data).sort((a, b) => b.ponto - a.ponto);

    // Gerar o HTML com os dados ordenados
    rankingArray.forEach(item => {
        html += `<p>${item.nome} - Pontos: ${item.ponto} - Tempo: ${item.tempo}</p>`;
    });

    // Exibir o ranking na página
    document.getElementById('ranking').innerHTML = html;
}

ranking();
