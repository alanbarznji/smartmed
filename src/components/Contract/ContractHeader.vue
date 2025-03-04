<script setup>
import { ref, computed, watch } from "vue";
import Input from "../../Util/Input.vue";
import { contractsTable } from "../../store/Contracts.js";
import { InvoiceTable } from "../../store/Invoice.js";
import Alert from "../../Util/Alert.vue";

defineProps({
    AddHandler: Function,
    showadditional: Boolean,
    Customer: Array
});

const contract = contractsTable();
const invoice = InvoiceTable();

// ✅ Contract Fields
const selectedCustomer = ref("");
const startDate = ref("");
const duration = ref(0);
const payment = ref(0);
const note = ref("");
const createdBy = ref("Admin");
const expireDate = ref("");

// ✅ Invoice Fields
const invoiceDate = ref("");
const invoiceStatus = ref("undone");

// ✅ Product Fields
const itemName = ref("");
const itemPrice = ref(0);
const itemQuantity = ref(0);
const invoiceItems = ref([]);

// ✅ Add Product to Invoice List
const addInvoiceItem = () => {
    if (!itemName.value || itemPrice.value <= 0 || itemQuantity.value <= 0) {
        alert("All fields must be filled correctly!");
        return;
    }

    invoiceItems.value.push({
        name: itemName.value,
        price: itemPrice.value,
        quantity: itemQuantity.value,
        subtotal: itemPrice.value * itemQuantity.value
    });

    // Reset fields after adding
    itemName.value = "";
    itemPrice.value = 0;
    itemQuantity.value = 0;
};

// ✅ Remove Product from Invoice List
const removeInvoiceItem = (index) => {
    invoiceItems.value.splice(index, 1);
};
let show = ref('');
let type = ref('');

// ✅ Calculate Total Amount Automatically
const totalAmount = computed(() => {
    return invoiceItems.value.reduce((sum, item) => sum + item.subtotal, 0);
});

// ✅ Submit Contract and Invoice Together
const InsertNewContract = () => {

    const dates=new Date(startDate.value).getTime()
    const dateex=new Date(expireDate.value).getTime()
    const months=new Date(startDate.value).getMonth()+1
    const monthex=new Date(expireDate.value).getMonth()+1
    const years=new Date(startDate.value).getFullYear()
    const yearex=new Date(expireDate.value).getFullYear()
    console.log('====================================');
    console.log(monthex,months);
    console.log('====================================');
    if(dates>dateex){
        type.value="error"
        show.value="Start date must be before expire date!"
 
        return;
    }
    console.log(yearex,years);
    
    if(yearex===years){
        if(months===monthex){
            type.value="error"
            show.value="Start date and expire date must be in the same year!"

            return;
        }
    }
    console.log('====================================');
    console.log(payment.value,duration.value);
    console.log('====================================');
    if(Number(payment.value)<Number(duration.value)){
        type.value="error"
        show.value="Payment amount must be greater than or equal to duration!"
        return;
    }
    const res=contract.create(selectedCustomer.value, duration.value, startDate.value, expireDate.value, payment.value, note.value, invoiceItems.value);
    show.value = res[2];
    type.value =res[1];
    if(res[0]){

        setTimeout(() => { 
                    show.value = ''; 
                    type.value = ''
                    // Clear form after successful insertion
                    selectedCustomer.value = "";
                    startDate.value = "";
                    duration.value = 0;
                    payment.value = 0;
                    note.value = "";
                    invoiceItems.value = [];
                    window.location.reload()   
                }, 2000);
    }
};
 
watch(show, (newValue) => {
    setTimeout(() => { 
                show.value = ''; 
                type.value = ''
                if(show.value =='success'){
                    selectedCustomer.value = "";
                    startDate.value = "";
                    duration.value = 0;
                    payment.value = 0;
                    note.value = "";
                    invoiceItems.value = [];
                }
            }, 2000);
});
</script>

<template>
    <div class="contract-container">
        <!-- Header with gradient background -->
        <Alert :show="show" :type="type" :message="show" />
        <div class="header-panel">
            <h2 class="panel-title">Add Contract & Invoice</h2>
            <div class="header-actions">
                <button @click="$emit('showHelp')" class="icon-button" title="Help">
                    <i class="fas fa-question-circle"></i>
                </button>
            </div>
        </div>

        <div class="content-panel">
            <!-- Contract Form -->
            <div class="section-panel">
                <div class="section-header">
                    <h3 class="section-title">Contract Details</h3>
                    <div class="section-badge">Required</div>
                </div>
                
                <form class="form-grid">
                    <div class="form-column">
                        <div class="form-group">
                            <label for="customer" class="form-label">Select Customer</label>
                            <select id="customer" v-model="selectedCustomer" class="form-control">
                                <option value="" disabled>Select a customer</option>
                                <option v-for="customer in Customer" :key="customer.Id" :value="customer.username">
                                    {{ customer.username }}
                                </option>
                            </select>
                        </div>

                        <Input :Type="'date'" v-model="startDate" :Label="'Start Date'" />
                        <Input :Type="'number'" v-model="duration" :Label="'Monthely Payment'" />
                    </div>
                    <div class="form-column">
                        <Input :Type="'number'" v-model="payment" :Label="' Almost Payment'" />
                        <Input :Type="'date'" v-model="expireDate" :Label="'Expire Date'" />
                        <div class="form-group">
                            <label for="contractNote" class="form-label">Contract Notes</label>
                            <textarea id="contractNote" v-model="note" class="form-control textarea" placeholder="Additional contract details..."></textarea>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Product Input -->
            <div class="section-panel">
                <div class="section-header">
                    <h3 class="section-title">Add Invoice Item</h3>
                    <div class="section-badge blue">Optional</div>
                </div>
                
                <div class="invoice-entry">
                    <div class="invoice-input-row">
                        <div class="form-group flex-grow">
                            <label for="itemName" class="form-label">Product Name</label>
                            <input id="itemName" type="text" v-model="itemName" class="form-control" placeholder="Enter product name">
                        </div>
                        <div class="form-group">
                            <label for="itemPrice" class="form-label">Price</label>
                            <input id="itemPrice" type="number" v-model="itemPrice" class="form-control" placeholder="0.00">
                        </div>
                        <div class="form-group">
                            <label for="itemQuantity" class="form-label">Quantity</label>
                            <input id="itemQuantity" type="number" v-model="itemQuantity" class="form-control" placeholder="0">
                        </div>
                        <button @click="addInvoiceItem" type="button" class="add-button">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>

            <!-- Product List -->
            <div class="section-panel" v-if="invoiceItems.length > 0">
                <div class="section-header">
                    <h3 class="section-title">Invoice Items</h3>
                    <div class="item-count">{{ invoiceItems.length }} item(s)</div>
                </div>
                
                <div class="invoice-items-container">
                    <table class="invoice-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in invoiceItems" :key="index">
                                <td>{{ item.name }}</td>
                                <td>${{ item.price.toFixed(2) }}</td>
                                <td>{{ item.quantity }}</td>
                                <td class="subtotal">${{ item.subtotal.toFixed(2) }}</td>
                                <td>
                                    <button @click="removeInvoiceItem(index)" class="delete-button">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="text-right">Total:</td>
                                <td colspan="2" class="total-amount">${{ totalAmount.toFixed(2) }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <!-- Empty state when no items -->
            <div class="section-panel empty-state" v-if="invoiceItems.length === 0">
                <div class="empty-icon">
                    <i class="fas fa-file-invoice"></i>
                </div>
                <h4>No Invoice Items</h4>
                <p>Add items to the invoice using the form above</p>
            </div>

            <!-- Submit Button -->
            <div class="action-panel">
                <button type="button" @click="InsertNewContract" class="submit-button">
                    <i class="fas fa-save"></i> Create Contract & Invoice
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Main Container */
.contract-container {
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    margin-bottom: 20px;
}

/* Header Panel */
.header-panel {
    background: linear-gradient(135deg, #4568dc 0%, #5f8bff 100%);
    color: white;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.panel-title {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
}

.header-actions {
    display: flex;
    gap: 10px;
}

.icon-button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
}

.icon-button:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* Content Panel */
.content-panel {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* Section Panels */
.section-panel {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    padding: 20px;
    transition: box-shadow 0.2s, transform 0.2s;
}

.section-panel:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
}

.section-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
}

.section-badge {
    font-size: 12px;
    font-weight: 500;
    background-color: #f44336;
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
}

.section-badge.blue {
    background-color: #2196f3;
}

.item-count {
    font-size: 14px;
    color: #666;
    background-color: #f0f4f8;
    padding: 4px 10px;
    border-radius: 12px;
}

/* Form Elements */
.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.form-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
}

.form-label {
    font-size: 14px;
    font-weight: 500;
    color: #4c5862;
    margin-bottom: 6px;
}

.form-control {
    padding: 10px 12px;
    border: 1px solid #dce0e5;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
    border-color: #5f8bff;
    box-shadow: 0 0 0 3px rgba(95, 139, 255, 0.1);
    outline: none;
}

.textarea {
    min-height: 100px;
    resize: vertical;
}

/* Invoice Entry */
.invoice-entry {
    margin-top: 10px;
}

.invoice-input-row {
    display: flex;
    gap: 12px;
    align-items: flex-end;
}

.flex-grow {
    flex-grow: 2;
}

.add-button {
    background-color: #5f8bff;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    height: 39px;
    margin-bottom: 1px;
}

.add-button:hover {
    background-color: #4568dc;
}

/* Invoice Items */
.invoice-items-container {
    margin-top: 10px;
    overflow-x: auto;
}

.invoice-table {
    width: 100%;
    border-collapse: collapse;
}

.invoice-table th,
.invoice-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
}

.invoice-table th {
    font-weight: 600;
    color: #4c5862;
    background-color: #f8f9fa;
}

.invoice-table tr:last-child td {
    border-bottom: none;
}

.subtotal {
    font-weight: 500;
    color: #2c3e50;
}

.delete-button {
    background-color: #f8d7da;
    color: #dc3545;
    border: none;
    border-radius: 4px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
}

.delete-button:hover {
    background-color: #f5c2c7;
}

.text-right {
    text-align: right;
    font-weight: 600;
}

.total-amount {
    font-weight: 700;
    font-size: 16px;
    color: #2c3e50;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 40px 20px;
}

.empty-icon {
    font-size: 48px;
    color: #cbd5e0;
    margin-bottom: 16px;
}

.empty-state h4 {
    margin: 0 0 8px;
    color: #4c5862;
}

.empty-state p {
    margin: 0;
    color: #7f8c8d;
}

/* Action Panel */
.action-panel {
    display: flex;
    justify-content: flex-end;
}

.submit-button {
    background: linear-gradient(135deg, #4568dc 0%, #5f8bff 100%);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(95, 139, 255, 0.3);
}

.submit-button:active {
    transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
    .form-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .invoice-input-row {
        flex-direction: column;
        align-items: stretch;
    }
    
    .add-button {
        margin-top: 10px;
        height: auto;
    }
}

/* For font-awesome icons (you'll need to include the font-awesome library) */
/* If you don't have font-awesome, you can replace these with other icons or text */
.fas.fa-question-circle:before { content: "❓"; }
.fas.fa-plus:before { content: "+"; }
.fas.fa-trash-alt:before { content: "🗑️"; }
.fas.fa-file-invoice:before { content: "📄"; }
.fas.fa-save:before { content: "💾"; }
</style>