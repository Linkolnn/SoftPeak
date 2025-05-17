<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">{{ isLoginMode ? 'Вход в аккаунт' : 'Регистрация' }}</h1>
          <p class="auth-subtitle">
            {{ isLoginMode ? 'Войдите в свой аккаунт для доступа к заказам и личному кабинету' : 'Создайте аккаунт для быстрого оформления заказов и отслеживания покупок' }}
          </p>
        </div>
        
        <div v-if="authError" class="auth-error">
          <FontAwesomeIcon icon="exclamation-circle" class="error-icon" /> {{ authError }}
        </div>
        
        <form @submit.prevent="submitForm" class="auth-form">
          <div v-if="!isLoginMode" class="form-group">
            <label for="name" class="form-label">Имя *</label>
            <div class="input-with-icon">
              <FontAwesomeIcon icon="user" class="input-icon" />
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                @input="validateField('name')"
                placeholder="Введите ваше имя"
                :disabled="isSubmitting"
              />
            </div>
            <div v-if="errors.name" class="invalid-feedback">
              <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.name }}
            </div>
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email *</label>
            <div class="input-with-icon">
              <FontAwesomeIcon icon="envelope" class="input-icon" />
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                @input="validateField('email')"
                placeholder="Введите ваш email"
                :disabled="isSubmitting"
              />
            </div>
            <div v-if="errors.email" class="invalid-feedback">
              <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.email }}
            </div>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Пароль *</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="formData.password" 
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                @input="validateField('password')"
                placeholder="Введите пароль"
                :disabled="isSubmitting"
              />
              <button 
                type="button" 
                class="password-toggle" 
                @click="togglePasswordVisibility"
                :disabled="isSubmitting"
              >
                <FontAwesomeIcon :icon="showPassword ? 'eye-slash' : 'eye'" />
              </button>
            </div>
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>
          
          <div v-if="!isLoginMode" class="form-group">
            <label for="confirmPassword" class="form-label">Подтверждение пароля *</label>
            <div class="password-input">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="formData.confirmPassword" 
                class="form-control"
                :class="{ 'is-invalid': errors.confirmPassword }"
                @input="validateField('confirmPassword')"
                placeholder="Повторите пароль"
                :disabled="isSubmitting"
              />
              <button 
                type="button" 
                class="password-toggle" 
                @click="toggleConfirmPasswordVisibility"
                :disabled="isSubmitting"
              >
                <FontAwesomeIcon :icon="showConfirmPassword ? 'eye-slash' : 'eye'" />
              </button>
            </div>
            <div v-if="errors.confirmPassword" class="invalid-feedback">
              {{ errors.confirmPassword }}
            </div>
          </div>
          
          <div v-if="isLoginMode" class="form-group form-check">
            <input 
              type="checkbox" 
              id="rememberMe" 
              v-model="formData.rememberMe" 
              class="form-check-input"
              :disabled="isSubmitting"
            />
            <label for="rememberMe" class="form-check-label">
              Запомнить меня
            </label>
          </div>
          
          <div v-if="!isLoginMode" class="form-group form-check">
            <input 
              type="checkbox" 
              id="agreement" 
              v-model="formData.agreement" 
              class="form-check-input"
              :class="{ 'is-invalid': errors.agreement }"
              @change="validateField('agreement')"
              :disabled="isSubmitting"
            />
            <label for="agreement" class="form-check-label">
              Я согласен с <NuxtLink to="/terms" class="link">условиями использования</NuxtLink> и <NuxtLink to="/privacy" class="link">политикой конфиденциальности</NuxtLink> *
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
            <span v-if="isSubmitting">
              <FontAwesomeIcon icon="circle-notch" spin class="mr-1" />
              {{ isLoginMode ? 'Вход...' : 'Регистрация...' }}
            </span>
            <span v-else>
              <FontAwesomeIcon :icon="isLoginMode ? 'sign-in-alt' : 'user-plus'" class="mr-1" />
              {{ isLoginMode ? 'Войти' : 'Зарегистрироваться' }}
            </span>
          </button>
          
          <div v-if="isLoginMode" class="forgot-password">
            <NuxtLink to="/forgot-password" class="link">
              <FontAwesomeIcon icon="key" class="mr-1" /> Забыли пароль?
            </NuxtLink>
          </div>
        </form>
        
        <div class="auth-separator">
          <span class="separator-text">или</span>
        </div>
        
        <div class="social-auth">
          <button class="btn btn-outline-secondary btn-social">
            <FontAwesomeIcon :icon="['fab', 'google']" class="social-icon" /> Войти через Google
          </button>
          <button class="btn btn-outline-secondary btn-social">
            <FontAwesomeIcon :icon="['fab', 'vk']" class="social-icon" /> Войти через VK
          </button>
        </div>
        
        <div class="auth-toggle">
          <p>
            {{ isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
            <a href="#" class="link" @click.prevent="toggleAuthMode">
              {{ isLoginMode ? 'Зарегистрироваться' : 'Войти' }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useAuthStore } from '~/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

// Auth mode (login or register)
const isLoginMode = ref(true);

// Form data
const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
  agreement: false
});

// Form state
const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: ''
});
const isSubmitting = ref(false);
const authError = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Toggle between login and register modes
const toggleAuthMode = () => {
  isLoginMode.value = !isLoginMode.value;
  authError.value = '';
  
  // Reset form
  Object.keys(formData).forEach(key => {
    if (key !== 'rememberMe') {
      formData[key as keyof typeof formData] = '';
    }
  });
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Toggle confirm password visibility
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
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
    case 'password':
      if (!formData.password) {
        errors.password = 'Пожалуйста, введите пароль';
      } else if (!isLoginMode.value && formData.password.length < 6) {
        errors.password = 'Пароль должен содержать не менее 6 символов';
      } else {
        errors.password = '';
      }
      
      // Also validate confirmPassword if it has a value
      if (!isLoginMode.value && formData.confirmPassword) {
        validateField('confirmPassword');
      }
      break;
    case 'confirmPassword':
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Пожалуйста, подтвердите пароль';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают';
      } else {
        errors.confirmPassword = '';
      }
      break;
    case 'agreement':
      errors.agreement = !isLoginMode.value && !formData.agreement ? 'Необходимо согласиться с условиями' : '';
      break;
  }
};

// Validate all form fields
const validateForm = () => {
  if (!isLoginMode.value) {
    validateField('name');
  }
  validateField('email');
  validateField('password');
  if (!isLoginMode.value) {
    validateField('confirmPassword');
    validateField('agreement');
  }
  
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
  authError.value = '';
  
  try {
    if (isLoginMode.value) {
      // Login
      await authStore.login(formData.email, formData.password);
      router.push('/profile');
    } else {
      // Register
      await authStore.register(formData.name, formData.email, formData.password);
      router.push('/profile');
    }
  } catch (error: any) {
    authError.value = error.message || 'Произошла ошибка. Пожалуйста, попробуйте еще раз.';
  } finally {
    isSubmitting.value = false;
  }
};

// SEO metadata
useSeoMeta({
  title: computed(() => isLoginMode.value ? 'Вход в аккаунт | SoftPeak' : 'Регистрация | SoftPeak'),
  description: computed(() => isLoginMode.value ? 
    'Войдите в свой аккаунт для доступа к заказам и личному кабинету' : 
    'Создайте аккаунт для быстрого оформления заказов и отслеживания покупок'
  )
});
</script>

<style lang="scss" scoped>
.auth-page {
  padding: $spacer * 4 0;
  background-color: $gray-100;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  
  .container {
    max-width: 500px;
  }
  
  .auth-card {
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    padding: $spacer * 2;
  }
  
  .auth-header {
    text-align: center;
    margin-bottom: $spacer * 2;
  }
  
  .auth-title {
    margin-bottom: $spacer * 0.5;
  }
  
  .auth-subtitle {
    color: $gray-600;
  }
  
  .auth-error {
    background-color: lighten($danger, 40%);
    color: $danger;
    padding: $spacer;
    border-radius: $border-radius;
    margin-bottom: $spacer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .error-icon {
      margin-right: $spacer * 0.5;
      width: 16px;
    }
  }
  
  .auth-form {
    margin-bottom: $spacer * 1.5;
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
  
  .input-with-icon {
    position: relative;
    
    .input-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: $gray-600;
      width: 16px;
      height: 16px;
    }
    
    .form-control {
      padding-left: 40px;
    }
  }
  
  .mr-1 {
    margin-right: 0.25rem;
  }
  
  .password-input {
    position: relative;
    
    .form-control {
      padding-right: 40px;
    }
    
    .password-toggle {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: $gray-600;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg {
        width: 16px;
        height: 16px;
      }
      
      &:hover {
        color: $gray-800;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  
  .invalid-feedback {
    color: $danger;
    font-size: $font-size-sm;
    margin-top: $spacer * 0.25;
    display: flex;
    align-items: center;
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
  
  .forgot-password {
    text-align: center;
    margin-top: $spacer;
    font-size: $font-size-sm;
  }
  
  .auth-separator {
    position: relative;
    text-align: center;
    margin: $spacer * 1.5 0;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: $gray-300;
    }
    
    .separator-text {
      position: relative;
      display: inline-block;
      padding: 0 $spacer;
      background-color: white;
      color: $gray-600;
    }
  }
  
  .social-auth {
    margin-bottom: $spacer * 1.5;
    
    .btn-social {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacer * 0.5;
    }
    
    .social-icon {
      width: 18px;
      height: 18px;
      margin-right: $spacer * 0.5;
      color: $gray-700;
    }
  }
  
  .auth-toggle {
    text-align: center;
    color: $gray-700;
  }
}
</style>
