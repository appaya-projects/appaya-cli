var path = require('path'), 
    fs   = require('fs');



function filesInDir(startPath,filter){

    var results = [];

    if (!fs.existsSync(startPath)){
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            results = results.concat(filesInDir(filename,filter)); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            results.push(filename);
        }
    }
    return results;
}

module.exports = filesInDir;