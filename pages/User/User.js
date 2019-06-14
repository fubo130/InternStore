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
        let that= this;
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
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

    }
})