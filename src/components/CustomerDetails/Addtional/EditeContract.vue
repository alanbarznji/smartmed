<script setup>
import { ref, watch } from 'vue';
import Input from '../../../Util/Input.vue';
import { contractsTable } from '../../../store/Contracts';

const p=defineProps({
    AddHandler: Function,
    InsertProduct: Function,
    showadditional: Boolean,
    modelValue: String,
    Type: String,
    ContractId:String
});

defineEmits(['update:modelValue']);

const name = ref('');
const note = ref('');
const checkfreeTrial = ref(false);
const address = ref('');
const payment = ref('');
const monthely = ref('');
const freetrial = ref('');
const ExpireDate = ref('');


const checkHandler = () => {
    checkfreeTrial.value = !checkfreeTrial.value;
};
const contractStore=contractsTable()
watch(checkfreeTrial, () => {
    if (!checkfreeTrial.value) {
        freetrial.value = '';
    }
});

const resetForm = () => {
    name.value = '';
    address.value = '';
    payment.value = '';
    note.value = '';
    ExpireDate.value = '';
    freetrial.value = '';
    checkfreeTrial.value = false;
    monthely.value = '';
};

const InsertCustomer = (event) => {
    event.preventDefault();
    console.log(p.ContractId,ExpireDate.value,payment.value,note.value)
 const con=contractStore.update(p.ContractId,ExpireDate.value,payment.value,monthely.value,note.value)
    resetForm()
};

</script>

<template>
    <div @click.self="AddHandler" v-if="showadditional" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Contract</h2>
                <button @click="AddHandler" class="close-button">
                    <i class="pi pi-times"></i>
                </button>
            </div>
            
            <div class="invoice-form">
                <div class="form-grid">
                    <div class="form-column">
                        <Input :Type="'date'" v-model="ExpireDate" :Label="'Expire date'" />
                        <Input :Type="'text'" v-model="note" :Label="'Note'" />
                    </div>
                    <div class="form-column">
                        <Input :Type="'number'" v-model="payment" :Label="'payment'" />
                        <Input :Type="'text'" v-model="monthely" :Label="'Monthly Payment'" />
                  
                    </div>
                </div>
    
                
                <div class="form-actions">
                    <button type="button" @click="AddHandler" class="btn-cancel">
                        Cancel
                    </button>
                    <button @click="InsertCustomer"  type="submit" class="btn-submit">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    top: 0;
    left: 0;
    z-index: 1000;
}

.modal-content {
    width: 60%;
    max-width: 900px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;
    border-bottom: 1px solid #eaeaea;
    background-color: #f8f9fa;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
}

.close-button {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    color: #7a7a7a;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.close-button:hover {
    background-color: #f1f1f1;
    color: #e74c3c;
}

.invoice-form {
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.form-grid {
    display: flex;
    gap: 30px;
}

.form-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.checkbox-wrapper {
    padding: 5px 0;
}

.checkbox-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.custom-checkbox {
    appearance: none;
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    border: 2px solid #3498db;
    border-radius: 4px;
    background-color: white;
    display: inline-block;
    position: relative;
    cursor: pointer;
    outline: none;
}

.custom-checkbox:checked {
    background-color: #3498db;
}

.custom-checkbox:checked::after {
    content: '\2713';
    font-size: 14px;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.checkbox-container label {
    font-weight: 500;
    color: #3498db;
    cursor: pointer;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid #eaeaea;
}

.btn-cancel {
    padding: 10px 20px;
    background-color: #f1f2f6;
    color: #555;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-cancel:hover {
    background-color: #e4e6eb;
}

.btn-submit {
    padding: 10px 25px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-submit:hover {
    background-color: #2980b9;
}

@media (max-width: 1024px) {
    .modal-content {
        width: 85%;
    }
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
    }
    
    .form-grid {
        flex-direction: column;
        gap: 20px;
    }
    
    .form-actions {
        flex-direction: column-reverse;
    }
    
    .btn-cancel, .btn-submit {
        width: 100%;
    }
}
</style>