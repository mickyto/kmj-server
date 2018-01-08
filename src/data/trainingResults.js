import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

import config from "../../config";
import { PupilTrainings, Op } from '../sequelize';

const getPupilResults = (id) => {
    return new Promise((resolve, reject) => {
        PupilTrainings.findAll({ where: { pupil_id : id}, })
            .then(results => resolve(results))
            .catch(error => reject(error));
    })
};

const getResultsCount = (args) => {
    return new Promise((resolve, reject) => {

        let pupilId;
        if (args.token) {
            const pupilData = jwt.verify(args.token, config.secret);
            pupilId = pupilData.id;
        }
        else if (args.pupilId) {
            pupilId = args.pupilId;
        }

        PupilTrainings.findAll({
            where: {
                pupil_id : pupilId,
                training_id: args.trainingId
            },
            attributes: ['status']
        })
            .then(results => {
                let incorrect = 0, correct = 0, fixed = 0, exIncorrect = 0, exCorrect = 0, exFixed = 0;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].status == 0) incorrect++;
                    else if (results[i].status == 1) correct++;
                    else if (results[i].status == 2) fixed++;
                    else if (results[i].status == 3) exIncorrect++;
                    else if (results[i].status == 4) exCorrect++;
                    else if (results[i].status == 5) exFixed++;
                }
                return resolve({ incorrect, correct, fixed, exIncorrect, exCorrect, exFixed })
            })
            .catch(error => reject(error));
    })
};

const getPupilTrainingResults = (args) => {
    return new Promise((resolve, reject) => {

        let pupilId;
        if (args.token) {
            const pupilData = jwt.verify(args.token, config.secret);
            pupilId = pupilData.id;
        }
        else if (args.pupilId) {
            pupilId = args.pupilId;
        }

        PupilTrainings.findAndCountAll({
            where: { pupil_id : pupilId, training_id: args.trainingId },
            order: [['date', 'DESC']],
            offset: args.offset,
            limit: args.limit
        })
            .then(results => resolve(results))
            .catch(error => reject(error));
    })
};

const addResult = (args) => {
    return new Promise((resolve, reject) => {
        if (!args.token) {
            resolve();
            return;
        }

        jwt.verify(args.token, config.secret, (err, decoded) => {
            if (err) reject(err);
            if (!decoded.id) {
                resolve();
                return;
            }
            const data = {
                pupil_id: decoded.id,
                training_id: args.trainingId,
                tex: args.tex,
                status: args.pupilAnswer.replace(/ /g,'') == args.rightAnswer.replace(/ /g,''),
                pupil_answer: args.pupilAnswer,
                right_answer: args.rightAnswer
            };
            PupilTrainings.create(data)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    })
};

const resetLevel = (args) => {
    return new Promise((resolve, reject) => {

        jwt.verify(args.token, config.secret, (err, decoded) => {
            if (err) reject(err);
            if (!decoded.id) {
                resolve();
                return;
            }

            PupilTrainings.findAll({ where: {
                pupil_id: decoded.id,
                training_id: args.trainingId,
                status: { [Op.lte]: 2 }
            }})
                .then(results => {

                    results.forEach(result => {
                        result.update({ status: Sequelize.literal('status +3') })
                        resolve(1)
                    })
                })
                .catch(error => reject(error));
        });
    })
};

export { getPupilResults, getPupilTrainingResults, addResult, resetLevel, getResultsCount };
