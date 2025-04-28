// Função para carregar o ranking do servidor
async function carregarRanking() {
    try {
        const response = await fetch('http://10.106.208.41:1880/pegar-ranking'); // <-- Seu endpoint para buscar o ranking
        const ranking = await response.json(); // Ranking vindo do servidor

        const tabela = document.getElementById('ranking-table').querySelector('tbody');
        tabela.innerHTML = '';

        // Organiza por pontuação primeiro e depois por tempo (se necessário)
        ranking.sort((a, b) => b.ponto - a.ponto || a.tempo.localeCompare(b.tempo));

        ranking.forEach((player, index) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
              <td>${index + 1}º</td>
              <td>${player.nome}</td>
              <td>${player.tempo}</td>
              <td>${player.ponto}</td>
            `;
            tabela.appendChild(linha);
        });

    } catch (error) {
        console.error('Erro ao carregar ranking:', error);
    }
}

// Função para voltar ao menu
function voltarMenu() {
    window.location.href = 'index.html'; // Voltar para página principal
}

// Carrega o ranking quando a página é aberta
window.onload = carregarRanking;
