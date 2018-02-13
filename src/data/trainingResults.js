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

const getResultsCount = ({ trainingId, pupilId, token }) => {
    return new Promise((resolve, reject) => {

        if (!token && !pupilId) return resolve();
        if (token) {
            const pupilData = jwt.verify(token, config.secret);
            pupilId = pupilData.id;
        }

        PupilTrainings.findAll({
            where: { pupil_id : pupilId, training_id: trainingId },
            attributes: [
                [Sequelize.fn('SUM', Sequelize.literal('case when status=0 then 1 end')), 'incorrect'],
                [Sequelize.fn('SUM', Sequelize.literal('case when status=1 then 1 end')), 'correct'],
                [Sequelize.fn('SUM', Sequelize.literal('case when status=2 then 1 end')), 'fixed'],
                [Sequelize.fn('SUM', Sequelize.literal('case when status=3 then 1 end')), 'exIncorrect'],
                [Sequelize.fn('SUM', Sequelize.literal('case when status=4 then 1 end')), 'exCorrect'],
                [Sequelize.fn('SUM', Sequelize.literal('case when status=5 then 1 end')), 'exFixed'],
                [Sequelize.fn('SUM', Sequelize.literal('case when status=6 then 1 end')), 'changed'],
                [Sequelize.fn('SUM', Sequelize.literal('case when status=9 then 1 end')), 'exChanged']
            ]
        })
            .then(results => resolve(results[0].dataValues))
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

export { getPupilResults, getPupilTrainingResults, addResult, changeStatus, resetLevel, getResultsCount };
