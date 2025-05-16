<template>
  <div class="contacts-page">
    <div class="container">
      <h1 class="page-title">Контакты</h1>
      
      <div class="contacts-intro">
        <p class="intro-text">
          Свяжитесь с нами любым удобным способом. Наши специалисты готовы ответить на ваши вопросы о программном обеспечении, помочь с выбором продукта или решить технические проблемы.
        </p>
      </div>
      
      <div class="contacts-content">
        <div class="contact-info">
          <h2 class="section-title">Наши контакты</h2>
          
          <div class="info-blocks">
            <div class="info-block">
              <div class="info-icon">📞</div>
              <div class="info-content">
                <h3 class="info-title">Телефон</h3>
                <p class="info-text">+7 (123) 456-7890</p>
                <p class="info-text">+7 (987) 654-3210</p>
              </div>
            </div>
            
            <div class="info-block">
              <div class="info-icon">✉️</div>
              <div class="info-content">
                <h3 class="info-title">Email</h3>
                <p class="info-text">info@softpeak.ru</p>
                <p class="info-text">support@softpeak.ru</p>
              </div>
            </div>
            
            <div class="info-block">
              <div class="info-icon">🕒</div>
              <div class="info-content">
                <h3 class="info-title">Время работы</h3>
                <p class="info-text">Пн-Пт: 9:00 - 18:00</p>
                <p class="info-text">Сб-Вс: выходные</p>
              </div>
            </div>
            
            <div class="info-block">
              <div class="info-icon">🌐</div>
              <div class="info-content">
                <h3 class="info-title">Социальные сети</h3>
                <div class="social-links">
                  <a href="#" class="social-link" aria-label="Telegram">
                    <span class="social-icon">📱</span>
                    <span class="social-name">Telegram</span>
                  </a>
                  <a href="#" class="social-link" aria-label="VK">
                    <span class="social-icon">💬</span>
                    <span class="social-name">VK</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contact-map">
            <h3 class="map-title">Наш офис</h3>
            <div class="map-placeholder">
              <div class="map-address">
                <div class="address-icon">📍</div>
                <div class="address-text">
                  г. Москва, ул. Примерная, д. 123, офис 456
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <h2 class="section-title">Напишите нам</h2>
          
          <form @submit.prevent="submitForm" class="form">
            <div class="form-group">
              <label for="name" class="form-label">Имя *</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                @input="validateField('name')"
                required
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
                required
              />
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>
            
            <div class="form-group">
              <label for="subject" class="form-label">Тема</label>
              <select 
                id="subject" 
                v-model="formData.subject" 
                class="form-control"
              >
                <option value="general">Общий вопрос</option>
                <option value="purchase">Вопрос о покупке</option>
                <option value="support">Техническая поддержка</option>
                <option value="partnership">Сотрудничество</option>
                <option value="other">Другое</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message" class="form-label">Сообщение *</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                class="form-control"
                :class="{ 'is-invalid': errors.message }"
                @input="validateField('message')"
                rows="5"
                required
              ></textarea>
              <div v-if="errors.message" class="invalid-feedback">
                {{ errors.message }}
              </div>
            </div>
            
            <div class="form-group form-check">
              <input 
                type="checkbox" 
                id="agreement" 
                v-model="formData.agreement" 
                class="form-check-input"
                :class="{ 'is-invalid': errors.agreement }"
                @change="validateField('agreement')"
                required
              />
              <label for="agreement" class="form-check-label">
                Я согласен с <NuxtLink to="/privacy" class="link">политикой конфиденциальности</NuxtLink> *
              </label>
              <div v-if="errors.agreement" class="invalid-feedback">
                {{ errors.agreement }}
              </div>
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary btn-block"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Отправка...</span>
              <span v-else>Отправить сообщение</span>
            </button>
          </form>
          
          <div v-if="formSuccess" class="form-success">
            <div class="success-icon">✓</div>
            <h3 class="success-title">Сообщение отправлено!</h3>
            <p class="success-message">
              Спасибо за ваше обращение. Мы свяжемся с вами в ближайшее время.
            </p>
          </div>
        </div>
      </div>
      
      <div class="contacts-faq">
        <h2 class="section-title">Часто задаваемые вопросы</h2>
        
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question" @click="toggleFaq(0)">
              Как получить ключ активации после покупки?
              <span class="faq-toggle">{{ faqOpen[0] ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-if="faqOpen[0]">
              <p>
                После успешной оплаты ключ активации будет автоматически отправлен на указанный вами email. Также вы можете найти ключ в личном кабинете в разделе "История заказов".
              </p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question" @click="toggleFaq(1)">
              Что делать, если возникли проблемы с активацией программы?
              <span class="faq-toggle">{{ faqOpen[1] ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-if="faqOpen[1]">
              <p>
                В случае проблем с активацией, пожалуйста, обратитесь в нашу службу поддержки по email support@softpeak.ru или по телефону +7 (123) 456-7890. Наши специалисты помогут вам решить проблему.
              </p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question" @click="toggleFaq(2)">
              Можно ли вернуть деньги за купленное программное обеспечение?
              <span class="faq-toggle">{{ faqOpen[2] ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-if="faqOpen[2]">
              <p>
                Согласно законодательству, цифровые товары не подлежат возврату после активации ключа. Однако, если вы не активировали ключ и обратились в течение 14 дней после покупки, мы можем рассмотреть возможность возврата средств. Для этого напишите нам на email info@softpeak.ru.
              </p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question" @click="toggleFaq(3)">
              Как стать партнером SoftPeak?
              <span class="faq-toggle">{{ faqOpen[3] ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-if="faqOpen[3]">
              <p>
                Мы открыты для сотрудничества с разработчиками программного обеспечения и реселлерами. Для получения информации о партнерской программе, пожалуйста, отправьте запрос на email partners@softpeak.ru с указанием информации о вашей компании.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Form data
const formData = reactive({
  name: '',
  email: '',
  subject: 'general',
  message: '',
  agreement: false
});

// Form state
const errors = reactive({
  name: '',
  email: '',
  message: '',
  agreement: ''
});
const isSubmitting = ref(false);
const formSuccess = ref(false);

// FAQ state
const faqOpen = ref([false, false, false, false]);

// Toggle FAQ item
const toggleFaq = (index: number) => {
  faqOpen.value[index] = !faqOpen.value[index];
};

// Validate form field
const validateField = (field: string) => {
  switch (field) {
    case 'name':
      errors.name = !formData.name.trim() ? 'Пожалуйста, введите ваше имя' : '';
      break;
    case 'email':
      if (!formData.email.trim()) {
        errors.email = 'Пожалуйста, введите ваш email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Пожалуйста, введите корректный email';
      } else {
        errors.email = '';
      }
      break;
    case 'message':
      errors.message = !formData.message.trim() ? 'Пожалуйста, введите ваше сообщение' : '';
      break;
    case 'agreement':
      errors.agreement = !formData.agreement ? 'Необходимо согласиться с политикой конфиденциальности' : '';
      break;
  }
};

// Validate all form fields
const validateForm = () => {
  validateField('name');
  validateField('email');
  validateField('message');
  validateField('agreement');
  
  return !Object.values(errors).some(error => error);
};

// Submit form
const submitForm = async () => {
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
    // In a real app, you would send the form data to your API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    formSuccess.value = true;
    
    // Reset form
    formData.name = '';
    formData.email = '';
    formData.subject = 'general';
    formData.message = '';
    formData.agreement = false;
    
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
  } finally {
    isSubmitting.value = false;
  }
};

// SEO metadata
useSeoMeta({
  title: 'Контакты | SoftPeak',
  description: 'Свяжитесь с нами любым удобным способом. Наши специалисты готовы ответить на ваши вопросы о программном обеспечении, помочь с выбором продукта или решить технические проблемы.'
});
</script>

<style lang="scss" scoped>
.contacts-page {
  padding: $spacer * 2 0;
  
  .page-title {
    margin-bottom: $spacer;
  }
  
  .contacts-intro {
    margin-bottom: $spacer * 2;
    max-width: 800px;
    
    .intro-text {
      font-size: $font-size-lg;
      color: $gray-700;
    }
  }
  
  .section-title {
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
  
  .contacts-content {
    display: flex;
    gap: $spacer * 3;
    margin-bottom: $spacer * 3;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex-direction: column;
    }
    
    .contact-info, .contact-form {
      flex: 1;
    }
  }
  
  .info-blocks {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: $spacer * 1.5;
    margin-bottom: $spacer * 2;
  }
  
  .info-block {
    display: flex;
    align-items: flex-start;
  }
  
  .info-icon {
    font-size: 1.5rem;
    margin-right: $spacer;
    color: $primary;
  }
  
  .info-title {
    font-size: $font-size-lg;
    margin-bottom: $spacer * 0.5;
  }
  
  .info-text {
    color: $gray-700;
    margin-bottom: $spacer * 0.25;
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
    gap: $spacer * 0.5;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    color: $gray-700;
    text-decoration: none;
    transition: $transition-base;
    
    &:hover {
      color: $primary;
    }
    
    .social-icon {
      margin-right: $spacer * 0.5;
    }
  }
  
  .contact-map {
    margin-top: $spacer * 2;
    
    .map-title {
      margin-bottom: $spacer;
    }
    
    .map-placeholder {
      height: 300px;
      background-color: $gray-200;
      border-radius: $border-radius;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .map-address {
      position: absolute;
      bottom: $spacer;
      left: $spacer;
      background-color: white;
      padding: $spacer;
      border-radius: $border-radius;
      box-shadow: $box-shadow-sm;
      display: flex;
      align-items: center;
      max-width: 80%;
    }
    
    .address-icon {
      margin-right: $spacer * 0.5;
      color: $primary;
    }
    
    .address-text {
      font-size: $font-size-sm;
    }
  }
  
  .contact-form {
    background-color: white;
    border-radius: $border-radius;
    padding: $spacer * 2;
    box-shadow: $box-shadow-sm;
    
    .form {
      display: flex;
      flex-direction: column;
      gap: $spacer;
    }
    
    .form-group {
      margin-bottom: $spacer;
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
    }
    
    .invalid-feedback {
      color: $danger;
      font-size: $font-size-sm;
      margin-top: $spacer * 0.25;
    }
    
    .form-check {
      display: flex;
      align-items: flex-start;
      
      .form-check-input {
        margin-top: 0.3em;
        margin-right: $spacer * 0.5;
      }
      
      .form-check-label {
        margin-bottom: 0;
      }
    }
    
    .link {
      color: $primary;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    .btn-block {
      width: 100%;
    }
  }
  
  .form-success {
    text-align: center;
    padding: $spacer * 2;
    
    .success-icon {
      width: 60px;
      height: 60px;
      background-color: $success;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin: 0 auto $spacer;
    }
    
    .success-title {
      margin-bottom: $spacer;
    }
    
    .success-message {
      color: $gray-700;
    }
  }
  
  .contacts-faq {
    margin-bottom: $spacer * 3;
    
    .section-title {
      text-align: center;
      margin-bottom: $spacer * 2;
      
      &::after {
        margin-left: auto;
        margin-right: auto;
      }
    }
    
    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .faq-item {
      border-bottom: 1px solid $gray-200;
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    .faq-question {
      padding: $spacer 0;
      font-weight: $font-weight-medium;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      
      &:hover {
        color: $primary;
      }
    }
    
    .faq-toggle {
      font-weight: $font-weight-bold;
      color: $gray-600;
    }
    
    .faq-answer {
      padding-bottom: $spacer;
      color: $gray-700;
    }
  }
}
</style>
