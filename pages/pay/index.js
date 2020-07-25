// pages/cart/index.js

//实现微信支付
 //1那些人那些账号可以进行微信支付
  //1 企业账号
    //2 企业账号的小程序后台中 必须给开发者添加上白名单
  //1个appid可以同时绑定多个开发者
    //开发者公用该appid 共用开发权限
import {getsetting,opensetting,chooseAddress,requestPayment} from "../../utiles/index"
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
address:null,
cart:[],
allnum:0,
allprice:0
  },
  //获取用户收获地址前应该判断用户有没有对获取地址操作授权，用户授权之后在进行获取地址才做，如果没有授权则提醒用户进行授权操作
  //收获地址触发的事件
  async handleaddress(){
    //该函数查看小程序已经询问过用户的授权信息
    // wx.getSetting({
    //   withSubscriptions: true,
    //   success:(res)=>{
    //     const addressall=res.authSetting["scope.address"];
    //     //用户已经授权或者还没有进行过询问操作
    //     if(addressall==true||addressall===undefined)
    //     {
    //       wx.chooseAddress({
    //         success (res) {
    //          console.log(res)
    //         }
    //       })
    //     }
    //     //用户没有授权时,转到授权页面
    //     else{
    //       //该函数跳转到设置权限页面，只会显示小程序已经向用户请求过的权限，所以获取用的某些信息 比如收获信息，用户信息时，需要先判断用户有没有授权，授权了就进行获取，没有就进行设置权限操作
    //      wx.openSetting({
    //        withSubscriptions: true,
    //        success:()=>{
    //         wx.chooseAddress({
    //           success (res) {
    //            console.log(res)
    //           }
    //         })
    //        }
    //      })
    //     }
    //   }
    // })
    //这下面的函数已经进行封装
try {
  const res1 = await getsetting()
  const scopeaddress=res1.authSetting["scope.address"]
  if(scopeaddress===true||scopeaddress===undefined)
  {
    const address= await chooseAddress()
    wx.setStorageSync('address', address)
  }
  else{
    const res3 = await opensetting()
    console.log(res3);
  }  
} catch (error) {
  console.log(error);
}
  },
  //点击支付功能
  async handpay(){
    //判断有没有token 身份令牌唯一识别
    const token=wx.getStorageSync('token')
    if(!token)
    {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return ;
    }
    //创建订单
    const header={Authorization:token};
    const order_price=this.data.allprice;
    const consignee_addr=this.data.address.provinceName+this.data.address.cityName+this.data.address.countyName+this.data.address.detailInfo;
    const cart=this.data.cart;
    let goods=[];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    //准备发送请求，创建订单获取订单编号
    const orderparams={ order_price,consignee_addr,goods}
    const {order_number}=await request({url:"/my/orders/create",method:"POST",data:orderparams})
    console.log(order_number);
    //发起  预支付接口
     const {pay}=await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number:order_number}})
     //发起微信支付
    //  await requestPayment(pay);
    //  const res=await request({url:"/my/orders/chkOrder",method:"POST",header,data:{order_number:order_number}})
    //  console.log(res);

    //将已经支付的商品从缓存中删除
     let newcart=wx.getStorageSync('cart');
     newcart=newcart.filter(v=>!v.checked);
     wx.setStorageSync('cart',newcart);
     wx.navigateBack({
       delta: 1,
     })
     
     

     
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  //收获地址和购物车数据的获取
  onShow: function () {
    //获取缓存中的地址信息
    const address = wx.getStorageSync('address');
    //获取缓存中的添加到购物车的商品信息
    let cart = wx.getStorageSync('cart')||[]
    //实现购物车全选功能
    //使用every方法，该方法是一个数组方法，当每一个回调函数返回值都为true 该方法返回值为true,否则为false
    let allprice=0;
    let allnum=0;
    cart=cart.filter(v=>v.checked)
  for(let i of cart)
  {
    allprice+=i.goods_price*i.num;
    allnum+=i.num
  }
  this.setData({
   cart,
   allprice,
   allnum,
   address
 })
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

  }
})