const fs = require('fs'),
      fsPromises = fs.promises,
      path = require('path'),
      writeFinalFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

async function bundleStyles() {
    const stylesSource = path.join(__dirname, 'styles'),
          styles = await fsPromises.readdir(stylesSource);

    for await (const file of styles) {
        const fileSource = path.join(stylesSource, file),
              fileName = path.basename(fileSource);

        if(path.extname(fileSource) === '.css') {
            const readFile = fs.createReadStream(path.join(stylesSource, fileName));
            readFile.on('data', data => {
                writeFinalFile.write(`${data.toString()}\n`);
            })
        }
    }
}

bundleStyles();