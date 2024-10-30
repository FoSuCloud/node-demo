const http = require('http')
const fs = require('fs')
const port = 3000;
let count = 2;
const server = http.createServer((req, res) => {
    // res.setHeader('content-type', 'image/png,image/jpeg;charset=UTF-8') // req.headers.origin
    // console.log('req',req.url)
    res.setHeader('Access-Control-Allow-Origin', '*') // req.headers.origin
    res.statusCode=200
    // setTimeout(()=>{
    //     res.end(JSON.stringify({
    //         code: 0,
    //         msg: "a",
    //         data:{
    //             time: 'string;', // 报告生成时间
    //             title: 'string', // 报告标题
    //             personList: [
    //                 {
    //                     id: 1,
    //                     title: '2022年1月江发山煽动上访报告',
    //                     time: '2022-1-23 21:20:00', // 生成时间
    //                     clueNum: 3,
    //                     reportName: '谢强第', // 报告人
    //                     name: '洪利贵', // 姓名
    //                     idCard: '620102199003078415', // 身份证号
    //                     sex: 1, // 性别
    //                     identity: [1, 2], // 特殊身份 （可能多个）
    //                     phone: [132434534343, 132434534112], // 手机号码, 可能多个（不同线索可能采集的手机号码不一致）(包括备用手机号码)
    //                     virtualAccountList: [
    //                         {
    //                             virtualAccountType: 1,
    //                             virtualAccount: '17563859321'
    //                         },
    //                         {
    //                             virtualAccountType: 2,
    //                             virtualAccount: 'wx2323123312adsa'
    //                         }
    //                     ], // 虚拟账号
    //                     habitationAll: [
    //                         '甘肃省兰州市城关区大良牌坊22号',
    //                         '甘肃省兰州市城关区太平路21号'
    //                     ], // 实际居住地 （可能多个）
    //                     addressAll: ['甘肃省兰州市城关区东方红广场22号'] // 户籍地（可能多个）
    //                 },
    //                 {
    //                     id: 2,
    //                     title: '2022年1月13日入室杀人事件报告',
    //                     time: '2022-1-22 21:20:33', // 生成时间
    //                     clueNum: 4,
    //                     name: '车涛才', // 姓名
    //                     idCard: '620102199003073411', // 身份证号
    //                     sex: 1, // 性别
    //                     identity: [1, 2], // 特殊身份 （可能多个）
    //                     phone: [132434534343, 132434534112], // 手机号码, 可能多个（不同线索可能采集的手机号码不一致）(包括备用手机号码)
    //                     virtualAccountList: [
    //                         {
    //                             virtualAccountType: 1,
    //                             virtualAccount: '17563859321'
    //                         },
    //                         {
    //                             virtualAccountType: 2,
    //                             virtualAccount: 'wx2323123312adsa'
    //                         }
    //                     ], // 虚拟账号
    //                     habitationAll: [
    //                         '甘肃省兰州市城关区大良牌坊22号',
    //                         '甘肃省兰州市城关区太平路21号'
    //                     ], // 实际居住地 （可能多个）
    //                     addressAll: ['甘肃省兰州市城关区东方红广场22号'] // 户籍地（可能多个）
    //                 }
    //             ], // 人员基本信息
    //             clueList: [{
    //                 id: 1,
    //                 reportTime: 'string;', // 采集时间
    //                 title: 'string;', // 标题
    //                 urgency: 1, // 紧急程度
    //                 from: 1, // 线索来源
    //                 category: 1, // 线索类别
    //                 happen: 1, // 发生状态
    //                 status: 1, // 申请状态
    //             },{
    //                 id: 2,
    //                 reportTime: '1111;', // 采集时间
    //                 title: 'string;', // 标题
    //                 urgency: 1, // 紧急程度
    //                 from: 1, // 线索来源
    //                 category: 1, // 线索类别
    //                 happen: 1, // 发生状态
    //                 status: 1, // 申请状态
    //             }], // 线索
    //             mergeBasis: 'string' // 串并依据
    //         }
    //     }))
    // },2000)
    // if(req.url === "/risk-api/1.0/anticipationService/list"){
    //     if(count>0){
    //         res.statusCode=502
    //         res.end()
    //         count--;
    //     }else{
    //         count=2;
    //         res.statusCode=200
    //
    //     }
    // }else{
    //     res.end(JSON.stringify({
    //         code: 0,
    //         msg: "成功",
    //         data:"{}"
    //     }))
    // }
    // res.setHeader('cache-control', 'public,max-age=100000')
    // res.setHeader('accept-ranges', 'bytes')
    // res.setHeader('access-control-allow-origin', '*')
    // res.setHeader('ohc-cache-hit', 'sjz3ct53 [4], bdix246 [2]')
    // res.setHeader('ohc-file-size', '74348')
    // res.setHeader('x-cache', 'HIT')
    // res.setHeader('last-modified', 'Wed, 07 Jan 1970 00:00:00 GMT')
    // res.setHeader('expires', 'Tue, 07 Jun 2022 07:59:50 GMT')
    // res.setHeader('etag', '4d35238d92cab6a26de1ca9b491701e6')
    // res.setHeader('date', 'Sat, 21 May 2022 12:43:05 GMT')
    // if(req.headers["if-none-match"]==='"220"'){
    //     res.statusCode = 304;
    //     res.end()
    // }else{
    //
    // }
    // res.end()
    // let file = fs.readFileSync('dist/1.txt')
    // res.end(file)
    fs.readFile('dist/1.txt', 'utf-8', (err, content) => {
        if (err) {
            console.log('We cannot open "1gb.zip" file.')
        }

        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        })

        res.end(content)
    })
    // todo 文件流传输
    // console.log(req.url);
    // let stats = fs.statSync('dist/2gb.zip');
    // res.writeHead(200, {
    //     'Content-Type': 'application/octet-stream', // 告诉浏览器这是一个二进制文件
    //     'Content-Disposition': 'attachment; filename=1.zip', // 告诉浏览器这是一个需要下载的文件
    //     'Content-Length': stats.size, // 设置文件总大小
    //     'Connection': 'keep-alive',
    //     'X-XSS-Protection': '1; mode=block',
    //     'X-Frame-Options': 'SAMEORIGIN',
    //     'X-Content-Type-Options': 'nosniff',
    //     'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
    // });
    // const stream = fs.createReadStream('dist/2gb.zip');
    // stream.pipe(res);
})

server.listen(port, () => {
    console.log('start port:',3000)
})
