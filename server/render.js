const ejs=require('ejs');
const fs = require('fs');
const marked = require("marked")
const  mime = require("mime");
const CONFIG = require('./config');


exports.renderList = function(res,queryObj){

    fs.readFile(CONFIG.CACHE,'utf8',function (err, data) {
        if(err) console.log(err);

        const json =JSON.parse(data);//读取的值
        const {cache,total} = json;
        const { categories} = queryObj;

        let list = [];
        //分类
        if(categories){
            for(let i = 0 ;i < total ; i++ ){
                if(cache[i].categories && cache[i].categories.indexOf(categories)>=0){
                    list.push(cache[i]);
                }  
            }
        }else{
            list = cache;
        }
        
        ejs.renderFile('./ejs/list.ejs', {list, title:'列表', nav:CONFIG.NAV}, function(err,data){
            if(err){
                console.log(err);
            }else{
                res.end(data);
            
            }
        }) 
    })

}
exports.renderPost = function (res,queryObj){
    fs.readFile(CONFIG.CACHE,'utf8',function (err, data) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html'); 
        
        const json =JSON.parse(data);//读取的值
        const {cache} = json;
        const { index } = queryObj;

        if(!cache[index].html) {
            let data = fs.readFileSync(`./${cache[index].filePath}` ,"utf8")
            cache[index].html =  marked(data);
        }
        
        ejs.renderFile('./ejs/post.ejs', {...cache[index],nav:CONFIG.NAV}, function(err,data){
            if(err){
                console.log(err);
            }else{
                res.end(data);
            
            }
        }) 
    })
}

exports.renderStatic = function (url,response){
    // 读取静态文件
    fs.readFile(url, function (err, data) {
        if (err) {
            return console.error(err)
        }
        // 设置请求头
        response.setHeader("Content-Type", mime.getType(url));
        response.end(data);
    })
      
}

