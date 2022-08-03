const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userInfo = require('../Models/ContactModel')


router.get('/',(req , res)=>{
    
    try{
        
        const auth_id = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        
        userInfo.findOne({userId:auth_id}).then((Data)=>{
          
            res.status(200).send(Data.contact)

        }).catch((err)=>{
            res.status(200).send([])
        })
    }catch(err){
        console.log("Get err")
        res.status(500).send(err.message)
    }
})

// router.post('/add', async (req, res) => {
//     try {
//         const auth_id = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
//         userInfo.find({ userId: auth_id}).then((userData) => {
//             if (userData.length) {
//                 userInfo.updateMany({ userId: auth_id }, { $set: { contact: req.body } }).then(() => {
//                     console.log('Done 2')
//                     res.status(200).send('/')
//                 }).catch((err) => {
//                     res.status(500).send(err)
//                 })
//             }else{
                
//                 userInfo.create({userId: auth_id,contact:req.body}).then(()=>{
//                     console.log('Done 1')
//                     res.status(200).send('Done')
//                 }).catch((err)=>{
//                     res.send(500).send(err)
//                 })
//             }
//         })

//     } catch(err) {
//         res.status(500).send('err')
//     }
// })

router.post("/delete", async (req , res)=>{
    console.log(req.headers.authorization)
    try{

        const auth_id = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        console.log(auth_id)
        await userInfo.updateMany({userId:auth_id},{$pull:{contact:{_id:{$in:req.body}}}}, {multi:true}).then(()=>{
            res.status(200).send('Deleted successfully')
        }).catch((err)=>{
            console.log("hello delete 1")
            res.status(500).send(err.message)
        })
    }catch(err){
        console.log("hello delete 2")
        res.status(500).send(err.message)
    }
})


router.post("/add", async (req, res) => {
    try {
        const auth_id = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        const contactList = await userInfo.find({ userId: auth_id });
        if (contactList.length) {
            console.log(req.body)
            var savedContact = await userInfo.updateMany({ userId: auth_id }, {
                $push: { contact: req.body }
            })
            const list = await userInfo.find({ userId: auth_id });
            let newlist = list[0].contact;
            const newArr = newlist.map((item) => {
                const newObj = Object.assign({}, item, {
                    hiWorld: `${item.name}${item.designation}${item.company}${item.industry}${item.email}${item.phoneNumber}${item.country}`,
                });
                return newObj;
            });
            var uniqueItems = [];
            var duplicateIds = [];
            newArr.forEach((item) => {
                if (uniqueItems.includes(item.hiWorld)) {
                    duplicateIds.push(item._doc._id);
                } else {
                    uniqueItems.push(item.hiWorld);
                    uniqueItems.push(item._doc._id);
                }
            });
            let updated = await userInfo.updateMany({userId:auth_id},{ $pull: { contact: { _id: [...duplicateIds] } } },{multi: true})
        }
        else {
            var savedContact = await userInfo.create({
                contact: req.body,
                userId: auth_id
            });
            const list = await userInfo.find({ userId: auth_id });
            let newlist = list[0].contact;
            const newArr = newlist.map((item) => {
                const newObj = Object.assign({}, item, {
                    hiWorld: `${item.name}${item.designation}${item.company}${item.industry}${item.email}${item.phoneNumber}${item.country}`,
                });
                return newObj;
            });
            var uniqueItems = [];
            var duplicateIds = [];
            newArr.forEach((item) => {
                if (uniqueItems.includes(item.hiWorld)) {
                    duplicateIds.push(item._doc._id);
                } else {
                    uniqueItems.push(item.hiWorld);
                    uniqueItems.push(item._doc._id);
                }
            });
            let updated = await userInfo.updateMany({userId:auth_id},{ $pull: { contact: { _id: [...duplicateIds] } } },{multi: true})
        }
        let finalList = await userInfo.find({ userId: auth_id })
        res.status(200).send(finalList[0].contact)
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
});





module.exports = router;