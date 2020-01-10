

// 2.v2.0基于观察模式实现
// 为了处理异步resolve，我们修改myPromise的定义，用2个数组onFullfilledArray和onRejectedArray来保存异步的方法。在状态发生改变时，一次遍历执行数组中的方法。
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
   if(that.status==="pending"){
        that.arr1.push(function(){
                onFullfilled(that.value)
        });
        that.arr2.push(function(){
                onRejected(that.reason)
        });
   }
   if(that.status==='resolved'){
       onFullfilled(that.value)
   }
   if(that.status==='rejected'){
      onRejected(that.reason)
   }
}

// promise.then(onFulfilled,onRejected)