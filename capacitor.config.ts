
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d5a61e2306094b269c5b455f94aa60f8',
  appName: 'Iron Cycle Tracker',
  webDir: 'dist',
  server: {
    url: 'https://d5a61e23-0609-4b26-9c5b-455f94aa60f8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
