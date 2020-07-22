export function getsetting(){
   return new Promise((resolve,reject)=>{
     wx.getSetting({
       withSubscriptions: true,
       success:(res)=>{
         resolve(res)
       },
       fail:(err)=>{
             reject(err)
       },
       complete:()=>{

       }
     })
   })
}
export function opensetting(){
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      withSubscriptions: true,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
            reject(err)
      },
      complete:()=>{
      }
    })
  })
}
export function chooseAddress(){
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      withSubscriptions: true,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
            reject(err)
      },
      complete:()=>{
      }
    })
  })
}