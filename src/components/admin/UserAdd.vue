<script setup>
defineProps(
  {
    username: String,
    role: String,
    password: String,
    handleSubmit: Function,
    editMode: Boolean,
    resetForm: Function
  }
)
</script>
<template>
            
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
                    @input="$emit('update:username', $event.target.value)" 
                    required
                  />
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    id="password"
                    class="form-control" 
                    @input="$emit('update:password', $event.target.value)" 
                    :required="!editMode"
                    :placeholder="editMode ? 'Leave empty to keep current' : ''"
                  />
                </div>
                
                <div class="mb-3" v-if="!editMode">
                  <label for="role" class="form-label">Role</label>
                  <select id="role" class="form-select"@input="$emit('update:role', $event.target.value)" >
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
  
 
</template>
<style scoped>
</style>