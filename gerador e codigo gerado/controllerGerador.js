function gerarController() {
    let codigoFonte = "";
    let nomeClasse = document.getElementById("inputNomeClasse").value;
    let atributosClass = document.getElementById("inputAtributos").value;
    let dividirAtributos = atributosClass.split(",");

    codigoFonte += 'let listaDe' + nomeClasse + ' = [];\nlet oQueEstaFazendo = "";\nlet ' + nomeClasse.toLowerCase() + '= null;\nbloquearAtributos(true);\n\nfunction fazerDownload() {\nnomeParaSalvar = "arquivo.csv";\nlet textoCSV = "";\nfor (let i = 0; i < listaDe' + nomeClasse + '.length; i++) {\nconst linha = listaDe' + nomeClasse + '[i];\ntextoCSV += linha.id + ";" +';
    let listDados = [];
    let text = document.getElementById("dados").value;
    let dadosView = text.split("\n");

    for (let i = 0; i < dadosView.length; i++) {
        let dadosInputs = dadosView[i].split(",");
        listDados.push(dadosInputs);
    }

    let funcaoGerarLinhas = gerarLinhas(listDados);
    let gerarVariaveis = gerarVariaveis2(listDados);
    let terminarCondicao = terminarCondicao2(listDados);
    let gerarPrepararListagem = gerarPrepararListagem2(listDados);
    let gerarDadosMostrar = dadosMostrar(listDados);
    let gaerarLimparDados = limparAtributos(listDados);
    let gerarBloquearAtributos = bloquearAtributos(listDados);

    codigoFonte += '\n' + funcaoGerarLinhas + ' \n }\n\nsalvarEmArquivo(nomeParaSalvar,textoCSV);\n}\n\nfunction salvarEmArquivo(nomeArq, conteudo) {\nconst blob = new Blob([conteudo], { type: "text/plain" });\nconst link = document.createElement("a");\nlink.href = URL.createObjectURL(blob);\nlink.download = nomeArq;\nlink.click();\nURL.revokeObjectURL(link.href);\n}\n\n';

    let funcaoGerarUpload = gerarUpload(listDados);

    codigoFonte += 'function fazerUpload() {\nconst input = document.createElement("input");\ninput.type = "file";\ninput.accept = ".csv";\ninput.onchange = function (event) {\nconst arquivo = event.target.files[0];\nconsole.log(arquivo.name);\nif (arquivo) {\nprocessarArquivo(arquivo);\n}\n};\ninput.click();\n}\n\nfunction processarArquivo(arquivo) {\n const leitor = new FileReader();\n leitor.onload = function (e) {\nconst conteudo = e.target.result;\nconst linhas = conteudo.split(' + '"\\n"' + ');\nlistaDe' + nomeClasse + ' = [];\nfor (let i = 0; i < linhas.length; i++) {\nconst linha = linhas[i].trim();\nif (linha) { //verifica se a linha não está vazia\nconst dados = linha.split(";");\nif (dados.length === ' + (dividirAtributos.length + 1) + ') {\nlistaDe' + nomeClasse + '.push({\nid: dados[0],\n' + funcaoGerarUpload + '\n });\n}\n}\n}\nlistar();\nalert(listaDe' + nomeClasse + ')\n};\nleitor.readAsText(arquivo);\n}';

    codigoFonte += 'function procurePorChavePrimaria(chave) {\nfor (let i = 0; i < listaDe' + nomeClasse + '.length; i++) {\nconst ' + nomeClasse.toLowerCase() + ' = listaDe' + nomeClasse + '[i];\nif (' + nomeClasse.toLowerCase() + '.id == chave) {\n' + nomeClasse.toLowerCase() + '.posicaoNaLista = i;\nreturn listaDe' + nomeClasse + '[i];\n}\n}\nreturn null;//não achou\n}\nfunction procure() {\nconst id = parseInt(document.getElementById("id").value);\nif (id>0) {\n' + nomeClasse.toLowerCase() + ' = procurePorChavePrimaria(id);\nif (' + nomeClasse.toLowerCase() + ') {\nmostrarDados' + nomeClasse + '(' + nomeClasse.toLowerCase() + ');\nvisibilidadeDosBotoes("inline", "none", "inline", "inline", "none");\nmostrarAviso("Achou na lista, pode alterar ou excluir");\n} else { //não achou na lista\nlimparAtributos();\nvisibilidadeDosBotoes("none", "inline", "none", "none", "none");\nmostrarAviso("Não achou na lista, pode inserir");\n}\n} else {\ndocument.getElementById("id").focus();\nreturn;\n}\n}\nfunction inserir() {\n const id = parseInt(document.getElementById("id").value);\nif(procurePorChavePrimaria(id)!==null){\n mostrarAviso("ERRO EM ALGUM OU EM TODOS OS DADOS DIGITADOS")\ndocument.getElementById("id").focus();\n}\nelse if(id<0){\n mostrarAviso("ERRO EM ALGUM OU EM TODOS OS DADOS DIGITADOS")\ndocument.getElementById("id").focus();\n}\nelse{\nbloquearAtributos(false);\nvisibilidadeDosBotoes("none", "none", "none", "none", "inline"); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)\noQueEstaFazendo = "inserindo";\nmostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");\ndocument.getElementById("id").focus();\n}\n}\nfunction alterar() {\n  bloquearAtributos(false);\nvisibilidadeDosBotoes("none", "none", "none", "none", "inline");\noQueEstaFazendo = "alterando";\nmostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");\n}\nfunction excluir() {\nbloquearAtributos(false);\nvisibilidadeDosBotoes("none", "none", "none", "none", "inline");\noQueEstaFazendo = "excluindo";\nmostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");\n'

    codigoFonte += '\n}\nfunction salvar() {\nlet id;\nif (' + nomeClasse.toLowerCase() + ' == null) {\nid = document.getElementById("id").value;\n} else {\nid = ' + nomeClasse.toLowerCase() + '.id;\n}\n' + gerarVariaveis + ' if (id!=null && id>0 && ' + terminarCondicao + ') {\nswitch (oQueEstaFazendo) {\ncase "inserindo":' + nomeClasse.toLowerCase() + ' = new ' + nomeClasse + '(id,' + atributosClass + ');\nlistaDe' + nomeClasse + '.push(' + nomeClasse.toLowerCase() + ');\nmostrarAviso("Inserido na lista");\nbreak;\ncase "alterando":' + nomeClasse.toLowerCase() + 'Alterado = new ' + nomeClasse + '(id,' + atributosClass + ');\nlistaDe' + nomeClasse + '[' + nomeClasse.toLowerCase() + '.posicaoNaLista] = ' + nomeClasse.toLowerCase() + 'Alterado;\nmostrarAviso("Alterado");\nbreak;\ncase "excluindo":\nlet novaLista = [];\nfor (let i = 0; i < listaDe' + nomeClasse + '.length; i++) {\nif (' + nomeClasse.toLowerCase() + '.posicaoNaLista != i) {\nnovaLista.push(listaDe' + nomeClasse + '[i]);\n}\n}listaDe' + nomeClasse + ' = novaLista;\nmostrarAviso("EXCLUIDO");\nbreak;\ndefault:\nmostrarAviso("Erro aleatório");\n}\nvisibilidadeDosBotoes("inline", "none", "none", "none", "none");\nlimparAtributos();\nlistar();\ndocument.getElementById("id").focus();\n} else {\nalert("Erro nos dados digitados");\nreturn;\n}\n}\n';

    codigoFonte += 'function preparaListagem(vetor) {\nlet texto = "";\nfor (let i = 0; i < vetor.length; i++) {\n   let linha = vetor[i]\ntexto+=   linha.id + " - " +\n' + gerarPrepararListagem + ' }\nreturn texto;\n}\nfunction listar() {\n document.getElementById("outputSaida").innerHTML = preparaListagem(listaDe' + nomeClasse + ');\n}\nfunction cancelarOperacao() {\nlimparAtributos();\nbloquearAtributos(true);\nvisibilidadeDosBotoes("inline", "none", "none", "none", "none");\nmostrarAviso\n("Cancelou a operação de edição");\n}\nfunction mostrarAviso(mensagem) {\ndocument.getElementById("divAviso").innerHTML = mensagem;\n}\nfunction mostrarDados' + nomeClasse + '(' + nomeClasse.toLowerCase() + ') {\n' + gerarDadosMostrar + ' bloquearAtributos(true);\n}\n';

    codigoFonte += 'function limparAtributos() {\n' + gaerarLimparDados + '\nbloquearAtributos(true);\n}\nfunction bloquearAtributos(soLeitura) {\n document.getElementById("id").readOnly = !soLeitura;\n' + gerarBloquearAtributos + '}\nfunction visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {\ndocument.getElementById("btProcure").style.display = btProcure;\ndocument.getElementById("btInserir").style.display = btInserir;\ndocument.getElementById("btAlterar").style.display = btAlterar;\ndocument.getElementById("btExcluir").style.display = btExcluir;\ndocument.getElementById("btSalvar").style.display = btSalvar;\ndocument.getElementById("btCancelar").style.display = btSalvar;\ndocument.getElementById("id").focus();\n}';


    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}
function gerarLinhas(vetor) {
    let retorno = [];
    for (let i = 0; i < vetor.length; i++) {
        for (let j = 1; j < vetor[i].length; j++) {
            dados = vetor[i][1];

            retorno += 'linha.' + dados + '+ ";" +\n';
        }
    }

    retorno = retorno.slice(0, -6);
    retorno += '"\\n";'
    return retorno;
}
function gerarUpload(vetor) {
    let retorno = [];
    for (let i = 0; i < vetor.length; i++) {
        for (let j = 1; j < vetor[i].length; j++) {
            dados = vetor[i][1];

            retorno += dados + ": dados[" + (i + 1) + "],\n";
        }
    }
    retorno = retorno.slice(0, -2);
    return retorno;
}
function gerarVariaveis2(vetor) {
    let retorno = [];
    for (let i = 0; i < vetor.length; i++) {
        for (let j = 1; j < vetor[i].length; j++) {
            let dados = vetor[i][0].toLowerCase();
            let id = vetor[i][1];

            if (dados === "int") {
                retorno += "const " + id + '= parseInt(document.getElementById("' + id + '").value);\n'
            }
            else if (dados === "float") {
                retorno += "const " + id + '= parseFloat(document.getElementById("' + id + '").value);\n'
            }
            else if (dados === "string" || dados === "data") {
                retorno += "const " + id + '= document.getElementById("' + id + '").value;\n'
            }
        }
    }
    return retorno;
}
function terminarCondicao2(vetor) {
    let retorno = [];
    for (let i = 0; i < vetor.length; i++) {
        for (let j = 1; j < vetor[i].length; j++) {
            dados = vetor[i][1];
            if (vetor[i][0] == "float" || vetor[i][0] == "int") {
                retorno += dados + ">0 && ";
            } else {
                retorno += dados + " && ";
            }
        }
    }
    retorno = retorno.slice(0, -4);
    return retorno;
}
function gerarPrepararListagem2(vetor) {
    let retorno = [];
    for (let i = 0; i < vetor.length; i++) {
        for (let j = 1; j < vetor[i].length; j++) {
            dados = vetor[i][1];

            retorno += '    linha.' + dados + '+"-"+\n';
        }
    }
    retorno = retorno.slice(0, -5);
    retorno += '"<br>";'
    return retorno;
}
function dadosMostrar(vetor) {
    let retorno = [];
    let nomeClasse = document.getElementById("inputNomeClasse").value;
    for (let i = 0; i < vetor.length; i++) {
        for (let j = 1; j < vetor[i].length; j++) {
            dados = vetor[i][1];
            retorno += ' document.getElementById("' + dados + '").value = ' + nomeClasse.toLowerCase() + '.' + dados + ';\n';
        }
    }
    return retorno;
}
function limparAtributos(vetor) {
    let retorno = [];
    for (let i = 0; i < vetor.length; i++) {
        for (let j = 1; j < vetor[i].length; j++) {
            dados = vetor[i][1];
            retorno += ' document.getElementById("' + dados + '").value = "";\n';
        }
    }
    return retorno;
}
function bloquearAtributos(vetor) {
    let retorno = [];
    for (let i = 0; i < vetor.length; i++) {
        for (let j = 1; j < vetor[i].length; j++) {
            dados = vetor[i][1];
            retorno += ' document.getElementById("' + dados + '").disabled= soLeitura;\n';
        }
    }
    return retorno;
}

function procure() {
    bloquearAtributosId(false)
    const id = parseInt(document.getElementById("id").value);
    if (id > 0) { // se digitou um Placa
        eletronico = procurePorChavePrimaria(id);
        if (eletronico) { //achou na lista
            mostrarDadoseletronico(eletronico);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('none', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        alert('Erro nos dados digitados')
        document.getElementById("id").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    const id = parseInt(document.getElementById("id").value);
    if (procurePorChavePrimaria(id) !== null) {
        alert('impossivel listar')
    }
    else if (id < 0) {
        alert('impossivel listar')
    }
    else {
        bloquearAtributos(false);
        visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
        oQueEstaFazendo = 'inserindo';
        mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
        document.getElementById("id").focus();
    }
}