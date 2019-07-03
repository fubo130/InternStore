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
        SNum: 0,
        LST: []
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



        var l;
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=Cart',
            success(res) {
                console.log(res);
                l = res.data.data.data.Cart.split(",");
                console.log(l);
            },
            fail() { },
            complete() {
                wx.setTabBarBadge({
                    index: 3,
                    text: l.length + ''
                })
            }
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
                    console.log("Amount: ",that.data.Amount);
                    console.log("CartItemID: ", that.data.CartItemID);
                    
                    var lm = [];
                    wx.request({
                        url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "IN", [' + that.data.CartItemID + ']]]&return_sql=true',
                        success(res) {
                            console.log(res);
                            var tp = [];
                            for (var i = 0; i < that.data.CartItemID.length; i++) {
                                for (var j = 0; j < that.data.CartItemID.length; j++) {
                                    if (that.data.CartItemID[i]==res.data.data.list[j].id) {
                                        lm.push(res.data.data.list[j]);
                                        var nm = res.data.data.list[j].Price.split(",");
                                        tp.push(nm[0])
                                    }
                                }
                            }

                            console.log("lm: ", lm);
                            console.log("tp: ", tp);
                            that.setData({
                                CartItem: lm,
                                Price: tp,
                            })
                        }
                    })

                    /*
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
                                console.log("CartItem: ",that.data.CartItem)
                                console.log("Price: ",that.data.Price)
                                console.log("Amount: ",that.data.Amount)
                            }
                        })
                        
                    }*/
                    
                }
            },
            fail() {},
            complete() {
                wx.hideLoading();
            }
        })
        var x = [];
        this.setData({
            LST: x
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
        this.onLoad();
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
                                that.onLoad();
                            }
                        })
                        
                    } else if (e.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })  
        }
        if (that.data.Selected[res.currentTarget.id] == "../../images/cartSelect1.png") {
            var x = this.data.LST;
            console.log("dec before: ",x)
            x.splice(x.indexOf(res.currentTarget.id), 1);
            console.log("dec after: ", x)
            that.setData({
                LST: x
            })
        }
        
        
    },

    inc: function(res) {
        console.log(res.currentTarget.id);
        var lm = this.data.LST;
        if (this.data.Amount[res.currentTarget.id] >= 9) {
            wx.showToast({
                title: '已达最大限购数',
                image: '../../images/dislike.png'
            })
        }
        
        else {
            
            if (this.data.Selected[res.currentTarget.id] == "../../images/cartSelect1.png") {
                
                console.log("inc before: ", lm)
                lm.push(this.data.CartItem[res.currentTarget.id].id);
                console.log("inc after: ", lm)
            }

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
        that.setData({
            LST: lm
        })
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
        var x;
        if (tmp[res.currentTarget.id] == "../../images/cartSelect0.png") {
            x = this.data.LST;
            console.log("id: ", this.data.CartItem[res.currentTarget.id].id)
            if (this.data.Price[res.currentTarget.id]!=0) {
                for (var j = 0; j < this.data.Amount[res.currentTarget.id]; j++) {
                    x.push(this.data.CartItem[res.currentTarget.id].id)
                }
            }
            
            tmp[res.currentTarget.id] = "../../images/cartSelect1.png";
            p = p + i;
            l = l + 1;
        }

        else {
            x = this.data.LST;
            console.log("id: ", this.data.CartItem[res.currentTarget.id].id)
            if (this.data.Price[res.currentTarget.id] != 0) {
                console.log("before: ", x)
                for (var j = 0; j < this.data.Amount[res.currentTarget.id]; j++) {
                    x.splice(x.indexOf(res.currentTarget.id), 1)
                }
                
                console.log("after: ", x)
            }
            tmp[res.currentTarget.id] = "../../images/cartSelect0.png";
            p = p - i;
            l = l - 1;
        }

        this.setData({
            LST: x
        })
        
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
            var x = this.data.LST;
            console.log("未全选！");
            for (var i = 0; i < this.data.CartItemID.length; i++) {
                if (slted[i] == "../../images/cartSelect0.png") {
                    if (this.data.Price[i] != 0) {
                        for (var j = 0; j < this.data.Amount[i]; j++) {
                            x.push(this.data.CartItem[i].id)
                        }
                    }
                    slted[i] = "../../images/cartSelect1.png";
                    tt = tt + parseInt(this.data.Price[i])*this.data.Amount[i];
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
            var x = [];
            for (var i = 0; i < this.data.CartItemID.length; i++) {
                slted[i] = "../../images/cartSelect0.png";
            }
            this.setData({
                OnSelect: "../../images/cartSelect0.png",
                LST: x
            })
            
        }
        console.log("LST: ", this.data.LST)
        this.setData({
            SNum: num,
            Selected: slted,
            SubTotal: tt
        })
    },
    goCheckOut:function() {
        wx.showLoading({
            title: '请等待......',
        })
        if (this.data.LST.length != 0) {
            wx.navigateTo({
                url: '../CheckOut/CheckOut?itemlst=' + this.data.LST + ',',
                complete() {
                    wx.hideLoading();
                }
            })
        }
        else {
            wx.showToast({
                title: '未选中任何商品',
                icon: 'none',
                duration: 2000
            })
        }
    }
})