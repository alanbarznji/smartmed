 import {createRouter ,createWebHistory} from "vue-router"
import App from "./App.vue"
 
import { useAuth } from "./store/auth"
 
import Contracts from "./page/Contracts.vue"
 
import Login from "./page/Login.vue"
import Customers from "./page/Customers.vue"
import CustomerDetails from "./page/CustomerDetails.vue"
import AdminPage from "./page/AdminPage.vue"

 
 

 const routes=    [
    {
    path: '/admin',
    component: AdminPage,
    meta: { requiresAuth: true }
    
},
    {
    path: '/contracts',
    component: Contracts,
  meta:  { requiresAuth: true } 
  
},
 
{
    path: '/',
    component: Login,
    
},
{
    path: '/customers',
    component: Customers,
    meta:  { requiresAuth: true } 
    
},
{ path: "/customer/:id", component: CustomerDetails, props: true },

]
 const router=createRouter({
    history: createWebHistory(),
    routes,
 
})

router.beforeEach((to, from, next) => {
    const authStore = useAuth();
if(to.path === '/' &&authStore.isLoggedIn&&authStore.user&& authStore.user.expire > Date.now()){
    if(authStore.role==="admin"){
        next('/admin');
    }else{
        next('/customers');
    }
}

else if(to.meta.requiresAuth && (!authStore.isLoggedIn||!authStore.user)){
    localStorage.removeItem('user');
    localStorage.removeItem('authorized');
    next('/');
}

else{
    next();
}
});

 
    export default router