const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const cors=require("cors")
const bcrypt=require("bcryptjs")
const jwt = require('jsonwebtoken')
const Model=require('./Models/signupschema')
const contactRoute = require('./Router/user-router')
const { JsonWebTokenError } = require('jsonwebtoken')

let DB=process.env.Database
let port=process.env.PORT || 3003

mongoose.connect(DB).then(()=> {
    console.log('Database Connected')
});

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.post("/signup",(req,res)=> {
    let {email, password, cpassword}=req.body

    if (!email || !password || !cpassword) {
        return res.status(400).send('Please Fill the Field')
    }

    Model.findOne({email:email}).then((exist)=> {
        if(exist) {
            return res.status(400).send("User Already Exist")
        }
        else {
            if (password==cpassword) {
                bcrypt.hash(password,10).then((hashpassword)=> {
                    Model.create({
                        email:email,
                        password:hashpassword
                    }).then((data)=> {
                        res.status(200).send("User Successfully Created")
                    })
                })
            }
            else {
                return res.status(400).send("Password Mismatch")
            }
        }
    })
})


app.post('/login',(req, res)=> {
    let { email, password}=req.body

    if (!email || !password) {
        return res.status(400).send("Please Fill Your Login Details")
    }

    Model.findOne({email:email}).then((exist)=>{
    
        if (exist) {
            bcrypt.compare(password,exist.password).then((check)=> {
                if (check){
                    const token = jwt.sign(exist.email , process.env.SECRET_KEY)
                    res.status(200).send(token)
                }else {
                    return res.status(400).send("Invalid User Credentials")
                }
            })
        }else {
            return res.status(400).send("User Does Not Exist")
        }
    })
})


app.listen(port, ()=> {
    console.log(`App Listening at ${port}`)
})


app.use('/user',contactRoute)