/*
休眠函数sleep
调用 await sleep(1500)
 */
function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}
async function main() {
    console.log(1)
    await sleep(30*1000)
    console.log(2)
}
console.log('child_program')
main()
