<template>
  <div class="container">    
    <h3><u>Edit Recipes</u></h3>
    <br><br><br>
    <div v-for="(d,key) in datas" :key="key">
        <form @submit.prevent>
          <a class="pt-2 mb-1">Image :</a><br>
          <img :src="d.img" v-if="d.img" style="max-height:250px;" />
          <br>        
          <input
              type="file"
              accept=".jpeg,.jpg,.png,image/jpeg,image/png"
              aria-label="upload image button" 
              ref="img"
              @change="uploadImg" />

          <br>
            <a class="pt-2 mb-1">Title :</a>
            <b-form-input  v-model="d.title" />

            <a class="pt-2 mb-1">Catagory :</a>
            <b-form-select v-model="d.catagory" :options="catagoriesForSelect()"></b-form-select>

            <a class="pt-2 mb-1">Tags :</a>
            <b-form-tags
              input-id="tags-separators"
              v-model="d.tags"
              separator=" ,;"          
              no-add-on-enter
            ></b-form-tags>

            <a class="pt-2 mb-1">Content :</a>
            <vue-editor v-model="d.content"  style="background:white;color:black;" :use-custom-image-handler="true" @image-added="handleImageAdded" />
            <b-button class="my-2" @click="edit(d)" variant="success">edit</b-button>
            <b-button class="my-2" @click="remove(d)" variant="danger">remove</b-button>
        </form>       
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
        this.datas=[result[this.$route.params.pathMatch]]
      },
      async uploadImg(e){       
          const img=e.target.files[0]
          if(!img.type.includes('image')){
              this.$toast.error('Please select a image file')
              e.target.value=''
          }  
          if(!this.uploading){  
            this.uploading=true
            await this.uploadToStorage(img,this.datas[0])
            this.uploading=false
          }
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
    async uploadToStorage(img,d){
      d.img=null
      var ranName = this.makeid(10);      
      var type =  '.'+img.name.split('.').pop();
      var fullName=this.$dateFns.format(new Date(), 'yyyyMMddHHmmss')+ranName+type

      var storageRef = storage.ref();
      var image = storageRef.child('icon/'+fullName);
      
      image.put(img).then((snapshot) => {
        storageRef.child('icon/'+fullName).getDownloadURL().then((url)=>{
          d.img=url         
        }).catch(err=>{console.log(err)})        
      }).catch(err=>{console.log(err)}) 
              
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
