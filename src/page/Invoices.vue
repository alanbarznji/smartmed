<script setup>
import { ref, computed } from "vue";
import { InvoiceTable } from "../store/Invoice.js"; // ✅ Import Pinia store
import { customerTable } from "../store/Customer.js"; // ✅ Import Customer Store

const invoiceStore = InvoiceTable();
const customerStore = customerTable();

const namecustomer = ref("");
const startdate = ref("");
const state = ref("Undone"); // ✅ Default state "Undone"
const items = ref([]);

// Fields for editing an invoice
const editingInvoiceId = ref(null);
const editState = ref("Undone");
const editItems = ref([]);

// ✅ Manually Add Items
const newItemName = ref("");
const newItemQuantity = ref("");
const newItemPrice = ref("");

// ✅ Create Invoice
const addInvoice = () => {
    const success = invoiceStore.create(namecustomer.value, startdate.value, state.value, items.value);
    if (success[0]) {
        namecustomer.value = "";
        startdate.value = "";
        state.value = "Undone";
        items.value = [];
    } else {
        alert("Customer not found or error occurred!");
    }
};

// ✅ Delete Invoice
const removeInvoice = (id) => {
    invoiceStore.delete(id);
};

// ✅ Open Edit Form
const openEdit = (invoice) => {
    editingInvoiceId.value = invoice.Id;
    editState.value = invoice.state;
    editItems.value = invoice.items;
};

// ✅ Update Invoice
const updateInvoice = () => {
    if (!editingInvoiceId.value) return;
    invoiceStore.update(editingInvoiceId.value, editState.value, editItems.value);
    editingInvoiceId.value = null;
};

// ✅ Get All Invoices
const invoices = computed(() => invoiceStore.get());

// ✅ Get Customers (To Select in Invoice)
const customers = computed(() => customerStore.getuser());

// ✅ Add Manually Typed Item to Invoice
const addManualItem = () => {
    if (!newItemName.value || !newItemQuantity.value) {
        alert("Please enter item name and quantity!");
        return;
    }
    
    const item = {
        name: newItemName.value,
        price: newItemPrice.value || 0, // Default price to 0 if not entered
        quantity: newItemQuantity.value,
        subtotal: (newItemPrice.value || 0) * newItemQuantity.value
    };

    items.value.push(item);
    newItemName.value = "";
    newItemQuantity.value = "";
    newItemPrice.value = "";
};
</script>

<template>
  <div class="container mt-5">
    <h2>إدارة الفواتير</h2>

    <!-- Create Invoice Form -->
    <form @submit.prevent="addInvoice" class="form-container">
      <!-- ✅ Select Customer -->
      <select v-model="namecustomer" class="form-control" required>
        <option disabled value="">اختر العميل</option>
        <option v-for="customer in customers" :key="customer.userId" :value="customer.username">
          {{ customer.username }}
        </option>
      </select>

      <!-- ✅ Select Invoice Start Date -->
      <input v-model="startdate" type="date" required class="form-control" />

      <!-- ✅ Select Invoice State -->
      <select v-model="state" class="form-control">
        <option value="Undone">غير مكتمل</option>
        <option value="Done">مكتمل</option>
      </select>

      <!-- ✅ Manually Add Items -->
      <div>
        <label>إضافة عنصر يدويًا</label>
        <input v-model="newItemName" type="text" class="form-control" placeholder="اسم المنتج" />
        <input v-model="newItemPrice" type="number" class="form-control" placeholder="السعر (اختياري)" />
        <input v-model="newItemQuantity" type="number" class="form-control" placeholder="الكمية" />
        <button type="button" @click="addManualItem" class="btn btn-secondary">
          إضافة المنتج
        </button>
      </div>

      <!-- ✅ Show Items in Invoice -->
      <div v-if="items.length">
        <h5>العناصر المضافة</h5>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            {{ item.name }} - الكمية: {{ item.quantity }} - السعر: {{ item.price }}$ - الإجمالي: {{ item.subtotal }}$
          </li>
        </ul>
      </div>

      <button type="submit" class="btn btn-primary">إضافة الفاتورة</button>
    </form>

    <!-- Invoice Table -->
    <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th>اسم العميل</th>
          <th>تاريخ الفاتورة</th>
          <th>الحالة</th>
          <th>الإجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice.Id">
          <td>{{ invoice.namecustomer }}</td>
          <td>{{ invoice.startdate }}</td>
          <td>{{ invoice.state }}</td>
          <td>
            <button @click="openEdit(invoice)" class="btn btn-warning btn-sm">تعديل</button>
            <button @click="removeInvoice(invoice.Id)" class="btn btn-danger btn-sm">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Invoice Form -->
    <div v-if="editingInvoiceId" class="edit-container">
      <h3>تعديل الفاتورة</h3>
      <select v-model="editState" class="form-control">
        <option value="Undone">غير مكتمل</option>
        <option value="Done">مكتمل</option>
      </select>
      <button @click="updateInvoice" class="btn btn-success">تحديث</button>
      <button @click="editingInvoiceId = null" class="btn btn-secondary">إلغاء</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-container {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f8f9fa;
}
</style>
