// =========================================
// MENU MOBILE (navbar da index.html)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const aberto = navLinks.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', aberto);
        });

        // Fecha o menu ao clicar em um link (útil no celular)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // =========================================
    // FORMULÁRIO DE LOGIN (login.html)
    // =========================================
    // Envia via JavaScript em vez de action="loja.html" para o
    // e-mail e a senha não aparecerem na URL da próxima página.
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();
            window.location.href = 'loja.html';
        });
    }
});

// Estrutura para armazenar os itens do carrinho
let carrinho = [];

// Adiciona um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

// Altera a quantidade (+1 ou -1)
function alterarQuantidade(nome, mudanca) {
    const item = carrinho.find(item => item.nome === nome);
    if (item) {
        item.quantidade += mudanca;
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(i => i.nome !== nome);
        }
    }
    atualizarCarrinho();
}

// Atualiza a interface do carrinho (HTML e Totais)
function atualizarCarrinho() {
    const containerItens = document.getElementById('itensCarrinho');
    const totalElemento = document.getElementById('totalValor');
    const countElemento = document.getElementById('cartCount');

    if (!containerItens) return; // Se não estiver na página da loja

    // Limpa a lista atual
    containerItens.innerHTML = '';

    let total = 0;
    let totalItens = 0;

    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.<br>Escolha um gelato ao lado!</p>';
    } else {
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            totalItens += item.quantidade;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-carrinho';
            itemDiv.innerHTML = `
                <div class="item-info">
                    <h4>${item.nome}</h4>
                    <p>R$ ${item.preco.toFixed(2)} un.</p>
                </div>
                <div class="item-qtd">
                    <button class="btn-qtd" onclick="alterarQuantidade('${item.nome}', -1)">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-qtd" onclick="alterarQuantidade('${item.nome}', 1)">+</button>
                </div>
            `;
            containerItens.appendChild(itemDiv);
        });
    }

    totalElemento.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    countElemento.innerText = totalItens;
}

// Finaliza a compra
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Adicione pelo menos um item antes de finalizar.');
        return;
    }

    alert('🍨 Pedido realizado com sucesso! Seu pedido já está sendo preparado com muito carinho.');
    carrinho = [];
    atualizarCarrinho();
}

// Rola suavemente até o carrinho no celular
function scrollToCarrinho() {
    const carrinhoElement = document.getElementById('carrinhoSection');
    if (carrinhoElement) {
        carrinhoElement.scrollIntoView({ behavior: 'smooth' });
    }
}