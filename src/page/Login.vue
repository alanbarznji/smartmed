<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useAuth } from '../store/auth'
import Alert from '../Util/Alert.vue';
import Inputs from '../Util/Input.vue';
import { useRouter } from 'vue-router';

const isHidden = ref(true);
const username = ref('');
const password = ref('');
let show = ref('');
let status = ref('');
const { login, isLoggedIn, user } = useAuth();
const router = useRouter();

const checkWidth = () => {
    isHidden.value = window.innerWidth > 764;
};

onMounted(() => {
    checkWidth();
    window.addEventListener('resize', checkWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkWidth);
});
let type = ref('');
const handleLogin = async () => {
    try {
        const result = await login(username.value, password.value);
  
        show.value = result[2];
        type.value = result[1];
 
        if (result[0]) {
            username.value = '';
            password.value = '';
            setTimeout(() => { 
                status.value = ''; 
                type.value = ''
               window.location.pathname="/customers"
            }, 2000);
        } 
    } catch (error) {
        console.error('Error logging in:', error);
    }
}
watch(show, (newValue) => {
    setTimeout(() => { 
                status.value = ''; 
                type.value = 0
 
            }, 2000);
});

</script>

<template>
    <div class="login-page">
        <Alert :show="show" :type="type" :message="show" />
        <div class="login-container">
            <div class="login-form-container">
                <div class="login-form-wrapper">
                    <h1 class="login-title">Welcome Back</h1>
                    <p class="login-subtitle">Please enter your credentials to continue</p>
                    
                    <form class="login-form" @submit.prevent="handleLogin">
                        <div class="form-group">
                    
                            <Inputs v-model="username" Label="user" :Type="'text'" id="username" placeholder="Enter your username" />
                        </div>
                        
                        <div class="form-group">
        
                            <Inputs v-model="password" Label="password" :Type="'password'" id="password" placeholder="Enter your password" />
                        </div>
                        
                        <div class="form-options">
   
 
                        </div>
                        
                        <button type="submit" class="login-button">Sign In</button>
                        
 
                    </form>
                </div>
            </div>
            
            <div v-if="isHidden" class="login-visual">
                <div class="logo-container">
                    <div class="logo"><img src="../assets/image1.png" alt=""></div>
                </div>
                <div class="visual-content">
                    <h2>Experience the difference</h2>
                    <p>Login to access your personalized dashboard and exclusive features.</p>
                </div>
            </div>
        </div>
        

    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-container {
    display: flex;
    min-height: 100vh;
}

.login-form-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #ffffff;
}

.login-form-wrapper {
    width: 100%;
    max-width: 400px;
}

.login-title {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
}

.login-subtitle {
    color: #666;
    margin-bottom: 2rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-weight: 500;
    color: #333;
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.forgot-password {
    color: #007bff;
    text-decoration: none;
}

.login-button {
    padding: 0.75rem;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    width: 100%;
    margin-top: 1rem;
}

.login-button:hover {
    background-color: #0069d9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

.signup-link {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: #666;
}

.signup-link a {
    color: #007bff;
    text-decoration: none;
    font-weight: 600;
}

.login-visual {
    flex: 1;
    background: linear-gradient(135deg, #0061f2 0%, #6610f2 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    position: relative;
    overflow: hidden;
}

.login-visual::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 8%, transparent 8%);
    background-size: 25px 25px;
    top: -50%;
    left: -50%;
    z-index: 1;
    opacity: 0.5;
}

.logo-container {
    padding: 2rem;
    z-index: 2;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
}

.visual-content {
    padding: 3rem;
    margin-bottom: 4rem;
    z-index: 2;
}

.visual-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

@media (max-width: 764px) {
    .login-form-container {
        padding: 1.5rem;
    }
    
    .login-form-wrapper {
        max-width: 100%;
    }
}
</style>