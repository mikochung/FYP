import JWTDecode from 'jwt-decode';
import cookieparser from "cookieparser";
import {db} from '@/services/firebase';
export const actions = {
    async nuxtServerInit({commit},{req}){
        if(process.server && process.static) return;
        if(!req.headers.cookie) return;

        const parsed = cookieparser.parse(req.headers.cookie);
        const accessTokenCookie = parsed.access_token;
        if(!accessTokenCookie) return;
        const decoded = JWTDecode(accessTokenCookie); 
        var result={}
        let adminRef= db.ref().child('admins');   
        await adminRef.get().then((snapshot) => {
            if (snapshot.exists()) {
              result=snapshot.val()
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
          let isAdmin=false;
          for(const [key, value] of Object.entries(result)){
            if(value==decoded.user_id){
              isAdmin=true
            }
          }          
        if(decoded){
            commit('users/SET_USER',{
                uid:decoded.user_id,
                email:decoded.email,
                name:decoded.name,
                admin:isAdmin
            })
          
        }
    }
}