<script setup>
defineProps({
    users:Array,
    handleDelete:Function,
    handleEdit:Function,
    viewUserContracts:Function
})
</script>

<template>
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
</template>
<style scoped></style>