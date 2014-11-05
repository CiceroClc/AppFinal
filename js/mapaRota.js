var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();


//o split separa a string quando encontra o ? 
var variaveis=location.search.split("="); 
if(variaveis[0] == "?busca")
{
    var quebra = variaveis[1];
    url = "http://www.estudenafederal.com.br/livesystem/ServiceMobile/index.php?pesquisa="+quebra; 
    document.getElementById('consulta').hidden = true;
    document.getElementById('lstItens').hidden = false;
    document.getElementById( 'compartilhar' ).style.display = 'none';
    document.getElementById( 'botoesMapa' ).style.display = 'none';
  
    
}
else if(variaveis[0] == "?buscaCod")
{
    var quebra = variaveis[1];
    url = "http://www.estudenafederal.com.br/livesystem/ServiceMobile/buscaCodigo.php?pesquisa="+quebra;
    document.getElementById('lstItens').hidden = true;
    document.getElementById('consulta').hidden = true;
   // document.getElementById('trajeto-texto').hidden = false;
    document.getElementById('mapa').hidden = false;
}
else
{
    url = "";
	document.getElementById('botaoFiltro').style.display = 'none';
	document.getElementById('botaoRota').style.display = 'none';
}
//oculta 
   //document.getElementById( 'botaoMapa' ).style.display = 'none';  

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
     
     navigator.geolocation.getCurrentPosition(function (position) { 
            meuPonto = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            
            menorDistancia = 0;
            menorTitle = "";
            menorCod = "";
            
            var lstPontos = [];
            
            for(i = 0; i < arr.length; i++) {
                 pontoRota = new google.maps.LatLng(arr[i].lat, arr[i].lng);
                 distancia = google.maps.geometry.spherical.computeDistanceBetween(meuPonto, pontoRota);
                 distancia = (distancia/1000).toFixed(2);
                 
                 var ponto = {cod: arr[i].cod, title: arr[i].title, distancia: distancia};
                 lstPontos.push(ponto);
                 
                /* if(distancia < menorDistancia || menorDistancia == 0){
                     menorDistancia = distancia;
                     
                 }*/
                 
               // $('#pontos').append('<li><a href="MapaRota.html?buscaCod='+arr[i].cod+'" target="_self">'+arr[i].title+' - ' + distancia +' km</a></li>');
            }
            lstPontos.sort(function(a, b){return a.distancia-b.distancia});
            
            //melhor ponto
            $('#pontos').append('<li><a href="MapaRota.html?buscaCod='+lstPontos[0].cod+'" target="_self">'+lstPontos[0].title+' - ' + lstPontos[0].distancia +' km</a></li>');

            
            for(i = 1; i < lstPontos.length;i++){
                $('#pontos').append('<li><a href="MapaRota.html?buscaCod='+lstPontos[i].cod+'" target="_self">'+lstPontos[i].title+' - ' + lstPontos[i].distancia +' km</a></li>');
            }
            $('#pontos').listview('refresh');

       });   
}

function initialize() {	
	directionsDisplay = new google.maps.DirectionsRenderer();
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	
    var options = {
        zoom: 5,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
	directionsDisplay.setMap(map);
	//directionsDisplay.setPanel(document.getElementById("trajeto-texto"));
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {

			pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pontoPadrao);
			
			var geocoder = new google.maps.Geocoder();
			
			geocoder.geocode({
				"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					//$("#txtEnderecoPartida").val(results[0].formatted_address);
                                        if(variaveis[0] == "?buscaCod")
                                        {
                                            var enderecoPartida = results[0].formatted_address;
                                            var enderecoChegada = markers[0].end;
                                        }

                                        var request = {
                                            origin: enderecoPartida,
                                            destination: enderecoChegada,
                                            travelMode: google.maps.TravelMode.DRIVING
                                         };

                                        directionsService.route(request, function(result, status) {
                                                if (status == google.maps.DirectionsStatus.OK) {
                                                        directionsDisplay.setDirections(result);
                                                }
                                        });
				}
            });
		});
	}
}

initialize();

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
     
    
    window.location.href="MapaRota.html?busca="+paramNovo;
    document.getElementById('map').hidden = false;
    document.getElementById('consulta').hidden = true;
}

function select()
{
    window.location.href="mapa.html";
}

function tracaRota()
{
    window.location.href="consultaRota.html";
}
function consultar()
{   
    window.location.href="consulta.html";
}

function home()
{
    window.location.href="index.html";
}