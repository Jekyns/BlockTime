
chrome.browserAction.onClicked.addListener(function(tab) {//подключаю jquery к контенту
    chrome.tabs.executeScript(null, {file:"jquery.min.js"}, function() {
        chrome.tabs.executeScript(null, {file:"content.js"});
    });
});
function getCookies(domain, name, callback) {
				chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
				if(callback) {
					callback(cookie.value);
				}
				});
			}
var a = 30;
var url = "";
var timecodes=7;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.method == "x2") {
        a = 10;
		chrome.cookies.set({
			"name": "AdSpeed",
			"url": "https://www.youtube.com/",
			"expirationDate":new Date().getTime()/1000 + 3.154e+7,//устанавливаем истечение куки через год
			"value": "x2",
			});
    }
    if (message.method == "x4") {
      chrome.cookies.set({
			"name": "AdSpeed",
			"url": "https://www.youtube.com/",	//http://developer.chrome.com/extensions/cookies.html
			"expirationDate":new Date().getTime()/1000 + 3.154e+7,//устанавливаем истечение куки через год
			"value": "x4",
			});
    }
    if (message.method == "moment") {
       chrome.cookies.set({
			"name": "AdSpeed",
			"url": "https://www.youtube.com/",
			"expirationDate":new Date().getTime()/1000 + 3.154e+7,//устанавливаем истечение куки через год
			"value": "moment",
			});
        
    }
    if (message.method == "ret") {
		var expper;
		
			getCookies("https://www.youtube.com/", "AdSpeed", function(value) {
				//alert(value);
				 window.expper=value;
				 
			});
			//alert(window.expper);
			//sendResponse(expper);
    }
	if (message.method == "geturl") {
		sendResponse(url);
    }
	if (message.method == "serverTime") {
		//alert(url);
		var Site={serverName:"port.16mb.com"}; /* адрес сайта */

			//alert(2);
			$.ajax({
				type:'GET',
				  async: false,
				url:"http://"+Site.serverName+"/primer/ajaxform/ajax.php",
				data:{url:message.url},//передаем на сервер текущую юрл
				response:'text',//тип возвращаемого ответа text либо xml
				cache:false,
				success:function (data) {//возвращаемый результат от сервера(тайм коды в джсон строке)
				//alert(data);
				timecodes=data;// переобразовываем джсон строку
				
				}

			});
			sendResponse(timecodes);//передаем полученный массив в content
			
		
    }
});
