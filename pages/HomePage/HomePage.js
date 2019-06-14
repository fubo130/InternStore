//index.js
//获取应用实例

const app = getApp()

Page({
    data: {
        isAuthorized: false,
        item: {},
        imageData: ["../../images/act_0.png", "../../images/act_1.png", "../../images/act_3.png"],
        rollData: 3
    },

    onLoad(data) {
        if (data.isAuthorized != null && data.isAuthorized != undefined) {
            this.setData({
                isAuthorized: data.isAuthorized
            })
        }
        var db_length;
        var that = this;
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
                console.log(that.item)
                /*
                that.setData({
                    item: its
                })*/
            }
        })
        /*
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.Count&model_name=Recommendation_items&app_key=74928B74E87AC199A83A17EEDB749F0A',
            success: function (res) {
                console.log(res);
                let db_length = res.data.data.total;
                console.log(db_length)
            }
        })
        let i = 1;
        while (i < db_length) {
            wx.request({
                url: 'https://hb9.api.yesapi.cn/?s=App.Table.Get&model_name=Recommendation_items&app_key=74928B74E87AC199A83A17EEDB749F0A&id='+i,
                success: function (res) {
                    console.log(res);
                    itemData.push(res.data.data.ItemName);
                }
            })
            i = i+1;
        }

        this.setData({
            item: {"itemData": itemData, "imageData": imageData}
        })      */
    }

})
