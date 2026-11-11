import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { startAnalytics } from './lib/analytics';

const container = document.getElementById('root');

// The production build prerenders the page into #root (scripts/seo/prerender.js),
// so crawlers and the first paint get the full content: hydrate it. The dev server
// serves an empty #root: render from scratch.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <React.StrictMode>
      <App prerendered />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

startAnalytics();
