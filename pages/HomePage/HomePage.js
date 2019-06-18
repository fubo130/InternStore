//index.js
//获取应用实例

const app = getApp()

Page({
    data: {
        isAuthorized: false,
        item: {},
        imgData: ["https://github.com/fubo130/InternStore/blob/master/images/act_0.png?raw=true", "https://github.com/fubo130/InternStore/blob/master/images/act_1.png?raw=true",
            "http://cdn7.okayapi.com/74928B74E87AC199A83A17EEDB749F0A_20190618100208_142c6ca21df547bfebb69c0cd4a4b242.png"],
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
            }
        })
    }
})
