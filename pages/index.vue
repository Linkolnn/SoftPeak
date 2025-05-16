<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Премиальное программное обеспечение для любых задач</h1>
          <p class="hero-subtitle">Найдите идеальные решения для работы, творчества и безопасности</p>
          <div class="hero-cta">
            <NuxtLink to="/catalog" class="btn btn-primary btn-lg">Перейти в каталог</NuxtLink>
          </div>
        </div>
        <div class="hero-image">
          <!-- Placeholder for hero image -->
          <div class="hero-image-placeholder">
            <PlaceholderImage 
              width="100%" 
              height="300px" 
              bgColor="rgba(51, 102, 255, 0.1)" 
              fontSize="2rem"
            />
            <div class="hero-badge">Скидка 30% на антивирусы!</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Products Section -->
    <section class="products-section">
      <div class="container">
        <h2 class="section-title">Популярные продукты</h2>
        <div v-if="productStore.loading" class="loading-spinner">
          Загрузка...
        </div>
        <div v-else-if="productStore.error" class="error-message">
          {{ productStore.error }}
        </div>
        <div v-else class="product-grid">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Категории ПО</h2>
        <div class="categories-grid">
          <div class="category-card" @click="navigateToCategory('Antivirus')">
            <div class="category-icon">🛡️</div>
            <h3 class="category-title">Антивирусы</h3>
            <p class="category-description">Защита от вредоносных программ и кибератак</p>
          </div>
          <div class="category-card" @click="navigateToCategory('Graphics')">
            <div class="category-icon">🎨</div>
            <h3 class="category-title">Графика</h3>
            <p class="category-description">Фото и видеоредакторы для творческих задач</p>
          </div>
          <div class="category-card" @click="navigateToCategory('Office')">
            <div class="category-icon">📊</div>
            <h3 class="category-title">Офисные программы</h3>
            <p class="category-description">Инструменты для работы с документами и данными</p>
          </div>
          <div class="category-card" @click="navigateToCategory('Development')">
            <div class="category-icon">💻</div>
            <h3 class="category-title">Разработка</h3>
            <p class="category-description">Среды разработки и инструменты для программистов</p>
          </div>
          <div class="category-card" @click="navigateToCategory('Utilities')">
            <div class="category-icon">🔧</div>
            <h3 class="category-title">Утилиты</h3>
            <p class="category-description">Полезные инструменты для оптимизации работы</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotions Section -->
    <section class="promotions-section">
      <div class="container">
        <h2 class="section-title">Акции и скидки</h2>
        <div class="promotions-grid">
          <div class="promotion-card">
            <div class="promotion-content">
              <div class="promotion-badge">-30%</div>
              <h3 class="promotion-title">Скидка на антивирусы</h3>
              <p class="promotion-description">Защитите свои устройства с выгодой до 30%</p>
              <div class="promotion-timer">
                <div class="timer-item">
                  <span class="timer-value">2</span>
                  <span class="timer-label">дня</span>
                </div>
                <div class="timer-item">
                  <span class="timer-value">8</span>
                  <span class="timer-label">часов</span>
                </div>
                <div class="timer-item">
                  <span class="timer-value">45</span>
                  <span class="timer-label">минут</span>
                </div>
              </div>
              <NuxtLink to="/catalog?category=Antivirus" class="btn btn-outline-primary">Подробнее</NuxtLink>
            </div>
          </div>
          <div class="promotion-card">
            <div class="promotion-content">
              <div class="promotion-badge">-20%</div>
              <h3 class="promotion-title">Графические редакторы</h3>
              <p class="promotion-description">Скидки на популярные программы для дизайнеров</p>
              <NuxtLink to="/catalog?category=Graphics" class="btn btn-outline-primary">Подробнее</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">Отзывы клиентов</h2>
        <div class="testimonials-slider">
          <div class="testimonial-card">
            <div class="testimonial-rating">★★★★★</div>
            <p class="testimonial-text">
              "Отличный магазин с широким выбором программного обеспечения. Быстрая доставка ключей и отзывчивая поддержка."
            </p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">
                <PlaceholderImage 
                  width="40px" 
                  height="40px" 
                  bgColor="#3366FF" 
                  fontSize="0.8rem"
                />
              </div>
              <div class="testimonial-info">
                <div class="testimonial-name">Алексей К.</div>
                <div class="testimonial-date">15 мая 2025</div>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-rating">★★★★★</div>
            <p class="testimonial-text">
              "Купила антивирус со скидкой, очень довольна. Интерфейс сайта удобный, всё понятно и просто."
            </p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">
                <PlaceholderImage 
                  width="40px" 
                  height="40px" 
                  bgColor="#3366FF" 
                  fontSize="0.8rem"
                />
              </div>
              <div class="testimonial-info">
                <div class="testimonial-name">Марина С.</div>
                <div class="testimonial-date">10 мая 2025</div>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-rating">★★★★☆</div>
            <p class="testimonial-text">
              "Хороший выбор программ для дизайна. Приобрел PixelMaster Pro, работает отлично. Рекомендую!"
            </p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">
                <PlaceholderImage 
                  width="40px" 
                  height="40px" 
                  bgColor="#3366FF" 
                  fontSize="0.8rem"
                />
              </div>
              <div class="testimonial-info">
                <div class="testimonial-name">Дмитрий П.</div>
                <div class="testimonial-date">5 мая 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useProductStore } from '~/stores/productStore';
import { useFilterStore } from '~/stores/filterStore';

// Import ProductCard component
// This will be created later

const productStore = useProductStore();
const filterStore = useFilterStore();

// Fetch products on component mount
onMounted(async () => {
  await productStore.fetchProducts();
});

// Get featured products
const featuredProducts = computed(() => {
  return productStore.getFeaturedProducts;
});

// Navigate to category
const navigateToCategory = (category: string) => {
  filterStore.setCategory(category);
  navigateTo('/catalog');
};
</script>

<style lang="scss" scoped>
.home-page {
  .section-title {
    text-align: center;
    margin-bottom: $spacer * 2;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background-color: $primary;
      margin: $spacer * 0.5 auto 0;
    }
  }
  
  // Hero Section
  .hero-section {
    padding: $spacer * 3 0;
    background: linear-gradient(135deg, lighten($primary, 35%), lighten($secondary, 35%));
    margin-bottom: $spacer * 3;
    
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      @media (max-width: map-get($breakpoints, lg)) {
        flex-direction: column;
        text-align: center;
      }
    }
    
    .hero-content {
      flex: 1;
      max-width: 600px;
      
      @media (max-width: map-get($breakpoints, lg)) {
        max-width: 100%;
        margin-bottom: $spacer * 2;
      }
    }
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: $font-weight-bold;
      margin-bottom: $spacer;
      color: $gray-900;
      
      @media (max-width: map-get($breakpoints, md)) {
        font-size: 2rem;
      }
    }
    
    .hero-subtitle {
      font-size: $font-size-lg;
      color: $gray-700;
      margin-bottom: $spacer * 1.5;
    }
    
    .hero-cta {
      .btn-lg {
        padding: $spacer * 0.75 $spacer * 1.5;
        font-size: $font-size-lg;
      }
    }
    
    .hero-image {
      flex: 1;
      max-width: 500px;
      
      @media (max-width: map-get($breakpoints, lg)) {
        max-width: 100%;
        display: none;
      }
    }
    
    .hero-image-placeholder {
      background-color: rgba($primary, 0.1);
      border-radius: $border-radius-lg;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero-badge {
      position: absolute;
      top: 69px;
      right: -56px;
      background-color: $secondary;
      color: white;
      padding: $spacer * 0.5 $spacer * 2;
      transform: rotate(45deg);
      font-weight: $font-weight-bold;
    }
  }
  
  // Products Section
  .products-section {
    padding: $spacer * 2 0;
    margin-bottom: $spacer * 3;
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: $spacer * 1.5;
    }
    
    .loading-spinner, .error-message {
      text-align: center;
      padding: $spacer * 2;
    }
  }
  
  // Categories Section
  .categories-section {
    padding: $spacer * 2 0;
    margin-bottom: $spacer * 3;
    background-color: $gray-100;
    
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: $spacer * 1.5;
    }
    
    .category-card {
      background-color: white;
      border-radius: $border-radius;
      padding: $spacer * 1.5;
      text-align: center;
      box-shadow: $box-shadow-sm;
      transition: $transition-base;
      cursor: pointer;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: $box-shadow;
      }
    }
    
    .category-icon {
      font-size: 2.5rem;
      margin-bottom: $spacer;
    }
    
    .category-title {
      font-size: $h5-font-size;
      margin-bottom: $spacer * 0.5;
    }
    
    .category-description {
      font-size: $font-size-sm;
      color: $gray-600;
    }
  }
  
  // Promotions Section
  .promotions-section {
    padding: $spacer * 2 0;
    margin-bottom: $spacer * 3;
    
    .promotions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: $spacer * 1.5;
      
      @media (max-width: map-get($breakpoints, sm)) {
        grid-template-columns: 1fr;
      }
    }
    
    .promotion-card {
      border-radius: $border-radius;
      overflow: hidden;
      box-shadow: $box-shadow-sm;
      background: linear-gradient(135deg, lighten($primary, 40%), lighten($secondary, 40%));
      height: 100%;
      
      &:hover {
        box-shadow: $box-shadow;
      }
    }
    
    .promotion-content {
      padding: $spacer * 2;
      position: relative;
    }
    
    .promotion-badge {
      position: absolute;
      top: $spacer;
      right: $spacer;
      background-color: $secondary;
      color: white;
      font-weight: $font-weight-bold;
      padding: $spacer * 0.25 $spacer * 0.5;
      border-radius: $border-radius-pill;
    }
    
    .promotion-title {
      font-size: $h4-font-size;
      margin-bottom: $spacer * 0.5;
    }
    
    .promotion-description {
      color: $gray-700;
      margin-bottom: $spacer;
    }
    
    .promotion-timer {
      display: flex;
      gap: $spacer;
      margin-bottom: $spacer;
    }
    
    .timer-item {
      background-color: $gray-900;
      color: white;
      border-radius: $border-radius;
      padding: $spacer * 0.5;
      min-width: 60px;
      text-align: center;
    }
    
    .timer-value {
      display: block;
      font-size: $h4-font-size;
      font-weight: $font-weight-bold;
    }
    
    .timer-label {
      font-size: $font-size-sm;
      opacity: 0.8;
    }
  }
  
  // Testimonials Section
  .testimonials-section {
    padding: $spacer * 2 0;
    margin-bottom: $spacer * 3;
    background-color: $gray-100;
    
    .testimonials-slider {
      display: flex;
      gap: $spacer * 1.5;
      overflow-x: auto;
      padding: $spacer * 0.5;
      
      &::-webkit-scrollbar {
        height: 5px;
      }
      
      &::-webkit-scrollbar-thumb {
        background-color: $gray-400;
        border-radius: $border-radius-pill;
      }
    }
    
    .testimonial-card {
      background-color: white;
      border-radius: $border-radius;
      padding: $spacer * 1.5;
      box-shadow: $box-shadow-sm;
      min-width: 300px;
      max-width: 350px;
      flex: 1;
    }
    
    .testimonial-rating {
      color: $warning;
      margin-bottom: $spacer * 0.5;
    }
    
    .testimonial-text {
      font-style: italic;
      margin-bottom: $spacer;
      color: $gray-700;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
    }
    
    .testimonial-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: $spacer * 0.75;
    }
    
    .testimonial-name {
      font-weight: $font-weight-medium;
    }
    
    .testimonial-date {
      font-size: $font-size-sm;
      color: $gray-600;
    }
  }
}
</style>
