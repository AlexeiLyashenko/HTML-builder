const fs = require('fs'),
      path = require('path'),
      fsPromises = fs.promises;

async function copyDirectory() {
    await fsPromises.rm(
        path.join(__dirname, 'files-copy'),
        { recursive:true, force: true }
    );
    
    await fsPromises.mkdir(
        path.join(__dirname, 'files-copy'),
        { recursive: true },
        err => {
            if(err) throw err;
        })

    const files = await fsPromises.readdir(path.join(__dirname, 'files'));
    
    for await (const file of files) {
        console.log(file);
        fsPromises.copyFile(
            path.join(__dirname, 'files', file),
            path.join(__dirname, 'files-copy', file)
        )
    }    
}
copyDirectory()