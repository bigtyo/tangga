var config = require('../config');
var connection = config.connection;
var achievement_model = require('./achievement');
var score_model = require('./score');

exports.getgame = function(gameid,callback){
	var data = {};
	var select = "select * from game where gameid = "+gameid;
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "get game system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows[0];
				callback(data);
			}else{
				data.status = 0;
				data.message = "game not exists in our system";
				callback(data);
			}
		}
	});
};

exports.getgamebydev = function(devid,callback){
	var data = {};
	var select = "select * from game where dev_id = "+devid;
	console.log(select);
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "get game dev system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows;
				callback(data);
			}else{
				data.status = 0;
				data.message = "no game registered yet";
				callback(data);
			}
		}
	});
};

exports.getallgameachievement = function(gameid,callback){
	achievement_model.getallachievement(gameid,function(acc_data){
		callback(acc_data);
	});
};

exports.addgameachievement = function(gameid,ach_data,callback){
	achievement_model.addachievement(gameid,ach_data,function(add_data){
		callback(add_data);
	});
};

exports.getallplayerscore = function(gameid,callback){
	score_model.getplayerscorebygameid(gameid,function(data_score){
		callback(data_score);
	});
};


