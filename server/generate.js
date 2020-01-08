const fs = require('fs');
const path = require("path")
const sass = require('node-sass')
const CONFIG = require('./config');
const Utils = require('./utils')
const ejs=require('ejs');

const categories_path='./public/categories';
const css_path='./public/static/css'
class Generate {
     //生成cache.json
    generateCache(){
      var arr = [];
      var mdArr = [];
      Utils.traversalDir('./post',arr,mdArr,'md');

      let list = [];
      for(let i = 0 ;i < mdArr.length ; i++ ){
          let md = fs.readFileSync(mdArr[i].filePath ,"utf8");
          let obj = Utils.extractDataFromFile(md)      
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
    //生成文章页面
    generatePost(){
    }
   
    generateCategory(categories){
      fs.readFile( CONFIG.CACHE, 'utf8',
                  function (err, data) {
                      if(err) return console.log(err);

                      const { cache, total } = JSON.parse(data);//从cache.json里取值                     

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
                            fs.writeFileSync(`${categories_path}/${categories}.html`, data)
                            //  fs.writeFileSync(`./public/categories/${categories}.html`, data,function(err){
                            //   if (err) {
                            //     console.log('write html err -> ', err)
                            //   } else {
                            //     console.log('save html success -> ',categories)
                            //   }
                            // });
                          }
                      }) 
      })
    }
    //2、生成分类页面
    generateCategories(){
      if (fs.existsSync(categories_path) == false) {
        Utils.makeDir(categories_path);
    }
      for(let i = 0;i < CONFIG.NAV.length; i++) this.generateCategory(CONFIG.NAV[i].name);
    }
    //拷贝静态图片
    generateStatic(){
      Utils.CopyDirectory('./static', './public/static');
    }
    //生成css
    generateCss(){
      if (fs.existsSync(css_path) == false) {
        Utils.makeDir(css_path);
    }
        //使用node-sass模块进行转换，后保存至css/all.css  
        var arr = [];
        var scssArr = [];
        Utils.traversalDir('./static/scss', arr, scssArr, 'scss');
        let outputName = path.resolve(`./static/css/`, 'all.css');
        let allResult = '';
    
        for(let j = 0;j < scssArr.length;j++){
            let result = sass.renderSync({
              file: scssArr[j].filePath,
              outFile: outputName,
              outputStyle: 'compressed',
              sourceMap: false
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

module.exports  = {
  Generate
}