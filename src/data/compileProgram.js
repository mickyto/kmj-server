import cmd from 'node-cmd';
import fs from 'fs';

const compileProgram = (code) => {
    return new Promise((resolve, reject) => {

        fs.writeFile("tmp/test.cpp", code, (err) => {
            if(err) reject(err);
            cmd.get('g++ -o tmp/test tmp/test.cpp', (err, data, stderr) => {
                if(stderr) resolve({ error: stderr })
                if (!stderr) {
                    cmd.get('tmp/test < tmp/in.txt', (err, data, stderr) => {
                        if(stderr) resolve({ error: stderr })
                        if(data && data == 7)
                            resolve({ output: 'accepted' })


                        console.log('the result is : ', data)
                        console.log('the result error is : ', stderr)
                    });
                }
            });
        });
    })
};

export { compileProgram };
