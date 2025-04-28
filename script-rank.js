// Exemplo de dados dos jogadores
const ranking = [      ];
  
  // Função para carregar o ranking na tabela
  function carregarRanking() {
    const tabela = document.getElementById('ranking-table').querySelector('tbody');
    tabela.innerHTML = '';
  
    ranking.sort((a, b) => b.pontos - a.pontos); // Ordena por pontos (maior primeiro)
  
    ranking.forEach((player, index) => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${index + 1}º</td>
        <td>${player.nome}</td>
        <td>${player.tempo}</td>
        <td>${player.pontos}</td>
      `;
      tabela.appendChild(linha);
    });
  }
  
  // Função para voltar ao menu (você adapta para seu jogo)
  function voltarMenu() {
    window.location.href = 'index.html'; // Troque para a página inicial do seu jogo
  }
  
  // Quando a página carregar, mostrar o ranking
  window.onload = carregarRanking;
  
