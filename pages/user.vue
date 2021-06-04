<template>
  <div class="container">
    <h2>INFO</h2>
    <form @submit.prevent>
      <b-row no-gutters>
        <b-col cols='12' class="my-1">
          User ID:<b-form-input v-model="acc.uid" placeholder="User ID" disabled></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          Email:<b-form-input v-model="acc.email" placeholder="Email" disabled></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          Display Name:<b-form-input v-model="acc.displayName" placeholder="Display Name"></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          Password:<b-form-input v-model="acc.pw" type="password" placeholder="Password"></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
         NEW Password:<b-form-input v-model="acc.newpw" type="password" placeholder="Only when you want to change password"></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          Confirm:<b-form-input v-model="pw2" type="password" placeholder="Only when you want to change password "></b-form-input>
        </b-col>
        <b-col cols='12' class="my-1">
          <b-button type="submit" class="btn btn-primary" @click="update">UPDATE</b-button><br>          
        </b-col>
      </b-row>  
    </form>
    <div v-if="isErr" style="color:red;">
      {{error(errMsg)}}
    </div>
  </div>
</template>

<script>
import{ db } from '@/services/firebase'
import auth from '~/mixins/auth'

let userRef=db.ref('users')
export default {
  name:'app',firebase:{
    users:userRef
  },
  mixins: [auth],
  components: {
   
  },
  data(){    
    return { 
    user:this.$store.state.users.user||null ,
      acc:{
        uid:'',
        email:'',
        pw:'',
        displayName:'' ,
        admin:false    
      },
      pw2:'',
      isErr:false,
      errMsg:'',
      datas:{},
    }
  },
  async created(){
    await this.loadData()
    console.log(this.datas)
      const {email, uid, name, admin} = this.user
      this.acc={
        uid,
        email,
        pw:'',
        newpw:'',
        displayName:name||'',
        admin 
      }
  },
  methods:{
    async update(){
        if(!this.acc.pw||this.acc.pw==null){
            this.isErr=true
            this.errMsg='please input password' 
            return
        }
        if(this.acc.newpw&&this.acc.newpw!=this.pw2){
            this.isErr=true
            this.errMsg='new password and confirm password not match'            
            
            return
        }
      await this.$store.dispatch('users/updateInfo',this.acc).catch(error =>{
        this.isErr=true
        this.errMsg=error.code
      })
      const {displayName,email,uid}=this.acc
      
      var key=''+this.datas.pop().key
     
      var updates = {};
      updates[key] = {
        displayName,
        email,
        uid
      }
      console.log(updates)
      userRef.update(updates).catch((err)=>{
        console.log(err)
        this.isErr=true
        this.$toast.error('something went wrong')
        return
      })
      if(!this.isErr){          
          this.$toast.success('Update successed')
          setTimeout(()=>{window.location.reload(true)},1000)
          
      }
    },
     async loadData(){
        var result    
        await userRef.get().then(function(snapshot) {
        if (snapshot.exists()) {
            result= snapshot.val()
        }
        else {
            console.log("No data available");
        }
        }).catch(function(error) {
        console.error(error);
        })     
        this.datas=Object.entries(result).map(user=>{
          user[1].key=user[0]
          return user[1]
          }).filter(r=>r.uid==this.user.uid)
      },    
  }
}
</script>

<style scoped>

</style>
