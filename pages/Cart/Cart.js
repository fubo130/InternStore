// pages/Cart/Cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CartItem: [],
        CartItemID: [],
        Selected: [],
        SubTotal: 0,
        IsEmpty: true,
        OnSelect: "../../images/cartSelect0.png",
        /**
         * 这项是要modif的
         */
        Price: [],
        Amount: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
        wx.showLoading({
            title: '请稍后......',
        })
        that.setData({
            OnSelect: "../../images/cartSelect0.png"
        })
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=Cart',
            success(res) {
                console.log(res)
                that.setData({
                    CartItemID: res.data.data.data.Cart.split(",")
                })
                 console.log(that.data.CartItemID);
                if (that.data.CartItemID[0] == -1) {
                    that.setData({
                        SubTotal: 0,
                        IsEmpty: true
                    })
                }
                else {
                    that.setData({
                        SubTotal: 0,
                        IsEmpty: false
                    })
                    // console.log(that.data);
                    var lst = [];
                    var tp =[];
                    var a = [];
                    for (var i = 0; i < that.data.CartItemID.length; i++) {
                        wx.request({
                            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "=", "' + that.data.CartItemID[i] + '"]]&return_sql=true&page=1&perpage=100',
                            success(res) {
                                console.log(res);
                                lst.push(res.data.data.data);
                                var x = res.data.data.data.Price.split(",");
                                a.push(1);
                                tp.push(x[0]);
                                console.log("x",x);
                                console.log(tp);
                            },
                            fail() { },
                            complete() {
                                that.setData({
                                    CartItem: lst,
                                    Price: tp,
                                    Amount: a
                                })
                                console.log("CartItem: " + that.data.CartItem[0].Item_Img)
                                console.log("Price: " + that.data.Price)
                                console.log("Amount: " + that.data.Amount)
                            }
                        })
                        
                    }
                    
                }
            },
            fail() {},
            complete() {
                wx.hideLoading();
            }
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

    dec:function(res) {
    //     // console.log(res.currentTarget.id);
    //     var tmp;
    //     var ls;
    //     tmp = this.data.Amount[res.currentTarget.id];
    //     console.log(tmp);
    //     // if (tmp>0) {
    //         tmp = tmp-1;
    //         for (var i = 0; i < this.data.Amount.length; i++) {
    //             ls[i] = this.data.Amount[i]
    //         // }
    //         ls[res.currentTarget.id] = tmp;
    //         console.log("ls: "+ls);
    //         this.setData({
    //             Amount: ls
    //         })
    //     }
    //     console.log(this.data.Amount);
    },
    Selected: function() {
        if (this.data.OnSelect == "../../images/cartSelect0.png") {
            this.setData({
                OnSelect: "../../images/cartSelect1.png"
            })
        }

        else {
            this.setData({
                OnSelect: "../../images/cartSelect0.png"
            })
        }
    }
})