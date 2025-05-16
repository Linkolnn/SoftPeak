<template>
  <div class="promotions-page">
    <div class="container">
      <h1 class="page-title">Акции и специальные предложения</h1>
      
      <div class="promotions-header">
        <p class="promotions-description">
          Воспользуйтесь нашими специальными предложениями и скидками на популярное программное обеспечение. Не упустите возможность приобрести качественные продукты по выгодной цене!
        </p>
      </div>
      
      <div class="promotions-filters">
        <div class="filters-title">Фильтр по категориям:</div>
        <div class="filters-buttons">
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            Все акции
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'Antivirus' }"
            @click="setFilter('Antivirus')"
          >
            Антивирусы
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'Graphics' }"
            @click="setFilter('Graphics')"
          >
            Графика
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'Office' }"
            @click="setFilter('Office')"
          >
            Офисные программы
          </button>
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'Development' }"
            @click="setFilter('Development')"
          >
            Разработка
          </button>
        </div>
      </div>
      
      <div class="promotions-grid">
        <!-- Featured Promotion -->
        <div class="promotion-featured">
          <div class="promotion-content">
            <div class="promotion-badge">-30%</div>
            <h2 class="promotion-title">Весенняя распродажа антивирусов</h2>
            <p class="promotion-description">
              Защитите свои устройства с выгодой до 30%. Специальное предложение на все антивирусные программы в нашем каталоге.
            </p>
            <div class="promotion-timer">
              <div class="timer-title">До конца акции:</div>
              <div class="timer-items">
                <div class="timer-item">
                  <span class="timer-value">{{ countdown.days }}</span>
                  <span class="timer-label">дней</span>
                </div>
                <div class="timer-item">
                  <span class="timer-value">{{ countdown.hours }}</span>
                  <span class="timer-label">часов</span>
                </div>
                <div class="timer-item">
                  <span class="timer-value">{{ countdown.minutes }}</span>
                  <span class="timer-label">минут</span>
                </div>
              </div>
            </div>
            <NuxtLink to="/catalog?category=Antivirus" class="btn btn-primary">Перейти к антивирусам</NuxtLink>
          </div>
          <div class="promotion-image">
            <div class="image-placeholder">
              <span class="image-icon">🛡️</span>
            </div>
          </div>
        </div>
        
        <!-- Regular Promotions -->
        <div 
          v-for="promotion in filteredPromotions" 
          :key="promotion.id"
          class="promotion-card"
        >
          <div class="promotion-card-badge">-{{ promotion.discount }}%</div>
          <div class="promotion-card-image">
            <div class="image-placeholder">
              <span class="image-icon">{{ promotion.icon }}</span>
            </div>
          </div>
          <div class="promotion-card-content">
            <h3 class="promotion-card-title">{{ promotion.title }}</h3>
            <p class="promotion-card-description">{{ promotion.description }}</p>
            <div v-if="promotion.endDate" class="promotion-card-date">
              Действует до: {{ formatDate(promotion.endDate) }}
            </div>
            <NuxtLink :to="promotion.link" class="btn btn-outline-primary">Подробнее</NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="promotions-info">
        <h2 class="info-title">Как воспользоваться акцией?</h2>
        <div class="info-steps">
          <div class="info-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3 class="step-title">Выберите продукт</h3>
              <p class="step-description">Перейдите в каталог и выберите программное обеспечение со скидкой</p>
            </div>
          </div>
          <div class="info-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3 class="step-title">Добавьте в корзину</h3>
              <p class="step-description">Добавьте выбранный продукт в корзину</p>
            </div>
          </div>
          <div class="info-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3 class="step-title">Оформите заказ</h3>
              <p class="step-description">Перейдите к оформлению заказа и завершите покупку</p>
            </div>
          </div>
          <div class="info-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3 class="step-title">Получите ключ</h3>
              <p class="step-description">Получите ключ активации или ссылку для скачивания на email</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="promotions-subscribe">
        <div class="subscribe-content">
          <h2 class="subscribe-title">Узнавайте о новых акциях первыми!</h2>
          <p class="subscribe-description">
            Подпишитесь на нашу рассылку, чтобы получать информацию о новых акциях и специальных предложениях.
          </p>
        </div>
        <div class="subscribe-form">
          <input 
            type="email" 
            v-model="email" 
            placeholder="Ваш email" 
            class="form-control"
          />
          <button class="btn btn-primary" @click="subscribe">Подписаться</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// State
const activeFilter = ref('all');
const email = ref('');
const countdown = ref({
  days: 2,
  hours: 8,
  minutes: 45
});

// Timer interval
let timerInterval: NodeJS.Timeout | null = null;

// Mock promotions data
const promotions = [
  {
    id: 1,
    title: 'Скидка на графические редакторы',
    description: 'Получите скидку 20% на все графические редакторы в нашем каталоге.',
    discount: 20,
    category: 'Graphics',
    icon: '🎨',
    endDate: new Date('2025-06-15'),
    link: '/catalog?category=Graphics'
  },
  {
    id: 2,
    title: 'Офисный пакет со скидкой',
    description: 'Скидка 15% на офисные пакеты для повышения продуктивности.',
    discount: 15,
    category: 'Office',
    icon: '📊',
    endDate: new Date('2025-06-01'),
    link: '/catalog?category=Office'
  },
  {
    id: 3,
    title: 'Инструменты разработчика',
    description: 'Специальное предложение для разработчиков: скидка 25% на IDE и инструменты разработки.',
    discount: 25,
    category: 'Development',
    icon: '💻',
    endDate: new Date('2025-05-25'),
    link: '/catalog?category=Development'
  },
  {
    id: 4,
    title: 'Комплексная защита',
    description: 'Приобретите комплексное решение для защиты всех ваших устройств со скидкой 30%.',
    discount: 30,
    category: 'Antivirus',
    icon: '🔒',
    endDate: new Date('2025-06-10'),
    link: '/catalog?category=Antivirus'
  },
  {
    id: 5,
    title: 'Бесплатная техподдержка',
    description: 'При покупке любого продукта получите 3 месяца бесплатной технической поддержки.',
    discount: 10,
    category: 'Office',
    icon: '🔧',
    endDate: null,
    link: '/catalog'
  },
  {
    id: 6,
    title: 'Скидка на обновление',
    description: 'Обновите вашу текущую версию программы до последней со скидкой 40%.',
    discount: 40,
    category: 'Graphics',
    icon: '⬆️',
    endDate: new Date('2025-05-30'),
    link: '/catalog?category=Graphics'
  }
];

// Filtered promotions based on active filter
const filteredPromotions = computed(() => {
  if (activeFilter.value === 'all') {
    return promotions;
  }
  return promotions.filter(promo => promo.category === activeFilter.value);
});

// Set active filter
const setFilter = (filter: string) => {
  activeFilter.value = filter;
};

// Format date
const formatDate = (date: Date | null) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

// Subscribe to newsletter
const subscribe = () => {
  if (!email.value) {
    alert('Пожалуйста, введите ваш email');
    return;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    alert('Пожалуйста, введите корректный email');
    return;
  }
  
  alert('Спасибо за подписку! Мы будем держать вас в курсе наших акций.');
  email.value = '';
};

// Update countdown timer
const updateCountdown = () => {
  if (countdown.value.minutes > 0) {
    countdown.value.minutes--;
  } else {
    countdown.value.minutes = 59;
    
    if (countdown.value.hours > 0) {
      countdown.value.hours--;
    } else {
      countdown.value.hours = 23;
      
      if (countdown.value.days > 0) {
        countdown.value.days--;
      } else {
        // Timer ended
        if (timerInterval) {
          clearInterval(timerInterval);
        }
      }
    }
  }
};

// Setup and cleanup timer
onMounted(() => {
  timerInterval = setInterval(updateCountdown, 60000); // Update every minute
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});

// SEO metadata
useSeoMeta({
  title: 'Акции и специальные предложения | SoftPeak',
  description: 'Специальные предложения и скидки на программное обеспечение в интернет-магазине SoftPeak'
});
</script>

<style lang="scss" scoped>
.promotions-page {
  padding: $spacer * 2 0;
  
  .page-title {
    margin-bottom: $spacer;
  }
  
  .promotions-header {
    margin-bottom: $spacer * 2;
    max-width: 800px;
    
    .promotions-description {
      font-size: $font-size-lg;
      color: $gray-700;
    }
  }
  
  .promotions-filters {
    display: flex;
    align-items: center;
    margin-bottom: $spacer * 2;
    
    @media (max-width: map-get($breakpoints, md)) {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .filters-title {
      margin-right: $spacer;
      font-weight: $font-weight-medium;
      
      @media (max-width: map-get($breakpoints, md)) {
        margin-bottom: $spacer * 0.5;
      }
    }
    
    .filters-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: $spacer * 0.5;
    }
    
    .filter-btn {
      padding: $spacer * 0.25 $spacer * 0.75;
      background-color: $gray-200;
      border: none;
      border-radius: $border-radius;
      cursor: pointer;
      transition: $transition-base;
      
      &:hover {
        background-color: $gray-300;
      }
      
      &.active {
        background-color: $primary;
        color: white;
      }
    }
  }
  
  .promotions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacer * 2;
    margin-bottom: $spacer * 3;
    
    .promotion-featured {
      grid-column: 1 / -1;
      display: flex;
      background: linear-gradient(135deg, lighten($primary, 40%), lighten($secondary, 40%));
      border-radius: $border-radius-lg;
      overflow: hidden;
      box-shadow: $box-shadow;
      
      @media (max-width: map-get($breakpoints, lg)) {
        flex-direction: column;
      }
      
      .promotion-content {
        flex: 1;
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
        font-size: $h2-font-size;
        margin-bottom: $spacer;
        color: $gray-900;
      }
      
      .promotion-description {
        margin-bottom: $spacer * 1.5;
        color: $gray-700;
        max-width: 500px;
      }
      
      .promotion-timer {
        margin-bottom: $spacer * 1.5;
        
        .timer-title {
          font-weight: $font-weight-medium;
          margin-bottom: $spacer * 0.5;
        }
        
        .timer-items {
          display: flex;
          gap: $spacer;
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
      
      .promotion-image {
        flex: 1;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: $spacer * 2;
        
        @media (max-width: map-get($breakpoints, lg)) {
          max-width: 100%;
        }
        
        .image-placeholder {
          width: 100%;
          height: 300px;
          background-color: rgba($primary, 0.1);
          border-radius: $border-radius;
          display: flex;
          align-items: center;
          justify-content: center;
          
          .image-icon {
            font-size: 5rem;
          }
        }
      }
    }
    
    .promotion-card {
      background-color: white;
      border-radius: $border-radius;
      overflow: hidden;
      box-shadow: $box-shadow-sm;
      transition: $transition-base;
      position: relative;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: $box-shadow;
      }
      
      .promotion-card-badge {
        position: absolute;
        top: $spacer;
        right: $spacer;
        background-color: $secondary;
        color: white;
        font-weight: $font-weight-bold;
        padding: $spacer * 0.25 $spacer * 0.5;
        border-radius: $border-radius-pill;
        z-index: 1;
      }
      
      .promotion-card-image {
        height: 150px;
        
        .image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, lighten($primary, 45%), lighten($secondary, 45%));
          display: flex;
          align-items: center;
          justify-content: center;
          
          .image-icon {
            font-size: 3rem;
          }
        }
      }
      
      .promotion-card-content {
        padding: $spacer * 1.5;
      }
      
      .promotion-card-title {
        font-size: $h5-font-size;
        margin-bottom: $spacer * 0.5;
      }
      
      .promotion-card-description {
        color: $gray-700;
        margin-bottom: $spacer;
        min-height: 4.5em;
      }
      
      .promotion-card-date {
        font-size: $font-size-sm;
        color: $gray-600;
        margin-bottom: $spacer;
      }
    }
  }
  
  .promotions-info {
    background-color: $gray-100;
    padding: $spacer * 2;
    border-radius: $border-radius;
    margin-bottom: $spacer * 3;
    
    .info-title {
      text-align: center;
      margin-bottom: $spacer * 2;
    }
    
    .info-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: $spacer * 1.5;
    }
    
    .info-step {
      display: flex;
      align-items: flex-start;
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      background-color: $primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: $font-weight-bold;
      margin-right: $spacer;
      flex-shrink: 0;
    }
    
    .step-title {
      font-size: $font-size-lg;
      margin-bottom: $spacer * 0.5;
    }
    
    .step-description {
      color: $gray-700;
    }
  }
  
  .promotions-subscribe {
    background-color: $primary;
    color: white;
    padding: $spacer * 2;
    border-radius: $border-radius;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: map-get($breakpoints, md)) {
      flex-direction: column;
      text-align: center;
    }
    
    .subscribe-content {
      max-width: 500px;
      
      @media (max-width: map-get($breakpoints, md)) {
        max-width: 100%;
        margin-bottom: $spacer;
      }
    }
    
    .subscribe-title {
      margin-bottom: $spacer * 0.5;
    }
    
    .subscribe-description {
      opacity: 0.9;
    }
    
    .subscribe-form {
      display: flex;
      
      @media (max-width: map-get($breakpoints, sm)) {
        flex-direction: column;
        width: 100%;
      }
      
      .form-control {
        min-width: 300px;
        border: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        
        @media (max-width: map-get($breakpoints, sm)) {
          min-width: auto;
          width: 100%;
          border-radius: $border-radius;
          margin-bottom: $spacer * 0.5;
        }
      }
      
      .btn {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background-color: $secondary;
        border-color: $secondary;
        
        &:hover {
          background-color: darken($secondary, 10%);
          border-color: darken($secondary, 10%);
        }
        
        @media (max-width: map-get($breakpoints, sm)) {
          border-radius: $border-radius;
          width: 100%;
        }
      }
    }
  }
}
</style>
