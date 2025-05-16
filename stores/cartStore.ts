import { defineStore } from 'pinia';

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
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    promoCode: null,
    promoDiscount: 0
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
    },
    
    removeFromCart(productId: string) {
      const index = this.items.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    
    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId);
        } else {
          item.quantity = quantity;
        }
      }
    },
    
    clearCart() {
      this.items = [];
      this.promoCode = null;
      this.promoDiscount = 0;
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
    }
  },
  
  persist: {
    storage: process.client ? localStorage : null,
  },
});
