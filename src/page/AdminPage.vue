<script setup>
import { defineStore } from "pinia";
import { ref, onMounted, computed } from 'vue';
import { userTableAuth } from '../store/User.js'; // Import your user store
import { contractsTable } from "../store/Contracts.js";
import Alert from '../Util/Alert.vue';
import UserAdd from "../components/admin/UserAdd.vue";
import UserShow from "../components/admin/userShow.vue";
 
 
    const userStore = userTableAuth();
 
    const users = ref([]);
    const username = ref('');
    const password = ref('');
    const role = ref('user');
    const editMode = ref(false);
    const currentUserId = ref(null);
    const notification = ref({ show: false, message: '', type: '' });
    const selectedUser = ref(null);
    
 
    const userContracts = ref([]);
    const newContract = ref({
      title: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],  
      status: 'active'
    });

 
    onMounted(() => {
      loadUsers();
    });

 
    const loadUsers = () => {
      users.value = userStore.getuser();
    };
const contractStore = contractsTable() 
    const handleSubmit = () => {
      if (editMode.value) {
 
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
 
    const handleDelete = (id) => {
      if (confirm('Are you sure you want to delete this user?')) {
        const [success, message] = userStore.deleteuser(id);
        
        if (success) {
          showNotification('User deleted successfully!', 'success');
          loadUsers();
 
          if (selectedUser.value && selectedUser.value.userId === id) {
            selectedUser.value = null;
          }
        } else {
          showNotification(`Failed: ${message}`, 'error');
        }
      }
    };

 
    const handleEdit = (user) => {
      editMode.value = true;
      currentUserId.value = user.userId;
      username.value = user.username;
      password.value = '';  
      role.value = user.role || 'user';
    };

 
    const resetForm = () => {
      username.value = '';
      password.value = '';
      role.value = 'user';
      editMode.value = false;
      currentUserId.value = null;
    };

 
    const viewUserContracts = (user) => {
      selectedUser.value = user;
      userContracts.value = contractStore.getByUser(user);
    };

 
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
       
        userContracts.value = contractStore.getContractsByUserId(selectedUser.value.userId);
 
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

 
    const deleteContract = (id) => {
      if (confirm('Are you sure you want to delete this contract?')) {
        const [success, message] = contractStore.deleteContract(id);
        
        if (success) {
          showNotification('Contract deleted successfully!', 'success');
 
          if (selectedUser.value) {
            userContracts.value = contractStore.getContractsByUserId(selectedUser.value.userId);
          }
        } else {
          showNotification(`Failed: ${message}`, 'error');
        }
      }
    };

 
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };
    
 
 
 
    const showNotification = (message, type) => {
      notification.value = { show: true, message, type };
      
 
      setTimeout(() => {
        notification.value.show = false;
      }, 3000);
    };

  
</script>
<template>
    <div class="container mt-4">
 
<Alert />
  
      <h1 class="mb-4">User Management Dashboard</h1>
      
      <div class="row">
     
        <div class="col-md-4 mb-4">
          <UserAdd :handleSubmit="handleSubmit" :editMode="editMode" :resetForm="resetForm" v-model:username="username" v-model:password="password" v-model:role="role"/>
 
 
        </div>
    
        <div class="col-md-8">
          <UserShow :users="users" :viewUserContracts="viewUserContracts" :handleEdit="handleEdit" :handleDelete="handleDelete"/>
     
          
 
           
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