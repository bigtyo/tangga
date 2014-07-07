
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , user = require('./routes/user')
  , games = require('./routes/games')
  , score = require('./routes/score')
  , http = require('http')
  , https = require('https')
  , path = require('path');



var fs = require('fs');
var app = express();
//var privateKey = fs.readFileSync('./cert/privatekey.pem').toString();
//var certificate = fs.readFileSync('./cert/certificate.pem').toString();

//console.log(privateKey);
//console.log(certificate);

var credentials = {
		  key: fs.readFileSync('./cert/privatekey.pem'),
		  cert: fs.readFileSync('./cert/certificate.pem')
		};

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//services
app.get('/', routes.index);
app.get('/users', user.list);
app.post('/users/register',user.register);
app.post('/users/userlogin',user.userlogin);
app.post('/users/userrelogin',user.userrelogin);
app.get('/score/getmyscore',score.getmyscore);
app.post('/score/updatemyscore',score.updatemyscore);
app.get('/score/getleaderboard',score.getplayerscorebygameid);
app.get('/api/getparam',index.getparambyapi);



//web 
app.get('/login',user.login);
app.post('/login',user.dologin);
app.get('/mygames',games.mygames);
app.get('/games/:gameid?',games.getgame);
app.get('/games/:gameid?/players',games.getplayersbygame);
app.get('/api/list',index.apilist);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express http server listening on port ' + app.get('port'));
});

https.createServer(credentials,app).listen(443,function(){
	console.log('Express https server listening on port ' + 443);
});
