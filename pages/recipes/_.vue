<template>
  <div class="container"> 
    <div class="py-3">   
        <h3><u>{{datas.title}}</u></h3>
        by {{datas.auth}} <br>
        created at {{datas.createdAt}}
        <br><br><br>
        
        <img :src="datas.img"  style="max-height:50vh;max-width:100%;" />
    <div v-html="datas.content" />
    </div>
  </div>
</template>

<script>
import{ auth,db,storage } from '@/services/firebase'
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
       user:this.$store.state.users.user||null,
      uploading:false,
      uploadedImg:null,
        recipes:{ 
            title:'',
            catagory:'',
            img:'',
            tags:[],
            content:'',
            createdAt: this.$dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss')        
        },
        datas:{},
        key:this.$route.params.pathMatch||null
    }
  },
  async created(){ 
    this.loadData()
  },
  computed:{
     
  },
  methods:{  
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
        this.datas=result[this.$route.params.pathMatch]
      },      
  }
}
</script>

<style scoped>

</style>
