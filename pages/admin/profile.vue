<template>
  <div class="container">
    <h2>ADMIN</h2>    
    
  </div>
</template>

<script>
import{auth} from '@/services/firebase'
import Cookie from 'js-cookie' 
export default {
  components: {
   
  },
  data(){    
    return { 
      acc:{
        email:'',
        pw:''
      }
    }
  },
  methods:{
    async logout(){
        await Cookie.remove('access_token')
        await auth.signOut()

        location.href='/'
    }
  }
}
</script>

<style scoped>

</style>
