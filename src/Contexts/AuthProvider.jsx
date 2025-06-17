import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import axios from 'axios';



const provider = new GoogleAuthProvider();


function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  const [ recommender, setRecommender] = useState(null);

const createuser = (email,password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}

const SignInuser = (email,password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email,password);
}

const SignInwithGoogle = () =>
{
  return  signInWithPopup(auth, provider);
}


const updateuser = (updated) => updateProfile(auth.currentUser, updated);
   

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
    // setRecommender(recommender)
            setLoading(false);
            

        if(currentUser?.email){
            const userData = {email : currentUser.email}
axios.post('http://localhost:5000/jwt', userData,{
    withCredentials : true
})
.then (res =>{
    console.log('Token after JWT',res.data)
    // const token = res.data.token;
    // localStorage.setItem('token',token)
})
.catch(error =>{
    console.log(error)
})
        }


        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        recommender,
setRecommender,
        createuser,
        SignInuser,
        SignInwithGoogle,
        updateuser,
        setUser,
        setLoading
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider



// import { createContext, useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";





// {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const logout = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const authInfo = { user, loading, logout };
//   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
// }
