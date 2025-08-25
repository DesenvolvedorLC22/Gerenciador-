const CACHE_NAME = 'organizador-estudos-cache-v1';
const urlsToCache = [
  './', // Isso se refere ao seu arquivo HTML principal
  // Se você tivesse outros arquivos CSS ou JS, eles seriam listados aqui.
  // Como o seu está todo em um arquivo só, apenas './' é necessário.
];

// Evento de instalação: abre o cache e armazena os arquivos principais.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: intercepta as requisições de rede.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se a resposta estiver no cache, retorna a versão do cache.
        if (response) {
          return response;
        }
        // Se não, busca na rede.
        return fetch(event.request);
      }
    )
  );
});