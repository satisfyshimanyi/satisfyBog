var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var saveArticle=require("../models/saveArticle");

/* GET home page. */
router.get('/', function(req, res, next) {
    var limit=4;
    var sortName="createTime";
    var sord="desc";
    var sort={};
    sort[sortName]=sord;
    var page=1;
    var skip = (page - 1) * limit;
    var count = 0;
    var total = 0;
    saveArticle.find().count().then(function(count){
        count = count;
        total = Math.ceil(count / limit);
        page = Math.min(page, total);
        page = Math.max(page, 1);
        saveArticle.find().sort(sort).limit(limit).skip(skip).then(function(data){
            var data=JSON.stringify(data);
            if(data){
                res.render('index',{
                    title:"史满意博客",
                    data:data,
                    count: count,
                    total: total,
                    success:"true"
                });
            }else{
                res.render('index',{
                    title:"史满意博客",
                    success:"fail"
                });
            }
        }).catch(function(err){
            if(err){
                res.jsonp({
                    success:"fail"
                });
            }
        });
    });
});

module.exports = router;
