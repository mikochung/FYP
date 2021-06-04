<template>
  <div class="container">    
    <h3><u>Manager User</u></h3>
    <br><br><br>

      <b-table class="table mt-5" striped hover :busy="!datas||!admins" :items="datas" :fields="fields">
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <template #cell(isAdmin)="data">
          {{admins.filter(a=>a.value==data.item.uid).length>0}}
        </template>

        <template #cell(addToAdmin)="data">
          <b-button @click="addToAdmin(data.item.uid)" variant="primary" v-if="!admins.filter(a=>a.value==data.item.uid).length>0">add</b-button>
          <b-button @click="removeAdmin(data.item.uid)" variant="danger" v-else>remove</b-button>
        </template>
        
        

      </b-table>
  
  </div>
</template>

<script>
import{ auth,db,storage } from '@/services/firebase'
import Cookie from 'js-cookie' 
import cat from '~/mixins/catagories.js'
let userRef=db.ref('users')
let adminRef=db.ref('admins')
export default {
    name:'app',firebase:{
        users:userRef,
        admins:adminRef
    },
  components: {
   
  },
  mixins: [cat],
  layout: 'admin',
  data(){    
    return {
       user:this.$store.state.users.user||null,            
      datas:{}, 
      admins:{}, 
      fields: [  
          {
            key: 'uid',
            label: 'User Id',
            sortable: false
          },        
          {
            key: 'displayName',
            label: 'Display Name',
            sortable: false
          },
          {
            key: 'email',
            label: 'E-mail',
            sortable: false
          },  
          {
            key: 'isAdmin',
            label: 'Is Admin?',            
          },  
          {
            key: 'addToAdmin',
            label: 'Add to Admin',            
          },          
        ],      
    }
  },
  async created(){ 
    this.loadData()
  },
  computed:{
     
  },
  methods:{     
      async edit(d){
            var newVal=d
            var updates = {};
            updates[this.key] = newVal
            recipesRef.update(updates).catch((err)=>{
              console.log(err)
              this.$toast.error('something went wrong')
              return
            })
            this.$toast.success('update successed')
            this.loadData()
      },
      async remove(d){            
            var updates = {};
            updates[this.key] = null
            recipesRef.update(updates).catch((err)=>{
              console.log(err)
              this.$toast.error('something went wrong')
              return
            })
            this.$toast.success('update successed')
            this.$router.push('/admin/recipes')
      },
      log(msg){
          console.log(msg)
          return true
      },
      async loadData(){
        var _admin
        await adminRef.get().then(function(snapshot) {
        if (snapshot.exists()) {
            _admin= snapshot.val()
        }
        else {
            console.log("ADMIN No data available");
        }
        }).catch(function(error) {
          console.error(error);
        })     
        this.admins=Object.entries(_admin).map(value=>{return {key:value[0],value:value[1]}})

        var result    
        await userRef.get().then(function(snapshot) {
        if (snapshot.exists()) {
            result= snapshot.val()
        }
        else {
            console.log("USER No data available");
        }
        }).catch(function(error) {
          console.error(error);
        })     
        this.datas=Object.entries(result).map(value=>{
          value[1].key=value[0]
          return value[1]
        })        
      },  
      async addToAdmin(uid){
        if(this.admins.includes(uid)){
          this.$toast.error('this user is already have admin permission')
          return
        }
         adminRef.push(uid)
         this.$toast.success('add successed')
         this.loadData()
      },
      removeAdmin(uid){
        const key=this.admins.filter(a=>a.value==uid).pop().key
        console.log(key)
        const updates={}
        updates[key]=null
        adminRef.update(updates).catch((err)=>{
          console.log(err)
          this.$toast.error('something went wrong')
          return
        })
      this.loadData()
      }
  }
}
</script>

<style scoped>
.table{
  background:white;
  color:black;
}
.table .image{
  max-height: 100px ;
}
</style>
