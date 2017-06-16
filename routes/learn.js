var express = require('express');
var router = express.Router();
var saveArticle=require("../models/saveArticle");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('learn');
});


//保存文章

router.post("/saveArticle",function(req,res,next){
    var article=req.body.article;
    console.log(article);
    var newArticle=new saveArticle({
        article:article
    }).save(function(err,data){
        if(!err){
            console.log("保存成功");
            res.jsonp({
                success:true,
                data:data
            });
        }else{
            console.log("保存失败");
            res.jsonp({
               success:false,
                data:null
            });
        }
    }).catch(function(err){
        if(err){
            console.log(err.toString());
            res.jsonp({
                data:err.toString()
            });
        }
    });
});


router.post("/showArticle",function(req,res,next){
    console.log("87777777777777777777");
});


module.exports = router;