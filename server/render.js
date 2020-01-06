const ejs=require('ejs');
const fs = require('fs');
const path = require("path")
const marked = require("marked")
const  mime = require("mime");
const CONFIG = require('./config');
function handleFile(data){
    let obj = {};

    let info = data.match(/^---[\s\S]+?---/);
    if(info==null) {
        fs.appendFileSync('null.txt', data)
        return obj;
    }
    info = info[0].replace(/(^-*|-*$)/g, "");

    
    fs.appendFileSync('output.txt', info)
    info = info.split(/[\n]/);
    
    for(let i = 0;i < info.length; i++){
        if(info[i]){
            let arr = info[i].split(':');
            obj[arr[0]] = arr[1]
        }
    }
    return obj ; 
}

function fileDisplay(dirPath,arr,mdArr){
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
            fileDisplay(filePath,arr[i].child,mdArr);
        }else{
            //不是文件夹,则添加type属性为文件后缀名
            fileObj.type = path.extname(filesList[i]).substring(1);
            if( fileObj.type=="md") mdArr.push({filePath,...fileObj})
            arr.push(fileObj);
           
        }
    }
}
exports.renderList = function(res){
  var arr = [];
  var mdArr = [];
  fileDisplay('./post',arr,mdArr);

  let list = [];
  for(let i = 0 ;i < mdArr.length ; i++ ){
    let md = fs.readFileSync(mdArr[i].filePath ,"utf8");
    let obj = handleFile(md)
    newObj = {...mdArr[i],...obj}
    list.push(newObj);
  }

  fs.writeFileSync('./mdfile.js', JSON.stringify(list));

    ejs.renderFile('./ejs/list.ejs', {list,title:'列表',nav:CONFIG.NAV}, function(err,data){
        if(err){
            console.log(err);
        }else{
            res.end(data);
        
        }
    }) 



}

exports.renderPost = function (postpath,res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
 //"utf8"关键
 fs.readFile(postpath ,"utf8",  function(err, data) {
    if (err) {
        return console.error(err)
    }

    let obj = handleFile(data)
    obj.html = marked(data);
    // console.log(obj)
    
    ejs.renderFile('./ejs/post.ejs', {...obj,nav:CONFIG.NAV}, function(err,data){
        if(err){
            console.log(err);
        }else{
            res.end(data);
        
        }
    }) 

});
}

exports.renderStatic = function (url,response){
        // 读取静态文件
        fs.readFile(url, function (err, data) {
          if (err) {
            throw err;
          }
          // 设置请求头
          response.setHeader("Content-Type", mime.getType(url));
          response.end(data);
        })
      
}

