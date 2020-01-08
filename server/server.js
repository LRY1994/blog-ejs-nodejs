const fs = require('fs');
const path = require("path")
const http = require('http');
const url  = require('url');
const querystring = require('querystring')
const Render=require('./render')
const CONFIG = require('./config');

const hostname = '127.0.0.1';
const port = 3000;
const { Generate }  = require('./generate');

class Server {
    constructor() {
      this.start();
    }
    start(){
        this.GenerateInstance = new Generate();
        this.GenerateInstance.generateCss();
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
              _that.GenerateInstance.generateCache();
              _that.route(req, res);
           }
        })
    })
    }
    
    
    //响应请求
    route (req, res){
        const urlObj = url.parse(req.url);
        const pathname = urlObj.pathname;
        const queryObj = querystring.parse(urlObj.query);
        console.log(req.url)
        if(req.url.startsWith("/static"))  Render.renderStatic(`./${req.url}`,res);
        else if( path.extname(pathname).substring(1) ==='png'||path.extname(pathname).substring(1)==='jpg'){ res.statusCode = 404;}
        else if(req.url.lastIndexOf("/categories")>=0)  {
           
          let lastIndex = req.url.lastIndexOf('\/')
          
          let categories = req.url.substring(lastIndex + 1);
          console.log(categories);
          Render.renderList(res,{ categories });
        }
        else{
          switch (pathname){
            case '/':  
            case '/list'          : Render.renderList(res,queryObj);break;
            case '/photo'       :  Render.renderPhoto(res,queryObj);break;
            default             : Render.renderPost(res,queryObj);break;
          }
        }
    }

}

new Server();