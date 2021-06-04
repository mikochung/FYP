<template>
  <div class="container pt-2 px-5">    
    <h3><u>STATISTIC</u></h3>
    <br><br><br>
    &nbsp;&nbsp;&nbsp;&nbsp;  Users count:&nbsp;{{usersCount||'Loading...'}}<br><br><br>
    &nbsp;&nbsp;&nbsp;&nbsp;  Admin count:&nbsp;{{adminsCount||'Loading...'}}<br><br><br>
    &nbsp;&nbsp;&nbsp;&nbsp;  Recipes count:&nbsp;{{recipesCount||'Loading...'}}<br><br><br>

  </div>
</template>

<script>
import{auth,db} from '@/services/firebase'
import Cookie from 'js-cookie' 
let adminRef=db.ref('admins')
let userRef=db.ref('users')
let recipeRef=db.ref('recipes')
export default { 
  name:'app',firebase:{
    admins:adminRef,
    users:userRef,
    recipes:recipeRef
  },
  layout: 'admin',
  data(){    
    return { 
      user:this.$store.state.users.user||null,
      recipesCount:0,
      usersCount:0,
      adminsCount:0
    }
  },
  async created(){    
    //count recipes
    var _recipes;    
    await recipeRef.get().then(function(snapshot) {
      if (snapshot.exists()) {
        _recipes= snapshot.val()
      }else {
        console.log("No data available");
      }
    }).catch(function(error) {
      console.error(error);
    })
    this.recipesCount=Object.keys(_recipes).length

    //count user
    var _users;   
    await userRef.get().then(function(snapshot) {
    if (snapshot.exists()) {
       _users= snapshot.val()
    }else {
            console.log("No data available");
        }
        }).catch(function(error) {
        console.error(error);
        })
    this.usersCount=Object.keys(_users).length

    //count admin
    var _admin;   
    await adminRef.get().then(function(snapshot) {
    if (snapshot.exists()) {
      _admin= snapshot.val()
    }else {
            console.log("No data available");
        }
        }).catch(function(error) {
        console.error(error);
        })
    this.adminsCount=Object.keys(_admin).length     
  },
  mounted(){       
  },
  methods:{
    async logout(){
        await Cookie.remove('access_token')
        await auth.signOut()

        location.href='/'
    },
     async add(){
          adminRef.push(this.user.uid)          
          //toastr.success('added')  
      },
      async loadData(){
        var result    
        await recipesRef.get().then(function(snapshot) {
        if (snapshot.exists()) {
            result= snapshot.val()
        }
        else {
            console.log("No data available");
        }
        }).catch(function(error) {
        console.error(error);
        })     
        this.datas=result
      }
  }
}
</script>

<style scoped>

</style>
