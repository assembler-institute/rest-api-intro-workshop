const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt") ;

const userSchema = Schema({
        firstName:{
            type:String,
            required:[true, "We need a name , please"]
        },
        lastName:{
            type:String,
        },
        email:{
            type:String,
            required:[true, "An email is required"],
            unique: true,
            validate:{
                validator: (value) => isEmail(value),
                message: (props) => `The email ${props.value} is not valid` 
            }
              
        },
        password:{
            type:String,
            required:[true, "Please we need a password"]
        },
        firebase_id: {
            type: String,
            unique: true,
          },
          active: {
            type: Boolean,
            default: false,
          }
    },{
        timestamps:true
})
userSchema.statics.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
};
userSchema.statics.comparePassword = async (password,recivePassword)=>{

   const pssExist = await bcrypt.compare(password,recivePassword);
   if(pssExist){
       return password;
   }
};
const User = mongoose.model("User",userSchema );

module.exports = User;