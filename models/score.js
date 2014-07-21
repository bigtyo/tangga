var config = require('../config');
var connection = config.connection;
var uuid = config.uuid;

exports.getScore = getScore;


exports.newScore = newScore;


exports.updatescore = function(userid,gameid,score,callback){
	var data = {};
	var update = "UPDATE score set score = "+score+" WHERE gameid = "+gameid+" and userid = "+userid;
	connection.query(update,function(err, rows, fields){
		if(err){
			data.status = 505;
			data.message = "update score system error";
			data.error = err;
			
		}else{
			data.status = 1;
			
			
		}
		callback(data);
	});
};

exports.getplayerscorebygameid = function(gameid,callback){
	var data = {};
	var select = "select *,3 as ACHIEVEMENT from score where gameid = "+gameid +" ORDER BY score desc";
	
	connection.query(select,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "score game system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length > 0){
				data.status = 1;
				data.data = rows;
				callback(data);
			}else{
				data.status = 0;
				data.message = "no score registered";
				callback(data);
			}
		}
	});
};

function newScore(userid,gameid,callback){
	var data = {};
	var scoreid = uuid.v4();
	var insert = "INSERT INTO score(score_id,gameid,user_id,score) values('"+scoreid+"',"+gameid+",'"+userid+"',0)";
	connection.query(insert,function(err, rows, fields){
		if(err){
			data.status = 505;
			data.message = "new score system error";
			data.error = err;
			
		}else{
			data.status = 1;
			
			
		}
		callback(data);
	});
}

function getScore(userid,gameid,callback){
	var data = {};
	var score_q = "select * from score where user_id like '"+userid+"' and gameid like '"+gameid+"'";
	
	connection.query(score_q,function(err,rows,fields){
		if(err){
			data.status = 505;
			data.message = "get score system error";
			data.error = err;
			callback(data);
		}else{
			if(rows.length == 0){
				newScore(userid,gameid,function(data1){
					if(data1.status == 1){
						getScore(userid,gameid,callback);
					}else{
						callback(data1);
					}
				});
			}else{
				data.status = 1;
				data.scoredata = rows[0];
				callback(data);
			}
		}
		
	});
}
