<!-- src/components/Header.vue -->
<template>
    <header class="flex justify-end items-center">
        <div class="link-contact flex justify-end items-center">
            <a href="https://nino.is-a.dev/" class="link-contact-item"><ion-icon name="logo-github"></ion-icon></a>
            <a href="https://nino.is-a.dev/" class="link-contact-item"><ion-icon name="logo-facebook"></ion-icon></a>
            <a href="https://nino.is-a.dev/" class="link-contact-item"><ion-icon name="logo-linkedin"></ion-icon></a>
            <a href="https://nino.is-a.dev/" class="link-contact-item"><ion-icon name="logo-reddit"></ion-icon></a>
        </div>
    </header>
</template>
  
<script>
  export default {
    name: 'AppOwnerHeader',
    data() {
      return {

      };
    },
    mounted() {
      
    }
  };
</script>
  
  <style scoped>
   header {
    width: 100vw;
    padding: 5px 10px;
   }

   .link-contact a {
    margin: 0 10px;
   }

   .link-contact-item {
    display: flex;
    align-items: center;
    justify-content: center;
   }
  </style>
  