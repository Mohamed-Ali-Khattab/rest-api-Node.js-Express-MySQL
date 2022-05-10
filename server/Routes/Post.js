const express =require ("express");
const postcontroller = require ("../Controllers/Post.Controller");
const router = express.Router();
router.post("/addpost",postcontroller.ajouterpost);
router.get("/showallpost",postcontroller.showallposts);
router.patch("/updatepost/:id",postcontroller.updatepost);
router.get("/findpost/:id",postcontroller.findpostbyid);
router.delete("/deletepost/:id",postcontroller.deletepost);
module.exports=router;