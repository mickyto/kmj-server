import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

import config from "../../config";
import { PupilTrainings, Op } from '../sequelize';

const getResultsCount = ({ trainingId, pupilId, token }) => new Promise((resolve, reject) => {

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
});

const getPupilTrainingResults = ({ trainingId, pupilId, offset, limit }) => new Promise((resolve, reject) => {

    const query = {
        where: { status: { [Op.or]: [6, 9] }},
        order: [['date', 'DESC']],
        offset: offset,
        limit: limit
    };

    if (trainingId && pupilId)
        query.where = { pupil_id : pupilId, training_id: trainingId };

    PupilTrainings.findAll(query)
        .then(results => resolve(results))
        .catch(error => reject(error));
});

const addResult = args => new Promise((resolve, reject) => {

    if (!args.token) return resolve();

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
});

const changeStatus = id => new Promise((resolve, reject) => {

    PupilTrainings.update({ status: 6 }, { where: { id }})
        .then(result => resolve(result))
        .catch(error => reject(error));
});

const resetLevel = args => new Promise((resolve, reject) => {

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
});

const checkChangedResult = ({ id, isAccepted }) => new Promise((resolve, reject) => {

    PupilTrainings.findById(id, { attributes: ['id', 'status'] })
        .then(result => {
            const status = isAccepted ? result.status - 5 : result.status - 6;
            result.update({ status });
            resolve({ id, status })
        })
        .catch(error => reject(error));
});

export { getPupilTrainingResults, addResult, checkChangedResult,
    changeStatus, resetLevel, getResultsCount };
