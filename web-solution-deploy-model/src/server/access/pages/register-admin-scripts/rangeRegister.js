document.getElementById("cadastrarSbcForm").addEventListener('submit', function(event){
    event.preventDefault();

    const sbc = document.getElementById('inputSbc').value;
    const range = document.getElementById('inputRange').value;
    const vlan = document.getElementById('inputVlan').value;
    const vrf = document.getElementById('inputVrf').value;
    const capChannel = document.getElementById('capChannel').value;
    const capCaps = document.getElementById('capCaps').value;
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
    var protocolo = sip + rtp;

    var regex =  /^(10(\.(?:2(?:[0-4][0-9]|5[0-5])|1[0-9]{2}|[1-9][0-9]|[0-9])){3}\/(?:3[0-2]|2[0-9]|1[0-9]|0[0-9]|[0-9]))$/

    if (regex.test(range)){
        var jsonToSend = ({sbc: sbc, range: range, vlan: vlan, vrf: vrf, capChannel: capChannel, capCaps: capCaps, protocolo: protocolo});
    
        fetch('/registro-range-ip', {
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
    }else{
        alert("Este formato de IP é inválido. Todos os IPs devem estar no range 10/8, sendo que o último range válido é 10.255.255.255/32. Tente o formato 10.x.x.x/xx")
    }
});