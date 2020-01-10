

// 3.v3.0then方法实现链式调用
// 要通过then方法实现链式调用，那么也就是说then方法每次调用需要返回一个primise,同时在返回promise的构造体里面，增加错误处理部分，我们来改造then方法

function myPromise(test){
    const that = this;
    that.status="pending"
    that.value = undefined   // resolve
    that.reason = undefined  // reject
    that.arr1 = []
    that.arr2 = []
    function resolve(value){
        if(that.status==='pending'){
            that.status = "resolved"
            that.value = value
            that.arr1.forEach(element => {
                element(that.value)
            });
        }
    }
    function reject(reason){
        if(that.status==='pending'){
            that.status = "rejected"
            that.reason = reason
            that.arr2.forEach(element => {
                element(that.reason)
            });
        }
    }
    try {
        test(resolve,reject)
    } catch (error) {
        reject(error)
    }
}

myPromise.prototype.then=function(onFullfilled,onRejected){
   let that = this;
   let promise2;
   if(that.status==="pending"){
    promise2 =  new myPromise(function(resolve,reject){
        that.arr1.push(function(){
            try{
               let temple=onFullfilled(that.value);
               resolve(temple)
            }catch(e){
               reject(e) //error catch
            }
         });
    },
    that.arr2.push(function(resolve,reject){
        try{
           let temple=onRejected(that.reason);
           resolve(temple)
        }catch(e){
           reject(e) //error catch
        }
     })
    )

   }
   if(that.status==='resolved'){
       promise2=new myPromise(function(resolve,reject){
        try{
          let temple=onFullfilled(self.value);
          //将上次一then里面的方法传递进下一个Promise的状态
          resolve(temple);
        }catch(e){
          reject(e);//error catch
        }
    })


   }
   if(that.status==='rejected'){
      promise2=new myPromise(function(resolve,reject){
        try{
          let temple=onRejected(self.reason);
          //将上次一then里面的方法传递进下一个Promise的状态
          resolve(temple);
        }catch(e){
          reject(e);//error catch
        }
    })
   }
   return promise2
}

