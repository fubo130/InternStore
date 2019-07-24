# 我的微信商城小程序  
## 1. 小程序介绍

      'amszdk商城' 是根据学习联想商城，全程由个人开发出的微信商城小程序。  
    小程序包含一般商城的所有基本功能，如授权登录，商品浏览，商品分享，
    商品收藏，商品搜索，添加优惠券，使用优惠券，添加购物车，购物车查询，
    浏览历史查询，订单查询，我的收藏查询，我的优惠券查询，订单信息修改，
    抽奖活动等功能。  
    
      由于小程序仅为学习使用，所有商品数据不一定与商品实际数据相同，所以用户
    实际操作流程仅支持到订单信息预览，并未添加实际支付功能。  
    
      部分商品照片使用网络来源，所以可能会出现照片无法加载和显示报错，并不
    影响商品预览及其他功能。
  
      由于项目会在后期实时优化及改进，所以并未提交并上线小程序，目前仅为体验版
    仅有管理员及授权游客可以通过扫描二位码进行预览

## 2.小程序PC端的安装需求

 - 2.1 微信开发者工具  
    - [开发工具链接](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)  
    
 - 2.2 微信小程序权限
   - APPID: wx4d3ef35070a63ac6
   - 开发者账号: 可联系管理员添加相关权限
   
 相关内容可于微信官方文档中查询：[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html)
 
## 3.手机微信端预览

 - 3.1 小程序二维码：  
    ![QRcode](https://raw.githubusercontent.com/fubo130/InternStore/master/screenShot/QR.jpg) 
 
 - 3.2 小程序游客权限：
    - 游客权限需联系管理员进行添加才可预览体验版小程序
    
## 4. 项目目录  
 |  readme.md  
│  app.js  
│  app.json  
│  app.wxss  
│  list.txt  
│  project.config.json  
│  sitemap.json  
│  统计代码行.xls  
│  
├─images  
│      +.png  
│      -.png  
│      123.jpg  
│      act0.png  
│      act1.png  
│      appointment.png  
│      arrow.png  
│      cart0.png  
│      cart1.png  
│      cartSelect0.png  
│      cartSelect1.png  
│      close.png  
│      config.png  
│      coupon.png  
│      cs.png  
│      department0.png  
│      department1.png  
│      dianjichoujiang.png  
│      dianjichoujiangd.png  
│      dis.png  
│      discount.png  
│      disLike.png  
│      down.png  
│      dtcoupon.png  
│      EmptyCart.png  
│      EmptyCoupon.png  
│      ft.png  
│      homepage0.png  
│      homepage1.png  
│      item.png  
│      item1.png  
│      like.png  
│      like0.png  
│      like1.png  
│      order.png  
│      processing.png  
│      search.png  
│      share.png  
│      signed.png  
│      store.png  
│      support.png  
│      trans.png  
│      trans.png  
│      up.png  
│      user0.png  
│      user1.png  
│      user_detail.png  
│      
├─pages  
│  ├─Act  
│  │      Act.js  
│  │      Act.json  
│  │      Act.wxml  
│  │      Act.wxss  
│  │        
│  ├─Bargain  
│  │      Bargain.js  
│  │      Bargain.json  
│  │      Bargain.wxml  
│  │      Bargain.wxss  
│  │        
│  ├─Cart  
│  │      Cart.js  
│  │      Cart.json  
│  │      Cart.wxml  
│  │      Cart.wxss   
│  │        
│  ├─CheckOut  
│  │      CheckOut.js  
│  │      CheckOut.json  
│  │      CheckOut.wxml  
│  │      CheckOut.wxss  
│  │      
│  ├─Coupon  
│  │      Coupon.js  
│  │      Coupon.json  
│  │      Coupon.wxml  
│  │      Coupon.wxss  
│  │        
│  ├─Department  
│  │      Department.js  
│  │      Department.json  
│  │      Department.wxml  
│  │      Department.wxss  
│  │        
│  ├─HomePage  
│  │      HomePage.js  
│  │      HomePage.json  
│  │      HomePage.wxml  
│  │      HomePage.wxss  
│  │        
│  ├─ItemDetail  
│  │      ItemDetail.js  
│  │      ItemDetail.json  
│  │      ItemDetail.wxml  
│  │      ItemDetail.wxss  
│  │        
│  ├─Login  
│  │      Login.js  
│  │      Login.json  
│  │      Login.wxml  
│  │      Login.wxss  
│  │        
│  ├─logs  
│  │      logs.js  
│  │      logs.json  
│  │      logs.wxml  
│  │      logs.wxss  
│  │        
│  ├─MyAppointment  
│  │      MyAppointment.js  
│  │      MyAppointment.json  
│  │      MyAppointment.wxml  
│  │      MyAppointment.wxss  
│  │        
│  ├─MyCoupon  
│  │      MyCoupon.js  
│  │      MyCoupon.json  
│  │      MyCoupon.wxml  
│  │      MyCoupon.wxss  
│  │        
│  ├─MyHistory  
│  │      MyHistory.js  
│  │      MyHistory.json  
│  │      MyHistory.wxml  
│  │      MyHistory.wxss  
│  │        
│  ├─MyInfo  
│  │      MyInfo.js  
│  │      MyInfo.json  
│  │      MyInfo.wxml  
│  │      MyInfo.wxss  
│  │        
│  ├─MyOrder  
│  │      MyOrder.js  
│  │      MyOrder.json  
│  │      MyOrder.wxml  
│  │      MyOrder.wxss  
│  │        
│  ├─Search  
│  │      Search.js  
│  │      Search.json  
│  │      Search.wxml  
│  │      Search.wxss  
│  │        
│  └─User  
│          User.js  
│          User.json  
│          User.wxml  
│          User.wxss  
│            
├─template  
│  └─HoverButton  
│          HoverButton.js  
│          HoverButton.wxml  
│          HoverButton.wxss  
│            
├─utils  
│  │  util.js  
│  │    
│  ├─encrypt  
│  │      md5.js  
│  │        
│  └─okayapi  
│          okayapi.js  
│            
└─wsSearchView-master  
    │  app.js  
    │  app.json  
    │  app.wxss  
    │  project.config.json  
    │  README.md  
    │    
    ├─docs  
    │      page-relation.png  
    │      weahter-weixin.jpg  
    │      wsSearchView.gif  
    │      
    ├─pages  
    │  ├─index  
    │  │      index.js  
    │  │      index.json  
    │  │      index.wxml  
    │  │      index.wxss  
    │  │        
    │  └─search  
    │          search.js  
    │          search.json  
    │          search.wxml  
    │          search.wxss  
    │            
    └─wxSearchView  
            wxSearchView.js  
            wxSearchView.wxml  
            wxSearchView.wxss  
            
## 5. 实际预览

  - 5.1 Home页面  
    + ![HomePage](https://raw.githubusercontent.com/fubo130/InternStore/master/screenShot/home.gif)  
  - 5.2 分类页面  
    + ![DepartmentPage](https://raw.githubusercontent.com/fubo130/InternStore/master/screenShot/department.gif)  
  - 5.3 活动页面  
    + ![ActPage](https://raw.githubusercontent.com/fubo130/InternStore/master/screenShot/act.gif)  
  - 5.4 购物车页面  
    + ![CartPage](https://raw.githubusercontent.com/fubo130/InternStore/master/screenShot/cart.gif)  
  - 5.5 用户页面  
    + ![CartPage](https://raw.githubusercontent.com/fubo130/InternStore/master/screenShot/user.PNG)  
  - 5.6 我的订单  
    + ![LikePage](https://raw.githubusercontent.com/fubo130/InternStore/master/screenShot/order.gif)  
  - 5.7 商品详情  
    + ![ItemDetailPage1](https://raw.githubusercontent.com/fubo130/InternStore/master/screenShot/itemDetail.gif)  
  - 5.8 结算页面  
    + ![CheckOut1](https://raw.githubusercontent.com/fubo130/InternStore/master/screenShot/checkOut.gif) 

## 6. 项目管理员

 - 6.1 管理员：付博
    - 管理员邮箱：fubo130@gmail.com
