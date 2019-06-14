const app = getApp()

Page({
    data: {},
    onPostClick: function () {
        wx.navigateTo({
            url: '../../../pages/HomePage/HomePage',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    }
})
