let nomeCorreto = "";

        async function carregarBandeira() {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const countries = await response.json();
            const randomCountry = countries[Math.floor(Math.random() * countries.length)];
            
            document.getElementById("flag").src = randomCountry.flags.png;
            nomeCorreto = randomCountry.name.common;
        }

        async function verificarResposta() {
            const respostaJogador = document.getElementById("answer").value;

            const response = await fetch("http://localhost:1880/verificar-resposta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resposta: respostaJogador, correta: nomeCorreto })
            });

            const data = await response.json();
            document.getElementById("result").innerText = data.resultado;
        }

        carregarBandeira();

