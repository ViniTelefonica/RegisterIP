document.getElementById("cadastrarSbcForm").addEventListener('submit', function(event){
    event.preventDefault();

    const sbc = document.getElementById('inputSbc').value;
    const canais = document.getElementById('inputCanaisCap').value;
    const caps = document.getElementById('inputCapsCap').value;

    console.log(sbc, canais, caps);

    var jsonToSend = ({sbc: sbc, canais: canais, caps: caps});

    fetch('/registro-sbc', {
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