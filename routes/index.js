
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { formname: 'Express' });
};

exports.apilist = function(req,res){
	var api_model = require('../models/api');
	api_model.getallapi(function(data){
		res.render('api', { formname: 'API List', data : data.data });
	});
	
};

exports.getparambyapi = function(req,res){
	var api_model = require('../models/api');
	var apiid = req.query.apiid;
	
	api_model.getparambyapi(apiid,function(data){
		//console.log(data);
		res.render('api_param',{data : data.data});
	});
};