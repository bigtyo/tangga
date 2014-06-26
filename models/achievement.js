var config = require('../config');
var connection = config.connection;
var uuid = config.uuid;

exports.getallachievement = function(gameid,callback){
	var data = {};
	var select = "select * from achievement where gameid = "+gameid;
	
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "achievement system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows; 
			}else{
				data.status = 0;
				data.message = "This game has no Achievement registered";
			}
			callback(data);
		}
	});
};

exports.getachievement = function(ach_id,callback){
	var data = {};
	var select = "select * from achievement where achievement_id = "+ach_id;
	
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "achievement system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows[0]; 
			}else{
				data.status = 0;
				data.message = "Achievement not registered";
			}
			callback(data);
		}
	});
};


exports.updateachievement = function(ach_id,acc_data,callback){
	var data = {};
	var update = "update achievement " +
			"set " +
			"achievement_name  = '" +acc_data.achievement_name+ "'," +
			"conditional_description = '" +acc_data.conditional_description+ "'," +
			"description = '" +acc_data.description+ "'," +
			"point = " +acc_data.point+ "," +
			"badge = '" +acc_data.badge+ "' " +
			"where achievement_id = "+ach_id;
	
	connection.query(update,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "update achievement system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows[0]; 
			}else{
				data.status = 0;
				data.message = "Failed to update achievement, no achievement found";
			}
			callback(data);
		}
	});
};

exports.addachievement = function(gameid,ach_data,callback){
	var data = {};
	var id = uuid.v1();
	var insert = "insert into achievement(achievement_id,game_id,achievement_name,conditional_description,description,point,badge) "+
			"VALUES (" +
			"'" +id+ "'," +
			gameid+ "," +
			"'" +acc_data.achievement_name+ "'," +
			"'" +acc_data.description+ "'," +
			acc_data.point+ "," +
			"'" +acc_data.badge+ "'" +
			")";
	
	connection.query(insert,function(err,fields){
		if(err){
			data.status = 505;
			data.message = "Add achievement system error";
			data.error = err;
			callback(data);
		}else{
			data.status = 1;
			data.id = id;
			
			callback(data);
		}
	});
};


exports.deleteachievement = function(ach_id,callback){
	var data = {};
	var delete_q = "delete from achievement " +
					"where achievement_id = "+ach_id;
	
	connection.query(delete_q,function(err,fields){
		if(err){
			data.status = 505;
			data.message = "delete achievement system error";
			data.error = err;
			callback(data);
		}else{
			
			data.status = 1;
			
			callback(data);
		}
	});
};