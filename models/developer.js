var config = require('../config');
var connection = config.connection;
var game_model = require('game');

exports.getdev = function(devid,callback){
	var data = {};
	var select = "select * from developer where dev_id = " +devid;
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "get dev system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows;
				callback(data);
			}else{
				data.status = 0;
				data.message = "dev not exists in our system";
				callback(data);
			}
		}
	});
};

exports.getallgamebydev = function(devid,callback){
	game_model.getgamebydev(devid,function(data_game){
		callback(data_game);
	});
};