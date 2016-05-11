ACC.storefinder = {
	map:"",
	bindAll: function ()
	{
		
		this.drawMap();
		this.getStoreMarkersImages();
		this.bindFindStoresNearMe();
	},
	
	drawMap: function(){
		if($('#map_canvas').length!=0)
		{
			var $e=$('#map_canvas')
			
			var centerPoint = new google.maps.LatLng($e.data("latitude"), $e.data("longitude"));
			var mapOptions = {
				zoom: 13,
				zoomControl: true,
				panControl: true,
				streetViewControl: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: centerPoint
			}
			
			ACC.storefinder.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			if($e.data("southLatitude"))
			{
				this.setMapBouns();
				this.getStorePosition();
			}
			else{
				store =$e.data('stores');				
				this.addStore(store.id,store.latitude,store.longitude, store.name, store.prescription)
			}
		}
	},
	
	setMapBouns: function(){
		
		var $e=$('#map_canvas');
		var swBounds=new google.maps.LatLng($e.data("southLatitude"), $e.data("westLongitude"));
		var neBounds=new google.maps.LatLng($e.data("northLatitude"), $e.data("eastLongitude"));
		var bounds = new google.maps.LatLngBounds(swBounds, neBounds);
		ACC.storefinder.map.fitBounds(bounds);
	},
	
	
	
	getStorePosition: function(){
		var infowindow = new google.maps.InfoWindow({
			
			disableAutoPan: true
		});
		var $e=$('#map_canvas');
		var markerMap={};
		//stores = $.parseJSON($e.data('stores')); //OOB code, giving error with jquery min1.11
		stores = $e.data('stores'); //changed code to work with jquery min 1.11
			$.each( stores, function( k, v ) {
			ACC.storefinder.addStore( v.id,v.latitude,v.longitude,v.name,v.prescription,v.code,v.map_code,infowindow,markerMap);
		});
	},
	
	addStore: function(i,latitude,longitude, name, prescription,code,map_code,infowindow,markerMap)
	{
			var iconPath = "http://maps.google.com/mapfiles/marker" + 'ABCDE'.charAt(i) + ".png";
			
			if(prescription=="true")
				iconPath=ACC.config.zocommonResourcePath+"/images/location-icon-blue.png";
			else
				iconPath=ACC.config.zocommonResourcePath+"/images/location-icon-orange.png";
			
			var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: ACC.storefinder.map,
			code: name,
			icon:iconPath
			//icon: "http://maps.google.com/mapfiles/marker" + 'ABCDE'.charAt(i) + ".png"
		});
			markerMap[code]=marker;
			
		
		google.maps.event.addListener(marker, 'click', function ()
		{
			infowindow.setContent(document.getElementById(map_code).innerHTML);
			infowindow.open(ACC.storefinder.map, this);
			$(".store-locator-list").removeClass("active");
			$("#"+code).addClass("active");
			
		});
		$("#"+code).click(
				function(){
				$('.store-locator-list').removeClass('active');
				$(this).addClass("active");		
		
			var marker = new google.maps.Marker({
			position: new google.maps.LatLng($(this).attr("data-latitude"), $(this).attr("data-longitude")),
			map: ACC.storefinder.map,
			title: name,
			icon:iconPath});
			/*var infowindow = new google.maps.InfoWindow({
				content: ""+document.getElementById(map_code).innerHTML,
				disableAutoPan: true
				
				});
			infowindow.close();*/
			infowindow.setContent(document.getElementById(map_code).innerHTML);
			
			infowindow.open(ACC.storefinder.map, marker);
			
	});
		$("#"+code).hover(
				function(){
				$('.store-locator-list').removeClass('active');
		$(this).addClass("active");		
		var hoverMarker=markerMap[$(this).attr("id")];
		if(prescription=="true")
		{
	hoverMarker.setIcon(ACC.config.zocommonResourcePath+"/images/location-icon-blue-big.png");
		}
		else
			{
			hoverMarker.setIcon(ACC.config.zocommonResourcePath+"/images/location-icon-orange-big.png");
			}
		/*var marker = new google.maps.Marker({
			position: new google.maps.LatLng($(this).attr("data-latitude"), $(this).attr("data-longitude")),
			map: ACC.storefinder.map,
			title: name,
			icon:ACC.config.zocommonResourcePath+"/images/location-icon-blue.png"});*/
			
	
			
	},
				function(){
					$('.store-locator-list').removeClass('active');
				
			
					var hoverMarker=markerMap[$(this).attr("id")];
					if(prescription=="true")
						{
					hoverMarker.setIcon(ACC.config.zocommonResourcePath+"/images/location-icon-blue.png");
						}
					else
						{
						hoverMarker.setIcon(ACC.config.zocommonResourcePath+"/images/location-icon-orange.png");
						}
				

				
		});
		
	},

	getStoreMarkersImages: function(){
	
		if($('.storeResultList').length!=0)
		{
			$(".storeMarker").each(function(i){
				$(this).attr("src",'http://maps.google.com/mapfiles/marker' + 'ABCDE'.charAt(i) + '.png')
			})
		}

		
	},
	
	
	
	bindFindStoresNearMe: function(){
		var url = "http://maps.googleapis.com/maps/api/js?sensor=false";
		$.getScript( url, function() {
		$(document).on("click", "#findStoresNearMe", function(e){
			
				
			
			
			e.preventDefault();
			var isPrescription=$(this).attr("code");
			$("#isPrescription").attr("value",isPrescription);
			var gps = navigator.geolocation;
			if (gps)
			{
				gps.getCurrentPosition(ACC.storefinder.positionSuccessStoresNearMe, function (error)
				{
					
					//$('#global-header').after("<div class='notify-storelocator'>"+ error.code + "/" + error.message +"</div>")
					switch(error.code) {
        case error.PERMISSION_DENIED:
        	$("#latitude").val(0.0);
    		$("#longitude").val(0.0);
        	$("#nearMeStorefinderForm").submit();
        	$("#isPrescription").attr("value",false);
          
            break;
        case error.POSITION_UNAVAILABLE:
        	$('#global-header').after("<div class='notify-storelocator'>" + error.message +"</div>")
            break;
        case error.TIMEOUT:
        	$('#global-header').after("<div class='notify-storelocator'>"+ error.message +"</div>")
            break;
        case error.UNKNOWN_ERROR:
        	$('#global-header').after("<div class='notify-storelocator'>"+ error.message +"</div>")
            break;
    }
					 setTimeout(function() {$('.notify-storelocator').slideUp()}, 2000);
					//console.log("An error occurred... The error code and message are: " + error.code + "/" + error.message);
				});
			}
		});
		});
	},
	
	

	positionSuccessStoresNearMe: function (position)
	{	
		var url = "http://maps.googleapis.com/maps/api/js?sensor=false";
		$.getScript( url, function() {
		$("#latitude").val(position.coords.latitude);
		$("#longitude").val(position.coords.longitude);
	
		$("#nearMeStorefinderForm").submit();
		
		});
		return false;
	}
};

$(document).ready(function ()
{
	ACC.storefinder.bindAll();
});

