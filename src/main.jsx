import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { GlobalProvider } from './frontend/context/GlobalContext.jsx'; // Correctly import GlobalProvider
import "./frontend/styles/index.scss";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
);
