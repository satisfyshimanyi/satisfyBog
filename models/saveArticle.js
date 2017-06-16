var mongoose = require('mongoose');
var saveArticleSchema = require('../schemas/saveArticle');

module.exports =mongoose.model('saveArticle',saveArticleSchema);