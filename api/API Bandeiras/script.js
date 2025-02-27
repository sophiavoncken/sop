let correctCountry;
let options = [];
let score = 0; // Contador de pontos

function updateScore() {
    document.getElementById('score').innerText = `Pontos: ${score}`;
}

function getCountryNameInPortuguese(country) {
    return country.translations && country.translations.por 
        ? country.translations.por.common 
        : country.name.common;
}

function getRandomCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            correctCountry = data[randomIndex];
            options = [correctCountry];

            while (options.length < 4) {
                const randomOption = data[Math.floor(Math.random() * data.length)];
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }

            options.sort(() => Math.random() - 0.5);
            displayQuestion();
        })
        .catch(error => console.error('Erro:', error));
}

function displayQuestion() {
    const flagImage = document.getElementById('flagImage');
    flagImage.src = correctCountry.flags.png;
    flagImage.style.display = 'block';

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = getCountryNameInPortuguese(option);
        button.onclick = () => checkAnswer(option, button);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected, button) {
    const resultDiv = document.getElementById('result');
    const buttons = document.querySelectorAll('#options button'); // Seleciona todos os botões de opção

    if (selected.name.common === correctCountry.name.common) {
        resultDiv.innerHTML = '<p style="color: green;">Correto!</p>';
        score++; // Incrementa a pontuação em caso de acerto
        updateScore(); // Atualiza a pontuação exibida
    } else {
        resultDiv.innerHTML = `<p style="color: red;">Incorreto! O país correto era: ${getCountryNameInPortuguese(correctCountry)}</p>`;
    }

    // Desativa todos os botões de resposta após a primeira tentativa
    buttons.forEach(btn => btn.disabled = true);

    document.getElementById('nextButton').style.display = 'block';
}

document.getElementById('nextButton').onclick = () => {
    document.getElementById('result').innerHTML = '';
    document.getElementById('nextButton').style.display = 'none';
    getRandomCountries();
};

// Inicia o jogo e a pontuação ao carregar a página
updateScore();
getRandomCountries();