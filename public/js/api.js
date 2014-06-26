function getparam(apiid){
	var tblid = "#tbl" + apiid;
	
	$.get('getparam',{
		apiid : apiid
	},function(res){
		
		$(tblid).html(res);
		
		
	});
}