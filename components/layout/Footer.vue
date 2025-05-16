<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section about">
          <h3 class="footer-title">SoftPeak</h3>
          <p class="footer-description">
            Ваш надежный поставщик программного обеспечения. Мы предлагаем широкий выбор качественного ПО для любых задач.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Telegram">
              <span class="social-icon">📱</span>
            </a>
            <a href="#" class="social-link" aria-label="VK">
              <span class="social-icon">💬</span>
            </a>
            <a href="#" class="social-link" aria-label="Email">
              <span class="social-icon">✉️</span>
            </a>
          </div>
        </div>
        
        <div class="footer-section links">
          <h3 class="footer-title">Навигация</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/" class="footer-link">Главная</NuxtLink></li>
            <li><NuxtLink to="/catalog" class="footer-link">Каталог</NuxtLink></li>
            <li><NuxtLink to="/promotions" class="footer-link">Акции</NuxtLink></li>
            <li><NuxtLink to="/about" class="footer-link">О нас</NuxtLink></li>
            <li><NuxtLink to="/contacts" class="footer-link">Контакты</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-section categories">
          <h3 class="footer-title">Категории</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/catalog?category=Antivirus" class="footer-link">Антивирусы</NuxtLink></li>
            <li><NuxtLink to="/catalog?category=Graphics" class="footer-link">Графика</NuxtLink></li>
            <li><NuxtLink to="/catalog?category=Office" class="footer-link">Офисные программы</NuxtLink></li>
            <li><NuxtLink to="/catalog?category=Development" class="footer-link">Разработка</NuxtLink></li>
            <li><NuxtLink to="/catalog?category=Utilities" class="footer-link">Утилиты</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-section contact">
          <h3 class="footer-title">Контакты</h3>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <span class="contact-text">+7 (123) 456-7890</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">✉️</span>
              <span class="contact-text">info@softpeak.ru</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🕒</span>
              <span class="contact-text">Пн-Пт: 9:00 - 18:00</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          &copy; {{ currentYear }} SoftPeak. Все права защищены.
        </div>
        <div class="footer-bottom-links">
          <NuxtLink to="/privacy" class="footer-bottom-link">Политика конфиденциальности</NuxtLink>
          <NuxtLink to="/terms" class="footer-bottom-link">Условия использования</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
.footer {
  background-color: $gray-900;
  color: $gray-300;
  padding: $spacer * 3 0 $spacer;
  margin-top: $spacer * 3;
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: $spacer * 2;
    
    @media (max-width: map-get($breakpoints, md)) {
      flex-direction: column;
    }
  }
  
  .footer-section {
    flex: 1;
    margin-bottom: $spacer * 2;
    min-width: 200px;
    
    @media (max-width: map-get($breakpoints, md)) {
      margin-bottom: $spacer * 1.5;
    }
    
    &.about {
      flex: 2;
      max-width: 400px;
      
      @media (max-width: map-get($breakpoints, md)) {
        max-width: 100%;
      }
    }
  }
  
  .footer-title {
    color: white;
    font-size: $h5-font-size;
    margin-bottom: $spacer;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 40px;
      height: 2px;
      background-color: $primary;
      margin-top: $spacer * 0.5;
    }
  }
  
  .footer-description {
    margin-bottom: $spacer;
    line-height: 1.6;
  }
  
  .social-links {
    display: flex;
    gap: $spacer;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: rgba(white, 0.1);
    border-radius: 50%;
    color: white;
    text-decoration: none;
    transition: $transition-base;
    
    &:hover {
      background-color: $primary;
      transform: translateY(-3px);
    }
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: $spacer * 0.5;
    }
  }
  
  .footer-link {
    color: $gray-400;
    text-decoration: none;
    transition: $transition-base;
    display: inline-block;
    
    &:hover {
      color: white;
      transform: translateX(5px);
    }
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: $spacer * 0.75;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
  }
  
  .contact-icon {
    margin-right: $spacer * 0.5;
    font-size: 1.1rem;
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: $spacer;
    border-top: 1px solid rgba(white, 0.1);
    
    @media (max-width: map-get($breakpoints, sm)) {
      flex-direction: column;
      gap: $spacer;
      text-align: center;
    }
  }
  
  .copyright {
    font-size: $font-size-sm;
    color: $gray-500;
  }
  
  .footer-bottom-links {
    display: flex;
    gap: $spacer;
    
    @media (max-width: map-get($breakpoints, sm)) {
      flex-direction: column;
      gap: $spacer * 0.5;
    }
  }
  
  .footer-bottom-link {
    font-size: $font-size-sm;
    color: $gray-500;
    text-decoration: none;
    transition: $transition-base;
    
    &:hover {
      color: white;
    }
  }
}
</style>
