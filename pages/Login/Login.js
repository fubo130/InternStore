let app = getApp();
import * as utils from '../../utils/util.js';
let okayapi = require('../../utils/okayapi/okayapi.js');

Page({
    data: {
        openid: '',
    },
    onLoad: function () {
        var that = this;
        var code = '',
            openid = '';
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            //传入用户信息
                            app.globalData.userInfo = res.userInfo
                            wx.login({
                                //获取code
                                success: function (res) {
                                    code = res.code //返回code
                                    wx.request({
                                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4d3ef35070a63ac6&secret=0a1c576a369b58876754b465f792f43a&js_code=' + code + '&grant_type=authorization_code',
                                        data: {},
                                        header: {
                                            'content-type': 'application/json'
                                        },
                                        success: function (res) {
                                            openid = res.data.openid //返回openid
                                            app.globalData.openid = openid
                                            that.setData({
                                                openid: openid,
                                            });
                                        },
                                        fail: function (err) {
                                            console.log('error', err);
                                        }
                                    })
                                }
                            })

                            //用户已经授权过
                            wx.switchTab({
                                url: '/pages/HomePage/HomePage'
                            })
                        }
                    });
                }
            }
        })
    },

    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            var code = '', openid = '';
            wx.login({
                //获取code
                success: function (res) {
                    code = res.code //返回code
                    wx.request({
                        url: 'http://hb9.api.yesapi.cn/?s=App.User.Login&username=def&password=202cb962ac59075b964b07152d234b70&&app_key=74928B74E87AC199A83A17EEDB749F0A',
                        success:function(res) {
                            console.log(res)
                        }
                    }),

                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4d3ef35070a63ac6&secret=0a1c576a369b58876754b465f792f43a&js_code=' + code + '&grant_type=authorization_code',
                        header: {
                            'content-type': 'application/json'
                        },
                        success: function (res) {
                            openid = res.data.openid //返回openid
                            app.globalData.openid = openid
                            that.setData({
                                openid: openid,
                            });
                            let params = {
                                s: "App.Table.CheckCreate", // 必须，待请求的接口服务名称
                                model_name: "tea_user",
                                check_field: "user_identify",
                                //Jason格式传入的写法
                                data: "{\"user_nickname\": \"" + e.detail.userInfo.nickName + "\",\"user_identify\": \"" + that.data.openid + "\"}",
                            };
                            
                            //插入登录的用户的相关信息到数据库
                            wx.request({
                                url: "https://hb9.api.yesapi.cn/?s=App.Table.CheckCreate&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&check_field=BindOpenID&data=" + '{"NickName": "' + e.detail.userInfo.nickName + '","BindOpenID":"' + that.data.openid + '"}',

                                success: function (res) {
                                    console.log(res);
                                    
                                    var locStg = JSON.stringify({ "NickName": e.detail.userInfo.nickName,"BindOpenID": that.data.openid });
                                    wx.setStorageSync("userInfo", locStg);
                                    if (res.data.err_code == 0) {
                                        console.log("该用户已成功注册!")
                                        
                                    } else if (res.data.error_code == 3) {
                                        console.log("该用户已存在!")
                                    }
                                },
                                fail: function (err) {
                                    console.log('error', err);
                                }
                            });
                        },
                        fail: function (err) {
                            console.log('error', err);
                        }
                    })
                }
            })

            //授权成功后，跳转进入小程序首页
            wx.switchTab({
                url: '/pages/HomePage/HomePage'
            })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }
    },
})