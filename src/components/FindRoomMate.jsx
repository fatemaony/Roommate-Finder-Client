import React from "react";
const FindRoomMate =()=>{
  return(
       <div className="px-5 md:px-24">
      <div className="p-5 md:p-12 text-center space-y-4">
        <h1 className="text-xl  md:text-3xl font-bold">Looking for a roommate!!</h1>
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">

          <label className="label">Location</label>
          <input type="text" name="location" className="input w-full" placeholder="Location" />
       </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">

          <label className="label">Rent Amount</label>
          <input type="text" name="rent" className="input w-full" placeholder="Rent Amount" />
       </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">

          <label className="label">Room Type</label>
          <select defaultValue="Single" className="select bg-white w-full">
             <option disabled={true}>Single</option>
             <option>Shared</option>
         </select>
       </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">

          <label className="label">Lifestyle Preferences</label>
          <select defaultValue="Pets" className="select bg-white w-full">
             <option disabled={true}>Pets</option>
             <option>Smoking</option>
             <option>Night Owl</option>
         </select>
       </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">

          <label className="label">Description</label>
          <input type="text" name="description" className="input w-full" placeholder="Description" />
       </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">

          <label className="label">Previous Location</label>
          <input type="text" name="Previous Location" className="input w-full" placeholder="Previous Location" />
       </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">

          <label className="label">Contact Info </label>
          <input type="text" name="contact" className="input w-full" placeholder="Contact Info " />
       </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
          <label className="label">Availability</label>
          <input type="text" name="Details" className="input w-full" placeholder="Enter coffee details" />
       </fieldset>
       <fieldset className="fieldset bg-base-200  border-base-300 rounded-box  border p-4">
          <label className="label">Email</label>
          <input type="email" name="email" className="input w-full" placeholder="Email" />
       </fieldset>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
          <label className="label">Password</label>
          <input type="password" name="password" className="input w-full" placeholder="Password" />
       </fieldset>
        
       
        </div>
          

       <input type="submit" className="btn w-full my-6 bg-black text-white" value="Find roommate" />
      </form>
    </div>
  )
};
export default FindRoomMate;