import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Application root is missing.');
if (root.querySelector('main')) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
