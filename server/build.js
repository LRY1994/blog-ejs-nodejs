const { Generate }  = require('./generate');

class Build {
    constructor() {
        const GenerateInstance = new Generate();
        GenerateInstance.generateCss()
        GenerateInstance.generateStatic()
        GenerateInstance.generateCache();
        GenerateInstance.generateCategories();
       
        GenerateInstance.generatePost();
        GenerateInstance.generateIndex()
    }
}

new Build();