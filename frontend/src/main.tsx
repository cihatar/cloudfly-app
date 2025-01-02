import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx';
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { UploadProvider } from './context/UploadContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UploadProvider>
        <App />
        <Toaster />
      </UploadProvider>
    </Provider>
  </StrictMode>,
)
