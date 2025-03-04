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
    if(username==="alan"&&password==="121212"){
        const user = { username,expire:Date.now()+60*60*24*30 *1000,role:"Admin" };
        localStorage.setItem('user', JSON.stringify(user));  
        localStorage.setItem("authorized",true)
        this.user = user; // Update the Pinia state
        return ["success","login success"];
    }else{
        userTable.map(e=>{
            
            if(username===e.username&&password===e.password){
                const user = { username,expire:Date.now()+60*60*24*30 *1000,role:"Admin" };
                localStorage.setItem('user', JSON.stringify(user));  
                localStorage.setItem("authorized",true)
                this.user = user; // Update the Pinia state
                return ["success","login success"];
            }
            
            console.log("hassisiii");
        })    
    }
    return ["error","login error"];
  
        },
        logout(){
            this.user = null;
            localStorage.removeItem('user'); // حذف بيانات المستخدم
        }
    }
})