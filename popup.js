	
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.method == "newlist") {
		chrome.tabs.getSelected(null, function(tab) {
			if(tab.url==message.url){
				document.getElementById("myform__end").value = message.message;
			}
		})
		
		document.getElementById("myform__start").value = 0;
		 
	}
	if (message.method == "checklink") {
		var eee;
		chrome.tabs.getSelected(null, function(tab) {
			window.eee=tab.url;
		 });
		 sendResponse(window.eee);
	}
	});
	
	function getCookies(domain, name, callback) {
				chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
				if(callback) {
					callback(cookie.value);
				}
				});
			}
				getCookies("https://www.youtube.com/", "AdSpeed", function(value) {
					var radButton1 = document.querySelector('#contactChoice1');
					var radButton2 = document.querySelector('#contactChoice2');
					var radButton3 = document.querySelector('#contactChoice3');
					switch (value){
						case 'x2':
							radButton2.checked=true;
							break;
						case 'x4': 
							radButton3.checked=true;
							break;
						case 'moment':
							radButton1.checked=true;				
							break;
						default:
							alert( 'Я таких значений не знаю' );
					}
			});
 
 chrome.tabs.getSelected(null, function(tab) {
var tabId = tab.id;
  var tabUrl = tab.url.split('&');//разделяем по параметрам строки(0 - ссылкаютуба+идентификатор видео)
  var urlinput = $('#myform__url');
	urlinput.val(tabUrl[0]);
  });
	function sendform(){
		var Site={serverName:"port.16mb.com"}; /* адрес сайта */
		var msg=$('#myform').serialize();
        /* блокируем кнопку отправить */
        document.myform.submit.disabled=true;
		document.myform.submit.value="Подождите...";
        $.ajax({
            type:'POST',
            /* адрес php файла, обрабатывающего форму */
            url:"http://"+Site.serverName+"/primer/ajaxform/ajax.php",
           data:msg+"&action=sendform",
            cache:false,
            success:function(data){
                $("#error").html(data);
                document.myform.submit.disabled=false;
                document.myform.submit.value="Отправить";
            }
        });
		
    }
function awesome() {
    chrome.runtime.sendMessage({ method: "moment" })
}

function awesomex2() {
    chrome.runtime.sendMessage({method:"x2"}) 
}
function awesomex4() {
    chrome.runtime.sendMessage({ method: "x4" })
}

function clickHandler(e) {
    awesome();
}

function clickHandler2(e) {
    awesomex2();
}
function clickHandler4(e) {
    awesomex4();
}
function clickHandler5(e) {
    sendform();
}


function main() {
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector(".moment").addEventListener('click', clickHandler);
    document.querySelector(".x2").addEventListener('click', clickHandler2);
    document.querySelector(".x4").addEventListener('click', clickHandler4);
	document.querySelector("#submit").addEventListener('click', clickHandler5);
    main();
});