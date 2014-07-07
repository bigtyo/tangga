var user_model = require('../models/user');
var score_model = require('../models/score');

exports.getmyscore = function(req,res){
	var usertoken = req.query.token;
	var userid = req.query.userid;
	var gameid = req.query.gameid;
	
	user_model.verifyUserToken(userid,usertoken,function(data_verify){
		if(data_verify.status == 1){
			score_model.getScore(userid,gameid,function(data_score){
				res.send(JSON.stringify(data_score));
			});
		}else{
			res.send(JSON.stringify(data_verify));
		}
	});
};


exports.updatemyscore = function(req,res){
	var usertoken = req.body.token;
	var userid = req.body.userid;
	var gameid = req.body.gameid;
	var score = req.body.score;
	
	user_model.verifyUserToken(userid,usertoken,function(data_verify){
		if(data_verify.status == 1){
			score_model.updatescore(userid,gameid,score,function(data_score){
				res.send(JSON.stringify(data_score));
			});
		}else{
			res.send(JSON.stringify(data_verify));
		}
	});
};

exports.getplayerscorebygameid = function(req,res){
	var gameid = req.query.gameid;
	
	score_model.getplayerscorebygameid(gameid,function(score_data){
		res.send(JSON.stringify(score_data));
	});
};


