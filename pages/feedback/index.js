// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tables: [{ id: 0, value: "体验问题", isActive: true }, { id: 1, value: "商品/商家投诉", isActive: false }],
    index: 0,
    imgpath:[],
    textVal:""
  },
  //存放图片的外网地址
  UploadImgs:[],
  handchange(e) {
    //获取子组件传递的主题下标
    const index = e.detail;
    this.setData({
        index
    })

},
//小程序内置api选择图片
addimg(){
  wx.chooseImage({
    count: 9,
    sizeType:['original','compressed'],
    sourceType: ['album', 'camera'],
    success:(res)=>{
     this.setData({
       imgpath:res.tempFilePaths
     })
       
    },
    fail:()=>{},
  })
  
},
//点击图片删除
splice(e){
  const index=e.currentTarget.dataset;
  let {imgpath}=this.data;
  imgpath.splice(index,1);
  this.setData({
    imgpath
  })
},
//获取文本域的输入
textinput(e){
  this.setData({
    textVal:e.detail.value
  })
},
//提交
submit(){
  //获取文本域的输出
  const {textVal,imgpath}=this.data;

//验证输入是否合法
   if(textVal=="")
   {
     wx.showToast({
       title: '请输入文本',
     })
     return ;
   }
   //点击上传之后显示正在提交
   wx.showLoading({
     title: '正在上传',
     icon:"none",
     mask:TextTrackCue
   })
   //判断有没有图片
   if(imgpath.length!=0){
  //上传图片到专门服务器，不支持多个文件同时上传，遍历循环上传
  imgpath.forEach((v,i)=>{
    wx.uploadFile({
      //被上传的文件的路径
      filePath:v,
      //文件的名称  后台通过该名称获取文件
      name: 'file',
      //上传到哪里 
      url: 'https://images.ac.cn./Home/Index/UploadAcrion/',
      //附带的文本信息
      formData:{},
      //获取返回函数  函数中包含外网路径
      //在这里将返回参数中的外网连接  存储到数组中
   
      success:(res)=>{
        console.log(res);
        let url=JSON.parse(res.data).url;
        this.UploadImgs.push(url);
        
        
        //并且当所有图片上传成功过并且服务器返回外网地址之后  在讲返回的外网地址  传递到我们的后台服务器
        if(i===this.UploadImgs.length-1)
        {
          //关闭loading图片
          wx.hideLoading({
            success: (res) => {},
          })
          //将文本内容和图片外网连接传递到后台
              
          //将数据清空
          this.setData({
            textVal:"",
            imgpath:[]
          })
          //返回上一级页面
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  })
}
else{
  wx.hideLoading({
    success: (res) => {},
  })
  wx.navigateBack({
    delta: 1,
  })
  //只将文本提交
}
  
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