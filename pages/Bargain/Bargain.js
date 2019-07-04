// pages/Bargain/Bargain.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemPrice: [],
        itemDetail: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.showLoading({
            title: '请稍后......',
        })
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["Bargain", "=", "1"]]&return_sql=true',
            success(res) {
                console.log(res);
                that.setData({
                    itemDetail: res.data.data.list
                })
            },
            complete() {
                var list = [];
                for (var i = 0; i < that.data.itemDetail.length; i++) {
                    var p = that.data.itemDetail[i].Price.split(',');
                    list.push(p[0]);
                }
                that.setData({
                    itemPrice: list
                })
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
    onShareAppMessage: function (res) {
        // console.log("id: ",id)
        var that = this;
        wx.showShareMenu({
            withShareTicket: true
        })
        console.log(res);
        console.log("id: ", that.data.itemDetail[parseInt(res.target.id)].id)
        return {
            title: that.data.itemDetail[parseInt(res.target.id)].Item_Name,
            path: '/pages/ItemDetail/ItemDetail?ItemID=' + that.data.itemDetail[parseInt(res.target.id)].id,
            imageUrl: that.data.itemDetail[parseInt(res.target.id)].Item_Img,
            success: s => {
                console.log(s)
            }
            // success: function (res) {
            //     console.log(res)
            // },
            // complete: function() {
            //     wx.showToast({
            //         title: '您已成功参与砍价',
            //     })
            // }

        }
    },
})