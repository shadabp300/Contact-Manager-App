import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./signin.css"

const  Signin = () => {
    let navigate=useNavigate()

    const [data, setdata]=useState({
        email:"",
        password:"",
    })

    useEffect(()=> {
        const auth=localStorage.getItem('user')
        if (auth) {
            navigate("/table")
        }
    },[])

    const handlesubmit = (e) => {
        e.preventDefault()
        axios({
            method:'POST',
            headers:{
                // auth: localStorage.setItem('user')
            },
            url:"http://localhost:3003/login",
            data:data
        }).then((token)=> {
            console.log('Hello',token.data)
            localStorage.setItem("user",token.data)
            navigate("/table")
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
                <p>Enter your Credentials to access you account</p>
                <form onSubmit={handlesubmit}>
                <input className='forminput' type="email" name="email" placeholder='User ID' onChange={(e)=> {
                    setdata({...data,email:e.target.value})
                }}/>
                <input className='forminput' type="password" name="password"  placeholder='Password' onChange={(e)=> {
                    setdata({...data,password:e.target.value})
                }}/>
                <input className='formsubmitinput signinbutton' type="submit" name="" value="SignIn"/>
                </form>
                <NavLink to="/signup"><h3 className='signup'>Sign Up</h3></NavLink>
            </div>

            
        </div>
        <img className='image2' src="Group695.png" alt="random"/>
        <div className='circle2'></div>
    </div>
    
  )
}

export default Signin