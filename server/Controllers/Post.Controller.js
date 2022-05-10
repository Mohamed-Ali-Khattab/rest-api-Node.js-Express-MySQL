const  models =require ("../models");
const validator = require ("fastest-validator");

  function ajouterpost (req,res) {
    const post = {
        title:req.body.title,
        content:req.body.content,
        imageURL:req.body.imageURL,
        categoryId:req.body.categoryId,
        userId:1
    }

    const schema = {
      title:{type:"string",optional:false,max:"100"},
      content:{type:"string",optional:false,max:"500"},
      categoryId:{type:"number",optional:false},
    }

    const v = new validator();
    const validationResponse=v.validate(post,schema);
    if (validationResponse !==true){
      return res.status(400).json({
        message:"validation failed",
        error:validationResponse
      })
    }

    models.Post.create(post).then(result => {
        res.status(200).json({
          message:"post created successfully",
          post:result
        })
    }).catch(error => {
      res.status(500).json({
        message:"something went wrong",
        error:error
      })
    });
  }
function findpostbyid(req,res){
  const id = req.params.id;
  models.Post.findByPk(id).then(result => {
    if (result){
      res.status(200).json(result)
    }
    else{
      res.status(500).json({
        message:"Post dose'nt exist"
      })
    }
}).catch(error => {
  res.status(500).json({
    message:"something went wrong",
    error:error
  })
});
}

function showallposts(req,res){
  models.Post.findAll().then(result => {
    if (result){
      res.status(200).json(result)
    }
    else{
      res.status(500).json({
        message:"there is no post"
      })
    }
}).catch(error => {
  res.status(500).json({
    message:"something went wrong",
    error:error
  })
})
}
function updatepost(req,res){
  const id = req.params.id;
  const updatedpost = {
    title:req.body.title,
    content:req.body.content,
    imageURL:req.body.imageURL,
    categoryId:req.body.categoryId,
}
const userId=1;
const schema = {
  title:{type:"string",optional:false,max:"100"},
  content:{type:"string",optional:false,max:"500"},
  categoryId:{type:"number",optional:false},
}

const v = new validator();
const validationResponse=v.validate(updatedpost,schema);
if (validationResponse !==true){
  return res.status(400).json({
    message:"validation failed",
    error:validationResponse
  })
}

  models.Post.update(updatedpost , {where : {id:id,userId:userId}}).then(result => {
    if (result){
      res.status(200).json({
        message:"post updated",
        post:result
        
      })
    }
    else{
      res.status(500).json({
        message:"Post dose'nt exist"
      })
    }
 
}).catch(error => {
  res.status(500).json({
    message:"something went wrong",
    error:error
  })
})

}
function deletepost(req,res){
  const id = req.params.id;
  const userId=1;
  models.Post.destroy({where : {id:id,userId:userId}}).then(result => {

    if (result){
      res.status(200).json({
        message:"post deleted successfully", 
      })
    }
    else{
      res.status(500).json({
        message:"Post dose'nt exist"
      })
    }   
}).catch(error => {
  res.status(500).json({
    message:"something went wrong",
    error:error
  })
})

}

module.exports={
    ajouterpost:ajouterpost,
    findpostbyid:findpostbyid,
    showallposts:showallposts,
    updatepost:updatepost,
    deletepost:deletepost
  }