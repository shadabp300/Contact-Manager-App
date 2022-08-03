import React, { useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import "./signup.css"

const  Signup = () => {
    let navigate=useNavigate()

    const [data, setdata]=useState({
        email:"",
        password:"",
        cpassword:""
    })

    const handlesubmit = (e) => {
        e.preventDefault()
        axios({
            method:"POST",
            url:'http://localhost:3003/signup',
            data:data
        }).then((user)=> {
                window.alert(user.data)
                navigate("/")
        }).catch((err)=> {
            window.alert(err.response.data)
        })
    }
    
  return (
    <div>
        <div className='circle'></div>
        <img className='image' src="Group695.png" alt="random"/>
        <div className='signupContainer'>


            <div className='signupContainer2'>
                <h1>LOGO</h1>
                <p>Create New Account</p>
                <form onSubmit={handlesubmit}>
                <input className='forminput' type="email" name="email" placeholder='Enter Your Email' onChange={(e)=> {
                    setdata({...data,email:e.target.value})
                }}/>
                <input className='forminput' type="password" name="password"  placeholder='Enter your Password' onChange={(e)=> {
                    setdata({...data,password:e.target.value})
                }}/>
                <input className='forminput' type="password" name="cpassword"  placeholder='Confirm Password' onChange={(e)=> {
                    setdata({...data,cpassword:e.target.value})
                }}/>
                <input className='formsubmitinput' type="submit"  value="Sign Up"/>
                </form>
            </div>
            
            
        </div>
        <img className='image2' src="Group695.png" alt="random"/>
        <div className='circle2'></div>
    </div>
    
  )
}

export default Signup