// pages/MyHistory/MyHistory.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        History: [],
        History_Item: []
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
        var x = [];
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_History',
            success(res) {
                console.log(res);
                var tmp = res.data.data.data.User_History.split(",");
                console.log(tmp);
                that.setData({
                    History: tmp
                });
                
                var i = that.data.History.length
                for (i; i > that.data.History.length-30; i--) {
                    wx.request({
                        url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "=", "' + that.data.History[i] + '"]]&return_sql=true&page=1&perpage=100',
                        success(res) {
                            // console.log(res.data.data.data);
                            // if (res.data.data.data!=false) {
                                // console.log("LOL False!!!!");
                                x.push(res.data.data.data);
                            // }
                        },
                        fail() {},
                        complete() {
                            that.setData({
                                History_Item: x
                            })
                            // console.log(that.data.History_Item);
                        }
                    })
                }
            },
            fail() {},
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

    gotoItem:function(res) {
        console.log(res)

        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
        var history = "";
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_History',
            success: function (e) {
                console.log(e);
                history = e.data.data.data.User_History;
                if (e.data.data.data.User_History != "") {
                    history += ",";
                    history += res.currentTarget.id;
                }
                else {
                    history += res.currentTarget.id;
                }

                console.log(history);
                wx.request({
                    url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + e.data.data.data.id + '&data={"User_History":"' + history + '"}',
                    success: function (e2) {
                        console.log("足迹更新：", e2)
                    },
                    fail: function () {

                    },
                    complete: function () {

                    }
                })
            },
            fail: function (e) {

            },
            complete: function () {
            }
        })

        wx.navigateTo({
            url: '../ItemDetail/ItemDetail?ItemID=' + res.currentTarget.id,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    }
})