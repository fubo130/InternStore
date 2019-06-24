// pages/Search/Search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        IsEmpty: true,
        SearchName: "",
        Recomlist: [],
        Ipt: "",
        ResList: [],
        onSelect: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '请稍后......',
        })
        var that = this;

        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["Recommendation", "=", "3"]]&return_sql=true&page=1&perpage=100',
            success(res) {
                console.log(res);
                that.setData({
                    Recomlist: res.data.data.list
                })
            },
            fail() {

            },
            complete() {
                wx.hideLoading();
            }
        })
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

    bindInput: function(e) {
        console.log(e.detail.value);
        if (e.detail.value == '') {
            return;
        }
        var that = this;
        that.setData({
            Ipt: e.detail.value,
            IsEmpty: false
        })
        
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id",">",0],["Item_Name", "LIKE", "' + that.data.Ipt + '"]]&return_sql=true&page=1&perpage=100',
            success(res) {
                // console.log(that.data.Ipt+": "+res);
                console.log(res.data.data.list);
                that.setData({
                    ResList: res.data.data.list
                })
            },
            fail() {

            },
            complete() {

            }
        })
    },
    select:function(res) {
        console.log(res);
        wx.redirectTo({
            url: '../ItemDetail/ItemDetail?ItemID=' + res.currentTarget.id,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }
})