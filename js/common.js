$(document).ready(function () {
	/* Load and initialize FastClick, ommits 300ms tap delay */	
	FastClick.attach(document.body);
	/* Init Preetycheckable */		
	$('input:radio, input:checkbox:not(.input-checkbox)').each(function(){
		$(this).prettyCheckable();
	});  
	 // Custom SelectBox 
	$(".custom-select").each(function(){
		var SelectWidth = $(this).width();
		$(this).wrap("<span style='width: "+SelectWidth+"px' class='select-wrapper'></span>");
		$(this).after("<span class='holder'></span>");
		
		var selectedOption = $(this).find(":selected").text();
		$(this).next(".holder").text(selectedOption);
	});
	$(".custom-select").change(function(){
		var selectedOption = $(this).find(":selected").text();
		$(this).nextAll(".holder").text(selectedOption); 
	});
	// Close Promo Bar
	function closePromoBar(){
		$('.top-promobar .btn-close button').on("click", function(){
			$('.top-promobar').slideUp('fast');
		});
	}
	closePromoBar();
	
	//slide transition broken on safari ios 9
	if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
	  document.querySelector('meta[name=viewport]').setAttribute(
		'content', 
		'initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no'
	  );
	}	
	// adding slide animation on top navigation
	function BindMainNavigationSliding() {
			//stick in the fixed 100% height behind the navbar but don't wrap it
			$('#slideNav.navbar .container-fluid').append($('<div id="navbarHeightCol"></div>'));
			// Enter your ids or classes
			var toggler = '.navbar-toggle';
			var pagewrapper = '#pageContent, #globalFooter';
			var navigationwrapper = '.navbar-header';
			var menuwidth = '230px'; // the menu inside the slide menu itself
			var slidewidth = '230px';
			var menuneg = '-230px';
			var slideneg = '-230px';
			$("#slideNav").on("click", toggler, function (e) {
				var selected = $(this).hasClass('slide-active');
				$('#slidemenu').stop().animate({
					left: selected ? menuneg : '0px'
				});
				$('#navbarHeightCol').stop().animate({
					left: selected ? slideneg : '0px'
				});
				$(pagewrapper).stop().animate({
					left: selected ? '0px' : slidewidth
				});
				$(navigationwrapper).stop().animate({
					left: selected ? '0px' : slidewidth
				});
				$(this).toggleClass('slide-active', !selected);
				$('#slidemenu').toggleClass('slide-active');
				$('#pageContent, #globalFooter, .navbar, body, .navbar-header').toggleClass('slide-active');
			});
			var selected = '#slidemenu, #pageContent, #globalFooter, body, .navbar, .navbar-header';
			//
			$(window).on("resize", function () {
				if ($(window).width() > 991 && $('.navbar-toggle').is(':hidden')) {
					$(selected).removeClass('slide-active');
				}
			});
			// dropdown slide animation on show
			$('.dropdown').on('show.bs.dropdown', function(e){
				$(this).find('.dropdown-menu').first().stop(true, true).slideDown(500);
			});
			// dropdown slide animation on hide
			$('.dropdown').on('hide.bs.dropdown', function(e){
			   e.preventDefault();
			  $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200, function(){
				$(this).parent().removeClass('open');
			  });
			});
			//prevent closing all dropdown menu if the click is inside it
			$('#slidemenu .dropdown-menu').bind('click', function (e) { 
				e.stopPropagation();
			});
	}
	BindMainNavigationSliding();
	
	// Equal Column Height
	function BindEqualColumnHeight(container) {
			var currentTallest = 0,
			 currentRowStart = 0,
			 rowDivs = new Array(),
			 $el,
			 topPosition = 0;
		 $(container).each(function() {
		   $el = $(this);
		   $($el).height('auto')
		   topPostion = $el.position().top;

		   if (currentRowStart != topPostion) {
			 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			   rowDivs[currentDiv].height(currentTallest);
			 }
			 rowDivs.length = 0; // empty the array
			 currentRowStart = topPostion;
			 currentTallest = $el.height();
			 rowDivs.push($el);
		   } else {
			 rowDivs.push($el);
			 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		  }
		   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			 rowDivs[currentDiv].height(currentTallest);
		   }
		 });
	}
	
	//video overlay
	$(".video-overlay").click(function(){
		var videoURL = $(this).attr('data-youtubeVideo');
		// Prevent default event incase of empty video url
		if (!videoURL || !videoURL.trim()) {
			return false;
		}
		var $vsp = $(this).attr('data-vsp');

			$.colorbox({
				inline:true,
				maxWidth:"95%",
				overlayClose: false,
				href:"#videoOverlay", 
				className: "video-colorbox",
				onOpen: function(){
					$("#colorbox").css("opacity", 0);
				},
				onComplete: function(){
					$("#colorbox").css("opacity", 1);
					if($vsp==="vimeo"){
						$("#videoOverlay iframe").attr("src",videoURL+"?title=0&byline=0&portrait=0&autoplay=1");
					}else{
						$("#videoOverlay iframe").attr("src",videoURL+"?autoplay=1&modestbranding=1&rel=0&theme=light");
					}
				},
				onCleanup: function(){
					if($vsp==="vimeo"){
						$("#videoOverlay iframe").attr("src",videoURL);
					}else{
						$("#videoOverlay iframe").attr("src",videoURL+"?autoplay=0&modestbranding=1&rel=0&theme=light");
					}
				}
			});
	});

	// Forget Password Popup
	$(".forgot-password-overlay").click(function(){
		$.colorbox({
			inline:true, 
			href:"#resetPasswordOverlay", 
			maxWidth:'95%', 
			className: "reset-password-overlay"
		});
	});
	
	// Condensed Header
	function initCondensedHeader(){
		var base = $('body');
		var head = $('#globalHeader');
		var feedback = $('.browser-feedback');
		var scrolled = false;
		var headerOffsetTop = 20;
		enquire.register("screen and (min-width:992px)", {
			match : function() {
				if (headerOffsetTop < $(window).scrollTop()) {
					base.addClass('condensed-header');
					head.addClass('affix');
					head.animate({height:62}, 50);
					feedback.hide();
					scrolled = true;
				}
				$(document).bind('scroll', function () {
						if (headerOffsetTop < $(window).scrollTop() && !scrolled) {
							base.addClass('condensed-header');
							head.addClass('affix');
							head.animate({height:62}, 50);
							feedback.hide();
							scrolled = true;
						}
						else if (headerOffsetTop > $(window).scrollTop() && scrolled) {
							head.animate({height:100}, 100, function() {
								base.removeClass('condensed-header');
								head.removeClass('affix');
								head.removeAttr('style');
								feedback.show();
							});
							scrolled = false;
						}
				});			
			},
			unmatch : function() {
				base.removeClass('condensed-header');
				head.removeClass('affix');
				head.removeAttr('style');
				$(document).unbind('scroll');
			}
		});
		/* sticky header for mobiles & tablets */
		enquire.register("screen and (max-width:991px)", {
			match : function() {
				$(window).scroll(function() {
					if ($(this).scrollTop() > 1){  
						base.addClass('condensed-header');
						head.addClass('affix');
						feedback.hide();
					}
					else{
						base.removeClass('condensed-header');
						head.removeClass('affix');
						feedback.show();
					}
				});
			}
		});
		/* Getting & Setting dynamic height on navigation div container */
		enquire.register("screen and (max-width:991px)", {
			match : function() {
				$(window).on("load resize", function () {
					var slideNavDivHeight  = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
					$('#slidemenu').css('height', slideNavDivHeight);
				});
			},
			unmatch : function() {
				$(window).on("load resize", function () {
					$('#slidemenu').css('height', 'auto');
				});
			}
		});
	}
	initCondensedHeader();

	var clickSearch = 0;
	function initShowSearchResults(){
		// for large devices
		$('#searchHolder.dropdown').on('show.bs.dropdown', function () {
			setTimeout(function(){
				$('#searchHolder .form-searchbox .form-control').focus();
			}, 700);
			if(clickSearch == 0){
				$("#searchResultsHolder .search-heading").hide();
			}else{
				$("#searchResultsHolder").show();
				if ($("#searchResultsHolder #ui-id-2 li").length >= 1) {
					$(this).find('.dropdown-menu').first().stop(true, true).show();
					$("#searchResultsHolder #ui-id-2").show();
					$("#searchResultsHolder .search-heading").show();
					$("#searchResultsHolder .search-delete").show();
				}
			}
			++clickSearch;		
		});	
		$('#searchHolder.dropdown').on('hide.bs.dropdown', function () {
			$("#searchResultsHolder").hide();
			$('.dropdown-menu').removeAttr('style');
		});	
		// for small devices
		$('#holderSearchMob :input').on('click', function () {
			if(clickSearch == 0){
				$("#searchResultsHolder .search-heading").hide();
			}else{
				$("#searchResultsHolder").show();
				if ($("#searchResultsHolder #ui-id-1 li").length >= 1) {
					$("#searchResultsHolder #ui-id-1").show();
					$("#searchResultsHolder .search-heading").show();
					$("#searchResultsHolder .search-delete").show();	
				}
			}
			++clickSearch;					
		});
	}
	function initClearSearchResults(){
		$('#searchHolder :input').on('keyup blur', function(event) {
			if ($('#searchHolder :input').val() == ''){
				$("#searchResultsHolder > .ui-autocomplete").empty();
			}
		});
		$('#holderSearchMob :input').on('keyup blur', function(event) {
			if($('#holderSearchMob :input').val() == ''){
				$("#searchResultsHolder > .ui-autocomplete").empty();	
			}
		});
		
		// for large devices
		$("#searchHolder .form-searchbox .search-delete").click(function() {
			$("#searchHolder .dropdown-menu").slideUp("fast"); 
			$("#searchHolder").toggleClass("open"); 
			$("#searchHolder :input").val('').focus();
			$("#searchResultsHolder #ui-id-2").empty();
			$("#searchResultsHolder .search-heading").hide();
			$("#searchResultsHolder .search-delete").hide();
		});
		// for mobile
		$("#searchCloseButton").click(function() {
			$("#holderSearchMob :input").val('').focus();
			$("#searchResultsHolder #ui-id-1").empty();
			$("#searchResultsHolder .search-heading").hide();
			$("#searchResultsHolder .search-delete").hide();
		});
	}
	initShowSearchResults();
	initClearSearchResults();	
	
	function moduleHomeHeroCarousel(){
		$moduleOwlContainer = $('#homepageHeroCarousel');
		$moduleOwlSlides = $moduleOwlContainer.children('div');
		// More than one slide - initialize the carousel
		if ($moduleOwlSlides.length > 1) {
			$("#homepageHeroCarousel").owlCarousel({
				navigation : true,
				pagination : true,
				navigationText: [
					"<i class='glyphicon glyphicon-chevron-left'></i>",
					"<i class='glyphicon glyphicon-chevron-right'></i>"
				],
				autoPlay: true,
				mouseDrag: false,
				slideSpeed : 500,
				transitionStyle : "fade",
				singleItem:true		
			});
		 // Only one slide - do something else
		} else {
			
		}
	}
	moduleHomeHeroCarousel();		
	
	function moveArrowTo(ele,event){
		var arrow = $(ele).parents('.seelife-wrap, .seelife-wrap-new').find('.slide-arrow');
		var left = $(ele).position().left+$(ele).outerWidth()/2-arrow.outerWidth()/2;
		if(event=="click"){
			arrow.animate({'left':left}, 200); 
		}else{
			arrow.animate({'left':left}, 0); 
		}
	}
	function seelifeThroughOurLensCarousel(){
		$mainSlider = $(".seelife-wrap .slide");
		mainSliderConf = {
			navigation : false,
			pagination : true,
			singleItem : true,
			slideSpeed : 400,
			transitionStyle : "fade",
			touchDrag: true, 
			mouseDrag: false,
			afterInit : seelifeThroughOurLensCarouselPager,
			afterUpdate : seelifeThroughOurLensCarouselPager
		};
		function seelifeThroughOurLensCarouselPager() {
			var paginatorsLink = $('.seelife-wrap .owl-controls .owl-page');
			$.each(this.owl.userItems, function (i) {
				$(paginatorsLink[i]).html("<div class='slide-count hidden-xs'><img src="+$(this).attr('data-tabicon')+"></div><div class='slide-title hidden-xs'>"+$(this).attr('data-tablabel')+"</div>");
				$(paginatorsLink).bind('click',function(){
					moveArrowTo($(this),"click");				
				});
			});
			return true;
		}
		$mainSlider.owlCarousel(mainSliderConf);
		$mainSliderOwl = $mainSlider.data('owlCarousel');
		$(window).bind('resize load',function() {	
			$mainSlider.each(function() {
				moveArrowTo($(this).find('.owl-page.active'),"resize");			
			});
		});
	}
	seelifeThroughOurLensCarousel();



	function seelifeThroughOurLensCarouselNew(){
		$mainSlider1 = $(".seelife-wrap-new .slide");
		mainSliderConf = {
			navigation : false,
			pagination : true,
			singleItem : true,
			slideSpeed : 400,
			transitionStyle : "fade",
			touchDrag: true, 
			mouseDrag: false,
			afterInit : seelifeThroughOurLensCarouselPagerNew,
			afterUpdate : seelifeThroughOurLensCarouselPagerNew
		};
		function seelifeThroughOurLensCarouselPagerNew() {
			var paginatorsLink = $('.seelife-wrap-new .owl-controls .owl-page');
			$.each(this.owl.userItems, function (i) {
				$(paginatorsLink[i]).html("<div class='slide-count hidden-xs'><img src="+$(this).attr('data-tabicon')+"></div><div class='slide-title hidden-xs'>"+$(this).attr('data-tablabel')+"</div>");
				$(paginatorsLink).bind('click',function(){
					moveArrowTo($(this),"click");				
				});
			});
			return true;
		}
		$mainSlider1.owlCarousel(mainSliderConf);
		$mainSliderOwl = $mainSlider1.data('owlCarousel');
		$(window).bind('resize load',function() {	
			$mainSlider1.each(function() {
				moveArrowTo($(this).find('.owl-page.active'),"resize");			
			});
		});
	}
	seelifeThroughOurLensCarouselNew();

	
	//hd2 tech specs
	BindEqualColumnHeight($(".hd2-page .hd2-techspecs .item"));
	$(window).bind('resize load',function(){	
		BindEqualColumnHeight($(".hd2-page .hd2-techspecs .item"));
	});
	//GPS tech specs
	BindEqualColumnHeight($(".gps-page .gps-techspecs .item"));
	$(window).bind('resize load',function(){	
		BindEqualColumnHeight($(".gps-page .gps-techspecs .item"));
	});
	//PDP Page
	BindEqualColumnHeight($(".product-holder .frame-colorways .fcw-item"));
	$(window).bind('resize load',function(){	
		BindEqualColumnHeight($(".product-holder .frame-colorways .fcw-item"));
	});
	BindEqualColumnHeight($("#pdpPage .pdpabout-container .feature-item"));
	$(window).bind('resize load',function(){	
		BindEqualColumnHeight($("#pdpPage .pdpabout-container .feature-item"));
	});	
	//Ambassador Page
	BindEqualColumnHeight($(".ambassador-page .tab-pane .item"));
	$(window).bind('resize load',function(){	
		BindEqualColumnHeight($(".ambassador-page .tab-pane .item"));
	});	
	//community Page
	BindEqualColumnHeight($(".community-page .tab-pane .item"));
	$(window).bind('resize load',function(){	
		BindEqualColumnHeight($(".community-page .tab-pane .item"));
	});
	
	BindEqualColumnHeight($("#youMayLikeCarousel .product-column"));
	$(window).bind('resize load',function(){	
		BindEqualColumnHeight($("#youMayLikeCarousel .product-column"));
	});
	//Terms & Condition Popup
	$(".termsconditions-overlay").click(function(){
		$.colorbox({
			inline:true,
			maxWidth:"95%",
			maxHeight:"95%",
			overlayClose: true,
			//scrolling: false,
			href:"#popupTermsConditons", 
			className: "popup-terms-conditions",
			onOpen: function(){
				$('body').css({ overflow: 'hidden' });
			},
			onComplete: function(){
				$('body').css({ overflow: 'hidden' });
				//$(this).colorbox.resize(); 
			},
			onCleanup: function(){
				$('body').css({ overflow: '' });
			}	
		});
	});
	
	
	////Mobile Product Page Filter
	$(".tablet-mobile-ul .filter-open a").click(function(){
		$(".tablet-mobile .sort-by-div").stop(true, true).slideUp("fast"); 
		$(".filter-div").slideToggle(400);
		$(this).toggleClass("filter-open-a");
		$(".tablet-mobile .sort-by a").removeClass("active");
	});
	$(".filter-div .filter-tab.active").next(".sub-filter-ul").show();
	$(".filter-div .filter-tab").click(function(){
		$(this).toggleClass("active");
		$(this).next(".sub-filter-ul").slideToggle(400);
	});
	////tablet_mobile
	$(".tablet-mobile .sort-by a").click(function(){
		$(".tablet-mobile .filter-div").stop(true, true).slideUp("fast"); 
		$(".tablet-mobile .sort-by-div").slideToggle("fast");
		$(this).toggleClass("active");
		$(".tablet-mobile-ul .filter-open a").removeClass("filter-open-a");
	});
	////Product Filter
	var DefaultOpenDrawer = $('.grid-option-ul .active').attr('alt');
	$(".grid-option #"+DefaultOpenDrawer).show();
	$('.grid-option-ul a').click(function(){
		var OpenDrawer = $(this).attr("alt");
		$(".grid-option .drawer").slideUp();
		if($(this).attr("class")){
			$(".grid-option #"+OpenDrawer).slideUp();
			$(".grid-option-ul a").removeClass('active');
		}else{
			$(".grid-option #"+OpenDrawer).slideDown();
			$(".grid-option-ul a").removeClass('active');
			$(this).addClass('active');
		}
	});
	$('.frame-style-div a').click(function(){
		$(this).toggleClass('active');
	});
	$('.frame-framestyle a').click(function(){
		$(this).toggleClass('active');
	});
	$('.frame-framecolor a').click(function(){
		$(this).toggleClass('active');
	});
	$('.fit-headsize a').click(function(){
		$(this).toggleClass('active');
	});
	$('.fit-features a').click(function(){
		$(this).toggleClass('active');
	});
	$('.gender a').click(function(){
		$(this).toggleClass('active');
	});
	$('.lens-lenscolor a').click(function(){
		$(this).toggleClass('active');
	});
	$('.lens-lenssize a').click(function(){
		$(this).toggleClass('active');
	});
	$('.gender-gender-div a').click(function(){
		$(this).toggleClass('active');
	});
	$('.material-framematerial a').click(function(){
		$(this).toggleClass('active');
	});
	$('.material-lensmaterial a').click(function(){
		$(this).toggleClass('active');
	});
	
	//// selected_frame
	var DefaultFrameActive = $(".selected-frame-ul li a.active").attr("alt");
	$(".product-div .product-img ."+DefaultFrameActive).addClass('active');
	$(".product-div .product-color#"+DefaultFrameActive).addClass('active');
	$('.selected-frame-ul li a').click(function(){
		$(".selected-frame-ul li a").removeClass('active');
		$(this).addClass('active');
		var CheckFrameActive = $(this).attr("alt");
		$(".product-div .product-img img").removeClass('active');
		$(".product-div .product-img ."+CheckFrameActive).addClass('active');
		$(".product-div .product-color").removeClass('active');
		$(".product-div .product-color#"+CheckFrameActive).addClass('active');
		
	});
	////Product Color Click
	$('.product-div .product-color a').click(function(){
		var ColorImage = $(this).attr("alt");
		var variantPrice=$(this).attr("data-price");
		var backImage=$(this).attr("data-backImage");
		var sideImage=$(this).attr("data-sideImage");
		//$(".product_div .product_img img").attr("src", ColorImage);
		$(this).parents(".product-div").find(".product-img").find(".front").attr("src", ColorImage);
		$(this).parents(".product-div").find(".product-img").find(".back").attr("src", backImage);
		$(this).parents(".product-div").find(".product-img").find(".side").attr("src", sideImage);
		$(this).parents(".product-div").find(".product-price").html(variantPrice);
		$(this).parents(".product-div").find(".product-color a").removeClass("active");
		$(this).addClass("active");
	});
	$('.product-div .product-color a').hover(function(){
		var ColorImage = $(this).attr("alt");
		var variantPrice=$(this).attr("data-price");
		var backImage=$(this).attr("data-backImage");
		var sideImage=$(this).attr("data-sideImage");
		//$(".product_div .product_img img").attr("src", ColorImage);
		$(this).parents(".product-div").find(".product-img").find(".front").attr("src", ColorImage);
		$(this).parents(".product-div").find(".product-img").find(".back").attr("src", backImage);
		$(this).parents(".product-div").find(".product-img").find(".side").attr("src", sideImage);
		$(this).parents(".product-div").find(".product-price").html(variantPrice);
		$(this).parents(".product-div").find(".product-color a").removeClass("active");
		$(this).addClass("active");
	});
	////Product filter information
	//$(".drawer_div a").css("z-index","-1");
	$(".drawer-div a.active").each(function() {
		var DefaultThis = $(this).attr("alt");
		$(this).addClass("InfoActive");
		$(this).parents(".drawer_div").find("div #"+DefaultThis).css("z-index","20");
	});
	var LinkCount = 0;
	$('.drawer-div a').click(function(){
		var This = $(this);
		var ThisParents = $(this).parents(".drawer-div");
		var LinkShow = This.attr("alt");
		LinkCount += 1;
		ThisParents.find("a").removeClass('ThisActive');
		This.addClass('ThisActive');
		if(This.hasClass("InfoActive")){
			This.removeClass('InfoActive');
			ThisParents.find("div #"+LinkShow).css("z-index","-1");
		}else{
			This.addClass("InfoActive");
			ThisParents.find("div #"+LinkShow).css("z-index","2"+LinkCount);
		}
	});
	$('.drawer-div a').hover(function(){
		var HoverTextID = $(this).attr("alt");
		$("#"+HoverTextID).addClass("InfoActive2");
	}, function(){
		$(".show-text .show-text_p").removeClass('InfoActive2');
	});
	$(".tablet-mobile .filter-ul input").change(function(){
		if ($(this).prop('checked')==true){
			$(this).parents(".checkbox").next(".checkbox-info").slideDown();
		}else{
			$(this).parents(".checkbox").next(".checkbox-info").slideUp();
		}
	});
	
	// Community Tabs
	function communityTabs(){
		var tabsAdventureFilterAttr = $('.ct-subtabs .tabsAdventure a').attr("data-filter");
		var gettabsSustainabilityAttr = $('.ct-subtabs .tabsSustainability a').attr("data-filter");
		$(document).on('click', '.ct-subtabs .tabsAdventure > a', function(){
			$('.ct-subtabs .tabsSustainability').removeClass('active');
			$(this).parent().toggleClass('active');
			$('.ct-subtabs #tabsAdventure').slideToggle('fast');
			$('.ct-subtabs #tabsSustainability').hide();
			BindEqualColumnHeight($(".community-page .tab-pane .item"));
			if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off'){
				$('.ct-subtabs .tabsAdventure a').attr('data-toggled','on');
				//$('.ct-subtabs .tabsAdventure a').removeAttr( "data-filter", "" );
				$('.ct-subtabs .tabsAdventure a').attr( "data-filter", "all-sort");
				
				$('.ct-subtabs .tabsSustainability a').attr('data-toggled','off');
				$('.ct-subtabs .tabsSustainability a').removeAttr( "data-filter", "all-sort" );
				$('.ct-subtabs .tabsSustainability a').attr( "data-filter", gettabsSustainabilityAttr );

				//banner - show/hide
				$('#communityLandingParallax1').hide();
				$('#communityLandingParallax2').show();
				$('#communityLandingParallax3').hide();
				
			}
			else if ($(this).attr('data-toggled') == 'on'){
				$('.ct-subtabs .tabsAdventure a').attr('data-toggled','off');
				$('.ct-subtabs .tabsAdventure a').removeAttr( "data-filter", "all-sort" );
				$('.ct-subtabs .tabsAdventure a').attr( "data-filter", tabsAdventureFilterAttr);
				
				$('.ct-subtabs .tabsSustainability a').attr('data-toggled','off');
				$('.ct-subtabs .tabsSustainability a').removeAttr( "data-filter", "all-sort" );
				$('.ct-subtabs .tabsSustainability a').attr( "data-filter", gettabsSustainabilityAttr );
				
				//banner - show/hide
				$('#communityLandingParallax1').show();
				$('#communityLandingParallax2').hide();
				$('#communityLandingParallax3').hide();
			}			
		});
		$(document).on('click', '.ct-subtabs .tabsSustainability > a', function(){
			$('.ct-subtabs .tabsAdventure').removeClass('active');
			$(this).parent().toggleClass('active');
			$('.ct-subtabs #tabsSustainability').slideToggle('fast');
			$('.ct-subtabs #tabsAdventure').hide();
			BindEqualColumnHeight($(".community-page .tab-pane .item"));
			if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off'){
				$('.ct-subtabs .tabsSustainability a').attr('data-toggled','on');
				$('.ct-subtabs .tabsSustainability a').attr("data-filter", "all-sort");
				$('.ct-subtabs .tabsAdventure a').attr('data-toggled','off');
				$('.ct-subtabs .tabsAdventure a').attr( "data-filter", tabsAdventureFilterAttr);
				
				//banner - show/hide
				$('#communityLandingParallax1').hide();
				$('#communityLandingParallax2').hide();
				$('#communityLandingParallax3').show();
			}
			else if ($(this).attr('data-toggled') == 'on'){
			
				$('.ct-subtabs .tabsAdventure a').attr('data-toggled','off');
				$('.ct-subtabs .tabsAdventure a').removeAttr( "data-filter", "all-sort" );
				$('.ct-subtabs .tabsAdventure a').attr( "data-filter", tabsAdventureFilterAttr);
				
				$('.ct-subtabs .tabsSustainability a').attr('data-toggled','off');
				//$('.ct-subtabs .tabsSustainability a').removeAttr( "data-filter", ".all-sort" );
				$('.ct-subtabs .tabsSustainability a').attr( "data-filter", gettabsSustainabilityAttr );
				//banner - show/hide
				$('#communityLandingParallax1').show();
				$('#communityLandingParallax2').hide();
				$('#communityLandingParallax3').hide();
			}
		});
	};
	communityTabs();
	
	// Ambasaddor Tabs
	function ambassadorLandingTabs(){
		var tabsambassador1FilterAttr = $('.ct-subtabs .tabsAmbassador-1 a').attr("data-filter");
		var tabsambassador2FilterAttr = $('.ct-subtabs .tabsAmbassador-2 a').attr("data-filter");
		$(document).on('click', '.ct-subtabs .tabsAmbassador-1 > a', function(){
			$('.ct-subtabs .tabsAmbassador-2').removeClass('active');
			$(this).parent().toggleClass('active');
			$('.ct-subtabs #tabsAmbassador-1').slideToggle('fast');
			$('.ct-subtabs #tabsAmbassador-2').hide();
			BindEqualColumnHeight($(".ambassador-page .tab-pane .item"));
			if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off'){
				$('.ct-subtabs .tabsAmbassador-1 a').attr('data-toggled','on');
				$('.ct-subtabs .tabsAmbassador-1 a').attr("data-filter", "all-sort");
				
				$('.ct-subtabs .tabsAmbassador-2 a').attr('data-toggled','off');
				$('.ct-subtabs .tabsAmbassador-2 a').removeAttr( "data-filter", "all-sort" );
				$('.ct-subtabs .tabsAmbassador-2 a').attr("data-filter", tabsambassador2FilterAttr);
				
				//banner - show/hide
				$('#ambassadorLandingParallax1').hide();
				$('#ambassadorLandingParallax2').show();
				$('#ambassadorLandingParallax3').hide();
			}
			else if ($(this).attr('data-toggled') == 'on'){
				$('.ct-subtabs .tabsAmbassador-1 a').attr('data-toggled','off');
				$('.ct-subtabs .tabsAmbassador-1 a').removeAttr( "data-filter", "all-sort" );
				$('.ct-subtabs .tabsAmbassador-1 a').attr( "data-filter", tabsambassador1FilterAttr);
				
				$('.ct-subtabs .tabsAmbassador-2 a').attr('data-toggled','off');
				$('.ct-subtabs .tabsAmbassador-2 a').removeAttr( "data-filter", "all-sort" );
				$('.ct-subtabs .tabsAmbassador-2 a').attr("data-filter", tabsambassador2FilterAttr);
				
				//banner - show/hide
				$('#ambassadorLandingParallax1').show();
				$('#ambassadorLandingParallax2').hide();
				$('#ambassadorLandingParallax3').hide();				
			}			
		});
		$(document).on('click', '.ct-subtabs .tabsAmbassador-2 > a', function(){
			$('.ct-subtabs .tabsAmbassador-1').removeClass('active');
			$(this).parent().toggleClass('active');
			$('.ct-subtabs #tabsAmbassador-2').slideToggle('fast');
			$('.ct-subtabs #tabsAmbassador-1').hide();
			BindEqualColumnHeight($(".ambassador-page .tab-pane .item"));
			if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off'){
				$('.ct-subtabs .tabsAmbassador-2 a').attr('data-toggled','on');
				$('.ct-subtabs .tabsAmbassador-2 a').attr("data-filter", "all-sort");
				
				$('.ct-subtabs .tabsAmbassador-1 a').attr('data-toggled','off');
				$('.ct-subtabs .tabsAmbassador-1 a').attr("data-filter", tabsambassador1FilterAttr);
				//banner - show/hide
				$('#ambassadorLandingParallax1').hide();
				$('#ambassadorLandingParallax2').hide();
				$('#ambassadorLandingParallax3').show();
			}
			else if ($(this).attr('data-toggled') == 'on'){
			
				$('.ct-subtabs .tabsAmbassador-1 a').attr('data-toggled','off');
				$('.ct-subtabs .tabsAmbassador-1 a').removeAttr("data-filter", "all-sort");
				$('.ct-subtabs .tabsAmbassador-1 a').attr( "data-filter", tabsambassador1FilterAttr);
				
				$('.ct-subtabs .tabsAmbassador-2 a').attr('data-toggled','off');
				$('.ct-subtabs .tabsAmbassador-2 a').attr("data-filter", tabsambassador2FilterAttr);
				//banner - show/hide
				$('#ambassadorLandingParallax1').show();
				$('#ambassadorLandingParallax2').hide();
				$('#ambassadorLandingParallax3').hide();
			}
		});
	};
	ambassadorLandingTabs();
	
	

});