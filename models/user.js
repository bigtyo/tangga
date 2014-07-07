var config = require('../config');
var connection = config.connection;
var uuid = config.uuid;

exports.verifyUserToken = function(userid,usertoken,callback){
	var data = {};
	var select = "select * from user where user_id like '"+userid+"'";
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "verify system error";
			data.error = err;
			
		}else{
			if(rows.length == 0){
				data.status = 0;
				data.message = "user name invalid";
				
			}else{
				if(rows[0].TOKEN === usertoken){
					data.status = 1;
					
				}else{
					data.status = 0;
					data.message = "user token invalid";
				}
			}
		}
		callback(data);
		
	});
};


exports.changePassword = function(userid,olpass,newpass,callback){
	var data = {};
	var select = "select * from user where user_name like '"+userid+"' and password = MD5('"+oldpass+"')";
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "change password system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				var update = "Update user set password = MD5('"+newpass+"') where user_name = '"+userid+"'";
				connection.query(update,function(err2){
					if(err2){
						data.status = 505;
						data.message = "change password system error";
						data.error = err;
						callback(data);
					}else{
						data.status = 1;
						data.message = "password changed successfully";
						
						callback(data);
					}
				});
			}else{
				data.status = 0;
				data.message = "username and old password didn't match";
				
				callback(data);
			}
		}
		
	});
};

exports.register = function(username,name,password,email,callback,type){
	var data = {};
	var insert = "";
	if(typeof type === "undefined"){
		var token = uuid.v4();
		insert = "INSERT INTO user(user_id,password,email,token) values('"+username+"',MD5('"+password+"'),'"+email+"','"+token+"')";
		connection.query(insert,function(err, rows, fields){
			if(err){
				data.status = 505;
				data.message = "create user system error";
				data.error = err;
				callback(data);
			}else{
				data.status = 1;
				data.message = "account created successfully";
				data.usertoken = token;
				callback(data);
			}
			
		});
	}else{
		if(type.tolowercase() == "dev"){
			insert = "INSERT INTO developer(developer_name,developer_email) values('"+username+"','"+email+"')";
			connection.query(insert,function(err, rows, fields){
				if(err){
					data.status = 505;
					data.message = "create dev system error";
					data.error = err;
					callback(data);
				}else{
					data.status = 1;
					data.message = "account created successfully";
					callback(data);
				}
				
			});
		}else{
			var token = uuid.v4();
			insert = "INSERT INTO user(user_id,password,email,token) values('"+username+"',MD5('"+password+"'),'"+email+"','"+token+"')";
			connection.query(insert,function(err, rows, fields){
				if(err){
					data.status = 505;
					data.message = "create user system error";
					data.error = err;
					callback(data);
				}else{
					data.status = 1;
					data.message = "account created successfully";
					data.usertoken = token;
					callback(data);
				}
				
			});
		}
	}
	
};

exports.dologin = function(username,password,callback){
	var data = {};
	var select = "select * from developer where developer_email like '"+username+"' and password = MD5('"+password+"')";
	//console.log(select);
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "login system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.token = rows[0].TOKEN;
				callback(data);
			}else{
				data.status = 0;
				data.message = "wrong password";
				callback(data);
			}
		}
	});
};

exports.douserlogin = function(username,password,callback){
	var data = {};
	var select = "select * from user where user_id like '"+username+"' and password = MD5('"+password+"')";
	//console.log(select);
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "login system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
								
				data.status = 1;
				//data.token = rows[0].TOKEN;
				callback(data);
			}else{
				data.status = 0;
				data.message = "wrong password";
				callback(data);
			}
		}
	});
};

exports.douserrelogin = function(username,token,callback){
	var data = {};
	var select = "select * from user where user_id like '"+username+"' and token like '"+token+"'";
	//console.log(select);
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "login system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				//data.token = rows[0].TOKEN;
				callback(data);
			}else{
				data.status = 0;
				data.message = "wrong token please relogin";
				callback(data);
			}
		}
	});
};

exports.isUserExists = function(username,callback){
	var data = {};
	var select = "select * from user where user_id like '"+username+"'";
	
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "login system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				callback(data);
			}else{
				data.status = 0;
				data.message = "username invalid";
				callback(data);
			}
		}
	});
};

exports.updatetoken = function(username,callback){
	var token = uuid.v4();
	var data = {};
	var updatetoken = "update user set token = '"+token+"' where user_id = '"+username+"'";
	connection.query(updatetoken,function(err,fields){
		if(err){
			data.status = 505;
			data.message = "token system error";
			data.error = err;
			callback(data);
		}else{
			data.status = 1;
			data.token = token;
			callback(data);
		}
	});
};


