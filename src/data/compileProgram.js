import cmd from 'node-cmd';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import config from "../../config";
import { Exercises } from '../sequelize';


const compileProgram = ({ code, token, exercise_id }) => {
    return new Promise((resolve, reject) => {

        const file = `tmp/${token}.cpp`;

        fs.writeFileSync(file, code);

        Exercises.findById(exercise_id)
            .then(exercise => {

                const decoded = jwt.verify(token, config.secret);

                exercise.addPupil(decoded.id, { through: { program: code, status: 0 }});

                exercise.getTests()
                    .then(tests => {

                        cmd.get(`g++ -o tmp/${token} ${file}`, (err, data, stderr) => {
                            if(stderr) {
                                fs.unlinkSync(file);
                                return resolve({ error: 'Ваш код не компилируется, проверьте синтаксис' });
                            }
                            for (let i = 0; i < tests.length; i++) {

                                const testFile = `tmp/test${exercise_id}${i}.txt`;

                                fs.writeFileSync(testFile, tests[i].cin);
                                cmd.get(`tmp/${token} < tmp/test${exercise_id}${i}.txt`, (err, data) => {

                                    fs.unlinkSync(testFile);

                                    if(data && data == tests[i].cout) {
                                        if (tests.length - (i + 1) !== 0) return;
                                        fs.unlinkSync(file);
                                        fs.unlinkSync(`tmp/${token}`);
                                        exercise.addPupil(decoded.id, { through: { status: 1 }});
                                        return resolve({ output: 'accepted' });
                                    }
                                    else {
                                        fs.unlinkSync(file);
                                        fs.unlinkSync(`tmp/${token}`);
                                        return resolve({ error: 'Ошибка после теста № ' + (i + 1) });
                                    }
                                });
                            }
                        });
                    });
            })
            .catch(error => reject(error))
    })
};

export { compileProgram };
