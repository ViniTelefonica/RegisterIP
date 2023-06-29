function obterHostsValidos(enderecoRede, enderecoBroadcast, mascaraRede) {
    const enderecoRedeArray = enderecoRede.split('.').map(Number);
    const enderecoBroadcastArray = enderecoBroadcast.split('.').map(Number);
    
    // Converter a máscara de rede para uma representação binária
    let mascaraBinaria = '';
    for (let i = 0; i < 32; i++) {
        if (i < mascaraRede) {
            mascaraBinaria += '1';
        } else {
            mascaraBinaria += '0';
        }
    }
    
    // Calcular o número de hosts válidos
    const enderecoRedeBinario = enderecoRedeArray.map(decimalToBinary).join('');
    const enderecoBroadcastBinario = enderecoBroadcastArray.map(decimalToBinary).join('');
    const hostsValidos = [];
    
    for (let i = parseInt(enderecoRedeBinario, 2) + 1; i < parseInt(enderecoBroadcastBinario, 2); i++) {
        const enderecoBinario = i.toString(2);
        const enderecoCompletoBinario = ('0'.repeat(32 - enderecoBinario.length) + enderecoBinario).split(/(\d{8})/).filter(Boolean);
        const enderecoDecimal = enderecoCompletoBinario.map(binaryToDecimal).join('.');
        hostsValidos.push(enderecoDecimal);
    }
    
    return hostsValidos;
    }
    
// Função auxiliar para converter um número decimal em binário com 8 bits
function decimalToBinary(decimal) {
    return ('00000000' + decimal.toString(2)).slice(-8);
}

// Função auxiliar para converter um número binário em decimal
function binaryToDecimal(binario) {
    return parseInt(binario, 2);
}
