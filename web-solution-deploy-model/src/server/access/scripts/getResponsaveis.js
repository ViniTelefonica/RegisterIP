function getResponsaveis(opcoes){
    var ownerSelect = document.getElementById('inputOwner');

    ownerSelect.innerHTML = '';

    opcoes.forEach(element => {
        var newOption = document.createElement('option');
        newOption.value = element['responsavel'];
        newOption.innerHTML = element['responsavel'];
        ownerSelect.appendChild(newOption);
    });
}

fetch('/responsaveis')
.then((response) => response.json())
.then((data) => getResponsaveis(data))
.catch(err => console.log(err));