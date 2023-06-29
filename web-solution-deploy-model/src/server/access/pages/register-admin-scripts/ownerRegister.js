document.getElementById("cadastrarSbcForm").addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('inputOwner').value;

    var jsonToSend = ({name: name});

    fetch('/registro-responsavel', {
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