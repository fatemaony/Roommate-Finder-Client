import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;
    
    createUser(email, password)
      .then(result => {
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL || "https://ui-avatars.com/api/?name=" + name
        }).then(() => {
          console.log("Profile updated successfully");
          form.reset();
          
          Swal.fire({
            title: "Account Created Successfully",
            icon: "success",
            draggable: true
          });
          navigate("/");
        });
      })
      .catch(error => {
        console.error("Sign up error:", error);
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
          title: "Signed In Successfully with Google",
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
        <h1 className="text-5xl text-center font-bold">Sign Up</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSignUp} className="fieldset">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input 
              type="text" 
              name="name" 
              className="input input-bordered" 
              placeholder="Full Name"
              required 
            />
          </div>
          
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
              <span className="label-text">Photo URL (Optional)</span>
            </label>
            <input 
              type="text" 
              name="photo" 
              className="input input-bordered" 
              placeholder="Photo URL" 
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
              placeholder="Password (at least 6 characters)"
              required
              minLength="6"
            />
          </div>
          
          <div className="form-control mt-6">
            <button 
              className="btn w-full bg-green-800 text-white" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
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
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;