'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  alert: function alert(title, msg) {
    return _wepy2.default.showModal({
      showCancel: false,
      title: title,
      content: msg
    });
  },
  confirm: function confirm(title, msg, okbtn, cancelbtn) {
    return _wepy2.default.showModal({
      title: title,
      content: msg,
      cancelText: cancelbtn,
      confirmText: okbtn
    }).then(function (res) {
      var flag = null;
      if (res.confirm) flag = 1;
      if (res.concel) flag = 0;
      return flag;
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYWxvZ3MuanMiXSwibmFtZXMiOlsiYWxlcnQiLCJ0aXRsZSIsIm1zZyIsIndlcHkiLCJzaG93TW9kYWwiLCJzaG93Q2FuY2VsIiwiY29udGVudCIsImNvbmZpcm0iLCJva2J0biIsImNhbmNlbGJ0biIsImNhbmNlbFRleHQiLCJjb25maXJtVGV4dCIsInRoZW4iLCJyZXMiLCJmbGFnIiwiY29uY2VsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O2tCQUNlO0FBQ2JBLFNBQU0sZUFBVUMsS0FBVixFQUFnQkMsR0FBaEIsRUFBcUI7QUFDekIsV0FBT0MsZUFBS0MsU0FBTCxDQUFlO0FBQ3BCQyxrQkFBVyxLQURTO0FBRXBCSixhQUFNQSxLQUZjO0FBR3BCSyxlQUFRSjtBQUhZLEtBQWYsQ0FBUDtBQUtELEdBUFk7QUFRYkssV0FBUSxpQkFBVU4sS0FBVixFQUFpQkMsR0FBakIsRUFBc0JNLEtBQXRCLEVBQTZCQyxTQUE3QixFQUF3QztBQUM5QyxXQUFPTixlQUFLQyxTQUFMLENBQWU7QUFDcEJILGFBQU1BLEtBRGM7QUFFcEJLLGVBQVFKLEdBRlk7QUFHcEJRLGtCQUFXRCxTQUhTO0FBSXBCRSxtQkFBWUg7QUFKUSxLQUFmLEVBTU5JLElBTk0sQ0FNRCxVQUFVQyxHQUFWLEVBQWU7QUFDbkIsVUFBSUMsT0FBTyxJQUFYO0FBQ0EsVUFBSUQsSUFBSU4sT0FBUixFQUFpQk8sT0FBTyxDQUFQO0FBQ2pCLFVBQUlELElBQUlFLE1BQVIsRUFBZ0JELE9BQU8sQ0FBUDtBQUNoQixhQUFPQSxJQUFQO0FBQ0QsS0FYTSxDQUFQO0FBWUQ7QUFyQlksQyIsImZpbGUiOiJkaWFsb2dzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWxlcnQ6ZnVuY3Rpb24gKHRpdGxlLG1zZykge1xuICAgIHJldHVybiB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICBzaG93Q2FuY2VsOmZhbHNlLFxuICAgICAgdGl0bGU6dGl0bGUsXG4gICAgICBjb250ZW50Om1zZ1xuICAgIH0pXG4gIH0sXG4gIGNvbmZpcm06ZnVuY3Rpb24gKHRpdGxlLCBtc2csIG9rYnRuLCBjYW5jZWxidG4pIHtcbiAgICByZXR1cm4gd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6dGl0bGUsXG4gICAgICBjb250ZW50Om1zZyxcbiAgICAgIGNhbmNlbFRleHQ6Y2FuY2VsYnRuLFxuICAgICAgY29uZmlybVRleHQ6b2tidG5cbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIGxldCBmbGFnID0gbnVsbDtcbiAgICAgIGlmIChyZXMuY29uZmlybSkgZmxhZyA9IDE7XG4gICAgICBpZiAocmVzLmNvbmNlbCkgZmxhZyA9IDA7XG4gICAgICByZXR1cm4gZmxhZztcbiAgICB9KVxuICB9XG59XG4iXX0=