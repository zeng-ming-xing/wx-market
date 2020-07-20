//引入用来发送请求的方法，      发送异步请求获取轮播图数据  优化的手段可以通过es6的promise解决这个问题
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //定义一个数组接收从服务器返回的轮播图数据
    swiperList:[],
     //定义一个数组接收从服务器返回的分类导航数据
    catesList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送异步请求获取轮播图数据
 /*   wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success:(result)=>{
        this.setData({
          swiperList:result.data.message
        })
      }
    })*/
    /*request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })*/
this.getswiperList(),
this.getCateList(),
this.getFloorList()
  },
//获取轮播图数据的方法
getswiperList(){
  request({ url: '/home/swiperdata'})
    .then(result=>{
      this.setData({
        swiperList:result
      })
    })
},
//获取导航数据
getCateList(){
  request({ url: '/home/catitems'})
    .then(result=>{
      this.setData({
        catesList:result
      })
    })
},
//获取楼层数据
getFloorList(){
  request({ url: '/home/floordata'})
    .then(result=>{
      this.setData({
        floorList:result
      })
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
    
  }
})