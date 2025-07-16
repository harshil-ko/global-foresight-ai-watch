import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Mobile landscape orientation enforcement
const enforceOrientation = () => {
  // Try to lock orientation to landscape on supported devices
  if ('screen' in window && 'orientation' in window.screen) {
    const screen = window.screen as any;
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => {
        // Fallback: orientation lock failed, CSS will handle the rest
      });
    }
  }
  
  // Add event listener for orientation changes
  const handleOrientationChange = () => {
    if (window.innerHeight > window.innerWidth) {
      // Portrait mode detected - CSS will handle hiding content
      document.body.classList.add('portrait-mode');
    } else {
      // Landscape mode
      document.body.classList.remove('portrait-mode');
    }
  };

  // Check initial orientation
  handleOrientationChange();
  
  // Listen for orientation changes
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', handleOrientationChange);
};

// Initialize orientation enforcement
enforceOrientation();

createRoot(document.getElementById("root")!).render(<App />);
