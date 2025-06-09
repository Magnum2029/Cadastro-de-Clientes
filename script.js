const API_URL = 'https://crudcrud.com/api/cd1671958fc2480da91df2bcae935383/clientes'; // Substitua pelo seu endpoint!

const form = document.getElementById('form-cliente');
const lista = document.getElementById('lista-clientes');

// Submete o formulário para cadastrar cliente
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !email) return;

  const cliente = { nome, email };

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });

    form.reset();
    carregarClientes();
  } catch (erro) {
    console.error('Erro ao cadastrar cliente:', erro);
  }
});

// Carrega e exibe todos os clientes
async function carregarClientes() {
  lista.innerHTML = '';

  try {
    const resposta = await fetch(API_URL);
    const clientes = await resposta.json();

    if (clientes.length === 0) {
      lista.innerHTML = '<li>Nenhum cliente cadastrado.</li>';
      return;
    }

    clientes.forEach(cliente => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${cliente.nome}</strong> (${cliente.email})
        <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
      `;
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error('Erro ao carregar clientes:', erro);
  }
}

// Exclui cliente por ID
async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    carregarClientes();
  } catch (erro) {
    console.error('Erro ao excluir cliente:', erro);
  }
}

// Carrega os clientes ao iniciar
carregarClientes();