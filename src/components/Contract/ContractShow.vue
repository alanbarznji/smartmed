
<script setup>
import { RouterLink, RouterView } from "vue-router"
defineProps({
    Customer:Array
})
</script>
<template>
    <RouterLink to="customer/1" class="   home-show w-100   row    px-5  py-5 ">
        <div v-for="cust in Customer" class="   ">
            <div>
                <div class="d-flex gap-2 fw-bold">
                    <p>Name</p> : <p>{{cust.username}}</p>
                </div>
                <div class="d-flex gap-2 fw-bold">
                    <p>Address</p> : <p>{{cust.address}}</p>
                </div>
            </div>
            <div>
                <div class="d-flex gap-2 fw-bold">
                    <p>Phone Number
                    </p> : <p>{{cust.phone}}</p>
                </div>
                <div class="d-flex gap-2 fw-bold">
                    <p>Free trial</p> : <p>{{cust.freetrial}}</p>
                </div>
            </div>
            <div>
                <div class="d-flex gap-2 fw-bold">
                    <p>Start date</p> : <p>{{cust.startdate}}</p>
                </div>
                <div class="d-flex gap-2 fw-bold">
                    <p>Note</p> : <p>{{cust.note}}</p>
                </div>
            </div>
        </div>
    </RouterLink>
</template>
<style scoped>
   .home-show {
            display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 40px;
    grid-row-gap: 60px;
}

.home-show  > div{
    height: 300px;
    border: 2px solid black;
    padding: 10px;
    transition: all 0.5s ease;
    }
    .home-show  > div:hover {
        background-color: lightgray;
}
.buttons {
     
    color: rgb(3, 3, 3);
    padding: 10px 20px;
 
    text-decoration: none;
 
    cursor: pointer;
    transition: all 0.5s ease;
}
.buttons:hover{
     color: red;
}
</style>