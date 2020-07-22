let ajaxtimes=0;
export const request=(params)=>{
  ajaxtimes++;
  const baseurl="https://api-hmugo-web.itheima.net/api/public/v1"
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseurl+params.url,
      success:(result)=>{
        resolve(result.data.message); 
      },
      fail:(err)=>{
        reject(err)
      },
      //不管成功还是失败都会触发
      complete:()=>{
        ajaxtimes--;
        if(ajaxtimes==0)
        {
          wx.hideLoading({
            success: (res) => {},
          })
        }
        
      }
    })
  })
}