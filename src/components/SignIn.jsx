import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    signInUser(email, password)
      .then(result => {
        console.log("Signed in successfully:", result.user);
        form.reset();

        Swal.fire({
        title: "Sign In Successfully",
        icon: "success",
        draggable: true
       });
        navigate("/");
      })
      .catch(error => {
        console.error("Sign in error:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setError("");
    setLoading(true);
    
    signInWithGoogle()
      .then(result => {
        console.log("Google sign in successful:", result.user);
        Swal.fire({
        title: "Logged in Successfully",
        icon: "success",
        draggable: true
});
        navigate("/"); 
      })
      .catch(error => {
        console.error("Google sign in error:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
   
  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto my-10 shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl text-center font-bold">Login now!</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleEmailSignIn} className="fieldset">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              name="email" 
              className="input input-bordered" 
              placeholder="Email"
              required 
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input 
              type="password" 
              name="password" 
              className="input input-bordered" 
              placeholder="Password"
              required 
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          
          <div className="form-control mt-6">
            <button 
              className="btn w-full bg-green-900 text-white" 
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In with Email"}
            </button>
          </div>
        </form>
        
        <div className="divider">OR</div>
        
        <button 
          onClick={handleGoogleSignIn} 
          className="btn w-full bg-black text-white"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In With Google"}
        </button>
        
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;