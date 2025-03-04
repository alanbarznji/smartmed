
<script setup>
import {defineProps } from 'vue'
defineProps({
  type:{
        type: String,
        default: ''
    },
    message:{
        type: String,
        default: ''
    },
    show: {
        type: String,
        default: false
    }
})
 
</script>
<template >
      <div class="alert" :class="type === 'success' ? 'alert-success' : 'alert-danger'" v-if="type.length>0">
        {{ message }}
      </div>
 

 
</template>

<style scoped>
  .alert {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>