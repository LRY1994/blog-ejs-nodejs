const htmlSrc = 
class Generate {
    
    generateHtml(){
        
    }
    generateImg(){

    }
    generateCss(){
        //使用node-sass模块进行转换，后保存至css/all.css  
        var arr = [];
        var scssArr = [];
        this.traversalDir('./static/scss', arr, scssArr, 'scss');
        let outputName = path.resolve('./public/css/', 'all.css');
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