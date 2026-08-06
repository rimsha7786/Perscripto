import React from 'react'
import { assets } from '../../assets/assets'
const AddDoctor = () => {
  return (
   <form>
    <p>Add Doctor</p>
    <div>
      <label htmlFor="doc-img">
        <img src={assets.upload_area}/>

      </label>
      <input type = "file" id="doc-img" hidden/>
      <p>Upload doctor <br/>picture</p>
    </div>
    <div>
      <div>
        <div>
          <p>Doctor Name</p>
          <input type="text" placeholder="Name" required/>
        </div>
         <div>
          <p>Doctor Email</p>
          <input type="email" placeholder="Email" required/>
        </div>
        <div>
          <p>Doctor Password</p>
          <input type="password" placeholder="Password" required/>
        </div>
        <div>
          <p>Experience</p>
          <select>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="4 Years">4 Years</option>
            <option value="5 Years">5 Years</option>
            <option value="6 Years">6 Years</option>
            <option value="7 Years">7 Years</option>
            <option value="8 Years">8 Years</option>
            <option value="9 Years">9 Years</option>
            <option value="10 Years">10 Years</option>
          </select>
        </div>
        <div>
          <p>Fees</p>
          <input type ="number" placeholder="Fees" required/>
        </div>
      </div>
      <div>
        <div>
          <p>Speciality</p>
          <select name="" id="">
            <option value="General Physician">General Physician</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
         <option value="Gynecologist">Gynecologist</option>
          </select>

        </div>
<div>
          <p>Education</p>
          <input type ="text" placeholder="Education" required/>
        </div>
<div>
  <p>Address</p>
  <input type="text" placeholder="Address" required/>
</div>

      </div>
    </div>
   </form>
  )
}

export default AddDoctor;