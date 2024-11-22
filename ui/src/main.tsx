import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './scss/common.scss';
import '@devgateway/customizer/index.css';
import 'semantic-ui-css/semantic.min.css';

createRoot(document.***REMOVED***('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// serviceWorker.unregister();
