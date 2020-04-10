(function (global) {

var dc = {};

var playerUrl = "snippets/player.html";
var playerjson = "data/cards.json";
var datapath = "data/";

imgArray = ["1_kanji_purple.png" , 
 "2_kanji_red.png" ,
 "3_orange_black.png" , 
 "4_kanji_yellow.png" , 
 "5_gadwal_teal.png" ,
 "6_goemetric_multi.png" ,
 "7_chanderi_red.png" , 
 "8_dongria_multi.png" ,
 "9_dongria_yellow.png" , 
 "10_patola_red.png" ,
 "11_patola_blue.png" , 
 "12_sambalpuri_orange.png" , 
 "13_gadwal_yellow.png" , 
 "14_gadwal_white.png" ,
 "15_kasavu.png" ,
 "16_baluchari_blue.png" ,
 "17_balucheri_green.png" , 
 "18_narayanpet_black.png" ,
 "19_chanderi_yellow.png" , 
 "20_ajrakh_red.png" ,
 "21_ajrakh_blue.png" , 
 "22_chanderi_pink.png" , 
 "23_bandhani_pink.png" , 
 "24_bandhani_blue.png" , 
 "25_paithani_blue.png" , 
 "26_paithani_peach.png" ,
 "27_paithani_purple.png" , 
 "28_phulkari_multi.png" ,
 "29_phulkari_yellow.png" , 
 "30_chikenkari_black.png" ,
 "31_banarasi_black.png" ,
 "32_banarasi_purple.png" , 
 "33_banarasi_pink.png" , 
 "34_kalamkari_black.png" , 
 "35_kalamkari_green.png" , 
 "36_batik_red.png" ];

//============================= Common Methods ====================================//

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader2.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}' with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

//=============================Build the Tiles====================================//

// Build the Player Content
function buildPlayerHtml(playerjson, playerUrl) {
  console.log (playerjson);
  console.log (playerUrl);
  var finalHtml = " ";
  var listhtml = playerUrl;
  var imglinks = ""


  // Loop over navjson array
  for (var i = 0; i < playerjson.cards.length; i++) {
	console.log(playerjson.cards[i].set_id)
    var listhtml2 = listhtml;

    listhtml2 = insertProperty(listhtml2, "id", playerjson.cards[i].set_id);
    listhtml2 = insertProperty(listhtml2, "player", playerjson.cards[i].player);

	console.log(listhtml2);
    imglinks = " "
    imglinks += "<tr>"
    for (var j = 0; j < playerjson.cards[i].set_nos.length; j++) {

	 var img_id = j + 1;
	 var img_name = imgArray[playerjson.cards[i].set_nos[j]-1]
     imglinks += "<td><img class=\"tileimage\" src=\"images/" + img_name + "\"></td>"
     if (img_id % 3 == 0) { imglinks += "</tr><tr>" }
//	    <tr> 
//		  <td><img class="tileimage" src="images/1_kanji_purple.png"></td>
//		</tr>
     }
	 imglinks += "</tr>" 
     listhtml2 = insertProperty(listhtml2, "img_links", imglinks);
	 console.log(listhtml2);
	 finalHtml += listhtml2;
  }

 console.log(finalHtml);
  return finalHtml;
}



//============================= load tile ====================================//
// collect all two files playerjson, playerUrl and pass it to build function buildNAVHtml
function ShowPlayerHTML (playerjson) {
//  console.log (playerjson);
//  console.log (playerUrl);

  $ajaxUtils.sendGetRequest(playerUrl,
    function (playerUrl) {
       var ViewNAVHtml = buildPlayerHtml(playerjson, playerUrl);
       insertHtml("#rpt_header", ViewNAVHtml);
    },
    false);
}

var loadPage = function () {
   $ajaxUtils.sendGetRequest( playerjson, ShowPlayerHTML);
};

//~~~~~~~~~~~~EVENT THAT WILL LOAD THE HOME PAGE ~~~~~~~~~~~~~~~~~~//
// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

showLoading("#rpt_header");
loadPage();

});

global.$dc = dc;

})(window);



