var mongoose=require("mongoose");
module.exports = new mongoose.Schema({
    //文章内容
    article:{
        type:String,
        default:""
    },

    // 保存图片的地址
    image:{
        type:String,
        default:""
    },

    //创建时间
    createTime:{
        type:Date,
        default:new Date()
    },

    //修改时间
    updataTime:{
        type:Date,
        default:new Date()
    }
});