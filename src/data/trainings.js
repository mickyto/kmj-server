import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import config from "../../config";
import { Trainings, Pupils } from '../sequelize';

const getTrainings = ({ token, training_group }) => new Promise((resolve, reject) => {

    const query = { where: { is_active: 1, training_group_id: training_group }, order: [[ 'sort', 'ASC']] };

    if (token) {
        const decoded = jwt.verify(token, config.secret);
        if (decoded.role)
            delete query.where.is_active;
    }

    Trainings.findAll(query)
        .then(trainings => resolve(trainings))
        .catch(error => reject(error))
});

const getTraining = ({ id, token }) => new Promise((resolve, reject) => {

    let query = {};

    if(token) {

        const decoded = jwt.verify(token, config.secret);

        query = { include: [
            {
                model: Pupils,
                as: 'admirer',
                where: { id: decoded.id },
                required: false,
                attributes: ['id'],
                through: { attributes: [] }
            },
            {
                model: Pupils,
                as: 'pupils',
                where: { id: decoded.id },
                required: false,
                through: { attributes: []},
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.literal('case when `pupils->pupil_trainings`.`status`=0 then 1 end')), 'incorrect'],
                    [Sequelize.fn('SUM', Sequelize.literal('case when `pupils->pupil_trainings`.`status`=1 then 1 end')), 'correct'],
                    [Sequelize.fn('SUM', Sequelize.literal('case when `pupils->pupil_trainings`.`status`=2 then 1 end')), 'fixed'],
                    [Sequelize.fn('SUM', Sequelize.literal('case when `pupils->pupil_trainings`.`status`=3 then 1 end')), 'exIncorrect'],
                    [Sequelize.fn('SUM', Sequelize.literal('case when `pupils->pupil_trainings`.`status`=4 then 1 end')), 'exCorrect'],
                    [Sequelize.fn('SUM', Sequelize.literal('case when `pupils->pupil_trainings`.`status`=5 then 1 end')), 'exFixed'],
                    [Sequelize.fn('SUM', Sequelize.literal('case when `pupils->pupil_trainings`.`status`=6 then 1 end')), 'changed'],
                    [Sequelize.fn('SUM', Sequelize.literal('case when `pupils->pupil_trainings`.`status`=9 then 1 end')), 'exChanged']
                ]
            }
        ]}
    }

    Trainings.findById(id, query)
        .then(training => resolve(training))
        .catch(error => reject(error))
});

const getTrainingPupils = id => new Promise((resolve, reject) => {
    Trainings.findById(id)
        .then(training => resolve(training.getPupils({ group: 'pupils.pupil_id' })))
        .catch(error => reject(error));
});

const addOrEditTraining = args => new Promise((resolve, reject) => {

    if (args.id) {
        Trainings.update(args, { where: { training_id: args.id }})
            .then(training => resolve(training))
            .catch(error => reject(error));
        return;
    }

    Trainings.create(args)
        .then(training => resolve(training))
        .catch(error => reject(error));
});

export { getTrainings, getTraining, addOrEditTraining, getTrainingPupils };
