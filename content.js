/**
*Функция берет куки указанной строки
*@(name) {string} Имя кука
*@(matches) {string} возвращает значение кука
*/
function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
/**
*Функция считает дробную часть из числа
*@(num) {float} число для получения дробной части
*@(result) {float} возвращает дробную часть 
*/
function getDecimal(num) {//получение дробной части
	var result;
	var initialNum = Math.abs(num);
	var roundedNum = Math.round(initialNum);

	if (roundedNum > initialNum) {
		result = roundedNum - initialNum - 1;
		result = Math.abs(result);
		result = +result.toFixed(10);
	}
	else {
		result = initialNum - roundedNum;
		result = +result.toFixed(10);
	}
	return result;
}
var remUrl = document.location.href;
var curUrl = document.location.href.split('&');//бепем текущую ссылку
var youtube = "https://www.youtube.com/watch"
var i = 0;//счетчик таймкодов
var codetimes = 0;
var codetimeslength = 0;
var AdSpeedCook = getCookie("AdSpeed");
chrome.runtime.sendMessage({ method: "serverTime", url: curUrl[0] }, function (responce) {//пытаемся взять тайм коды по текущей ссылке
	codetimes = JSON.parse(responce);
	codetimeslength = codetimes.length;
});
function lul() {
	if (remUrl != document.location.href) {//если ссылка запустилась а content js нет
		remUrl = l = document.location.href;
		curUrl = document.location.href.split('&');//меняем значение текущей ссылке на действительно текущую 
		chrome.runtime.sendMessage({ method: "serverTime", url: curUrl[0] }, function (responce) {//пытаемся взять тайм коды по текущей ссылке
			codetimes = JSON.parse(responce);
			codetimeslength = codetimes.length;
			i = 0;

		});

	}
}
setInterval(lul, 4);

function time() {
	AdSpeedCook = getCookie("AdSpeed");

	javascript: document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 1.0;
	while (codetimes[i]) {
		if ((document.getElementsByClassName("video-stream html5-main-video")[0].currentTime < Math.trunc(codetimes[i]['stop']) * 60 + getDecimal(codetimes[i]['stop']) * 100)//если меньше конца таймкода
			&& (document.getElementsByClassName("video-stream html5-main-video")[0].currentTime > Math.trunc(codetimes[i]['start']) * 60 + getDecimal(codetimes[i]['start']) * 100)) {//если больше начала таймкода
			switch (AdSpeedCook) {
				case 'x2':

					javascript: document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 2.0;

					break;
				case 'x4':

					javascript: document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 4.0;

					break;
				case 'moment':
					javascript: document.getElementsByClassName("video-stream html5-main-video")[0].currentTime = Math.trunc(codetimes[i]['stop']) * 60 + getDecimal(codetimes[i]['stop']) * 100;

					break;
				default:
					alert('Я таких значений не знаю');
			}




		}
		i++;
	}
	i = 0;
}



setInterval(time, 4);

function eeep() {
	let sec = Math.trunc(document.getElementsByClassName("video-stream html5-main-video")[0].currentTime);
	let min = Math.trunc(document.getElementsByClassName("video-stream html5-main-video")[0].currentTime);
	if (sec >= 60) {
		sec = sec % 60;
	}
	time = Math.floor(min / 60) + (sec / 100);

	chrome.runtime.sendMessage({ method: "newlist", message: time, url: document.location.href })
	chrome.runtime.sendMessage({ method: "checklink", message: document.getElementsByClassName("video-stream html5-main-video")[0].currentTime }, function (responce) {
	});


}
setInterval(eeep, 1000);