<template>
  <div class="container">
    {{$route.params.pathMatch}}
    <h3><u>ADD Recipes</u></h3>
    <br><br><br>
    <form @submit.prevent>

        <a class="pt-2 mb-1">Image :</a><br>
        <img :src="recipes.img" v-if="recipes.img" style="max-height:250px;" />
        <br>        
        <input
            type="file"
            accept=".jpeg,.jpg,.png,image/jpeg,image/png"
            aria-label="upload image button" 
            ref="img"
            @change="uploadImg" />

        <br>
        <a class="mt-3 mb-1">Title :</a>
        <b-form-input  v-model="recipes.title" />

        <a class="mt-3 mb-1">Catagory :</a>
        <b-form-select v-model="recipes.catagory" :options="catagoriesForSelect()"></b-form-select>

        <a class="mt-3 mb-1">Tags :</a>
        <b-form-tags
          input-id="tags-separators"
          v-model="recipes.tags"
          separator=" ,;"          
          no-add-on-enter
        ></b-form-tags>

         <a class="pt-2 mb-1">Content :</a>
        <vue-editor v-model="recipes.content" style="background:white;color:black;" :use-custom-image-handler="true" @image-added="handleImageAdded" />

        <b-button class="my-2" @click="add" variant="info">Add</b-button>
    </form>
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
  layout: 'admin',
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
        datas:{}
    }
  },
  async created(){ 
    this.loadData()
  },
  computed:{
     
  },
  methods:{
      async add(){          
          for(const key in this.recipes){
              if(!this.recipes[key]||this.recipes[key]==''||this.recipes[key]==[]){
                  console.log(key)
                  this.$toast.error('Please input all field')
                  return
              }
          }
          this.recipes.createdAt =  this.$dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss')  
          this.recipes.auth=this.user.name
          recipesRef.push(this.recipes)
          this.recipes={ 
            title:'',
            catagory:'',
            img:'',
            tags:[],
            content:'',
            createdAt: this.$dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss')                          
        },
        this.$refs.img.value=''
        this.$toast.success('add recipes successed')          
               
      },
      async edit(d,key){
            var newVal=d
            var updates = {};
            updates[key] = newVal
            recipesRef.update(updates)
            this.loadData()
      },
      async remove(d,key){            
            var updates = {};
            updates[key] = null
            recipesRef.update(updates)
            this.loadData()
      },
      log(msg){
          console.log(msg)
          return true
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
      },
      async uploadImg(){
        if(!this.$refs.img.files[0]) return
          const img=this.$refs.img.files[0]
          if(!img.type.includes('image')){
              this.$toast.error('Please select a image file')
              this.$refs.img.value=''
          }  
          if(!this.uploading){  
            this.uploading=true
            await this.uploadToStorage(img)
            this.uploading=false
          }
      },
    toBase64(file){        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);    
        })
    },   
    makeid(length) {
      var result           = [];
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
        charactersLength)));
      }
      return result.join('');
    },
    async uploadToStorage(img){
      var ranName = this.makeid(10);      
      var type =  '.'+img.name.split('.').pop();
      var fullName=this.$dateFns.format(new Date(), 'yyyyMMddHHmmss')+ranName+type

      var storageRef = storage.ref();
      var image = storageRef.child('icon/'+fullName);
      
      image.put(img).then((snapshot) => {
        storageRef.child('icon/'+fullName).getDownloadURL().then((url)=>{
          this.recipes.img=url         
        })        
      })
              
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader){     
      var ranName = this.makeid(10);      
      var type =  '.'+file.name.split('.').pop();
      var fullName=this.$dateFns.format(new Date(), 'yyyyMMddHHmmss')+ranName+type
      var storageRef = storage.ref();
      var image = storageRef.child('image/'+fullName);

      image.put(file).then((snapshot) => {
        storageRef.child('image/'+fullName).getDownloadURL().then((url)=>{  
          console.log("uploading")        
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();         
        })        
      })     
    },
  }
}
</script>

<style scoped>

</style>
