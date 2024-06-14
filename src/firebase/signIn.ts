import { signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "./firebaseAuth";

export default async function signIn(email:string,password:string) {
    let result = null;
     
      try{
        result =await  signInWithEmailAndPassword(auth,email,password);
        const accesstoken=await auth.currentUser?.getIdToken();
        fetch("/api/session",{method:"POST",body:JSON.stringify({idToken:accesstoken})})
        .then((data)=>{
          console.log(data)
            signOut(auth)
            window.location.assign('/home');
        })
        .catch((error)=>console.log(error))
        
  
      }catch(e:any){ 
       
         return ({error:e.code.substr(5,)}) 

      }
}




