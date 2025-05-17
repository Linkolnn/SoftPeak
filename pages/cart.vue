<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title">Корзина</h1>
      
      <div v-if="cartStore.isEmpty" class="cart-empty">
        <div class="empty-icon">
          <FontAwesomeIcon icon="shopping-cart" size="3x" />
        </div>
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары в корзину, чтобы оформить заказ</p>
        <NuxtLink to="/catalog" class="btn btn-primary">
          <FontAwesomeIcon icon="search" class="btn-icon" /> Перейти в каталог
        </NuxtLink>
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <div class="cart-header">
            <div class="cart-header-product">Товар</div>
            <div class="cart-header-price">Цена</div>
            <div class="cart-header-quantity">Количество</div>
            <div class="cart-header-total">Итого</div>
            <div class="cart-header-action"></div>
          </div>
          
          <div 
            v-for="item in cartStore.items" 
            :key="item.id"
            class="cart-item"
          >
            <div class="cart-item-product">
              <div class="item-image">
                <img :src="item.image || '/images/placeholder.webp'" :alt="item.name" />
              </div>
              <div class="item-details">
                <NuxtLink :to="`/product/${item.id}`" class="item-name">
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>
            
            <div class="cart-item-price">
              {{ formatPrice(item.price) }}
            </div>
            
            <div class="cart-item-quantity">
              <div class="quantity-control">
                <button 
                  class="quantity-btn"
                  @click="decreaseQuantity(item.id)"
                  :disabled="item.quantity <= 1"
                >
                  <FontAwesomeIcon icon="minus" />
                </button>
                <input 
                  type="number" 
                  v-model.number="item.quantity" 
                  min="1" 
                  class="quantity-input"
                  @change="updateQuantity(item.id, item.quantity)"
                />
                <button 
                  class="quantity-btn"
                  @click="increaseQuantity(item.id)"
                >
                  <FontAwesomeIcon icon="plus" />
                </button>
              </div>
            </div>
            
            <div class="cart-item-total">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
            
            <div class="cart-item-action">
              <button 
                class="remove-btn"
                @click="removeItem(item.id)"
                aria-label="Удалить товар"
              >
                <FontAwesomeIcon icon="trash" />
              </button>
            </div>
          </div>
        </div>
        
        <div class="cart-sidebar">
          <div class="cart-summary">
            <h2 class="summary-title">Итого заказа</h2>
            
            <div class="summary-row">
              <span>Товары ({{ cartStore.cartCount }})</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            
            <div v-if="cartStore.promoDiscount > 0" class="summary-row discount">
              <span>Скидка</span>
              <span>-{{ formatPrice(cartStore.discount) }}</span>
            </div>
            
            <div class="summary-total">
              <span>Итого</span>
              <span>{{ formatPrice(cartStore.cartTotal) }}</span>
            </div>
            
            <div class="promo-code">
              <div class="promo-input">
                <input 
                  type="text" 
                  v-model="promoCode" 
                  placeholder="Промокод" 
                  class="form-control"
                />
                <button 
                  class="btn btn-outline-primary"
                  @click="applyPromoCode"
                  :disabled="!promoCode"
                >
                  <FontAwesomeIcon icon="check" class="btn-icon" /> Применить
                </button>
              </div>
              <div v-if="promoCodeError" class="promo-error">
                <FontAwesomeIcon icon="exclamation-circle" class="status-icon" /> {{ promoCodeError }}
              </div>
              <div v-if="promoCodeSuccess" class="promo-success">
                <FontAwesomeIcon icon="check-circle" class="status-icon" /> {{ promoCodeSuccess }}
              </div>
            </div>
            
            <NuxtLink to="/checkout" class="btn btn-primary btn-block">
              <FontAwesomeIcon icon="shopping-bag" class="btn-icon" /> Оформить заказ
            </NuxtLink>
            
            <button class="btn btn-outline-secondary btn-block" @click="clearCart">
              <FontAwesomeIcon icon="trash" class="btn-icon" /> Очистить корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '~/stores/cartStore';

const cartStore = useCartStore();
const promoCode = ref('');
const promoCodeError = ref('');
const promoCodeSuccess = ref('');

// Format price with currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price);
};

// Increase item quantity
const increaseQuantity = (productId: string) => {
  const item = cartStore.items.find(item => item.id === productId);
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1);
  }
};

// Decrease item quantity
const decreaseQuantity = (productId: string) => {
  const item = cartStore.items.find(item => item.id === productId);
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(productId, item.quantity - 1);
  }
};

// Update item quantity
const updateQuantity = (productId: string, quantity: number) => {
  if (quantity < 1) quantity = 1;
  cartStore.updateQuantity(productId, quantity);
};

// Remove item from cart
const removeItem = (productId: string) => {
  cartStore.removeFromCart(productId);
};

// Apply promo code
const applyPromoCode = () => {
  promoCodeError.value = '';
  promoCodeSuccess.value = '';
  
  if (!promoCode.value) {
    promoCodeError.value = 'Введите промокод';
    return;
  }
  
  const success = cartStore.applyPromoCode(promoCode.value);
  
  if (success) {
    promoCodeSuccess.value = 'Промокод успешно применен';
    promoCode.value = '';
  } else {
    promoCodeError.value = 'Неверный промокод';
  }
};

// Clear cart
const clearCart = () => {
  if (confirm('Вы уверены, что хотите очистить корзину?')) {
    cartStore.clearCart();
  }
};

// SEO metadata
useSeoMeta({
  title: 'Корзина | SoftPeak',
  description: 'Ваша корзина покупок в интернет-магазине SoftPeak'
});
</script>

<style lang="scss" scoped>
.cart-page {
  padding: $spacer * 2 0;
  
  .page-title {
    margin-bottom: $spacer * 2;
  }
  
  .cart-empty {
    text-align: center;
    padding: $spacer * 3;
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow-sm;
    
    .empty-icon {
      margin-bottom: $spacer;
      color: $gray-500;
    }
    
    .btn-icon {
      margin-right: $spacer * 0.5;
    }
    
    h2 {
      margin-bottom: $spacer;
    }
    
    p {
      margin-bottom: $spacer * 1.5;
      color: $gray-600;
    }
  }
  
  .cart-content {
    display: flex;
    gap: $spacer * 2;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex-direction: column;
    }
  }
  
  .cart-items {
    flex: 1;
  }
  
  .cart-header {
    display: grid;
    grid-template-columns: 3fr 1fr 1.5fr 1fr 0.5fr;
    padding: $spacer;
    background-color: $gray-100;
    border-radius: $border-radius $border-radius 0 0;
    font-weight: $font-weight-medium;
    
    @media (max-width: map-get($breakpoints, md)) {
      display: none;
    }
  }
  
  .cart-item {
    display: grid;
    grid-template-columns: 3fr 1fr 1.5fr 1fr 0.5fr;
    padding: $spacer;
    border-bottom: 1px solid $gray-200;
    align-items: center;
    
    @media (max-width: map-get($breakpoints, md)) {
      grid-template-columns: 1fr;
      gap: $spacer;
      position: relative;
      padding-right: 40px;
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .cart-item-product {
    display: flex;
    align-items: center;
    
    .item-image {
      width: 80px;
      height: 80px;
      border-radius: $border-radius;
      overflow: hidden;
      margin-right: $spacer;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .item-name {
      color: $gray-900;
      text-decoration: none;
      font-weight: $font-weight-medium;
      
      &:hover {
        color: $primary;
        text-decoration: underline;
      }
    }
  }
  
  .cart-item-price, .cart-item-total {
    font-weight: $font-weight-medium;
    
    @media (max-width: map-get($breakpoints, md)) {
      &::before {
        content: attr(data-label);
        font-weight: normal;
        margin-right: $spacer * 0.5;
        color: $gray-600;
      }
    }
  }
  
  .cart-item-quantity {
    .quantity-control {
      display: flex;
      align-items: center;
      max-width: 120px;
    }
    
    .quantity-btn {
      width: 32px;
      height: 32px;
      border: 1px solid $gray-300;
      background-color: $gray-100;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: $transition-base;
      padding: 0;
      
      svg {
        width: 12px;
        height: 12px;
        color: $gray-700;
      }
      
      &:hover {
        background-color: $gray-200;
        
        svg {
          color: $primary;
        }
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        
        svg {
          color: $gray-500;
        }
      }
    }
    
    .quantity-input {
      width: 40px;
      height: 32px;
      border: 1px solid $gray-300;
      text-align: center;
      margin: 0 -1px;
      
      &:focus {
        outline: none;
        border-color: $primary;
        position: relative;
        z-index: 1;
      }
      
      &::-webkit-inner-spin-button, 
      &::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
  
  .cart-item-action {
    text-align: center;
    
    @media (max-width: map-get($breakpoints, md)) {
      position: absolute;
      top: $spacer;
      right: $spacer;
    }
    
    .remove-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background-color: $gray-200;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: $transition-base;
      padding: 0;
      
      svg {
        width: 14px;
        height: 14px;
        color: $gray-700;
      }
      
      &:hover {
        background-color: $danger;
        
        svg {
          color: white;
        }
      }
    }
  }
  
  .cart-sidebar {
    flex: 0 0 350px;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex: auto;
    }
  }
  
  .cart-summary {
    background-color: $gray-100;
    border-radius: $border-radius;
    padding: $spacer * 1.5;
  }
  
  .summary-title {
    font-size: $h4-font-size;
    margin-bottom: $spacer;
    padding-bottom: $spacer;
    border-bottom: 1px solid $gray-300;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacer * 0.75;
    
    &.discount {
      color: $success;
    }
  }
  
  .summary-total {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    margin: $spacer * 1.5 0;
    padding-top: $spacer;
    border-top: 1px solid $gray-300;
  }
  
  .promo-code {
    margin-bottom: $spacer * 1.5;
    
    .promo-input {
      display: flex;
      margin-bottom: $spacer * 0.5;
      
      input {
        flex: 1;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      
      button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    
    .promo-error, .promo-success {
      display: flex;
      align-items: center;
      font-size: $font-size-sm;
      margin-top: $spacer * 0.5;
      
      .status-icon {
        margin-right: $spacer * 0.25;
        width: 14px;
      }
    }
    
    .promo-error {
      color: $danger;
    }
    
    .promo-success {
      color: $success;
    }
    
    .btn-icon {
      margin-right: $spacer * 0.25;
    }
  }
  
  .btn-block {
    width: 100%;
    margin-bottom: $spacer;
    
    .btn-icon {
      margin-right: $spacer * 0.5;
    }
  }
}
</style>
