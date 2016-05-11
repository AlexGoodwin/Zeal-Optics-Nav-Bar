ACC.minicart = {
	
	$layer:$('#miniCartLayer'),

	bindMiniCart: function ()
	{
		
		$(document).on('mouseenter', '.icn-cart', this.showMiniCart);
		$(document).on('mouseleave', '#holderMiniCart', this.hideMiniCart);
	},
	
	showMiniCart: function ()
	{
	
		$(this).addClass("mini-cart-active");
		if($('#miniCartLayer').data("hover"))
		{
			return;
		}
		
		if($('#miniCartLayer').data("needRefresh") != false){
			ACC.minicart.getMiniCartData(function(){
				$('#miniCartLayer').fadeIn(function(){
					$('#miniCartLayer').data("hover", true);
					$('#miniCartLayer').data("needRefresh", false);
				});
			})
		}
		
		$('#miniCartLayer').fadeIn(function(){
			$('#miniCartLayer').data("hover", true);
		});
	},
	
	hideMiniCart: function ()
	{
		$('#miniCartLayer').fadeOut(function(){
			$('#miniCartLayer').data("hover", false);
		});
	},
	
	getMiniCartData : function(callback)
	{
		$.ajax({
			url: $('#miniCartLayer').attr("data-rolloverPopupUrl"),
			cache: false,
			type: 'GET',
			success: function (result)
			{
				$('#miniCartLayer').html(result);
				callback();
			}
		});	
	},

	refreshMiniCartCount : function()
	{
		$.ajax({
			dataType: "json",
			url: $('#miniCartLayer').attr("data-refreshMiniCartUrl") + Math.floor(Math.random() * 101) * (new Date().getTime()),
			success: function (data)
			{
				$(".dropdown .item-count").html(data.miniCartCount);
				$(".minicart .item-count").html(data.miniCartCount);
				$('#miniCartLayer').data("needRefresh", true);
				
			
			}
		});
	}
};

$(document).ready(function ()
{
	
	ACC.minicart.bindMiniCart();
});

