document.getElementById("cadastrarIPForm").addEventListener('submit', function(event){
    event.preventDefault();

    const sbc = document.getElementById('inputSbc').value;
    const canaisCap = document.getElementById('inputCanaisCap').value;
    const capsCap = document.getElementById('inputCapsCap').value;
    const ip = document.getElementById('inputIp').value;
    /*
    var sip = '';
    var rtp = '';
    if(document.getElementById('sip').checked){
        sip = document.getElementById('sip').value;
    };
    if(document.getElementById('rtp').checked){
        rtp = document.getElementById('rtp').value;
        if (sip != ''){
            rtp = '/'+rtp;
        };
    };
    */
    const sipRtp = document.getElementById('inputSipRtp').value;
    const vlan = document.getElementById('inputVlan').value;
    //var sipRtp = sip+rtp;
    const vrf = document.getElementById('inputVrf').value;
    const mascara = document.getElementById('inputMask').value;
    const operadora = document.getElementById('inputOperator').value;
    const responsavel = document.getElementById('inputOwner').value;
    const data = document.getElementById('inputDate').value;
    const tipoDeRota = document.getElementById('inputRouteType').value;
    const volume = document.getElementById('inputVolume').value;
    const caps = document.getElementById('inputCaps').value;
    const lado = document.getElementById('inputSide').value;

    var jsonToSend = ({sbc: sbc, ip: ip, mascara: mascara, sipRtp: sipRtp, vlan: vlan, vrf: vrf, operadora: operadora, responsavel: responsavel, data: data, tipoDeRota: tipoDeRota, volume: volume, caps: caps, lado: lado, volCap: canaisCap, capsCap: capsCap});

    fetch('/registro-ip', {
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