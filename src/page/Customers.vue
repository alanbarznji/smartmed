<script setup>
import { ref, computed, onUnmounted, onMounted } from "vue";
import { userTableAuth } from "../store/User.js";
import { customerTable } from "../store/Customer.js";
import HomeHeader from "../components/Customer/HomeHeader.vue";
import HomeShow from "../components/Customer/HomeShow.vue";

const customerStore = customerTable(); // Access Pinia store

const username = ref("");
const password = ref("");
const role = ref("User"); // ✅ Default role is "User"
const editingUserId = ref(null);
const editUsername = ref("");
const editPassword = ref("");
const editRole = ref("User"); // ✅ Default role for editing

// ✅ Create User
const addUser = () => {
    const success = userTableAuths.create(username.value, password.value, role.value);
    if (success[0]) {
        username.value = "";
        password.value = "";
        role.value = "User"; // Reset role after creating a user
    } else {
        alert("Username already exists! Try another one.");
    }
};

// ✅ Delete User
const removeUser = (id) => {
    userTableAuths.delete(id);
};

// ✅ Open Edit Form
const openEdit = (user) => {
    editingUserId.value = user.userId;
    editUsername.value = user.username;
    editPassword.value = user.password;
    editRole.value = user.role; // ✅ Get role for editing
};

// ✅ Update User
const updateUser = () => {
    if (!editingUserId.value) return;
    userTableAuths.updateuser(editingUserId.value, editUsername.value, editPassword.value, editRole.value);
    editingUserId.value = null;
};

// ✅ Get All Users
 
 
const quantity=ref('')
const note=ref('')
const showadditional=ref(false)
const CustomerTable=customerTable()
  
 
const AddHandler=()=>{
    showadditional.value=!showadditional.value
}

const InsertCustomer=(customerData)=>{
    CustomerTable.create(customerData)
}
const customer = computed(() =>customerStore.get());
const checkScreenSize = () => {
    showadditional.value=false
};
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
console.log('====================================');
console.log(customer.value);
console.log('====================================');
const searchText = ref("");  

// Computed property to filter customers
const filteredCustomers = computed(() => {
    if (!searchText.value.trim()) return customerStore.get();  
    return customerStore.get().filter(customer => 
        customer.name.toLowerCase().includes(searchText.value.toLowerCase())
    );
});
</script>

<template>
   

    <!-- header -->
    <HomeHeader :InsertHandle="InsertCustomer" :AddHandler="AddHandler" :showadditional="showadditional" :v-model="searchText"  />
    <HomeShow :Customer="customer"/>
   
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-container {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f8f9fa;
}
 
</style>
