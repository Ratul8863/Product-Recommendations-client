import React, { useContext, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import Lottie from 'lottie-react';
import lottieSignin from '../assets/SignInSpiderman.json'
import { Link, useNavigate } from 'react-router';
function Login() {
    const {SignInuser}=useContext(AuthContext)
    const [error, setError] = useState("");
  const navigate = useNavigate();
 const handleSignin = e =>{
         e.preventDefault();
          const form = e.target;
          const email =form.email.value;
          const password =form.password.value;
          console.log(email,password)

         SignInuser(email,password)
.then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    // navigate(from)
      navigate("/");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
     setError(errorMessage);
    // ..
  });

 }
  return (
    <>

  <div className="hero  min-h-screen">
  <div className="hero-content flex-col-reverse lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <Lottie className='w-80' animationData={lottieSignin} loop={true} />

      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Sign In now!</h1>
        {/* <SignInWithGoogle from={from}></SignInWithGoogle> */}
        <form action="" onSubmit={handleSignin}>

<fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button type='submit' className="btn btn-neutral mt-4">Sign In</button>
        </fieldset>


        </form>



         {error && <p className="text-red-500 mt-3">{error}</p>}

      <p className="mt-4 text-center">
        Don't have an account? <Link to="/register" className="text-blue-600">Register here</Link>
      </p>
        
      </div>
    </div>
  </div>
</div>

    
   

      {/* <button  className="btn btn-outline w-full mt-4">Continue with Google</button> */}

     
   
    </>
    
  )
}

export default Login