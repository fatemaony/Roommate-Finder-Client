import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Eye, EyeOff, User, Mail, ImagePlus, Lock, LogIn, Loader } from "lucide-react";
import signUp from "../assets/lottie/sinUp.json";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

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
    const { email, password, Name, photo, ...restFormData } = Object.fromEntries(formData.entries());

    createUser(email, password)
      .then(result => {
        const userProfile = {
          email,
          Name,
          photo,
          ...restFormData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        fetch('https://server-side-fatemaony.vercel.app/users', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(userProfile)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              Swal.fire({
                title: "User added successfully",
                icon: "success",
                draggable: true
              });
            }
          });

        return updateProfile(result.user, {
          displayName: Name,
          photoURL: photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(Name)}`
        }).then(() => {
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
        const userProfile = {
          email: result.user.email,
          Name: result.user.displayName,
          photo: result.user.photoURL,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        fetch(`https://server-side-fatemaony.vercel.app/users/${result.user.email}`)
          .then(res => res.json())
          .then(data => {
            if (!data.exists) {
              return fetch('https://server-side-fatemaony.vercel.app/users', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userProfile)
              });
            } else {
              return fetch(`https://server-side-fatemaony.vercel.app/users/${result.user.email}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ lastSignInTime: result.user?.metadata?.lastSignInTime })
              });
            }
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
    <motion.div
      className="flex flex-col py-20 lg:flex-row justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <Lottie animationData={signUp} loop={true} />
      </div>

      <motion.div
        className="card w-full max-w-sm shadow-2xl border bg-white rounded-xl"
        whileHover={{ scale: 1.02 }}
      >
        <div className="card-body p-6">
          <h1 className="text-4xl text-center font-bold text-secondary mb-4">Sign Up</h1>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="form-control">
              <label className="label text-sm text-gray-600 flex gap-2 items-center">
                <User size={16} /> Name
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
              <label className="label text-sm text-gray-600 flex gap-2 items-center">
                <Mail size={16} /> Email
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-control">
              <label className="label text-sm text-gray-600 flex gap-2 items-center">
                <ImagePlus size={16} /> Photo URL (optional)
              </label>
              <input
                type="text"
                name="photo"
                className="input input-bordered"
                placeholder="https://..."
              />
            </div>

            <div className="form-control">
              <label className="label text-sm text-gray-600 flex gap-2 items-center">
                <Lock size={16} /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered pr-12"
                  placeholder="Use Strong Password"
                  required
                  minLength="6"
                  pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                  title="Password must contain uppercase, lowercase, and be at least 6 characters"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="mx-2" size={18} /> : <Eye className="mx-2" size={18} />}
                </button>
              </div>
            </div>

            <div className="form-control">
              <button
                className="btn bg-green-900 text-white hover:bg-green-800 w-full shadow-md"
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader className="animate-spin" size={18} /> : <LogIn size={18} />}
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="divider text-sm text-gray-500">OR</div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleSignIn}
            className="btn w-full bg-black text-white hover:bg-gray-800 shadow-md"
            disabled={loading}
          >
            <LogIn size={18} />
            {loading ? "Signing in..." : "Sign In with Google"}
          </motion.button>

          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/signin" className="text-green-700 hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
