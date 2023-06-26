/* eslint-disable no-restricted-globals */
// Assegna un nome univoco al tuo Service Worker
const CACHE_NAME = "offline-cache";

// Definisci l'array di risorse che desideri memorizzare nella cache
const urlsToCache = [
  "/",
  "/offline.html",
];

// Installazione del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Aggiunge tutte le risorse nella cache
      return cache.addAll(urlsToCache);
    })
  );
});

// Gestione delle richieste fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // Verifica se la risorsa richiesta è disponibile nella cache
    caches.match(event.request).then((response) => {
      // Se la risorsa è presente nella cache, restituiscila
      if (response) {
        return response;
      }

      // Se l'utente è offline, restituisci la pagina offline.html
      if (!navigator.onLine) {
        return caches.match("/offline.html");
      }

      // Altrimenti, effettua una richiesta di rete per ottenere la risorsa
      return fetch(event.request).then((response) => {
        // Verifica se la richiesta è andata a buon fine
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Clona la risposta ottenuta
        const responseToCache = response.clone();

        // Aggiungi la risorsa alla cache
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        // Restituisci la risposta
        return response;
      });
    })
  );
});
