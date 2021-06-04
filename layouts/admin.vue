<template>
  <div >
    <b-row no-gutters>
      <b-col cols=0 lg=2>
        <b-col cols=auto  @click="$router.push('/')" class="navItem w-100 d-flex flex-column justify-content-start align-items-center mb-5 pt-2"><b>Recipe</b></b-col>
        <div class="w-100 vh-100 d-flex flex-column justify-content-start align-items-center py-5">
          <div class="py-3 smItem" @click="$router.push('/admin')">
            <a>Statistic</a>
          </div> 
          <div class="py-3 smItem" @click="$router.push('/admin/users')">
            Users
          </div>          
          <div class="py-3 smItem" @click="$router.push('/admin/recipes')">
            Recipes
          </div>
        </div>
      </b-col>
      <b-col cols=12 lg=10>
        <nuxt />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import{ auth,db } from '@/services/firebase'

export default { 
  
  data(){    
    return { 
        user:this.$store.state.users.user||null ,
        datas:{}   
    }
  },
  async created(){     
  },
  methods:{
      
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
  color:#008800;
} 
.__layout{
   width: 100% !important; 
}
.container{
   background:#006666;
   min-height: 100vh;
   min-width: 100%;
}
.navItem{
   cursor: pointer;
   font-size:30px;
   color:white;
   transition:  0.2s;
 }  
  .smItem:hover , .navItem:hover{
    color:#EE88EE;
  }
   .smItem{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size:18px;
    color:white;
    transition:  0.2s;
 }
</style>


