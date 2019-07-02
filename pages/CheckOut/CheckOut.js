// pages/CheckOut/CheckOut.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // itemlst: [],
        ItemID: [],
        ItemDetail: [],
        ItemAmount: [],
        ItemPrice: [],
        Subtotal: [],
        UserAddress: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //信息读取
        var tmp = [];
        if (options.itemlst[0]!=',') {
            if (options.itemlst.length != 1) {
                tmp = options.itemlst.split(',');
                tmp.splice(tmp.length-1, 1);
                console.log(tmp);
            }
            else {
                tmp.push(options.itemlst);
                console.log(tmp)
            }
        }
        //统计每个商品数量
        var idLst = [];
        var cuntLst = [];
        var countedItems = tmp.reduce(function (allItems, item) {
            if (item in allItems) {
                allItems[item]++;
                cuntLst[cuntLst.length-1]++;
            }
            else {
                allItems[item] = 1;
                idLst.push(item);
                cuntLst.push(1)
            }
            return allItems;
        }, {});
        console.log("idLst: ", idLst);
        console.log("cuntLst: ", cuntLst);
        console.log(countedItems);
        this.setData({
            ItemID: idLst,
            ItemAmount: cuntLst
        })
        var that = this;
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "IN", [' + that.data.ItemID + ']]]&return_sql=true',
            success(res) {
                console.log("res: ", res.data.data.list);
                that.setData({
                    ItemDetail: res.data.data.list,
                })
                console.log(that.data.ItemDetail[0].Price)
                var pc = [];
                for (var i = 0; i < that.data.ItemDetail.length; i++) {
                    var tmp = that.data.ItemDetail[i].Price.split(',');
                    pc.push(tmp[0]);
                }
                that.setData({
                    ItemPrice: pc
                })
            },
            complete() {
                console.log("ItemID: ", that.data.ItemID);
                console.log("ItemDetail: ", that.data.ItemDetail);
                console.log("ItemPrice: ", that.data.ItemPrice);
                var st = 0;
                for (var i = 0; i < that.data.ItemDetail.length; i++) {
                    st += parseInt(that.data.ItemAmount[i]) * parseInt(that.data.ItemPrice[i])
                }
                console.log("subtotal: ",st)
                that.setData({
                    Subtotal: st
                })

                let uInfo = wx.getStorageSync("userInfo");
                let data = JSON.parse(uInfo);
                wx.request({
                    url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=Address',
                    success(s) {
                        console.log(s);
                        that.setData({
                            UserAddress: s.data.data.data.Address
                        })
                    }
                })
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