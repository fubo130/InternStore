let app = getApp();

Page({
    data: {
        ItemID: "",
        ItemPrice: [],
        ItemCategory: {},
        ItemName: ""
    },

    onLoad: function (options) {
        console.log(options);
        var that = this;
        that.setData({
            ItemID: options.ItemID
        })
    },

    onReady: function () {

    },

    onShow: function () {

    },

    onHide: function () {

    },

    onUnload: function () {

    }

})