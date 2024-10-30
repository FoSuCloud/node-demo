const fs= require('fs')
const randomstring = require('randomstring');

const writeStream = fs.createWriteStream(__dirname+'/static/big-file.txt','utf8')
for(let i=0;i<5e5;i++){
    const randomStr = randomstring.generate({
        length: 50, // 生成长度为 50 的字符串
        charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 汉字 测试都是大手大脚可能即可的方法都是曝出续集的身份放割发代首', // 字符集包括英文字母、空格和汉字以及一个空格
        capitalization: 'lowercase', // 英文字母全部小写
        spaces: {
            probability: 0.3, // 随机加入空格的概率为 0.3
            min: 1, // 加入空格的最少数量为 1
            max: 2, // 加入空格的最多数量为 2
        },
    }); // 生成长度为 10 的随机字符串
    writeStream.write(i+randomStr+'\n','utf8')
}
writeStream.end()
