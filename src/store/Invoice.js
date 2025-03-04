import { defineStore } from "pinia";

export const InvoiceTable = defineStore("InvoiceTable", {
  state: () => ({
    InvoiceTable: JSON.parse(localStorage.getItem("InvoiceTable")) || [],
  }),
  getters: {
    isLoggedIn: (state) => !!state.InvoiceTable,
  },
  actions: {
    create(price, startdate,idContract) {
      
      const contract =JSON.parse(localStorage.getItem("constractsTable"))
      const customer =JSON.parse(localStorage.getItem("customerTable"))
      
      const customerContract = contract.some(
        (user) => user.Id == idContract
      );
      const Contract = contract.find(
        (user) => user.Id == idContract
      );
      const customers = customer.find(
        (user) => user.Id == Contract.customerId
      );
 
      
      if (!customerContract) return [false,"error","not found InvoiceBy these ID"]
      const invoice=this.InvoiceTable.filter(inv=>inv.contractId == idContract)
      let total=0+Number(price)
      invoice.map(e=>{
        console.log(e);
        
        total+=Number(e.payed)
      })
      if(total>contract[0].payment){
        console.log(
          [false,"You have paid more than the contract payment"]
        );
        return [false,"error","You have paid more than the contract payment"]
      }
      console.log(contract[0].payment,total);
      const latestInvoice=invoice[invoice.length-1]
     const check= invoice.find(inv => {
      const dateexpire=new Date(contract.expiredate).getTime();
      const date=new Date(startdate).getTime();
      if(date>dateexpire){
        console.log(
          [false,"Contract expired"]
        );
        return [false,"error","Contract expired"]
      }
        const [year,month,day]=inv.startdate.split("-")
        const [yearnew,monthnew,daynew]=startdate.split("-")
 
        if(Number(contract[0].expiredate.split("-")[0])<Number(yearnew)){
          console.log(
            [false,"Contract expired"]
          );
          return [false,"error","Contract expired"]
        }
        if(month===monthnew && yearnew===year){
          console.log(
            [false,"these day alredy found"]
          );
          
          return [false,"error","these day alredy found"]
        }
      })
 
      if(check) return check;
      const manger = JSON.parse(localStorage.getItem("user"));
      if (!manger) return [false,"error","notfound"];
      let newInvoice ={}
      if(customers.freetrial){

          newInvoice = {
          ...latestInvoice, // Copy old invoice data
          Id: (this.InvoiceTable.length || 0) + 1, // New unique ID
          startdate: startdate, // Update start date
          state: "done", // Mark as unpaid
          payed: 0, // Initialize new invoice with 0 payed amount
          freetrial:true
        };
      }else{
        newInvoice = {
          ...latestInvoice, // Copy old invoice data
          Id: (this.InvoiceTable.length || 0) + 1, // New unique ID
          startdate: startdate, // Update start date
          state: "Undone", // Mark as unpaid
          payed: Number(price), // Initialize new invoice with 0 payed amount
          freetrial:false
        };
      }
    
    // Store the new invoice
    this.InvoiceTable.push(newInvoice);
      localStorage.setItem(
        "InvoiceTable",
        JSON.stringify(this.InvoiceTable)
      );
      console.log("ssssssss",price, startdate,idContract);
      
      return [true, "success","success crate imvoice"];
    },
    update(id, state, items) {
      const Invoice = this.InvoiceTable.find(constract=>constract.Id===id)
      if (!Invoice) return [false,"error", "notfound"];
      if (state.length > 0) Invoice.state = state;
      if (items.length > 0) Invoice.items = items;
      this.InvoiceTable.push(constract);
      localStorage.setItem(
        "InvoiceTable",
        JSON.stringify(this.InvoiceTable)
      );
      return [true, "success","success crate imvoice"];
    },
    delete(id) {
      this.InvoiceTable = this.InvoiceTable.filter(
        (user) => user.userId !== id
      );
      localStorage.setItem(
        "InvoiceTable",
        JSON.stringify(this.InvoiceTable)
      );
      return [true, "success","success update"];
    },
    get() {
      return [...this.InvoiceTable];
    },
    getBy(id) {
      let invoices = this.InvoiceTable.filter(invoice => invoice.contractId == id);
      const customer=JSON.parse(localStorage.getItem("customerTable"));
      if (invoices.length === 0) {
          console.log("No invoices found for this contract.");
          return [false,"error","No invoices found for this contract."];
      }
  
      let latestInvoice = invoices[invoices.length - 1]; 
      const contractStore = JSON.parse(localStorage.getItem("constractsTable")) || [];
      const contract = contractStore.filter(contract => contract.Id == id);
      const customerOne=customer.find(contracts=> contracts.Id==contract[0].customerId)
console.log(contract);

if(contract[0].auto){

  if (!contract) {
    console.log("Contract not found. Cannot generate invoices.");
    return invoices;
  }

 
  const totalContractPayment = Number(contract[0].payment)

  let totalPaid = 0
  invoices.forEach((sum ) =>{
    if(sum.state=="done"){
 
      totalPaid+=Number(sum.payed)
    }
  });
  console.log(`Total Paid: ${totalPaid} / Contract Payment: ${totalContractPayment}`);
  contract.totalPaid=totalPaid
  if (totalPaid >= totalContractPayment) {
    console.log("Total contract payment reached. No more invoices will be generated.");
    return invoices;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentDay = currentDate.getDate();

  const newStartDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const existingInvoice = invoices.filter(inv => {
    
    const datemonth=  inv.startdate.split("-")[1]
    const dateYear=inv.startdate.split("-")[0]
    return datemonth === currentMonth && dateYear === currentYear.toString();
  });
  
  if (existingInvoice.length >0) {
    console.log("Invoice for this month already exists. No new invoice created.");
    return invoices; 
  }
  console.log("Today is the first day of the month! Generating a new invoice...");
  let newInvoice ={}
  if(customerOne.ftreetrial){

      newInvoice = {
      ...latestInvoice, 
      Id: (this.InvoiceTable.length || 0) + 1,
      startdate: newStartDate, 
      state: "Undone", 
      payed: 0 ,
      freeTrial:true
    }
  }
  else{
      newInvoice = {
      ...latestInvoice, 
      Id: (this.InvoiceTable.length || 0) + 1,
      startdate: newStartDate, 
      state: "Undone", 
      payed: 0 ,
      freeTrial:false
    }

    }
    
  // Store the new invoice
  this.InvoiceTable.push(newInvoice);
  console.log("New invoice created:", newInvoice);
}

      localStorage.setItem("InvoiceTable", JSON.stringify(this.InvoiceTable));
      return this.InvoiceTable.filter(invoice => invoice.contractId == id);
  }
,  
    
    getandupdate(id,state){
      console.log(id,state,"message", this.InvoiceTable);
      
      const Invoice = this.InvoiceTable.find(constract=>constract.Id===id)
      console.log(Invoice);
      
      if (!Invoice) return [false,"error", "notfound"];
      if (state.length > 0) Invoice.state = state;
 
      localStorage.setItem(
        "InvoiceTable",
        JSON.stringify(this.InvoiceTable)
      );
      return [true, "success","sucessfully update"];

    },
    getandupdatpayed(id,payed){
      const Invoice = this.InvoiceTable.find(constract=>constract.Id===id)
      
      if (!Invoice) return [false,"error", "notfound"];
      if(Invoice.freetrial){
        console.log([false,"error", "freeTrial"]);
        
        Invoice.payed = 0;
        [false,"error", "freeTrial"]
      }
      else{

        Invoice.payed = payed;
      }
      console.log(Invoice,"message");
        localStorage.setItem(
        "InvoiceTable",
        JSON.stringify(this.InvoiceTable)
      );
      return [true, "success","sucess and update"];
    },
 
  },
});
