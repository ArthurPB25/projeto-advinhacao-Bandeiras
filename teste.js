async function ranking() {
    const response = await fetch("http://10.106.208.41:1880/pegar-nome", { method: "GET" });
    const data = await response.json();
    console.log(data); // conferir

    let html = '';

    // data é um objeto, precisamos transformar em array primeiro
    Object.values(data).forEach(item => {
        html += `<p>${item.nome} - Pontos: ${item.ponto} - Tempo: ${item.tempo}</p>`;
    });

    document.getElementById('ranking').innerHTML = html;
}

ranking();
