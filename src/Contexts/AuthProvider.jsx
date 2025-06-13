import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';



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



   

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
    setRecommender(recommender)
            setLoading(false);
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
        SignInwithGoogle
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
