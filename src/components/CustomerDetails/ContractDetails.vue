<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { InvoiceTable } from '../../store/Invoice';
import { contractsTable } from '../../store/Contracts';
import { useRouter } from 'vue-router';

const p = defineProps({
  Items: Array,
  AddHandler: Function,
  InvoiceAdd: Function,
  Contract: Object,
  ShowModalHandler: Function,  
  ContractId:String 
});

 
const InvoiceStore = InvoiceTable();
const Invoice = computed(() => InvoiceStore.getBy(p.Contract.Id));
 
const ContractStore = contractsTable();
 
const autoInvoiceEnabled = ref(p.Contract.auto);
console.log(autoInvoiceEnabled.value) 

 
watch(autoInvoiceEnabled, (newValue) => {
  console.log(autoInvoiceEnabled.value);
  ContractStore.getandupdatauto(p.ContractId,autoInvoiceEnabled.value)
});
 
const totalInvoiceAmount = computed(() => {
  let total = 0;
  if (Invoice.value) {
    Invoice.value.forEach(invoice => {
      invoice.items.forEach(item => {
        total += item.price * item.quantity;
      });
    });
  }
  return total.toFixed(2);
});

const handleDelete = ()=>{

  ContractStore.delete(p.ContractId)
  
}


const invoiceCount = computed(() => Invoice.value ? Invoice.value.length : 0);
</script>

<template>
  <div class="contract-dashboard">
 
    <div class="dashboard-header">
      <div class="title-section">
        <h3>Contract Management</h3>
        <div class="contract-badge">ID: {{ Contract.Id }}</div>
      </div>
      
      <div class="actions-section">
 
        <label class="toggle-container">
          <input type="checkbox"   v-model="autoInvoiceEnabled" />
          <span class="toggle-slider"></span>
          <span class="toggle-label">Auto-Invoice</span>
        </label>

        <div class="btn-group">
          <button @click="() => AddHandler(ContractId)" class="btn btn-edit">
            <i class="pi pi-pen-to-square"></i>
            <span>Edit</span>
          </button>
          <button v-if="!autoInvoiceEnabled" @click="() => InvoiceAdd(Contract.Id)" class="btn btn-add">
            <i class="pi pi-plus"></i>
            <span>Add Invoice</span>
          </button>
        </div>
      </div>
    </div>

 
    <div class="summary-cards">
      <div class="summary-card">
        <div class="card-icon payment-icon">💰</div>
        <div class="card-info">
          <div class="card-label">Monthly Payment</div>
          <div class="card-value">${{ Contract.monthlypayment }}</div>
        </div>
      </div>
      
      <div class="summary-card">
        <div class="card-icon contract-icon">📄</div>
        <div class="card-info">
          <div class="card-label">Total Contract Value</div>
          <div class="card-value">${{ Contract.payment }}</div>
        </div>
      </div>
      
      <div class="summary-card">
        <div class="card-icon invoice-icon">🧾</div>
        <div class="card-info">
          <div class="card-label">Invoiced Amount</div>
          <div class="card-value">${{ totalInvoiceAmount }}</div>
        </div>
      </div>
      
      <div class="summary-card">
        <div class="card-icon date-icon">📅</div>
        <div class="card-info">
          <div class="card-label">Contract Period</div>
          <div class="card-value">{{ Contract.startdate }} to {{ Contract.expiredate }}</div>
        </div>
      </div>
    </div>

 
    <div class="details-section">
      <div class="section-header">
        <h4>Contract Details</h4>
        <div class="section-divider"></div>
      </div>
      
      <div class="note-container">
        <div class="note-label">Note</div>
        <div class="note-content">{{ Contract.note || "No notes available for this contract." }}</div>
      </div>
    </div>
    <button @click.stop="handleDelete" class="btn btn-sm btn-primary btn-outline-danger my-2 border-black">
                          Delete
                        </button>
 
    <div class="invoice-section">
      <div class="section-header">
        <h4>Invoices ({{ invoiceCount }})</h4>
        <div class="section-divider"></div>
      </div>
      
      <div class="table-container">
        <table class="invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="Invoice && Invoice.length > 0">
              <template v-for="(invoice, index) in Invoice" :key="invoice.Id">
                <tr v-for="(item, itemIndex) in invoice.items" :key="itemIndex" class="invoice-row">
                  <td class="invoice-number">{{ index + 1 }}</td>
                  <td>{{ invoice.startdate }}</td>
                  <td class="item-name">{{ item.name }}</td>
                  <td class="price">${{ item.price }}</td>
                  <td class="quantity">{{ item.quantity }}</td>
                  <td class="subtotal">${{ (item.price * item.quantity).toFixed(2) }}</td>
                </tr>
              </template>
            </template>
            <tr v-else>
              <td colspan="6" class="empty-state">No invoices found for this contract</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
 
.contract-dashboard {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

 
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

h3 {
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.contract-badge {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  color: #718096;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.actions-section {
  display: flex;
  align-items: center;
  gap: 16px;
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
 
.btn-group {
  display: flex;
  gap: 10px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn i {
  font-size: 16px;
}

.btn-edit {
  background-color: #edf2f7;
  color: #4a5568;
}

.btn-edit:hover {
  background-color: #e2e8f0;
}

.btn-add {
  background-color: #3182ce;
  color: white;
}

.btn-add:hover {
  background-color: #2c5282;
}
 
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.summary-card {
  background: #f7fafc;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.payment-icon {
  background-color: #ebf8ff;
  color: #3182ce;
}

.contract-icon {
  background-color: #e9f5e9;
  color: #38a169;
}

.invoice-icon {
  background-color: #fef5e7;
  color: #d69e2e;
}

.date-icon {
  background-color: #ede9fe;
  color: #6b46c1;
}

.card-info {
  flex: 1;
}

.card-label {
  font-size: 12px;
  color: #718096;
  font-weight: 600;
  margin-bottom: 4px;
}

.card-value {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
}
 
.details-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-header h4 {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.section-divider {
  flex: 1;
  height: 1px;
  background-color: #e2e8f0;
}

.note-container {
  background-color: #fefcf7;
  border-left: 3px solid #f6ad55;
  padding: 16px;
  border-radius: 6px;
}

.note-label {
  font-size: 14px;
  font-weight: 600;
  color: #dd6b20;
  margin-bottom: 8px;
}

.note-content {
  font-size: 15px;
  color: #4a5568;
  line-height: 1.5;
}
 
.invoice-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.invoice-table th {
  background-color: #f7fafc;
  color: #4a5568;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.invoice-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
  color: #4a5568;
}

.invoice-row:hover {
  background-color: #f7fafc;
}

.invoice-number {
  font-weight: 600;
  color: #3182ce;
}

.item-name {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price, .quantity {
  text-align: center;
}

.subtotal {
  font-weight: 600;
  text-align: right;
}

.empty-state {
  text-align: center;
  color: #a0aec0;
  padding: 32px;
  font-style: italic;
}
 
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .actions-section {
    width: 100%;
    justify-content: space-between;
  }
  
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .summary-cards {
    grid-template-columns: 1fr;
  }
  
  .btn-group {
    flex-direction: column;
    width: 100%;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .actions-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .toggle-container {
    width: 100%;
    justify-content: space-between;
  }
}
</style>