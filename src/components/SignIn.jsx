import React from "react";
import { Link } from "react-router";
 const SignIn = ()=>{
  return(
   
    <div className="card bg-base-100 w-full max-w-sm mx-auto my-10 shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl text-center font-bold">Login now!</h1>
        <form className="fieldset">
          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <div>
            <button className="btn w-full bg-black text-white mt-4">Sign In</button>
            <Link to={"/signup"}><button className="btn bg-green-800 text-white w-full mt-2">Sign Up</button></Link>
            <p className="text-center font-semibold pt-2">Or</p>
            <button className="btn w-full bg-black text-white mt-2">Sign In With Google</button>
          </div>
        </form>
      </div>
    </div>
  
  )
 };
 export default SignIn;