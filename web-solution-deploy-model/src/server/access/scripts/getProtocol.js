function getProtocol(info, sbcRange, usedIps){
    
    const ipSelect = document.getElementById('inputIp');
    const selectProt = document.getElementById('inputSipRtp');
    var rawList = [];

    ipSelect.addEventListener('change', function () {
        var ipSelecionado = ipSelect.value;

        sbcRange.forEach(element => {
            var range = calcularIpsValidos(element['range'], usedIps, rawList)
            if (range.includes(ipSelecionado)){
                var protocol = document.createElement('option');
                protocol.value = element['protocolo'];
                protocol.text = protocol.value;
                selectProt.innerHTML = '';
                selectProt.appendChild(protocol);
            }
        });
    })
}