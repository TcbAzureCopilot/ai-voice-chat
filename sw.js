// Service Worker - AI 語音助手 PWA
const CACHE_NAME = 'ai-voice-chat-v1';
const CACHE_FILES = ['./', './index.html', './manifest.json'];

// 安裝：快取基本檔案
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(CACHE_FILES))
  );
  self.skipWaiting();
});

// 啟動：清除舊快取
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 請求：網路優先，失敗用快取
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});