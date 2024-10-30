const mainThread = require('./worker.js')
let user = {
    name: 'parent',
    age:11
}
// 开启多线程
mainThread(user).then((res)=>{
    console.log('mainThread res',res,user)
    // mainThread res { name: 'workerData', age: 11 } { name: 'parent', age: 11 }
    // 由此可以看出，主线程和子线程传输的是数据的值，子线程改变了对应的值不会影响到主线程的值
})
