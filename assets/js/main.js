//! OBS: Como o objetivo é somente consumir a API, eu optei por não criar módulos e não gerar um bundle, apenas consumir a Api, utilizando validações bem básicas.

function init() {
    const btnForm = document.querySelector('.btn-form');

    btnForm.addEventListener('click', (e) => {
        const inputCep = document.getElementById("cep");

        if (basicValidationCep(inputCep)) {
            const cep = new Cep(inputCep.value);
            // addValuesOnDisplay(cep);
        }
    });
}

class Cep {
    constructor(cep) {
        this.searchCep(cep);
    }
    async searchCep(cep) {
        const responseCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const jsonCep = await responseCep.json();

        // Consulte a documentação para saber mais sobre o retorno padrão caso um cep seja inexistente.
        if (jsonCep.erro === true) {
            return;
        }
        addValuesOnDisplay(jsonCep);
    }
}

const valueLocalityDisplay = document.querySelector('.displayLocality');
const valueUfDisplay = document.querySelector(".displayUf");
const valueDddDisplay = document.querySelector(".displayDdd");

function addValuesOnDisplay(cepObj) {
    valueLocalityDisplay.innerText = cepObj.localidade;
    valueUfDisplay.innerText = cepObj.uf;
    valueDddDisplay.innerText = cepObj.ddd;
}

function basicValidationCep(cep) {
    let flag = true;

    const valueInputCep = cep.value;

    if (valueInputCep.length != 8) {
        flag = false;
    }

    else if (isNaN(valueInputCep)) {
        flag = false;
    }

    return flag;
}

init();
