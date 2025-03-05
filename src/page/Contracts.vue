<script setup>
import { ref, computed } from "vue";
 
import { customerTable } from "../store/Customer.js";
import ContractHeader from "../components/Contract/ContractHeader.vue";
 

const customerStore = customerTable(); 
 
 
const name = ref("");
const price = ref("");
const quantity = ref("");
const note = ref("");
const showadditional = ref(false);
const useItemsTable = customerTable();
const searchText = ref("");

const InsertProduct = () => {
  const items = useItemsTable.create(name.value, price.value, quantity.value, note.value);
  if (items[0]) {
    name.value = "";
    price.value = "";
    quantity.value = "";
    note.value = "";
  } else {
    alert("Error in inserting product");
  }
};

const AddHandler = () => {
  showadditional.value = !showadditional.value;
};

const customer = computed(() => customerStore.get());
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">Contract Management System</h1>
    </header>

    <div class="content-wrapper">
      <ContractHeader :Customer="customer" :InsertHandle="InsertProduct" :AddHandler="AddHandler" :showadditional="showadditional" v-model="searchText"/>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.app-header {
  background: linear-gradient(135deg, #4a6fdc 0%, #6a8ae0 100%);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-title {
  color: white;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}
</style>
