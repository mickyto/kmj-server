import cmd from 'node-cmd';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import config from "../../config";
import { Exercises } from '../sequelize';

function asyncLoop(iterations, func) {
    var index = 0;
    var done = false;
    var loop = {
        next: () => {
            if (done) return;
            if (index < iterations) {
                index++;
                func(loop);
            }
            else
                done = true;
        },
        iteration: () => index - 1,
        break: () => done = true
    };
    loop.next();
    return loop;
}

const compileProgram = ({ code, token, attempt, exercise_id }) => {
    return new Promise((resolve, reject) => {

        const file = `tmp/${token}.cpp`;

        fs.writeFile(file, code, () => {
            Exercises.findById(exercise_id)
                .then(exercise => {

                    const decoded = jwt.verify(token, config.secret);
                    const d = new Date();
                    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

                    exercise.addPupil(decoded.id, {
                        through: {
                            program: code,
                            attempt,
                            status: 0,
                            date: new Date(utc + (3600000 * 3)).toISOString()
                        }
                    });

                    exercise.getTests()
                        .then(tests => {

                            cmd.get(`g++ -o tmp/${token} ${file}`, (err, data, stderr) => {
                                if(stderr) {
                                    if (fs.existsSync(file)) fs.unlinkSync(file);
                                    return resolve({ error: 'Ваш код не компилируется, проверьте синтаксис' });
                                }
                                asyncLoop(tests.length, function(loop) {

                                    const i = loop.iteration();
                                    const testFile = `tmp/test${exercise_id}${i}.txt`;

                                    fs.writeFileSync(testFile, tests[i].cin);
                                    cmd.get(`tmp/${token} < tmp/test${exercise_id}${i}.txt`, (err, data) => {

                                        if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

                                        const testOut = tests[i].cout;

                                        if (data == testOut || testOut.length > 0 &&
                                            ((testOut.substr(testOut.length - 1) == ' ' || testOut.substr(testOut.length - 1) == '↵') && data == testOut.slice(0, -1))
                                        ) {
                                            if (tests.length - (i + 1) !== 0) {
                                                loop.next();
                                                return;
                                            }
                                            if (fs.existsSync(file)) fs.unlinkSync(file);
                                            if (fs.existsSync(`tmp/${token}`)) fs.unlinkSync(`tmp/${token}`);

                                            exercise.addPupil(decoded.id, { through: { status: 1 }});
                                            resolve({ output: 'accepted' });
                                            loop.break();
                                        }
                                        else {
                                            if (fs.existsSync(file)) fs.unlinkSync(file);
                                            if (fs.existsSync(`tmp/${token}`)) fs.unlinkSync(`tmp/${token}`);

                                            resolve({error: 'Ошибка в тесте № ' + (i + 1)});
                                            loop.break();
                                        }
                                    });
                                });
                            });
                        });
                })
                .catch(error => reject(error))
        });
    })
};

export { compileProgram };
