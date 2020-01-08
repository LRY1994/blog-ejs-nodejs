const { Generate }  = require('./generate');

class Build {
    constructor() {
        const GenerateInstance = new Generate();
        GenerateInstance.generateCss();
        GenerateInstance.generateCache();
        GenerateInstance.generateCategories();
        GenerateInstance.generateStatic();
    }
}

new Build();