let app = getApp();

Page({
    data: {
        ItemID: "",
        ItemPrice: [],
        ItemCategory: {},
        ItemName: "",
        ItemImage: "",
        DetailImg: [],
        ImgNum: 6,
        ShowPrice: "",
        ShowDesc: "",
        DescDetail: "",
        like_btn: "../../images/like1.png",
        DesSelect: 1
    },

    onLoad: function (options) {
        wx.showLoading({
            title: '请稍后......',
        })
        console.log(options);
        var that = this;
        that.setData({
            ItemID: options.ItemID
        })
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "=", "+'+options.ItemID+'"]]&return_sql=true',
            success:function(res) {
                console.log(res);
                that.setData({
                    ItemPrice: res.data.data.list[0].Price,
                    ItemName: res.data.data.list[0].Item_Name,
                    ItemCategory: res.data.data.list[0].Item_Category,
                    Item_Image: res.data.data.list[0].Item_Img,
                    ShowDesc: res.data.data.list[0].Item_Desc,
                    DescDetail: res.data.data.list[0].Desc_detail
                })
                that.setData({
                    ShowPrice: that.data.ItemPrice.replace(",", "~")
                })
                 var i = 0;
                 var tmp = [];
                 tmp = res.data.data.list[0].Detail_Imgs.split(',');
                 that.setData({
                     DetailImg: tmp
                 })
                console.log(that.data.ItemName + "\nPrice: " + that.data.ItemPrice + "\nCategory: " + that.data.ItemCategory)
            },
            complete:function() {
                wx.hideLoading();
            }
        })
    },

    onReady: function () {

    },

    onShow: function () {

    },

    onHide: function () {

    },

    onUnload: function () {

    },
    switchLike: function() {
        var that = this;
        //收藏
        if (that.data.like_btn == "../../images/like1.png") {
            wx.showToast({
                title: '您已成功收藏',
                duration: 1500,
                image: '../../images/like.png'
            })
            /*
            wx.showLoading({
                title: '请稍后......',
            })
            let uInfo = wx.getStorageSync("userInfo");
            let data = JSON.parse(uInfo);
            wx.request({
                url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_Appointment',
                success: function (e) {
                    console.log(e);
                    var appointment = [];
                    if (e.data.data.data.User_Appointment != "") {
                        console.log("有")
                        appointment += ",";
                        appointment += that.data.ItemID;
                    }   
                    else {
                        console.log("空")
                        appointment += that.data.ItemID;
                    }
                    console.log(appointment)
                    var uID = e.data.data.data.id 
                    wx.request({
                        url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + uID + '&data={"User_Appointment":"' + appointment + '"}',
                        success: function () {
                            console.log("收藏更新")
                        },
                        complete:function() {
                            that.setData({
                                like_btn: "../../images/like0.png"
                            })
                            wx.hideLoading();
                        }
                    })
                }
            })*/
            that.setData({
                like_btn: "../../images/like0.png"
            })
        }

        //取消
        else {
            wx.showToast({
                title: '您已取消收藏',
                duration: 1500,
                image: '../../images/disLike.png'
            })
            /*
            wx.showLoading({
                title: '请稍后......',
            })
            let uInfo = wx.getStorageSync("userInfo");
            let data = JSON.parse(uInfo);
            wx.request({
                url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_Appointment',
                success: function (e) {
                    console.log(e);
                    var appointment = [];
                    var i = 0;
                    appointment = e.data.data.data.User_Appointment.split(",");
                    console.log(appointment)
                    for (i = 0; i < appointment.length; i++) {
                        if (appointment[i] = ItemID) {
                            console.log("find");
                        }
                    }
                    console.log(appointment)
                    var uID = e.data.data.data.id
                    wx.request({
                        url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + uID + '&data={"User_Appointment":"' + appointment + '"}',
                        success: function () {
                            console.log("收藏更新")
                        },
                        complete: function () {
                            that.setData({
                                like_btn: "../../images/like0.png"
                            })
                            wx.hideLoading();
                        }
                    })
                }
            })*/
            that.setData({
                like_btn: "../../images/like1.png"
            })
        }
    },

    desSelt1: function () {
        this.setData({
            DesSelect: 1
        })
    },

    desSelt2: function() {
        this.setData({
            DesSelect: 2
        })
    },
    previewImg: function(e) {
        var index = e.currentTarget.dataset.id;
        console.log(e)
        wx.previewImage({
            current: this.data.DetailImg[index],     //当前图片地址
            urls: this.data.DetailImg,               //所有要预览的图片的地址集合 数组形式
            success: function (e) { },
            fail: function (e) { },
            complete: function (e) { },
        })
    }

})