import wepy from 'wepy'
export default {
  alert:function (title,msg) {
    return wepy.showModal({
      showCancel:false,
      title:title,
      content:msg
    })
  },
  confirm:function (title, msg, okbtn, cancelbtn) {
    return wepy.showModal({
      title:title,
      content:msg,
      cancelText:cancelbtn,
      confirmText:okbtn
    })
    .then(function (res) {
      let flag = null;
      if (res.confirm) flag = 1;
      if (res.concel) flag = 0;
      return flag;
    })
  }
}
