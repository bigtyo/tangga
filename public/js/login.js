function dologin(){
	var login = $("#login").val();
	var password = $("#password").val();
	
	$.post('/login',{
		userid : login,
		password : password
	},function(res){
		var res = JSON.parse(res);
		if(res.status != 1){
			alert(res.message);
		}
	});
}