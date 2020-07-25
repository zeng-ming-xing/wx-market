// pages/search/index.js
import { request } from '../../request/index.js'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
   /*防抖操作  需要使用定时器   */
  data: {
    goods:[],
    //标签的显示隐藏控制
    isfoucs:false,
    //输入框的值
    inputvalue:""
  },
  TimeId:-1,
  //点击取消按钮清除数据
  handcancel(){
      this.setData({
        inputvalue:"",
        isfoucs:false,
        goods:[]
      })
  },
  //获取输入框的值
  handinput(e){
       const {value}=e.detail;
       console.log(value.trim());
       
       if(value.trim()=="")
       {
         this.setData({
           goods:[],
           isfoucs:false
         })
         return ;
       }
       //当有输入的时候将取消按钮显示
       this.setData({
         isfoucs:true
       })
       //准备发送请求获取数据 
       //对发送请求进行防抖操作  主要是使用定时器  将发送请求的操作进行延迟 等待用户全部输入完成在进行搜索   可以避免请求发送多次，先将上一次的定时器进行清除然后开始一个新的定时器  

       //节流操作一般使用在上拉或者下拉的时候进行该操作
       clearTimeout(this.TimeId)
       this.TimeId=setTimeout(()=>{
        this.qsearch(value)
       },1000)
         
  },
  //发送请求获取搜索的数据
  async qsearch(query){
       const res= await request({url:"/goods/qsearch",data:{query}})
       console.log(res);
       this.setData({
   goods:res
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