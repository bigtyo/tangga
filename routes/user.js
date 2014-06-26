
/*
 * GET users listing.
 */
var user_model = require('../models/user');


exports.list = function(req, res){
  res.send("respond with a resource");
  
};

exports.register = function(req,res){
	var username = req.body.username;
	var password = req.body.md5pass;
	var email = req.body.email;
	var name = req.body.name;
	var type = req.body.type;
	
	var protocol = req.protocol;
	var json = {};
	if(protocol !== "https"){
		json.status = 303;
		json.message = "protocol error";
		res.send(JSON.stringify(json));
	}else{
		user_model.register(username,name,password,email,type,function(data){
			res.send(JSON.stringify(data));
		});
		
	}
	
};

exports.changepassword = function(req,res){
	var oldpass = req.body.oldpassword;
	var newpass = req.body.newpassword;
	var userid  = req.body.userid;
	
	
	var protocol = req.protocol;
	var json = {};
	var insert = "";
	if(protocol !== "https"){
		json.status = 303;
		json.message = "protocol error";
		json.error = "this action needs secure connection (https).";
		res.send(JSON.stringify(json));
	}else{
		user_model.changePassword(userid,oldpass.newpass,function(data){
			res.send(JSON.stringify(data));
		});
	}
};


exports.login = function(req,res){
	var json = {};
	var protocol = req.protocol;
	if(protocol !== "https"){
		json.status = 303;
		json.message = "protocol error";
		res.send(JSON.stringify(json));
	}else{
		var lastpage = req.session.lastpage;
		//if(lastpage == "/login"){
			//res.redirect("/home");
		//}else{
			res.render('login', { formname: 'Login', id : 'login' });
		//}
		
		req.session.lastpage = "/login";
	}
};


exports.dologin = function(req,res){
	var username = req.body.userid;
	var password = req.body.password;
	var json = {};
	var protocol = req.protocol;
	if(protocol !== "https"){
		json.status = 303;
		json.message = "protocol error";
		res.send(JSON.stringify(json));
	}else{
		user_model.isUserExists(username,function(check_respon){
			if(check_respon.status == 1){
				user_model.dologin(username,password,function(login){
					if(login.status == 1){
						req.session.token = login.token;
						res.send(JSON.stringify(login));
					}else{
						res.send(JSON.stringify(login));
					}
				});
			}else{
				res.send(JSON.stringify(check_respon));
			}
		});
	}
};



