<template>
  <div class="container">

    <h3><u>Manager Recipes</u></h3>
    <br><br><br>      
        <b-button @click="$router.push('/admin/recipes/add')">add recipes</b-button><br><br>
        <a class="pt-2 mb-1">Select Catagory :</a>
        <b-form-select v-model="selectedCatagory" :options="catagoriesForSelect([],true)" @change="selectCatagory"></b-form-select>

        <b-table class="table mt-5" striped hover :busy="!datas" :items="datas" :fields="fields" @row-clicked="goTo">
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>

          <template #cell(img)="data">
            <img :src="data.value" class="image" />
          </template>

          

        </b-table>

      
        
    
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
  layout: 'admin',
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
        fields: [          
          {
            key: 'img',
            label: 'Image',
            sortable: false
          },
          {
            key: 'title',
            label: 'Title',
            sortable: true
          },
          {
            key: 'catagory',
            label: 'Catagory',
            sortable: true
          },
          {
            key: 'tags',
            label: 'Tags',
            sortable: false,
          },
          {
            key: 'createdAt',
            label: 'Created At',
            sortable: true,
          },
        ],
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
