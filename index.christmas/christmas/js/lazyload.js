(function($){
	var clock;
	var methods = {
		init:function(obj){
			var _this = this;
			$(window).on('scroll',function(){
				if(clock){
					clearTimeout(clock);
				}
				clock = setTimeout(function(){
					
					_this.checkShow(obj);
				},100);
				
			})
			_this.checkShow(obj);
			
		},
		checkShow:function(obj){ 
			var _this = this;
			obj.each(function(){
				var data = $(this);
				if(data.attr('isLoaded')){
					return;
				}
				if(_this.shouldShow(data)){
					_this.showImg(data);
				}
			});
		},
		shouldShow:function(img){
			var scrollH = $(window).scrollTop(),
				windowH = $(window).height(),
				imgTop = img.offset().top; 
			if(imgTop < windowH + scrollH){
				return true;
			}else{  
				return false;
			}
		},
		showImg:function(img){
			img.animate({
						'opacity':1
					});
			img.attr('src',img.attr('data-img'));
			img.attr('isLoaded',true);
		}
	}
	$.fn.lazyload = function(){
		methods.init(this);
	}
})(jQuery);
