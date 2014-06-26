var games_model = require('../models/game');

exports.mygames = function(req,res){
	games_model.getgamebydev(1,function(data_games){
		//if(data_games.status == 1){
			res.render('mygames',{ data : data_games.data });
	//	}else{
			//res.render('mygames',{ data : data_games.data });
		//}
		
	});
	
};

exports.getgame = function(req,res){
	games_model.getgame(gameid,function(game_data){
		//if(game_data.status == 1){
			res.render('gamedetail',{ data : game_data.data });
		//}else{
		//	res.render('mygames',{ data : game_data.data });
		//}
	});
};

exports.getplayersbygame = function(req,res){
	var gameid = req.params.gameid;
	
	
	games_model.getgame(gameid,function(game_detail){
		games_model.getallplayerscore(gameid,function(data_score){
			console.log(data_score);
				res.render('players',{ data : data_score.data, game : game_detail.data });
				
		});
	});
	
};