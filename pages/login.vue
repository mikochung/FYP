<template>
  <div class="container">
    <h2>Login</h2>
    <a v-if="errMsg" style="color:red;">{{error(errMsg)}}</a>
    <form @submit.prevent>
      <b-row no-gutters>
        <b-col cols='12' class="my-1">
          <b-form-input v-model="acc.email" placeholder="Email"></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          <b-form-input v-model="acc.pw" type="password" placeholder="Password"></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          <b-button type="submit" class="btn btn-primary" @click="login">login</b-button><br>
          沒有賬號？<a href="/register"><u>按此建立賬號</u></a>
        </b-col>
      </b-row>  
    </form>    
  </div>
</template>

<script>
import auth from '~/mixins/auth'
export default {
  components: {
   
  },
   mixins: [auth],
  data(){    
    return { 
      user:this.$store.state.users.user,
      acc:{
        email:'',
        pw:''
      },
      isErr:false,
      errMsg:''
    }
  },
  beforeCreate(){
    if(this.$store.state.users.user){      
      this.$router.push("/")
    }
  },
  methods:{
    async login(){

      await this.$store.dispatch('users/login',this.acc).catch(error =>{
        this.isErr=true
        this.errMsg=error.code
        setTimeout(() =>{
          this.isError=false
        },5000)
      })
      if(!this.isErr){        
        window.location.reload(true)
      }
    }
  }
}
</script>

<style scoped>

</style>
