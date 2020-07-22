import { request } from '../../request/index.js'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
/*用户上滑页面 滚动条触底 开始加载下一页数据
1使用滚动条触底事件
2判断还有没有下一页数据
3如果没有下一页数据 弹出一个提示
4.如果有将他添加到商品列表中
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tables: [{ id: 0, value: "综合", isActive: true }, { id: 1, value: "销量", isActive: false }, { id: 2, value: "价格", isActive: false }],
        index: 0,
        goods_list: []
    },
    handchange(e) {
        //获取子组件传递的主题下标
        const index = e.detail;
        this.setData({
            index
        })

    },
    params: {
        query: "",
        pagenum: 1,
        cid: "",
        pagesize: 10

    },
    allpage:0,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //在options中存储有传递过来的页面参数
        this.params.cid = options.cid;
        this.getgoodslist()
    },
    //获取商品列表的数据
    async getgoodslist() {
        const res = await request({ url: "/goods/search", data: this.params });
        console.log(res);
        const total = res.total;
        this.allpage=Math.ceil(total/this.params.pagesize)
        this.setData({
            //将请求到的数据放到一个数组中
            goods_list: [...this.data.goods_list,...res.goods],
        })
     
    },
    //页面上滑滚动条触底事件
    onReachBottom() {
        //判断还有没有下一页数据
        if(this.params.pagenum>this.allpage)
        //弹出提示框
        {wx.showToast({
          title: '没有下一页数据',
          icon:''
        })}
        else{
            this.params.pagenum++;
            this.getgoodslist()
           
            
        }

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    //想要使用下拉刷新页面需要在json中开启配置   "enablePullDownRefresh":true,，在json中配置backgroundTextStyle：dark开启下拉刷新动画
    onPullDownRefresh: function() {
        //下拉刷新效果实现，设置数据为空，将请求页码设置为1，重新发送请求
            this.setData({
                goods_list:[]
            })
            this.params.pagenum=1
             this.getgoodslist()
            //关闭下拉刷新的窗口
            wx.stopPullDownRefresh({
              success: (res) => {},
            })
        },

    /**
     * 页面上拉触底事件的处理函数
     */

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})