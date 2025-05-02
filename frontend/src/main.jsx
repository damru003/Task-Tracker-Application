import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContentProvider } from './context/AppContext.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContentProvider>
    <Toaster position="top-center" />
      <App />
    </AppContentProvider>
  </BrowserRouter>,
)
