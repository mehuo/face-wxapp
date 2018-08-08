export default {
	_dateFormat:function(date,format){
		// 时间格式数据格式化
		// date：时间格式数据，必填
		// format：按什么格式格式化 非必填
		if(!format){
			format = 'yyyy-MM-dd hh:ss:mm';
		}
		var o = { 
            "M+" : date.getMonth()+1,                 //月份 
            "d+" : date.getDate(),                    //日 
            "h+" : date.getHours(),                   //小时 
            "m+" : date.getMinutes(),                 //分 
            "s+" : date.getSeconds(),                 //秒 
            "q+" : Math.floor((date.getMonth()+3)/3), //季度 
            "S"  : date.getMilliseconds()             //毫秒 
        }; 
        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   		}
   		for(var k in o) {
            if(new RegExp("("+ k +")").test(format)){
                format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return format;
	},
	_jsonp : function(url, success, fail, callbackName){
		// 跨域请求
		// url 请求的url 参数中必须存在callback
		// success 请求成功的回调函数
		// fail 请求失败的回调函数
		// callbackName 回调函数名称，请求时传过去的
		if (callbackName) {
	        window[callbackName] = function(data) {
	            success && success(data);
	            delete window[callbackName];
	        }
	    }
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;
	    script.async = true;
	    script.onload = script.onreadystatechange = function() {
	        if ((!script.readyState || script.readyState === "loaded" || script.readyState === "complete")) {
	            script.onload = script.onreadystatechange = null;
	            if (head && script.parentNode) {
	                head.removeChild(script);
	            }
	        } else {
	            fail && fail();
	        }
	    };
	    script.onerror = function() {
	        fail && fail();
	    }
	    head.appendChild(script);
	},
	_shuffCOLOR : function(){
		var r=Math.floor(Math.random()*256);
		var g=Math.floor(Math.random()*256);
		var b=Math.floor(Math.random()*256);
		return "rgb("+r+','+g+','+b+")";//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
	},
	_shuffUUID : function(count){
		if(!count){
			count = 31;
		}
		//生成32位随机数
		var dict = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
	        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	    ];
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
	    uuid += String.fromCharCode((sum % 26 + 97));
	    return uuid;
	},
	_getUrlParams : function(name){
		var regPara = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
		var resPara = window.location.search.substr(1).match(regPara);
		if(resPara != null){
		    return unescape(resPara[2]);
		}else{
		    return '';
		}
	},
	_setCookie : function(name, value, expires){
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
	_getCookie :function(name){
		//获取cookie
		var arr, 
			reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
        	return null;
        }    
	},
	_delCookie :function(name){
		//删除 cookie
		var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = Store['getCookie'](name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
	},
	_setItem : function(name,value){
		window.localStorage.setItem(name,value);
	},
	_getItem : function(name){
		window.localStorage.getTime(name);
	},
	_delItem : function(name){
		window.localStorage.removeItem(name);
	}
}