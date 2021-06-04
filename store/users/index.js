import Cookie from 'js-cookie';
import {auth,db} from '@/services/firebase';
export const state = ()=>({
    user:null
});

export const mutations = {
    SET_USER: (state,account)=>{
        state.user=account;
    }
}

export const actions={
    async login({commit},account){
        try{
            //Login firebase
            await auth.signInWithEmailAndPassword(account.email , account.pw);

            //get token and store to cookie
            const token = await auth.currentUser.getIdToken();            
            Cookie.set('access_token',token);
            
            //set local
            
            const {email,uid,displayName}=auth.currentUser; 
                        
            commit('SET_USER',{email,uid,displayName});
        }catch(error){
            throw error;
        }
               
    },
    async register({commit},account){
        try{
            //Login firebase
            await auth.createUserWithEmailAndPassword(account.email , account.pw).then(async (userCred)=>{
                await userCred.user.updateProfile({
                    displayName: account.displayName
                }).then(async function() {
                    // Update successful.
                    await auth.signInWithEmailAndPassword(account.email , account.pw);
                    const token = await auth.currentUser.getIdToken();            
                    Cookie.set('access_token',token);                    
                    //set local                    
                    const {email,uid,displayName}=auth.currentUser;
                    let userRef= await db.ref().child('users');  
                    console.log({email,uid,displayName})
                    await userRef.push({email,uid,displayName}) 
                    commit('SET_USER',{email,uid,displayName});
                })        
            });
            
           
            
        }catch(error){
            throw error;
        }
               
    }, 
    async updateInfo({commit},account){        
        try{
            
            var user=auth.currentUser  

            await auth.signInWithEmailAndPassword(account.email , account.pw);
           
            var token = await auth.currentUser.getIdToken();            
            Cookie.set('access_token',token);           

            await user.updateProfile({
                displayName: account.displayName             
              }).then(function() {
                // Update successful.
              }).catch(function(error) {
                // An error happened.
              }); 
            if(account.newpw && account.newpw!=null){
                await user.updatePassword(account.newpw).then(function() {
                    // Update successful.
                    account.pw=account.newpw
                  }).catch(function(error) {
                    // An error happened.
                  });
            }
            await Cookie.remove('access_token')
            await auth.signOut()     
            await auth.signInWithEmailAndPassword(account.email , account.pw);
            token = await auth.currentUser.getIdToken(); 
            Cookie.set('access_token',token);
            const {email,uid,displayName}=user;   
            console.log(displayName)         
            commit('SET_USER',{email,uid,displayName});
        }catch(error){
            throw error;
        }
               
    }, 
    
}