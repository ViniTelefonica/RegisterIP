function organizeData(jsonObj){
    const select = document.getElementById('allData');

    console.log(jsonObj);

    jsonObj.forEach(element => {
        var newRow = '<tr><td>'+element.sbc+'</td><td>'+element.ip+'</td><td>'+element.mascara+'</td><td>'+element.sipRtp+'</td><td>'+element.vlan+'</td><td>'+element.vrf+'</td><td>'+element.operadora+'</td><td>'+element.responsavel+'</td><td>'+element.data+'</td><td>'+element.tipoDeRota+'</td><td>'+element.volume+'</td><td>'+element.caps+'</td><td>'+element.lado+'</td></tr>'
        select.innerHTML += newRow;
    });
}

fetch('/get-all-data')
.then(response => response.json())
.then(data => organizeData(data))
.catch(err => console.log(err));