function getTotalVolume(volumeCaps){
    console.log(volumeCaps);
    var div = document.getElementById('VolumeCaps');
    div.innerHTML = '';
    var newTable = document.createElement('table');
    newTable.innerHTML = "<tr class='firstLine'><td>SBC</td><td>CANAIS UTILIZADOS</td><td>CAPS UTILIZADOS</td><td>CAPACIDADE CANAIS</td><td>CAPACIDADE CAPS</td></tr>";
    newTable.id = 'newTable';
    div.appendChild(newTable);

    var sbcsList = [];
    volumeCaps.forEach(jsonObj => {
        if(!sbcsList.includes(jsonObj['sbc'])){
        sbcsList.push(jsonObj['sbc']);
        }
    });

    for (var i = 0 ; i < sbcsList.length ; i++ ){
        console.log(sbcsList[i]);
        var somaVolume = 0;
        var somaCaps = 0;
        var volCap = 0;
        var capsCap = 0;
        var table = document.getElementById('newTable');

        volumeCaps.forEach(jsonObj => {
            if(jsonObj['sbc'] == sbcsList[i]){
                somaVolume += parseInt(jsonObj['volume']);
                somaCaps += parseInt(jsonObj['caps']);
                volCap = parseInt(jsonObj['volCap'])
                capsCap = parseInt(jsonObj['capsCap'])
            }
        });
        var newLine = '<tr><td>'+sbcsList[i]+'</td><td>'+somaVolume+'</td><td>'+somaCaps+'</td><td>'+volCap+'</td><td>'+capsCap+'</td></tr>';
        table.innerHTML += newLine;
    }

}

fetch('/get-volume-caps')
.then(response => response.json())
.then(data => getTotalVolume(data))
.catch(err => console.log(err))
