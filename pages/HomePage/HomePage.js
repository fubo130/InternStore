//index.js
//获取应用实例

const app = getApp()

Page({
    data: {
        isAuthorized: false,
        item: {},
        imgData: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561515335&di=73c7477f5711c9fa00fbd385bf51c1bb&imgtype=jpg&er=1&src=http%3A%2F%2Fp1.lefile.cn%2Fproduct%2Fadminweb%2F2019%2F04%2F26%2FGVgi9oPDHppt4zxDKZ5khvQsK-7485.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560876671649&di=448d160163451330fb10d08f77623017&imgtype=0&src=http%3A%2F%2Fi2.sinaimg.cn%2FIT%2Fcr%2F2012%2F0515%2F723001344.jpg",
"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560877097149&di=00284351553ce56e26b1771288c96491&imgtype=0&src=http%3A%2F%2Fm.xianshuabao.com%2Fjs%2Fnet%2Fupload%2Fimage%2F20171231%2F6365032605118840027946028.jpg"],
        rollData: 3,
        list: []
    },

    onLoad(data) {
        var that = this;
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
            }
        })

        wx.showLoading({
            title: '请稍后......',
        })
        if (data.isAuthorized != null && data.isAuthorized != undefined) {
            this.setData({
                isAuthorized: data.isAuthorized
            })
        }
        var db_length;
        var that = this;

        //获取首页滚动图片信息
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.Query&model_name=Recommendation_items&app_key=74928B74E87AC199A83A17EEDB749F0A&select=*&return_sql=true',
            success: function (res) {
                console.log(res)
                
                let its = [];
                var i;
                for (i = 0; i < res.data.data.list.length; i++) {
                    var obj = {
                        itemData: res.data.data.list[i].ItemName,
                        imageData: res.data.data.list[i].ItemImage,
                        urlData: res.data.data.list[i].ItemURL,
                        item: res.data.data.list[i].Description
                    };
                    console.log(obj);
                    
                    its.push(obj);   
                }
                console.log(its)
                that.item = its;
                console.log(that.item);
                //that.setData({
                //   imgData: its
                //})
                //console.log(imgData);
            },
            complete() {
                wx.hideLoading();
            }
        })
    },
    goSearch:function() {
        wx.showLoading({
            title: '请等待......',
        })
        wx.navigateTo({
            url: '../Search/Search',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {wx.hideLoading()},
        })
    },
    itemDtl: function(res) {
        console.log(res);
        wx.navigateTo({
            url: '../ItemDetail/ItemDetail?ItemID=' + res.currentTarget.id,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    clickR1: function (res) {
        //通过id关联物品
        console.log(res.currentTarget.id);
        var history = "";
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
        console.log("用户点击：", data);
        wx.showLoading({
            title: '请等待......',
        })
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

                console.log("用户足迹：", history);
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
            complete: function () {
                wx.hideLoading();
            }
        })
    }
})
