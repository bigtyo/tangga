var config = require('../config');
var connection = config.connection;

exports.getparambyapi= function(apiid,callback){
	var data = {};
	var select = "select * from api_param where apiid = " + apiid;
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "get api param system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows;
				callback(data);
			}else{
				data.status = 0;
				data.message = "api param not exists in our system";
				callback(data);
			}
		}
	});
};