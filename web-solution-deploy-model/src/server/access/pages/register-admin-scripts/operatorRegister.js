document.getElementById("cadastrarSbcForm").addEventListener('submit', function(event){
    event.preventDefault();

    const operator = document.getElementById('inputOperator').value;

    var jsonToSend = ({operator: operator});

    fetch('/registro-operadora', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonToSend)
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => {
        console.error('Erro: ', error);
    });
});