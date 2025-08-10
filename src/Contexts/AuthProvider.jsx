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
axios.post('https://product-reco-server.vercel.app/jwt', userData,{
    withCredentials : true
})
.then (res =>{

    // const token = res.data.token;
    // localStorage.setItem('token',token)
})
.catch(error =>{
 
})
        }


        });
        return () => unsubscribe();
    }, []);



const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Apply theme to <html> tag
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);









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
        setLoading,
         setTheme,
    theme
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
