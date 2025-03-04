<script setup>
import { defineStore } from "pinia";
import { ref, onMounted, computed } from 'vue';
import { userTableAuth } from '../store/User.js'; // Import your user store
import { contractsTable } from "../store/Contracts.js";
import Alert from '../Util/Alert.vue';
// Define a new store for contracts



    // User store
    const userStore = userTableAuth();
    // Contract store
  
    
    // User state
    const users = ref([]);
    const username = ref('');
    const password = ref('');
    const role = ref('user');
    const editMode = ref(false);
    const currentUserId = ref(null);
    const notification = ref({ show: false, message: '', type: '' });
    const selectedUser = ref(null);
    
    // Contract state
    const userContracts = ref([]);
    const newContract = ref({
      title: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      status: 'active'
    });

    // Load users on component mount
    onMounted(() => {
      loadUsers();
    });

    // Function to load users
    const loadUsers = () => {
      users.value = userStore.getuser();
    };
const contractStore = contractsTable()
    // Handle form submission for user
    const handleSubmit = () => {
      if (editMode.value) {
        // Update existing user
        const [success, message] = userStore.updateuser(
          currentUserId.value, 
          username.value, 
          password.value
        );
        
        if (success) {
          showNotification('User updated successfully!', 'success');
          resetForm();
          loadUsers();
        } else {
          showNotification(`Failed: ${message}`, 'error');
        }
      } else {
        // Create new user
        const [success, message] = userStore.createuser(
          username.value, 
          password.value, 
          role.value
        );
        
        if (success) {
          showNotification('User created successfully!', 'success');
          resetForm();
          loadUsers();
        } else {
          showNotification(`Failed: ${message}`, 'error');
        }
      }
    };

    // Function to handle user delete
    const handleDelete = (id) => {
      if (confirm('Are you sure you want to delete this user?')) {
        const [success, message] = userStore.deleteuser(id);
        
        if (success) {
          showNotification('User deleted successfully!', 'success');
          loadUsers();
          // If the deleted user is the selected user, clear selection
          if (selectedUser.value && selectedUser.value.userId === id) {
            selectedUser.value = null;
          }
        } else {
          showNotification(`Failed: ${message}`, 'error');
        }
      }
    };

    // Function to initialize edit mode
    const handleEdit = (user) => {
      editMode.value = true;
      currentUserId.value = user.userId;
      username.value = user.username;
      password.value = ''; // Don't populate password for security
      role.value = user.role || 'user';
    };

    // Reset user form
    const resetForm = () => {
      username.value = '';
      password.value = '';
      role.value = 'user';
      editMode.value = false;
      currentUserId.value = null;
    };

    // View user contracts
    const viewUserContracts = (user) => {
      selectedUser.value = user;
      userContracts.value = contractStore.getByUser(user);
    };

    // Add contract for selected user
    const addContract = () => {
      if (!selectedUser.value) return;
      
      const [success, message] = contractStore.addContract(
        selectedUser.value.userId,
        {
          title: newContract.value.title,
          amount: parseFloat(newContract.value.amount),
          date: newContract.value.date,
          status: newContract.value.status
        }
      );
      
      if (success) {
        showNotification('Contract added successfully!', 'success');
        // Refresh contracts list
        userContracts.value = contractStore.getContractsByUserId(selectedUser.value.userId);
        // Reset contract form
        newContract.value = {
          title: '',
          amount: 0,
          date: new Date().toISOString().split('T')[0],
          status: 'active'
        };
      } else {
        showNotification(`Failed: ${message}`, 'error');
      }
    };

    // Delete contract
    const deleteContract = (id) => {
      if (confirm('Are you sure you want to delete this contract?')) {
        const [success, message] = contractStore.deleteContract(id);
        
        if (success) {
          showNotification('Contract deleted successfully!', 'success');
          // Refresh contracts list
          if (selectedUser.value) {
            userContracts.value = contractStore.getContractsByUserId(selectedUser.value.userId);
          }
        } else {
          showNotification(`Failed: ${message}`, 'error');
        }
      }
    };

    // Format date for display
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };
    
 
 
    // Show notification and auto-hide after delay
    const showNotification = (message, type) => {
      notification.value = { show: true, message, type };
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        notification.value.show = false;
      }, 3000);
    };

  
</script>
<template>
    <div class="container mt-4">
      <!-- Notification Alert -->
<Alert />
  
      <h1 class="mb-4">User Management Dashboard</h1>
      
      <div class="row">
        <!-- User Form -->
        <div class="col-md-4 mb-4">
          <div class="card mb-4">
            <div class="card-header">
              <h2 class="h5 mb-0">{{ editMode ? 'Edit User' : 'Create New User' }}</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input 
                    type="text" 
                    id="username"
                    class="form-control" 
                    v-model="username" 
                    required
                  />
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    id="password"
                    class="form-control" 
                    v-model="password" 
                    :required="!editMode"
                    :placeholder="editMode ? 'Leave empty to keep current' : ''"
                  />
                </div>
                
                <div class="mb-3" v-if="!editMode">
                  <label for="role" class="form-label">Role</label>
                  <select id="role" class="form-select" v-model="role">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>
                
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary">
                    {{ editMode ? 'Update User' : 'Create User' }}
                  </button>
                  
                  <button type="button" class="btn btn-secondary" v-if="editMode" @click="resetForm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
  
          <!-- Contract Form (appears when a user is selected) -->
       
        </div>
        
        <!-- User Table and Contract Details -->
        <div class="col-md-8">
          <!-- User List -->
          <div class="card mb-4">
            <div class="card-header">
              <h2 class="h5 mb-0">User List</h2>
            </div>
            <div class="card-body">
              <p class="text-muted" v-if="users.length === 0">No users found. Create one to get started.</p>
              
              <div class="table-responsive" v-else>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Role</th>
                      <th class="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.userId" 
                        :class="{'table-active': selectedUser && selectedUser.userId === user.userId}"
                        @click="viewUserContracts(user.username)">
                      <td>{{ user.userId }}</td>
                      <td>{{ user.username }}</td>
                      <td>{{ user.role || 'user' }}</td>
                      <td class="text-end">
                        <button @click.stop="handleEdit(user)" class="btn btn-sm btn-outline-primary me-2">
                          Edit
                        </button>
                        <button @click.stop="handleDelete(user.userId)" class="btn btn-sm btn-outline-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- User Contracts -->
          <div class="card" v-if="selectedUser">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h2 class="h5 mb-0">Contracts for {{ selectedUser.username }}</h2>
              <button class="btn btn-sm btn-outline-secondary" @click="selectedUser = null">Close</button>
            </div>
            <div class="card-body">
              <p class="text-muted" v-if="userContracts.length === 0">No contracts found for this user.</p>
              
              <div class="table-responsive" v-else>
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>note</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th class="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="contract in userContracts" :key="contract.id">
                      <td>{{ contract.Id }}</td>
                      <td>{{ contract.note }}</td>
                      <td>{{ formatDate(contract.startdate) }}</td>
                      <td>{{ contract.payment }}</td>
    
                      <td class="text-end">
                        <button @click="deleteContract(contract.id)" class="btn btn-sm btn-outline-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <style>
  .alert {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050;
    min-width: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .card-header {
    background-color: #f8f9fa;
  }
  
  .btn-outline-primary:hover, .btn-primary {
    background-color: #0d6efd;
    color: white;
  }
  
  .btn-outline-danger:hover {
    background-color: #dc3545;
    color: white;
  }
  
  .table-active {
    background-color: rgba(0, 123, 255, 0.1) !important;
  }
  
  .table tbody tr {
    cursor: pointer;
  }
  </style>