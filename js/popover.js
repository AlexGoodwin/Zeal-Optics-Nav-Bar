var originalLeave = $.fn.popover.Constructor.prototype.leave;
$.fn.popover.Constructor.prototype.leave = function(obj){
  var self = obj instanceof this.constructor ?
    obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
  var container, timeout;

  originalLeave.call(this, obj);

  if(obj.currentTarget) {
    container = $(obj.currentTarget).siblings('.popover')
    timeout = self.timeout;
    container.one('mouseenter', function(){
      clearTimeout(timeout);
      //Let's monitor popover content instead
      container.one('mouseleave', function(){
        $.fn.popover.Constructor.prototype.leave.call(self, self);
      });
    })
  }
};

var genericCloseBtnHtml = '<button onclick="$(this).closest(\'div.popover\').popover(\'hide\');" type="button" class="close" aria-hidden="true">&times;</button>';
$('body').popover({ 
	selector: '[data-popover]',
	title: genericCloseBtnHtml,
	trigger: 'click hover', 
	placement: function(){
		if($.currentMedia == $.mediaTypes.DESKTOP || $.currentMedia == $.mediaTypes.TABLET ){
			return 'right'
		}
		if($.currentMedia == $.mediaTypes.MOBILE){
			return 'bottom'
		}
	},
	html: true,
	delay: {
		show: 50, 
		hide: 400
	}
});

$('.popover button.close').click(function() {
   $(this).closest('div.popover').popover('hide');
});