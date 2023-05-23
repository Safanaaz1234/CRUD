const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const UserInfo = require("./models/db_model");

app.get("/api/getUser",async(req,res)=>{
    try{
        const result = await UserInfo.find();
        console.log(result);
        return res.json(result);
    }catch(e){
        console.log(e);
    }
})

app.get("/api/getUser/:email",async(req,res)=>{
    try{
        const email = req.params.email;
        const result = await UserInfo.findOne({email:email});
        console.log(result);
        return res.json(result);
    }catch(e){
        console.log(e);
    }
})

app.post("/api/createUser",async(req,res)=>{
    try{
        const User1 = new UserInfo({
            name:req.body.name,
            email:req.body.email,
            age:req.body.age,
            address:req.body.address
        });
        const result = await User1.save();
        console.log(result);
        return res.json({status:"ok",success:true,message:"User created successfully"});
    }catch(err){
        console.log(err);
        return res.json({status:"bad",success:false,message:"User not created"})
    }
})

app.delete("/api/deleteUser/:email",async(req,res)=>{
    try{
        const email = req.params.email;
        const result1 = await  UserInfo.findOneAndDelete({email:email});
        console.log(result1);
        return res.json({success:true,message:"User deleted"});
    }catch(e){
        console.log(e);
        return res.json({success:false,message:"User doesn't exist"});
    }
})

app.patch("/api/updateUser/:email",async(req,res)=>{
    try{
        const email = req.params.email;
        const name = req.body.name;
        const age = req.body.age;
        const address = req.body.address;
        const result = await UserInfo.findOneAndUpdate({email:email},{name:name,age:age,address:address});;
        console.log(result);
        if(result){
            return res.json({success:true,message:"Updated"});
        }else{
            return res.json({success:false,message:"Not Updated"});
        }
    }catch(e){
        console.log(e);
        return res.send(e);
    }
})

app.listen(5000,()=>{
    console.log("listening you at 5000");
})