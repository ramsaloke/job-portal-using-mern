import mongoose from "mongoose";
import bcrypt from  "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minLength:[3,"Name must containe atleast 3 characters"],
        maxLength:[30,"Name cannot exceed 30 charactrs"],
        select:false

    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail, "please provide valid email"]
    },
    phone:{
        type:String,
        required:true,

    },
    address:{
        type:String,
        required:true,

    },
    niches:{
        firstNiche:String,
        secondNiche: String,
        thirdNiche: String
    },
    password:{
        type:String,
        required: true,
        minLength:[8, "password atleast contain 8 characters"],
        maxLength:[8, "password cannot exceed 32 characters"]

    },
    resume:{
        public_id:String,
        url:String,

    },
    coverLetter:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum: ["Job Seeker", "Employer"]

    },
    createdAt:{
        type:Date,
        default: Date.now,
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

export const User = mongoose.model("User", userSchema)