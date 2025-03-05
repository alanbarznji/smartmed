<script setup>
// Keeping your original script exactly as is
import { ref, watch } from 'vue';
import Input from '../../../Util/Input.vue';
import { customerTable } from '../../../store/Customer';
import { InvoiceTable } from '../../../store/Invoice';
import Alert from '../../../Util/Alert.vue';
 
const p = defineProps({
    AddHandler: Function,
    InsertProduct: Function,
    showadditional: Boolean,
    modelValue: String,
    Type: String,
    ContractId: String,
}) 
let show = ref('');
let type = ref('');

const price=ref(0)

const startd=ref('')

const InvoiceStore=InvoiceTable()
const InsertInvoice =()=>{
   const res= InvoiceStore.create(price.value,startd.value,p.ContractId)


show.value = res[2];
type.value =res[1];
if(res[0]){
 ;
    
    setTimeout(() => { 
                show.value = ''; 
                type.value = ''
                window.location.reload();
            }, 2000);
 ;
  }

}
watch(show, (newValue) => {
    setTimeout(() => { 
                show.value = ''; 
                type.value = ''

            }, 2000);
});
</script>

<template>  
    <div @click.self="AddHandler" v-if="showadditional" class="addtion">
        <Alert :show="show" :type="type" :message="show"/>
        <div class="customer-modal">
            <div @click="AddHandler" class="close-button">
                <i class="pi pi-times"></i>
            </div>
            
            <div class="modal-header">
                <h1>Invoice</h1>
            </div>
          
 
            <div class="modal-content">
                <div class="form-container"> 
                    <div class="form-grid">
                        <div class="form-column">
                            <Input :Type="'text'" v-model="price" :Label="'price'"/>
                        </div>
                        <div class="form-column">
                            <Input :Type="'date'" v-model="startd" :Label="'Start date'"/>
                        </div>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" @click="InsertInvoice" class="submit-button">
                        <span>Update Customer</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.addtion {
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

.customer-modal {
    width: 60%;
    max-width: 900px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: modalAppear 0.3s ease-out;
}

@keyframes modalAppear {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}

.close-button {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    z-index: 5;
}

.close-button i {
    font-size: 20px;
    color: #5a5a5a;
}

.close-button:hover {
    background: rgba(234, 84, 85, 0.1);
    transform: rotate(90deg);
}

.close-button:hover i {
    color: #ea5455;
}

.modal-header {
    padding: 30px 35px 10px;
    position: relative;
}

.modal-header h1 {
    font-size: 28px;
    margin: 0;
    color: #2d3748;
    font-weight: 700;
    position: relative;
}

.modal-header h1::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    height: 4px;
    width: 60px;
    background: #4299e1;
    border-radius: 2px;
}

.modal-content {
    padding: 20px 35px 30px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.form-container {
    flex: 1;
}

.form-grid {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    margin-top: 20px;
}

.form-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
}

.submit-button {
    background: linear-gradient(45deg, #4299e1, #63b3ed);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(66, 153, 225, 0.3);
    position: relative;
    overflow: hidden;
}

.submit-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
}

.submit-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(66, 153, 225, 0.4);
}

.submit-button:hover::before {
    left: 100%;
}

.submit-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(66, 153, 225, 0.4);
}

/* Retain your specific input styling */
input {
    height: 1.5em;
    width: 1.4em;
}

label {
    font-weight: bold;
    color: green;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .customer-modal {
        width: 80%;
    }
}

@media (max-width: 768px) {
    .customer-modal {
        width: 95%;
    }
    
    .form-grid {
        flex-direction: column;
        gap: 20px;
    }
    
    .submit-button {
        width: 100%;
    }
}

@media (max-height: 800px) {
    .form-grid {
        gap: 15px;
    }
    
    .form-column {
        gap: 15px;
    }
}
</style>