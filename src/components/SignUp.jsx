import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const form = e.target;
    const formData = new FormData(form);
    const {email, password, Name, photo, ...restFormData} = Object.fromEntries(formData.entries());
    
    createUser(email, password)
      .then(result => {
        const userProfile = {
          email,
          Name,
          photo,
          ...restFormData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        }
        console.log(email, password, userProfile)
       
        fetch('https://server-side-fatemaony.vercel.app/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userProfile)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.insertedId) {
            Swal.fire({
              title: "User added successfully",
              icon: "success",
              draggable: true
            });
          }
        })
        
        console.log(result.user)
        return updateProfile(result.user, {
          displayName: Name,
          photoURL: photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(Name)
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
        
        
        const userProfile = {
          email: result.user.email,
          Name: result.user.displayName,
          photo: result.user.photoURL,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        }
        
        fetch(`https://server-side-fatemaony.vercel.app/users/${result.user.email}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          
          if (!data.exists) {
            return fetch('https://server-side-fatemaony.vercel.app/users', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(userProfile)
            });
          } else {
            
            return fetch(`https://server-side-fatemaony.vercel.app/users/${result.user.email}`, {
              method: 'PATCH',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({ 
                lastSignInTime: result.user?.metadata?.lastSignInTime 
              })
            });
          }
        })
        .then(res => {
          if (res) return res.json();
          return null;
        })
        .then(data => {
          console.log("User data response:", data);
        })
        .catch(err => {
          console.error("Error handling Google user in database:", err);
         
        });
        
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
              name="Name" 
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
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                className="input input-bordered  pr-12" 
                placeholder="Password (at least 6 characters)"
                required
                minLength="6"
                pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                title="Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long"
              />
              <button
                type="button"
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <label className="label">
              <span className="label-text-alt text-xs text-gray-500">
                • Must have an Uppercase letter<br/>
                • Must have a Lowercase letter<br/>
                • Length must be at least 6 characters
              </span>
            </label>
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
          <Link to="/signin" className="text-blue-700 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;