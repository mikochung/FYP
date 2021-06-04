<template>
  <div class="container">
        
    <b-row class="py-4">

      <b-col v-for="data in datas" :key="data.key" cols="6" lg='3'>
        <NuxtLink :to="'/recipes/'+data.key">
          <b-card style="height:100%;">
            <center>
            <img :src="data.img" style="max-height:20vh; max-width:100%; " /><br>
            <a style="color:black;">{{catagories(data.catagory)}}</a><br>
            <a style="color:black;">{{data.title}}</a>
            </center>
          </b-card>
        </NuxtLink>
      </b-col>

    </b-row>
    
  </div>
</template>

<script>
import{ auth,db } from '@/services/firebase'
import Cookie from 'js-cookie' 
import cat from '~/mixins/catagories.js'
let recipesRef=db.ref('recipes')
export default {
    name:'app',firebase:{
        recipes:recipesRef
    },
  components: {
   
  },
  mixins: [cat],  
  data(){    
    return {
      selectedCatagory:'',
      user:this.$store.state.users.user||null,
        recipes:{ 
            title:'',
            catagory:'',
            tags:[],
            content:'',            
        },
        search:'',
        datas:{},        
    }
  },
  async created(){ 
    this.loadData()
  },
  mounted(){
     
  },
  computed:{
     
  },
  methods:{
    selectCatagory(){
      this.loadData();
    },
    async add(){
        recipesRef.push(this.blog)
        this.recipes={title:'',content:''}
        //toastr.success('added')
        this.loadData()
        window.scrollTo(0,document.body.scrollHeight);
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
      var mapped=Object.entries(result).map(value=>{
        value[1].key=value[0]
        return value[1]
      })
      console.log(this.selectedCatagory)
      if(this.selectedCatagory!=''){        
       var filtered= mapped.filter(m=>m.catagory==this.selectedCatagory)
       mapped=filtered
      }      

      this.datas=mapped
    },
    goTo(item,index){
      this.$router.push("/admin/recipes/"+item.key)
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
