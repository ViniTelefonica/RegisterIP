function getVrfs(data){
    var rawList = [];
    var rawList2 = [];
    const ipSelect = document.getElementById('inputIp');
    const vrfSelect = document.getElementById('inputVrf');
    const vlanSelect = document.getElementById('inputVlan');
    ipSelect.addEventListener('change', function(){
        var ipSelecionado = ipSelect.value;
        vrfSelect.innerHTML = '';
        vlanSelect.innerHTML = '';

        data.forEach(element => {
            for (let key in element){
                if (key === 'range'){
                    var listOfValidIps = calcularIpsValidos(element['range'], rawList, rawList2);
                    if (listOfValidIps.includes(ipSelecionado)){
                        var vrf = document.createElement('option');
                        vrf.value = element['vrf'];
                        vrf.innerHTML = element['vrf'];
                        vrfSelect.appendChild(vrf);
                        var vlan = document.createElement('option');
                        vlan.value = element['vlan'];
                        vlan.innerHTML = element['vlan'];
                        vlanSelect.appendChild(vlan);
                    }
                }
            }
        })
        
    });
    
}

fetch('/get-vrf')
.then(response => response.json())
.then(data => getVrfs(data))
.catch(err => console.log(err))