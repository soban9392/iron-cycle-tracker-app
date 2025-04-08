
import { useEffect, useState } from 'react';
import { App as CapApp } from '@capacitor/app';

export function useCapacitorApp() {
  const [isCapacitor, setIsCapacitor] = useState(false);

  useEffect(() => {
    // Check if running in a Capacitor environment
    const checkCapacitor = async () => {
      try {
        await CapApp.getInfo();
        setIsCapacitor(true);
      } catch (error) {
        setIsCapacitor(false);
      }
    };

    checkCapacitor();

    // Set up back button handling
    const handleBackButton = CapApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        CapApp.exitApp();
      } else {
        window.history.back();
      }
    });

    return () => {
      handleBackButton.remove();
    };
  }, []);

  return { isCapacitor };
}
