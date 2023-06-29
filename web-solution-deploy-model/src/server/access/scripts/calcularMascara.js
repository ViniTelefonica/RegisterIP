function calcularMascara(mask){
    var mascara = parseInt(mask.replace('/', ''));
    var mascaraBinArray = [0,0,0,0];
    var octet = '';
    for (var j = 0 ; j < mascara ; j++){
        if (octet.length == 8 || octet.length == 17 || octet.length == 26){
            octet += '.';
        }
        octet += '1';
    }
    var octetZeros = 32 - parseInt(octet.replace('.','').length);

    for (var k = 0 ; k < octetZeros ; k++){
        if (octet.length == 8 || octet.length == 17 || octet.length == 26){
            octet += '.';
        }
        octet+= '0';
    }

    while (octet.length < 35){
        octet += '0'
    }

    var octetArray = octet.split('.');
    var octetArrayDec = []
    for (var l = 0 ; l < 4 ; l ++){
        //octetArrayDec.push(parseInt(octetArray[l], 2));
        octetArrayDec.push(octetArray[l]);
    }
    mascaraBinArray = octetArrayDec;
    //console.log(mascaraBinArray, mask);

    return mascaraBinArray;
};