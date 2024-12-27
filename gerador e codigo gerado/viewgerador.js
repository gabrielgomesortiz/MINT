
function gerarView() {
    let nomeClasse = document.getElementById("inputNomeClasse").value;

    let listInput = [];
    let text = document.getElementById("dados").value;
    let dadosView = text.split("\n");

    let codigoFonte = "";

    codigoFonte += '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0"> \n <title>Gerar</title>\n</head>\n\n<body>\n<label for="id">Codigo Do Produto</label>\n<br>\n<input type="number" id="id" placeholder="digite algo"></input>\n<button id="btProcure" onclick="procure()" style="display:inline;">Procure</button>\n<button id="btInserir" onclick="inserir()" style="display:none">Inserir</button>\n<button id="btAlterar"onclick="alterar()" style="display:none;">Alterar</button>\n<button id="btExcluir" onclick="excluir()" style="display:none;">Excluir</button>\n <br>'

    for (let i = 0; i < dadosView.length; i++) {
        let dadosInputs = dadosView[i].split(",");
        listInput.push(dadosInputs);
    }
    for (let i = 0; i < listInput.length; i++) {
        let variar = listInput[i][0].toLowerCase();

        if (variar === "int" || variar === "float") {
            codigoFonte += '\n<label for="' + listInput[i][1] + '">' + listInput[i][1] + '</label>\n<input type="number" id="' + listInput[i][1] + '" placeholder="digite algo">\n<br>'
        }

        else if (variar === "string") {
            codigoFonte += '\n<label for="' + listInput[i][1] + '">' + listInput[i][1] + '</label>\n<input type="text" id="' + listInput[i][1] + '" placeholder="digite algo">\n<br>'
        }

        else if (variar === "data") {
            codigoFonte += '\n<label for="' + listInput[i][1] + '">' + listInput[i][1] + '</label>\n<input type="date" id="' + listInput[i][1] + '" placeholder="digite algo">\n<br>'
        }
    }

    codigoFonte += '\n <button id="btSalvar" onclick="salvar()" style="display:none;">Salvar</button>\n<button id="btCancelar" onclick="cancelarOperacao()"style="display:none;">Cancelar</button>\n<br><br>\n<button onclick=" fazerDownload()"> fazer Download</button>\n<button onclick="fazerUpload()">fazer Upload</button>\n<br>\n<div id="divAviso"></div>\n <br>\n<div id="outputSaida"style="background-color: aqua;">...</div>\n<script src="./class' + nomeClasse + '.js"></script>\n<script src="./controler' + nomeClasse + '.js"></script></body>\n\n</html>'



    document.getElementById("taCodigoFonte").textContent = codigoFonte;

}