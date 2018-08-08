import wepy from 'wepy'
import Config from '../config'
import _ from 'lodash'
import Promise from 'promise-polyfill'



export default {
  /**
   * 发送Post请求,请求都以Form形式发送
   * @param {String} url url相对路径
   * @param {Object} [form] - 发送内容
   * @param {Object} [httpConfig] - 其他配置
   */
  post: function (url, form, httpConfig = {}) {
    httpConfig.header = httpConfig.header || {'content-type':'application/x-www-form-urlencoded'};
    return this.request(url,'POST',form,httpConfig)
  },
  /**
   * GET,请求都以params形式发送
   * @param {String} url url相对路径
   * @param {Object} [params] - 发送内容
   * @param {Object} [httpConfig] - 其他配置
   */
  get: function (url, params, httpConfig) {
    return this.request(url,'GET',params,httpConfig)
  },


  request:function(url,method = 'GET',data = {},config = {}){
    wx.showNavigationBarLoading();

    let options = {
      header:config.header || {},
      url:url,
      data:data,
      method:method
    };

    if (config.apiBaseURL) {
      options.url = config.apiBaseURL + options.url;
    } else {
      options.url = Config.apiBaseURL + options.url;
    }

    try {
      // options = this.handleBeforeRequest(options,config);
      return wepy.request(options)
        .then(this.handleSuccess,this.handleFail)
    } catch (e) {
      console.log(e)
      wx.hideNavigationBarLoading();
      return Promise.reject(e);
    }

  },

  /**
   *
   * @param options
   * @param config
   * @return options
   */
  handleBeforeRequest:function(options,config) {
    let data = options.data;
    if (!config.noAuth) {
      let user = wx.getStorageSync('user');
      if (!user || !user.token) {
        let err = new Error('用户不存在');
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
    options.data = _.reduce(data,(r,i,k)=>{
      if (!_.isNull(i) && !_.isUndefined(i)) {
        r[k] = i;
      }
      return r;
    },{});
    if (config.apiBaseURL) {
      options.url = config.apiBaseURL + options.url;
    } else {
      options.url = Config.apiBaseURL + options.url;
    }
    if (options.data) {
      let data = _.reduce(options.data,(r,i,k)=>{
        if (_.isDate(i)) {
          r[k] = i.getTime();
          return r;
        }
        r[k] = i;
        return r;
      },{});
      options.data = data;
    }
    return options;
  },

  handleSuccess:function({ statusCode, data }) {
    wx.hideNavigationBarLoading();
    if (0 == data.error_code || data.statusCode == 200) {
      return data;
    } else {
      let err = new Error(data.error_msg);
      err.code = data.error_code;
      throw err;
    }
  },
  handleFail:function({ statusCode, data }) {
    wx.hideNavigationBarLoading();
    let err = new Error(data.error_msg);
    err.code = data.error_code;
    throw err;
  },

  handleFinish() {

  }
}
