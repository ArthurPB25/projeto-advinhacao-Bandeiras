
async function salvarNome() {
    nickname = document.getElementById('nickname').value.trim().toLowerCase();
    console.log("Nome digitado:", nickname);

    if (!nickname) {
        alert("Por favor, digite seu nome antes de iniciar!");
        return;
    }

    const response = await fetch("http://10.106.208.41:1880/guardar-nome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nickname, ponto: 0 })
    });

    const data = await response.json();
    console.log(data);
    document.getElementById('jogador').innerText = data.nome;
}


async function startGame() {
    nickname = document.getElementById('nickname').value.trim().toLowerCase();
    
    if (!nickname) {
        alert("Por favor, digite seu nome antes de iniciar!");
        return;
    }
    
    await salvarNome(); // Primeiro salva o nome no servidor
    alert('Iniciando o jogo para: ' + nickname);

    // Redireciona passando o nickname pela URL
    window.location.href = "../principal/jogo.html?nickname=" + encodeURIComponent(nickname)
}
