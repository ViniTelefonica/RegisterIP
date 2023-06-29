/*
inicialização do servidor
projeto deve rodar (a nível de teste) com parâmetros:
IP: rede pública local (sem VPN)
Porta: 8800
Framework de servidor: express
*/

//funções
function getSbcRange(jsonSbc){
    fs.createReadStream('./data-base/ranges.csv').pipe(csv()).on('data', (data) => {
        const sbc = data['sbc'].trim();
        const range = data['range'].trim();
        const protocolo = data['protocolo'].trim();
        fs.createReadStream('./data-base/sbcs.csv').pipe(csv()).on('data', (data_) => {
            if (data_['sbc'] == data['sbc']){
                jsonSbc.push({sbc: sbc, range: range, protocolo: protocolo, volCap: data_['volCap'], capsCap: data_['capsCap']});
            }
        })
    });
    return jsonSbc;
};

function getSbc(jsonSbcForRange){
    fs.createReadStream('./data-base/sbcs.csv').pipe(csv()).on('data', (sbcs) => {
        const sbcRcv = sbcs['sbc'];
        const channelCapRcv = sbcs['volCap'];
        const capsCapRcv = sbcs['capsCap']
        jsonSbcForRange.push({sbc: sbcRcv, channelCap: channelCapRcv, capsCap: capsCapRcv});
    });
    return jsonSbcForRange;
};

function getUsedIps(usedIps){
    fs.createReadStream('./data-base/controle-ip.csv').pipe(csv()).on('data', (sheet) => {
        const ip = sheet['ip'];
        usedIps.push({ip: ip});
    });
    return usedIps;
};

function getVolumeCaps(volumeTotal){
    fs.createReadStream('./data-base/controle-ip.csv').pipe(csv()).on('data', (info) => {
        const volumeRcv = info['volume'];
        const capsRcv = info['caps'];
        const sbcRcv = info['sbc'];
        fs.createReadStream('././data-base/sbcs.csv').pipe(csv()).on('data', sbcsSheet => {
            const canaisCap = sbcsSheet['volCap'];
            const capsCap = sbcsSheet['capsCap'];
            if (sbcsSheet['sbc'] == sbcRcv){
                volumeTotal.push({volume: parseInt(volumeRcv), caps: parseInt(capsRcv), sbc: sbcRcv, volCap: canaisCap, capsCap: capsCap});
            };
        })
    });
    return volumeTotal;
};

function getVrfVlan(vrfVlan){
    fs.createReadStream('./data-base/ranges.csv').pipe(csv()).on('data', (vrfVlanSheet) =>{
        const rangeRcv = vrfVlanSheet['range'];
        const vrfRcv = vrfVlanSheet['vrf'].trim();
        const vlanRcv = vrfVlanSheet['vlan'].trim();
        vrfVlan.push({range: rangeRcv, vrf: vrfRcv, vlan: vlanRcv});
    });
    return vrfVlan;
}

function getOperadoras(operadoras){
    fs.createReadStream('./data-base/operadoras.csv').pipe(csv()).on('data', operSheet =>{
        const operadoraRcv = operSheet['operadora'];
        operadoras.push({operadora: operadoraRcv});
    })
    return operadoras;
}

function getResponsaveis(responsaveis){
    fs.createReadStream('./data-base/responsaveis.csv').pipe(csv()).on('data', ownerSheet =>{
        const responsavelRcv = ownerSheet['nome'];
        responsaveis.push({responsavel: responsavelRcv});
    })
    return responsaveis;
}

//Importação de bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const ip = require('ip');
const csv = require('csv-parser');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

var jsonSbc = [];
var usedIps = [];
var volumeTotal = [];
var vrfVlan = [];
var operadoras = [];
var responsaveis = [];
var jsonSbcForRange = [];

//FUNÇÕES DE ADMINISTRADOR

function getUsedSbcs(usedSbcs){
    fs.createReadStream('./data-base/sbcs.csv').pipe(csv()).on('data', usedSbcsData => {
        const sbcRcv = usedSbcsData['sbc'];
        usedSbcs.push({sbc: sbcRcv});
    })
    return usedSbcs;
}

function getUsedRanges(usedRanges){
    fs.createReadStream('./data-base/ranges.csv').pipe(csv()).on('data', usedRangesData => {
        const rangeRcv = usedRangesData['range'];
        usedRanges.push({range: rangeRcv});
    })
    return usedRanges;
}

function getUsedOwners(usedOwners){
    fs.createReadStream('./data-base/responsaveis.csv').pipe(csv()).on('data', usedOwnersData => {
        const ownerRcv = usedOwnersData['nome'];
        usedOwners.push({owner: ownerRcv});
    })
    return usedOwners;
}
function getUsedOperators(usedOperators){
    fs.createReadStream('./data-base/operadoras.csv').pipe(csv()).on('data', usedOperatorsData => {
        const operatorRcv = usedOperatorsData['operadora'];
        usedOperators.push({operator: operatorRcv});
    })
    return usedOperators;
}

function getAllData(listOfAll){

    fs.createReadStream('./data-base/controle-ip.csv').pipe(csv()).on('data', allData => {
        const sbc = allData['sbc'];
        const ip = allData['ip'];
        const mascara = allData['mascara'];
        const sipRtp = allData['sip/rtp'];
        const vlan = allData['vlan'];
        const vrf = allData['vrf'];
        const operadora = allData['operadora'];
        const responsavel = allData['responsavel'];
        const data = allData['data'];
        const tipoDeRota = allData['tipo de rota'];
        const volume = allData['volume'];
        const caps = allData['caps'];
        const lado = allData['lado']

        listOfAll.push({sbc: sbc, ip: ip, mascara: mascara, sipRtp: sipRtp, vlan: vlan, vrf: vrf, operadora: operadora, responsavel: responsavel, data: data, tipoDeRota: tipoDeRota, volume: volume, caps: caps, lado: lado})
    })

    return listOfAll;
}

var usedSbcs = [];
var usedRanges = [];
var usedOwners = [];
var usedOperators = [];
var listOfAll = [];

getUsedSbcs(usedSbcs);
getUsedRanges(usedRanges);
getUsedOwners(usedOwners);
getUsedOperators(usedOperators);
getAllData(listOfAll);

//END

getSbcRange(jsonSbc);
getUsedIps(usedIps);
getVolumeCaps(volumeTotal);
getVrfVlan(vrfVlan);
getOperadoras(operadoras);
getResponsaveis(responsaveis);
getSbc(jsonSbcForRange);

//Configurações de servidor
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('access'));

const port = 8800;
const serverIp = ip.address();


//O get abaixo irá retornar todos os sbcs cadastrados na planilha de sbcs
app.get('/sbc', (req, res) => {
    res.send(jsonSbc);
});

app.get('/sbc-for-range', (req, res) => {
    res.send(jsonSbcForRange);
});

//O get abaixo retorna todos os Ips em uso
app.get('/used-ips', (req, res) => {
    res.send(usedIps);
});

//O get abaixo retorna a planilha atualizada até o momento
app.get('/get-data', (req, res) => {
    res.sendFile('/data-base/controle-ip.csv', { root: '.'}, function(error) {
        if(error){
            console.log(error);
        };
    });
});

//O get abaixo pega o valor de volume e caps totais
app.get('/get-volume-caps', (req, res) => {
    res.send(volumeTotal);
});

//O get abaixo requisita vrfs e vlans
app.get('/get-vrf', (req, res) => {
    res.send(vrfVlan);
});

//O get abaixo retorna as operadoras disponíveis
app.get('/operadoras', (req, res) => {
    res.send(operadoras);
});

//O get abaixo retorna os responsáveis disponíveis
app.get('/responsaveis', (req, res) => {
    res.send(responsaveis);
});

app.get('/get-all-data', (req, res) =>{
    res.send(listOfAll);
});

//MÉTODOS DE REGISTRO
app.post('/registro-sbc', (req, res) => {
    var usedSbcsList = [];

    usedSbcs.forEach(element => {
        usedSbcsList.push(element['sbc'])
    });

    const sbc = req.body.sbc;
    const canais = req.body.canais;
    const caps = req.body.caps;
    const id = uuidv4();

    if (usedSbcsList.includes(sbc)){
        res.send("Este SBC já está cadastrado! Caso seja necessário, recarregue a página ou pressione F5.")
    }else{
        const linhaCsv = id+','+sbc+','+canais+','+caps+'\n';
        usedSbcs.push({sbc: sbc});
        jsonSbcForRange.push({sbc: sbc, channelCap: canais, capsCap: caps});
        fs.appendFile('./data-base/sbcs.csv', linhaCsv, (err) => {
            if(err){
                res.send('Erro ao cadastrar SBC:',err);
            }else{
                res.send("SBC registrado com sucesso!");
            }
        })
    };

});

app.post('/registro-range-ip', (req, res) => {
    var usedRangesList = [];

    usedRanges.forEach(element => {
        usedRangesList.push(element['range'])
    });

    const sbc = req.body.sbc;
    const range = req.body.range;
    const vlan = req.body.vlan;
    const vrf = req.body.vrf;
    const protocolo = req.body.protocolo;
    const id = uuidv4();
    const channelCap = req.body.capChannel;
    const capsCap = req.body.capCaps;

    if (usedRangesList.includes(range)){
        res.send("Este Range já está cadastrado! Caso seja necessário, recarregue a página ou pressione F5.")
    }else{
        const linhaCsv = id+','+range+','+vrf+','+vlan+','+sbc+','+protocolo+'\n';
        usedRanges.push({range: range});
        jsonSbc.push({sbc: sbc, range: range, volCap: channelCap, capsCap: capsCap, protocolo: protocolo});
        vrfVlan.push({range: range, vrf: vrf, vlan: vlan});
        fs.appendFile('./data-base/ranges.csv', linhaCsv, (err) => {
            if(err){
                res.send('Erro ao cadastrar Range:',err);
            }else{
                res.send("Range registrado com sucesso!");
            }
        })
    }
});

app.post('/registro-operadora', (req, res) => {
    var usedOperatorsList = [];

    usedOperators.forEach(element => {
        usedOperatorsList.push(element['operator'])
    });

    const operator = req.body.operator;
    const id = uuidv4();

    if (usedOperatorsList.includes(operator)){
        res.send("Esta operadora já está cadastrada! Caso seja necessário, recarregue a página ou pressione F5.")
    }else{
        const linhaCsv = id+','+operator+'\n';
        usedOperators.push({operator: operator});
        operadoras.push({operadora: operator});
        fs.appendFile('./data-base/operadoras.csv', linhaCsv, (err) => {
            if(err){
                res.send('Erro ao cadastrar Operadora:',err);
            }else{
                res.send("Operadora registrada com sucesso!");
            }
        })
    }
});

app.post('/registro-responsavel', (req, res) => {
    var usedOwnersList = [];

    usedOwners.forEach(element => {
        usedOwnersList.push(element['owner'])
    });

    const name = req.body.name;
    const id = uuidv4();

    if (usedOwnersList.includes(name)){
        res.send("Este responsável já está cadastrado! Caso seja necessário, recarregue a página ou pressione F5.")
    }else{
        const linhaCsv = id+','+name+'\n';
        usedOwners.push({name: name});
        responsaveis.push({responsavel: name});
        fs.appendFile('./data-base/responsaveis.csv', linhaCsv, (err) => {
            if(err){
                res.send('Erro ao cadastrar responsável:',err);
            }else{
                res.send("Responsável registrado com sucesso!");
            }
        })
    }
});

//O post abaixo faz o registro de IPs e informações na planilha geral e deve adicionar os IPs ao usedIps
app.post('/registro-ip', (req, res) => {
    var usedIpsList = [];

    usedIps.forEach(element =>{
        usedIpsList.push(element['ip']);
    });

    const sbc = req.body.sbc;
    const ip = req.body.ip;
    const mascara = req.body.mascara;
    const sipRtp = req.body.sipRtp;
    const vlan = req.body.vlan;
    const vrf = req.body.vrf;
    const operadora = req.body.operadora;
    const responsavel = req.body.responsavel;
    const data = req.body.data;
    const tipoDeRota = req.body.tipoDeRota;
    const volume = req.body.volume;
    const caps = req.body.caps;
    const lado = req.body.lado;
    const id = uuidv4();
    const canaisCap = req.body.volCap;
    const capsCap = req.body.capsCap;

    if(usedIpsList.includes(ip)){
        res.send("Este IP está atualmente em uso! Tente novamente com outro endereço IP. Caso seja necessário, recarregue a página ou pressione F5.")
    }else{
        const linhaCsv = id+","+sbc+","+ip+","+mascara+","+sipRtp+","+vlan+","+vrf+","+operadora+","+responsavel+","+data+","+tipoDeRota+","+volume+","+caps+","+lado+"\n";
        usedIps.push({ip: ip});
        volumeTotal.push({volume: parseInt(volume), caps: parseInt(caps), sbc: sbc, volCap: canaisCap, capsCap: capsCap});
        listOfAll.push({sbc: sbc, ip: ip, mascara: mascara, sipRtp: sipRtp, vlan: vlan, vrf: vrf, operadora: operadora, responsavel: responsavel, data: data, tipoDeRota: tipoDeRota, volume: volume, caps: caps, lado: lado})
        fs.appendFile('./data-base/controle-ip.csv', linhaCsv, (err) => {
            if(err){
                res.send('Erro ao cadastrar IP:',err);
            }else{
                res.send("Ip registrado com sucesso!");
            }
        })
    }
});

app.listen(port, serverIp, () =>{
    console.log("Server running at http://" + serverIp + ":" + port);
});

