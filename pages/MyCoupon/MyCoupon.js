// pages/MyHistory/MyHistory.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Coupons: [],
        UserCoupons: [],
        TimeS: [],
        TimeE: [],
        Price: [],
        Value: [],
        UID: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '请稍后......',
        })
        var that = this;

        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=Coupon',
            success(res) {
                console.log(res);

                if (res.data.data.data.Coupon.length != 0) {
                    that.setData({
                        UserCoupons: res.data.data.data.Coupon.split(","),
                        UID: res.data.data.data.id
                    })
                    console.log(that.data.UserCoupons)
                }
                else {
                    that.setData({
                        UserCoupons: 0,
                        UID: res.data.data.data.id
                    })
                    console.log(that.data.UserCoupons)
                }

            },
            fail() { },
            complete() {

                wx.request({
                    url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Coupons&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "NIN", [' + that.data.UserCoupons + ']]]&return_sql=true',
                    success(e) {
                        console.log(e);
                        that.setData({
                            Coupons: e.data.data.list
                        })
                    },
                    fail() { },
                    complete() {
                        console.log(that.data.Coupons);
                        var sL = [];
                        var eL = [];
                        var pL = [];
                        var vL = [];
                        for (var i = 0; i < that.data.Coupons.length; i++) {
                            var t = that.data.Coupons[i].Expiry_Date.split(",");
                            sL.push(t[0]);
                            eL.push(t[1]);
                            var p = that.data.Coupons[i].Coupon_Value.split(",");
                            pL.push(p[0]);
                            vL.push(p[1]);
                        }
                        that.setData({
                            TimeS: sL,
                            TimeE: eL,
                            Price: vL,
                            Value: pL
                        })
                    }
                })


                wx.hideLoading();
            }
        })
        // var x = [];
        // wx.request({
        //     url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_History',
        //     success(res) {
        //         console.log(res);
        //         var tmp = res.data.data.data.User_History.split(",");
        //         console.log(tmp);
        //         that.setData({
        //             History: tmp
        //         });

        //         var i = that.data.History.length
        //         for (i; i > that.data.History.length - 30; i--) {
        //             wx.request({
        //                 url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "=", "' + that.data.History[i] + '"]]&return_sql=true&page=1&perpage=100',
        //                 success(res) {
        //                     // console.log(res.data.data.data);
        //                     // if (res.data.data.data!=false) {
        //                     // console.log("LOL False!!!!");
        //                     x.push(res.data.data.data);
        //                     // }
        //                 },
        //                 fail() { },
        //                 complete() {
        //                     that.setData({
        //                         History_Item: x
        //                     })
        //                     // console.log(that.data.History_Item);
        //                 }
        //             })
        //         }
        //     },
        //     fail() { },
        //     complete() {
        //         wx.hideLoading();
        //     }
        // })
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

    gotoItem: function (res) {
        //     console.log(res)

        //     let uInfo = wx.getStorageSync("userInfo");
        //     let data = JSON.parse(uInfo);
        //     var history = "";
        //     wx.request({
        //         url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_History',
        //         success: function (e) {
        //             console.log(e);
        //             history = e.data.data.data.User_History;
        //             if (e.data.data.data.User_History != "") {
        //                 history += ",";
        //                 history += res.currentTarget.id;
        //             }
        //             else {
        //                 history += res.currentTarget.id;
        //             }

        //             console.log(history);
        //             wx.request({
        //                 url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + e.data.data.data.id + '&data={"User_History":"' + history + '"}',
        //                 success: function (e2) {
        //                     console.log("足迹更新：", e2)
        //                 },
        //                 fail: function () {

        //                 },
        //                 complete: function () {

        //                 }
        //             })
        //         },
        //         fail: function (e) {

        //         },
        //         complete: function () {
        //         }
        //     })

        //     wx.navigateTo({
        //         url: '../ItemDetail/ItemDetail?ItemID=' + res.currentTarget.id,
        //         success: function (res) { },
        //         fail: function (res) { },
        //         complete: function (res) { },
        //     })
        // }
    },
    addCoupon: function (res) {
        console.log(res.currentTarget.id)
        var newTem = [];
        for (var i = 0; i < this.data.UserCoupons.length; i++) {
            newTem.push(this.data.UserCoupons[i]);
        }
        newTem.push(this.data.Coupons[res.currentTarget.id].id);
        var that = this;
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + that.data.UID + '&data={"Coupon":"' + newTem + '"}',
            success(res) {
                console.log(res);
            },
            fail() { },
            complete() {
                wx.showToast({
                    title: '成功领券',
                    duration: 1500
                })
                that.onLoad();
            }
        })
    }
})