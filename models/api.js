var config = require('../config');
var connection = config.connection;
var param_model = require('./api_param');

exports.getallapi = function(callback){
	var data = {};
	var select = "select * from api";
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "get api system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows;
				console.log(rows);
				callback(data);
			}else{
				data.status = 0;
				data.message = "api not exists in our system";
				callback(data);
			}
		}
	});
};

exports.getapi = function(apiid,callback){
	var data = {};
	var select = "select * from api where apiid = "+apiid;
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "get api system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows[0];
				var apiid = data.data.APIID;
				param_model.getparambyapi(apiid,function(param_data){
					if(param_data == 1){
						data.data.params = param_data.data;
					}else{
						data.data.params = params_data;
					}
					callback(data);
				});
				//callback(data);
			}else{
				data.status = 0;
				data.message = "api not exists in our system";
				callback(data);
			}
		}
	});
};


exports.getparambyapi = function(apiid,callback){
	param_model.getparambyapi(apiid,function(data){
		callback(data);
	});
};
