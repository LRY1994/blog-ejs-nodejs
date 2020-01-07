const fs = require('fs');
const path = require("path")
const Render=require('./render')
const http = require('http');
const url  = require('url');
const querystring = require('querystring')
const sass = require('node-sass')
const CONFIG = require('./config');
const hostname = '127.0.0.1';
const port = 3000;

class Server {
    constructor() {
      this.start();
    }
    start(){
        this.transferSassToCss();
        this.createServer();
        this.instance.listen(port, hostname, () => {
          console.log(`服务器运行在 http://${hostname}:${port}/`);
        });
    }

    createServer(){
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
    //生成cache.json
    initCache(){
        var arr = [];
        var mdArr = [];
        this.traversalDir('./post',arr,mdArr,'md');

        let list = [];
        for(let i = 0 ;i < mdArr.length ; i++ ){
            let md = fs.readFileSync(mdArr[i].filePath ,"utf8");
            let obj = this.extractDataFromFile(md)      
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
    //提取md头几行信息
    extractDataFromFile (data){
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
    //遍历dirPath下的文件，返回后缀名是extname的结果，存放于mdArr
    traversalDir (dirPath,arr,mdArr,extname){
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
                this.traversalDir(filePath,arr[i].child,mdArr,extname);
            }else{
                //不是文件夹,则添加type属性为文件后缀名
                fileObj.type = path.extname(filesList[i]).substring(1);
                if( fileObj.type == extname) mdArr.push({filePath,...fileObj})
                arr.push(fileObj);
               
            }
        }
    }
    //响应请求
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
    //使用node-sass模块进行转换，后保存至css/all.css
    transferSassToCss () { 
      var arr = [];
      var scssArr = [];
      this.traversalDir('./static/scss', arr, scssArr, 'scss');
      let outputName = path.resolve('./static/css/', 'all.css');
      let allResult = '';
  
      for(let j = 0;j < scssArr.length;j++){
          let result = sass.renderSync({
            file: scssArr[j].filePath,
            outFile: outputName,
            outputStyle: 'compressed',
            sourceMap: true
          });
          allResult += result.css;
      }
             
      fs.writeFileSync(outputName, allResult, function(err){
        if (err) {
          console.log('write file err -> ', err)
        } else {
          console.log('save css success -> ', outputName)
        }
      });

  }
}

new Server();