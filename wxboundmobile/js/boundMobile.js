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
		$(".send").show();
		getcode.hide();
		
		$(".send").val(timeNum + '秒可重新获取');
		if(!timeNum) {
			clearTimeout(t);
			timeNum = 60;
			setTimeout(function(){
				$(".send").hide();
				getcode.show();
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
		if(code==''){
			tip.html('请输入验证码').fadeIn();
			setTimeout(function(){
				tip.fadeOut();
			},2000);
		}else if(tel!=''&&code!=''){
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
		}
	});
});