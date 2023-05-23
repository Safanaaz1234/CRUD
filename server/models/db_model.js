const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myProject123",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected");
}).catch((error)=>{
    console.log(error);
});

const Info = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    }
})

const UserInfo = mongoose.model("UserInfo",Info);
module.exports = UserInfo;
