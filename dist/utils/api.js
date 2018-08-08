'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../config.js');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('./../npm/lodash/lodash.js');

var _lodash2 = _interopRequireDefault(_lodash);

var _promisePolyfill = require('./../npm/promise-polyfill/promise.js');

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
   * 发送Post请求,请求都以Form形式发送
   * @param {String} url url相对路径
   * @param {Object} [form] - 发送内容
   * @param {Object} [httpConfig] - 其他配置
   */
  post: function post(url, form) {
    var httpConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    httpConfig.header = httpConfig.header || { 'content-type': 'application/x-www-form-urlencoded' };
    return this.request(url, 'POST', form, httpConfig);
  },
  /**
   * GET,请求都以params形式发送
   * @param {String} url url相对路径
   * @param {Object} [params] - 发送内容
   * @param {Object} [httpConfig] - 其他配置
   */
  get: function get(url, params, httpConfig) {
    return this.request(url, 'GET', params, httpConfig);
  },

  request: function request(url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    wx.showNavigationBarLoading();

    var options = {
      header: config.header || {},
      url: url,
      data: data,
      method: method
    };

    if (config.apiBaseURL) {
      options.url = config.apiBaseURL + options.url;
    } else {
      options.url = _config2.default.apiBaseURL + options.url;
    }

    try {
      // options = this.handleBeforeRequest(options,config);
      return _wepy2.default.request(options).then(this.handleSuccess, this.handleFail);
    } catch (e) {
      console.log(e);
      wx.hideNavigationBarLoading();
      return _promisePolyfill2.default.reject(e);
    }
  },

  /**
   *
   * @param options
   * @param config
   * @return options
   */
  handleBeforeRequest: function handleBeforeRequest(options, config) {
    var data = options.data;
    if (!config.noAuth) {
      var user = wx.getStorageSync('user');
      if (!user || !user.token) {
        var err = new Error('用户不存在');
        err.code = 4012;
        throw err;
      }
      data['token'] = user.token;
      data['userId'] = user.userId;
      ////tu
      // data['token'] = 'bskucne9t';
      // data['userId'] = 'bskucne9u';
      ////lq
      // data['token'] = 'bskuf4wee';
      // data['userId'] = 'bskuf4wef';
    }
    data['__t'] = new Date().getTime();
    options.data = _lodash2.default.reduce(data, function (r, i, k) {
      if (!_lodash2.default.isNull(i) && !_lodash2.default.isUndefined(i)) {
        r[k] = i;
      }
      return r;
    }, {});
    if (config.apiBaseURL) {
      options.url = config.apiBaseURL + options.url;
    } else {
      options.url = _config2.default.apiBaseURL + options.url;
    }
    if (options.data) {
      var _data = _lodash2.default.reduce(options.data, function (r, i, k) {
        if (_lodash2.default.isDate(i)) {
          r[k] = i.getTime();
          return r;
        }
        r[k] = i;
        return r;
      }, {});
      options.data = _data;
    }
    return options;
  },

  handleSuccess: function handleSuccess(_ref) {
    var statusCode = _ref.statusCode,
        data = _ref.data;

    wx.hideNavigationBarLoading();
    if (0 == data.error_code || data.statusCode == 200) {
      return data;
    } else {
      var err = new Error(data.error_msg);
      err.code = data.error_code;
      throw err;
    }
  },
  handleFail: function handleFail(_ref2) {
    var statusCode = _ref2.statusCode,
        data = _ref2.data;

    wx.hideNavigationBarLoading();
    var err = new Error(data.error_msg);
    err.code = data.error_code;
    throw err;
  },

  handleFinish: function handleFinish() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJwb3N0IiwidXJsIiwiZm9ybSIsImh0dHBDb25maWciLCJoZWFkZXIiLCJyZXF1ZXN0IiwiZ2V0IiwicGFyYW1zIiwibWV0aG9kIiwiZGF0YSIsImNvbmZpZyIsInd4Iiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwib3B0aW9ucyIsImFwaUJhc2VVUkwiLCJDb25maWciLCJ3ZXB5IiwidGhlbiIsImhhbmRsZVN1Y2Nlc3MiLCJoYW5kbGVGYWlsIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJQcm9taXNlIiwicmVqZWN0IiwiaGFuZGxlQmVmb3JlUmVxdWVzdCIsIm5vQXV0aCIsInVzZXIiLCJnZXRTdG9yYWdlU3luYyIsInRva2VuIiwiZXJyIiwiRXJyb3IiLCJjb2RlIiwidXNlcklkIiwiRGF0ZSIsImdldFRpbWUiLCJfIiwicmVkdWNlIiwiciIsImkiLCJrIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJpc0RhdGUiLCJzdGF0dXNDb2RlIiwiZXJyb3JfY29kZSIsImVycm9yX21zZyIsImhhbmRsZUZpbmlzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFJZTtBQUNiOzs7Ozs7QUFNQUEsUUFBTSxjQUFVQyxHQUFWLEVBQWVDLElBQWYsRUFBc0M7QUFBQSxRQUFqQkMsVUFBaUIsdUVBQUosRUFBSTs7QUFDMUNBLGVBQVdDLE1BQVgsR0FBb0JELFdBQVdDLE1BQVgsSUFBcUIsRUFBQyxnQkFBZSxtQ0FBaEIsRUFBekM7QUFDQSxXQUFPLEtBQUtDLE9BQUwsQ0FBYUosR0FBYixFQUFpQixNQUFqQixFQUF3QkMsSUFBeEIsRUFBNkJDLFVBQTdCLENBQVA7QUFDRCxHQVZZO0FBV2I7Ozs7OztBQU1BRyxPQUFLLGFBQVVMLEdBQVYsRUFBZU0sTUFBZixFQUF1QkosVUFBdkIsRUFBbUM7QUFDdEMsV0FBTyxLQUFLRSxPQUFM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QU9HLENBQVA7QUFDRDtBQUNEQSxVQUFFRSxDQUFGLElBQU9ELENBQVA7QUFDQSxlQUFPRCxDQUFQO0FBQ0QsT0FQVSxFQU9ULEVBUFMsQ0FBWDtBQVFBMUIsY0FBUUosSUFBUixHQUFlQSxLQUFmO0FBQ0Q7QUFDRCxXQUFPSSxPQUFQO0FBQ0QsR0FsR1k7O0FBb0diSyxpQkFBYyw2QkFBK0I7QUFBQSxRQUFwQjJCLFVBQW9CLFFBQXBCQSxVQUFvQjtBQUFBLFFBQVJwQyxJQUFRLFFBQVJBLElBQVE7O0FBQzNDRSxPQUFHWSx3QkFBSDtBQUNBLFFBQUksS0FBS2QsS0FBS3FDLFVBQVYsSUFBd0JyQyxLQUFLb0MsVUFBTCxJQUFtQixHQUEvQyxFQUFvRDtBQUNsRCxhQUFPcEMsSUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLFVBQUlzQixNQUFNLElBQUlDLEtBQUosQ0FBVXZCLEtBQUtzQyxTQUFmLENBQVY7QUFDQWhCLFVBQUlFLElBQUosR0FBV3hCLEtBQUtxQyxVQUFoQjtBQUNBLFlBQU1mLEdBQU47QUFDRDtBQUNGLEdBN0dZO0FBOEdiWixjQUFXLDJCQUErQjtBQUFBLFFBQXBCMEIsVUFBb0IsU0FBcEJBLFVBQW9CO0FBQUEsUUFBUnBDLElBQVEsU0FBUkEsSUFBUTs7QUFDeENFLE9BQUdZLHdCQUFIO0FBQ0EsUUFBSVEsTUFBTSxJQUFJQyxLQUFKLENBQVV2QixLQUFLc0MsU0FBZixDQUFWO0FBQ0FoQixRQUFJRSxJQUFKLEdBQVd4QixLQUFLcUMsVUFBaEI7QUFDQSxVQUFNZixHQUFOO0FBQ0QsR0FuSFk7O0FBcUhiaUIsY0FySGEsMEJBcUhFLENBRWQ7QUF2SFksQyIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9jb25maWcnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdwcm9taXNlLXBvbHlmaWxsJ1xuXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICog5Y+R6YCBUG9zdOivt+axgizor7fmsYLpg73ku6VGb3Jt5b2i5byP5Y+R6YCBXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgdXJs55u45a+56Lev5b6EXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbZm9ybV0gLSDlj5HpgIHlhoXlrrlcbiAgICogQHBhcmFtIHtPYmplY3R9IFtodHRwQ29uZmlnXSAtIOWFtuS7lumFjee9rlxuICAgKi9cbiAgcG9zdDogZnVuY3Rpb24gKHVybCwgZm9ybSwgaHR0cENvbmZpZyA9IHt9KSB7XG4gICAgaHR0cENvbmZpZy5oZWFkZXIgPSBodHRwQ29uZmlnLmhlYWRlciB8fCB7J2NvbnRlbnQtdHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9O1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCdQT1NUJyxmb3JtLGh0dHBDb25maWcpXG4gIH0sXG4gIC8qKlxuICAgKiBHRVQs6K+35rGC6YO95LulcGFyYW1z5b2i5byP5Y+R6YCBXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgdXJs55u45a+56Lev5b6EXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSAtIOWPkemAgeWGheWuuVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2h0dHBDb25maWddIC0g5YW25LuW6YWN572uXG4gICAqL1xuICBnZXQ6IGZ1bmN0aW9uICh1cmwsIHBhcmFtcywgaHR0cENvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCdHRVQnLHBhcmFtcyxodHRwQ29uZmlnKVxuICB9LFxuXG5cbiAgcmVxdWVzdDpmdW5jdGlvbih1cmwsbWV0aG9kID0gJ0dFVCcsZGF0YSA9IHt9LGNvbmZpZyA9IHt9KXtcbiAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcblxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgaGVhZGVyOmNvbmZpZy5oZWFkZXIgfHwge30sXG4gICAgICB1cmw6dXJsLFxuICAgICAgZGF0YTpkYXRhLFxuICAgICAgbWV0aG9kOm1ldGhvZFxuICAgIH07XG5cbiAgICBpZiAoY29uZmlnLmFwaUJhc2VVUkwpIHtcbiAgICAgIG9wdGlvbnMudXJsID0gY29uZmlnLmFwaUJhc2VVUkwgKyBvcHRpb25zLnVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy51cmwgPSBDb25maWcuYXBpQmFzZVVSTCArIG9wdGlvbnMudXJsO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBvcHRpb25zID0gdGhpcy5oYW5kbGVCZWZvcmVSZXF1ZXN0KG9wdGlvbnMsY29uZmlnKTtcbiAgICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qob3B0aW9ucylcbiAgICAgICAgLnRoZW4odGhpcy5oYW5kbGVTdWNjZXNzLHRoaXMuaGFuZGxlRmFpbClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgfVxuXG4gIH0sXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICogQHJldHVybiBvcHRpb25zXG4gICAqL1xuICBoYW5kbGVCZWZvcmVSZXF1ZXN0OmZ1bmN0aW9uKG9wdGlvbnMsY29uZmlnKSB7XG4gICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgaWYgKCFjb25maWcubm9BdXRoKSB7XG4gICAgICBsZXQgdXNlciA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyJyk7XG4gICAgICBpZiAoIXVzZXIgfHwgIXVzZXIudG9rZW4pIHtcbiAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcign55So5oi35LiN5a2Y5ZyoJyk7XG4gICAgICAgIGVyci5jb2RlID0gNDAxMjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgZGF0YVsndG9rZW4nXSA9IHVzZXIudG9rZW47XG4gICAgICBkYXRhWyd1c2VySWQnXSA9IHVzZXIudXNlcklkO1xuICAgICAgLy8vL3R1XG4gICAgICAvLyBkYXRhWyd0b2tlbiddID0gJ2Jza3VjbmU5dCc7XG4gICAgICAvLyBkYXRhWyd1c2VySWQnXSA9ICdic2t1Y25lOXUnO1xuICAgICAgLy8vL2xxXG4gICAgICAvLyBkYXRhWyd0b2tlbiddID0gJ2Jza3VmNHdlZSc7XG4gICAgICAvLyBkYXRhWyd1c2VySWQnXSA9ICdic2t1ZjR3ZWYnO1xuICAgIH1cbiAgICBkYXRhWydfX3QnXSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIG9wdGlvbnMuZGF0YSA9IF8ucmVkdWNlKGRhdGEsKHIsaSxrKT0+e1xuICAgICAgaWYgKCFfLmlzTnVsbChpKSAmJiAhXy5pc1VuZGVmaW5lZChpKSkge1xuICAgICAgICByW2tdID0gaTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH0se30pO1xuICAgIGlmIChjb25maWcuYXBpQmFzZVVSTCkge1xuICAgICAgb3B0aW9ucy51cmwgPSBjb25maWcuYXBpQmFzZVVSTCArIG9wdGlvbnMudXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLnVybCA9IENvbmZpZy5hcGlCYXNlVVJMICsgb3B0aW9ucy51cmw7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGxldCBkYXRhID0gXy5yZWR1Y2Uob3B0aW9ucy5kYXRhLChyLGksayk9PntcbiAgICAgICAgaWYgKF8uaXNEYXRlKGkpKSB7XG4gICAgICAgICAgcltrXSA9IGkuZ2V0VGltZSgpO1xuICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9XG4gICAgICAgIHJba10gPSBpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICAgIH0se30pO1xuICAgICAgb3B0aW9ucy5kYXRhID0gZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH0sXG5cbiAgaGFuZGxlU3VjY2VzczpmdW5jdGlvbih7IHN0YXR1c0NvZGUsIGRhdGEgfSkge1xuICAgIHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xuICAgIGlmICgwID09IGRhdGEuZXJyb3JfY29kZSB8fCBkYXRhLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihkYXRhLmVycm9yX21zZyk7XG4gICAgICBlcnIuY29kZSA9IGRhdGEuZXJyb3JfY29kZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH0sXG4gIGhhbmRsZUZhaWw6ZnVuY3Rpb24oeyBzdGF0dXNDb2RlLCBkYXRhIH0pIHtcbiAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcbiAgICBsZXQgZXJyID0gbmV3IEVycm9yKGRhdGEuZXJyb3JfbXNnKTtcbiAgICBlcnIuY29kZSA9IGRhdGEuZXJyb3JfY29kZTtcbiAgICB0aHJvdyBlcnI7XG4gIH0sXG5cbiAgaGFuZGxlRmluaXNoKCkge1xuXG4gIH1cbn1cbiJdfQ==