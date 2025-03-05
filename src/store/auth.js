import { defineStore } from "pinia";

export const useAuth=defineStore("authStore",{
    state:()=>({
        user:JSON.parse(localStorage.getItem("user"))||null
    }),
    getters:{
        isLoggedIn:(state)=>!!state.user
    },
    actions:{
        login(username,password){
   
    const userTable=JSON.parse(localStorage.getItem("usertable"))    
    console.log(userTable);
    console.log('====================================');
    console.log(username,password);
    console.log('====================================');
    if(username==="smart"&&password==="121212"){
        const user = { username,expire:Date.now()+60*60*24*30 *1000,role:"admin" };
        localStorage.setItem('user', JSON.stringify(user));  
        localStorage.setItem("authorized",true)
        this.user = user;  
        return [true,"success","login success"];
    }
    for (const e of userTable) {
        if (username === e.username && password === e.password) {
            const user = { username, expire: Date.now() + 60 * 60 * 24 * 30 * 1000, role: e.role };
            localStorage.setItem('user', JSON.stringify(user));  
            localStorage.setItem("authorized", "true");
            this.user = user;
            return [true, "success", "login success"];
        }
    }
    return [false, "error", "Invalid username or password"];
 
  
        },
        logout(){
            this.user = null;
            localStorage.removeItem('user'); // حذف بيانات المستخدم
        }
    }
})