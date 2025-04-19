import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { StoreProvider } from './context/StoreContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <CartProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartProvider>
  </StoreProvider>
)
