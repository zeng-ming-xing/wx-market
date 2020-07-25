// pages/goos_detail/index.js
import { request } from '../../request/index.js'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  goods:{},
  iscollect:false
  },
  
  goods_info_image:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
     
  },
  //完成轮播图预览效果
  priview(e){
const urls=this.goods_info_image.pics.map(v=>
      v.pics_mid
    )
  const {url} =e.currentTarget.dataset.url;
  wx.previewImage({
    current:url,
    urls
  })
  
  },
  
  
  //完成加入购物车
  handlecartadd(){
   let cart=wx.getStorageSync('cart')||[];
   let index=cart.findIndex(v=>{
     v.goods_id===this.goods_info_image.goods_id
   })
   if(index===-1){
     //不存在  第一次添加
     this.goods_info_image.num=1;
     this.goods_info_image.checked=false
     cart.push(this.goods_info_image)
   }
   else{
     cart[index].num++;

   }
   wx.setStorageSync('cart', cart);
   wx.showToast({
     title: '添加成功',
     icon:"success",
     mask:true
   })
  },
  //点击收藏商品  将商品收藏数组添加到缓存中
  handcollect(){
    let iscollect=false;
    let collect=wx.getStorageSync('collect')||[];
    //判断该商品是否已经被收藏
    let index=collect.findIndex(v=>v.goods_id===this.goods_info_image.goods_id);
    if(index!==-1){
      //商品已经收藏过  取消收藏
      iscollect=false
        collect.splice(index,1)       
    }
    else{
      //没有收藏过  将数据添加到收藏数组
      iscollect=true
      collect.push(this.goods_info_image);
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      iscollect
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
    let pages=getCurrentPages();
    let current=pages[pages.length-1];
    let options=current.options;
    const {goods_id}=options;
    this.getgoods(goods_id)
   },
   //获取商品详情数据
   async getgoods(goods_id){
      const res=await request({url:"/goods/detail",data:{goods_id}});
      this.goods_info_image=res;
       //获取缓存中的收藏商品
    let collect=wx.getStorageSync('collect')||[];
    let iscollect=collect.some(v=>v.goods_id===this.goods_info_image.goods_id);
      this.setData({
        goods:{goods_name:res.goods_name,
         goods_price:res.goods_price,
         //部分iphone不支持webp格式图片，需要找到后台让他进行更改，也可以自己进行更改要确保后台存在 1.webp=>1.jpg 相应不同格式的图片，使用字符串函数 replace进行替换操作 将webP 替换成jpg 
         goods_introduce:res.goods_introduce,
         pics:res.pics
       },
       iscollect
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