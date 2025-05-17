import { defineNuxtPlugin } from '#app';

// Cookie utilities with security protections
const setSecureCookie = (name: string, value: string, days: number = 7) => {
  if (process.server) return; // Only run on client side
  
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  
  // Encode value to prevent XSS
  const encodedValue = encodeURIComponent(value);
  
  // Set cookie with security attributes
  document.cookie = `${name}=${encodedValue}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure`;
};

// Get a cookie by name
const getCookie = (name: string): string | null => {
  if (process.server) return null; // Only run on client side
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      // Decode the cookie value
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  
  return null;
};

// Delete a cookie by name
const deleteCookie = (name: string) => {
  if (process.server) return; // Only run on client side
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`;
};

// Generate a CSRF token
const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Verify CSRF token
const verifyCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
};

// Create a Nuxt plugin to expose these utilities
export default defineNuxtPlugin(() => {
  return {
    provide: {
      cookieUtils: {
        setSecureCookie,
        getCookie,
        deleteCookie,
        generateCSRFToken,
        verifyCSRFToken
      }
    }
  };
});

// Also export the functions directly for use in non-component files
export { setSecureCookie, getCookie, deleteCookie, generateCSRFToken, verifyCSRFToken };
