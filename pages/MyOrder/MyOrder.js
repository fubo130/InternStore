// pages/MyOrder/MyOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderItems: [],
        itemPrice: [],
        itemStatus: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);

        var l;
        wx.showLoading({
            title: '请稍后......',
        })
        var st = [];
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=Orders,Order_Status',
            success(res) {
                console.log(res);
                l = res.data.data.data.Orders.split(",");
                console.log(l);
                st = res.data.data.data.Order_Status.split(",");
                that.setData({
                    itemStatus: st
                })
            },
            fail() { },
            complete() {
                var lst = [];
                var tp = [];
                
                for (var i = 0; i < l.length; i++) {
                    wx.request({
                        url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "=", "' + l[i] + '"]]',
                        success(res) {
                            console.log(res);
                            lst.push(res.data.data.data);
                            // st.push(res.data.data.data.Orders)
                            var x = res.data.data.data.Price.split(",");
                            // a.push(1);
                            tp.push(x[0]);
                            console.log("lst: ", lst);
                        },
                        fail() { },
                        complete() {
                            that.setData({
                                orderItems: lst,
                                itemPrice: tp,
                                // Amount: a
                            })
                            console.log("CartItem: ", that.data.orderItems)
                            console.log("Price: ", that.data.itemPrice)
                            wx.hideLoading();
                        }
                    })
                }


                that.setData({
                    orders: l,

                })
                /*
                wx.setTabBarBadge({
                    index: 3,
                    text: l.length + ''
                })*/
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

    }
})