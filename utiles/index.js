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
export function login(){
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 2000,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...pay,
      success:(res)=>{
        resolve(res)

      },
      fail:(err)=>{
        reject(err);

      }
    })
  })
}