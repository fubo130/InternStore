// pages/User/User.js
import {hexMD5} from "../../utils/encrypt/md5.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userID: '',
        userNickname: '',
        userEmail: '',
        userPhone: '',
        userAddress: '',
        userExp: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        wx.showLoading({
            title: '请等待.......',
            mask: true,
        })




        let that= this;
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);


        var l;
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=Cart',
            success(res) {
                console.log(res);
                l = res.data.data.data.Cart.split(",");
                console.log(l);
            },
            fail() { },
            complete() {
                if (l[0] != "") {
                    wx.setTabBarBadge({
                        index: 3,
                        text: l.length + ''
                    })
                }
            }
        })


        console.log(data);
        if (data.BindOpenID != '' && data.BindOpenID !=undefined) {
            this.setData({
                userID: data.BindOpenID,
                userNickname: data.NickName,
            })
            
            wx.request({
                url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + this.data.userID + '"]]&fields=MemberExp',
                success: function (res) {
                    console.log(res.data.data.data.MemberExp)
                    if (res.data.data.data.MemberExp != undefined) {
                        
                        that.setData({
                            userExp: res.data.data.data.MemberExp
                        })
                    }
                },
                fail: function (err) {
                    console.log('error', err);
                },
                complete:function(){
                    wx.hideLoading();
                }
            })
        }
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    //用户信息中心（添加修改地址。。。）
    User_center: function() {
        wx.navigateTo({
            url: '../MyInfo/MyInfo?userID='+this.data.userID,
        })
    },

    //我的订单（管理查询订单）
    My_order: function() {
        wx.navigateTo({
            url: '../MyOrder/MyOrder',
        })
    },

    //我的足迹（浏览历史）
    My_history: function() {
        wx.navigateTo({
            url: '../MyHistory/MyHistory',
        })
    },

    //我的预约（或改成收藏）
    My_appointment: function() {
        wx.navigateTo({
            url: '../MyAppointment/MyAppointment',
        })
    },

    //我都优惠券（查看可使用优惠券）
    My_coupon: function() {
        wx.navigateTo({
            url: '../MyCoupon/MyCoupon',
        })
    },

    
})