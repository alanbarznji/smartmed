import { defineStore } from "pinia";

export const customerTable=defineStore("customerTable",{
    state:()=>({
        customerTable:JSON.parse(localStorage.getItem("customerTable"))||[]
    }),
    getters:{
        isLoggedIn:(state)=>!!state.customerTable
    },
    actions:{
        create(username,address,phone,freetrial,startdate,note){
                const user =  this.customerTable.some(user=>user.username==username)
                const manger=JSON.parse(localStorage.getItem("user"))
                const createdby=manger.username
                if(user) return [false,"error","customer found"];
                const users = { Id:(this.customerTable.length||0)+1,username,address,phone,freetrial,startdate,note,createdby};
                this.customerTable.push(users);
                localStorage.setItem('customerTable', JSON.stringify(this.customerTable));  
                return [true,"success","customer create"];
        },
        delete(id){
            this.customerTable = this.customerTable.filter(user=>user.Id!==id)
            const contract =JSON.parse(localStorage.getItem('constractsTable'))
            const invoice =JSON.parse(localStorage.getItem('InvoiceTable'))
 
           const con= contract.filter(user=>user.customerId!==id)
           const inv= invoice.filter(user=>user.customerId!==id)
  
            localStorage.setItem('customerTable', JSON.stringify(this.customerTable));   
            localStorage.setItem('constractsTable', JSON.stringify(con));
            localStorage.setItem('InvoiceTable', JSON.stringify(inv));  
            return[true,"success","customer delete"];
        }, 
        update(id,username,address,phone,startdate,note){
            const user = this.customerTable.find(user=>user.Id===Number(id))

            if (!user) return [false, "notfound"];
            if (username.length > 0) user.username = username;
            if (address.length > 0) user.address = address;
            if (phone.length > 0) user.phone = phone;
       
            if (startdate.length > 0) user.startdate = startdate;
            if (note.length > 0) user.note = note;

            localStorage.setItem('customerTable', JSON.stringify(this.customerTable));    
            [true,"success","customer update"];
        },
        get(){
            return [...this.customerTable];
        },
        getone(id){
            console.log('====================================');
            console.log(id);
            console.log('====================================');
            return this.customerTable.find(user=>user.Id==id)
        },
        getandupdatfreetrial(id,auto){
            const Invoice = this.customerTable.find(constract=>constract.Id===id)
            console.log(Invoice,"dfsffddf",auto,id);
            
            if (!Invoice) return  [false,"error","customer found"];
            Invoice.freetrial = auto;
            console.log(Invoice,"rere");
            localStorage.setItem(
              "customerTable",
              JSON.stringify(this.customerTable)
            );
            [true,"success","customer change"];
          },
    }
})