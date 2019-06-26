// pages/Cart/Cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        UserID: 0,
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
        SNum: 0
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
            OnSelect: "../../images/cartSelect0.png",
            SNum: 0
        })
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=Cart,Amount',
            success(res) {
                console.log(res.data.data.data.Cart)
                that.setData({
                    CartItemID: res.data.data.data.Cart.split(","),
                    Amount: res.data.data.data.Amount.split(","),
                    UserID: res.data.data.data.id
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
                    var a = [];
                    for (var i = 0; i < that.data.CartItemID.length; i++) {
                        a.push("../../images/cartSelect0.png");
                    }
                    console.log(a);
                    that.setData({
                        Selected: a
                    })
                    // console.log(that.data);
                    var lst = [];
                    var tp =[];
                    // var a = [];
                    for (var i = 0; i < that.data.CartItemID.length; i++) {
                        wx.request({
                            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "=", "' + that.data.CartItemID[i] + '"]]&return_sql=true&page=1&perpage=100',
                            success(res) {
                                console.log(res);
                                lst.push(res.data.data.data);
                                var x = res.data.data.data.Price.split(",");
                                // a.push(1);
                                tp.push(x[0]);
                                console.log("x",x);
                                console.log(tp);
                            },
                            fail() { },
                            complete() {
                                that.setData({
                                    CartItem: lst,
                                    Price: tp,
                                    // Amount: a
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

        console.log(res.currentTarget.id);
        if (this.data.Amount[res.currentTarget.id]>1) {
            var tmp = this.data.Amount;
            var sum = this.data.SubTotal;
            tmp[res.currentTarget.id] = tmp[res.currentTarget.id]-1;
            sum = sum - this.data.Price[res.currentTarget.id]
            var that = this;
            wx.request({
                url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + that.data.UserID + '&data={"Amount":"' + tmp + '"}',
                success: function (e2) {
                    console.log(e2)
                },
                fail: function () {

                },
                complete: function () {
                    that.setData({
                        Amount: tmp
                    })
                    if (that.data.Selected[res.currentTarget.id] == "../../images/cartSelect1.png") {
                        that.setData({
                            SubTotal: sum
                        })
                    }
                }
            })

            

        }
        
        else if (this.data.Amount[res.currentTarget.id] == 1) {
            var that = this;
            wx.showModal({
                title: '提示',
                content: '您确定要删除这个物品么？',
                success: function (e) {
                    if (e.confirm) {
                        console.log('用户点击确定');

                        var it = [];
                        var amt = [];
                        var id = [];
                        var pc = [];
                        for (var i = 0; i < that.data.CartItem.length; i++) {
                            if (res.currentTarget.id != i) {
                                it.push(that.data.CartItem[i]);
                                amt.push(that.data.Amount[i]);
                                id.push(that.data.CartItemID[i]);
                                pc.push(that.data.Price[i]);
                            }
                            console.log(it)
                        }
                        that.setData({
                            CartItem: it,
                        })
                        wx.request({
                            url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + that.data.UserID + '&data={"Cart":"' + id + '","Amount":"'+amt+'"}',
                            success: function (e2) {
                                console.log(e2)
                            },
                            fail: function () {

                            },
                            complete: function () {
                                wx.showToast({
                                    title: '成功移除该商品',
                                })
                            }
                        })
                        
                    } else if (e.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })  
        }

    },

    inc: function(res) {
        console.log(res.currentTarget.id);
        if (this.data.Amount[res.currentTarget.id] >= 9) {
            wx.showToast({
                title: '已达最大限购数',
                image: '../../images/dislike.png'
            })
        }

        else {
            
            var tmp = this.data.Amount;
            tmp[res.currentTarget.id] = parseInt(tmp[res.currentTarget.id]) + 1;
            var x = this.data.SubTotal;
            x = x + parseInt(this.data.Price[res.currentTarget.id]);
            var that = this;
            wx.request({
                url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + that.data.UserID + '&data={"Amount":"' + tmp + '"}',
                success: function (e2) {
                    console.log(e2)
                },
                fail: function () {

                },
                complete: function () {
                    that.setData({
                        Amount: tmp,
                        
                    })
                    if (that.data.Selected[res.currentTarget.id] == "../../images/cartSelect1.png") {
                        that.setData({
                            SubTotal: x
                        })
                    }
                }
            })
        }
    },

    toItem: function(res) {
        var that = this;
        console.log("userid: "+that.data.UserID);
        var history = "";
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id","=","' + that.data.UserID + '"]]&fields=User_History',
            success: function (e) {
                console.log(e);
                history = e.data.data.data.User_History;
                if (e.data.data.data.User_History != "") {
                    history += ",";
                    history += that.data.CartItem[res.currentTarget.id].id;
                }
                else {
                    history += that.data.CartItem[res.currentTarget.id].id;
                }

                console.log(history);
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
            url: '../ItemDetail/ItemDetail?ItemID='+that.data.CartItem[res.currentTarget.id].id,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    Selected: function(res) {
        console.log(res.currentTarget)
        console.log(this.data.Price[res.currentTarget.id])
        var tmp = this.data.Selected;
        var p = this.data.SubTotal;
        var i = parseInt(this.data.Price[res.currentTarget.id])*parseInt(this.data.Amount[res.currentTarget.id]);
        console.log(i)
        var l = this.data.SNum;

        if (tmp[res.currentTarget.id] == "../../images/cartSelect0.png") {
            tmp[res.currentTarget.id] = "../../images/cartSelect1.png";
            p = p + i;
            l = l + 1;
        }

        else {
            tmp[res.currentTarget.id] = "../../images/cartSelect0.png";
            p = p - i;
            l = l - 1;
        }
        
        if (l == this.data.CartItemID.length) {
            this.setData({
                OnSelect: "../../images/cartSelect1.png"
            })
        }
        else {
            this.setData({
                OnSelect: "../../images/cartSelect0.png"
            })
        }

        this.setData({
            Selected: tmp,
            SubTotal: p,
            SNum: l,
        })

        
    },

    SelectAll: function (res) {
        console.log(res)
        console.log(this.data.SNum);
        console.log(this.data.CartItemID.length);
        var num = this.data.SNum;
        var slted = this.data.Selected;
        var tt = this.data.SubTotal;
        if (this.data.SNum != this.data.CartItemID.length) {
            console.log("未全选！");
            for (var i = 0; i < this.data.CartItemID.length; i++) {
                if (slted[i] == "../../images/cartSelect0.png") {
                    slted[i] = "../../images/cartSelect1.png";
                    tt = tt + parseInt(this.data.Price[i]);
                    num = num + 1;
                }
            }
            this.setData({
                OnSelect: "../../images/cartSelect1.png"
            })
        }
        
        else {
            console.log("已全选！");
            num = 0;
            tt = 0;
            for (var i = 0; i < this.data.CartItemID.length; i++) {
                slted[i] = "../../images/cartSelect0.png";
            }
            this.setData({
                OnSelect: "../../images/cartSelect0.png"
            })
        }

        this.setData({
            SNum: num,
            Selected: slted,
            SubTotal: tt
        })
    } 
})