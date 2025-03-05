
<script setup>

import { ref, watch } from 'vue';
import { customerTable } from '../../store/Customer';
import { useRouter } from 'vue-router';

 
const p=defineProps({
  invoiceNumber: Number,
  AddHandler: Function,
  DeleteHandler: Function,
  Show: Boolean,
  Customers: Object
});
const router = useRouter();
const customerStore=customerTable()
const DeleteHandler =()=>{
customerStore.delete(p.Customers.Id)
router.push('/customers'); 
}
const autoInvoiceEnabled = ref(p.Customers.freetrial);
console.log(autoInvoiceEnabled.value) 

 

 
watch(autoInvoiceEnabled, (newValue) => {
 
  customerStore.getandupdatfreetrial(p.Customers.Id,autoInvoiceEnabled.value)
});
</script>

<template>
  <div class="container">
 
    <div class="customer-section">
      <div class="customer-header">
        <h2>{{ Customers?.username || "No Name" }}</h2>
        <label class="toggle-container">
          <input type="checkbox"   v-model="autoInvoiceEnabled" />
          <span class="toggle-slider"></span>
          <span class="toggle-label">FreeTrial</span>
        </label>
      </div>
      
      <div class="details-grid">
        <div class="detail-item">
          <div class="detail-label">Address</div>
          <div class="detail-value">{{ Customers?.address || "N/A" }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Created By</div>
          <div class="detail-value">{{ Customers?.createdby || "N/A" }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Start Date</div>
          <div class="detail-value">{{ Customers?.startdate || "N/A" }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Phone</div>
          <div class="detail-value">{{ Customers?.phone || "N/A" }}</div>
        </div>
      </div>
      
      <div class="note-section">
        <div class="detail-label">Note</div>
        <div class="note-content">{{ Customers?.note || "No Notes" }}</div>
      </div>
      
      <div class="button-group">
        <button @click="()=>AddHandler(Customers)" class="edit-btn">
          <span class="btn-icon">✏️</span>
          Edit
        </button>
        <button @click="DeleteHandler" class="delete-btn">
          <span class="btn-icon">🗑️</span>
          Delete
        </button>
      </div>
    </div>
    
 
    <div class="invoice-section">
      <div class="invoice-circle">
        <div class="invoice-inner">
          <div class="invoice-label">INVOICE</div>
          <div class="invoice-number">#{{ invoiceNumber }}</div>
          <div class="invoice-status">Active</div>
        </div>
        
        <div class="orbit">
          <div class="blue-circle"></div>
        </div>
        
        <div class="pulse-ring"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
 
.container {
  display: flex;
  gap: 24px;
  padding: 24px;
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

 
.customer-section {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.customer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.tag {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  background-color: #e2e8f0;
  color: #4a5568;
}

.tag-active {
  background-color: #ebf8ff;
  color: #3182ce;
}

 
.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #718096;
  font-weight: 600;
}

.detail-value {
  font-size: 16px;
  color: #4a5568;
}
 
.note-section {
  margin-top: 8px;
  padding: 12px;
  background-color: #fffaf0;
  border-left: 3px solid #ed8936;
  border-radius: 4px;
}

.note-content {
  margin-top: 4px;
  font-size: 15px;
  color: #4a5568;
  line-height: 1.5;
}
 
.button-group {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
}

.edit-btn {
  background-color: #3182ce;
  color: white;
}

.edit-btn:hover {
  background-color: #2c5282;
  transform: translateY(-2px);
}

.delete-btn {
  background-color: #fff;
  color: #e53e3e;
  border: 1px solid #e53e3e;
}

.delete-btn:hover {
  background-color: #e53e3e;
  color: white;
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 14px;
}

 
.invoice-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.invoice-circle {
  width: 180px;
  height: 180px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.invoice-inner {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(145deg, #ffffff, #f0f4f8);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.invoice-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #718096;
  margin-bottom: 4px;
}

.invoice-number {
  font-size: 24px;
  font-weight: 800;
  color: #2d3748;
}

.invoice-status {
  margin-top: 6px;
  font-size: 14px;
  color: #38a169;
  font-weight: 600;
}

 
.orbit {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: rotate 6s linear infinite;
  z-index: 5;
}

.blue-circle {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #4299e1, #3182ce);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  box-shadow: 0 0 10px rgba(49, 130, 206, 0.6);
}

/* Pulse Effect */
.pulse-ring {
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 2px solid rgba(66, 153, 225, 0.3);
  animation: pulse 2s infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 1;
  }
  70% {
    transform: scale(1.05);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.95);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 900px) {
  .container {
    flex-direction: column;
  }
  
  .invoice-section {
    margin-top: 24px;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .customer-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .tag {
    align-self: flex-start;
  }
  
  .button-group {
    flex-direction: column;
    width: 100%;
  }
  
  button {
    width: 100%;
    justify-content: center;
  }
}
.toggle-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.toggle-slider {
  position: relative;
  width: 40px;
  height: 20px;
  background-color: #e2e8f0;
  border-radius: 20px;
  transition: 0.3s;
}

.toggle-slider:before {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}
input[type="checkbox"] {
  opacity: 0;
  width: 0;
  height: 0;
}

input[type="checkbox"]:checked + .toggle-slider {
  background-color: #3182ce;
}

input[type="checkbox"]:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.toggle-label {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
}
</style>
 