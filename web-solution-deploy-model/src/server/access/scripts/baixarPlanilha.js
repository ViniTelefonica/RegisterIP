function baixarPlanilhaCSV(){
    fetch('/get-data')
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'copia-planilha-controle-ip.csv';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    })
    .catch(error =>{
        console.error('Erro ao baixar a planilha:', error);
    });
}

const btnDownload = document.getElementById("buttonBaixarPlanilha");
btnDownload.addEventListener('click', baixarPlanilhaCSV);