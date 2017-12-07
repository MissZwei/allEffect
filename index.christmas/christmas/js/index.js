$(function(){
//顶部自适应
	//主页面
	var mainAuto = function(){
		var w = $(window).width()-175;
		$(".bxg-search").width(w);
	};
	mainAuto();
	//搜索页
	var searchAuto = function(){
		var w = $(window).width()-190;
		$(".bxg-input").width(w);
	};
	searchAuto();
	$(window).resize(function(){
		mainAuto();
		searchAuto();
	});

//轮播图
	var bannerSwiper = new Swiper('.bxg-index-banner', {
	    pagination : '.swiper-pagination',
	    autoplay : 5000
	});
//轮播图
	var floorSwiper = new Swiper('.bxg-floor-banner', {
	    pagination : '.swiper-pagination',
	    autoplay : 5000
	});
//百信快报
	autoTopScroll('.news-list',$('.news-list').height(),$('.news-list').find('li').length);
	function autoTopScroll(obj,height,num){
		setInterval(function () {
		    $(obj).find("ul:first").animate({
		    	marginTop: -height/num
		    },500,function(){
		    	$(this).css({marginTop:'0'}).find('li:first').appendTo(this);
		    });
		}, 3000);
	}
	
//百信秒杀倒计时 每晚8点开始9点结束
	var start_kill = 20;
	countDown();
	function countDown(){
		var date = new Date();
		var hour = date.getHours();//小时
		var min = date.getMinutes()+1;//分钟
		var sec = date.getSeconds()+1;//秒
		var dMin = 60 - min;
		var dSec = 60 - sec;
		// 24小时制
		if(hour < start_kill){
			dH = start_kill - hour-1;
			judgeAddZero(dH);
			$(".time-start").hide();
			$(".time-wait").show();
			$(".seckill-end").hide();

		}else if(hour == start_kill){
			judgeAddZero(0);
			$(".time-start").show();
			$(".time-wait").hide();
			$(".seckill-end").hide();
		}else{
			$(".seckill-time").hide();
			$(".seckill-end").show();
		}

		function judgeAddZero(dH){
			h = dH<10 ? '0'+dH:''+dH;
			m = dMin<10 ? '0'+dMin:''+dMin;
			s = dSec<10 ? '0'+dSec:''+dSec;
			var h1 = h.split('')[0],
				h2 = h.split('')[1],
				m1 = m.split('')[0],
				m2 = m.split('')[1],
				s1 = s.split('')[0],
				s2 = s.split('')[1];
			$("#hours1").text(h1);
			$("#hours2").text(h2);
			$("#minutes1").text(m1);
			$("#minutes2").text(m2);
			$("#seconds1").text(s1);
			$("#seconds2").text(s2);
		}
		
		var t = setTimeout(countDown,1000);//循环调用实现自动倒计时
	}


	
//页面切换
	$(".bxg-search").click(function(){
		$(".main-page").hide();
		$(".search-page").show();
	});
	$(".bxg-position").click(function(){
		$(".main-page").hide();
		$(".position-page").show();
	});
	$(".bxg-close").click(function(){
		$(".main-page").show();
		$(".search-page,.position-page").hide();
	});
//搜索页

	//清除历史搜索记录
	$(".clear_history").click(function(){
		$(".bxg-confirm").show();
	});
	$(".confirm_span3").click(function(){
		$(".bxg-confirm").fadeOut();
	});
	$(".confirm_span2").click(function(){
		//需请求ajax
		$(".history-div a").remove();
		localStorage.removeItem("a");
		localStorage.removeItem("url");
		$(".bxg-confirm").fadeOut();
	});
	
//搜索页输入搜索功能
	$(".search-type").click(function(){
		$(this).parent().find('ul').toggle();
	});
	
	//点击宝贝---点击店铺获取数据
	$(".bxg-select ul li").click(function(){
		$(".search-type").attr("selective",$(this).attr('selective')).find('span').html($(this).text());
		$(".bxg-select ul").hide();
	});
	
	// 搜索内容监控下拉显示
	$('.search-txt').bind('input propertychange', function() {  
		var search_txt=$(".search-txt").val();
		var search_id=$(".search-type").attr("selective");
	    if(search_txt==""){
	   		$(".search_results").hide(500);
	    }else{
	    	$.ajax({
	    		type:"get",
	    		url:"../index/index/search",
	    		data:{
	    			search_txt:search_txt,
	    			search_id:search_id
	    		},
	    		async:true,
	    		dataType:"json",
	    		success:function(data){
	    			if(data!=''){
		    			var str="";
		    			for(i=0;i<data.length;i++){
		    				if(data[i].flag){
		    					 str +="<li data='"+data[i].href+"' onclick='result(this)'><span class='search_option'>"+data[i].opt+"</span><span class='search_txt'><span class='search_num'></span>共"+data[i].num+"件商品</span></li>";
		    					
			    			}
		    			}
		    			$(".search_results").html('').append(str);	
	    			}else{
	    				$(".search_results").html('').append("<li><span class='search_option'>很是抱歉，没有搜索到相关！</span></li>");
	    			}
	    		}
	    	});
	    	$(".search_results").show(500);
	    }
	});
	// 点击搜索按钮
	$(".bxg-search-btn").click(function(){
		var selective=$(".search-type").attr("selective");
		var serach_val=$(".search-txt").val();
		if(serach_val==""){
			$('.bxg-alert-tip').html('请输入搜索信息！').show();
			setTimeout(function(){
				$('.bxg-alert-tip').hide();
			},2000);
		}else{
			if(selective==1){
				$(".search-txt").val('');
				location.href="{$Think.__APPROOT__}/index/search/index/search_txt/"+serach_val+'/search_id/'+selective;
			}else{
				alert("请选择您要搜索的店铺");
			}

			if(storage.a) {
				storage.a += "&" + serach_val;
				storage.url += "&" + "{$Think.__APPROOT__}/index/search/index/search_txt/"+serach_val+'/search_id/'+selective;
			}else{
				storage.a = serach_val;
				storage.url = "{$Think.__APPROOT__}/index/search/index/search_txt/"+serach_val+'/search_id/'+selective;
			}
		}
	});

//定位功能
	getLocation();
	function getLocation(){
	    var geolocation = new qq.maps.Geolocation("VPTBZ-ZISWI-AU5GE-5CI5U-V7J72-IZFGT", "百信购");
	    var options = {timeout: 8000};
	    geolocation.getLocation(showPosition, showErr, options);//精确定位
	}
	function showPosition(position) {
	    $.ajax({
			type : "get",
			url:"../index/index/latLng",
			data :position,
			success: function(data){		
				var obj = eval(data); 
				if (obj.flag) {		
				    $(".bxg-alert-tip").html(obj.city).show();//错误信息
			        setTimeout(function () {
			            $(".bxg-alert-tip").fadeOut(1000);
			        }, 1000);//提示层2秒后消失			 
					$('#city').html(obj.city);	
					$('.newcity').html(obj.city);
				}else{
			        $(".bxg-alert-tip").html(obj.msg).show();//错误信息
			        setTimeout(function(){
			            $(".bxg-alert-tip").fadeOut(1000);
			        }, 1000);//提示层2秒后消失
			        $('#city').html('城市');	
				}
		    }
		});
	};
	function showErr(){
		$(".bxg-alert-tip").html("定位失败").show();//错误信息
	    setTimeout(function () {
	        $(".bxg-alert-tip").fadeOut(2000);
	    }, 1000);//提示层2秒后消失
	}
});