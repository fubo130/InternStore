//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        isAuthorized: false
    },

    onLoad(data) {
        if (data.isAuthorized != null && data.isAuthorized != undefined) {
            this.setData({
                isAuthorized: data.isAuthorized
            })
        }
    }

})
