
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import PWA elements conditionally to prevent build errors
const loadPwaElements = async () => {
  try {
    const { defineCustomElements } = await import('@ionic/pwa-elements/loader');
    defineCustomElements(window);
  } catch (error) {
    console.warn('Failed to load PWA elements:', error);
  }
};

// Call the element loader after the platform has been bootstrapped
loadPwaElements();

createRoot(document.getElementById("root")!).render(<App />);
