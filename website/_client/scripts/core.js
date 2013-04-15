(function($){

	Core = {
    init: function(){
      $('.social-share').find('.btn').on('click', $.proxy(this, 'showShareBtn'));
    },

    showShareBtn: function(e){
      e.preventDefault();
      var $btn = $(e.currentTarget);
      $btn.addClass('hover');
      clearTimeout(this.closeButton);
      this.closeButton = setTimeout(function(){
        $btn.removeClass('hover');
      }, 2000);
    }

  }

	$().ready(function(){
  	Core.init();
	});

})(window.jQuery || window.Zepto);