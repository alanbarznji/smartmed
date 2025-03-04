<script setup>
defineProps({
  Customer: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="customer-grid">
    <RouterLink 
      v-for="cust in Customer" 
      :key="cust.Id" 
      :to="`/customer/${cust.Id}`"
      class="customer-card"
    >
      <div class="card-header">
        <span class="customer-name">{{ cust.username }}</span>
      </div>
      
      <div class="card-body">
        <div class="info-item">
          <span class="info-label">Address:</span>
          <span class="info-value">{{ cust.address }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Phone:</span>
          <span class="info-value">{{ cust.phone }}</span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Free trial:</span>
          <span class="info-value">
            <span class="status-badge" :class="cust.freetrial ? 'active' : 'inactive'">
              {{ cust.freetrial ? 'Yes' : 'No' }}
            </span>
          </span>
        </div>
        
        <div class="info-item">
          <span class="info-label">Start date:</span>
          <span class="info-value">{{ cust.startdate }}</span>
        </div>
        
        <div class="info-item note-item">
          <span class="info-label">Note:</span>
          <span class="info-value note-text">{{ cust.note }}</span>
        </div>
      </div>
      
      <div class="card-footer">
        <span class="view-details">View Details</span>
      </div>
    </RouterLink>
    
    <!-- Empty state when no customers -->
    <div v-if="!Customer || Customer.length === 0" class="empty-state">
      <div class="empty-state-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <h3>No Customers Found</h3>
        <p>Add your first customer to get started</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 20px;
  width: 100%;
}

.customer-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  height: 100%;
  border: 1px solid #eaeaea;
}

.customer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #2563eb;
}

.card-header {
  background-color: #2563eb;
  padding: 16px 20px;
  color: white;
}

.customer-name {
  font-size: 18px;
  font-weight: 600;
}

.card-body {
  padding: 16px 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.info-value {
  font-size: 15px;
  color: #334155;
}

.note-item {
  margin-top: 8px;
}

.note-text {
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-style: italic;
  color: #64748b;
}

.status-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.active {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background-color: #fee2e2;
  color: #991b1b;
}

.card-footer {
  padding: 12px 20px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-end;
}

.view-details {
  color: #2563eb;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.view-details::after {
  content: "→";
  margin-left: 4px;
  transition: transform 0.2s ease;
}

.customer-card:hover .view-details::after {
  transform: translateX(4px);
}

.empty-state {
  grid-column: 1 / -1;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
}

.empty-state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #94a3b8;
}

.empty-state-content h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.empty-state-content p {
  margin: 0;
  font-size: 14px;
}

@media (max-width: 768px) {
  .customer-grid {
    grid-template-columns: 1fr;
    padding: 16px;
  }
}
</style>