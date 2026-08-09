import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './components/MainPage/MainPage';
import { AppShell } from './components/AppShell/AppShell';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Загрузка...</div>}>
        <AppShell>
          <HashRouter>
            <App />
          </HashRouter>
        </AppShell>
      </PersistGate>
    </Provider>
  </StrictMode>
);
