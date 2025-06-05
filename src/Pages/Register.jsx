import { useContext, useState } from "react";
import lottieregister from '../assets/Register.json'
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import Lottie from "lottie-react";

export default function Register() {
  const { createuser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    createuser(email, password)
      .then((res) => {
        // updateUserProfile({ displayName: name, photoURL }).then(() => {
          
        // });
        const user = res.user;
         console.log(user)
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (



<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <Lottie className='w-80' animationData={lottieregister} loop={true} />

      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body text-center">
        <h1 className="text-5xl font-bold">Sign Up now!</h1>

        {/* <SignInWithGoogle></SignInWithGoogle> */}
        <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" required />
        <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered w-full" required />
        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
        <button type="submit" className="btn btn-success w-full">Register</button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}

     <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
     </p>
        
      </div>
    </div>
  </div>
</div>



    // <div className="max-w-md mx-auto p-6 shadow rounded mt-10 bg-white">
    //   <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      

    //   {error && <p className="text-red-500 mt-3">{error}</p>}

    //   <p className="mt-4 text-center">
    //     Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
    //   </p>
    // </div>
  );
}
