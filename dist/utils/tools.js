"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	_dateFormat: function _dateFormat(date, format) {
		// 时间格式数据格式化
		// date：时间格式数据，必填
		// format：按什么格式格式化 非必填
		if (!format) {
			format = 'yyyy-MM-dd hh:ss:mm';
		}
		var o = {
			"M+": date.getMonth() + 1, //月份 
			"d+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds(), //秒 
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
			"S": date.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	},
	_jsonp: function _jsonp(url, success, fail, callbackName) {
		// 跨域请求
		// url 请求的url 参数中必须存在callback
		// success 请求成功的回调函数
		// fail 请求失败的回调函数
		// callbackName 回调函数名称，请求时传过去的
		if (callbackName) {
			window[callbackName] = function (data) {
				success && success(data);
				delete window[callbackName];
			};
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.async = true;
		script.onload = script.onreadystatechange = function () {
			if (!script.readyState || script.readyState === "loaded" || script.readyState === "complete") {
				script.onload = script.onreadystatechange = null;
				if (head && script.parentNode) {
					head.removeChild(script);
				}
			} else {
				fail && fail();
			}
		};
		script.onerror = function () {
			fail && fail();
		};
		head.appendChild(script);
	},
	_shuffCOLOR: function _shuffCOLOR() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return "rgb(" + r + ',' + g + ',' + b + ")"; //所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
	},
	_shuffUUID: function _shuffUUID(count) {
		if (!count) {
			count = 31;
		}
		//生成32位随机数
		var dict = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var num = dict.length;
		var uuid = "";
		var sum = 0;
		for (var i = 0; i < count; i++) {
			var idx = Math.floor(Math.random() * num);
			var ch = dict[idx];
			sum += ch.charCodeAt(0);
			uuid += ch;
		}
		//生成校验位
		uuid += String.fromCharCode(sum % 26 + 97);
		return uuid;
	},
	_getUrlParams: function _getUrlParams(name) {
		var regPara = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var resPara = window.location.search.substr(1).match(regPara);
		if (resPara != null) {
			return unescape(resPara[2]);
		} else {
			return '';
		}
	},
	_setCookie: function _setCookie(name, value, expires) {
		// 设置 cookie 方法
		// cookie存储的名称
		// cookie存储的值
		// cookie存储时间
		var cookiestr = name + "=" + escape(value) + ";";
		if (expires != null) {
			var date = new Date();
			date.setTime(date.getTime() + expires * 1000);
			cookiestr += "expires=" + date.toGMTString() + ";";
		}
		document.cookie = cookiestr;
	},
	_getCookie: function _getCookie(name) {
		//获取cookie
		var arr,
		    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	},
	_delCookie: function _delCookie(name) {
		//删除 cookie
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = Store['getCookie'](name);
		if (cval != null) {
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	},
	_setItem: function _setItem(name, value) {
		window.localStorage.setItem(name, value);
	},
	_getItem: function _getItem(name) {
		window.localStorage.getTime(name);
	},
	_delItem: function _delItem(name) {
		window.localStorage.removeItem(name);
	}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvb2xzLmpzIl0sIm5hbWVzIjpbIl9kYXRlRm9ybWF0IiwiZGF0ZSIsImZvcm1hdCIsIm8iLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiTWF0aCIsImZsb29yIiwiZ2V0TWlsbGlzZWNvbmRzIiwidGVzdCIsInJlcGxhY2UiLCJSZWdFeHAiLCIkMSIsImdldEZ1bGxZZWFyIiwic3Vic3RyIiwibGVuZ3RoIiwiayIsIl9qc29ucCIsInVybCIsInN1Y2Nlc3MiLCJmYWlsIiwiY2FsbGJhY2tOYW1lIiwid2luZG93IiwiZGF0YSIsImhlYWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJzcmMiLCJhc3luYyIsIm9ubG9hZCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJvbmVycm9yIiwiYXBwZW5kQ2hpbGQiLCJfc2h1ZmZDT0xPUiIsInIiLCJyYW5kb20iLCJnIiwiYiIsIl9zaHVmZlVVSUQiLCJjb3VudCIsImRpY3QiLCJudW0iLCJ1dWlkIiwic3VtIiwiaSIsImlkeCIsImNoIiwiY2hhckNvZGVBdCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIl9nZXRVcmxQYXJhbXMiLCJuYW1lIiwicmVnUGFyYSIsInJlc1BhcmEiLCJsb2NhdGlvbiIsInNlYXJjaCIsIm1hdGNoIiwidW5lc2NhcGUiLCJfc2V0Q29va2llIiwidmFsdWUiLCJleHBpcmVzIiwiY29va2llc3RyIiwiZXNjYXBlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9HTVRTdHJpbmciLCJjb29raWUiLCJfZ2V0Q29va2llIiwiYXJyIiwicmVnIiwiX2RlbENvb2tpZSIsImV4cCIsImN2YWwiLCJTdG9yZSIsIl9zZXRJdGVtIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIl9nZXRJdGVtIiwiX2RlbEl0ZW0iLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNkQSxjQUFZLHFCQUFTQyxJQUFULEVBQWNDLE1BQWQsRUFBcUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsTUFBRyxDQUFDQSxNQUFKLEVBQVc7QUFDVkEsWUFBUyxxQkFBVDtBQUNBO0FBQ0QsTUFBSUMsSUFBSTtBQUNFLFNBQU9GLEtBQUtHLFFBQUwsS0FBZ0IsQ0FEekIsRUFDNEM7QUFDMUMsU0FBT0gsS0FBS0ksT0FBTCxFQUZULEVBRTRDO0FBQzFDLFNBQU9KLEtBQUtLLFFBQUwsRUFIVCxFQUc0QztBQUMxQyxTQUFPTCxLQUFLTSxVQUFMLEVBSlQsRUFJNEM7QUFDMUMsU0FBT04sS0FBS08sVUFBTCxFQUxULEVBSzRDO0FBQzFDLFNBQU9DLEtBQUtDLEtBQUwsQ0FBVyxDQUFDVCxLQUFLRyxRQUFMLEtBQWdCLENBQWpCLElBQW9CLENBQS9CLENBTlQsRUFNNEM7QUFDMUMsUUFBT0gsS0FBS1UsZUFBTCxFQVBULENBTzRDO0FBUDVDLEdBQVI7QUFTTSxNQUFHLE9BQU9DLElBQVAsQ0FBWVYsTUFBWixDQUFILEVBQXdCO0FBQ3BCQSxZQUFTQSxPQUFPVyxPQUFQLENBQWVDLE9BQU9DLEVBQXRCLEVBQTBCLENBQUNkLEtBQUtlLFdBQUwsS0FBbUIsRUFBcEIsRUFBd0JDLE1BQXhCLENBQStCLElBQUlILE9BQU9DLEVBQVAsQ0FBVUcsTUFBN0MsQ0FBMUIsQ0FBVDtBQUNOO0FBQ0QsT0FBSSxJQUFJQyxDQUFSLElBQWFoQixDQUFiLEVBQWdCO0FBQ1QsT0FBRyxJQUFJVyxNQUFKLENBQVcsTUFBS0ssQ0FBTCxHQUFRLEdBQW5CLEVBQXdCUCxJQUF4QixDQUE2QlYsTUFBN0IsQ0FBSCxFQUF3QztBQUNwQ0EsYUFBU0EsT0FBT1csT0FBUCxDQUFlQyxPQUFPQyxFQUF0QixFQUEyQkQsT0FBT0MsRUFBUCxDQUFVRyxNQUFWLElBQWtCLENBQW5CLEdBQXlCZixFQUFFZ0IsQ0FBRixDQUF6QixHQUFrQyxDQUFDLE9BQU1oQixFQUFFZ0IsQ0FBRixDQUFQLEVBQWFGLE1BQWIsQ0FBb0IsQ0FBQyxLQUFJZCxFQUFFZ0IsQ0FBRixDQUFMLEVBQVdELE1BQS9CLENBQTVELENBQVQ7QUFDSDtBQUNKO0FBQ0QsU0FBT2hCLE1BQVA7QUFDTixFQTFCYTtBQTJCZGtCLFNBQVMsZ0JBQVNDLEdBQVQsRUFBY0MsT0FBZCxFQUF1QkMsSUFBdkIsRUFBNkJDLFlBQTdCLEVBQTBDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFJQSxZQUFKLEVBQWtCO0FBQ1hDLFVBQU9ELFlBQVAsSUFBdUIsVUFBU0UsSUFBVCxFQUFlO0FBQ2xDSixlQUFXQSxRQUFRSSxJQUFSLENBQVg7QUFDQSxXQUFPRCxPQUFPRCxZQUFQLENBQVA7QUFDSCxJQUhEO0FBSUg7QUFDRCxNQUFJRyxPQUFPQyxTQUFTQyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUFYO0FBQ0EsTUFBSUMsU0FBU0YsU0FBU0csYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0FELFNBQU9FLElBQVAsR0FBYyxpQkFBZDtBQUNBRixTQUFPRyxHQUFQLEdBQWFaLEdBQWI7QUFDQVMsU0FBT0ksS0FBUCxHQUFlLElBQWY7QUFDQUosU0FBT0ssTUFBUCxHQUFnQkwsT0FBT00sa0JBQVAsR0FBNEIsWUFBVztBQUNuRCxPQUFLLENBQUNOLE9BQU9PLFVBQVIsSUFBc0JQLE9BQU9PLFVBQVAsS0FBc0IsUUFBNUMsSUFBd0RQLE9BQU9PLFVBQVAsS0FBc0IsVUFBbkYsRUFBZ0c7QUFDNUZQLFdBQU9LLE1BQVAsR0FBZ0JMLE9BQU9NLGtCQUFQLEdBQTRCLElBQTVDO0FBQ0EsUUFBSVQsUUFBUUcsT0FBT1EsVUFBbkIsRUFBK0I7QUFDM0JYLFVBQUtZLFdBQUwsQ0FBaUJULE1BQWpCO0FBQ0g7QUFDSixJQUxELE1BS087QUFDSFAsWUFBUUEsTUFBUjtBQUNIO0FBQ0osR0FURDtBQVVBTyxTQUFPVSxPQUFQLEdBQWlCLFlBQVc7QUFDeEJqQixXQUFRQSxNQUFSO0FBQ0gsR0FGRDtBQUdBSSxPQUFLYyxXQUFMLENBQWlCWCxNQUFqQjtBQUNILEVBMURhO0FBMkRkWSxjQUFjLHVCQUFVO0FBQ3ZCLE1BQUlDLElBQUVsQyxLQUFLQyxLQUFMLENBQVdELEtBQUttQyxNQUFMLEtBQWMsR0FBekIsQ0FBTjtBQUNBLE1BQUlDLElBQUVwQyxLQUFLQyxLQUFMLENBQVdELEtBQUttQyxNQUFMLEtBQWMsR0FBekIsQ0FBTjtBQUNBLE1BQUlFLElBQUVyQyxLQUFLQyxLQUFMLENBQVdELEtBQUttQyxNQUFMLEtBQWMsR0FBekIsQ0FBTjtBQUNBLFNBQU8sU0FBT0QsQ0FBUCxHQUFTLEdBQVQsR0FBYUUsQ0FBYixHQUFlLEdBQWYsR0FBbUJDLENBQW5CLEdBQXFCLEdBQTVCLENBSnVCLENBSVM7QUFDaEMsRUFoRWE7QUFpRWRDLGFBQWEsb0JBQVNDLEtBQVQsRUFBZTtBQUMzQixNQUFHLENBQUNBLEtBQUosRUFBVTtBQUNUQSxXQUFRLEVBQVI7QUFDQTtBQUNEO0FBQ0EsTUFBSUMsT0FBTyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixFQUFvQyxHQUFwQyxFQUF5QyxHQUF6QyxFQUE4QyxHQUE5QyxFQUNKLEdBREksRUFDQyxHQURELEVBQ00sR0FETixFQUNXLEdBRFgsRUFDZ0IsR0FEaEIsRUFDcUIsR0FEckIsRUFDMEIsR0FEMUIsRUFDK0IsR0FEL0IsRUFDb0MsR0FEcEMsRUFDeUMsR0FEekMsRUFDOEMsR0FEOUMsRUFDbUQsR0FEbkQsRUFDd0QsR0FEeEQsRUFFSixHQUZJLEVBRUMsR0FGRCxFQUVNLEdBRk4sRUFFVyxHQUZYLEVBRWdCLEdBRmhCLEVBRXFCLEdBRnJCLEVBRTBCLEdBRjFCLEVBRStCLEdBRi9CLEVBRW9DLEdBRnBDLEVBRXlDLEdBRnpDLEVBRThDLEdBRjlDLEVBRW1ELEdBRm5ELEVBRXdELEdBRnhELENBQVg7QUFJRyxNQUFJQyxNQUFNRCxLQUFLL0IsTUFBZjtBQUNBLE1BQUlpQyxPQUFPLEVBQVg7QUFDQSxNQUFJQyxNQUFNLENBQVY7QUFDQSxPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUwsS0FBcEIsRUFBMkJLLEdBQTNCLEVBQWdDO0FBQzVCLE9BQUlDLE1BQU03QyxLQUFLQyxLQUFMLENBQVdELEtBQUttQyxNQUFMLEtBQWdCTSxHQUEzQixDQUFWO0FBQ0EsT0FBSUssS0FBS04sS0FBS0ssR0FBTCxDQUFUO0FBQ0FGLFVBQU9HLEdBQUdDLFVBQUgsQ0FBYyxDQUFkLENBQVA7QUFDQUwsV0FBUUksRUFBUjtBQUNIO0FBQ0Q7QUFDQUosVUFBUU0sT0FBT0MsWUFBUCxDQUFxQk4sTUFBTSxFQUFOLEdBQVcsRUFBaEMsQ0FBUjtBQUNBLFNBQU9ELElBQVA7QUFDSCxFQXRGYTtBQXVGZFEsZ0JBQWdCLHVCQUFTQyxJQUFULEVBQWM7QUFDN0IsTUFBSUMsVUFBVSxJQUFJL0MsTUFBSixDQUFXLFVBQVE4QyxJQUFSLEdBQWEsZUFBeEIsQ0FBZDtBQUNBLE1BQUlFLFVBQVVyQyxPQUFPc0MsUUFBUCxDQUFnQkMsTUFBaEIsQ0FBdUIvQyxNQUF2QixDQUE4QixDQUE5QixFQUFpQ2dELEtBQWpDLENBQXVDSixPQUF2QyxDQUFkO0FBQ0EsTUFBR0MsV0FBVyxJQUFkLEVBQW1CO0FBQ2YsVUFBT0ksU0FBU0osUUFBUSxDQUFSLENBQVQsQ0FBUDtBQUNILEdBRkQsTUFFSztBQUNELFVBQU8sRUFBUDtBQUNIO0FBQ0QsRUEvRmE7QUFnR2RLLGFBQWEsb0JBQVNQLElBQVQsRUFBZVEsS0FBZixFQUFzQkMsT0FBdEIsRUFBOEI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFJQyxZQUFZVixPQUFPLEdBQVAsR0FBYVcsT0FBT0gsS0FBUCxDQUFiLEdBQTZCLEdBQTdDO0FBQ00sTUFBSUMsV0FBVyxJQUFmLEVBQXFCO0FBQ2pCLE9BQUlwRSxPQUFPLElBQUl1RSxJQUFKLEVBQVg7QUFDQXZFLFFBQUt3RSxPQUFMLENBQWF4RSxLQUFLeUUsT0FBTCxLQUFpQkwsVUFBVSxJQUF4QztBQUNBQyxnQkFBYSxhQUFhckUsS0FBSzBFLFdBQUwsRUFBYixHQUFrQyxHQUEvQztBQUNIO0FBQ0QvQyxXQUFTZ0QsTUFBVCxHQUFrQk4sU0FBbEI7QUFDTixFQTVHYTtBQTZHZE8sYUFBWSxvQkFBU2pCLElBQVQsRUFBYztBQUN6QjtBQUNBLE1BQUlrQixHQUFKO0FBQUEsTUFDQ0MsTUFBTSxJQUFJakUsTUFBSixDQUFXLFVBQVU4QyxJQUFWLEdBQWlCLGVBQTVCLENBRFA7QUFFTSxNQUFJa0IsTUFBTWxELFNBQVNnRCxNQUFULENBQWdCWCxLQUFoQixDQUFzQmMsR0FBdEIsQ0FBVixFQUFxQztBQUNqQyxVQUFPYixTQUFTWSxJQUFJLENBQUosQ0FBVCxDQUFQO0FBQ0gsR0FGRCxNQUVLO0FBQ0osVUFBTyxJQUFQO0FBQ0E7QUFDUCxFQXRIYTtBQXVIZEUsYUFBWSxvQkFBU3BCLElBQVQsRUFBYztBQUN6QjtBQUNBLE1BQUlxQixNQUFNLElBQUlULElBQUosRUFBVjtBQUNNUyxNQUFJUixPQUFKLENBQVlRLElBQUlQLE9BQUosS0FBZ0IsQ0FBNUI7QUFDQSxNQUFJUSxPQUFPQyxNQUFNLFdBQU4sRUFBbUJ2QixJQUFuQixDQUFYO0FBQ0EsTUFBSXNCLFFBQVEsSUFBWixFQUFrQjtBQUNkdEQsWUFBU2dELE1BQVQsR0FBa0JoQixPQUFPLEdBQVAsR0FBYXNCLElBQWIsR0FBb0IsV0FBcEIsR0FBa0NELElBQUlOLFdBQUosRUFBcEQ7QUFDSDtBQUNQLEVBL0hhO0FBZ0lkUyxXQUFXLGtCQUFTeEIsSUFBVCxFQUFjUSxLQUFkLEVBQW9CO0FBQzlCM0MsU0FBTzRELFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCMUIsSUFBNUIsRUFBaUNRLEtBQWpDO0FBQ0EsRUFsSWE7QUFtSWRtQixXQUFXLGtCQUFTM0IsSUFBVCxFQUFjO0FBQ3hCbkMsU0FBTzRELFlBQVAsQ0FBb0JYLE9BQXBCLENBQTRCZCxJQUE1QjtBQUNBLEVBcklhO0FBc0lkNEIsV0FBVyxrQkFBUzVCLElBQVQsRUFBYztBQUN4Qm5DLFNBQU80RCxZQUFQLENBQW9CSSxVQUFwQixDQUErQjdCLElBQS9CO0FBQ0E7QUF4SWEsQyIsImZpbGUiOiJ0b29scy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcblx0X2RhdGVGb3JtYXQ6ZnVuY3Rpb24oZGF0ZSxmb3JtYXQpe1xuXHRcdC8vIOaXtumXtOagvOW8j+aVsOaNruagvOW8j+WMllxuXHRcdC8vIGRhdGXvvJrml7bpl7TmoLzlvI/mlbDmja7vvIzlv4Xloatcblx0XHQvLyBmb3JtYXTvvJrmjInku4DkuYjmoLzlvI/moLzlvI/ljJYg6Z2e5b+F5aGrXG5cdFx0aWYoIWZvcm1hdCl7XG5cdFx0XHRmb3JtYXQgPSAneXl5eS1NTS1kZCBoaDpzczptbSc7XG5cdFx0fVxuXHRcdHZhciBvID0geyBcbiAgICAgICAgICAgIFwiTStcIiA6IGRhdGUuZ2V0TW9udGgoKSsxLCAgICAgICAgICAgICAgICAgLy/mnIjku70gXG4gICAgICAgICAgICBcImQrXCIgOiBkYXRlLmdldERhdGUoKSwgICAgICAgICAgICAgICAgICAgIC8v5pelIFxuICAgICAgICAgICAgXCJoK1wiIDogZGF0ZS5nZXRIb3VycygpLCAgICAgICAgICAgICAgICAgICAvL+Wwj+aXtiBcbiAgICAgICAgICAgIFwibStcIiA6IGRhdGUuZ2V0TWludXRlcygpLCAgICAgICAgICAgICAgICAgLy/liIYgXG4gICAgICAgICAgICBcInMrXCIgOiBkYXRlLmdldFNlY29uZHMoKSwgICAgICAgICAgICAgICAgIC8v56eSIFxuICAgICAgICAgICAgXCJxK1wiIDogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpKzMpLzMpLCAvL+Wto+W6piBcbiAgICAgICAgICAgIFwiU1wiICA6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgICAgICAgICAgICAgLy/mr6vnp5IgXG4gICAgICAgIH07IFxuICAgICAgICBpZigvKHkrKS8udGVzdChmb3JtYXQpKSB7XG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShSZWdFeHAuJDEsIChkYXRlLmdldEZ1bGxZZWFyKCkrXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7IFxuICAgXHRcdH1cbiAgIFx0XHRmb3IodmFyIGsgaW4gbykge1xuICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIihcIisgayArXCIpXCIpLnRlc3QoZm9ybWF0KSl7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aD09MSkgPyAob1trXSkgOiAoKFwiMDBcIisgb1trXSkuc3Vic3RyKChcIlwiKyBvW2tdKS5sZW5ndGgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcblx0fSxcblx0X2pzb25wIDogZnVuY3Rpb24odXJsLCBzdWNjZXNzLCBmYWlsLCBjYWxsYmFja05hbWUpe1xuXHRcdC8vIOi3qOWfn+ivt+axglxuXHRcdC8vIHVybCDor7fmsYLnmoR1cmwg5Y+C5pWw5Lit5b+F6aG75a2Y5ZyoY2FsbGJhY2tcblx0XHQvLyBzdWNjZXNzIOivt+axguaIkOWKn+eahOWbnuiwg+WHveaVsFxuXHRcdC8vIGZhaWwg6K+35rGC5aSx6LSl55qE5Zue6LCD5Ye95pWwXG5cdFx0Ly8gY2FsbGJhY2tOYW1lIOWbnuiwg+WHveaVsOWQjeensO+8jOivt+axguaXtuS8oOi/h+WOu+eahFxuXHRcdGlmIChjYWxsYmFja05hbWUpIHtcblx0ICAgICAgICB3aW5kb3dbY2FsbGJhY2tOYW1lXSA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0ICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKGRhdGEpO1xuXHQgICAgICAgICAgICBkZWxldGUgd2luZG93W2NhbGxiYWNrTmFtZV07XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuXHQgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXHQgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0Jztcblx0ICAgIHNjcmlwdC5zcmMgPSB1cmw7XG5cdCAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXHQgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICBpZiAoKCFzY3JpcHQucmVhZHlTdGF0ZSB8fCBzY3JpcHQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkZWRcIiB8fCBzY3JpcHQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSkge1xuXHQgICAgICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG5cdCAgICAgICAgICAgIGlmIChoZWFkICYmIHNjcmlwdC5wYXJlbnROb2RlKSB7XG5cdCAgICAgICAgICAgICAgICBoZWFkLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBmYWlsICYmIGZhaWwoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgc2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICBmYWlsICYmIGZhaWwoKTtcblx0ICAgIH1cblx0ICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblx0fSxcblx0X3NodWZmQ09MT1IgOiBmdW5jdGlvbigpe1xuXHRcdHZhciByPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyNTYpO1xuXHRcdHZhciBnPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyNTYpO1xuXHRcdHZhciBiPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyNTYpO1xuXHRcdHJldHVybiBcInJnYihcIityKycsJytnKycsJytiK1wiKVwiOy8v5omA5pyJ5pa55rOV55qE5ou85o6l6YO95Y+v5Lul55SoRVM25paw54m55oCnYOWFtuS7luWtl+espuS4snsk5Y+Y6YeP5ZCNfWDmm7/mjaJcblx0fSxcblx0X3NodWZmVVVJRCA6IGZ1bmN0aW9uKGNvdW50KXtcblx0XHRpZighY291bnQpe1xuXHRcdFx0Y291bnQgPSAzMTtcblx0XHR9XG5cdFx0Ly/nlJ/miJAzMuS9jemaj+acuuaVsFxuXHRcdHZhciBkaWN0ID0gWycxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcwJyxcblx0ICAgICAgICAnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLCAnZycsICdoJywgJ2knLCAnaicsICdrJywgJ2wnLCAnbScsXG5cdCAgICAgICAgJ24nLCAnbycsICdwJywgJ3EnLCAncicsICdzJywgJ3QnLCAndScsICd2JywgJ3cnLCAneCcsICd5JywgJ3onXG5cdCAgICBdO1xuXHQgICAgdmFyIG51bSA9IGRpY3QubGVuZ3RoO1xuXHQgICAgdmFyIHV1aWQgPSBcIlwiO1xuXHQgICAgdmFyIHN1bSA9IDA7XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblx0ICAgICAgICB2YXIgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtKTtcblx0ICAgICAgICB2YXIgY2ggPSBkaWN0W2lkeF07XG5cdCAgICAgICAgc3VtICs9IGNoLmNoYXJDb2RlQXQoMCk7XG5cdCAgICAgICAgdXVpZCArPSBjaDtcblx0ICAgIH1cblx0ICAgIC8v55Sf5oiQ5qCh6aqM5L2NXG5cdCAgICB1dWlkICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKHN1bSAlIDI2ICsgOTcpKTtcblx0ICAgIHJldHVybiB1dWlkO1xuXHR9LFxuXHRfZ2V0VXJsUGFyYW1zIDogZnVuY3Rpb24obmFtZSl7XG5cdFx0dmFyIHJlZ1BhcmEgPSBuZXcgUmVnRXhwKFwiKF58JilcIituYW1lK1wiPShbXiZdKikoJnwkKVwiKTtcblx0XHR2YXIgcmVzUGFyYSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLm1hdGNoKHJlZ1BhcmEpO1xuXHRcdGlmKHJlc1BhcmEgIT0gbnVsbCl7XG5cdFx0ICAgIHJldHVybiB1bmVzY2FwZShyZXNQYXJhWzJdKTtcblx0XHR9ZWxzZXtcblx0XHQgICAgcmV0dXJuICcnO1xuXHRcdH1cblx0fSxcblx0X3NldENvb2tpZSA6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBleHBpcmVzKXtcblx0XHQvLyDorr7nva4gY29va2llIOaWueazlVxuXHRcdC8vIGNvb2tpZeWtmOWCqOeahOWQjeensFxuXHRcdC8vIGNvb2tpZeWtmOWCqOeahOWAvFxuXHRcdC8vIGNvb2tpZeWtmOWCqOaXtumXtFxuXHRcdHZhciBjb29raWVzdHIgPSBuYW1lICsgXCI9XCIgKyBlc2NhcGUodmFsdWUpICsgXCI7XCI7XG4gICAgICAgIGlmIChleHBpcmVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIGV4cGlyZXMgKiAxMDAwKTtcbiAgICAgICAgICAgIGNvb2tpZXN0ciArPSBcImV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCkgKyBcIjtcIjtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWVzdHI7XG5cdH0sXG5cdF9nZXRDb29raWUgOmZ1bmN0aW9uKG5hbWUpe1xuXHRcdC8v6I635Y+WY29va2llXG5cdFx0dmFyIGFyciwgXG5cdFx0XHRyZWcgPSBuZXcgUmVnRXhwKFwiKF58IClcIiArIG5hbWUgKyBcIj0oW147XSopKDt8JClcIik7XG4gICAgICAgIGlmIChhcnIgPSBkb2N1bWVudC5jb29raWUubWF0Y2gocmVnKSl7XG4gICAgICAgICAgICByZXR1cm4gdW5lc2NhcGUoYXJyWzJdKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgIFx0cmV0dXJuIG51bGw7XG4gICAgICAgIH0gICAgXG5cdH0sXG5cdF9kZWxDb29raWUgOmZ1bmN0aW9uKG5hbWUpe1xuXHRcdC8v5Yig6ZmkIGNvb2tpZVxuXHRcdHZhciBleHAgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBleHAuc2V0VGltZShleHAuZ2V0VGltZSgpIC0gMSk7XG4gICAgICAgIHZhciBjdmFsID0gU3RvcmVbJ2dldENvb2tpZSddKG5hbWUpO1xuICAgICAgICBpZiAoY3ZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyBjdmFsICsgXCI7ZXhwaXJlcz1cIiArIGV4cC50b0dNVFN0cmluZygpO1xuICAgICAgICB9XG5cdH0sXG5cdF9zZXRJdGVtIDogZnVuY3Rpb24obmFtZSx2YWx1ZSl7XG5cdFx0d2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsdmFsdWUpO1xuXHR9LFxuXHRfZ2V0SXRlbSA6IGZ1bmN0aW9uKG5hbWUpe1xuXHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0VGltZShuYW1lKTtcblx0fSxcblx0X2RlbEl0ZW0gOiBmdW5jdGlvbihuYW1lKXtcblx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obmFtZSk7XG5cdH1cbn0iXX0=