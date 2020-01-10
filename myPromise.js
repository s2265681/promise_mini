function myPromise(test){
    const that = this
    that.status='pendding'
    that.value=undefined
    that.reason=undefined

    that.onFullfilledArray = []
    that.onRejectedArray = []

    function resolve(value){
       if(that.status==="pendding"){
        that.status='resolved'
        that.value=value
        that.onFullfilledArray.forEach(element=>{
            element(that.value)
        })
       }
    }
    function reject(reason){
        if(that.status==="pendding"){
         that.status='rejected'
         that.reason=reason
         that.onRejectedArray.forEach(element=>{
            element(that.reason)
         })
        }
     }
     try {
        test(resolve,reject)
     } catch (error) {
         reject(error)
     }
}

myPromise.prototype.then=function(onFullfilled,onRejected){
    const that = this;
    let promise2
    if(that.status==="pendding"){
         promise2 = new myPromise(function(res,rej){
                that.onFullfilledArray.push(function(){
                    let temple=onFullfilled(that.value);
                    res(temple)
                });
                that.onRejectedArray.push(function(){
                    let temple=onRejected(that.reason);
                    rej(temple)
                });
           })
       
   }
    if(that.status==='resolved'){
        promise2 = new myPromise(function(res){
                let temple=onFullfilled(that.value);
                    res(temple)
       })
    }
    if(that.status==="rejected"){
        promise2 = new myPromise(function(res,rej){
                let temple=onRejected(that.reason);
                rej(temple)
       })
    }
    return promise2
}