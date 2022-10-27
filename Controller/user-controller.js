const UserModel = require("../Model/users")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

exports.signUp = (req,res) => {
    console.log(req.body);
    const encryptedPswd = bcrypt.hashSync(req.body.password,10);
    const user = new UserModel({
        name:req.body.name,
        email:req.body.email,
        hash_password:encryptedPswd
    });
    user.save().then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    })
}

exports.getAllUser = (req,res,next) =>{
    if(req.user){
        next();
    }
    else{
        res.status(401).json({message:"Token Authentication Fails...!"})
    }
    const user = UserModel;
    user.find().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
}

exports.login = (req,res) =>{

    const email = req.body.email;

    UserModel.findOne({email:email},(err,user) => {
        if(err){    throw err;  }
        if(!user || !user.comparePassword(req.body.password)){
            res.status(401).json({message:"Authentication Fails...!"})
        }
        else{
            

            return res.status(200).json(
                {
                    message:"Successfully Logined in.",
                    email:user.email,
                    name:user.name,
                    token:jwt.sign(
                        {
                            email:user.email,
                            name:user.name,
                            _id:user._id
                        },
                        "qwertyuiop"
                    )
                }
            )
        }
    });
}