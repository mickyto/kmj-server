import jwt from 'jsonwebtoken';

import config from "../../config";
import { PupilTrainings } from '../sequelize';

const getPupilResults = (id) => {
    return new Promise((resolve, reject) => {
        PupilTrainings.findAll({ where: { pupil_id : id}})
            .then(results => resolve(results))
            .catch(error => reject(error));
    })
};

const getPupilTrainingResults = (args) => {
    return new Promise((resolve, reject) => {

        if (!args.token) {
            resolve();
            return;
        }
        const pupilData = jwt.verify(args.token, config.secret);
        const pupilId = pupilData ? pupilData.id : '';

        PupilTrainings.findAll({ where: { pupil_id : pupilId, training_id: args.trainingId }})
            .then(results => resolve(results))
            .catch(error => reject(error));
    })
};

const addResult = (args) => {
    return new Promise((resolve, reject) => {
        console.log(args);
        if (!args.token) {
            resolve();
            return;
        }

        jwt.verify(args.token, config.secret, (err, decoded) => {
            if (err) reject(error);
            console.log(decoded.id);
            const data = {
                pupil_id: decoded.id,
                training_id: args.trainingId,
                tex: args.tex,
                pupil_answer: args.pupilAnswer,
                right_answer: args.rightAnswer
            };
            PupilTrainings.create(data)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    })
};

const clearPupilResults = (id) => {
    return new Promise((resolve, reject) => {
        PupilTrainings.destroy({ where: { pupil_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getPupilResults, getPupilTrainingResults, addResult, clearPupilResults };
