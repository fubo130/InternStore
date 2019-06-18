// pages/MyInfo/MyInfo.js
var p = "";
var e = "";
var a = "";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        Phone: 0,
        Email: "",
        Address: "",
        userID: "",
        tableID: -1,
        onEdit: false,
        time: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.userID!=undefined) {
            this.setData({
                userID: options.userID,
                time: 1
            })
        }
        console.log(this.data.userID);
        var that = this;
        wx.request({
            url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + options.userID + '"]]',
            success: function (res) {
                console.log(res);
                that.setData({
                    Phone: res.data.data.data.Phone,
                    Email: res.data.data.data.Email,
                    Address: res.data.data.data.Address,
                    tableID: res.data.data.data.id
                })
                console.log(that.data.Phone);
                console.log(that.data.Email);
                console.log(that.data.Address);
                console.log(that.data.tableID);
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
        if (this.data.time!=0) {
            console.log("hello");
            let uInfo = wx.getStorageSync("userInfo");
            let data = JSON.parse(uInfo);
            var that = this;
            console.log(data.BindOpenID);
            console.log("hello");
            wx.request({
                url: 'https://hb9.api.yesapi.cn/?s=App.Table.FreeFindOne&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&where=[["BindOpenID","=","' + data.BindOpenID + '"]]',
                success: function (res) {
                    console.log(res);
                    that.setData({
                        Phone: res.data.data.data.Phone,
                        Email: res.data.data.data.Email,
                        Address: res.data.data.data.Address,
                        tableID: res.data.data.data.id
                    })
                    console.log(that.data.Phone);
                    console.log(that.data.Email);
                    console.log(that.data.Address);
                    console.log(that.data.tableID);
                }
            })
        }
       
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

    bindPInput: function (e) {
        this.setData({
            Phone: e.detail.value,
        })
    },

    bindEInput: function (e) {
        this.setData({
            Email: e.detail.value,
        })
    },

    bindAInput: function (e) {
        this.setData({
            Address: e.detail.value,
        })
    },

    formSubmit: function (res) {
        console.log(res.detail.value.Phone);
        if (!/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(res.detail.value.Phone)) {
            wx.showToast({
                title: '手机号码不正确',
                icon: 'none',
                duration: 1500
            })
            console.log("Not Valid Phone Number!!!");
        }
        else {
            var info = res.detail.value;
            var tmp = JSON.stringify(info);

            //存线上
            var that = this;
            wx.request({
                url: 'https://hb9.api.yesapi.cn/?s=App.Table.Update&model_name=Store_Users&app_key=74928B74E87AC199A83A17EEDB749F0A&id=' + this.data.tableID + '&data=' + '{"Phone":"' + this.data.Phone + '","Address":"' + this.data.Address + '","Email":"' + this.data.Email+'"}',
                success: function (wxRes) {
                    // TODO：实现你的梦想……
                    let res = wxRes.data
                    console.log("success!!!!")
                    if (res.data && res.data.err_code == 0) {
                        // TODO：请求成功
                        console.log('ok: ', res.data)
                        wx.switchTab({
                            url: '../User/User',
                        })
                        wx.showToast({
                            title: '信息添加成功',
                            icon: 'none',
                            duration: 1500
                        })
                    } 

                    else {
                        // TODO：当前操作失败
                        console.log('fail: ', res)
                    }
                }
            })
        }
    },

    formReset: function () {
    },

    bindPInput: function (e) {
        this.setData({
            Phone: e.detail.value,
        })
    },

    bindEInput: function (e) {
        this.setData({
            Email: e.detail.value,
        })
    },

    bindAInput: function (e) {
        this.setData({
            Address: e.detail.value,
        })
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
    }
})
