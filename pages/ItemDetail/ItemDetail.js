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
        DesSelect: 1,
    },

    onLoad: function (options) {
        var that = this;
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
        wx.showLoading({
            title: '请稍后......',
        })

        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_Appointment',
            success(res) {
                console.log(res);
                var tmp = res.data.data.data.User_Appointment.split(',');
                console.log(tmp);
                if (tmp.indexOf(that.data.ItemID)==-1) {
                    that.setData({
                        like_btn: "../../images/like1.png"
                    })
                }

                else {
                    that.setData({
                        like_btn: "../../images/like0.png"
                    })
                }
            },
            fail() {},
            complete(){}
        })


        console.log(options);
        
        that.setData({
            ItemID: options.ItemID
        })
        var m = [];
        var sg = "";
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "=", "+'+options.ItemID+'"]]&return_sql=true',
            success:function(res) {
                m = res.data.data.list[0].Price;
                console.log("m: ", m)
                for (var i = 0; i < m.length && m[i]!=","; i++) {
                    sg=sg+m[i];
                }
                console.log(sg);

                //sg = m[0];
                // for (var index = 0; index < m.length; index++) {
                //     var tmp = m.split(",");
                //     console.log(tmp);
                //     sg.push(tmp[0]);
                // }
                console.log(sg);
                that.setData({
                    ItemPrice: sg,
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
                // console.log(that.data.ItemName + "\nPrice: " + that.data.ItemPrice + "\nCategory: " + that.data.ItemCategory)
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
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
        // console.log(data.BindOpenID)
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=User_Appointment',
            success(res) {
                console.log(res);
                var tmp = res.data.data.data.User_Appointment.split(',');
                //delete tmp[tmp.indexOf(undefined)];
                
                console.log(tmp);
                if (tmp[0] == ",") {
                    tmp.splice(0,1,",");
                }
                if (tmp.indexOf(that.data.ItemID) == -1) {
                    tmp.push(that.data.ItemID);
                    console.log("不存在（添加）："+tmp);
                    wx.showToast({
                        title: '您已成功收藏',
                        image: '../../images/like.png',
                        duration: 2000
                    })
                }
                else {
                    tmp.splice(tmp.indexOf(that.data.ItemID), 1, that.data.ItemID);
                    delete tmp[tmp.indexOf(that.data.ItemID)];
                    console.log("存在（删除）：" + tmp);
                    wx.showToast({
                        title: '您已取消收藏',
                        image: '../../images/dislike.png',
                        duration: 2000
                    })
                }
                for (var i = 0; i < tmp.length; i++) {
                    if (tmp[i] == "" || tmp[i] == undefined) {
                        tmp.splice(i, 1);
                    }
                }
                wx.request({
                    url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + res.data.data.data.id + '&data={"User_Appointment":"' + tmp + '"}',
                    success(res) {
                        console.log(res);
                        if (that.data.like_btn == "../../images/like1.png") {
                            that.setData({
                                like_btn: "../../images/like0.png"
                            })
                        }

                        else {
                            that.setData({
                                like_btn: "../../images/like1.png"
                            })
                        }
                    },
                    fail() { },
                    complete() {

                    }
                })
            },
            fail() { },
            complete() {

            }
        })
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
    },
    addToCart: function() {
        console.log(this.data.ItemID);
        var idList = [];
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
        var that = this;
        var d;
        var amt;
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=Cart,Amount',
            success: function (e) {
                console.log(e);
                idList = e.data.data.data.Cart.split(",");
                d = e.data.data.data.id;
                amt = e.data.data.data.Amount.split(",");
            },
            fail(){},
            complete(){
                console.log("idList", idList)
                if (idList.indexOf(that.data.ItemID)==-1) {
                    console.log(idList);
                    idList.push(that.data.ItemID);
                    console.log(idList);
                    amt.push(1);
                    wx.request({
                        url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + d + '&data={"Cart":"' + idList + '","Amount":"' + amt + '"}',
                        success: function (e2) {
                            console.log(e2)
                        },
                        fail: function () {

                        },
                        complete: function () {
                            wx.showToast({
                                title: '成功加入购物车',
                            })
                        }
                    })
                }  
                else {
                    // 错误；
                    amt[idList.indexOf(that.data.ItemID)] = parseInt(amt[idList.indexOf(that.data.ItemID)])+1;
                    wx.request({
                        url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + d + '&data={"Amount":"' + amt + '"}',
                        success: function (e2) {
                            console.log(e2)
                        },
                        fail: function () {

                        },
                        complete: function () {
                            wx.showToast({
                                title: '成功加入购物车',
                            })
                        }
                    })
                }
            }
        })
    }
})