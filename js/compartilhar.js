/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
  
    function fechar(){
       alert('ola');
       window.close();
       // $('.ui-dialog').dialog('close');
    }
});


 function fechar(){
       alert('ola');
       window.close();
       // $('.ui-dialog').dialog('close');
    }
    
 
 window.fbAsyncInit = function () {
	FB.init({
		appId  : '718778058205759',
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		xfbml  : true,  // parse XFBML
		oauth  : true // enable OAuth 2.0
	});
};

(function() {
	var e = document.createElement('script');
	e.src = document.location.protocol + '//connect.facebook.net/pt_BR/all.js';
	e.async = true;
	document.getElementById('fb-root').appendChild(e);
}());

$('#share-button').click(function(e){
	e.preventDefault();
	FB.ui({
		method: 'feed',
		name: 'Selo Verde ',
		link: 'www.acheseuecoponto.com.br',
		picture: '',
		caption: 'Realizo Coleta Seletiva e ganhei um selo verde',
		description: 'Descubra os pontos de coleta mais próximos da sua casa'
	});
});

