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
                    select.appendChild(option);
                    list.push({sbc: element[key], volCap: element['channelCap'], capsCap: element['capsCap']})
                };
            }
        }
    });
}

var sbcRange = [];

fetch('/sbc-for-range')
.then((response) => response.json())
.then((data) => registerSbc(data, sbcRange))
.catch((error) =>{
    console.log(error);
});