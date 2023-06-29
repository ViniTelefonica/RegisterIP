const chanSelect = document.getElementById('inputCanaisCap');
const capsSelect = document.getElementById('inputCapsCap');
const sbcSelect = document.getElementById('inputSbc');

sbcSelect.addEventListener('change', function(){
    var sbcSelecionado = sbcSelect.value;

    chanSelect.innerHTML = '';
    capsSelect.innerHTML = '';

    sbcRange.forEach(element => {
        console.log(sbcRange);
        for (let key in element){
            if (key === 'sbc'){
                if (element[key] === sbcSelecionado){
                    const capChannel = document.createElement('option');
                    capChannel.value = element['volCap'];
                    capChannel.id = 'capChannel';
                    capChannel.text = capChannel.value;
                    chanSelect.appendChild(capChannel);

                    const capCaps = document.createElement('option');
                    capCaps.value = element['capsCap'];
                    capCaps.id = 'capCaps';
                    capCaps.text = capCaps.value;
                    capsSelect.appendChild(capCaps);
                }
            }
        }
    });
})
