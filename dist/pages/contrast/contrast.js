'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../../npm/wepy-redux/lib/index.js');

var _upngJs = require('./../../npm/upng-js/UPNG.js');

var _upngJs2 = _interopRequireDefault(_upngJs);

var _config = require('./../../config.js');

var _config2 = _interopRequireDefault(_config);

var _api = require('./../../utils/api.js');

var _api2 = _interopRequireDefault(_api);

var _tools = require('./../../utils/tools.js');

var _tools2 = _interopRequireDefault(_tools);

var _dialogs = require('./../../utils/dialogs.js');

var _dialogs2 = _interopRequireDefault(_dialogs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      "navigationBarTitleText": "人脸对比"
    }, _this.data = {
      src: {
        left: '',
        right: ''
      },
      base64: {
        left: '',
        right: ''
      },
      load: {
        left: false,
        right: false
      },
      score: 0,
      isAnimation: false

    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      this.canvas_bg = wx.createCanvasContext('bgCanvas');
      this.canvas_iloc = wx.createCanvasContext('ilocCanvas');
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '快来开启人脸检测之旅吧！',
        path: '/pages/index',
        imageUrl: _config2.default.shareimg
      };
    }
  }, {
    key: 'upload',
    value: function upload(e) {
      var that = this;
      var index = e.currentTarget.dataset.index;

      that.score = 0;
      that.setData({
        'score': 0
      });
      var str = 'base64.' + index;
      that.setData(_defineProperty({}, str, ''));
      that.base64[index] = '';
      that.$apply();

      wx.chooseImage({
        count: 2,
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        success: function success(res) {
          if (res.tempFilePaths.length == 2) {
            that.src.left = res.tempFilePaths[0];
            that.src.right = res.tempFilePaths[1];
            that.setData({
              'src.left': res.tempFilePaths[0],
              'src.right': res.tempFilePaths[1]
            });
            for (var item in that.src) {
              that.doUpload(item);
            }
          } else {
            that.src[index] = res.tempFilePaths[0];
            var _str = 'src.' + index;
            that.setData(_defineProperty({}, _str, res.tempFilePaths[0]));
            that.doUpload(index);
          }
          that.$apply();
        }
      });
    }
    //正式上传

  }, {
    key: 'doUpload',
    value: function doUpload(type) {
      var that = this;
      var loadstr = 'load.' + type;
      that.load[type] = true;
      that.setData(_defineProperty({}, loadstr, true));

      wx.uploadFile({
        url: _config2.default.apiBaseURL + '/uploadImage',
        filePath: that.src[type],
        name: 'file',
        formData: {
          'index': type
        },
        success: function success(res) {
          console.log(res);
          if (res.statusCode == 200) {
            var path_name = '';
            if (res.data) {
              path_name = res.data;
            }
            var str = 'base64.' + type;
            that.setData(_defineProperty({}, str, path_name));
            that.base64[type] = path_name;
            that.$apply();
          } else {
            that.showErrMsg(res.errMsg);
          }
          var loadstr = 'load.' + type;
          that.load[type] = false;
          that.setData(_defineProperty({}, loadstr, false));
        },
        fail: function fail(e) {
          that.showErrMsg(e.errMsg);
          var loadstr = 'load.' + type;
          that.load[type] = false;
          that.setData(_defineProperty({}, loadstr, false));
        }
      });
    }
  }, {
    key: 'check',
    value: function check() {
      var that = this;
      //上传图片，图片上传检测完成后，开始检测相似度
      if (that.base64.left && that.base64.right) {
        that.isAnimation = true;
        that.setData({
          isAnimation: true
        });
        _api2.default.post('/faceMatch', { image1: that.base64.left, image2: that.base64.right }).then(function (res) {
          that.buildData(res.result);
        }).catch(function (e) {
          that.showErrMsg(e.errMsg);
          that.isAnimation = false;
          that.setData({
            isAnimation: false
          });
        });
      } else {
        that.showErrMsg('请上传两张照片，若您已经选择两张照片仍不能检测，请您尝试重新选择');
      }
      // setTimeout(function(){
      //   that.buildData(res.result);
      // },1000);
    }
    //绘制识别区域和识别内容

  }, {
    key: 'buildData',
    value: function buildData(data) {
      var that = this;
      if (data.score) {
        this.score = Number(data.score.toFixed(1)) || 0;
      }
      that.isAnimation = false;
      that.setData({
        isAnimation: false
      });
      this.$apply();
    }
  }, {
    key: 'showErrMsg',
    value: function showErrMsg(msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/contrast/contrast'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyYXN0LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiZGF0YSIsInNyYyIsImxlZnQiLCJyaWdodCIsImJhc2U2NCIsImxvYWQiLCJzY29yZSIsImlzQW5pbWF0aW9uIiwiY2FudmFzX2JnIiwid3giLCJjcmVhdGVDYW52YXNDb250ZXh0IiwiY2FudmFzX2lsb2MiLCJyZXMiLCJmcm9tIiwiY29uc29sZSIsImxvZyIsInRhcmdldCIsInRpdGxlIiwicGF0aCIsImltYWdlVXJsIiwiQ29uZmlnIiwic2hhcmVpbWciLCJlIiwidGhhdCIsImluZGV4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJzZXREYXRhIiwic3RyIiwiJGFwcGx5IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJ0ZW1wRmlsZVBhdGhzIiwibGVuZ3RoIiwiaXRlbSIsImRvVXBsb2FkIiwidHlwZSIsImxvYWRzdHIiLCJ1cGxvYWRGaWxlIiwidXJsIiwiYXBpQmFzZVVSTCIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwic3RhdHVzQ29kZSIsInBhdGhfbmFtZSIsInNob3dFcnJNc2ciLCJlcnJNc2ciLCJmYWlsIiwiYXBpIiwicG9zdCIsImltYWdlMSIsImltYWdlMiIsInRoZW4iLCJidWlsZERhdGEiLCJyZXN1bHQiLCJjYXRjaCIsIk51bWJlciIsInRvRml4ZWQiLCJtc2ciLCJzaG93VG9hc3QiLCJpY29uIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ0wsZ0NBQTBCO0FBRHJCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUk7QUFDRkMsY0FBSyxFQURIO0FBRUZDLGVBQU07QUFGSixPQURDO0FB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QUFjO0FBREgsU0FBYjtBQUdBNkMsc0JBQUlDLElBQUosQ0FBUyxZQUFULEVBQXNCLEVBQUNDLFFBQU8vQixLQUFLbkIsTUFBTCxDQUFZRixJQUFwQixFQUF5QnFELFFBQU9oQyxLQUFLbkIsTUFBTCxDQUFZRCxLQUE1QyxFQUF0QixFQUEwRXFELElBQTFFLENBQStFLFVBQVM1QyxHQUFULEVBQWE7QUFDMUZXLGVBQUtrQyxTQUFMLENBQWU3QyxJQUFJOEMsTUFBbkI7QUFDRCxTQUZELEVBRUdDLEtBRkgsQ0FFUyxVQUFTckMsQ0FBVCxFQUFXO0FBQ2xCQyxlQUFLMEIsVUFBTCxDQUFnQjNCLEVBQUU0QixNQUFsQjtBQUNBM0IsZUFBS2hCLFdBQUwsR0FBbUIsS0FBbkI7QUFDQWdCLGVBQUtJLE9BQUwsQ0FBYTtBQUNYcEIseUJBQWM7QUFESCxXQUFiO0FBR0QsU0FSRDtBQVNELE9BZEQsTUFjSztBQUNIZ0IsYUFBSzBCLFVBQUwsQ0FBZ0Isa0NBQWhCO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDRDtBQUNEOzs7OzhCQUNVakQsSSxFQUFLO0FBQ2IsVUFBSXVCLE9BQU8sSUFBWDtBQUNBLFVBQUd2QixLQUFLTSxLQUFSLEVBQWM7QUFDWixhQUFLQSxLQUFMLEdBQWFzRCxPQUFPNUQsS0FBS00sS0FBTCxDQUFXdUQsT0FBWCxDQUFtQixDQUFuQixDQUFQLEtBQWlDLENBQTlDO0FBQ0Q7QUFDRHRDLFdBQUtoQixXQUFMLEdBQW1CLEtBQW5CO0FBQ0FnQixXQUFLSSxPQUFMLENBQWE7QUFDWHBCLHFCQUFjO0FBREgsT0FBYjtBQUdBLFdBQUtzQixNQUFMO0FBRUQ7OzsrQkFFVWlDLEcsRUFBSTtBQUNickQsU0FBR3NELFNBQUgsQ0FBYTtBQUNYOUMsZUFBTzZDLEdBREk7QUFFWEUsY0FBSztBQUZNLE9BQWI7QUFJRDs7OztFQTFLZ0NDLGVBQUtDLEk7O2tCQUFuQnBFLEsiLCJmaWxlIjoiY29udHJhc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3dlcHktcmVkdXgnXG4gIGltcG9ydCB1cG5nIGZyb20gJ3VwbmctanMnXG4gIGltcG9ydCBDb25maWcgZnJvbSAnQC9jb25maWcnXG5cbiAgaW1wb3J0IGFwaSBmcm9tICdAL3V0aWxzL2FwaSdcbiAgaW1wb3J0IHRvb2xzIGZyb20gJ0AvdXRpbHMvdG9vbHMnXG4gIGltcG9ydCBkaWFsb2dzIGZyb20gJ0AvdXRpbHMvZGlhbG9ncydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBcIm5hdmlnYXRpb25CYXJUaXRsZVRleHRcIjogXCLkurrohLjlr7nmr5RcIlxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgc3JjOntcbiAgICAgICAgbGVmdDonJyxcbiAgICAgICAgcmlnaHQ6JydcbiAgICAgIH0sXG4gICAgICBiYXNlNjQ6e1xuICAgICAgICBsZWZ0OicnLFxuICAgICAgICByaWdodDonJ1xuICAgICAgfSxcbiAgICAgIGxvYWQ6e1xuICAgICAgICBsZWZ0OmZhbHNlLFxuICAgICAgICByaWdodDpmYWxzZVxuICAgICAgfSxcbiAgICAgIHNjb3JlIDogMCxcbiAgICAgIGlzQW5pbWF0aW9uOmZhbHNlXG5cbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgICB0aGlzLmNhbnZhc19iZyA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ2JnQ2FudmFzJylcbiAgICAgIHRoaXMuY2FudmFzX2lsb2MgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdpbG9jQ2FudmFzJylcbiAgICB9XG4gICAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgICBpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XG4gICAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxuICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6ICflv6vmnaXlvIDlkK/kurrohLjmo4DmtYvkuYvml4XlkKfvvIEnLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaW1hZ2VVcmwgOiBDb25maWcuc2hhcmVpbWdcbiAgICAgIH1cbiAgICB9XG4gICAgdXBsb2FkKGUpe1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgbGV0IGluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG5cbiAgICAgIHRoYXQuc2NvcmUgPSAwO1xuICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgJ3Njb3JlJyA6IDBcbiAgICAgIH0pXG4gICAgICBsZXQgc3RyID0gJ2Jhc2U2NC4nICsgaW5kZXg7XG4gICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICBbc3RyXSA6ICcnXG4gICAgICB9KVxuICAgICAgdGhhdC5iYXNlNjRbaW5kZXhdID0gJyc7XG4gICAgICB0aGF0LiRhcHBseSgpO1xuXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgIGNvdW50OjIsXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSwgLy8gb3JpZ2luYWwg5Y6f5Zu+77yMY29tcHJlc3NlZCDljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpe1xuICAgICAgICAgIGlmKHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aCA9PSAyKXtcbiAgICAgICAgICAgIHRoYXQuc3JjLmxlZnQgPSByZXMudGVtcEZpbGVQYXRoc1swXTtcbiAgICAgICAgICAgIHRoYXQuc3JjLnJpZ2h0ID0gcmVzLnRlbXBGaWxlUGF0aHNbMV07XG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAnc3JjLmxlZnQnIDogcmVzLnRlbXBGaWxlUGF0aHNbMF0sXG4gICAgICAgICAgICAgICdzcmMucmlnaHQnIDogcmVzLnRlbXBGaWxlUGF0aHNbMV0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZm9yKGxldCBpdGVtIGluIHRoYXQuc3JjKXtcbiAgICAgICAgICAgICAgdGhhdC5kb1VwbG9hZChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoYXQuc3JjW2luZGV4XSA9IHJlcy50ZW1wRmlsZVBhdGhzWzBdO1xuICAgICAgICAgICAgbGV0IHN0ciA9ICdzcmMuJyArIGluZGV4O1xuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgW3N0cl0gOiByZXMudGVtcEZpbGVQYXRoc1swXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGF0LmRvVXBsb2FkKGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgLy/mraPlvI/kuIrkvKBcbiAgICBkb1VwbG9hZCh0eXBlKXtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIGxldCBsb2Fkc3RyID0gJ2xvYWQuJyArIHR5cGU7XG4gICAgICB0aGF0LmxvYWRbdHlwZV0gPSB0cnVlO1xuICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgW2xvYWRzdHJdIDogdHJ1ZVxuICAgICAgfSlcblxuICAgICAgd3gudXBsb2FkRmlsZSh7ICBcbiAgICAgICAgdXJsOiBDb25maWcuYXBpQmFzZVVSTCArICcvdXBsb2FkSW1hZ2UnLCBcbiAgICAgICAgZmlsZVBhdGg6IHRoYXQuc3JjW3R5cGVdLCAgXG4gICAgICAgIG5hbWU6ICdmaWxlJywgIFxuICAgICAgICBmb3JtRGF0YTp7ICBcbiAgICAgICAgICAnaW5kZXgnOiB0eXBlLFxuICAgICAgICB9LCAgXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7ICBcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlID09IDIwMCl7XG4gICAgICAgICAgICBsZXQgcGF0aF9uYW1lID0gJyc7XG4gICAgICAgICAgICBpZihyZXMuZGF0YSl7XG4gICAgICAgICAgICAgIHBhdGhfbmFtZSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHN0ciA9ICdiYXNlNjQuJyArIHR5cGVcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIFtzdHJdIDogcGF0aF9uYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhhdC5iYXNlNjRbdHlwZV0gPSBwYXRoX25hbWU7XG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhhdC5zaG93RXJyTXNnKHJlcy5lcnJNc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbG9hZHN0ciA9ICdsb2FkLicgKyB0eXBlO1xuICAgICAgICAgIHRoYXQubG9hZFt0eXBlXSA9IGZhbHNlO1xuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBbbG9hZHN0cl0gOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwgOiBmdW5jdGlvbihlKXtcbiAgICAgICAgICB0aGF0LnNob3dFcnJNc2coZS5lcnJNc2cpOyBcbiAgICAgICAgICBsZXQgbG9hZHN0ciA9ICdsb2FkLicgKyB0eXBlO1xuICAgICAgICAgIHRoYXQubG9hZFt0eXBlXSA9IGZhbHNlO1xuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBbbG9hZHN0cl0gOiBmYWxzZVxuICAgICAgICAgIH0pICAgICAgXG4gICAgICAgIH1cbiAgICAgIH0pIFxuICAgIH1cbiAgICBjaGVjaygpe1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgLy/kuIrkvKDlm77niYfvvIzlm77niYfkuIrkvKDmo4DmtYvlrozmiJDlkI7vvIzlvIDlp4vmo4DmtYvnm7jkvLzluqZcbiAgICAgIGlmKHRoYXQuYmFzZTY0LmxlZnQgJiYgdGhhdC5iYXNlNjQucmlnaHQpe1xuICAgICAgICB0aGF0LmlzQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBpc0FuaW1hdGlvbiA6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgYXBpLnBvc3QoJy9mYWNlTWF0Y2gnLHtpbWFnZTE6dGhhdC5iYXNlNjQubGVmdCxpbWFnZTI6dGhhdC5iYXNlNjQucmlnaHR9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgdGhhdC5idWlsZERhdGEocmVzLnJlc3VsdCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIHRoYXQuc2hvd0Vyck1zZyhlLmVyck1zZyk7XG4gICAgICAgICAgdGhhdC5pc0FuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBpc0FuaW1hdGlvbiA6IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSkgXG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhhdC5zaG93RXJyTXNnKCfor7fkuIrkvKDkuKTlvKDnhafniYfvvIzoi6Xmgqjlt7Lnu4/pgInmi6nkuKTlvKDnhafniYfku43kuI3og73mo4DmtYvvvIzor7fmgqjlsJ3or5Xph43mlrDpgInmi6knKTtcbiAgICAgIH1cbiAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIC8vICAgdGhhdC5idWlsZERhdGEocmVzLnJlc3VsdCk7XG4gICAgICAvLyB9LDEwMDApO1xuICAgIH1cbiAgICAvL+e7mOWItuivhuWIq+WMuuWfn+WSjOivhuWIq+WGheWuuVxuICAgIGJ1aWxkRGF0YShkYXRhKXtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIGlmKGRhdGEuc2NvcmUpe1xuICAgICAgICB0aGlzLnNjb3JlID0gTnVtYmVyKGRhdGEuc2NvcmUudG9GaXhlZCgxKSkgfHwgMDtcbiAgICAgIH1cbiAgICAgIHRoYXQuaXNBbmltYXRpb24gPSBmYWxzZTtcbiAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgIGlzQW5pbWF0aW9uIDogZmFsc2VcbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpOyAgXG5cbiAgICB9XG5cbiAgICBzaG93RXJyTXNnKG1zZyl7XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogbXNnLFxuICAgICAgICBpY29uOidub25lJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuICBcbiJdfQ==