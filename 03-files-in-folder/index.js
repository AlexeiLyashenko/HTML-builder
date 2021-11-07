const promises = require('fs/promises'),
      fs = require('fs'),
      path = require('path');

async function readDir() {
    try{
        const some = await promises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
        return some 
    } catch(err) {
        if (err) throw err;
    }
}

readDir()
    .then(some => {
        try {
            for(const key of some) {
                if(key.isFile()) {
                    fs.stat(path.join(__dirname, 'secret-folder', key.name), (err, data) => {
                        if(err) throw err
                        console.log(`${path.basename(key.name, path.extname(key.name))} - ${path.extname(key.name).slice(1)} - ${data.size/1024}kb`);
                    })
                }
            }
        } catch (error) {
            throw error
        }
    })