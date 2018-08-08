'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _upngJs = require('./../npm/upng-js/UPNG.js');

var _upngJs2 = _interopRequireDefault(_upngJs);

var _config = require('./../config.js');

var _config2 = _interopRequireDefault(_config);

var _api = require('./../utils/api.js');

var _api2 = _interopRequireDefault(_api);

var _tools = require('./../utils/tools.js');

var _tools2 = _interopRequireDefault(_tools);

var _dialogs = require('./../utils/dialogs.js');

var _dialogs2 = _interopRequireDefault(_dialogs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      "navigationBarTitleText": "rhinotech人脸检测"
    }, _this.data = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'toPage',
    value: function toPage(e) {
      var path = e.currentTarget.dataset.path;
      wx.navigateTo({
        url: path
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiZGF0YSIsImUiLCJwYXRoIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ0wsZ0NBQTBCO0FBRHJCLEssUUFHVEMsSSxHQUFPLEU7Ozs7OzZCQUdDLENBRVA7OzsyQkFDTUMsQyxFQUFFO0FBQ1AsVUFBSUMsT0FBT0QsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLElBQW5DO0FBQ0FHLFNBQUdDLFVBQUgsQ0FBYztBQUNaQyxhQUFLTDtBQURPLE9BQWQ7QUFJRDs7OztFQWhCZ0NNLGVBQUtDLEk7O2tCQUFuQlgsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAnd2VweS1yZWR1eCdcbiAgaW1wb3J0IHVwbmcgZnJvbSAndXBuZy1qcydcbiAgaW1wb3J0IENvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbiAgaW1wb3J0IGFwaSBmcm9tICdAL3V0aWxzL2FwaSdcbiAgaW1wb3J0IHRvb2xzIGZyb20gJ0AvdXRpbHMvdG9vbHMnXG4gIGltcG9ydCBkaWFsb2dzIGZyb20gJ0AvdXRpbHMvZGlhbG9ncydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBcIm5hdmlnYXRpb25CYXJUaXRsZVRleHRcIjogXCJyaGlub3RlY2jkurrohLjmo4DmtYtcIlxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgXG4gICAgfVxuICAgIHRvUGFnZShlKXtcbiAgICAgIGxldCBwYXRoID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucGF0aDtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IHBhdGhcbiAgICAgIH0pXG4gICAgICBcbiAgICB9XG4gICAgXG4gIH1cbiAgXG4iXX0=