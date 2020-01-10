const fs = require('fs');
const path = require("path")
const { myMarked } = require('./myMarked')

//遍历dirPath下的文件，返回后缀名是extname的结果，存放于mdArr
const traversalDir = function (dirPath,arr,mdArr,extname){
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
          traversalDir(filePath,arr[i].child,mdArr,extname);
      }else{
          //不是文件夹,则添加type属性为文件后缀名
          fileObj.type = path.extname(filesList[i]).substring(1);
          let htmlPath = '/'+ filePath.replace(/\\/g,'/').replace('.md','.html');
          if( fileObj.type == extname) mdArr.push({filePath,htmlPath,...fileObj})
          arr.push(fileObj);
         
      }
  }
}


//提取md头几行信息
const extractDataFromFile = function (data){
    let obj = {};
    //提取---xxx---之间的json
    let info = data.match(/^---[\s\S]+?---/);
    let section = info;
   
    //去除头尾的---
    info = info[0].replace(/(^-*|-*$)/g, "");   

    //按行切分，提取键值对
    info = info.split(/[\n|\r]/);   
    for(let i = 0;i < info.length; i++){
        if(!info[i].match(/^\s*$/)){//去除空格空行
            let arr = info[i].split(':');
            if(arr[1]===undefined) {
                fs.appendFileSync('output.txt', info)
            }
            obj[arr[0]] = arr[1].replace(/(^\s*)|(\s*$)|\"/g,"");//去除头尾空格和双引号
        }
    }

    obj.html =  myMarked(data.replace(section,''));

    return obj ; 
}

//循环创建目录
const makeDir = function (dirpath) { 
    dirpath = dirpath.replace(/\\/g,'/');
    var pathtmp;  
    dirpath.split("/").forEach(function(dirname) {
        if (pathtmp) {
            pathtmp = path.join(pathtmp, dirname);
        }
        else {
　　　　　　　　　 //如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
            if(dirname){
                pathtmp = dirname;
            }else{
                pathtmp = "/"; 
            }
        }
        if (!fs.existsSync(pathtmp)) {
            if (!fs.mkdirSync(pathtmp)) {
                return false;
            }
        }
    });
  
    return true;
}
//拷贝文件夹
const CopyDirectory = function(src, dest,excludeDir) {
    if (fs.existsSync(dest) == false) {
        fs.mkdirSync(dest);
    }

    var dirs = fs.readdirSync(src);
    dirs.forEach(function(item){
        var item_path = path.join(src, item);  
        var temp = fs.statSync(item_path);
       
        
        if( 
            excludeDir == undefined ||
            ( excludeDir && item_path != excludeDir )
        ) 
            {
            if (temp.isFile()) 
            { // 是文件
                fs.copyFileSync(item_path, path.join(dest, item));
            } else if (temp.isDirectory())
            { // 是目录
                CopyDirectory(item_path, path.join(dest, item));
            }
        }
    });
}

//循环删除目录
const deleteFolder = function(dirpath,excludeDir) {
    let files = [];
    if( fs.existsSync(dirpath) ) {
        files = fs.readdirSync(dirpath);
        files.forEach(function(file,index){
            let curPath = dirpath + "/" + file;
            if( 
                excludeDir == undefined ||
                ( excludeDir && item_path != excludeDir )
            ) 
            {
                
                if(fs.statSync(curPath).isDirectory()) {
                    deleteFolder(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            }
        });
        fs.rmdirSync(dirpath);
    }
}

module.exports  = {
    CopyDirectory,
    traversalDir,
    extractDataFromFile,
    makeDir,
    deleteFolder
}
