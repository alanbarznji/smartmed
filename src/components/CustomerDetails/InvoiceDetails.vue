<script setup>
import { computed, ref } from 'vue';
import { InvoiceTable } from '../../store/Invoice';

const props = defineProps({
    AddHandler: Function,
    ContractId: Number
});

const InvoiceStore = InvoiceTable();
const Invoice = computed(() => InvoiceStore.getBy(props.ContractId));
const Total = computed(() => {
    return Invoice.value.reduce((sum, e) => sum + (e.state === "done" ? Number(e.payed) : 0), 0);
});
 
 
const toggleState = (invoiceId, state) => {
    const newState = state === "done" ? "undone" : "done";
    InvoiceStore.getandupdate(invoiceId, newState);
};

const editingInvoiceId = ref(null);
const tempPayed = ref(null);

const startEditing = (invoice) => {
    if(!invoice.freetrial){

        editingInvoiceId.value = invoice.Id;
        tempPayed.value = invoice.payed;
    }
};

const savePayed = (invoice) => {
    if (tempPayed.value !== null && !isNaN(tempPayed.value) && tempPayed.value >= 0) {
        InvoiceStore.getandupdatpayed(invoice.Id, Number(tempPayed.value));
        invoice.payed = Number(tempPayed.value);
    }
    editingInvoiceId.value = null;
 
};
</script>

<template>
    <div class="invoice-dashboard">
        <h3 class="dashboard-title">Contract Management</h3>
        
        <div class="invoice-list">
            <div v-for="(invoice, index) in Invoice" :key="invoice.Id" class="invoice-card">
                <div class="card-header">
                    <div class="invoice-meta">
                        <h4 class="invoice-number">#{{ index + 1 }}</h4>
                        <div class="status-badge" :class="invoice.state">
                            {{ invoice.state === 'done' ? 'Paid' : 'Pending' }}
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button @click="toggleState(invoice.Id, invoice.state)" 
                                class="toggle-btn" 
                                :class="{ active: invoice.state === 'done' }">
                            <i class="pi" :class="invoice.state === 'done' ? 'pi-check-circle' : 'pi-times-circle'"></i>
                        </button>
                    </div>
                </div>

                <div class="card-body">
                    <div class="detail-row">
                        <div class="detail-item">
                            <i class="pi pi-calendar"></i>
                            <span>{{ invoice.startdate }}</span>
                        </div>
                        <div class="detail-item">
                            <i class="pi pi-dollar"></i>
                            <span>Total: {{ Total }} IQD</span>
                        </div>
                    </div>

                    <div class="payment-section">
                        <div class="label">Payment Status</div>
                        <div class="payment-control">
                            <span v-if="editingInvoiceId !== invoice.Id" 
                                  @click="startEditing(invoice)"
                                  class="payed-display">

                                {{ invoice.payed }} IQD
                            </span>
                            <input v-else
                                   v-model="tempPayed"
                                   @blur="savePayed(invoice)"
                                   @keyup.enter="savePayed(invoice)"
                                   type="number"
                                   class="payed-input"
                                   min="0"
                                   step="0.01">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.invoice-dashboard {
    background: linear-gradient(145deg, #ffffff, #f0f4f8);
    border-radius: 18px;
    padding: 2rem;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    max-height: 800px;
    overflow-y: auto;
    width: 100%;
}

.dashboard-title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
    position: relative;
}

.dashboard-title::after {
    content: '';
    position: absolute;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
}

.invoice-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.invoice-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
    overflow: hidden;
    position: relative;
}

.invoice-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #6a11cb1a, #2575fc1a);
}

.invoice-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.invoice-number {
    font-size: 1.25rem;
    color: #34495e;
    margin: 0;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
}

.status-badge.done {
    background: #4cd137;
    color: white;
}

.status-badge.undone {
    background: #ff4757;
    color: white;
}

.toggle-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #34495e;
    transition: 0.3s ease;
    padding: 0;
}

.toggle-btn.active {
    color: #4cd137;
}

.card-body {
    padding: 1.5rem;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #7f8c8d;
    font-size: 0.9rem;
}

.detail-item i {
    font-size: 1.2rem;
}

.payment-section {
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #eee;
}

.label {
    font-weight: 600;
    color: #34495e;
    margin-bottom: 0.5rem;
    display: block;
}

.payed-display {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: 0.3s ease;
}

.payed-display:hover {
    background: #6a11cb1a;
}

.payed-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    margin-top: 0.5rem;
    transition: 0.3s ease;
}

.payed-input:focus {
    outline: none;
    border-color: #6a11cb;
    box-shadow: 0 0 0 2px #6a11cb33;
}

@media (max-width: 768px) {
    .invoice-list {
        grid-template-columns: 1fr;
    }
    
    .dashboard-title {
        font-size: 1.5rem;
    }
    
    .invoice-card {
        max-width: 100%;
    }
}
</style>