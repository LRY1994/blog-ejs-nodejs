const ejs=require('ejs');
const fs = require('fs');
const marked = require("marked")
const mime = require("mime");
const CONFIG = require('./config');


//列表
exports.renderList = function(res,queryObj){

    fs.readFile( CONFIG.CACHE, 'utf8',
                function (err, data) {
                    if(err) return console.log(err);

                    const { cache, total } = JSON.parse(data);//从cache.json里取值
                    const { categories} = queryObj;

                    let list = [];
                    //分类
                    if(categories){
                        for(let i = 0 ;i < total ; i++ ){
                            if(cache[i].categories && cache[i].categories.indexOf(categories)>=0) list.push(cache[i]);                        
                        }
                    }
                    else{
                        list = cache;
                    }
                    
                    ejs.renderFile('./ejs/list.ejs', 
                    {   
                        list, 
                        nav:CONFIG.NAV ,
                        categories:categories||'All'
                    }, 
                    function(err,data){
                        if(err){
                            console.log(err);
                        }else{
                            fs.writeFileSync('./public/categories/Reading.html', data);
                            res.end(data);
                        
                        }
                    }) 
                })

}

//详情
exports.renderPost = function (res,queryObj){

    fs.readFile(CONFIG.CACHE, 'utf8',
                function (err, data) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html'); 

                    const { cache } = JSON.parse(data);//从cache.json里取值
                    const { index } = queryObj;

                    if(!cache[index].html) {
                        let data = fs.readFileSync(`./${cache[index].filePath}` ,"utf8");
                        let section = data.match(/^---[\s\S]+?---/)[0];
                        cache[index].html =  marked(data.replace(section,''));
                    }
                    
                    ejs.renderFile('./ejs/post.ejs', 
                    { 
                        ...cache[index], 
                        nav:CONFIG.NAV 
                    }, 
                    function(err,data){
                        if(err){
                            console.log(err);
                        }else{
                            res.end(data);
                        }
                    }) 
                })
}

// 读取静态文件
exports.renderStatic = function (url,response){
    
    fs.readFile( url, 
                function (err, data) {
                    if (err)   return console.error(err)
                    
                    // 设置请求头
                    response.setHeader("Content-Type", mime.getType(url));
                    response.end(data);
                })
      
}

//照片
exports.renderPhoto = function (res,queryObj){
    fs.readFile(CONFIG.CACHE, 'utf8',
    function (err, data) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html'); 

        const { cache } = JSON.parse(data);//从cache.json里取值
        const { index } = queryObj;

        if(!cache[index].html) {
            let data = fs.readFileSync(`./${cache[index].filePath}` ,"utf8");
            let section = data.match(/^---[\s\S]+?---/)[0];
            cache[index].html =  marked(data.replace(section,''));
        }
        
        ejs.renderFile('./ejs/post.ejs', 
        { 
            ...cache[index], 
            nav:CONFIG.NAV 
        }, 
        function(err,data){
            if(err){
                console.log(err);
            }else{
                res.end(data);
            
            }
        }) 
    })
}