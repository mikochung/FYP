<template>
  <div class="width95">
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/NavBar.vue'
export default {  
  components: {
    Navbar
  },
  data(){    
    return { 
           
    }
  },
  mounted(){
    
  }
}
</script>

<style>
body{
  background:#008888;
  color:white;
}
a{
  color:#88FF88;
  transition: 0.2s;
}
a:hover{
  color:#EE88EE;
}
 .width95{
   width: 100%;
 }
 .__layout{
   width: 100% !important; 
 }
 .container{
   background:#006666;
   min-height: 100vh;
   min-width: 95%;
 }
 
</style>


