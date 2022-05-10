const jwt = require("jsonwebtoken");

function checkAuth(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];// bearer #@fqfsd~"é"@$$
        const decodedToken = jwt.verify(token)
    }catch{

    }

}
