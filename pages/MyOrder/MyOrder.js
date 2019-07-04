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
        itemStatus: [],
        tmp: {}
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
                var m = [];
                // console.log(res);
                l = res.data.data.data.Orders.split(",");
                // console.log(l);
                st = res.data.data.data.Order_Status.split(",");
                let glo=[];
                var v = [];
                for (var i = 0; i < l.length; i++) {
                    m.push(parseInt(l[i]));
                    // glo.push(i,parseInt(l[i]))
                    v.push(i);
                }
                
                console.log("st", st);
                glo = {v, m};
                
                that.setData({
                    itList: m,
                    itemStatus: st,
                    userID: res.data.data.data.id,
                    tmp: glo
                })
                console.log("Item list: ", that.data.itList);
            },
            fail() { },
            complete() {
                var lst = [];
                var tp = [];
                if (that.data.itList[0] != NaN) {
                wx.request({
                    url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "IN", [' + that.data.itList + ']]]&return_sql=true',
                    success(res) {
                        console.log(res);
                            if (res.data.data.msg == "") {
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
                        
                    },
                    fail() {},
                    complete() {
                        wx.hideLoading();
                    }
                })

                that.setData({
                    orders: l,
                })
                }
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

    delateItem: function(res) {
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
                    var orderSt = [];
                    for (var i = 0; i < that.data.orderItems.length; i++) {
                        if (res.currentTarget.id != i) {
                            orderID.push(that.data.orderItems[i].id);
                            orderSt.push(that.data.itemStatus[i]);
                        }
                        // console.log("OrderID: ", orderID);
                        // console.log("OrderSt: ", orderSt);
                    }
                    that.setData({
                        orderItems: orderID,
                        itemStatus: orderSt
                    })
                    wx.request({
                        url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + that.data.userID + '&data={"Orders":"' + that.data.orderItems + '","Order_Status":"' + that.data.itemStatus + '"}',
                        success: function (e2) {
                            // console.log(e2)
                        },
                        fail: function () {

                        },
                        complete: function () {
                            wx.showToast({
                                title: '成功移除订单',
                            })
                            that.onLoad();
                        }
                    })

                } else if (e.cancel) {
                    console.log('用户点击取消')
                }
            }
        })  
    }
})