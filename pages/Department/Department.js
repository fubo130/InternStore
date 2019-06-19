// pages/Department/Department.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lSelect: 1,
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            lSelect: 1
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
    }
})