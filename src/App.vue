<script setup>
import { RouterLink, RouterView } from "vue-router"
import Navbar from "./Util/Navbar.vue"
import 'primeicons/primeicons.css'
import { onMounted, onUnmounted, ref } from "vue";
import SlideBar from "./Util/SlideBar.vue";
const isHidden = ref(true);
const ShowMinu = ref(false);
const NotLoginPage = ref(true);
const path = ref(window.location.pathname);

const updatePath = () => {
    path.value = window.location.pathname;

};
const checkPath = () => {
    
};
const checkWidth = () => {
    isHidden.value = window.innerWidth < 1380;
    NotLoginPage.value = window.location.pathname!=='/';
    if (!isHidden.value){
        ShowMinu.value = false;
    }
};
onMounted(() => {
    checkWidth();
    window.addEventListener('resize', checkWidth);
    window.addEventListener('popstate', updatePath);
});
onUnmounted(() => {
    window.removeEventListener('resize', checkWidth);
    window.removeEventListener('popstate', updatePath);
});
const OnClick = () => {
    ShowMinu.value = !ShowMinu.value;
}
const routes = [
    {
        path: '/admin',
  
        name: 'admin',

    },
    {
        path: '/contracts',
  
        name: 'contracts',

    },

    {
        path: '/customers',
        
        name: 'customers',
    },


]
console.log(path.value!='/');

</script>
<template>
    <Navbar :isHidden="isHidden" :path="path" v-model:ShowMinu="ShowMinu"  />
    <div :class="NotLoginPage  ? 'd-flex overflow-hidden' : ' overflow-hidden '">
        <div  v-if="path!='/'"  style="height: 100vh;">
        </div>
            <SlideBar v-if="path!='/'" :SlideHandle="OnClick" :ShowMenu ="ShowMinu " :Routes="routes"/>

    

        <div :class="isHidden || path=='/'
        ? ' w-100' :'col-md-10'">

            <RouterView />
        </div>
        </div>



</template>

<style scoped>
li{
    list-style-type: none;
}
a{
    color: white;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
    font-size: 22px;
    position: relative;
}

a::after{
    content: "";
    position: absolute;
    width: 0;
    background:white;
    opacity: 50%;
left: 0%;
height: 100%;
    transition: width 0.3s ease-in-out;
}

a:hover::after{
    width: 100%;
}
</style>