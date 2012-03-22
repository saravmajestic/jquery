(function($){
    jQuery.fn.overlay = function(options){
        this.init = function(config){
			
			var t = this;
			
			config = $.extend({
				animClose : false,
				animOpen : false,
				closeOnMaskClick : true,
				closeOnEscape : true,
				showInCenter : true,
				resizeToWindowHeight : true,
				maxHeight : 500,
				triggerEl : null,
				hasMask : true,
				closeEl : null,
				width : 500
			}, config);
			
			var id = this.attr("id");
			if(!id){
				id = this.genId();
				this.attr("id", id);
			}
			config.id = id;
			t.data("config", config);
			t.open(config);
			this.addEvents(config);
        };
		this.addEvents = function(config){
			var t = this;
			if (config.closeOnMaskClick && config.hasMask) {
				$(".mask").one("click", function(e){
					t.close(t, e);
				});
			}
			if (config.closeOnEscape) {
				$(document).keyup(function(e){
					if (e.keyCode == 27) {
						t.close(t, e);
					}
				});
			}
			config.closeFn = function(e){
				t.close(t, e);
			}
			if(config.closeEl){
				config.closeEl.one("click", config.closeFn);
			}
			t.one("doClose", config.closeFn);
		};
		this.close = function(el, ev){
			var config = el.data("config") || {};
			el.trigger("beforeclose", {el : el, config : config, triggerEv : ev});
			if (config.animClose) {
				if(config.hasMask) $(".mask").fadeOut('slow');
				el.fadeOut('slow');
			}else{
				if(config.hasMask) $(".mask").hide();
				el.hide();
			}
			this.destroy(el);
			el.trigger("afterclose", {el : el, config : config, triggerEv : ev});
		};
		this.destroy = function(el){
			var config = el.data("config") || {};
			el.unbind("doClose");
			if(config.closeEl) config.closeEl.unbind("click");
		};
		this.open = function(c){
			var t = this, ovlContent = null;
			t.trigger("beforeopen", {el : t, config : c});
			if(typeof(c.contentEl)=="string"){
				ovlContent = $(c.contentEl);
			}else{
				ovlContent = c.contentEl;
			}
			if(ovlContent.length > 0){
				$(".ol-c > div",t).hide();
				$(".ol-c",t).append(ovlContent.show()).css({"height" : "auto"});
				this.setOverlayHeader(c, t);
				if (c.animOpen) {
					if(c.hasMask) $(".mask").fadeIn('slow');
					t.fadeIn('slow');
				}else{
					if(c.hasMask) $(".mask").show();
					t.show();
				}
				if(c.resizeToWindowHeight){
					this.resizeToWindow(c, t);
				}
				this.positionOverlay(c, t);	
			}
			t.trigger("afteropen", {el : t, config : c});
		};
		this.resizeToWindow = function(c, overlay){
			var height = document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
			if(overlay.height() > height){
				$(".ol-c", overlay).css({"height" : c.maxHeight});
			}else{
				$(".ol-c", overlay).css({"height" : "auto"});
			}
		};
		this.setOverlayHeader = function(c, overlay){
			//Header
			var head = c.head, olyEl = overlay;
			if(head){
				$(".ol-h span", olyEl).html(head.m);
			}
		};
		this.positionOverlay = function(c, oly){
			var top = 0, left = 0;
			if(c.showInCenter){
				
				var olyH = oly.height();
				var scrollTop = 0, screenHeight = document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
				
				top = $(document).scrollTop() + (screenHeight - olyH)/2;
				if(top < 0) top = 0;
				
				var olyW = c.width || oly.width(),screenWidth = document.documentElement ? document.documentElement.clientWidth : window.innerWidth;
				left = $(document).scrollLeft() + (screenWidth - olyW)/2;
			}else{
				if(c.triggerEl){
					left = (c.triggerEl.offset()).left;
					top = (c.triggerEl.offset()).top; 
				}
			}
	
			oly.css({"width" : c.width, "left" : left,"top":top});
		};
		this.genId = function(){
			var id = "oly-"; 
			for(i=0;i<100;i++){
				if($("#"+id+i).length < 1){
					return id+i;
				}
			}
		};
        this.init(options);
    };
})(jQuery);
