<script setup>
 
 
defineProps({
    modelValue:{
        type: String,
 
    },
    Type:{
        type: String,
        default: ''
    },
    Label:{
        type: String,
        default: 'text'
    }
})

</script>
<template>
                    <div class="input-group">
                        <input class="text-black" :type="Type" :name="Label" :id="Label" placeholder=""
                            required @input="$emit('update:modelValue', $event.target.value)">
                        <label :for="Label">{{ Label }}</label>
                    </div>
</template>
<style scoped>

.input-group {
    position: relative;
}
input {
    padding: 10px 0;
    width: 100%;
    border: none;
    border-bottom: #ccc 2px solid;
    background-color: transparent;
    color: #007bff;
    transition: all 0.3s ease;
 
}

input:focus {
    outline: none;
    border-bottom: #0056b3 2px solid;
}

label {
    position: absolute;
    top: 10px;
    left: 0;
    font-size: 16px;
    color: #888;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
}

.input-group input:focus~label,
.input-group input:not(:placeholder-shown)~label {
    top: -10px;
    font-size: 14px;
    color: #007bff;
}
input[type="date"] {
    display: inline-block;
}
::-webkit-calendar-picker-indicator {
    filter: invert(1);
}
</style>