<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <span class="logo-text">SoftPeak</span>
          </NuxtLink>
        </div>
        
        <nav class="main-nav">
          <ul class="nav-list">
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link">Главная</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/catalog" class="nav-link">Каталог</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/promotions" class="nav-link">Акции</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/about" class="nav-link">О нас</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/contacts" class="nav-link">Контакты</NuxtLink>
            </li>
          </ul>
        </nav>
        
        <div class="header-actions">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Поиск..." 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              class="search-input"
            />
            <button class="search-button" @click="handleSearch">
              <span class="search-icon">🔍</span>
            </button>
          </div>
          
          <div class="cart-wrapper">
            <NuxtLink to="/cart" class="cart-link">
              <span class="cart-icon">🛒</span>
              <ClientOnly>
                <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
              </ClientOnly>
            </NuxtLink>
          </div>
          
          <div class="profile-wrapper">
            <ClientOnly>
              <template v-if="isAuthenticated">
                <div class="profile-dropdown" @click="toggleProfileMenu">
                  <div class="profile-avatar">{{ userInitials }}</div>
                  <div class="profile-menu" v-if="showProfileMenu">
                    <NuxtLink to="/profile" class="profile-menu-item">Профиль</NuxtLink>
                    <NuxtLink to="/profile/orders" class="profile-menu-item">Заказы</NuxtLink>
                    <NuxtLink to="/profile/favorites" class="profile-menu-item">Избранное</NuxtLink>
                    <div class="profile-menu-item" @click="logout">Выйти</div>
                  </div>
                </div>
              </template>
              <template v-else>
                <NuxtLink to="/login" class="auth-link">Войти</NuxtLink>
              </template>
              <template #fallback>
                <div class="auth-link">Войти</div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '~/stores/cartStore';
import { useAuthStore } from '~/stores/authStore';
import { useFilterStore } from '~/stores/filterStore';

const cartStore = useCartStore();
const authStore = useAuthStore();
const filterStore = useFilterStore();

const searchQuery = ref('');
const showProfileMenu = ref(false);

const cartCount = computed(() => cartStore.cartCount);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const userInitials = computed(() => authStore.userInitials);

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    filterStore.setSearchQuery(searchQuery.value);
    navigateTo('/catalog');
  }
};

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

const closeProfileMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.profile-dropdown')) {
    showProfileMenu.value = false;
  }
};

const logout = () => {
  authStore.logout();
  showProfileMenu.value = false;
  navigateTo('/');
};

onMounted(() => {
  document.addEventListener('click', closeProfileMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', closeProfileMenu);
});
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  box-shadow: $box-shadow-sm;
  position: sticky;
  top: 0;
  z-index: $z-index-fixed;
  
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacer 0;
    
    @media (max-width: map-get($breakpoints, md)) {
      flex-wrap: wrap;
    }
  }
  
  .logo {
    flex: 0 0 auto;
    
    .logo-link {
      text-decoration: none;
    }
    
    .logo-text {
      font-size: $h4-font-size;
      font-weight: $font-weight-bold;
      color: $primary;
      
      &::first-letter {
        color: $secondary;
      }
    }
  }
  
  .main-nav {
    flex: 1 1 auto;
    
    @media (max-width: map-get($breakpoints, md)) {
      order: 3;
      width: 100%;
      margin-top: $spacer;
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      justify-content: center;
      
      @media (max-width: map-get($breakpoints, md)) {
        flex-wrap: wrap;
      }
    }
    
    .nav-item {
      margin: 0 $spacer;
      
      @media (max-width: map-get($breakpoints, sm)) {
        margin: $spacer * 0.25;
      }
    }
    
    .nav-link {
      color: $gray-800;
      text-decoration: none;
      font-weight: $font-weight-medium;
      transition: $transition-base;
      padding: $spacer * 0.5;
      
      &:hover, &.router-link-active {
        color: $primary;
      }
      
      &.router-link-exact-active {
        color: $primary;
        font-weight: $font-weight-bold;
      }
    }
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    
    @media (max-width: map-get($breakpoints, md)) {
      margin-left: auto;
    }
  }
  
  .search-box {
    position: relative;
    margin-right: $spacer;
    
    @media (max-width: map-get($breakpoints, sm)) {
      display: none;
    }
    
    .search-input {
      padding: $spacer * 0.375 $spacer * 0.75;
      border: 1px solid $gray-300;
      border-radius: $border-radius-pill;
      font-size: $font-size-sm;
      width: 180px;
      transition: $transition-base;
      
      &:focus {
        outline: none;
        width: 220px;
        border-color: $primary-light;
        box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
      }
    }
    
    .search-button {
      position: absolute;
      right: $spacer * 0.5;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      font-size: $font-size-sm;
    }
  }
  
  .cart-wrapper {
    margin-right: $spacer;
    position: relative;
    
    .cart-link {
      position: relative;
      display: block;
      padding: $spacer * 0.25;
      font-size: $h5-font-size;
      color: $gray-800;
      text-decoration: none;
      
      &:hover {
        color: $primary;
      }
    }
    
    .cart-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: $secondary;
      color: white;
      border-radius: 50%;
      font-size: 0.75rem;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: $font-weight-bold;
    }
  }
  
  .profile-wrapper {
    position: relative;
    
    .auth-link {
      color: $primary;
      text-decoration: none;
      font-weight: $font-weight-medium;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    .profile-dropdown {
      position: relative;
      cursor: pointer;
    }
    
    .profile-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: $primary;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: $font-weight-bold;
      font-size: $font-size-sm;
    }
    
    .profile-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: $spacer * 0.5;
      background-color: white;
      border-radius: $border-radius;
      box-shadow: $box-shadow;
      min-width: 180px;
      z-index: $z-index-dropdown;
      padding: $spacer * 0.5 0;
      animation: fadeIn 0.2s ease-out;
    }
    
    .profile-menu-item {
      display: block;
      padding: $spacer * 0.5 $spacer;
      color: $gray-800;
      text-decoration: none;
      transition: $transition-base;
      
      &:hover {
        background-color: $gray-100;
        color: $primary;
      }
    }
  }
}
</style>
