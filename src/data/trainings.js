import jwt from 'jsonwebtoken';
import config from "../../config";
import { Trainings, PupilTrainings, Pupils, Op } from '../sequelize';

const getTrainings = ({ token, training_group }) => {
    return new Promise((resolve, reject) => {

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
    })
};

const getTraining = (id) => {
    return new Promise((resolve, reject) => {
        Trainings.findById(id)
            .then(training => resolve(training))
            .catch(error => reject(error))
    })
};

const getTrainingPupils = (id) => {
    return new Promise((resolve, reject) => {
        PupilTrainings.aggregate('pupil_id', 'DISTINCT', { plain: false, where: { training_id: id } })
            .then(ids => {
                ids = ids.map(item => item.DISTINCT);
                Pupils.findAll({ where: { id: { [Op.in]: ids } }})
                    .then(pupils => resolve(pupils))
            })
            .catch(error => reject(error))
    })
};

const addOrEditTraining = (args) => {
    return new Promise((resolve, reject) => {

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
};

export { getTrainings, getTraining, addOrEditTraining, getTrainingPupils };
