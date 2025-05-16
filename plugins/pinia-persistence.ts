import { defineNuxtPlugin } from '#app';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin(nuxtApp => {
  // Only use persistence plugin on the client side
  if (process.client) {
    nuxtApp.$pinia.use(piniaPluginPersistedstate);
  }
});
