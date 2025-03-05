<script setup>
import { ref, watch } from 'vue';
import Input from '../../Util/Input.vue';
import { customerTable } from '../../store/Customer';
import Alert from '../../Util/Alert.vue';

const p=defineProps({
    AddHandler: Function,
    showadditional: Boolean,
    modelValue: String
});
defineEmits(['update:modelValue']);

const customerStore = customerTable(); 
const name = ref('');
const note = ref('');
const checkfreeTrial = ref(false);
const address = ref('');
const phone = ref('');
const freetrial = ref('');
const started = ref('');
let show = ref('');
let type = ref('');

watch(checkfreeTrial, () => {
    if (!checkfreeTrial.value) {
        freetrial.value = '';
    }
});

const resetForm = () => {
    name.value = '';
    address.value = '';
    phone.value = '';
    note.value = '';
    started.value = '';
    freetrial.value = '';
    checkfreeTrial.value = false;
};

const InsertCustomer = (event) => {
    event.preventDefault();
    if (!name.value || !phone.value) {
        alert('Please fill in required fields');
        return;
    }
  const res=  customerStore.create(     
        name.value,
        address.value,
        phone.value,
        checkfreeTrial.value,
        started.value,
        freetrial.value,
        note.value,
    );
  if(res[0]){
    show.value = res[1];
    type.value =res[2];
    
    setTimeout(() => { 
                show.value = ''; 
                type.value = ''
                name.value=""
        address.value=""
        phone.value=""
        checkfreeTrial.value=""
        started.value=""
        freetrial.value=""
        note.value=""
            }, 2000);
    resetForm();
  }
     
    if (AddHandler) AddHandler();
};

watch(show, (newValue) => {
    setTimeout(() => { 
                show.value = ''; 
                type.value = ''
                show.value = ''; 
                type.value = ''
                name.value=""
        address.value=""
        phone.value=""
        checkfreeTrial.value=""
        started.value=""
        freetrial.value=""
        note.value=""
            }, 2000);
});
</script>

<template>
    <div class="position-relative">
        <Alert :type="show" :message="type"/>
        <div class="search-container d-flex justify-content-between align-items-center px-4 py-3">
            <div class="search-input-container d-flex align-items-center">
                <button  class="search-icon-button btn btn-light me-2">
              
                </button>
 
            </div>
            <button @click="AddHandler" class="add-button btn btn-primary">
                <i class="pi pi-plus me-2"></i>
                <span>Add Customer</span>
            </button>
        </div>
        <div v-if="showadditional" 
             class="modal-overlay" 
             @click.self="AddHandler">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add New Customer</h4>
                    <button @click="AddHandler" class="close-button btn btn-sm btn-light">
                        <i class="pi pi-times"></i>
                    </button>
                </div>
                
                <div  class="customer-form">
                    <div class="form-grid">
                        <div class="form-column">
                            <Input :Type="'text'" v-model="name" :Label="'Name*'" required />
                            <Input :Type="'text'" v-model="address" :Label="'Address'" />
                            <Input :Type="'date'" v-model="started" :Label="'Start date*'" required />
                        </div>
                        <div class="form-column">
                            <Input :Type="'number'" v-model="phone" :Label="'Phone*'" required />
                            <Input :Type="'text'" v-model="note" :Label="'Note'" />
                        </div>
                    </div>
                    
                    <div class="checkbox-container">
                        <input 
                            type="checkbox" 
                            id="freetrial-checkbox" 
                            v-model="checkfreeTrial"
                            class="custom-checkbox" 
                        />
                        <label for="freetrial-checkbox" class="custom-checkbox-label">
                            Enable Free Trial
                        </label>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" @click="AddHandler" class="btn btn-outline-secondary">
                            Cancel
                        </button>
                        <button @click="InsertCustomer"  type="submit" class="btn btn-primary">
                            Save Customer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
 
.search-container {
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    margin-bottom: 1rem;
}

.search-input-container {
    flex: 1;
    max-width: 500px;
}

.search-icon-button {
    border: none;
    background: transparent;
    color: #6c757d;
}

.search-input {
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    width: 100%;
    transition: all 0.3s ease;
    background-color: white;
}

.search-input.active {
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
}

.add-button {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
}

/* Modal styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(3px);
}

.modal-content {
    width: 80%;
    max-width: 800px;
    max-height: 90vh;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #dee2e6;
}

.modal-title {
    font-weight: 600;
    color: #212529;
    margin: 0;
}

.close-button {
    padding: 0.25rem 0.5rem;
    border: none;
    background: transparent;
    color: #6c757d;
    font-size: 1.25rem;
    cursor: pointer;
    transition: all 0.2s;
}

.close-button:hover {
    color: #dc3545;
}

/* Form styles */
.customer-form {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.form-column {
    flex: 1;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.checkbox-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
}

.custom-checkbox {
    height: 18px;
    width: 18px;
    cursor: pointer;
}

.custom-checkbox-label {
    font-weight: 500;
    color: #0d6efd;
    cursor: pointer;
    user-select: none;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #dee2e6;
}

/* Make the form responsive */
@media (max-width: 768px) {
    .modal-content {
        width: 95%;
    }
    
    .form-grid {
        flex-direction: column;
        gap: 1rem;
    }
    
    .form-actions {
        flex-direction: column-reverse;
        gap: 0.5rem;
    }
    
    .form-actions button {
        width: 100%;
    }
}
</style>