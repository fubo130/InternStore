// pages/MyOrder/MyOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userID: "",
        itList: [],
        orderItems: [],
        itemPrice: [],
        tmp: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);

        var l = [];
        wx.showLoading({
            title: '请稍后......',
        })
        var st = [];
        var m = [];
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_Appointment',
            success(res) {
                console.log(res.data.data.data.User_Appointment);
                l = res.data.data.data.User_Appointment.split(",");
                let glo = [];
                var v = [];
                console.log(l);

                
                for (var i = 0; i < l.length; i++) {
                    m.push(parseInt(l[i]));
                    v.push(i);
                }
                glo = { v, m };
                console.log(glo);

                that.setData({
                    itList: m,
                    // itemStatus: st,
                    userID: res.data.data.data.id,
                    tmp: glo
                })
                console.log("Item list: ", that.data.itList);
            },
            fail() { },
            complete() {
                var lst = [];
                var tp = [];
                wx.request({

                    url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "IN", [' + that.data.itList + ']]]&return_sql=true',
                    success(res) {
                        console.log(res);
                        if (res.data.data.err_msg == "") {
                            for (var i = 0; i < that.data.itList.length; i++) {
                                console.log("id: ", res.data.data.list[i].id);
                                console.log("glo: ", that.data.tmp.m[i]);
                                for (var j = 0; j < that.data.itList.length; j++) {
                                    if (res.data.data.list[i].id == that.data.tmp.m[j]) {
                                        console.log("发现一样: ", j)
                                        lst[j] = res.data.data.list[i];
                                    }
                                }
                            }
                            console.log(lst);
                            that.setData({
                                orderItems: lst
                            })

                            var p;
                            var pl = [];
                            for (var i = 0; i < that.data.orderItems.length; i++) {
                                p = that.data.orderItems[i].Price.split(",");
                                pl.push(p[0]);

                            }
                            that.setData({
                                itemPrice: pl
                            })
                        }
                        

                    },
                    fail() { },
                    complete() {
                        wx.hideLoading();
                    }
                })

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

    },

    delateItem: function (res) {
        var that = this;
        // console.log(res)

        wx.showModal({
            title: '提示',
            content: '您确定要删除这个物品么？',
            success: function (e) {
                let uInfo = wx.getStorageSync("userInfo");
                let data = JSON.parse(uInfo);

                if (e.confirm) {
                    // console.log('用户点击确定');

                    var orderID = [];
                    for (var i = 0; i < that.data.orderItems.length; i++) {
                        if (res.currentTarget.id != i) {
                            orderID.push(that.data.orderItems[i].id);
                        }
                        // console.log("OrderID: ", orderID);
                        // console.log("OrderSt: ", orderSt);
                    }
                    that.setData({
                        orderItems: orderID
                    })
                    wx.request({
                        url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + that.data.userID + '&data={"User_Appointment":"' + that.data.orderItems + '"}',
                        success: function (e2) {
                            // console.log(e2)
                        },
                        fail: function () {

                        },
                        complete: function () {
                            wx.showToast({
                                title: '成功移除收藏',
                            })
                            that.onLoad();
                        }
                    })

                } else if (e.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    toItem:function(res) {
        console.log(res.currentTarget.id)
        var that = this;
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id","=","' + that.data.userID + '"]]&fields=User_History',
            success: function (e) {
                console.log(e);
                history = e.data.data.data.User_History;
                if (e.data.data.data.User_History != "") {
                    history += ",";
                    history += that.data.orderItems[res.currentTarget.id].id;
                }
                else {
                    history += that.data.orderItems[res.currentTarget.id].id;
                }

                console.log(history);
                wx.request({
                    url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + e.data.data.data.id + '&data={"User_History":"' + history + '"}',
                    success: function (e2) {
                        console.log("足迹更新：", e2)
                    },
                    fail: function () {},
                    complete: function () {}
                })
            },
            fail: function (e) {},
            complete: function () {}
        })
        wx.navigateTo({
            url: '../ItemDetail/ItemDetail?ItemID=' + that.data.orderItems[res.currentTarget.id].id,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { }
        })
    }
})