<template>
  <div class="container">
    <h2>Create Account</h2>
    <a v-if="isErr" style="color:red;">{{error(errMsg)}}</a>
    <form @submit.prevent>
      <b-row no-gutters>
        <b-col cols='12' class="my-1">
          Email:<b-form-input v-model="acc.email" placeholder="Email"></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          Display Name:<b-form-input v-model="acc.displayName" placeholder="Display Name"></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          Password:<b-form-input v-model="acc.pw" type="password" placeholder="Password"></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          Confirm:<b-form-input v-model="pw2" type="password" placeholder="confirm "></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          <b-button type="submit" class="btn btn-primary" @click="register">register</b-button><br>          
        </b-col>
      </b-row>  
    </form>    
  </div>
</template>

<script>
import auth from '~/mixins/auth'
export default {
  mixins: [auth],
  components: {
   
  },
  data(){    
    return { 
      user:this.$store.state.users.user,
      acc:{
        email:'',
        pw:'',
        displayName:''     
      },
      pw2:'',
      isErr:false,
      errMsg:''
    }
  },
  mounted(){
    if(this.$store.state.users.user){ 
      console.log(this.$store.state.users.user)     
      this.$router.push("/")
    }
  },
  methods:{
    async register(){
        if(this.acc.pw!=this.pw2){
            this.isErr=true
            this.errMsg='password and confirm password not match'  
            return
        }
      await this.$store.dispatch('users/register',this.acc).then(()=>{
        window.location.reload(true)
      }).catch(error =>{
        this.isErr=true
        this.errMsg=error.code        
      })      
    }
  }
}
</script>

<style scoped>

</style>
