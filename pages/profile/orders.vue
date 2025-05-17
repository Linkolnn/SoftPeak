<template>
  <div class="profile-orders-page">
    <div class="container">
      <h1 class="page-title">История заказов</h1>
      
      <div class="orders-content">
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Загрузка заказов...</p>
        </div>
        
        <div v-else-if="!orders.length" class="empty-state">
          <PlaceholderImage 
            width="200px" 
            height="150px" 
            bgColor="#f5f5f5" 
            fontSize="1.2rem"
          />
          <p class="empty-text">У вас пока нет заказов</p>
          <NuxtLink to="/catalog" class="btn btn-primary">
            Перейти в каталог
          </NuxtLink>
        </div>
        
        <div v-else class="orders-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <div class="order-header">
              <div class="order-info">
                <div class="order-number">Заказ #{{ order.id }}</div>
                <div class="order-date">{{ formatDate(order.date) }}</div>
              </div>
              <div class="order-status" :class="order.status">
                <FontAwesomeIcon :icon="getStatusIcon(order.status)" class="status-icon" />
                {{ getStatusText(order.status) }}
              </div>
            </div>
            
            <div class="order-products">
              <div v-for="item in order.items" :key="item.id" class="order-product">
                <div class="product-image">
                  <img :src="item.image || '/images/products/placeHolder.png'" :alt="item.name" />
                </div>
                <div class="product-info">
                  <div class="product-name">{{ item.name }}</div>
                  <div class="product-price">{{ formatPrice(item.price) }} × {{ item.quantity }}</div>
                </div>
              </div>
            </div>
            
            <div class="order-details">
              <div class="detail-item">
                <div class="detail-label">Способ оплаты:</div>
                <div class="detail-value">{{ getPaymentMethod(order.paymentMethod) }}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Адрес доставки:</div>
                <div class="detail-value">{{ order.address }}</div>
              </div>
            </div>
            
            <div class="order-footer">
              <div class="order-total">
                <span class="total-label">Итого:</span>
                <span class="total-price">{{ formatPrice(order.total) }}</span>
              </div>
              <div class="order-actions">
                <button class="btn btn-outline-primary btn-sm" @click="reorderItems(order)">
                  <FontAwesomeIcon icon="shopping-cart" class="btn-icon" /> Повторить заказ
                </button>
                <button class="btn btn-outline-secondary btn-sm" @click="downloadInvoice(order.id)">
                  <FontAwesomeIcon icon="download" class="btn-icon" /> Скачать чек
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '~/stores/authStore';
import { useCartStore } from '~/stores/cartStore';
import { useOrdersStore } from '~/stores/ordersStore';

// Define middleware to protect this route
definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const cartStore = useCartStore();
const ordersStore = useOrdersStore();
const router = useRouter();

// Check if user is authenticated
if (!authStore.isAuthenticated) {
  router.push('/login');
}

// Orders data from store
const orders = computed(() => ordersStore.orders);
const isLoading = ref(false);

// Helper methods
const formatDate = (date: Date | string) => {
  try {
    // Convert string to Date if needed
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Дата не указана';
    }
    
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Дата не указана';
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price);
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Ожидает оплаты';
    case 'processing':
      return 'В обработке';
    case 'shipped':
      return 'Отправлен';
    case 'completed':
      return 'Выполнен';
    case 'cancelled':
      return 'Отменен';
    default:
      return 'Неизвестный статус';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return 'clock';
    case 'processing':
      return 'cog';
    case 'shipped':
      return 'truck';
    case 'completed':
      return 'check-circle';
    case 'cancelled':
      return 'times-circle';
    default:
      return 'question-circle';
  }
};

const getPaymentMethod = (method: string) => {
  const methodMap: Record<string, string> = {
    'card': 'Банковская карта',
    'online': 'Онлайн-платеж',
    'cash': 'Наличные при получении'
  };
  
  return methodMap[method] || method;
};

// Actions
const reorderItems = (order: any) => {
  // Clear the cart first
  cartStore.clearCart();
  
  // Add all items from the order to the cart
  order.items.forEach((item: any) => {
    cartStore.addToCart({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      image: item.image
    });
    
    // If quantity > 1, update the quantity
    if (item.quantity > 1) {
      cartStore.updateQuantity(item.id.toString(), item.quantity);
    }
  });
  
  // Save cart for the current user
  if (authStore.user?.id) {
    cartStore.saveUserCart(authStore.user.id);
  }
  
  // Redirect to cart
  router.push('/cart');
};

const downloadInvoice = (orderId: string) => {
  // In a real app, this would download an invoice
  alert(`Скачивание чека для заказа #${orderId}`);
};

// Fetch orders on component mount
onMounted(async () => {
  isLoading.value = true;
  
  try {
    // If we have no orders and user is authenticated, try to load them
    if (orders.value.length === 0 && authStore.user?.id) {
      ordersStore.loadUserOrders(authStore.user.id);
    }
    
    // If we still have no orders, add some demo orders
    if (orders.value.length === 0) {
      // Add some demo orders
      const demoOrders = [
        {
          id: '12345',
          date: new Date(2025, 4, 10),
          status: 'completed',
          items: [
            { id: 1, name: 'Adobe Photoshop', price: 12990, quantity: 1, image: '/images/products/placeHolder.png' },
            { id: 2, name: 'Microsoft Office', price: 8990, quantity: 1, image: '/images/products/placeHolder.png' }
          ],
          total: 21980,
          paymentMethod: 'card',
          address: 'г. Москва, ул. Примерная, д. 123, кв. 45'
        },
        {
          id: '12346',
          date: new Date(2025, 4, 5),
          status: 'shipped',
          items: [
            { id: 3, name: 'Антивирус Касперского', price: 3990, quantity: 1, image: '/images/products/placeHolder.png' }
          ],
          total: 3990,
          paymentMethod: 'card',
          address: 'г. Москва, ул. Примерная, д. 123, кв. 45'
        }
      ];
      
      // Add demo orders to the store
      demoOrders.forEach(order => {
        ordersStore.addOrder(order);
      });
      
      // Save to localStorage if user is authenticated
      if (authStore.user?.id) {
        ordersStore.saveUserOrders(authStore.user.id);
      }
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  } finally {
    isLoading.value = false;
  }
});

// SEO metadata
useSeoMeta({
  title: 'История заказов | SoftPeak',
  description: 'Просмотр истории заказов и повторное оформление покупок в интернет-магазине SoftPeak'
});
</script>

<style lang="scss" scoped>
.profile-orders-page {
  padding: $spacer * 2 0;
  
  .page-title {
    margin-bottom: $spacer * 2;
  }
  
  .loading-state, .empty-state {
    text-align: center;
    padding: $spacer * 3;
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow-sm;
  }
  
  .loading-state {
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba($primary, 0.1);
      border-left-color: $primary;
      border-radius: 50%;
      margin: 0 auto $spacer;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }
  
  .empty-state {
    .empty-text {
      margin: $spacer 0;
      color: $gray-600;
    }
  }
  
  .orders-list {
    display: flex;
    flex-direction: column;
    gap: $spacer * 1.5;
  }
  
  .order-card {
    background-color: white;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: $box-shadow-sm;
    
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacer;
      background-color: $gray-100;
      border-bottom: 1px solid $gray-200;
    }
    
    .order-number {
      font-weight: $font-weight-bold;
    }
    
    .order-date {
      font-size: $font-size-sm;
      color: $gray-600;
    }
    
    .order-status {
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      padding: $spacer * 0.25 $spacer * 0.5;
      border-radius: $border-radius-pill;
      
      &.pending {
        background-color: $warning-light;
        color: $warning;
      }
      
      &.processing {
        background-color: $info-light;
        color: $info;
      }
      
      &.shipped {
        background-color: $primary-light;
        color: $primary;
      }
      
      &.completed {
        background-color: $success-light;
        color: $success;
      }
      
      &.cancelled {
        background-color: $danger-light;
        color: $danger;
      }
    }
    
    .order-products {
      padding: $spacer;
      border-bottom: 1px solid $gray-200;
    }
    
    .order-product {
      display: flex;
      align-items: center;
      margin-bottom: $spacer;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .product-image {
        width: 60px;
        height: 60px;
        border-radius: $border-radius;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .product-info {
        margin-left: $spacer;
        flex: 1;
      }
      
      .product-name {
        font-weight: $font-weight-medium;
      }
      
      .product-price {
        font-size: $font-size-sm;
        color: $gray-600;
      }
    }
    
    .order-details {
      padding: $spacer;
      border-bottom: 1px solid $gray-200;
      background-color: $gray-50;
      
      .detail-item {
        display: flex;
        margin-bottom: $spacer * 0.5;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
      
      .detail-label {
        font-weight: $font-weight-medium;
        min-width: 150px;
      }
      
      .detail-value {
        color: $gray-700;
      }
    }
    
    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacer;
      
      @media (max-width: map-get($breakpoints, sm)) {
        flex-direction: column;
        align-items: flex-start;
        gap: $spacer;
      }
    }
    
    .order-total {
      font-weight: $font-weight-bold;
      
      .total-price {
        color: $primary;
        margin-left: $spacer * 0.5;
      }
    }
    
    .order-actions {
      display: flex;
      gap: $spacer * 0.5;
      
      .btn-sm {
        padding: $spacer * 0.25 $spacer * 0.5;
        font-size: $font-size-sm;
      }
    }
  }
}
</style>
