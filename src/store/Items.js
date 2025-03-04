import { defineStore } from "pinia";

export const itemsTable=defineStore("itemsTable",{
    state:()=>({
        itemsTable:JSON.parse(localStorage.getItem("itemsTable"))||[]
    }),
    getters:{
        isLoggedIn:(state)=>!!state.itemsTable
    },
    actions:{
        create(name,price,quantity,note){
                const manger=localStorage.getItem("user")
                if(!manger) return [false,"permissiondenied"];
                const items =this.itemsTable.find(items=>items.name==name)
                if(items) return [false,"exists"];
                const newusers = { itemsId:(this.itemsTable.length||0)+1,name,price,quantity,note };
                this.itemsTable.push(newusers);
                localStorage.setItem('itemsTable', JSON.stringify(this.itemsTable));  
                return [true,"success"];
        },
        delete(id){
            this.itemsTable = this.itemsTable.filter(items=>items.itemsId!==id)
            localStorage.setItem('itemsTable', JSON.stringify(this.itemsTable));   
            return [true,"success"];
        },
        update(id,name,price,quantity,note){
            const items = this.itemsTable.find(user=>user.itemsId===id)
            if (!items) return [false, "notfound"];
            if (name.length > 0) items.name = name;
            if (price.length > 0) items.price = price;
            if (quantity.length > 0) items.quantity = quantity;
       
            if (note.length > 0) items.note = note;
            localStorage.setItem('itemsTable', JSON.stringify(this.itemsTable));    
            return [true,"success"];
        },
        get(){
            return [...this.itemsTable];
        }
    }
})