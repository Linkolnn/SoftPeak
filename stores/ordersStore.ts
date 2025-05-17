import { defineStore } from 'pinia';
import { persistedState } from '~/plugins/pinia-persistence';
import { useProductStore } from './productStore';
import { useAuthStore } from './authStore';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  address: string;
}

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
  }),
  
  getters: {
    orderCount: (state) => state.orders.length,
    getOrderById: (state) => (orderId: string) => state.orders.find(order => order.id === orderId),
  },
  
  actions: {
    // Add a new order and update purchased products
    addOrder(order: Order) {
      // Add the order to the beginning of the array
      this.orders.unshift(order);
      
      // Update purchased products in the product store
      const productStore = useProductStore();
      const productIds = order.items.map(item => item.id);
      productStore.addMultipleToPurchasedProducts(productIds);
      
      // Save the updated orders and purchased products
      const authStore = useAuthStore();
      if (authStore.user?.id) {
        this.saveUserOrders(authStore.user.id);
        productStore.saveUserProductData(authStore.user.id);
      }
    },
    
    // Create a new order from cart items
    createOrder(cartItems: any[], address: string, paymentMethod: string) {
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const orderDate = new Date();
      
      // Calculate total
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Create order items
      const orderItems = cartItems.map(item => ({
        id: parseInt(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));
      
      // Create the order object
      const order: Order = {
        id: orderId,
        date: orderDate,
        status: 'processing',
        items: orderItems,
        total,
        paymentMethod,
        address
      };
      
      // Add the order
      this.addOrder(order);
      
      return orderId;
    },
    
    // Update an order's status
    updateOrderStatus(orderId: string, status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled') {
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        
        // Save the updated orders
        const authStore = useAuthStore();
        if (authStore.user?.id) {
          this.saveUserOrders(authStore.user.id);
        }
      }
    },
    
    clearOrders() {
      this.orders = [];
      
      // Clear purchased products in the product store
      const productStore = useProductStore();
      productStore.clearPurchasedProducts();
      
      // Save the cleared data
      const authStore = useAuthStore();
      if (authStore.user?.id) {
        this.saveUserOrders(authStore.user.id);
        productStore.saveUserProductData(authStore.user.id);
      }
    },
    
    // Load orders for a specific user
    loadUserOrders(userId: string) {
      const userOrders = localStorage.getItem(`orders_${userId}`);
      if (userOrders) {
        try {
          // Parse dates from string back to Date objects
          const parsedOrders = JSON.parse(userOrders);
          this.orders = parsedOrders.map((order: any) => {
            try {
              // Convert date string to Date object safely
              const dateObj = order.date ? new Date(order.date) : new Date();
              
              // Verify the date is valid
              const validDate = !isNaN(dateObj.getTime()) ? dateObj : new Date();
              
              return {
                ...order,
                date: validDate
              };
            } catch (dateError) {
              console.error('Failed to parse date for order:', dateError);
              return {
                ...order,
                date: new Date()
              };
            }
          });
        } catch (e) {
          console.error('Failed to parse orders from localStorage:', e);
          this.orders = [];
        }
      }
    },
    
    // Save orders for a specific user
    saveUserOrders(userId: string) {
      if (userId) {
        localStorage.setItem(`orders_${userId}`, JSON.stringify(this.orders));
      }
    }
  },
  
  persist: {
    storage: persistedState.localStorage,
  }
});
