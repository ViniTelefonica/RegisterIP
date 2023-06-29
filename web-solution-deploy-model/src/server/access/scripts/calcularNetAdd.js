function calcularNetAdd(mask, ipRange){
    var ipBinRange = [];
    for (var i = 0 ; i < ipRange.length ; i++){
        ipBinRange.push(("00000000"+(ipRange[i]>>>0).toString(2)).slice(-8));
    }

    var netAddBin = '';

    for (var j = 0 ; j < 4 ; j++){
        for (var k = 0 ; k < 8 ; k++){
            if (mask[j][k] == '1' && ipBinRange[j][k] == '1'){
                if (netAddBin.length == 8 || netAddBin.length == 17 || netAddBin.length == 26){
                    netAddBin += '.';
                }
                netAddBin += '1';
            }else{
                if (netAddBin.length == 8 || netAddBin.length == 17 || netAddBin.length == 26){
                    netAddBin += '.';
                }
                netAddBin += '0';
            }
        }
    }

    while (netAddBin.length < 35){
        netAddBin += '0'
    }

    var netAddArray = netAddBin.split('.');

    var netAdd = [];

    for (var l = 0 ; l < 4 ; l++){
        netAdd.push(parseInt(netAddArray[l], 2))
    }

    //console.log("Endereço de rede: ",netAdd.join('.'));//ENDEREÇO DE REDE

    var broadcastAddBin = '';

    var ipBinRangeStr = ipBinRange.join('.');
    var maskStr = mask.join('.');

    for (var m = 0 ; m < 35 ; m++){
        if (maskStr[m] == '1'){
            broadcastAddBin += ipBinRangeStr[m];
        }else if (maskStr[m] == '.'){
            broadcastAddBin += '.';
        }else{
            broadcastAddBin += '1';
        }
    }

    var broadcastAddArray = broadcastAddBin.split('.')

    var broadcastAdd = [];

    for (var n = 0 ; n < 4 ; n++){
        broadcastAdd.push(parseInt(broadcastAddArray[n], 2));
    }
    //console.log("Endereço de Broadcast: ",broadcastAdd.join('.'));//ENDEREÇO DE BROADCAST

    var netBroad = []
    netBroad.push(netAdd.join('.'), broadcastAdd.join('.'))

    return netBroad;

};