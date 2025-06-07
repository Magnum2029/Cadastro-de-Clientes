const apiBaseUrl = "https://crudcrud.com/api/81ee346ab2b2408d8d45444a3067b743/unicórnios";

const form = document.getElementById("cliente-form");
const nomeInput = Document.getElementById("nome");
const emailInput = document.getElementById("email");
const listaClientes = document.getElementById("clientes-lista");

// Carregar clientes ao iniciar
document.addEventListener("DOMContentLoaded", () => {
    carregarClientes();
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const cliente = {
        nome: nomeInput.value.trim(),
        email: emailInput.value.trim()
    };

    if (!cliente.nome || !cliente.email) return;

    fetch(apiBaseUrl, {
        method: "POST",
        headers: {"Content-Type": "application/jon" },
        body: JSON.stringify(cliente)
    })
    .then(res => res.json() )
    .then(data => {
        adicionarClienteNaTela(data);
        form.reset();
    })
    .catch(err => console.error("Erro ao cadastrar:", err));
});

function carregarClientes() {
    fetch(apiBaseUrl)
    .then(res => res.json())
    .then(clientes => {
        listaClientes.innerHTML = "";
        clientes.forEach(adicionarClienteNaTela);
    })
    .catch(err => console.error("Erro ao carregar:", err));
}

function adicionarClienteNaTela(cliente) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span><strong>${cliente.nome}</strong> - ${cliente.email}</span>
    <button class="delete-btn">Excluir</button>
    `;

    const btnExcluir = li.querySelector(".delete-btn");
    btnExcluir.addEventListener("click", () => {
     fetch(`${apiBaseUrl}/${cliente._id}`, {
        method:"DELETE"
     })
     .then(() => li.remove())
     .catch(err => console.error("erro ao excluir cliente:", err));
    });

    listaClientes.appendChild(li);
}