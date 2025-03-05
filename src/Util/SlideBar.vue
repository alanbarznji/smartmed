<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  SlideHandle: {
    type: Function,
    required: true
  },
  ShowMenu: {
    type: Boolean,
    required: true
  },
  Routes: {
    type: Array,
    required: true
  },
  appLogo: {
    type: String,
    default: null
  }
});


const isLargeScreen = ref(false);
const sidebarVisible = computed(() => isLargeScreen.value || props.ShowMenu);

const checkScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1380; 
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
const user=JSON.parse(localStorage.getItem('user'))
console.log('====================================');
console.log(user.role==="Admin");
console.log('====================================');
</script>

<template>
 
  <div 
    v-if="!isLargeScreen && ShowMenu" 
    @click="SlideHandle" 
    class="overlay"
  ></div>
  
 
  <transition name="slide">
    <div v-if="sidebarVisible" class="menu" :class="{ 'menu-desktop': isLargeScreen }">
      <div class="menu-header">
        <div class="logo-area">
          <img v-if="appLogo" :src="appLogo" alt="Logo" class="menu-logo" />
          <h2 class="menu-title">Menu</h2>
        </div>
       
        <button v-if="!isLargeScreen" class="close-button" @click="SlideHandle" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="menu-divider"></div>
      
      <nav class="menu-nav">
        <router-link 
          v-for="(route, index) in Routes" 
          :key="index"
          :to="route.path" 
          class="menu-link"
          @click="!isLargeScreen ? SlideHandle : () => {}"
          v-slot="{ isActive }"
        >
          <div v-if="(user.role=='admin'&&route.admin)||!route.admin" class="menu-link-content" :class="{ active: isActive }">
            <span v-if="route.icon" class="route-icon">
              <component :is="route.icon" />
            </span>
            <span class="route-name">{{ route.name }}</span>
          </div>
        </router-link>
      </nav>
      
      <div class="menu-footer">
        <div class="menu-divider"></div>
        <div class="footer-content">
          <span>© {{ new Date().getFullYear() }}</span>
        </div>
      </div>
    </div>
  </transition>
  
 
  <div v-if="isLargeScreen" class="content-spacer"></div>
</template>

<style scoped>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 999;
}


.menu {
  width: 280px;
  max-width: 85%;
  height: 100vh;
  background: linear-gradient(135deg, #1e40af, #2563eb);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow-y: auto;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}


.menu-desktop {
  position: fixed;
  transform: none !important; 
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.1);
}


.content-spacer {
  width: 280px;
  height: 100%;
  flex-shrink: 0;
}


.menu-header {
  padding: 24px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-logo {
  height: 32px;
  width: auto;
}

.menu-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.close-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}


.menu-divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.15);
  margin: 0;
}


.menu-nav {
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  flex-grow: 1;
}

.menu-link {
  display: block;
  color: white;
  text-decoration: none;
  margin: 4px 12px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.menu-link-content {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  position: relative;
  transition: all 0.3s;
}

.menu-link-content::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: white;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 0 4px 4px 0;
}

.menu-link-content:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.menu-link-content.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu-link-content.active::before {
  opacity: 1;
}

.route-icon {
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.route-name {
  position: relative;
  z-index: 1;
  font-weight: 500;
  letter-spacing: 0.3px;
}


.menu-footer {
  margin-top: auto;
  padding-bottom: 16px;
}

.footer-content {
  padding: 16px 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;
}


.slide-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.7, 0, 0.84, 0);
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}


@media (min-width: 1024px) {
  .menu {
    transition: none;
  }
}
</style>