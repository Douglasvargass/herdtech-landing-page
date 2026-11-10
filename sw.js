// Service worker da HerdTech: guarda os arquivos do site para abrir sem internet.
// Ao alterar qualquer arquivo do site, troque o número da versão abaixo (v1 -> v2),
// senão o navegador continua mostrando os arquivos antigos.
const VERSAO = 'herdtech-v1';

const ARQUIVOS = [
    './',
    './index.html',
    './css/style.css',
    './js/script.js',
    './manifest.json',
    './img/logo.png',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-maskable-512.png',
    './icons/apple-touch-icon.png',
    './icons/favicon-32.png'
];

// Instalação: guarda os arquivos em cache
self.addEventListener('install', (evento) => {
    evento.waitUntil(caches.open(VERSAO).then((cache) => cache.addAll(ARQUIVOS)));
    self.skipWaiting();
});

// Ativação: apaga caches de versões antigas
self.addEventListener('activate', (evento) => {
    evento.waitUntil(
        caches.keys().then((nomes) =>
            Promise.all(nomes.filter((n) => n !== VERSAO).map((n) => caches.delete(n)))
        )
    );
    self.clients.claim();
});

// Requisições: usa o cache primeiro e a rede como reserva
self.addEventListener('fetch', (evento) => {
    if (evento.request.method !== 'GET') return;
    evento.respondWith(
        caches.match(evento.request).then((guardado) => guardado || fetch(evento.request))
    );
});
