// pages/order/index.js
import { request } from '../../request/index.js'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tables: [{ id: 0, value: "全部", isActive: true }, { id: 1, value: "待付款", isActive: false }, { id: 2, value: "待发货", isActive: false },{ id: 3, value: "退款/退货", isActive: false }],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async getorders(type){
    const res=await request({url:"/my/orders/all",data:{type}})
    console.log(res);
    this.setData({
      //将获取到的事件戳  转化为一个新的已经格式化的时间，并且添加到对象中返回
      orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleDateString())}))    })
  },
  handchange(e){
    const index = e.detail;
    this.setData({
        index
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
    const token =wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return ;
    }
    //获取小程序的页面栈 是一个数组  
  const page=getCurrentPages();
  // 当前页面是在页面站中索引最大的哪一个
   const current=page[page.length-1];
  console.log(current);
  //拿到页面参数
  const {type}=current.options;
  this.getorders(type)
  let index= Number(type-1);
  this.setData({
    index
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