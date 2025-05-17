<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="page-title">Оформление заказа</h1>
      
      <div v-if="cartStore.isEmpty" class="checkout-empty">
        <div class="empty-icon">
          <FontAwesomeIcon icon="shopping-cart" size="3x" />
        </div>
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары в корзину, чтобы оформить заказ</p>
        <NuxtLink to="/catalog" class="btn btn-primary">Перейти в каталог</NuxtLink>
      </div>
      
      <div v-else class="checkout-content">
        <div class="checkout-form">
          <div class="form-section">
            <h2 class="section-title">Контактная информация</h2>
            
            <div class="form-group">
              <label for="name" class="form-label">Имя и фамилия *</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                @input="validateField('name')"
              />
              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                @input="validateField('email')"
              />
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email }}
              </div>
              <div class="form-text">
                На этот адрес будут отправлены ключи активации и ссылки для скачивания
              </div>
            </div>
            
            <div class="form-group">
              <label for="phone" class="form-label">Телефон</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="formData.phone" 
                class="form-control"
                :class="{ 'is-invalid': errors.phone }"
                @input="validateField('phone')"
              />
              <div v-if="errors.phone" class="invalid-feedback">
                {{ errors.phone }}
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h2 class="section-title">Способ оплаты</h2>
            
            <div class="payment-methods">
              <div 
                v-for="method in paymentMethods" 
                :key="method.id"
                class="payment-method"
                :class="{ active: formData.paymentMethod === method.id }"
                @click="selectPaymentMethod(method.id)"
              >
                <div class="payment-method-radio">
                  <input 
                    type="radio" 
                    :id="method.id" 
                    :value="method.id" 
                    v-model="formData.paymentMethod"
                  />
                  <span class="radio-checkmark"></span>
                </div>
                <div class="payment-method-content">
                  <label :for="method.id" class="payment-method-label">
                    {{ method.name }}
                  </label>
                  <div class="payment-method-description">
                    {{ method.description }}
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="errors.paymentMethod" class="invalid-feedback d-block">
              {{ errors.paymentMethod }}
            </div>
          </div>
          
          <div class="form-section">
            <h2 class="section-title">Дополнительная информация</h2>
            
            <div class="form-group">
              <label for="comment" class="form-label">Комментарий к заказу</label>
              <textarea 
                id="comment" 
                v-model="formData.comment" 
                class="form-control"
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-check">
              <input 
                type="checkbox" 
                id="agreement" 
                v-model="formData.agreement" 
                class="form-check-input"
                :class="{ 'is-invalid': errors.agreement }"
                @change="validateField('agreement')"
              />
              <label for="agreement" class="form-check-label">
                Я согласен с <NuxtLink to="/terms" class="link">условиями использования</NuxtLink> и <NuxtLink to="/privacy" class="link">политикой конфиденциальности</NuxtLink> *
              </label>
              <div v-if="errors.agreement" class="invalid-feedback">
                {{ errors.agreement }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="checkout-sidebar">
          <div class="order-summary">
            <h2 class="summary-title">Ваш заказ</h2>
            
            <div class="order-items">
              <div 
                v-for="item in cartStore.items" 
                :key="item.id"
                class="order-item"
              >
                <div class="item-info">
                  <div class="item-quantity">{{ item.quantity }} ×</div>
                  <div class="item-name">{{ item.name }}</div>
                </div>
                <div class="item-price">{{ formatPrice(item.price * item.quantity) }}</div>
              </div>
            </div>
            
            <div class="order-totals">
              <div class="total-row">
                <span>Товары ({{ cartStore.cartCount }})</span>
                <span>{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              
              <div v-if="cartStore.promoDiscount > 0" class="total-row discount">
                <span>Скидка</span>
                <span>-{{ formatPrice(cartStore.discount) }}</span>
              </div>
              
              <div class="total-final">
                <span>Итого</span>
                <span>{{ formatPrice(cartStore.cartTotal) }}</span>
              </div>
            </div>
            
            <button 
              class="btn btn-primary btn-block"
              @click="placeOrder"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Оформление...</span>
              <span v-else>Оформить заказ</span>
            </button>
            
            <div class="secure-checkout">
              <div class="secure-icon">
                <FontAwesomeIcon icon="lock" />
              </div>
              <div class="secure-text">Безопасная оплата</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Order Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal-content">
        <div class="success-icon">
          <FontAwesomeIcon icon="check" />
        </div>
        <h2 class="success-title">Заказ успешно оформлен!</h2>
        <p class="success-message">
          Спасибо за ваш заказ. Информация о заказе и ключи активации отправлены на ваш email.
        </p>
        <div class="order-number">
          Номер заказа: <strong>{{ orderNumber }}</strong>
        </div>
        <div class="modal-actions">
          <NuxtLink to="/" class="btn btn-outline-primary">На главную</NuxtLink>
          <NuxtLink to="/profile/orders" class="btn btn-primary">Мои заказы</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useCartStore } from '~/stores/cartStore';
import { useAuthStore } from '~/stores/authStore';
import { useOrdersStore } from '~/stores/ordersStore';

const cartStore = useCartStore();
const authStore = useAuthStore();
const ordersStore = useOrdersStore();
const router = useRouter();

// Form data
const formData = reactive({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phone: '',
  paymentMethod: 'card',
  comment: '',
  agreement: false
});

// Validation errors
const errors = reactive({
  name: '',
  email: '',
  phone: '',
  paymentMethod: '',
  agreement: ''
});

// Payment methods
const paymentMethods = [
  {
    id: 'card',
    name: 'Банковская карта',
    description: 'Visa, MasterCard, Мир'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Оплата через PayPal'
  },
  {
    id: 'qiwi',
    name: 'QIWI Кошелек',
    description: 'Оплата через QIWI'
  },
  {
    id: 'yoomoney',
    name: 'ЮMoney',
    description: 'Оплата через ЮMoney'
  }
];

// State
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const orderNumber = ref('');

// Format price with currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price);
};

// Select payment method
const selectPaymentMethod = (methodId: string) => {
  formData.paymentMethod = methodId;
  validateField('paymentMethod');
};

// Validate form field
const validateField = (field: string) => {
  switch (field) {
    case 'name':
      errors.name = !formData.name.trim() ? 'Имя обязательно для заполнения' : '';
      break;
    case 'email':
      if (!formData.email.trim()) {
        errors.email = 'Email обязателен для заполнения';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Введите корректный email';
      } else {
        errors.email = '';
      }
      break;
    case 'phone':
      if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
        errors.phone = 'Введите корректный номер телефона';
      } else {
        errors.phone = '';
      }
      break;
    case 'paymentMethod':
      errors.paymentMethod = !formData.paymentMethod ? 'Выберите способ оплаты' : '';
      break;
    case 'agreement':
      errors.agreement = !formData.agreement ? 'Необходимо согласиться с условиями' : '';
      break;
  }
};

// Validate all form fields
const validateForm = () => {
  validateField('name');
  validateField('email');
  validateField('phone');
  validateField('paymentMethod');
  validateField('agreement');
  
  return !Object.values(errors).some(error => error);
};

// Generate random order number
const generateOrderNumber = () => {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `SP-${timestamp}-${random}`;
};

// Place order
const placeOrder = async () => {
  if (!validateForm()) {
    // Scroll to first error
    const firstErrorField = Object.keys(errors).find(key => errors[key as keyof typeof errors]);
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // In a real app, you would send the order to your API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate order number
    orderNumber.value = generateOrderNumber();
    
    // Create an address string from form data (in a real app, this would be more structured)
    const addressStr = `${formData.name}, ${formData.email}${formData.phone ? ', ' + formData.phone : ''}`;
    
    // Create order using the orders store
    const orderId = ordersStore.createOrder(
      cartStore.items,
      addressStr,
      formData.paymentMethod
    );
    
    console.log('Order created with ID:', orderId);
    
    // Show success modal
    showSuccessModal.value = true;
    
    // Clear cart
    cartStore.clearCart();
    
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
  } finally {
    isSubmitting.value = false;
  }
};

// SEO metadata
useSeoMeta({
  title: 'Оформление заказа | SoftPeak',
  description: 'Оформление заказа в интернет-магазине SoftPeak'
});
</script>

<style lang="scss" scoped>
.checkout-page {
  padding: $spacer * 2 0;
  
  .page-title {
    margin-bottom: $spacer * 2;
  }
  
  .checkout-empty {
    text-align: center;
    padding: $spacer * 3;
    background-color: $gray-100;
    border-radius: $border-radius;
    margin-bottom: $spacer * 3;
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: $spacer;
      color: $gray-500;
    }
    
    h2 {
      margin-bottom: $spacer;
    }
    
    p {
      margin-bottom: $spacer * 1.5;
      color: $gray-600;
    }
  }
  
  .checkout-content {
    display: flex;
    gap: $spacer * 2;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex-direction: column;
    }
  }
  
  .checkout-form {
    flex: 1;
  }
  
  .form-section {
    background-color: white;
    border-radius: $border-radius;
    padding: $spacer * 1.5;
    margin-bottom: $spacer * 2;
    box-shadow: $box-shadow-sm;
  }
  
  .section-title {
    font-size: $h4-font-size;
    margin-bottom: $spacer * 1.5;
    padding-bottom: $spacer;
    border-bottom: 1px solid $gray-200;
  }
  
  .form-group {
    margin-bottom: $spacer * 1.5;
  }
  
  .form-label {
    display: block;
    margin-bottom: $spacer * 0.5;
    font-weight: $font-weight-medium;
  }
  
  .form-control {
    display: block;
    width: 100%;
    padding: $spacer * 0.75;
    font-size: $font-size-base;
    line-height: 1.5;
    color: $gray-900;
    background-color: white;
    border: 1px solid $gray-300;
    border-radius: $border-radius;
    transition: $transition-base;
    
    &:focus {
      border-color: $primary;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
    }
    
    &.is-invalid {
      border-color: $danger;
      
      &:focus {
        box-shadow: 0 0 0 0.2rem rgba($danger, 0.25);
      }
    }
  }
  
  .invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: $danger;
  }
  
  .form-text {
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: $gray-600;
  }
  
  .form-check {
    display: flex;
    align-items: flex-start;
    margin-bottom: $spacer;
    
    .form-check-input {
      margin-top: 0.3em;
      margin-right: $spacer * 0.5;
    }
    
    .form-check-label {
      margin-bottom: 0;
    }
  }
  
  .payment-methods {
    display: flex;
    flex-direction: column;
    gap: $spacer;
    margin-bottom: $spacer;
  }
  
  .payment-method {
    display: flex;
    align-items: flex-start;
    padding: $spacer;
    border: 1px solid $gray-300;
    border-radius: $border-radius;
    cursor: pointer;
    transition: $transition-base;
    
    &:hover {
      border-color: $primary-light;
    }
    
    &.active {
      border-color: $primary;
      background-color: rgba($primary, 0.05);
    }
  }
  
  .payment-method-radio {
    position: relative;
    margin-right: $spacer;
    margin-top: 0.2em;
    
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    
    .radio-checkmark {
      position: relative;
      display: block;
      height: 20px;
      width: 20px;
      background-color: white;
      border: 2px solid $gray-400;
      border-radius: 50%;
      
      &:after {
        content: "";
        position: absolute;
        display: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $primary;
      }
    }
    
    input:checked ~ .radio-checkmark {
      border-color: $primary;
      
      &:after {
        display: block;
      }
    }
  }
  
  .payment-method-content {
    flex: 1;
  }
  
  .payment-method-label {
    display: block;
    font-weight: $font-weight-medium;
    margin-bottom: $spacer * 0.25;
    cursor: pointer;
  }
  
  .payment-method-description {
    font-size: $font-size-sm;
    color: $gray-600;
  }
  
  .link {
    color: $primary;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .checkout-sidebar {
    flex: 0 0 350px;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex: auto;
    }
  }
  
  .order-summary {
    background-color: white;
    border-radius: $border-radius;
    padding: $spacer * 1.5;
    box-shadow: $box-shadow-sm;
    position: sticky;
    top: $spacer * 2;
  }
  
  .summary-title {
    font-size: $h4-font-size;
    margin-bottom: $spacer;
    padding-bottom: $spacer;
    border-bottom: 1px solid $gray-200;
  }
  
  .order-items {
    margin-bottom: $spacer;
    max-height: 300px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 5px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: $gray-400;
      border-radius: $border-radius-pill;
    }
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    padding: $spacer * 0.5 0;
    border-bottom: 1px solid $gray-200;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .item-info {
    display: flex;
    align-items: center;
  }
  
  .item-quantity {
    font-weight: $font-weight-medium;
    margin-right: $spacer * 0.5;
    color: $gray-700;
  }
  
  .item-name {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .item-price {
    font-weight: $font-weight-medium;
  }
  
  .order-totals {
    padding: $spacer 0;
    border-top: 1px solid $gray-200;
    margin-bottom: $spacer;
  }
  
  .total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacer * 0.5;
    
    &.discount {
      color: $success;
    }
  }
  
  .total-final {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    margin-top: $spacer;
    padding-top: $spacer;
    border-top: 1px solid $gray-200;
  }
  
  .btn-block {
    width: 100%;
    margin-bottom: $spacer;
  }
  
  .secure-checkout {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $gray-600;
    font-size: $font-size-sm;
  }
  
  .secure-icon {
    margin-right: $spacer * 0.5;
  }
  
  // Modal
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($dark, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: $z-index-modal;
    padding: $spacer;
  }
  
  .modal-content {
    background-color: white;
    border-radius: $border-radius;
    padding: $spacer * 2;
    max-width: 500px;
    width: 100%;
    text-align: center;
    box-shadow: $box-shadow;
    animation: fadeIn 0.3s ease-out;
  }
  
  .success-icon {
    width: 80px;
    height: 80px;
    background-color: $success;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin: 0 auto $spacer * 1.5;
  }
  
  .success-title {
    margin-bottom: $spacer;
  }
  
  .success-message {
    margin-bottom: $spacer;
    color: $gray-700;
  }
  
  .order-number {
    margin-bottom: $spacer * 1.5;
    padding: $spacer;
    background-color: $gray-100;
    border-radius: $border-radius;
  }
  
  .modal-actions {
    display: flex;
    gap: $spacer;
    justify-content: center;
    
    @media (max-width: map-get($breakpoints, sm)) {
      flex-direction: column;
    }
  }
}
</style>
