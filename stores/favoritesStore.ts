import { defineStore } from 'pinia';
import { persistedState } from '~/plugins/pinia-persistence';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as any[],
  }),
  
  getters: {
    favoritesCount: (state) => state.favorites.length,
    isFavorite: (state) => (productId: number) => state.favorites.some(item => item.id === productId),
  },
  
  actions: {
    addToFavorites(product: any) {
      if (!this.isFavorite(product.id)) {
        this.favorites.push({
          id: product.id,
          name: product.name,
          price: product.price,
          discountPrice: product.discountPrice,
          category: product.category,
          rating: product.rating,
          reviewCount: product.reviewCount,
          image: product.image
        });
      }
    },
    
    removeFromFavorites(productId: number) {
      this.favorites = this.favorites.filter(item => item.id !== productId);
    },
    
    clearFavorites() {
      this.favorites = [];
    },
    
    // Load favorites for a specific user
    loadUserFavorites(userId: string) {
      const userFavorites = localStorage.getItem(`favorites_${userId}`);
      if (userFavorites) {
        try {
          this.favorites = JSON.parse(userFavorites);
        } catch (e) {
          console.error('Failed to parse favorites from localStorage:', e);
          this.favorites = [];
        }
      }
    },
    
    // Save favorites for a specific user
    saveUserFavorites(userId: string) {
      if (userId) {
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(this.favorites));
      }
    }
  },
  
  persist: {
    storage: persistedState.localStorage,
  }
});
