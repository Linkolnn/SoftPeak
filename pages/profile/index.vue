<template>
  <div class="profile-page">
    <div class="container">
      <h1 class="page-title">Личный кабинет</h1>
      
      <div class="profile-content">
        <!-- Profile Sidebar -->
        <div class="profile-sidebar">
          <div class="profile-info">
            <div class="profile-avatar">
              <PlaceholderImage 
                width="100px" 
                height="100px" 
                bgColor="#e0e0e0" 
                fontSize="1rem"
              />
            </div>
            <div class="profile-name">{{ user.name }}</div>
            <div class="profile-email">{{ user.email }}</div>
          </div>
          
          <div class="profile-nav">
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'personal' }"
              @click="activeTab = 'personal'"
            >
              <FontAwesomeIcon icon="user" class="nav-icon" /> Личные данные
            </button>
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'orders' }"
              @click="activeTab = 'orders'"
            >
              <FontAwesomeIcon icon="shopping-bag" class="nav-icon" /> История заказов
            </button>
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'addresses' }"
              @click="activeTab = 'addresses'"
            >
              <FontAwesomeIcon icon="map-marker-alt" class="nav-icon" /> Адреса доставки
            </button>
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'security' }"
              @click="activeTab = 'security'"
            >
              <FontAwesomeIcon icon="shield-alt" class="nav-icon" /> Безопасность
            </button>
          </div>
          
          <button class="btn btn-outline-danger btn-logout" @click="logout">
            <FontAwesomeIcon icon="sign-out-alt" class="mr-1" /> Выйти из аккаунта
          </button>
        </div>
        
        <!-- Profile Main Content -->
        <div class="profile-main">
          <!-- Personal Information Tab -->
          <div v-if="activeTab === 'personal'" class="profile-tab">
            <h2 class="tab-title">Личные данные</h2>
            
            <form @submit.prevent="updateProfile" class="profile-form">
              <div class="form-group">
                <label for="name" class="form-label">Имя</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="user" class="input-icon" />
                  <input 
                    type="text" 
                    id="name" 
                    v-model="profileForm.name" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.name }"
                  />
                </div>
                <div v-if="errors.name" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.name }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="envelope" class="input-icon" />
                  <input 
                    type="email" 
                    id="email" 
                    v-model="profileForm.email" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    disabled
                  />
                </div>
                <div class="form-text">
                  <FontAwesomeIcon icon="info-circle" class="mr-1" /> Email нельзя изменить
                </div>
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">Телефон</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="phone" class="input-icon" />
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="profileForm.phone" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.phone }"
                  />
                </div>
                <div v-if="errors.phone" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.phone }}
                </div>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <FontAwesomeIcon icon="circle-notch" spin class="mr-1" /> Сохранение...
                </span>
                <span v-else>
                  <FontAwesomeIcon icon="save" class="mr-1" /> Сохранить изменения
                </span>
              </button>
            </form>
          </div>
          
          <!-- Orders Tab -->
          <div v-if="activeTab === 'orders'" class="profile-tab">
            <h2 class="tab-title">История заказов</h2>
            
            <div v-if="orders.length === 0" class="empty-state">
              <FontAwesomeIcon icon="shopping-bag" class="empty-icon" />
              <p class="empty-text">У вас пока нет заказов</p>
              <NuxtLink to="/catalog" class="btn btn-primary">
                <FontAwesomeIcon icon="search" class="mr-1" /> Перейти в каталог
              </NuxtLink>
            </div>
            
            <div v-else class="orders-list">
              <div v-for="order in orders" :key="order.id" class="order-card">
                <div class="order-header">
                  <div class="order-info">
                    <div class="order-number">
                      <FontAwesomeIcon icon="file-invoice" class="mr-1" /> Заказ #{{ order.id }}
                    </div>
                    <div class="order-date">
                      <FontAwesomeIcon icon="calendar-alt" class="mr-1" /> {{ formatDate(order.date) }}
                    </div>
                  </div>
                  <div class="order-status" :class="order.status">
                    <FontAwesomeIcon :icon="getStatusIcon(order.status)" class="mr-1" /> {{ getStatusText(order.status) }}
                  </div>
                </div>
                
                <div class="order-products">
                  <div v-for="item in order.items" :key="item.id" class="order-product">
                    <PlaceholderImage 
                      width="60px" 
                      height="60px" 
                      bgColor="#f0f0f0" 
                      fontSize="0.8rem"
                    />
                    <div class="product-info">
                      <div class="product-name">{{ item.name }}</div>
                      <div class="product-price">{{ formatPrice(item.price) }} × {{ item.quantity }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="order-footer">
                  <div class="order-total">
                    <span class="total-label">
                      <FontAwesomeIcon icon="receipt" class="mr-1" /> Итого:
                    </span>
                    <span class="total-price">{{ formatPrice(order.total) }}</span>
                  </div>
                  <div class="order-actions">
                    <button class="btn btn-outline-primary btn-sm">
                      <FontAwesomeIcon icon="redo" class="mr-1" /> Повторить заказ
                    </button>
                    <button class="btn btn-outline-secondary btn-sm">
                      <FontAwesomeIcon icon="download" class="mr-1" /> Чек
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Addresses Tab -->
          <div v-if="activeTab === 'addresses'" class="profile-tab">
            <h2 class="tab-title">Адреса доставки</h2>
            
            <div v-if="addresses.length === 0" class="empty-state">
              <FontAwesomeIcon icon="map-marker-alt" class="empty-icon" />
              <p class="empty-text">У вас пока нет сохраненных адресов</p>
              <button class="btn btn-primary" @click="showAddressForm = true">
                <FontAwesomeIcon icon="plus" class="mr-1" /> Добавить адрес
              </button>
            </div>
            
            <div v-else class="addresses-list">
              <div v-for="address in addresses" :key="address.id" class="address-card">
                <div class="address-content">
                  <div class="address-title">
                    <FontAwesomeIcon icon="home" class="mr-1" /> {{ address.title }}
                  </div>
                  <div class="address-text">
                    <FontAwesomeIcon icon="map-marker-alt" class="mr-1 text-muted" /> {{ address.fullAddress }}
                  </div>
                  <div class="address-phone">
                    <FontAwesomeIcon icon="phone" class="mr-1 text-muted" /> {{ address.phone }}
                  </div>
                </div>
                <div class="address-actions">
                  <button class="btn btn-outline-primary btn-sm" @click="editAddress(address)">
                    <FontAwesomeIcon icon="edit" class="mr-1" /> Редактировать
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="deleteAddress(address.id)">
                    <FontAwesomeIcon icon="trash-alt" class="mr-1" /> Удалить
                  </button>
                </div>
              </div>
            </div>
            
            <button class="btn btn-primary mt-3" @click="showAddressForm = true">
              <FontAwesomeIcon icon="plus" class="mr-1" /> Добавить новый адрес
            </button>
          </div>
          
          <!-- Security Tab -->
          <div v-if="activeTab === 'security'" class="profile-tab">
            <h2 class="tab-title">Безопасность</h2>
            
            <form @submit.prevent="changePassword" class="profile-form">
              <div class="form-group">
                <label for="currentPassword" class="form-label">Текущий пароль</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="lock" class="input-icon" />
                  <input 
                    type="password" 
                    id="currentPassword" 
                    v-model="passwordForm.currentPassword" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.currentPassword }"
                  />
                </div>
                <div v-if="errors.currentPassword" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.currentPassword }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="newPassword" class="form-label">Новый пароль</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="key" class="input-icon" />
                  <input 
                    type="password" 
                    id="newPassword" 
                    v-model="passwordForm.newPassword" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.newPassword }"
                  />
                </div>
                <div v-if="errors.newPassword" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.newPassword }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="confirmPassword" class="form-label">Подтверждение пароля</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="check-circle" class="input-icon" />
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    v-model="passwordForm.confirmPassword" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.confirmPassword }"
                  />
                </div>
                <div v-if="errors.confirmPassword" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.confirmPassword }}
                </div>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <FontAwesomeIcon icon="circle-notch" spin class="mr-1" /> Сохранение...
                </span>
                <span v-else>
                  <FontAwesomeIcon icon="shield-alt" class="mr-1" /> Изменить пароль
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useAuthStore } from '~/stores/authStore';

// Define middleware to protect this route
definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const router = useRouter();

// User data
const user = computed(() => authStore.user || {
  name: '',
  email: '',
  phone: ''
});

// Active tab
const activeTab = ref('personal');

// Form data
const profileForm = reactive({
  name: user.value.name || '',
  email: user.value.email || '',
  phone: user.value.phone || ''
});

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Form state
const errors = reactive({
  name: '',
  email: '',
  phone: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const isSubmitting = ref(false);
const showAddressForm = ref(false);

// Mock data for orders and addresses
const orders = ref([
  {
    id: '12345',
    date: new Date(2025, 4, 10),
    status: 'completed',
    items: [
      { id: 1, name: 'Adobe Photoshop', price: 12990, quantity: 1 },
      { id: 2, name: 'Microsoft Office', price: 8990, quantity: 1 }
    ],
    total: 21980
  },
  {
    id: '12346',
    date: new Date(2025, 4, 5),
    status: 'processing',
    items: [
      { id: 3, name: 'Антивирус Касперского', price: 3990, quantity: 1 }
    ],
    total: 3990
  }
]);

const addresses = ref([
  {
    id: 1,
    title: 'Домашний',
    fullAddress: 'г. Москва, ул. Примерная, д. 123, кв. 45',
    phone: '+7 (123) 456-7890'
  }
]);

// Methods
const updateProfile = async () => {
  isSubmitting.value = true;
  
  try {
    // Validate form
    errors.name = !profileForm.name.trim() ? 'Пожалуйста, введите ваше имя' : '';
    
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    // In a real app, you would call the API to update the profile
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user in store
    authStore.updateProfile({
      name: profileForm.name,
      phone: profileForm.phone
    });
    
    alert('Профиль успешно обновлен');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Произошла ошибка при обновлении профиля');
  } finally {
    isSubmitting.value = false;
  }
};

const changePassword = async () => {
  isSubmitting.value = true;
  
  try {
    // Validate form
    errors.currentPassword = !passwordForm.currentPassword ? 'Пожалуйста, введите текущий пароль' : '';
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'Пожалуйста, введите новый пароль';
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = 'Пароль должен содержать не менее 6 символов';
    } else {
      errors.newPassword = '';
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Пожалуйста, подтвердите пароль';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    } else {
      errors.confirmPassword = '';
    }
    
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    // In a real app, you would call the API to change the password
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    passwordForm.currentPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
    
    alert('Пароль успешно изменен');
  } catch (error) {
    console.error('Error changing password:', error);
    alert('Произошла ошибка при изменении пароля');
  } finally {
    isSubmitting.value = false;
  }
};

const editAddress = (address: any) => {
  // In a real app, you would open a form to edit the address
  console.log('Edit address:', address);
};

const deleteAddress = async (id: number) => {
  if (confirm('Вы уверены, что хотите удалить этот адрес?')) {
    // In a real app, you would call the API to delete the address
    addresses.value = addresses.value.filter(address => address.id !== id);
  }
};

const logout = () => {
  authStore.logout();
  router.push('/');
};

// Helper methods
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
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
      return 'Завершен';
    case 'cancelled':
      return 'Отменен';
    default:
      return status;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return 'clock';
    case 'processing':
      return 'spinner';
    case 'shipped':
      return 'truck';
    case 'completed':
      return 'check-circle';
    case 'cancelled':
      return 'times-circle';
    default:
      return 'info-circle';
  }
};

// SEO metadata
useSeoMeta({
  title: 'Личный кабинет | SoftPeak',
  description: 'Управляйте своим профилем, просматривайте историю заказов и настраивайте параметры аккаунта'
});
</script>

<style lang="scss" scoped>
.profile-page {
  padding: $spacer * 2 0;
  
  .page-title {
    margin-bottom: $spacer * 2;
  }
  
  .profile-content {
    display: flex;
    gap: $spacer * 3;
    
    @media (max-width: map-get($breakpoints, md)) {
      flex-direction: column;
    }
  }
  
  .profile-sidebar {
    width: 280px;
    flex-shrink: 0;
    
    @media (max-width: map-get($breakpoints, md)) {
      width: 100%;
      margin-bottom: $spacer * 2;
    }
    
    .profile-info {
      background-color: white;
      border-radius: $border-radius;
      padding: $spacer;
      margin-bottom: $spacer * 1.5;
      box-shadow: $box-shadow-sm;
      text-align: center;
    }
    
    .profile-avatar {
      margin: 0 auto $spacer;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .profile-name {
      font-weight: $font-weight-bold;
      font-size: $font-size-lg;
      margin-bottom: $spacer * 0.25;
    }
    
    .profile-email {
      color: $gray-600;
      font-size: $font-size-sm;
    }
    
    .profile-nav {
      background-color: white;
      border-radius: $border-radius;
      box-shadow: $box-shadow-sm;
      margin-bottom: $spacer * 1.5;
      overflow: hidden;
      
      .nav-item {
        display: block;
        width: 100%;
        padding: $spacer;
        text-align: left;
        background: none;
        border: none;
        border-radius: $border-radius;
        cursor: pointer;
        transition: $transition-base;
        
        .nav-icon {
          width: 16px;
          height: 16px;
          margin-right: $spacer * 0.75;
          color: currentColor;
        }
        
        &:hover {
          background-color: $gray-100;
        }
        
        &.active {
          background-color: $primary-light;
          color: $primary;
          font-weight: $font-weight-medium;
        }
      }
    }
    
    .btn-logout {
      width: 100%;
    }
  }
  
  .profile-main {
    flex: 1;
    background-color: white;
    border-radius: $border-radius;
    padding: $spacer * 2;
    box-shadow: $box-shadow-sm;
    
    .tab-title {
      margin-bottom: $spacer * 1.5;
      position: relative;
      
      &::after {
        content: '';
        display: block;
        width: 50px;
        height: 2px;
        background-color: $primary;
        margin-top: $spacer * 0.5;
      }
    }
  }
  
  .profile-form {
    max-width: 500px;
    
    .form-group {
      margin-bottom: $spacer * 1.5;
    }
    
    .form-label {
      display: block;
      margin-bottom: $spacer * 0.5;
      font-weight: $font-weight-medium;
    }
    
    .form-control {
      width: 100%;
      padding: $spacer * 0.75;
      border: 1px solid $gray-300;
      border-radius: $border-radius;
      transition: $transition-base;
      
      &:focus {
        outline: none;
        border-color: $primary;
        box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
      }
      
      &.is-invalid {
        border-color: $danger;
        
        &:focus {
          box-shadow: 0 0 0 0.2rem rgba($danger, 0.25);
        }
      }
      
      &:disabled {
        background-color: $gray-100;
      }
    }
    
    .form-text {
      font-size: $font-size-sm;
      color: $gray-600;
      margin-top: $spacer * 0.25;
    }
    
    .invalid-feedback {
      color: $danger;
      font-size: $font-size-sm;
      margin-top: $spacer * 0.25;
      display: flex;
      align-items: center;
    }
  }
  
  .empty-state {
    text-align: center;
    padding: $spacer * 2;
    
    .empty-icon {
      font-size: 4rem;
      color: $gray-400;
      margin-bottom: $spacer;
    }
    
    .empty-text {
      margin: $spacer 0;
      color: $gray-600;
    }
  }
  
  .text-muted {
    color: $gray-600;
  }
  
  .orders-list {
    display: flex;
    flex-direction: column;
    gap: $spacer * 1.5;
  }
  
  .order-card {
    border: 1px solid $gray-200;
    border-radius: $border-radius;
    overflow: hidden;
    
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
    }
    
    .order-product {
      display: flex;
      align-items: center;
      margin-bottom: $spacer;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .product-info {
        margin-left: $spacer;
      }
      
      .product-name {
        font-weight: $font-weight-medium;
      }
      
      .product-price {
        font-size: $font-size-sm;
        color: $gray-600;
      }
    }
    
    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacer;
      border-top: 1px solid $gray-200;
      background-color: $gray-50;
      
      .order-actions {
        display: flex;
        gap: $spacer * 0.5;
      }
    }
    
    .order-total {
      font-weight: $font-weight-bold;
      
      .total-price {
        color: $primary;
        margin-left: $spacer * 0.5;
      }
    }
  }
  
  .addresses-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacer * 1.5;
  }
  
  .address-card {
    border: 1px solid $gray-200;
    border-radius: $border-radius;
    padding: $spacer;
    
    .address-content {
      margin-bottom: $spacer;
    }
    
    .address-title {
      font-weight: $font-weight-bold;
      margin-bottom: $spacer * 0.5;
    }
    
    .address-text {
      margin-bottom: $spacer * 0.25;
    }
    
    .address-phone {
      color: $gray-600;
      font-size: $font-size-sm;
    }
    
    .address-actions {
      display: flex;
      gap: $spacer * 0.5;
    }
  }
  
  .mt-3 {
    margin-top: $spacer * 1.5;
  }
  
  .btn-sm {
    padding: $spacer * 0.25 $spacer * 0.5;
    font-size: $font-size-sm;
  }
}
</style>
