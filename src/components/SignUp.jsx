import React from "react";
import { Link } from "react-router";
const SignUp=()=>{
  return(
       <div className="card bg-base-100 w-full max-w-sm mx-auto my-10 shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl text-center font-bold">Sign Up now!</h1>
        <form className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="name" className="input" placeholder="Name" />
          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />
          <label className="label">Photo</label>
          <input type="text" name="photo" className="input" placeholder="Photo URL" />
          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          
          <div>
            <Link to={"/signin"}><button className="btn bg-green-800 text-white w-full mt-2">Sign In</button></Link>
            <p className="text-center font-semibold pt-2">Or</p>
            <button className="btn w-full bg-black text-white mt-2">Sign In With Google</button>
          </div>
        </form>
      </div>
    </div>
  )
};
export default SignUp;