$(function() {
	var mobile = $("input[name='mobile']");
	var tip = $('.alertTip');
	var getcode = $(".getCode"); 
	var codenum = $("input[name='code']");

	function checkMobile(tel) {
		if(/1[2-9]+\d{9}/.test(tel)) {
			return true;
		}
		return false;
	}
	var timeNum = 60;
	function dtime(){
		timeNum--;
		getcode.html(timeNum + 's');
		if(!timeNum) {
			clearTimeout(t);
			timeNum = 60;
			setTimeout(function(){
				getcode.html('获取验证码');
			}, 1000);
			
		} else {
			t = setTimeout(dtime, 1000);
		}
	}
	
	getcode.on('click', function() {
		var tel = Number(mobile.val());
		if(!checkMobile(tel)){
			tip.html('手机号输入错误！').fadeIn();
			setTimeout(function(){
				tip.fadeOut();
			},2000);
		}else{
			dtime();
			$.ajax({
				type:"post",
				data:{mobile:tel},
				url:"",
				success:function(data){
					var data = eval(data);
					if(data.flag == '1'){
						tip.html(data.msg).fadeIn();
						setTimeout(function(){
							tip.fadeOut();
						},2000);
					}else{
						tip.html(data.msg).fadeIn();
						setTimeout(function(){
							tip.fadeOut();
						},2000);
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	});
	$(".confirm").on('click', function() {
		var tel =  Number(mobile.val());
		var code = codenum.val();
		$.ajax({
			type:"post",
			data:{mobile:tel,code:code},
			url:"",
			success:function(data){
				var data = eval(data);
				if(data.flag == '1'){
					window.location.href="";
				}else{
					tip.html(data.msg).fadeIn();
					setTimeout(function(){
						tip.fadeOut();
					},2000);
				}
			}
		});
	});
});