function calcularIpsValidos(ip, usedIpsJson, rawList){
    usedIpsJson.forEach(ip => {
        rawList.push(ip['ip'])
    });

    const ipMask = ip.split('/');
    
    var endRangeArray = ipMask[0].split('.');
    var maskArray = calcularMascara(ipMask[1]);

    var endNetBroad = calcularNetAdd(maskArray, endRangeArray);

    var hostsValidos = obterHostsValidos(endNetBroad[0], endNetBroad[1], parseInt(ipMask[1]));

    var broadAdd = endNetBroad.pop();

    hostsValidos.forEach(host => {
        if (!rawList.includes(host)){
            endNetBroad.push(host);
        }
    });

    endNetBroad.push(broadAdd);

    return endNetBroad;
}

function IPgetter(listOfUsed){
    var rawIpList = [];
    const sbcSelect = document.getElementById('inputSbc');
    const ipSelect = document.getElementById('inputIpOpt');
    const canaisSelect = document.getElementById('inputCanaisCap');
    const capsSelect = document.getElementById('inputCapsCap');
    const selectProt = document.getElementById('inputSipRtp');
    var validIps = [];

    sbcSelect.addEventListener('change', function() {
        var sbcSelecionado = sbcSelect.value;

        ipSelect.innerHTML = '';
        canaisSelect.innerHTML = '';
        capsSelect.innerHTML = '';
        selectProt.innerHTML = '';

        SbcRange.forEach(element => {
            for (let key in element){
                if (key === 'sbc'){
                    if (element[key] === sbcSelecionado){

                        var channel = document.createElement('option');
                        channel.value = element['volCap'];
                        channel.text = channel.value;
                        var caps_ = document.createElement('option');
                        caps_.value = element['capsCap'];
                        caps_.text = caps_.value;
                        canaisSelect.innerHTML = '';
                        capsSelect.innerHTML = '';
                        canaisSelect.appendChild(channel);
                        capsSelect.appendChild(caps_);

                        var endNetBroad = calcularIpsValidos(element['range'], listOfUsed, rawIpList);
                        for (var i=0 ; i < endNetBroad.length ; i++){
                            var option = document.createElement('option');
                            option.value = endNetBroad[i];
                            option.text = endNetBroad[i];
                            ipSelect.appendChild(option)
                            ipSelect.label = 'IPS VÁLIDOS PARA ' + sbcSelecionado;
                        }
                        validIps = endNetBroad;

                        /*var option = document.createElement('option');
                        option.value = element['range'];
                        option.text = element['range'];
                        ipSelect.appendChild(option);*/
                    }
                }
            }
        });
        getProtocol(validIps, SbcRange, listOfUsed)
    });

}

fetch('/used-ips')
.then(response => response.json())
.then(data => IPgetter(data))
.catch(err => console.log(err));