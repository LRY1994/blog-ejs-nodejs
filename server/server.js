const fs = require('fs');
const path = require("path")
const Render=require('./render')
const http = require('http');
const url  = require('url');
const querystring = require('querystring')
const CONFIG = require('./config');
const hostname = '127.0.0.1';
const port = 3000;
class Server {
    constructor() {
      this.start();
      this.instance.listen(port, hostname, () => {
        console.log(`服务器运行在 http://${hostname}:${port}/`);
      });
    }
    start(){
        const _that = this;
        this.instance = http.createServer((req, res) => {
            fs.exists(CONFIG.CACHE,function(exists){
              if(exists){
                console.log("文件存在");
                _that.route(req, res);
              }
               if(!exists){
                  console.log("文件不存在")
                  _that.initCache();
                  _that.route(req, res);
               }
            })
        })
    }
    initCache(){
        var arr = [];
        var mdArr = [];
        this.fileDisplay('./post',arr,mdArr);

        let list = [];
        for(let i = 0 ;i < mdArr.length ; i++ ){
            let md = fs.readFileSync(mdArr[i].filePath ,"utf8");
            let obj = this.handleFile(md)      
            let newObj = {...mdArr[i],...obj}
            newObj.index = i;
            list.push(newObj);  
        }

        let obj = {
            total:list.length,
            cache:list,
        }

        fs.writeFileSync(CONFIG.CACHE, JSON.stringify(obj));
    }

    handleFile (data){
        let obj = {};
        //提取---xxx---之间的json
        let info = data.match(/^---[\s\S]+?---/);
        //错误log
        if(info==null) {
            fs.appendFileSync('null.txt', data)
            return obj;
        }
        //去除头尾的---
        info = info[0].replace(/(^-*|-*$)/g, "");   
        // fs.appendFileSync('output.txt', info)
    
        //按行切分，提取键值对
        info = info.split(/[\n|\r]/);   
        for(let i = 0;i < info.length; i++){
            if(!info[i].match(/^\s*$/)){//去除空格空行
                let arr = info[i].split(':');
                if(arr[1]===undefined) {
                    fs.appendFileSync('output.txt', info)
                }
                obj[arr[0]] = arr[1].replace(/\s|\"/g,"");
            }
        }
        return obj ; 
    }

    fileDisplay (dirPath,arr,mdArr){
        var filesList = fs.readdirSync(dirPath);
        for(var i=0;i<filesList.length;i++){
            //描述此文件/文件夹的对象
            var fileObj = {};
            fileObj.name = filesList[i];
            //拼接当前文件的路径(上一层路径+当前file的名字)
            var filePath = path.join(dirPath,filesList[i]);
            //根据文件路径获取文件信息，返回一个fs.Stats对象
            var stats = fs.statSync(filePath);
            if(stats.isDirectory()){
                //如果是文件夹
                fileObj.type = 'dir';
                fileObj.child = [];
                arr.push(fileObj);
                //递归调用
                this.fileDisplay(filePath,arr[i].child,mdArr);
            }else{
                //不是文件夹,则添加type属性为文件后缀名
                fileObj.type = path.extname(filesList[i]).substring(1);
                if( fileObj.type=="md") mdArr.push({filePath,...fileObj})
                arr.push(fileObj);
               
            }
        }
    }

    route (req, res){
        const urlObj = url.parse(req.url);
        const pathname = urlObj.pathname;
        const queryObj = querystring.parse(urlObj.query);
        console.log(req.url)
        if(req.url.startsWith("/static"))  Render.renderStatic(`./${req.url}`,res);
        else{
          switch (pathname){
            case '/'            : Render.renderList(res,queryObj);break;
            default             : Render.renderPost(res,queryObj);break;
          }
        }
    }
}

new Server();