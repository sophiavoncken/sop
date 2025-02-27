// function teste() {
//     alert("Hello world!");
//     document.write("<h1>AHHHHHH</h1>");


//     let cep = document.getElementById('cep').value;
//     if (cep == "99999999") {
//         document.write("<p>Numero: 5462 6091 8160 2218</p> <br> <p>Validade: 04/12/2025</p> <br> <p>CVV: 216</p>");
//     }
//     alert(cep);

//     return false;

// }

let buscar = document.getElementById('form_cep');

buscar.addEventListener('submit', async (e) => {

    e.preventDefault();

    let cep = document.getElementById('cep').value;

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    let info = document.getElementById("info");

    try {

        const response = await fetch(url);

        if (response.ok) {

            let endereco = await response.json(); // Converte dados para json



            if (!endereco.erro) {
                info.innerHTML = `<h2>Endereço Encontrado!</h2>
                <p><strong>Logradouro: </strong> ${endereco.logradouro || 'N/A'}</p>
                <p><strong>Complemento: </strong> ${endereco.complemento || 'N/A'}</p>
                <p><strong>Bairro: </strong> ${endereco.bairro || 'N/A'}</p>
                <p><strong>Localidade: </strong> ${endereco.localidade || 'N/A'}</p>
                <p><strong>UF: </strong> ${endereco.uf || 'N/A'}</p>
                <p><strong>Região: </strong> ${endereco.regiao || 'N/A'}</p>
                `;
            } else {
                info.innerHTML = `<p style='color:#F00'> CEP INVÁLIDO!!</p>`;
            }
        }

    } catch (error) {
        alert("Cep Inválido!")
    }



    // alert(cep);
});

// alert(buscar);

// change() {
//     document.write("<style>body{background-color: blue;}</style>");
// }
// let result = document.getElementById("fundao");

const button = document.getElementById('bgButton');

button.addEventListener('click', () => {
    // Gera uma cor aleatória
    const corAleatoria = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.backgroundColor = corAleatoria;
});
