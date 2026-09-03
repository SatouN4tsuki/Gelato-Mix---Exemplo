// =========================================================
// ANIMAÇÃO: ROLAGEM SUAVE DO MENU DE NAVEGAÇÃO (index.html)
// =========================================================
// Em vez de "teleportar" direto para a seção ao clicar em
// Início / Sobre / Cardápio / Contato, a página desce
// suavemente até o destino, para o usuário acompanhar a rolagem.

document.addEventListener('DOMContentLoaded', () => {
    const ALTURA_HEADER = 66; // altura da navbar fixa, em pixels
    const DURACAO_ANIMACAO = 900; // em milissegundos

    const linksAncora = document.querySelectorAll('a[href^="#"]');
    const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!linksAncora.length) return;

    linksAncora.forEach((link) => {
        link.addEventListener('click', (evento) => {
            const destinoId = link.getAttribute('href');
            const destino = document.querySelector(destinoId);
            if (!destino) return;

            evento.preventDefault();

            if (prefereMenosMovimento) {
                destino.scrollIntoView();
                return;
            }

            const posicaoDestino =
                destino.getBoundingClientRect().top + window.scrollY - ALTURA_HEADER;

            rolarSuavementePara(posicaoDestino, DURACAO_ANIMACAO);

            if (history.pushState) {
                history.pushState(null, '', destinoId);
            }
        });
    });

    // Anima a rolagem da página até uma posição Y, com duração e
    // suavização (easing) próprias — dá a sensação de "a tela
    // descendo" até o destino, em vez de um pulo instantâneo.
    function rolarSuavementePara(destinoY, duracao) {
        const origemY = window.scrollY;
        const distancia = destinoY - origemY;
        const inicio = performance.now();

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        function passo(tempoAtual) {
            const tempoDecorrido = tempoAtual - inicio;
            const progresso = Math.min(tempoDecorrido / duracao, 1);
            window.scrollTo(0, origemY + distancia * easeInOutQuad(progresso));

            if (progresso < 1) {
                requestAnimationFrame(passo);
            }
        }

        requestAnimationFrame(passo);
    }
});
