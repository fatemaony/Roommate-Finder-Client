import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import signin from "../assets/lottie/signIn.png";
import { Eye, EyeOff, LogIn, Mail, Lock, Loader, LogInIcon } from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

        const userProfile = {
          email: result.user.email,
          Name: result.user.displayName,
          photo: result.user.photoURL,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        fetch(`https://server-side-fatemaony.vercel.app/users/check/${result.user.email}`)
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
          })
          .then(res => res?.json())
          .then(data => {
            console.log("User data response:", data);
          })
          .catch(err => {
            console.error("Error handling Google user in database:", err);
          });

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
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="ps-10 hidden lg:block">
        <motion.img
          src={signin}
          alt="Sign In"
          className="w-96 h-96 drop-shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </div>

      <motion.div
        className="card bg-white w-full max-w-sm mx-auto my-20 shrink-0 shadow-2xl border border-gray-200 rounded-xl"
        whileHover={{ scale: 1.02 }}
      >
        <div className="card-body p-6">
          <h1 className="text-4xl font-extrabold text-center text-secondary mb-4">Sign In</h1>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600 flex items-center gap-2">
                  <Mail size={16} /> Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered pr-12"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600 flex items-center gap-2">
                  <Lock size={16} /> Password
                </span>
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <label className="label">
                <a href="#" className="label-text-alt text-sm text-green-800 hover:underline">Forgot password?</a>
              </label>
            </div>

            <div className="form-control mt-4">
              <button
                className="btn bg-green-900 text-white hover:bg-green-800 w-full shadow-md"
                disabled={loading}
              >
                {loading ? <Loader className="animate-spin" size={18} /> : <LogInIcon size={18} />}
                {loading ? "Signing in..." : "Sign In with Email"}
              </button>
            </div>
          </form>

          <div className="divider text-sm text-gray-500">OR</div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignIn}
            className="btn bg-black text-white w-full hover:bg-gray-800 shadow-md"
            disabled={loading}
          >
            <LogIn size={18} />
            {loading ? "Signing in..." : "Sign In With Google"}
          </motion.button>

          <p className="text-center text-sm mt-5 text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-700 hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;
