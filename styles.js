* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f0f8ff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    transition: background-color 0.5s;
}

.content {
    text-align: center;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 350px;
}

h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

h2, h3 {
    font-size: 18px;
    color: #555;
    margin-top: 10px;
}

#flag {
    width: 100%;
    height: auto;
    margin: 20px 0;
    border-radius: 5px;
}

input[type="text"] {
    width: 80%;
    padding: 8px;
    margin: 10px 0;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 15px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #45a049;
}

#result {
    font-size: 18px;
    margin-top: 15px;
}

#tempo, #nome {
    font-size: 16px;
    margin-top: 10px;
}

#tempo {
    color: #555;
}

#nome {
    font-weight: bold;
}

.green-background {
    background-color: #4CAF50; /* Cor verde para acertos */
}

.red-background {
    background-color: #FF6347; /* Cor vermelha para erros */
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.fade-out {
    animation: fadeOut 2s forwards;
}

.header{
    text-align: center;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    margin-bottom: 3%;

}
.section_hero{
    display: flex;
    flex-direction: column;
}

#cronometro {
    position: fixed;
    top: 20px;
    right: 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px 12px;
    border-radius: 8px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    font-family: monospace;
    transition: color 0.3s ease;
}
