import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
//fields go here

name :{
    type : "string",
    required :true,
},
email : {
    type:"string",
    required : true,
    unique: true,
},
password:{
    type :"string",
    required : true, 
},
role: {
    type : "string",
    default : "user",
},
},
{
    timestamps : true,
}
);


const User = mongoose.model("User", userSchema);

export default User;