var ZealPDP = ZealPDP || {};
ZealPDP.prodctDescriptionPage = {
	init: function() {
		this.bindZoomProductView();
		this.bindProductCarouselMob();
		this.bindFrameColorways();
		this.bindProductGallery();
	},
	bindZoomProductView: function(){
		function openZoom(){
			$('.zoom-btn > a').on("click", function(){
				$('.product-holder').addClass('hide');
				$('.product-zoom-mainview').removeClass('hide');
			});
		}
		function closeZoom(){
			$('.product-zoom-mainview .btn-exit > a').on("click", function(){
				$('.product-holder').removeClass('hide');
				$('.product-zoom-mainview').addClass('hide');
			});
		}
		openZoom();
		closeZoom();
	},
	// products mobile carousal
	bindProductCarouselMob: function(){
		$(".mobile-product-view").each(function(){
			$(this).find(".pdhero-mcarousal").owlCarousel({
				itemsCustom : [
				  [0, 1],
				  [767, 1]
				],
				navigation : false
			});
		});
	},
	// frame colorway swatches 
	bindFrameColorways: function(){
		//BindEqualColumnHeight($(".product-holder .frame-colorways .fcw-item"));
		var activeClass= 'active';
		$('.product-holder .frame-colorways').each(function() {
			var fcwBtns = $('.fcw-itemlnk', this);
			//adding fake holders on the fly for hovering effect
			$('.product-title h2').after('<h2 class="hide"></h2>');
			$('.hol-prescription .pr-code').after('<span class="pr-code hide"></span>');
			$('.hol-rating-reviews .review-lnks .review').after('<a class="review emtpy hide"></span>');
			$('.pdesc-wrap .pdesc-frame').after('<span class="pdesc-frame hide"></span>');
			$('.pdesc-wrap .pdesc-lens').after('<span class="pdesc-lens hide"></span>');
			$('.pdesc-wrap .vlt').after('<span class="vlt hide"></span>');
			$('.pdesc-wrap .pdesc-lens-material').after('<span class="pdesc-lens-material hide"></span>');
			$('.instock-help .ins-row .strong').after('<span class="strong hide"></span>');
			$('.instock-help .ins-row .strong').after('<span class="strong hide"></span>');
			$('.add-to-cart-form .price-qty-wrap .pq-price').after('<span class="pq-price hide"></span>')

			fcwBtns.each(function(i) {
				var fcwBtn = $(this);
				//variants data array holder
				var dataContainer = fcwBtn.attr('data-fcwvariants');
				//extracting variant data 
				var proName = JSON.parse(dataContainer).productName;
				var proCode = JSON.parse(dataContainer).productCode;
					
				var productType = JSON.parse(dataContainer).productType;
				var price=JSON.parse(dataContainer).price;
				var reviewCount = JSON.parse(dataContainer).reviewCount;
				var frame = JSON.parse(dataContainer).frame;
				var lens = JSON.parse(dataContainer).lens;
				var vlt = JSON.parse(dataContainer).vlt;
				var lensMaterial = JSON.parse(dataContainer).lensMaterial;
				var fit=JSON.parse(dataContainer).fit;
				var stockCheck = JSON.parse(dataContainer).caseText;
				var stockCode = JSON.parse(dataContainer).stockCode;
				var productHoverThumb = JSON.parse(dataContainer).productImage;
				var productZoomThumb = JSON.parse(dataContainer).productZoomImage;
				var wishListFlag = JSON.parse(dataContainer).wishListFlag;
					
				// variants div containers
				var productHolderMob = fcwBtn.parents('#pdpPage').find('.product-holder-tab-mob');
				var productHolder = fcwBtn.parents('.product-holder');
				var productPrice=productHolder.find('.add-to-cart-form .price-qty-wrap .pq-price');
					
				var productTitleMob = productHolderMob.find('.product-title h2');
				var productCodeMob = productHolderMob.find('.hol-prescription .pr-code');
				
				var productTitle  = productHolder.find('.product-title h2');
				var productCode = productHolder.find('.hol-prescription .pr-code');
				var readReview = productHolder.find('.hol-rating-reviews .review-lnks .review');
				var frameDesc = productHolder.find('.pdesc-wrap .pdesc-frame');
				var lensDesc = productHolder.find('.pdesc-wrap .pdesc-lens');
				var vltDesc = productHolder.find('.pdesc-wrap .vlt');
				var lensMatDesc = productHolder.find('.pdesc-wrap .pdesc-lens-material');
				var stockStatus = productHolder.find('.instock-help .ins-row .strong');
				var productHoverImage = productHolder.find('.product-zoomhovering-view');
					
				var productSetHoverImage = productHolder.find('.product-360-view .product360SetHover');
					
				var productZoomImage = productHolder.parents('#pdpPage').find('.product-zoom-mainview .product-thumb');
				var productMainImage = productHolder.parents('#pdpPage').find('.rotating-360-product .product-360-view');
				if(i === 0) {
						//fcwBtn.parent().addClass(activeClass);			
				}
					
				$(this).click(function() {
					
					if(productType== "true")
						{
							var power=$(".magnification-holder .selection").text();
							var myString = power.replace(/\D/g, '');
							var totalSize=proCode.length;
							//substract last 2 digits from totalSize
							var productCodeLength2 = proCode.length - 2;
							//fetch value of code from 0 to before last 2 digit
							var productCodeWihoutLastTwo=proCode.substr(0,productCodeLength2);
							var finalNewSkuValuepdp =productCodeWihoutLastTwo+myString;
							
							productCode.eq(0).removeClass('hide').html(finalNewSkuValuepdp);
							productCode.eq(1).addClass('hide').html(finalNewSkuValuepdp);
							
							productCodeMob.eq(0).removeClass('hide').html(finalNewSkuValuepdp);
							productCodeMob.eq(1).addClass('hide').html(finalNewSkuValuepdp);
							
							$("#addtocartproduct").val(finalNewSkuValuepdp);
							$("#addtowishlistproduct").val(finalNewSkuValuepdp);
							
						}
						else
						{
							productCode.eq(0).removeClass('hide').html(proCode);
							productCode.eq(1).addClass('hide').html(proCode);
							
							productCodeMob.eq(0).removeClass('hide').html(proCode);
							productCodeMob.eq(1).addClass('hide').html(proCode);
							
							$("#addtocartproduct").val(proCode);
							$("#addtowishlistproduct").val(proCode);
						}
						 
						
						
						readReview.eq(0).removeClass('hide').html(reviewCount);
						readReview.eq(1).addClass('hide').html(reviewCount);
						
						productPrice.eq(0).removeClass('hide').html(price);
						productPrice.eq(1).addClass('hide').html(price);
						
						frameDesc.eq(0).removeClass('hide').html(frame);
						frameDesc.eq(1).addClass('hide').html(frame);
						
						lensDesc.eq(0).removeClass('hide').html(lens);
						lensDesc.eq(1).addClass('hide').html(lens);
						
						vltDesc.eq(0).removeClass('hide').html(vlt);
						vltDesc.eq(1).addClass('hide').html(vlt);
						
						lensMatDesc.eq(0).removeClass('hide').html(fit);
						lensMatDesc.eq(1).addClass('hide').html(fit);
						
						stockStatus.eq(0).removeClass('hide').html(stockCheck);
						stockStatus.eq(1).addClass('hide').html(stockCheck);
						
						productHoverImage.removeClass('hide').find('img').attr('src', productHoverThumb);
						productSetHoverImage.removeClass('hide').find('img').attr('src', productHoverThumb);
						
						productZoomImage.find('img').attr('src', productZoomThumb);
						productMainImage.find('img').attr('src', productHoverThumb);
						fcwBtns.parent().removeClass(activeClass);
						fcwBtn.parent().addClass(activeClass);
						
						
						
						$(".pdhero-mcarousal .mobile-product-view").hide();
						$(".pdhero-mcarousal .mobile-product-view .owl-carousel").show();
						$(".pdhero-mcarousal .mobile-product-view#"+$(this).attr("alt")).show();
						
						 
						var dataContainer = fcwBtn.attr('data-fcwvariants');
						var wishListFlag = JSON.parse(dataContainer).wishListFlag;
					
						if(wishListFlag == "true"){
							//document.getElementById('addtowishlistMsg').style.display = 'block';
							//document.getElementById('addtowishlist').style.display = 'none';
							$('#addtowishlist').hide();
							$('#addedtowishlist').show();
						
						}else{
							//document.getElementById('addtowishlist').style.display = 'block';
							//document.getElementById('addtowishlistMsg').style.display = 'none';
							$('#addtowishlist').show();
							$('#addedtowishlist').hide();
							}
						if(stockCode == "outOfStock")
					       {
					       $('#outOfStockButton').show();
					       $('#addToCartButton').hide();
					       }
					      if(stockCode == "inStock")
					       {
					       $('#outOfStockButton').hide();
					       $('#addToCartButton').show();
					       }
						
					}).hover(function(){
						
						
						if(productType =="true")
						{
							var power=$(".magnification-holder .selection").text();
							var myString = power.replace(/\D/g, '');
							var totalSize=proCode.length;
							//substract last 2 digits from totalSize
							var productCodeLength2 = proCode.length - 2;
							//fetch value of code from 0 to before last 2 digit
							var productCodeWihoutLastTwo=proCode.substr(0,productCodeLength2);
							 var  finalNewSkuValuepdp =productCodeWihoutLastTwo+myString;
							productCode.eq(0).addClass('hide');
							productCode.eq(1).removeClass('hide').html(finalNewSkuValuepdp);
							
							productCodeMob.eq(0).addClass('hide');
							productCodeMob.eq(1).removeClass('hide').html(finalNewSkuValuepdp);
							
							//$("#addtocartproduct").val(finalNewSkuValuepdp);
						}
						else
						{
							productCode.eq(0).addClass('hide');
							productCode.eq(1).removeClass('hide').html(proCode);
							
							productCodeMob.eq(0).addClass('hide');
							productCodeMob.eq(1).removeClass('hide').html(proCode);
							//$("#addtocartproduct").val(proCode);
						}
						
						
						readReview.eq(0).addClass('hide');
						readReview.eq(1).removeClass('hide').html(reviewCount);
						
						
						productPrice.eq(0).addClass('hide');
						productPrice.eq(1).removeClass('hide').html(price);
						
					
						
						frameDesc.eq(0).addClass('hide');
						frameDesc.eq(1).removeClass('hide').html(frame);
						
						lensDesc.eq(0).addClass('hide');
						lensDesc.eq(1).removeClass('hide').html(lens);
						
						vltDesc.eq(0).addClass('hide');
						vltDesc.eq(1).removeClass('hide').html(vlt);
						
						lensMatDesc.eq(0).addClass('hide');
						lensMatDesc.eq(1).removeClass('hide').html(fit);
						
						stockStatus.eq(0).addClass('hide');
						stockStatus.eq(1).removeClass('hide').html(stockCheck);
						
						productHoverImage.removeClass('hide').find('img').attr('src', productHoverThumb);
						
						
						if($(this).parent(".fcw-item").hasClass("active")){
						}
						else
						{
						$(".rotating-360-product-primary-image").hide(); 
						$(".rotating-360-product").hide();
						$(".rotating-360-product-hover").show();
						
						}
	
						 
					}, function(){
						
						
						productPrice.eq(0).removeClass('hide');
						productPrice.eq(1).addClass('hide').empty();
						
						productCode.eq(0).removeClass('hide');
						productCode.eq(1).addClass('hide').empty();
						
						productCodeMob.eq(0).removeClass('hide');
						productCodeMob.eq(1).addClass('hide').empty();
						
						readReview.eq(0).removeClass('hide');
						readReview.eq(1).addClass('hide').empty();
						
						frameDesc.eq(0).removeClass('hide');
						frameDesc.eq(1).addClass('hide').empty();
						
						lensDesc.eq(0).removeClass('hide');
						lensDesc.eq(1).addClass('hide').empty();
						
						vltDesc.eq(0).removeClass('hide');
						vltDesc.eq(1).addClass('hide').empty();
						
						lensMatDesc.eq(0).removeClass('hide');
						lensMatDesc.eq(1).addClass('hide').empty();
						
						stockStatus.eq(0).removeClass('hide');
						stockStatus.eq(1).addClass('hide').empty();
						
						productHoverImage.addClass('hide');
						$(".rotating-360-product").show();
						$('#colorways_black_click').removeClass('rotating-360-product-click').addClass('rotating-360-product-click-new');
					     $(".rotating-360-product-click-new").hide();
					     $(".rotating-360-product-click-new2").show();
						
						$(".rotating-360-product-hover").hide();
						$(".rotating-360-product#"+$(".frame-colorways .fcw-item.active a").attr("alt")).show();
						var flag=$('#critical_flag').val();
						if(flag=="ok"){ 
							$(".rotating-360-product-primary-image").show(); 
						}
						else {
							$(".rotating-360-product-primary-image").hide();
							 
						}
					});
				});
			});
		},
		// main product gallery
		bindProductGallery: function(){
			var activeClass = 'active';
			jQuery('.product-holder-left .thumbnails-list').each(function() {
				var btns = jQuery('.cloud-zoom-gallery', this);
				btns.each(function(i) {
					var btn = jQuery(this);
					var currentImage = btn.attr("data-thumb");
					
					if(i === 0) {
						btn.parent().addClass(activeClass);
					}
					btn.on("click", function(event){
						if($(this).parent().hasClass('active')){
							event.preventDefault();
						}else{
							$(".rotating-360-product img").fadeOut(function() {
								$(this).attr("src",currentImage).fadeIn("fast");
							});
							btns.parent().removeClass(activeClass);
							btn.parent().addClass(activeClass);		
						}
					});
				})
			});
		}		
};
var ZealPDP = ZealPDP || {};
ZealPDP.YouMayAlsoLike = {
	init: function() {
		this.bindOwlCarousel(); 
		this.bindSwatchVariant();
	},
	bindOwlCarousel: function(){
		var youMayLikeCarousel = $("#youMayLikeCarousel");
		enquire.register("screen and (max-width:991px)", {
			match : function() {
				youMayLikeCarousel.owlCarousel({
					itemsCustom : [
						[0, 1],
						[767, 2]
					],
					navigation : false
				});
			},
			unmatch : function(){
				youMayLikeCarousel.data('owlCarousel').destroy();
			}
		});
	},
	bindSwatchVariant: function(){
		var activeClass= 'selected';
		$('#youMayLikeCarousel .swatch-wrapper li a').click(function (){
			$selectedImg = $(this).parents('.product-column').find('.product-image img').attr('src');
			$activeListItem = $(this).parents('.swatch-wrapper li.selected').index();
			$newSwatchImg = $(this).attr('data-varianturl');				

			$(this).parents('.product-column').find('.product-image img').attr('src',$newSwatchImg);
			$(this).parents('.product-column').find('.swatch-wrapper li').removeClass(activeClass);
			$(this).parents('.swatch-wrapper li').eq($activeListItem).addClass(activeClass);
		}).hover(
			function(){
				$selectedImg = $(this).parents('.product-column').find('.product-image img').attr('src');
				$activeListItem = $(this).parents('.swatch-wrapper li.selected').index();
				$newSwatchImg = $(this).attr('data-varianturl');
						
				$(this).parents('.product-column').find('.product-image img').attr('src',$newSwatchImg);
			},
			function(){
				$(this).parents('.product-column').find('.product-image img').attr('src',$selectedImg);
			}
		);
	}	
};

var ZealPDP = ZealPDP || {};
ZealPDP.App = {
    resizeCompleteTimeout: 0,
    resizeCompleteDelay: 500,
    vendor: "",
    isAndroid: !1,
    isIDevice: !1,
    isPlaybook: !1,
    isTouchPad: !1,
    has3d: !1,
    hasTouch: !1,
    hasTransform: !1,
    hasTransitionEnd: !1,
    isMobile: !1,
    init: function() {
        this.setBrowserVars(), ZealPDP.prodctDescriptionPage.init(), ZealPDP.YouMayAlsoLike.init(), $(window).resize($.proxy(this.resizeUpdate, this)), this.resizeUpdate()
    },
    resizeUpdate: function() {
        this.isMobile && this.orientationChangeUpdate(), 0 !== this.resizeCompleteTimeout && clearTimeout(this.resizeCompleteTimeout), this.resizeCompleteTimeout = setTimeout($.proxy(this.resizeUpdateComplete, this), this.resizeCompleteDelay)
    },
    resizeUpdateComplete: function() {},
    orientationChangeUpdate: function() {},
    setBrowserVars: function() {
        this.vendor = /webkit/i.test(navigator.appVersion) ? "webkit" : /firefox/i.test(navigator.userAgent) ? "Moz" : "opera" in window ? "O" : "", this.isAndroid = /android/gi.test(navigator.appVersion), this.isIDevice = /iphone|ipad|ipod/gi.test(navigator.appVersion), this.isPlaybook = /playbook/gi.test(navigator.appVersion), this.isTouchPad = /hp-tablet/gi.test(navigator.appVersion), this.has3d = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix, this.hasTouch = "ontouchstart" in window && !this.isTouchPad, this.hasTransform = this.vendor + "Transform" in document.documentElement.style, this.hasTransitionEnd = this.isIDevice || this.isPlaybook, this.isMobile = this.isAndroid || this.isIDevice || this.isPlaybook || this.isTouchPad, this.isAndroid ? $("html").addClass("android") : this.isIDevice && $("html").addClass("ios"), this.isMobile && $("html").addClass("mobile")
    }
}, $(document).ready(function() {
    ZealPDP.App.init()
});