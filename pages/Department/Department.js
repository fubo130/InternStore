// pages/Department/Department.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lSelect: 1,
        list: [],
        nm: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        wx.showLoading({
            title: '请等待......',
        })

        let that = this;
        this.setData({
            lSelect: 1
        })
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", ">", "0"]]&return_sql=true&page=1&perpage=100',
            success: function (res) {
                console.log(res);
                console.log(res.data.data.list.length)
                var i = 0;
                that.setData({
                    list: res.data.data.list
                })
                console.log(that.data.list);

                var ln = [];
                var i = 0;
                for (i = 0; i < res.data.data.list.length; i++) {
                    ln.push(res.data.data.list[i].Item_Name);
                }
                console.log(ln);
                that.setData({
                    nm: ln
                })
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
    clickL1:function() {
        this.setData({
            lSelect: 1
        })
    },
    clickL2: function () {
        this.setData({
            lSelect: 2
        })
    },
    clickL3: function () {
        this.setData({
            lSelect: 3
        })
    },
    clickL4: function () {
        this.setData({
            lSelect: 4
        })
    },
    clickL5: function () {
        this.setData({
            lSelect: 5
        })
    },
    clickL6: function () {
        this.setData({
            lSelect: 6
        })
    },
    clickL7: function () {
        this.setData({
            lSelect: 7
        })
    },
    clickR1: function(res) {
        //通过id关联物品
        console.log(res.currentTarget.id);
        var history = "";
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
        console.log("用户点击：",data);
        wx.showLoading({
            title: '请等待......',
        })
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_History',
            success:function(e) {
                console.log(e);
                history = e.data.data.data.User_History; 
                if (e.data.data.data.User_History != "") {
                    history += ",";
                    history += res.currentTarget.id;
                }   
                else {
                    history += res.currentTarget.id;
                }
                
                console.log("用户足迹：",history);
                wx.request({
                    url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + e.data.data.data.id + '&data={"User_History":"'+history+'"}',
                    success: function (e2) {
                        console.log("足迹更新：",e2)
                    },
                    fail:function() {

                    },
                    complete:function() {

                    }
                })
            },
            fail:function(e) {

            },
            complete: function() {

            }
        })
        wx.navigateTo({
            url: '../ItemDetail/ItemDetail?ItemID='+res.currentTarget.id,
            complete:function() {
                wx.hideLoading();
            }
        })
    }
})