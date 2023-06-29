function registerSbc(opcoes, list){
    const select = document.getElementById('inputSbc');
    select.innerHTML = "<option style='font-weight: bold;'>Selecione um SBC</option>";
    opcoes.forEach(element => {
        for(let key in element){
            if (key == 'sbc'){
                if(!select.querySelector('#'+element[key])){
                    const option = document.createElement('option');
                    option.value = element[key];
                    option.textContent = element[key];
                    option.id = element[key];
                    select.appendChild(option)
                };
                list.push({sbc: element[key], range: element['range'], volCap: element['volCap'], capsCap: element['capsCap'], protocolo: element['protocolo']})
            }
        }
    });
}

var SbcRange = [];

fetch('/sbc')
.then((response) => response.json())
.then((data) => registerSbc(data, SbcRange))
.catch((error) =>{
    console.log(error);
});