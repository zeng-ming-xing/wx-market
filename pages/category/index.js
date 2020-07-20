import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightContent: [],
    //被点击的左侧菜单
    currentIndex: 0,
    //右侧滚动跳距离顶部的距离
    scrolltop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*在发送请求之前判断有没有旧的数据
      没有就旧数据就发送请求
      有旧数据同时旧数据没有过期就使用本地存储的旧的数据 */
    //获取本地存储中的数据（小程序中存在本地存储数据）
    const Cates = wx.getStorageSync("cates");
    //判断
    if (!Cates) {
      //如果没有就发送请求
      this.getCates();
    }
    //本地存储中有数据
    else {
      //判断数据是否过期，用第二次进入时的事件减去第一次进入时的事件，超过10s，过期
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates();
      }
      //没有过期就调用本地存储的数据去渲染页面
      else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  //封装好异步请求数据的方法
  async getCates() {
    /*  request({
        url: '/categories'
      })
      .then(res=>{
        this.Cates=res.data.message;
        //把接口的数据存入到本地存储中
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      })*/
    //使用es7的async和await发送异步请求
    const res = await request({ url: "/categories" });
    // this.Cates=res.data.message;
    this.Cates = res;
    //把接口的数据存入到本地存储中
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  hand(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      currentIndex: index,
      rightContent: this.Cates[index].children,
      scrolltop: 0
    })
    //重新设置右侧内容的scrotop滚动条位置为顶部

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

  }
})