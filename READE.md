

# 手写promise

-  Promise/A+规范
Promise/A+规范扩展了早期的Promise/A proposal提案，我们来解读一下Promise/A+规范。
1.术语
（1）"promise"是一个对象或者函数，该对象或者函数有一个then方法
（2）"then"是一个对象或者函数，用来定义then方法
（3）"value"是promise状态成功时的值
（4）"reason"是promise状态失败时的值
我们明确术语的目的，是为了在自己实现promise时，保持代码的规范性（也可以跳过此小节）
2.要求
（1）一个promise必须有3个状态，pending，fulfilled(resolved)，rejected当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态。当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。
promise英文译为承诺，也就是说promise的状态一旦发生改变，就永远是不可逆的。
（2）一个promise必须有一个then方法，then方法接受两个参数：
promise.then(onFulfilled,onRejected)
其中onFulfilled方法表示状态从pending——>fulfilled(resolved)时所执行的方法，而onRejected表示状态从pending——>rejected所执行的方法。
（3）为了实现链式调用，then方法必须返回一个promise
promise2=promise1.then(onFulfilled,onRejected)

.once

.all


[参考](https://github.com/forthealllight/blog/issues/4)
