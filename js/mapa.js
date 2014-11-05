var map;
var marker;
var watchID;
var latitude = null;
var longitude = null;


$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //uncomment for testing in Chrome browser
    onDeviceReady();
 
});

 

function onDeviceReady() {
     
    var onSuccess = function(position) {
       //position.coords.latitude;
       document.getElementById("Vlongitude").value = position.coords.longitude;
       document.getElementById("Vlatitude").value = position.coords.latitude;
    };

    $(window).unbind();
    $(window).bind('pageshow resize orientationchange', function(e) {
        max_height();
    });
    max_height();
     
    
    navigator.geolocation.getCurrentPosition(success, onError);
   
    function success(position){
        document.getElementById("Vlongitude").value = position.coords.longitude;
        document.getElementById("Vlatitude").value = position.coords.latitude;
    }
    
      setTimeout(function(){
        google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=pt"});
    }
    , 3000);
    
   // google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=pt"});
    
    // onError Callback receives a PositionError object
    function onError(error) {
        /*alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');*/
        
        alert("Erro ao utilizar a geolocalização");
        
    }

}

 

function max_height() {
    var h = $('div[data-role="header"]').outerHeight(true);
    var f = $('div[data-role="footer"]').outerHeight(true);
    var w = $(window).height();
    var c = $('div[data-role="content"]');
    var c_h = c.height();
    var c_oh = c.outerHeight(true);
    var c_new = w - h - f - c_oh + c_h;
    var total = h + f + c_oh;
    if (c_h < c.get(0).scrollHeight) {
        c.height(c.get(0).scrollHeight);
    } else {
        c.height(c_new);
    }
}

//o split separa a string quando encontra o ? 
var variaveis=location.search.split("="); 

if(variaveis.length!=1)
{
    //alert(variaveis);
    var quebra = variaveis[1];
   // alert(quebra);
    url = "http://www.estudenafederal.com.br/livesystem/ServiceMobile/index.php?pesquisa="+quebra;    
}
else
{
    url = "http://www.estudenafederal.com.br/livesystem/ServiceMobile/index.php?pesquisa=";
}

var xmlhttp = new XMLHttpRequest();

var markers;

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp.responseText);
    }
}

xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(response) {
    var arr = JSON.parse(response);
    markers = arr;    
}

function map() {
   
    lat = document.getElementById("Vlatitude").value;
    lon =  document.getElementById("Vlongitude").value;
    
    
    //    lat = -23.284931;
    //    lon = -47.270636;
    
    
    var latlng = new google.maps.LatLng(lat,lon);
    var myOptions = {
        zoom: 10,
        center: latlng,
        streetViewControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
        watchID = navigator.geolocation.watchPosition(gotPosition, null, {maximumAge: 5000, timeout: 60000, enableHighAccuracy: true});
    });
    
    
 /****************************pontos*****************************************************************************************************/   
  //minha localização
 /* var latlngMy = new google.maps.LatLng(document.getElementById("Vlatitude").value, document.getElementById("Vlongitude").value);
    markerMy = new google.maps.Marker({
        position: latlngMy,
        map: map,
        title: "Sua Localização",
        animation:google.maps.Animation.DROP,
        icon: new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/red.png")
    });*/
        
        
    var latitudeLongitudeUm = null;
    var markerOne = null;
    var icon = "http://www.acheseuecoponto.com.br/posicao.png";
    
    if(markers.length == 0)
        alert("Não há pontos cadastrados para o tipo informado!");
    
    for(var i = 0; i < markers.length; i++) {
       
        switch (markers[i].description)
         {
             case "Vidro e Plastico":
                 icon = "http://www.acheseuecoponto.com.br/images/marcador10.png";
             break;
              case "Pilhas e Baterias":
                 icon = "http://www.acheseuecoponto.com.br/images/marcador5.png";
             break;
              case "Reciclaveis":
                 icon = "http://www.acheseuecoponto.com.br/images/marcador3.png";
             break;
              case "Eletroeletronico":
                 icon = "http://www.acheseuecoponto.com.br/images/marcador6.png";
             break;
              case "Oleo":
                 icon = "http://www.acheseuecoponto.com.br/images/marcador10.png";
             break;
              case "Bateria":
                 icon = "http://www.acheseuecoponto.com.br/images/marcador2.png";
             break;
              case "Remedios":
                 icon = "http://www.acheseuecoponto.com.br/images/marcador2.png";
             break;
             case "Entulho":
                 icon = "http://www.acheseuecoponto.com.br/images/marcador3.png";
             break;
             case "Outros":
                 icon = "http://www.acheseuecoponto.com.br/images/marcador2.png";
             break;
            default:
                icon = "http://www.acheseuecoponto.com.br/images/marcador2.png";
         } 
       
         
    
        latitudeLongitudeUm = new google.maps.LatLng(Number(markers[i].lat), Number(markers[i].lng));
    
        markerOne = new google.maps.Marker({
            position: latitudeLongitudeUm,
            map: map,
            title: markers[i].title,
            animation:google.maps.Animation.DROP,
            icon: new google.maps.MarkerImage(icon)
        });
        
    } 
     /************************************************************************************************************************************/
}

// Method to open the About dialog
function showAbout() {
    showAlert("Google Maps", "Created with NetBeans 7.4");
}
;

function showAlert(message, title) {
    if (window.navigator.notification) {
        window.navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}

function gotPosition(position) {
   // map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
   
    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    // document.getElementById("Vlongitude").value = position.coords.longitude;
    // document.getElementById("Vlatitude").value = position.coords.latitude;
     
    if (!marker) {
        //create marker
        marker = new google.maps.Marker({
            position: point,
            map: map,
            icon:"http://www.acheseuecoponto.com.br/images/posicao.png"
            
        });
    } else {
        //move marker to new position
        marker.setPosition(point);
    }
}

function consultar()
{   
    window.location.href="consulta.html";
}

function home()
{
    window.location.href="index.html";
}

function fLoadStop(event){
	var url = event.url;
	var filename = url.substring(url.lastIndexOf('/')+1);
	if(filename == "closeInAppBrowser.html"){
		 facePop.close();
	 }
}

function fExit(event){
	 facePop.removeEventListener('loadstop', fLoadStop);
	 facePop.removeEventListener('exit', fExit);
}


function selectMarker()
{ 
   var contE = 0;
        var paramNovo="";
        
        if(document.getElementById('checkboxRe').checked){
            paramNovo+="Vidro";
            contE++;
        }
        
        if(document.getElementById('checkboxEl').checked){
            if(contE > 0)
                paramNovo+="&Plastico";
            else
                paramNovo+="Plastico";
             contE++;
        }
        
        if(document.getElementById('checkboxOl').checked){
            if(contE > 0)
                paramNovo+="&Oleo";
            else
                paramNovo+="Oleo";
             contE++;
    
        }
        
        if(document.getElementById('checkboxBa').checked){
            if(contE > 0)
                paramNovo+="&Baterias";
            else
                paramNovo+="Baterias";
             contE++;
           
        }
         
        if(document.getElementById('checkboxRm').checked){
             if(contE > 0)
                paramNovo+="&Remedios";
            else
                paramNovo+="Remedios";
             contE++;
          
        }
        
        if(document.getElementById('checkboxEn').checked){
            if(contE > 0)
                paramNovo+="&Entulho";
            else
                paramNovo+="Entulho";
             contE++;
           
        }
        
        if(document.getElementById('checkboxOu').checked){
            if(contE > 0)
                paramNovo+="&Outros";
            else
                paramNovo+="Outros";
             contE++;
           
        }
     
    
    window.location.href="index.html?busca="+paramNovo;
    document.getElementById('map').hidden = false;
    document.getElementById('consulta').hidden = true;
}


function tracaRota()
{
    window.location.href="consultaRota.html";
}