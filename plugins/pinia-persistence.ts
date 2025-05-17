import { defineNuxtPlugin } from '#app';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Define global storage options for Pinia persistence
export const persistedState = {
  localStorage: {
    getItem: (key: string): string | null => {
      return localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value);
    },
  },
  sessionStorage: {
    getItem: (key: string): string | null => {
      return sessionStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      sessionStorage.setItem(key, value);
    },
  },
};

export default defineNuxtPlugin(nuxtApp => {
  // Only use persistence plugin on the client side
  if (process.client) {
    nuxtApp.$pinia.use(piniaPluginPersistedstate);
  }
});
