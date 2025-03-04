import { defineStore } from "pinia";

export const contractsTable = defineStore("constractsTable", {
  state: () => ({
    constractsTable: JSON.parse(localStorage.getItem("constractsTable")) || [],
  }),
  getters: {
    isLoggedIn: (state) => !!state.constractsTable,
  },
  actions: {
    create(customername, monthlypayment, startdate, expiredate, payment, note, items) {
      
      const manager = JSON.parse(localStorage.getItem("user"));
      const customers = JSON.parse(localStorage.getItem("customerTable")) || [];
      const contracts = JSON.parse(localStorage.getItem("constractsTable")) || [];
      const invoices = JSON.parse(localStorage.getItem("InvoiceTable")) || [];
 
      const customer = customers.find(user => user.username === customername);
      if (!customer) return [false,"error", "Customer not found"];
  
 
      if (!manager) return [false,"error", "Manager not found"];
  
      const createdby = manager.username;
  
 
      const contractId = (contracts.length || 0) + 1;
      const newContract = {
          Id: contractId,
          customerId: customer.Id,
          startdate: startdate,
          expiredate: expiredate,
          payment: Number(payment),
          monthlypayment: Number(monthlypayment),
          note: note,
          createdby: createdby,
          auto:false
      };
  
 
      contracts.push(newContract);
      localStorage.setItem("constractsTable", JSON.stringify(contracts));
 
      if (!contracts.some(contract => contract.Id === contractId)) {
          return [false,"error", "Contract creation failed"];
      }
 
      const invoiceId = (invoices.length || 0) + 1;
      let newInvoice ={}
      if(customer.freetrial){

        newInvoice = {
          Id: invoiceId,
          customerId: customer.Id,
          contractId: contractId,
          namecustomer: customername,
          startdate: startdate,
          state: "done",  
          createdby: createdby,
          items: items || [], 
          payed:0,
          freetrial:true
        }
      }else{
        newInvoice = {
          Id: invoiceId,
          customerId: customer.Id,
          contractId: contractId,
          namecustomer: customername,
          startdate: startdate,
          state: "undone",  
          createdby: createdby,
          items: items || [], 
          payed:Number(monthlypayment),
          freetrial:false
        }
      }
   
      invoices.push(newInvoice);
      localStorage.setItem("InvoiceTable", JSON.stringify(invoices));
      return [true,'success',"Contract and Invoice created successfully"];
  },  
    update(id, expiredate, payment,monthly, note) {
      console.log(
        id,expiredate,payment,monthly, note
      );
      
      const manger = JSON.parse(localStorage.getItem("user"));
      const constract = this.constractsTable.find(constract=>constract.Id===id)
      console.log(constract);
      
      if (!manger) return [false, "notfound"];
      if (expiredate.length > 0) constract.expiredate =  expiredate 
      if (payment.length > 0) constract.payment = Number(payment);
      if (monthly.length > 0) constract.monthlypayment = Number(monthly);
      if (note.length > 0) constract.note = note;
 
      localStorage.setItem(
        "constractsTable",
        JSON.stringify(this.constractsTable)
      );
      return [true, "success","success update complete"];
    },
    delete(id) {
      this.constractsTable = this.constractsTable.filter(
        (user) => user.Id !== id
      );
      const invoice=JSON.parse(localStorage.getItem('InvoiceTable'))
      const invoices = invoice.filter(user=>user.contractId!==id)
      localStorage.setItem(
        "InvoiceTable",
        JSON.stringify(invoices)
      );
      localStorage.setItem(
        "constractsTable",
        JSON.stringify(this.constractsTable)
      );
      return [true, "success","success delete complete"];
    },
    get() {
      return [...this.constractsTable];
    },
    getone(id) {
      return this.constractsTable.find((constract) => constract.Id == id);
    },
    getBy(id){
      return this.constractsTable.filter((constract) => constract.customerId == id);
    },
    getandupdatauto(id,auto){
      const Invoice = this.constractsTable.find(constract=>constract.Id===id)
      console.log(Invoice,"dfsffddf",auto,id);
      
      if (!Invoice) return [false, "notfound"];
      Invoice.auto = auto;
      console.log(Invoice,"rere");
      localStorage.setItem(
        "constractsTable",
        JSON.stringify(this.constractsTable)
      );
      return [true, "success" ];
    },
    getByUser(username){
 
      return this.constractsTable.filter((constract) => constract.createdby == username);
    },
  },
});
