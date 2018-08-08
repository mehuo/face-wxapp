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
      "navigationBarTitleText": "人脸识别"
    }, _this.data = {
      src: '',
      canvas_bg: null,
      canvas_iloc: null,
      canvas: {
        proportion: '',
        width: '',
        height: ''
      },
      faceData: {
        face_num: 0,
        face_list: []
      },
      isAnimation: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      // this.canvas_bg = wx.createCanvasContext('bgCanvas')
      // this.canvas_iloc = wx.createCanvasContext('ilocCanvas')
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '快来看看你的真实年龄吧！',
        path: '/pages/index',
        imageUrl: _config2.default.shareimg
      };
    }
  }, {
    key: 'check',
    value: function check() {
      var that = this;
      //重置页面数据
      this.faceData.face_num = 0;
      this.faceData.face_list = [];
      this.$apply();
      this.setData({
        'faceData.face_num': 0,
        'faceData.face_list': []
      });

      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        success: function success(res) {
          that.src = res.tempFilePaths[0];
          wx.getImageInfo({
            src: that.src,
            success: function success(res) {
              console.log(res);
              that.imageLoad(res); //绘制识别背景图

              // that.fakeData();

              that.isAnimation = true;
              that.setData({
                isAnimation: true
              });
              // wx.showLoading({
              //   title:'努力识别中'
              // })
              wx.uploadFile({
                url: _config2.default.apiBaseURL + '/uploadFile',
                filePath: that.src,
                name: 'file',
                formData: {
                  'index': _tools2.default._shuffUUID(8)
                },
                success: function success(res) {
                  console.log(res);
                  var data = JSON.parse(res.data);
                  if (data.result) {
                    that.buildData(data.result);
                  } else {
                    that.showErrMsg(data.error_msg);
                  }
                  // wx.hideLoading();
                  that.isAnimation = false;
                  that.setData({
                    isAnimation: false
                  });
                },
                fail: function fail(e) {
                  // wx.hideLoading();
                  that.showErrMsg(e.errMsg);
                  that.isAnimation = false;
                  that.setData({
                    isAnimation: false
                  });
                }
              });
            }
          });
        }
      });
    }

    //绘制识别区域和识别内容

  }, {
    key: 'buildData',
    value: function buildData(data) {
      var that = this;
      var rate = this.canvas.proportion;
      data.face_list.forEach(function (value, key) {
        value.color = _tools2.default._shuffCOLOR();
        value.beauty = Number(value.beauty.toFixed(2));
        var wrate = 100 / value.location.width;
        var hrate = 100 / value.location.height;
        var iloc = {
          w: that.canvas.owidth * wrate,
          h: that.canvas.oheight * hrate,
          left: value.location.left * wrate,
          top: value.location.top * hrate,
          rotation: -value.location.rotation,
          boxl: value.location.left * rate,
          boxt: value.location.top * rate,
          boxw: value.location.width * rate,
          boxh: value.location.height * rate
        };
        value.iloc = iloc;
      });
      var context = this.canvas_iloc;
      var context_bg = this.canvas_bg;

      this.faceData.face_num = data.face_num;
      this.faceData.face_list = data.face_list;
      this.setData({
        'faceData.face_num': data.face_num,
        'faceData.face_list': data.face_list
      });
      this.$apply();
    }

    //根据图片真实宽高和缩放比例设置canvas背景图

  }, {
    key: 'imageLoad',
    value: function imageLoad(res) {
      var _that$setData;

      var that = this;
      var path = res.path;
      var $width = res.width,
          //获取图片真实宽度
      $height = res.height,
          $rate = 300 / $width;
      // let real_width = Number(($width * $rate).toFixed(0));
      // let real_height = Number(($height * $rate).toFixed(0));
      var real_width = $width * $rate;
      var real_height = $height * $rate;
      that.canvas.proportion = $rate;
      that.canvas.width = real_width;
      that.canvas.height = real_height;
      that.canvas.owidth = $width;
      that.canvas.oheight = $height;
      that.setData((_that$setData = {}, _defineProperty(_that$setData, 'canvas.proportion', $rate), _defineProperty(_that$setData, 'canvas.width', real_width), _defineProperty(_that$setData, 'canvas.height', real_height), _defineProperty(_that$setData, 'canvas.owidth', $width), _defineProperty(_that$setData, 'canvas.oheight', $height), _that$setData));
      that.$apply();
    }
  }, {
    key: 'showErrMsg',
    value: function showErrMsg(msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      });
    }
  }, {
    key: 'fakeData',
    value: function fakeData() {
      var that = this;
      var data = { "error_code": 0, "error_msg": "SUCCESS", "log_id": 1594255535650, "timestamp": 1530199605, "cached": 0, "result": { "face_num": 1, "face_list": [{ "face_token": "fe4f02f4c012d781dd4e6601cf05d764", "location": { "left": 661, "top": 237, "width": 230, "height": 220, "rotation": 13 }, "face_probability": 1, "angle": { "yaw": 9.96204567, "pitch": 1.758413553, "roll": 33.61511993 }, "age": 63, "beauty": 77.00507355, "gender": { "type": "man", "probability": 0.9999958277 } }, { "face_token": "fe4f02f4c012d781dd4e6601cf05d764", "location": { "left": 451, "top": 210, "width": 195, "height": 181, "rotation": 35 }, "face_probability": 1, "angle": { "yaw": 9.96204567, "pitch": 1.758413553, "roll": 33.61511993 }, "age": 56, "beauty": 77.00507355, "gender": { "type": "female", "probability": 0.9999958277 } }] } };

      that.isAnimation = true;
      that.setData({
        isAnimation: true
      });
      setTimeout(function () {
        that.buildData(data.result);
        that.isAnimation = false;
        that.setData({
          isAnimation: false
        });
      }, 3000);
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/recog/recog'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29nLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiZGF0YSIsInNyYyIsImNhbnZhc19iZyIsImNhbnZhc19pbG9jIiwiY2FudmFzIiwicHJvcG9ydGlvbiIsIndpZHRoIiwiaGVpZ2h0IiwiZmFjZURhdGEiLCJmYWNlX251bSIsImZhY2VfbGlzdCIsImlzQW5pbWF0aW9uIiwicmVzIiwiZnJvbSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCIsIkNvbmZpZyIsInNoYXJlaW1nIiwidGhhdCIsIiRhcHBseSIsInNldERhdGEiLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwidGVtcEZpbGVQYXRocyIsImdldEltYWdlSW5mbyIsImltYWdlTG9hZCIsInVwbG9hZEZpbGUiLCJ1cmwiLCJhcGlCYXNlVVJMIiwiZmlsZVBhdGgiLCJuYW1lIiwiZm9ybURhdGEiLCJ0b29scyIsIl9zaHVmZlVVSUQiLCJKU09OIiwicGFyc2UiLCJyZXN1bHQiLCJidWlsZERhdGEiLCJzaG93RXJyTXNnIiwiZXJyb3JfbXNnIiwiZmFpbCIsImUiLCJlcnJNc2ciLCJyYXRlIiwiZm9yRWFjaCIsInZhbHVlIiwia2V5IiwiY29sb3IiLCJfc2h1ZmZDT0xPUiIsImJlYXV0eSIsIk51bWJlciIsInRvRml4ZWQiLCJ3cmF0ZSIsImxvY2F0aW9uIiwiaHJhdGUiLCJpbG9jIiwidyIsIm93aWR0aCIsImgiLCJvaGVpZ2h0IiwibGVmdCIsInRvcCIsInJvdGF0aW9uIiwiYm94bCIsImJveHQiLCJib3h3IiwiYm94aCIsImNvbnRleHQiLCJjb250ZXh0X2JnIiwiJHdpZHRoIiwiJGhlaWdodCIsIiRyYXRlIiwicmVhbF93aWR0aCIsInJlYWxfaGVpZ2h0IiwibXNnIiwic2hvd1RvYXN0IiwiaWNvbiIsInNldFRpbWVvdXQiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6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O0FBQ0FXLFdBQUtFLE9BQUwsQ0FBYTtBQUNYYixxQkFBYztBQURILE9BQWI7QUFHQTBFLGlCQUFXLFlBQVU7QUFDbkIvRCxhQUFLdUIsU0FBTCxDQUFlN0MsS0FBSzRDLE1BQXBCO0FBQ0F0QixhQUFLWCxXQUFMLEdBQW1CLEtBQW5CO0FBQ0FXLGFBQUtFLE9BQUwsQ0FBYTtBQUNYYix1QkFBYztBQURILFNBQWI7QUFHRCxPQU5ELEVBTUUsSUFORjtBQU9EOzs7O0VBOUxnQzJFLGVBQUtDLEk7O2tCQUFuQnpGLEsiLCJmaWxlIjoicmVjb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3dlcHktcmVkdXgnXG4gIGltcG9ydCB1cG5nIGZyb20gJ3VwbmctanMnXG4gIGltcG9ydCBDb25maWcgZnJvbSAnQC9jb25maWcnXG5cbiAgaW1wb3J0IGFwaSBmcm9tICdAL3V0aWxzL2FwaSdcbiAgaW1wb3J0IHRvb2xzIGZyb20gJ0AvdXRpbHMvdG9vbHMnXG4gIGltcG9ydCBkaWFsb2dzIGZyb20gJ0AvdXRpbHMvZGlhbG9ncydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBcIm5hdmlnYXRpb25CYXJUaXRsZVRleHRcIjogXCLkurrohLjor4bliKtcIlxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgc3JjIDogJycsXG4gICAgICBjYW52YXNfYmcgOiBudWxsLFxuICAgICAgY2FudmFzX2lsb2MgOiBudWxsLFxuICAgICAgY2FudmFzOntcbiAgICAgICAgcHJvcG9ydGlvbjonJyxcbiAgICAgICAgd2lkdGggOiAnJyxcbiAgICAgICAgaGVpZ2h0OiAnJ1xuICAgICAgfSxcbiAgICAgIGZhY2VEYXRhOntcbiAgICAgICAgZmFjZV9udW0gOiAwLFxuICAgICAgICBmYWNlX2xpc3QgOiBbXVxuICAgICAgfSxcbiAgICAgIGlzQW5pbWF0aW9uOmZhbHNlXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgLy8gdGhpcy5jYW52YXNfYmcgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdiZ0NhbnZhcycpXG4gICAgICAvLyB0aGlzLmNhbnZhc19pbG9jID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnaWxvY0NhbnZhcycpXG4gICAgfVxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xuICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cbiAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldClcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiAn5b+r5p2l55yL55yL5L2g55qE55yf5a6e5bm06b6E5ZCn77yBJyxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXG4gICAgICAgIGltYWdlVXJsIDogQ29uZmlnLnNoYXJlaW1nXG4gICAgICB9XG4gICAgfVxuICAgIGNoZWNrKCl7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAvL+mHjee9rumhtemdouaVsOaNrlxuICAgICAgdGhpcy5mYWNlRGF0YS5mYWNlX251bSA9IDA7XG4gICAgICB0aGlzLmZhY2VEYXRhLmZhY2VfbGlzdCA9IFtdO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICdmYWNlRGF0YS5mYWNlX251bSc6MCxcbiAgICAgICAgJ2ZhY2VEYXRhLmZhY2VfbGlzdCc6W11cbiAgICAgIH0pXG5cbiAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgY291bnQ6MSxcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvLyBvcmlnaW5hbCDljp/lm77vvIxjb21wcmVzc2VkIOWOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIHRoYXQuc3JjID0gcmVzLnRlbXBGaWxlUGF0aHNbMF07XG4gICAgICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcbiAgICAgICAgICAgIHNyYyA6IHRoYXQuc3JjLFxuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICB0aGF0LmltYWdlTG9hZChyZXMpOyAvL+e7mOWItuivhuWIq+iDjOaZr+WbvlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy8gdGhhdC5mYWtlRGF0YSgpO1xuXG4gICAgICAgICAgICAgIHRoYXQuaXNBbmltYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGlzQW5pbWF0aW9uIDogdHJ1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAvLyB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgIC8vICAgdGl0bGU6J+WKquWKm+ivhuWIq+S4rSdcbiAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgd3gudXBsb2FkRmlsZSh7ICBcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5hcGlCYXNlVVJMICsgJy91cGxvYWRGaWxlJywgXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IHRoYXQuc3JjLCAgXG4gICAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLCAgXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6eyAgXG4gICAgICAgICAgICAgICAgICAnaW5kZXgnOiB0b29scy5fc2h1ZmZVVUlEKDgpLFxuICAgICAgICAgICAgICAgIH0sICBcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpeyAgXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTsgIFxuICAgICAgICAgICAgICAgICAgaWYoZGF0YS5yZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmJ1aWxkRGF0YShkYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93RXJyTXNnKGRhdGEuZXJyb3JfbXNnKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuaXNBbmltYXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGlzQW5pbWF0aW9uIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsIDogZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAvLyB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgICAgdGhhdC5zaG93RXJyTXNnKGUuZXJyTXNnKVxuICAgICAgICAgICAgICAgICAgdGhhdC5pc0FuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgaXNBbmltYXRpb24gOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8v57uY5Yi26K+G5Yir5Yy65Z+f5ZKM6K+G5Yir5YaF5a65XG4gICAgYnVpbGREYXRhKGRhdGEpe1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgbGV0IHJhdGUgPSB0aGlzLmNhbnZhcy5wcm9wb3J0aW9uO1xuICAgICAgZGF0YS5mYWNlX2xpc3QuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSxrZXkpe1xuICAgICAgICB2YWx1ZS5jb2xvciA9IHRvb2xzLl9zaHVmZkNPTE9SKCk7ICBcbiAgICAgICAgdmFsdWUuYmVhdXR5ID0gTnVtYmVyKHZhbHVlLmJlYXV0eS50b0ZpeGVkKDIpKVxuICAgICAgICBsZXQgd3JhdGUgPSAxMDAgLyB2YWx1ZS5sb2NhdGlvbi53aWR0aDtcbiAgICAgICAgbGV0IGhyYXRlID0gMTAwIC8gdmFsdWUubG9jYXRpb24uaGVpZ2h0O1xuICAgICAgICBsZXQgaWxvYyA9IHtcbiAgICAgICAgICB3IDogdGhhdC5jYW52YXMub3dpZHRoICogd3JhdGUsXG4gICAgICAgICAgaCA6IHRoYXQuY2FudmFzLm9oZWlnaHQgKiBocmF0ZSxcbiAgICAgICAgICBsZWZ0IDogdmFsdWUubG9jYXRpb24ubGVmdCAqIHdyYXRlLFxuICAgICAgICAgIHRvcCA6IHZhbHVlLmxvY2F0aW9uLnRvcCAqIGhyYXRlLFxuICAgICAgICAgIHJvdGF0aW9uIDogLSh2YWx1ZS5sb2NhdGlvbi5yb3RhdGlvbiksXG4gICAgICAgICAgYm94bCA6IHZhbHVlLmxvY2F0aW9uLmxlZnQqcmF0ZSxcbiAgICAgICAgICBib3h0IDogdmFsdWUubG9jYXRpb24udG9wKnJhdGUsXG4gICAgICAgICAgYm94dyA6IHZhbHVlLmxvY2F0aW9uLndpZHRoKnJhdGUsXG4gICAgICAgICAgYm94aCA6IHZhbHVlLmxvY2F0aW9uLmhlaWdodCpyYXRlLFxuICAgICAgICB9IFxuICAgICAgICB2YWx1ZS5pbG9jID0gaWxvYzsgICAgIFxuICAgICAgfSlcbiAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5jYW52YXNfaWxvYztcbiAgICAgIGxldCBjb250ZXh0X2JnID0gdGhpcy5jYW52YXNfYmc7XG5cblxuICAgICAgdGhpcy5mYWNlRGF0YS5mYWNlX251bSA9IGRhdGEuZmFjZV9udW07XG4gICAgICB0aGlzLmZhY2VEYXRhLmZhY2VfbGlzdCA9IGRhdGEuZmFjZV9saXN0O1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJ2ZhY2VEYXRhLmZhY2VfbnVtJzpkYXRhLmZhY2VfbnVtLFxuICAgICAgICAnZmFjZURhdGEuZmFjZV9saXN0JzpkYXRhLmZhY2VfbGlzdFxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KCk7ICAgIFxuXG4gICAgfVxuXG5cbiAgICAvL+agueaNruWbvueJh+ecn+WunuWuvemrmOWSjOe8qeaUvuavlOS+i+iuvue9rmNhbnZhc+iDjOaZr+WbvlxuICAgIGltYWdlTG9hZChyZXMpe1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgbGV0IHBhdGggPSByZXMucGF0aDtcbiAgICAgIGxldCAkd2lkdGg9cmVzLndpZHRoLCAgICAvL+iOt+WPluWbvueJh+ecn+WunuWuveW6plxuICAgICAgICAgICRoZWlnaHQ9cmVzLmhlaWdodCxcbiAgICAgICAgICAkcmF0ZSA9ICgzMDAgLyAkd2lkdGgpO1xuICAgICAgLy8gbGV0IHJlYWxfd2lkdGggPSBOdW1iZXIoKCR3aWR0aCAqICRyYXRlKS50b0ZpeGVkKDApKTtcbiAgICAgIC8vIGxldCByZWFsX2hlaWdodCA9IE51bWJlcigoJGhlaWdodCAqICRyYXRlKS50b0ZpeGVkKDApKTtcbiAgICAgIGxldCByZWFsX3dpZHRoID0gJHdpZHRoICogJHJhdGU7XG4gICAgICBsZXQgcmVhbF9oZWlnaHQgPSAkaGVpZ2h0ICogJHJhdGU7XG4gICAgICB0aGF0LmNhbnZhcy5wcm9wb3J0aW9uID0gJHJhdGU7XG4gICAgICB0aGF0LmNhbnZhcy53aWR0aCA9IHJlYWxfd2lkdGg7XG4gICAgICB0aGF0LmNhbnZhcy5oZWlnaHQgPSByZWFsX2hlaWdodDtcbiAgICAgIHRoYXQuY2FudmFzLm93aWR0aCA9ICR3aWR0aDtcbiAgICAgIHRoYXQuY2FudmFzLm9oZWlnaHQgPSAkaGVpZ2h0O1xuICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgWydjYW52YXMucHJvcG9ydGlvbiddOiRyYXRlLFxuICAgICAgICBbJ2NhbnZhcy53aWR0aCddIDogcmVhbF93aWR0aCxcbiAgICAgICAgWydjYW52YXMuaGVpZ2h0J10gOiByZWFsX2hlaWdodCxcbiAgICAgICAgWydjYW52YXMub3dpZHRoJ10gOiAkd2lkdGgsXG4gICAgICAgIFsnY2FudmFzLm9oZWlnaHQnXSA6ICRoZWlnaHRcbiAgICAgIH0pIFxuICAgICAgdGhhdC4kYXBwbHkoKTsgICAgXG5cbiAgICB9XG4gICAgc2hvd0Vyck1zZyhtc2cpe1xuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6IG1zZyxcbiAgICAgICAgaWNvbjonbm9uZSdcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZmFrZURhdGEoKXtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIGxldCBkYXRhPXtcImVycm9yX2NvZGVcIjowLFwiZXJyb3JfbXNnXCI6XCJTVUNDRVNTXCIsXCJsb2dfaWRcIjoxNTk0MjU1NTM1NjUwLFwidGltZXN0YW1wXCI6MTUzMDE5OTYwNSxcImNhY2hlZFwiOjAsXCJyZXN1bHRcIjp7XCJmYWNlX251bVwiOjEsXCJmYWNlX2xpc3RcIjpbXG4gICAgICAgICAge1wiZmFjZV90b2tlblwiOlwiZmU0ZjAyZjRjMDEyZDc4MWRkNGU2NjAxY2YwNWQ3NjRcIixcImxvY2F0aW9uXCI6e1wibGVmdFwiOjY2MSxcInRvcFwiOjIzNyxcIndpZHRoXCI6MjMwLFwiaGVpZ2h0XCI6MjIwLFwicm90YXRpb25cIjoxM30sXCJmYWNlX3Byb2JhYmlsaXR5XCI6MSxcImFuZ2xlXCI6e1wieWF3XCI6OS45NjIwNDU2NyxcInBpdGNoXCI6MS43NTg0MTM1NTMsXCJyb2xsXCI6MzMuNjE1MTE5OTN9LFwiYWdlXCI6NjMsXCJiZWF1dHlcIjo3Ny4wMDUwNzM1NSxcImdlbmRlclwiOntcInR5cGVcIjpcIm1hblwiLFwicHJvYmFiaWxpdHlcIjowLjk5OTk5NTgyNzd9fVxuICAgICAgICAgICx7XCJmYWNlX3Rva2VuXCI6XCJmZTRmMDJmNGMwMTJkNzgxZGQ0ZTY2MDFjZjA1ZDc2NFwiLFwibG9jYXRpb25cIjp7XCJsZWZ0XCI6NDUxLFwidG9wXCI6MjEwLFwid2lkdGhcIjoxOTUsXCJoZWlnaHRcIjoxODEsXCJyb3RhdGlvblwiOjM1fSxcImZhY2VfcHJvYmFiaWxpdHlcIjoxLFwiYW5nbGVcIjp7XCJ5YXdcIjo5Ljk2MjA0NTY3LFwicGl0Y2hcIjoxLjc1ODQxMzU1MyxcInJvbGxcIjozMy42MTUxMTk5M30sXCJhZ2VcIjo1NixcImJlYXV0eVwiOjc3LjAwNTA3MzU1LFwiZ2VuZGVyXCI6e1widHlwZVwiOlwiZmVtYWxlXCIsXCJwcm9iYWJpbGl0eVwiOjAuOTk5OTk1ODI3N319XG4gICAgICAgICAgXX19XG5cbiAgICAgIHRoYXQuaXNBbmltYXRpb24gPSB0cnVlO1xuICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgaXNBbmltYXRpb24gOiB0cnVlXG4gICAgICB9KVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICB0aGF0LmJ1aWxkRGF0YShkYXRhLnJlc3VsdCk7XG4gICAgICAgIHRoYXQuaXNBbmltYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBpc0FuaW1hdGlvbiA6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9LDMwMDApXG4gICAgfVxuXG4gIH1cbiAgXG4iXX0=