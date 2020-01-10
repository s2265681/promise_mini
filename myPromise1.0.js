

// v1.0
function myPromise(test){
    const that = this;
    that.status="pending"
    that.value = undefined   // resolve
    that.reason = undefined  // reject
    function resolve(value){
        if(that.status==='pending'){
            that.status = "resolved"
            that.value = value
        }
    }
    function reject(reason){
        console.log('reson')
        if(that.status==='pending'){
            that.status = "rejected"
            that.reason = reason
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
   if(that.status==='resolved'){
       onFullfilled(that.value)
   }
   if(that.status==='rejected'){
      onRejected(that.reason)
   }
}

// promise.then(onFulfilled,onRejected)