let ajaxtimes=0;
export const request=(params)=>{

  //判断url中是否带有/my/ 请求的是私有路径 添加上请求头header
  ajaxtimes++;
  let header={...params.header};
  if(params.url.includes("/my/")){
    header["Authorization"]=wx.getStorageSync('token');
  }
  const baseurl=""
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      header:header,
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
