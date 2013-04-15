(function($){

  MapEscape =  function(el, settings){
    var obj = this,
    $el = $(el);

    $.extend(obj, {

      mapWrapperCssClass: 'map-wrapper',
      scrollAreaCssClass: 'mapescape-scroll',
      scrollTabCssClass: 'mapescape-scroll-tab',
       helperCSSClass: 'scroll-active',

      init: function(){
        this.initScrollHelper();
        var scroll = '';
        if(settings.scrollFollow){ scroll = 'scroll ' }
        $(window).on(scroll + 'resize orientationchange', $.proxy(this, 'toggleScrollHelperOn'));
      },

      initScrollHelper: function(){
        this.$scrollHelper = $('<div class="' + this.scrollAreaCssClass + ' ' + settings.hiddenClass + '"></div>');
        this.$scrollHelperTab = $('<div class="' + this.scrollTabCssClass + '"></div>');
        if(settings.scrollText){this.$scrollHelperTab.text(settings.scrollText);}
        this.addScrollHelper();
      },
      addScrollHelper: function(){

        $el.wrap('<div class="' + this.mapWrapperCssClass + '"></div>');
        this.$scrollHelper.insertAfter($el);
        this.$scrollHelper.html(this.$scrollHelperTab);

        this.mapControls = this.$scrollHelper.css('top');
        if(this.mapControls === 'auto'){ 
          this.mapControls = 0; 
          this.$scrollHelper.css({'top': '0'});
        }
        var h = $el.height();
        if(!typeof Zepto === 'undefined'){
          h = $el.outerHeight();
        }
        this.mapHeight = (h - parseInt(this.mapControls));
        this.$scrollHelper.height(this.mapHeight);

         this.$scrollHelper.on('touchstart mousedown', $.proxy(this, 'touchstartHandler'));
        this.$scrollHelper.on('touchend mouseup', $.proxy(this, 'touchendHandler'));

        if(settings.tabCenter){this.positionScrollTab();}

        this.toggleScrollHelperOn();
      },
      positionScrollTab: function(){
        this.tabHeight = this.$scrollHelperTab.height();
        if(!typeof Zepto === 'undefined'){
          this.tabHeight = this.$scrollHelperTab.outerHeight();
        }
        this.pos = (this.mapHeight/2) - (this.tabHeight/2);
        this.$scrollHelperTab.css({
          'top': this.pos + 'px'
        });
        

      },

      checkMapVsWindow: function(){
        var winHeight = $(window).height(),
        scrollPos = $(window).scrollTop(),
        mapTop = $el.offset().top - scrollPos,
        mapBottom = mapTop + (this.mapHeight + parseInt(this.mapControls));
        if(mapTop <= 0){
          var pos =  ((this.mapHeight - mapTop) / 2) - (this.tabHeight/2);
          if(pos + (this.tabHeight) > this.mapHeight){
            this.pos = this.mapHeight - this.tabHeight;
          }else{
            this.pos = pos;
          }
        }
        if(mapBottom > winHeight){
          var h = (mapTop + this.mapHeight) - winHeight,
          pos = ((this.mapHeight - h)/2) - (this.tabHeight/2);
          if(pos < 0){
            this.pos = 0;
          }else{
            this.pos = pos;
          }
        
        }
        if(mapTop < 0 && mapBottom > winHeight){
          var pos = (Math.abs(mapTop)) + (winHeight/2) - (this.tabHeight/2);
          this.pos = pos;
        }


        this.$scrollHelperTab.css({
          'top': this.pos + 'px'
        }); 
      },

      toggleScrollHelperOn: function(){
        if(settings.alwaysOn){
          this.showScrollHelper();
          return;
        }
        this.checkMapVsWindow();

        var mapBottom = ($el.offset().top + (this.mapHeight + parseInt(this.mapControls))) + settings.threshhold;
        var h = $(window).height();
        if(!typeof Zepto === 'undefined'){
          h = $(window).innerHeight();
        }
        if(mapBottom > h){
          this.showScrollHelper();
        }else{
          this.removeScrollHelper(); 
        }
      },
      removeScrollHelper: function(){
        this.$scrollHelper.addClass(settings.hiddenClass);
      },
      showScrollHelper: function(){
        this.$scrollHelper.removeClass(settings.hiddenClass);
      },

      touchstartHandler: function(e){
        $(e.currentTarget).addClass(this.helperCSSClass);
      },

      touchendHandler: function(e){
        $(e.currentTarget).removeClass(this.helperCSSClass);
      }

    });

    obj.init();
  };

  $.fn.mapescape = function(options){
    return this.each(function(){
      var $this = $(this),
      settings = {
        alwaysOn: false,                  // if false map height is measured against window height - true always shows scoll area  
        hiddenClass: 'scroll-inactive',   // class of the hidden controls
        scrollText:  null,                // text on scroll indicator - leave blank for none
        threshhold: 0,                    // amount of viewable scroll area below the map
        tabCenter: true,                  // if false don't position the scroll tab with javascript
        scrollFollow: true                // set to false for static scroll tab
      };
        
      if (options) { 
        $.extend(settings, options);
      }
      // create new instance of the map excape object
      new MapEscape($this, settings);
    });
};

})(window.jQuery || window.Zepto);	


 