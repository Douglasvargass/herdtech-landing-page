// ==========================================================================
// 1. MENU DO CELULAR
// ==========================================================================
const menuBotao = document.getElementById('menu-botao');
const menu = document.getElementById('menu');

menuBotao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuBotao.setAttribute('aria-expanded', aberto);
    menuBotao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu ao clicar em um link
menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        menu.classList.remove('aberto');
        menuBotao.setAttribute('aria-expanded', 'false');
    });
});

// ==========================================================================
// 2. ANIMAÇÕES AO ROLAR A PÁGINA
// ==========================================================================
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Marca os blocos que devem aparecer suavemente
document.querySelectorAll('.numeros li, .cartao, .passo, .coluna, .grafico, .recursos').forEach((el) => {
    el.classList.add('revelar');
});

// Anima as barras do gráfico (largura proporcional ao valor)
function animarBarras(container) {
    container.querySelectorAll('.barra').forEach((barra) => {
        const percentual = (Number(barra.dataset.valor) / Number(barra.dataset.max)) * 100;
        barra.style.width = percentual + '%';
    });
}

// Faz os números "contarem" até o valor final
function contarNumero(el) {
    const alvo = Number(el.dataset.contar);
    const prefixo = el.dataset.prefixo || '';
    const sufixo = el.dataset.sufixo || '';
    const duracao = 1200;
    const inicio = performance.now();

    function passo(agora) {
        const progresso = Math.min((agora - inicio) / duracao, 1);
        el.textContent = prefixo + Math.round(alvo * progresso) + sufixo;
        if (progresso < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
}

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        const el = entrada.target;
        el.classList.add('visivel');

        if (el.classList.contains('grafico')) animarBarras(el);
        el.querySelectorAll('[data-contar]').forEach((n) => { if (!reduzirMovimento) contarNumero(n); });

        observador.unobserve(el);
    });
}, { threshold: 0.2 });

document.querySelectorAll('.revelar').forEach((el) => observador.observe(el));

// ==========================================================================
// 3. PWA: BOTÃO "INSTALAR APP"
// ==========================================================================
let eventoInstalacao = null;
const botaoInstalar = document.getElementById('btn-instalar');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    eventoInstalacao = e;
    botaoInstalar.hidden = false;
});

botaoInstalar.addEventListener('click', async () => {
    if (!eventoInstalacao) return;
    eventoInstalacao.prompt();
    await eventoInstalacao.userChoice;
    eventoInstalacao = null;
    botaoInstalar.hidden = true;
});

// ==========================================================================
// 4. PWA: SERVICE WORKER (funcionamento offline)
// ==========================================================================
// Só funciona em http(s); abrindo o arquivo direto (file://) o site continua normal.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    });
}
