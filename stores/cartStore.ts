import { defineStore } from 'pinia';
import { persistedState } from '~/plugins/pinia-persistence';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
  userId: string | null;
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    promoCode: null,
    promoDiscount: 0,
    userId: null
  }),
  
  getters: {
    cartCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    cartTotal: (state) => {
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      return subtotal - (subtotal * state.promoDiscount);
    },
    
    subtotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    discount: (state) => {
      return state.subtotal * state.promoDiscount;
    },
    
    isEmpty: (state) => {
      return state.items.length === 0;
    }
  },
  
  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      
      // Save cart for the current user
      if (this.userId) {
        this.saveUserCart(this.userId);
      }
    },
    
    removeFromCart(productId: string) {
      const index = this.items.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
        
        // Save cart for the current user
        if (this.userId) {
          this.saveUserCart(this.userId);
        }
      }
    },
    
    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId);
        } else {
          item.quantity = quantity;
          
          // Save cart for the current user
          if (this.userId) {
            this.saveUserCart(this.userId);
          }
        }
      }
    },
    
    clearCart() {
      this.items = [];
      this.promoCode = null;
      this.promoDiscount = 0;
      
      // Save empty cart for the current user
      if (this.userId) {
        this.saveUserCart(this.userId);
      }
    },
    
    applyPromoCode(code: string) {
      // In a real app, you would validate the promo code with an API
      // This is just a simple example
      const promoCodes: Record<string, number> = {
        'WELCOME10': 0.1,
        'SUMMER20': 0.2,
        'FLASH30': 0.3
      };
      
      if (code in promoCodes) {
        this.promoCode = code;
        this.promoDiscount = promoCodes[code];
        return true;
      }
      
      return false;
    },
    
    removePromoCode() {
      this.promoCode = null;
      this.promoDiscount = 0;
      
      // Save updated cart with removed promo code
      if (this.userId) {
        this.saveUserCart(this.userId);
      }
    },
    
    // Set the current user ID
    setUserId(userId: string) {
      this.userId = userId;
      this.loadUserCart(userId);
    },
    
    // Clear user ID on logout
    clearUserId() {
      this.userId = null;
    },
    
    // Load cart for a specific user
    loadUserCart(userId: string) {
      const userCart = localStorage.getItem(`cart_${userId}`);
      if (userCart) {
        try {
          const parsedCart = JSON.parse(userCart);
          this.items = parsedCart.items || [];
          this.promoCode = parsedCart.promoCode || null;
          this.promoDiscount = parsedCart.promoDiscount || 0;
        } catch (e) {
          console.error('Failed to parse cart from localStorage:', e);
          this.clearCart();
        }
      } else {
        this.clearCart();
      }
    },
    
    // Save cart for a specific user
    saveUserCart(userId: string) {
      if (userId) {
        const cartData = {
          items: this.items,
          promoCode: this.promoCode,
          promoDiscount: this.promoDiscount
        };
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cartData));
      }
    }
  },
  
  persist: {
    storage: persistedState.localStorage,
    paths: ['items', 'promoCode', 'promoDiscount', 'userId'],
  },
});
