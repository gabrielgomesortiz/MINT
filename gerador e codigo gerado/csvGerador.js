function csvButton(){
    let codigoFonte = "id;";
    let atributosClass = document.getElementById("inputAtributos").value;
    let dividirAtributos= atributosClass.split(",");
    let dados=''
    for(let i=0;i<dividirAtributos.length;i++){
    dados+=dividirAtributos[i]+';'
    }
    dados=dados.slice(0,-1)
    codigoFonte+=dados;
    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}