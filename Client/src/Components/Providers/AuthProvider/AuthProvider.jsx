
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,} from "firebase/auth";
import app from '../../Firebase/Firebase.config';

 export const AuthContext=createContext(null)
 const auth = getAuth(app);
const AuthProvider = ({children}) => {


    // create new account
   const createUser=(email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password);
   }

//    SignIN
    const signIn=(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const authInfo = {
        createUser,
        signIn
        
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;