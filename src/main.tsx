import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './Root';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Impossible de trouver l'élément #root dans le fichier index.html.");
}

createRoot(container).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
