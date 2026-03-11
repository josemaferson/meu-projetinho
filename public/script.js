const api = "http://localhost:3000/api/alunos";
let idEditando = null;

// CADASTRAR OU ATUALIZAR ALUNO
function salvarAluno() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;

    if (!nome || !idade || !curso) {
        alert("Preencha todos os campos!");
        return;
    }

    const metodo = idEditando ? "PUT" : "POST";
    const url = idEditando ? `${api}/${idEditando}` : api;

    fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            idade,
            curso
        })
    })
    .then(res => res.json())
    .then(() => {
        listarAlunos();
        limparCampos();
        idEditando = null;
        document.getElementById("btnSalvar").innerText = "Cadastrar";
    })
    .catch(err => console.error("Erro ao salvar aluno:", err));
}

// LISTAR ALUNOS
function listarAlunos() {
    fetch(api)
    .then(res => res.json())
    .then(alunos => {
        const tabela = document.getElementById("tabelaAlunos");
        tabela.innerHTML = "";

        alunos.forEach(aluno => {
            tabela.innerHTML += `
            <tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.curso}</td>
                <td>
                    <button onclick="deletarAluno(${aluno.id})">
                        Excluir
                    </button>
                    <button class="editar" onclick='prepararEdicao(${JSON.stringify(aluno)})'>
                        Editar
                    </button>
                </td>
            </tr>
            `;
        });
    })
    .catch(err => console.error("Erro ao listar alunos:", err));
}

// PREPARAR EDIÇÃO
function prepararEdicao(aluno) {
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;

    idEditando = aluno.id;
    document.getElementById("btnSalvar").innerText = "Atualizar";
}

// DELETAR ALUNO
function deletarAluno(id) {
    if (confirm("Deseja realmente excluir este aluno?")) {
        fetch(`${api}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            listarAlunos();
        })
        .catch(err => console.error("Erro ao deletar aluno:", err));
    }
}

// LIMPAR CAMPOS
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("curso").value = "";
    idEditando = null;
    document.getElementById("btnSalvar").innerText = "Cadastrar";
}

// CARREGAR ALUNOS AO ABRIR A PÁGINA
listarAlunos();