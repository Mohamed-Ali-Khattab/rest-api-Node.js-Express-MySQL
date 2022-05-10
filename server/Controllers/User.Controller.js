const  models =require ("../models");
const bcryptjs = require ("bcryptjs");
const jwt = require("jsonwebtoken");
function Register (req,res) {

    models.User.findOne({where:{email:req.body.email}}).then(result =>{
        if (result){
            res.status(409).json({
                message:"E-mail already exist",
            });
        }
        else{

             //hash password in database
        bcryptjs.genSalt(10,function(err,salt){
        bcryptjs.hash(req.body.password,salt,function(err,hash){

            const user = {
                name:req.body.name,
                email:req.body.email,
                password:hash
            }
            models.User.create (user).then(result => {
                res.status(201).json({
                    message:"user created successfully",
                    post:result
                  })
        
            }).catch(error => {
                    res.status(500).json({
                    message:"something went wrong",
                    error:error
                  })
            });
        });//salt random string to the password to be much harder
    });

        }

    }).catch(error=>{
        res.status(500).json({
            message:"something went wrong",
            error:error
          })

    })
      
} 
function Login (req,res){

    models.User.findOne({where:{email:req.body.email}}).then(user =>{

        if(user === null) {
            res.status(401).json({
                message:"Invalid credentials ! ",
            });
        }
        else {
            bcryptjs.compare(req.body.password,user.password,function(err,result){

                if (result){
                    const token= jwt.sign({
                        email:user.email,
                        userId:user.id
                    },'secret',function(err,token){
                        res.status(200).json({
                            message:"authentification successfully",
                            token:token
                        });

                    });
                }
                else{
                    res.status(500).json({
                        message:"something went wrong ",
                    })
                }
            })
        }
    })

}
module.exports ={
    Register:Register,
    Login:Login
    }