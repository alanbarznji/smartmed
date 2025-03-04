<script setup>
import { ref, computed } from "vue";
import { userTableAuth } from "../store/User.js";
import { customerTable } from "../store/Customer.js";
import ContractHeader from "../components/Contract/ContractHeader.vue";
import ContractShow from "../components/Contract/ContractShow.vue";

const customerStore = customerTable(); // Access Pinia store
const username = ref("");
const password = ref("");
const role = ref("User"); // Default role is "User"
const editingUserId = ref(null);
const editUsername = ref("");
const editPassword = ref("");
const editRole = ref("User"); // Default role for editing

// Create User
const addUser = () => {
  const success = userTableAuths.createuser(username.value, password.value, role.value);
  if (success[0]) {
    username.value = "";
    password.value = "";
    role.value = "User"; // Reset role after creating a user
  } else {
    alert("Username already exists! Try another one.");
  }
};

// Delete User
const removeUser = (id) => {
  userTableAuths.deleteuser(id);
};

// Open Edit Form
const openEdit = (user) => {
  editingUserId.value = user.userId;
  editUsername.value = user.username;
  editPassword.value = user.password;
  editRole.value = user.role; // Get role for editing
};

// Update User
const updateUser = () => {
  if (!editingUserId.value) return;
  userTableAuths.updateuser(
    editingUserId.value,
    editUsername.value,
    editPassword.value,
    editRole.value
  );
  editingUserId.value = null;
};

// Product management
const name = ref("");
const price = ref("");
const quantity = ref("");
const note = ref("");
const showadditional = ref(false);
const useItemsTable = customerTable();
const searchText = ref("");

const InsertProduct = () => {
  const items = useItemsTable.create(
    name.value,
    price.value,
    quantity.value,
    note.value
  );
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
    <!-- Main header -->
    <header class="app-header">
      <h1 class="app-title">Contract Management System</h1>
    </header>

    <div class="content-wrapper">
      <!-- Contract Header with improved layout -->
      <ContractHeader
        :Customer="customer"
        :InsertHandle="InsertProduct"
        :AddHandler="AddHandler"
        :showadditional="showadditional"
        v-model="searchText"
      />

      <!-- Uncomment to show contract details -->
      <!-- <ContractShow :Customer="customer" /> -->

      <!-- User Management Section -->
      <section v-if="false" class="user-management-section">
        <h2 class="section-title">User Management</h2>
        
        <!-- Add User Form -->
        <div class="card">
          <h3 class="card-title">Add New User</h3>
          <div class="form-container">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                id="username"
                v-model="username"
                type="text"
                class="form-input"
                placeholder="Enter username"
              />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-input"
                placeholder="Enter password"
              />
            </div>
            
            <div class="form-group">
              <label for="role">Role</label>
              <select id="role" v-model="role" class="form-select">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            
            <button @click="addUser" class="btn btn-primary">Add User</button>
          </div>
        </div>

        <!-- Edit User Form (conditionally shown) -->
        <div v-if="editingUserId" class="card edit-container">
          <h3 class="card-title">Edit User</h3>
          <div class="form-container">
            <div class="form-group">
              <label for="edit-username">Username</label>
              <input
                id="edit-username"
                v-model="editUsername"
                type="text"
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="edit-password">Password</label>
              <input
                id="edit-password"
                v-model="editPassword"
                type="password"
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="edit-role">Role</label>
              <select id="edit-role" v-model="editRole" class="form-select">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            
            <div class="button-group">
              <button @click="updateUser" class="btn btn-success">Update</button>
              <button @click="editingUserId = null" class="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Product Quick Add (if needed) -->
    <div v-if="showadditional" class="quick-add-panel">
      <div class="card">
        <h3 class="card-title">Add New Product</h3>
        <div class="form-container">
          <div class="form-group">
            <label for="product-name">Name</label>
            <input
              id="product-name"
              v-model="name"
              type="text"
              class="form-input"
              placeholder="Product name"
            />
          </div>
          
          <div class="form-group">
            <label for="product-price">Price</label>
            <input
              id="product-price"
              v-model="price"
              type="number"
              class="form-input"
              placeholder="Price"
            />
          </div>
          
          <div class="form-group">
            <label for="product-quantity">Quantity</label>
            <input
              id="product-quantity"
              v-model="quantity"
              type="number"
              class="form-input"
              placeholder="Quantity"
            />
          </div>
          
          <div class="form-group">
            <label for="product-note">Note</label>
            <textarea
              id="product-note"
              v-model="note"
              class="form-textarea"
              placeholder="Additional notes"
            ></textarea>
          </div>
          
          <button @click="InsertProduct" class="btn btn-primary">
            Add Product
          </button>
        </div>
      </div>
    </div>

    <footer class="app-footer">
      <p>&copy; 2025 Contract Management System</p>
    </footer>
  </div>
</template>

<style scoped>
/* Main Layout */
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

/* Header */
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

/* Cards */
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-title {
  margin-top: 0;
  margin-bottom: 15px;
  color: #3a3a3a;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

/* Section Styles */
.section-title {
  font-size: 20px;
  color: #3a3a3a;
  margin-bottom: 15px;
  font-weight: 600;
}

.user-management-section {
  margin-top: 30px;
}

/* Form Elements */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #4a6fdc;
  box-shadow: 0 0 0 2px rgba(74, 111, 220, 0.2);
  outline: none;
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
}

/* Buttons */
.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(1px);
}

.btn-primary {
  background-color: #4a6fdc;
  color: white;
}

.btn-primary:hover {
  background-color: #3d5fc9;
}

.btn-success {
  background-color: #2ecc71;
  color: white;
}

.btn-success:hover {
  background-color: #27ae60;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.button-group {
  display: flex;
  gap: 10px;
}

/* Edit Container */
.edit-container {
  background-color: #f8f9fa;
  border-left: 4px solid #4a6fdc;
}

/* Quick Add Panel */
.quick-add-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  z-index: 100;
}

/* Footer */
.app-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  color: #7f8c8d;
  font-size: 14px;
}

/* Responsive adjustments */

@media (max-width: 1580px) {
  .app-container {
max-width: 80%;
  }
 
@media (max-width: 1024px) {
    .app-container {
        padding: 15px;
        max-width: 100%;
    }
    
    .quick-add-panel {
        position: static;
        width: 100%;
    }
}
 
}
</style>