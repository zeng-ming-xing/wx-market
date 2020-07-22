// pages/cart/index.js
import {getsetting,opensetting,chooseAddress} from "../../utiles/index"
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
address:null,
cart:[],
allchecked:false,
allnum:0,
allprice:0
  },
    //当商品数量，选中状态发生变化时购物车结算数量，价格的变化的封装函数
    setcart(cart){
      let allchecked;
      if(cart.length==0)
      {
        allchecked=false
      }
      else{
    allchecked=cart.every(v=>v.checked===true)
      }
      let allprice=0;
      let allnum=0
      for(let i of cart)
      {
        if(i.checked==true)
        {
        allprice+=i.goods_price*i.num;
        allnum+=i.num}
      }
      this.setData({
       cart,
       allprice,
       allnum,
       allchecked
     })
     wx.setStorageSync('cart', cart)
    },
  //购物车商品数量减少
  reduce(e){
    const cart1= this.data.cart
    const {index}=e.currentTarget.dataset;
    if(this.data.cart[index].num==1)
    {
      cart1.splice(index,1);
      this.setcart(cart1)
    }
    else{
     cart1[index].num--;
      this.setcart(cart1)
    } 
  },
  //购物车商品数量增加
  add(e){
    const cart1= this.data.cart
    const {index}=e.currentTarget.dataset;
      cart1[index].num++
      this.setcart(cart1)
  },
  //全选操作
  allcked(){
    let {allchecked,cart}=this.data;
    allchecked=!allchecked;
    cart.forEach(v=>v.checked=allchecked)
    this.setcart(cart)
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

  //商品选中
  itemchange(e){
      const goods_id=e.currentTarget.dataset.id;
      let {cart}=this.data;    
     let index=cart.findIndex(v=>v.goods_id===goods_id);
     console.log(index);
     cart[index].checked=!cart[index].checked;
    this.setcart(cart)
  },
  //点击转到结算界面
  handpay(){
    //判断有没有收获地址
    const {address}=this.data;
     if(!address.userName)
     {
       wx.showToast({
         title: '您还没有添加地址',
       })
       return ;
     }
      if(this.data.allnum===0){
        wx.showToast({
          title: '您还没有选购商品',
          icon:"none"
          
        })
        return ;
      }
      wx.navigateTo({
        url: '/pages/pay/index',
        success:()=>{},
        fail:()=>{},
        complete:()=>{}

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
    const cart = wx.getStorageSync('cart')||[]
    //实现购物车全选功能
    //使用every方法，该方法是一个数组方法，当每一个回调函数返回值都为true 该方法返回值为true,否则为false
    let allchecked=true;
    if(cart.length==0)
    {
      allchecked=false
    }
    else{
  allchecked=cart.every(v=>v.checked===true)
    }
    let allprice=0;
    let allnum=0
    for(let i of cart)
    {
      if(i.checked==true)
      {
      allprice+=i.goods_price*i.num;
      allnum+=i.num}
    }
  this.setData({
    address,
    cart,
    allchecked,
    allprice,
    allnum
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