$(document).ready(function() {
	$.ajax({
		type: "GET", url: "AJAX-01.xml", dataType: "xml",
		success: parseXML
	});
	
	$.getJSON("groupMember.json", function (data2) {
		$("#popupBasic").html(data2.groupMemberInfo.member[0].name + "<br>" +
		data2.groupMemberInfo.member[0].login + "<br>" +
		data2.groupMemberInfo.member[0].studentNumber + "<br>" +
		"<img src='images/" + data2.groupMemberInfo.member[0].picture + "' width='50%'>" + "<br>"
		);
		
		$("#popupBasic2").html(data2.groupMemberInfo.member[1].name + "<br>" +
		data2.groupMemberInfo.member[1].login + "<br>" +
		data2.groupMemberInfo.member[1].studentNumber + "<br>" +
		"<img src='images/" + data2.groupMemberInfo.member[1].picture + "' height='50' width='50'>" + "<br>"
		);
		
		$("#page2popup1").html(data2.groupMemberInfo.member[0].name + "<br>" +
		data2.groupMemberInfo.member[0].login + "<br>" +
		data2.groupMemberInfo.member[0].studentNumber + "<br>" +
		"<img src='images/" + data2.groupMemberInfo.member[0].picture + "' width='50%'>" + "<br>"
		);
		
		$("#page2popup2").html(data2.groupMemberInfo.member[1].name + "<br>" +
		data2.groupMemberInfo.member[1].login + "<br>" +
		data2.groupMemberInfo.member[1].studentNumber + "<br>" +
		"<img src='images/" + data2.groupMemberInfo.member[1].picture + "' height='50' width='50'>" + "<br>"
		);	
	});	
	
});
//end of doc load

function parseXML(xml){
	console.log("in parseXML");
	
	$("h1").html("Final Project Assignment<br>" + "Kody Scharf, Andrew Lee<br>" + "991455754, 991457820<br>");

	
}

$(document).on("pagebeforeshow", "#xmlData", function() {
	console.log("in xmlData");
	$.ajax({
		type: "GET", url: "AJAX-01.xml", dataType: "xml", success: getXML
		
	});
});

function getXML(xml) {
	console.log("getXML");
	$(".coord").html("");
	$(".company").html("");
	$(".company").append("Welcome to " + $(xml).find("name").text());
	$(".coord").append("Here are our coordinates: " + "<br>Longitude: " + $(xml).find("longitude").text() + "<br>" + 
						"Latitude: " + $(xml).find("latitude").text()
						);
						
	$("#footerXML").html("<p>" + $(xml).find("phone").text() + "</p><br>" + "<p>" + $(xml).find("Company").attr("url") + "</p>");
	//google map for the company
	var restaurant = {lat: 52.174785 , lng: 0.135078 };
			
			var map = new google.maps.Map(document.getElementById('mapArea'), {
				zoom: 30,
				center: restaurant
			});
			map.setOptions({ minZoom: 5, maxZoom: 15 });
							 
			var marker = new google.maps.Marker({
				position: restaurant,
				animation : google.maps.Animation.DROP,
				icon: 'images/arrow.png', 
				map: map
				
			});	

			info = new google.maps.InfoWindow({
				content: "Kody Scharf || Andrew Lee"
			});
						
			google.maps.event.addListener(marker, "click", function() {
				info.open(map, marker);  
			});	

	$("#drugs").html("");
	$(xml).find("Company").find("product").each(function(){
		
			$("#drugs").append(
					"<section data-role='collapsible'>" +
						"<h3>" + $(this).attr("name") + "</h3>" +
						"<p><span style='font-size: 15px; font-weight: bold;'>Product Brand: " + "</span>" + $(this).find("brand").text() + "</p>" +
						"<p><span style='font-size: 15px; font-weight: bold;'>Drug Name: " + "</span>" + $(this).find("drugName").text() + "</p>" +
						"<p><span style='font-size: 15px; font-weight: bold;'>Product Description: " + "</span>" + $(this).find("description").text() + "</p>" +
						"<p><span style='font-size: 15px; font-weight: bold;'>Directions: " + "</span>" + $(this).find("administered").text() + "</p>" +
						"<p><span style='font-size: 15px; font-weight: bold;'>Do not use if: " + "</span>" + $(this).find("contraindiction").text() + "</p>" +
					"</section>"
			);
		});
		
		$("#drugs").collapsibleset("refresh");
}
//end of getXML


$(document).on("pagebeforeshow", "#home", function() {
	console.log("in json");
	$.ajax({
		type: "GET", url: "JSON05-vitaminsdefinitions.json", dataType: "json", success: getHealth
		
	});
});

function getHealth(data) {
	console.log("in getHealth");
	
	$("title").html(data.vitaminsInfo.title);
	
	start = data.vitaminsInfo.expressionGroup;
	
	for(x=0; x<start.length; x++) {
		$("#jsonBody").append(
					"<p style='font-size: 20px; text-align: center'>" + start[x].expression + "</p>" +
					"<p>" + start[x].explanation + "</p>" +
					"<p><img src='images/" + start[x].picture + "' width='50%'</p>" +
					"<p>" + start[x].reference + "</p>" +
					"<p>" + start[x].referenceURL + "</p><hr>" +
				"</p>"
			);
		
	}	
	$(".lastUpdate").html("");
	$(".lastUpdate").append("Last date modified :" + data.vitaminsInfo.lastUpdated + "<br>Page URL: " + data.vitaminsInfo.pageURL)
}










