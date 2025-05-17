import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faShoppingCart, faSearch, faUser, faHeart, faStar, faStarHalfAlt, 
  faCheck, faTimes, faExclamationCircle, faShield, faLock, faCreditCard, 
  faMapMarkerAlt, faBox, faArrowLeft, faTrash, faPlus, faMinus, 
  faInfoCircle, faChevronDown, faChevronUp, faEye, faEyeSlash, 
  faSignOutAlt, faSignInAlt, faUserPlus, faShoppingBag, faTruck, 
  faCheckCircle, faTimesCircle, faRedo, faSpinner, faHome, faPhone, 
  faEnvelope, faKey, faEdit, faTrashAlt, faShieldAlt, faSave, 
  faCircleNotch, faDownload, faFileInvoice, faCalendarAlt, faReceipt, 
  faClock, faChevronRight, faPaintBrush, faFileAlt, faCode, faWrench, 
  faBell, faCog, faQuestionCircle, faTags, faDollarSign, faDesktop,
  faUndo, faSort, faSync, faExclamationTriangle, faThLarge, faLaptop,
  faComment, faQuestion
} from '@fortawesome/free-solid-svg-icons'
import { 
  faHeart as farHeart, 
  faStar as farStar,
  faUser as farUser,
  faCreditCard as farCreditCard
} from '@fortawesome/free-regular-svg-icons'
import { 
  faGithub, faTwitter, faFacebook, 
  faInstagram, faYoutube, faLinkedin,
  faVk, faTelegram, faGoogle
} from '@fortawesome/free-brands-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
  // Add icons to the library
  library.add(
    // Solid icons
    faShoppingCart, faSearch, faUser, faHeart, faStar, faStarHalfAlt, 
    faCheck, faTimes, faExclamationCircle, faShield, faLock, faCreditCard, 
    faMapMarkerAlt, faBox, faArrowLeft, faTrash, faPlus, faMinus, 
    faInfoCircle, faChevronDown, faChevronUp, faEye, faEyeSlash, 
    faSignOutAlt, faSignInAlt, faUserPlus, faShoppingBag, faTruck, 
    faCheckCircle, faTimesCircle, faRedo, faSpinner, faHome, faPhone, 
    faEnvelope, faKey, faEdit, faTrashAlt, faShieldAlt, faSave, 
    faCircleNotch, faDownload, faFileInvoice, faCalendarAlt, faReceipt, 
    faClock, faChevronRight, faPaintBrush, faFileAlt, faCode, faWrench, 
    faBell, faCog, faQuestionCircle, faTags, faDollarSign, faDesktop,
    faUndo, faSort, faSync, faExclamationTriangle, faThLarge, faLaptop,
    faComment, faQuestion,
    
    // Regular icons
    farHeart, farStar, farUser, farCreditCard,
    
    // Brand icons
    faVk, faTelegram, faGoogle, faGithub, faTwitter, faFacebook, faInstagram, faYoutube, faLinkedin
  )

  // Register the component globally
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
