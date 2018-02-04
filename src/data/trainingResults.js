import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

import config from "../../config";
import { PupilTrainings, Trainings, FavoriteTrainings, Op } from '../sequelize';

const getPupilResults = (id) => {
    return new Promise((resolve, reject) => {
        PupilTrainings.findAll({ where: { pupil_id : id}, })
            .then(results => resolve(results))
            .catch(error => reject(error));
    })
};

const getResultsCount = ({ trainingId, pupilId, token }) => {
    return new Promise((resolve, reject) => {

        if (!token && !pupilId) return resolve();
        if (token) {
            const pupilData = jwt.verify(token, config.secret);
            pupilId = pupilData.id;
        }

        PupilTrainings.findAll({
            where: {
                pupil_id : pupilId,
                training_id: trainingId
            },
            attributes: ['status']
        })
            .then(results => {
                let incorrect = 0, correct = 0, fixed = 0, exIncorrect = 0, exCorrect = 0, exFixed = 0, changed = 0, exChanged = 0;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].status == 0) incorrect++;
                    else if (results[i].status == 1) correct++;
                    else if (results[i].status == 2) fixed++;
                    else if (results[i].status == 3) exIncorrect++;
                    else if (results[i].status == 4) exCorrect++;
                    else if (results[i].status == 5) exFixed++;
                    else if (results[i].status == 6) changed++;
                    else if (results[i].status == 9) exChanged++;
                }
                return resolve({ incorrect, correct, fixed, exIncorrect, exCorrect, exFixed, changed, exChanged })
            })
            .catch(error => reject(error));
    })
};

const getPupilTrainingResults = ({ trainingId, pupilId, token, offset, limit }) => {
    return new Promise((resolve, reject) => {

        if (token) {
            const pupilData = jwt.verify(token, config.secret);
            pupilId = pupilData.id;
        }

        PupilTrainings.findAndCountAll({
            where: { pupil_id : pupilId, training_id: trainingId },
            order: [['date', 'DESC']],
            offset: offset,
            limit: limit
        })
            .then(results => resolve(results))
            .catch(error => reject(error));
    })
};

const addResult = args => {
    return new Promise((resolve, reject) => {

        if (!args.token)
            return resolve();

        const decoded = jwt.verify(args.token, config.secret);
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
    })
};

const changeStatus = id => {
    return new Promise((resolve, reject) => {
        PupilTrainings.findById(id)
            .then(result => {
                result.update({ status: 6 });
                resolve(1)
            })
            .catch(error => reject(error));
    })
};

const resetLevel = args => {
    return new Promise((resolve, reject) => {

        const decoded = jwt.verify(args.token, config.secret);

        PupilTrainings.findAll({ where: {
            pupil_id: decoded.id,
            training_id: args.trainingId,
            status: { [Op.or]: [{ [Op.lte]: 2 }, { [Op.eq]: 6 } ]}
        }})
            .then(results => {
                results.forEach(result => {
                    result.update({ status: Sequelize.literal('status +3') });
                    resolve(1);
                })
            })
            .catch(error => reject(error));
    })
};

const checkFavorite = (id, token) => {
    return new Promise((resolve, reject) => {

        if (!token) return resolve();

        const decoded = jwt.verify(token, config.secret);

        FavoriteTrainings.findOne({ where: {
            pupil_id: decoded.id,
            training_id: id
        }}).then(result => resolve(!!result))
            .catch(error => reject(error));
    })
};

const makeFavorite = args => {
    return new Promise((resolve, reject) => {

        const decoded = jwt.verify(args.token, config.secret);

        FavoriteTrainings.findOne({ where: {
            pupil_id: decoded.id,
            training_id: args.trainingId
        }}).then(result => {

            if (!result)
                FavoriteTrainings.create({
                    pupil_id: decoded.id,
                    training_id: args.trainingId
                });
            else
                FavoriteTrainings.destroy({ where: {
                    pupil_id: decoded.id,
                    training_id: args.trainingId
                }})
        }).catch(error => reject(error));;

        resolve(1)
    });
};

export { getPupilResults, getPupilTrainingResults, addResult,
    changeStatus, resetLevel, getResultsCount, makeFavorite, checkFavorite };
