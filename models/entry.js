const redis = require('redis');
const db = redis.createClient();    // 创建 Redis 客户端实例

class Entry{
    constructor(obj){
        for(let key in obj){        // 循环遍历传入对象中的键
            this[key] = obj[key];   // 合并值
        }
    }

    static getRange(from, to, cb){
        db.lrange('entries' , from, to, (err, items) =>{
            if(err) return cb(err);
            let entries = [];
            items.forEach((item) =>{
                entries.push(JSON.parse(item));
            });
            cb(null, entries);
        });
    }

    save(cb){
        const entryJSON = JSON.stringify(this);  // 将保存的消息转换成 JSON 字符串
        db.lpush(                   // 将 JSON 字符串保存到 Redis 列表中 
            'entries',
            entryJSON,
            (err) =>{
                if(err) return cb(err);
                cb();
            }
        );
    }

    static count(cb) {
        db.llen('entries', cb);
    }
}
module.exports = Entry;