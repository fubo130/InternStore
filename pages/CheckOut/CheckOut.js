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
            checkOutItems: countedItems
        })
        var count = 0;
        var IDList = [];
        // var ItemAMT = JSON.stringify(this.data.checkOutItems);

        for (var it in this.data.checkOutItems) {
            count += 1;
            IDList.push(it);
        }
        console.log(IDList);
        console.log(this.data.checkOutItems.id);
        
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