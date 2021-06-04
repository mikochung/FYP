<template>
  <div class="navbar" id='nav'>
        <b-row align-h="between" style="height:100%;width:100%;">
            <b-col cols=auto  @click="$router.push('/')" class="navItem"><b>Recipe</b></b-col>
            <b-col cols=auto>  
              <b-row style="height:100%;">                          
                <b-col cols=auto class="smItem" @click="$router.push('/catagories')">
                 Catagories
                </b-col>
                <b-col cols=auto class="smItem" @click="$router.push('/login')" v-if="!user">
                  Login
                </b-col>
                <b-col cols=auto class="smItem" @mouseover="showList = true" @mouseleave="showList = false"  v-else>
                <div class="position-relative d-block px-auto">
                  {{user.name}}<br>
                  <transition name="fade"> 
                    <div  v-if="showList" @click="showList = false" class="userDropDown d-flex flex-column justify-content-center align-items-start position-absolute text-justify" >       
                      <div class="mx-auto py-2">                                          
                        <a href="user" >Info</a>
                      </div>
                      <div class="mx-auto py-2" v-if="user&&user.admin">                                          
                        <a href="admin" >ADMIN</a>
                      </div>
                      <div class="mx-auto py-2" @click="logout">                                           
                        <a href="#" >Logout</a>
                      </div>                       
                      
                    </div>               
                  </transition>
                </div>
                </b-col>
              </b-row>              
            </b-col>
        </b-row> 
  </div>
</template>

<script>
import{auth} from '@/services/firebase'
import Cookie from 'js-cookie' 
export default {  
  data(){    
    return {   
        user:this.$store.state.users.user||null ,
        showList:false
    }
  },
  beforeMount (){
     /* if(process.browser){
        window.addEventListener('scroll', this.handleScroll);        
      }*/
      
  },
  mounted(){
    this.user=this.$store.state.users.user
    console.log(this.user)
  },
  beforeDestroy() {
    ////window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
    /*  handleScroll () {
      // Your scroll handling herei
      var nav=document.getElementById('nav')
      if(window.scrollY>10){         
        nav.style.visibility='HIDDEN'        
      }
      else{
        nav.style.visibility='visible'      
      }
      //console.log(window.scrollY)
    },*/
     async logout(){
        await Cookie.remove('access_token')
        await auth.signOut()        
        location.href='/'
    }
  }
}
</script>

<style scoped>
 .navbar{
    height:60px;
    background: #008888;
    position: sticky;
    top: 0;
    z-index: 1;
    transition:  0.2s;
 }
 .navItem{
   cursor: pointer;
   font-size:30px;
   color:white;
   transition:  0.2s;
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
  .smItem:hover , .navItem:hover , .userDropDown a:hover{
    color:#EE88EE;
  } 
  .userDropDown a{
    color:white;  
  }  
  .fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.userDropDown{
  background:#008888;
  border:solid 2px #226622;
  width:150px;
  left:50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
  
</style>


