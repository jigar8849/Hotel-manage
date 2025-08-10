const userModel = require("../models/User")
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")

module.exports.registerController = async(req,res)=>{
    
    try{
        const {name, email, password} = req.body;
         if(!email || !password){
            return res.status(400).json({error: "Email and password are required"});
         }
         const user = await userModel.findOne({email});
         if(user){
            return res.status(400).json({error: "User already exists"});
         }

         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         const newUser = await userModel({
            name,
            email,
            password : hashedPassword,
         }).save();

         return res.status(200).send({
            success : true,
            message : "User has been register"
         })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Problem in register API"
        })
    }
}

module.exports.loginController = async(req,res)=>{

    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error : "All feilds are required"
            })
        }
         
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                error : "Invalid user details"
            })
        }

        const isMatch =  bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                error : "Invalid password"
            })
        }

        const token = JWT.sign({id : user._id}, process.env.JWT_SECRET,{expiresIn : "7d"});

        return res.status(200).send({
            success : true,
            message : "Login successful",
            token,
            user : {
                id : user._id,
                email : user.email,
                role : user.role
            }
        })

         
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Problem in login API"
        })
    }
}