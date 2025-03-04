<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router"; 
import Headers from "../components/CustomerDetails/Headers.vue";
import ContractDetails from "../components/CustomerDetails/ContractDetails.vue";
import InvoiceDetails from "../components/CustomerDetails/InvoiceDetails.vue";
import EditeCusromer from "../components/CustomerDetails/Addtional/EditeCustomer.vue";
import EditeContract from "../components/CustomerDetails/Addtional/EditeContract.vue";
import InvoiceAdd from "../components/CustomerDetails/Addtional/AddInvoice.vue";
import EditeInvoice from "../components/CustomerDetails/Addtional/EditeInvoice.vue";
import { customerTable } from "../store/Customer";
import { InvoiceTable } from "../store/Invoice";
import { contractsTable } from "../store/Contracts";
const route = useRoute();
const customerId = ref(route.params.id);  
const customerStore = customerTable();
const customer = computed(() => customerStore.getone(customerId.value));
console.log(" customer:", customer.value);
const ContractStore = contractsTable();
const Contract =computed(()=>ContractStore.getBy(customerId.value))
// UI State
const Type = ref();
let ShowInvoiceEdit = ref(false);
let ShowInvoiceAdd = ref(false);
let ShowContractEdit = ref(false);
let ShowCustomerEdit = ref(false);
const ContractId=ref()

const ShowInvoiceEditHandler = () => {
    ShowInvoiceEdit.value = !ShowInvoiceEdit.value;
};
 const ShowInvoiceAddHandler = (e) => {
     console.log(e);
     ContractId.value=e

    ShowInvoiceAdd.value = !ShowInvoiceAdd.value;
};
const ShowContractEditHandler = (e) => {
    ShowContractEdit.value = !ShowContractEdit.value;
 
    console.log(e);
    ContractId.value=e
    console.log(ContractId.value,"fjsjkldfs");
};
const ShowCustomerEditHandler = () => {
    ShowCustomerEdit.value = !ShowCustomerEdit.value;
};
const invoiceNumber = ref(1);
const checkScreenSize=()=>{
     ShowInvoiceEdit.value = false;
 ShowInvoiceAdd.value = false;
 ShowContractEdit.value = false;
 ShowCustomerEdit.value = false;
}
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>
<template>
        <div class="d-flex flex-column w-100 justify-content-center align-items-center position-relative  "> 
            <Headers :Customers="customer"  :AddHandler="ShowCustomerEditHandler" :Show="ShowCustomerEdit" :invoiceNumber="invoiceNumber"   :v-model="Type"/>
            <span class="my-5"></span>
            <div class="w-100  flex  h-75 px-2">
                <div v-for="con in Contract" class="invoice-box mb-5 h-100">
                    <ContractDetails :ContractId="con.Id"  :InvoiceAdd="ShowInvoiceAddHandler"  :Contract="con" :Items="item" :AddHandler="ShowContractEditHandler" :v-model="Type"/>
                    <InvoiceDetails   :ContractId="con.Id"   :AddHandler="ShowInvoiceEditHandler" :v-model="Type"/>
                </div>
            </div>
            <div>
                <EditeCusromer :ContractId="customerId" :AddHandler="ShowCustomerEditHandler" :showadditional="ShowCustomerEdit"/>
                <InvoiceAdd  :ContractId="ContractId"  :AddHandler="ShowInvoiceAddHandler" :showadditional="ShowInvoiceAdd"/>
                <EditeContract :ContractId="ContractId" :AddHandler="ShowContractEditHandler" :showadditional="ShowContractEdit"/>
         
            </div>
        </div>
    </template>
<style scoped>
span {
    width: 90%;
    height: 2px;
    background-color: #aaa; /* لون أفتح */
    margin: 20px auto;
}

.contract{
    height: auto;
    overflow-y: scroll;
    border: 1px solid black;
 
}
.invoice-box{
    width: 100%;
    display: flex;

}
@media (max-width: 1024px) {
    .invoice-box {
        flex-direction: column; /* ✅ جعل التخطيط عموديًا بدلاً من أفقي */
        align-items: center;
        
    }

    .contract, .InvoiceDetails {
        width: 100% !important;
        height: auto;
        margin-bottom: 20px;
    }

    .invoicebox {
        width: 100%;
        height: 200px;
    }

    .number-container {
        font-size: 24px; /* ✅ تصغير الرقم داخل الفاتورة على الشاشات الصغيرة */
    }
 
}
.InvoiceDetails, .contract {
    /* background-color: #f8f9fa; */
    padding: 15px;
    /* border-radius: 5px; */
    border: 1px solid #ddd;
}
 
.product{
    height: 190px;
 
}
.hidden{
 width: 100%;
 height: 100%;
 position: absolute;
 top: 0;
 right: 0;
 background-color: rgba(0,0,0,0.5);

}
</style>
