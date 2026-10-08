let chamados = [
    {
        id: 1,
        titulo: "Computador não liga",
        descricao: "O computador do setor não está iniciando.",
        categoria: "Computador",
        prioridade: "Alta",
        solicitante: "João",
        status: "Aberto",
        data: "2026-10-06"
    },
    {
        id: 2,
        titulo: "Internet lenta",
        descricao: "A conexão está muito lenta durante o expediente.",
        categoria: "Internet",
        prioridade: "Média",
        solicitante: "Maria",
        status: "Em andamento",
        data: "2026-10-07"
    },
    {
        id: 3,
        titulo: "Sistema apresenta erro",
        descricao: "Erro ao tentar acessar o sistema interno.",
        categoria: "Sistema",
        prioridade: "Alta",
        solicitante: "Carlos",
        status: "Concluído",
        data: "2026-10-05"
    }
];

function carregarRegistros() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(chamados);
        }, 1000);
    });
}

async function iniciarAplicacao() {
    const lista = document.getElementById("listaChamados");

    lista.innerHTML = "<p>Carregando chamados...</p>";

    const dados = await carregarRegistros();

    chamados = dados;

    renderizar();
}

function atualizarDashboard() {

    document.getElementById("total").textContent = chamados.length;

    document.getElementById("abertos").textContent =
        chamados.filter(chamado => chamado.status === "Aberto").length;

    document.getElementById("andamento").textContent =
        chamados.filter(chamado => chamado.status === "Em andamento").length;

    document.getElementById("concluidos").textContent =
        chamados.filter(chamado => chamado.status === "Concluído").length;
}

function renderizar() {

    atualizarDashboard();

    const lista = document.getElementById("listaChamados");

    const busca = document.getElementById("busca").value.toLowerCase();

    const filtro = document.getElementById("filtroStatus").value;

    const filtrados = chamados.filter(chamado => {

        const correspondeBusca =
            chamado.titulo.toLowerCase().includes(busca);

        const correspondeStatus =
            filtro === "Todos" || chamado.status === filtro;

        return correspondeBusca && correspondeStatus;
    });

    lista.innerHTML = "";

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum chamado encontrado.</p>";
        return;
    }

    filtrados.forEach(chamado => {

        const div = document.createElement("div");

        div.className = "chamado";

        div.innerHTML = `
            <h3>${chamado.titulo}</h3>

            <p><strong>Categoria:</strong> ${chamado.categoria}</p>

            <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>

            <p><strong>Solicitante:</strong> ${chamado.solicitante}</p>

            <p><strong>Status:</strong> ${chamado.status}</p>

            <div class="acoes">

                <select onchange="alterarStatus(${chamado.id}, this.value)">
                    <option value="Aberto" ${chamado.status === "Aberto" ? "selected" : ""}>
                        Aberto
                    </option>

                    <option value="Em andamento" ${chamado.status === "Em andamento" ? "selected" : ""}>
                        Em andamento
                    </option>

                    <option value="Concluído" ${chamado.status === "Concluído" ? "selected" : ""}>
                        Concluído
                    </option>
                </select>

                <button onclick="mostrarDetalhes(${chamado.id})">
                    Ver detalhes
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}

function alterarStatus(id, novoStatus) {

    const chamado = chamados.find(chamado => chamado.id === id);

    if (chamado) {
        chamado.status = novoStatus;
    }

    renderizar();
}

function mostrarDetalhes(id) {

    const chamado = chamados.find(chamado => chamado.id === id);

    if (!chamado) {
        return;
    }

    const detalhes = document.getElementById("detalhes");

    detalhes.innerHTML = `
        <h2>${chamado.titulo}</h2>

        <p><strong>ID:</strong> ${chamado.id}</p>
        <p><strong>Descrição:</strong> ${chamado.descricao}</p>
        <p><strong>Categoria:</strong> ${chamado.categoria}</p>
        <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>
        <p><strong>Solicitante:</strong> ${chamado.solicitante}</p>
        <p><strong>Status:</strong> ${chamado.status}</p>
        <p><strong>Data:</strong> ${chamado.data}</p>
    `;

    document.getElementById("modal").style.display = "flex";
}

document.getElementById("fecharModal").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});

document.getElementById("busca").addEventListener("input", renderizar);

document.getElementById("filtroStatus").addEventListener("change", renderizar);

document.getElementById("formChamado").addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const categoria = document.getElementById("categoria").value;
    const prioridade = document.getElementById("prioridade").value;
    const solicitante = document.getElementById("solicitante").value.trim();

    const erro = document.getElementById("erro");

    if (titulo.length < 5) {
        erro.textContent = "O título deve ter pelo menos 5 caracteres.";
        return;
    }

    if (descricao.length < 10) {
        erro.textContent = "A descrição deve ter pelo menos 10 caracteres.";
        return;
    }

    if (categoria === "") {
        erro.textContent = "Selecione uma categoria.";
        return;
    }

    if (prioridade === "") {
        erro.textContent = "Selecione uma prioridade.";
        return;
    }

    if (solicitante.length < 3) {
        erro.textContent = "Informe o nome do solicitante.";
        return;
    }

    const novoChamado = {
        id: chamados.length + 1,
        titulo: titulo,
        descricao: descricao,
        categoria: categoria,
        prioridade: prioridade,
        solicitante: solicitante,
        status: "Aberto",
        data: new Date().toISOString().split("T")[0]
    };

    chamados.push(novoChamado);

    document.getElementById("formChamado").reset();

    erro.textContent = "";

    renderizar();
});

iniciarAplicacao();