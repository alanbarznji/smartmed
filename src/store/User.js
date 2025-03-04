import { defineStore } from "pinia";

export const userTableAuth=defineStore("userTableAuth",{
    state:()=>({
        usertable:JSON.parse(localStorage.getItem("usertable"))||[]
    }),
    getters:{
        isLoggedIn:(state)=>!!state.usertable
    },
    actions:{
        createuser(username,password,role){
                const user =  this.usertable.some(user=>user.username==username)
                if(user) return [false,"exists"];
                const users = { userId:(this.usertable.length||0)+1,username, password,role };
                this.usertable.push(users);
                localStorage.setItem('usertable', JSON.stringify(this.usertable));  
                return [true,"success"];
        },
        deleteuser(id){
            this.usertable = this.usertable.filter(user=>user.userId!==id)
            localStorage.setItem('usertable', JSON.stringify(this.usertable));   
            return [true,"success"];
        },
        updateuser(id,username,password){
            const user = this.usertable.find(user=>user.userId===id)
            const old={username:user.username,password:user.password}
            if (!user) return [false, "notfound"];

            if (username.length > 0) user.username = username;
            if (password.length > 0) user.password = password;

            localStorage.setItem('usertable', JSON.stringify(this.usertable));    
            return [true,"success"];
        },
        getuser(){
            return [...this.usertable];
        }
    }
})