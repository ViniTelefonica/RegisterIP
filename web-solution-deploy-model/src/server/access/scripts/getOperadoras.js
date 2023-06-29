function getOperadoras(opcoes){
    var operSelect = document.getElementById('inputOperator');

    operSelect.innerHTML = '';

    opcoes.forEach(element => {
        var newOption = document.createElement('option');
        newOption.value = element['operadora'];
        newOption.innerHTML = element['operadora'];
        operSelect.appendChild(newOption);
    });

}

fetch('/operadoras')
.then((response) => response.json())
.then((data) => getOperadoras(data))
.catch(err => console.log(err));