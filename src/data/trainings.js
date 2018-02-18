import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import config from "../../config";
import { Trainings, Pupils } from '../sequelize';

const getTrainings = ({ token, training_group }) => new Promise((resolve, reject) => {

    const query = { where: { is_active: 1 }, order: [[ 'sort', 'ASC']] };
    if (training_group) {
        query.where.training_group_id = training_group
    }
    if (token) {
        const decoded = jwt.verify(token, config.secret);
        if (decoded.role) {
            delete query.where.is_active
        }
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
