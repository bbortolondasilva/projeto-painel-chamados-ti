var n_chamado = 0
var baixaQuantidade = 0
var mediaQuantidade = 0
var altaQuantidade = 0
var criticaQuantidade = 0
var computadorQuantidade = 0
var redeQuantidade = 0
var impressoraQuantidade = 0
var perifericosQuantidade = 0
var notebookQuantidade = 0

function criaChamado() {
    // Consegue os dados do chamado
    let nome = document.getElementById("inome").value
    let setor = document.getElementById("isetor").value
    let problema = document.getElementById("iproblema").value
    let prioridade = document.getElementById("iprioridade").value
    let descricao = document.getElementById("idescricao").value

    // Altera o número do chamado
    n_chamado++

    // Soma a quantidade por prioridade
    somaPrioridade(prioridade)

    // Soma a quantidade por problema
    somaProblema(problema)

    // Captura a data e hora no momento da criação do chamado
    let data_chamado = new Date().toLocaleString("pt-BR")

    // Retorna os dados formatados
    return `
    <p class="m-0 mb-1"><strong>Data do Chamado</strong>: ${data_chamado}</p> 
    <p class="m-0 mb-1"><strong>Solicitante</strong>: ${nome}</p> 
    <p class="m-0 mb-1"><strong>Setor</strong>: ${setor}</p> 
    <p class="m-0 mb-1"><strong>Problema</strong>: ${problema}</p> 
    <p class="m-0 mb-1"><strong>Prioridade</strong>: ${prioridade}</p> 
    <p class="m-0 mb-1"><strong>Descrição</strong>: ${descricao}</p> 
    `
} 

function setPrioridade(ultimoChamado, prioridade) {
    let p = prioridade
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

    // console.log(p)

    ultimoChamado.style.setProperty(
        "--cor-prioridade",
        `var(--p-${p})`
    )

    ultimoChamado.style.setProperty(
        "--cor-hover",
        `var(--p-${p}-hover)`
    )
}

function somaPrioridade(prioridade) {
    var p = prioridade
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

    if (p === "baixa") {
        baixaQuantidade++
        console.log("Baixa: " + baixaQuantidade)
    } 

    else if (p === "media") {
        mediaQuantidade++
        console.log("Média: " + mediaQuantidade)
    }

    else if (p === "alta") {
        altaQuantidade++
        console.log("Alta: " + altaQuantidade)
    }

    else {
        criticaQuantidade++
        console.log("Crítica: " + criticaQuantidade)
    }

    atualizaCardsPrioridade()
}

function atualizaCardsPrioridade() {
    document.querySelector("#prioridade-baixa .quantidade").innerText = baixaQuantidade

    document.querySelector("#prioridade-media .quantidade").innerText = mediaQuantidade

    document.querySelector("#prioridade-alta .quantidade").innerText = altaQuantidade

    document.querySelector("#prioridade-critica .quantidade").innerText = criticaQuantidade

    document.querySelector("#total-chamados .quantidade").innerText = n_chamado
}

function somaProblema(problema) {
    var p = problema
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

    // 3 iguais significam que o valor testado deve ser igual tanto em conteúdo quanto em tipo para que seja retornado verdadeiro.
    if (p === "computador") {
        computadorQuantidade++
        console.log("Computador: " + computadorQuantidade)
    }

    else if (p === "rede") {
        redeQuantidade++
        console.log("Rede: " + redeQuantidade)
    }

    else if (p === "impressora") {
        impressoraQuantidade++
        console.log("Impressora: " + impressoraQuantidade)
    }

    else if (p === "perifericos") {
        perifericosQuantidade++
        console.log("Notebook: " + perifericosQuantidade)
    }

    else {
        notebookQuantidade++
        console.log("Notebook: " + notebookQuantidade)
    }

    atualizaTabelaProblema()
}

function atualizaTabelaProblema() {
    document.getElementById("quantidadeComputador").innerText = computadorQuantidade

    document.getElementById("quantidadeRede").innerText = redeQuantidade

    document.getElementById("quantidadeImpressora").innerText = impressoraQuantidade

    document.getElementById("quantidadePerifericos").innerText = perifericosQuantidade

    document.getElementById("quantidadeNotebook").innerText = notebookQuantidade
}

function modoClaro() {
    var modoAtual = document.getElementById("corpo").getAttribute("data-bs-theme")

    if (modoAtual == "light") {
        document.getElementById("corpo").setAttribute("data-bs-theme", "dark")
    }

    else {
        document.getElementById("corpo").setAttribute("data-bs-theme", "light")
    }
}

// Função para testes apenas
// function mostraConsole() {
//     console.log(criaChamado())
// }

function adicionaChamado() {
    let chamado = criaChamado()

    let prioridade = document.getElementById("iprioridade").value

    let lista_chamados = document.getElementById("lista-chamados")

    lista_chamados.innerHTML += `
    <div class="chamado">
        <div class="cabecalho">
            <h3 class="m-0">Chamado #${n_chamado}</h3>

            <p class="m-0">Aberto</p>
        </div>

        <div class="dados">
            ${chamado}
        </div>
    </div>
    `

    // Pega  a lista inteira de chamados
    let chamados = document.getElementsByClassName("chamado")

    // Seleciona o último chamado criado
    let ultimoChamado = chamados[chamados.length - 1]

    // Altera a cor da borda de acordo com a prioridade
    setPrioridade(ultimoChamado, prioridade)
}

document.getElementById("btnCadastra").addEventListener("click", (event) => {
    event.preventDefault()
    // Ao evitar o comportamento normal do elemento, alguns problemas surge, por exemplo o formulário não limpa mais os campos automaticamente ao dar submit.

    let form = document.querySelector("form")

    // Então precisamos verificar se o formulário é válido
    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }

    adicionaChamado()

    form.reset()
    // E também precisamos utilizar essa função no elemento form para que os campos sejam zerados.
})

document.getElementById("modo-claro").addEventListener("click", (event) => {modoClaro()})
