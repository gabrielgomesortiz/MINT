function gerarModel() {
    let codigoFonte = "";
    let nomeClasse = document.getElementById("inputNomeClasse").value;
    let atributos = document.getElementById("inputAtributos").value;

    let vetAtributos = atributos.split(",");

    codigoFonte = "class " + nomeClasse + "{" + "\n";

    codigoFonte += "   constructor (id," + atributos + ",posicaoNaLista)" + "{\n          this.id=id;\n";

    for (let i = 0; i < vetAtributos.length; i++) {
        const at = vetAtributos[i];
        codigoFonte += "          this." + at + " = " + at + ";\n";
    }
    codigoFonte += "          this.posicaoNaLista = posicaoNaLista;\n"
    codigoFonte += "   }\n}\n";

    //console.log(codigoFonte);
    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}