const fs = require('fs'),
      path = require('path'),
      process = require('process'),
      readline = require('readline');


    const stream = fs.createWriteStream(path.join(__dirname, 'some-text.txt'));
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
function getUserQuestion() {
    rl.question("Enter some text: ", (answer) => {
        if(answer.trim() === 'exit') {
            rl.close()
        } else {
            stream.write(answer);
            getUserQuestion()
        }
    });
}

rl.on('close', () => {
    console.log('\nGood luck!');
})


getUserQuestion()