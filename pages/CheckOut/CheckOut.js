// pages/CheckOut/CheckOut.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // itemlst: [],
        ItemID: [],
        ItemDetail: [],
        ItemAmount: [],
        ItemPrice: [],
        Subtotal: [],
        UserAddress: [],
        Phone: [],
        Name: [],
        Coupon: [],
        CouponAvl: [],
        CouponSelect: {},
        Discount: [],
        AfterPrice: 0,
        CouponValue: [],
        CouponPrice: [],
        onEdit: false,
        time: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        //信息读取
        var tmp = [];
        if (options.itemlst[0]!=',') {
            if (options.itemlst.length != 1) {
                tmp = options.itemlst.split(',');
                tmp.splice(tmp.length-1, 1);
                console.log(tmp);
            }
            else {
                tmp.push(options.itemlst);
                console.log(tmp)
            }
        }
        //统计每个商品数量
        var idLst = [];
        var cuntLst = [];
        var countedItems = tmp.reduce(function (allItems, item) {
            if (item in allItems) {
                allItems[item]++;
                cuntLst[cuntLst.length-1]++;
            }
            else {
                allItems[item] = 1;
                idLst.push(item);
                cuntLst.push(1)
            }
            return allItems;
        }, {});
        console.log("idLst: ", idLst);
        console.log("cuntLst: ", cuntLst);
        console.log(countedItems);
        this.setData({
            ItemID: idLst,
            ItemAmount: cuntLst
        })
        var that = this;
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Item&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "IN", [' + that.data.ItemID + ']]]&return_sql=true',
            success(res) {
                console.log("res: ", res.data.data.list);
                that.setData({
                    ItemDetail: res.data.data.list,
                })
                console.log(that.data.ItemDetail[0].Price)
                var pc = [];
                for (var i = 0; i < that.data.ItemDetail.length; i++) {
                    var tmp = that.data.ItemDetail[i].Price.split(',');
                    pc.push(tmp[0]);
                }
                that.setData({
                    ItemPrice: pc
                })
            },
            complete() {
                console.log("ItemID: ", that.data.ItemID);
                console.log("ItemDetail: ", that.data.ItemDetail);
                console.log("ItemPrice: ", that.data.ItemPrice);
                var st = 0;
                for (var i = 0; i < that.data.ItemDetail.length; i++) {
                    st += parseInt(that.data.ItemAmount[i]) * parseInt(that.data.ItemPrice[i])
                }
                console.log("subtotal: ",st)
                that.setData({
                    Subtotal: st
                })

                let uInfo = wx.getStorageSync("userInfo");
                let data = JSON.parse(uInfo);
                wx.request({
                    url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]&fields=Address,Phone,NickName,Coupon',
                    success(s) {
                        console.log(s);
                        if (s.data.data.data.Coupon.length != 0) {
                            that.setData({
                                UserAddress: s.data.data.data.Address,
                                Phone: s.data.data.data.Phone,
                                Name: s.data.data.data.NickName,
                                Coupon: s.data.data.data.Coupon
                            })
                        }
                        else {
                            that.setData({
                                UserAddress: s.data.data.data.Address,
                                Phone: s.data.data.data.Phone,
                                Name: s.data.data.data.NickName,
                                Coupon: "0"
                            })
                        }
                        
                    },
                    complete() {
                        console.log("获取coupon信息")
                        wx.request({
                            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeQuery&model_name=Store_Coupons&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["id", "IN", [' + that.data.Coupon + ']]]&return_sql=true',
                            success(res) {
                                console.log(res);
                                that.setData({
                                    Coupon: res.data.data.list
                                })
                            },
                            complete() {
                                var t = [];
                                console.log
                                for (var i = 0; i < that.data.Coupon.length; i++) {
                                    var lim = that.data.Coupon[i].Coupon_Value.split(',');
                                    for (var j = 0; j < that.data.ItemDetail.length; j++) {
                                        if (that.data.ItemDetail[j].Coupon_Type == that.data.Coupon[i].Coupon_Usage || that.data.Coupon[i].Coupon_Usage=="0") {
                                            if (parseInt(that.data.ItemDetail[j].Price)>=parseInt(lim[1])) {
                                                if (t.indexOf(that.data.Coupon[i]) == -1) {
                                                    t.push(that.data.Coupon[i]);
                                                }
                                            }
                                        }
                                    }  
                                }
                                console.log("t: ",t)
                                var curSlt = {};
                                var min = parseInt(that.data.Subtotal);
                                var v = [];
                                var p = [];
                                if (t.length!=0) {
                                    for (var i = 0; i < t.length; i++) {
                                        var dis = t[i].Coupon_Value.split(',');
                                        v.push(dis[0]);
                                        p.push(dis[1]);
                                        if (parseInt(that.data.Subtotal)-parseInt(dis[0]) < min) {
                                            curSlt = t[i];
                                            min = parseInt(that.data.Subtotal) - parseInt(dis[0]);
                                        }
                                    }
                                }
                                console.log(curSlt)
                                if (curSlt.Coupon_Value!=undefined) {
                                    that.setData({
                                        CouponAvl: t,
                                        CouponSelect: curSlt,
                                        Discount: curSlt.Coupon_Value.split(','),
                                        AfterPrice: min,
                                        CouponValue: v,
                                        CouponPrice: p
                                    })
                                }
                                else {
                                    that.setData({
                                        CouponAvl: t,
                                        CouponSelect: curSlt,
                                        AfterPrice: min,
                                        CouponValue: v,
                                        CouponPrice: p
                                    })
                                }
                                
                            }
                        })
                    }
                })
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
    toEdit:function() {
        let uInfo = wx.getStorageSync("userInfo");
        let data = JSON.parse(uInfo);
        wx.navigateTo({
            url: '../MyInfo/MyInfo?userID=' + data.BindOpenID,
        })
    },
    toCoupon: function () {
        wx.navigateTo({
            url: '../Coupon/Coupon',
        })
    },
    toMyCoupon: function () {
        wx.navigateTo({
            url: '../MyCoupon/MyCoupon',
        })
    },

    formSubmit: function (res) {
        console.log(res.detail.value.res);
        
    },
    powerDrawer: function (e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },
    util: function (currentStatu) {
        /* 动画部分 */
        // 第1步：创建动画实例  
        var animation = wx.createAnimation({
            duration: 200, //动画时长 
            timingFunction: "linear", //线性 
            delay: 0 //0则不延迟 
        });

        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation;

        // 第3步：执行第一组动画 
        animation.opacity(0).rotateX(-100).step();

        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function () {
            // 执行第二组动画 
            animation.opacity(1).rotateX(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
            this.setData({
                animationData: animation
            })

            //关闭 
            if (currentStatu == "close") {
                this.setData(
                    {
                        onEdit: false
                    }
                );
            }
        }.bind(this), 200)

        // 显示 
        if (currentStatu == "open") {
            this.setData(
                {
                    onEdit: true
                }
            );
        }
    }, 
    forSelect:function(res) {
        console.log(res.currentTarget);
        var dis1 = [];
        dis1 = this.data.CouponAvl[res.currentTarget.id].Coupon_Value.split(',')
        var dis2;
        this.setData({
            CouponSelect: this.data.CouponAvl[res.currentTarget.id],
            Discount: dis1
        })
        this.util("close");
    }
})