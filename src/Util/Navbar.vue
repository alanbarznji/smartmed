<script setup>
 
const props = defineProps({
    isHidden: Boolean,
    path: String,
    ShowMinu: Boolean, 
})
const emit = defineEmits(['update:ShowMinu']);
const onClick = () => {
    emit('update:ShowMinu',  !props.ShowMinu); 
    
};
</script>
<template>
  <div v-if="path !== '/' || path.includes([1,2,3,4,5,6,7,8,9])" class="d-flex justify-content-between align-items-center w-100 py-2 px-5 bg-white top-0">
    <img src="../assets/image.png" width="60" alt="">
    <div>
      <div class="poi" @click="onClick">
        <i v-if="isHidden" class="pi pi-align-justify py-1" style="font-size: 24px;"></i>
      </div>
    </div>
  </div>
</template>
