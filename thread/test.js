
const crypto = require("crypto");

const start = Date.now();

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("1:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("2:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("3:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("4:", Date.now() - start);
});
//
// crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
//     console.log("5:", Date.now() - start);
// });

console.log("Encryption started");
// node10之后默认就引入了多线程
// 所以我们只有一个主程序的时候 800毫秒
// 有四个的时候，分别开启了四个worker线程，四个线程时间差不多，而且结束时间1200毫秒
// 但是5个的时候，时间就突然翻倍了，最后一个线程和别的线程查了800毫秒左右
// 这样做的原因是，默认情况下，节点有一个包含 4 个线程的线程池，因此前 4 个加密调用并行运行，第五个调用在这之后运行。
/*
* 1: 862
* */

/*
1: 1278
2: 1279
4: 1280
3: 1284
* */

/*
2: 1281
4: 1286
1: 1290
3: 1303
5: 2271
* */
