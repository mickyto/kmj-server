import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

import config from "../../config";
import { Works, Pupils, WorkContents, WorkTrainings } from '../sequelize';

const getWorks = (token) => {
    return new Promise((resolve, reject) => {

        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) reject(err);
                if (!decoded.id) {
                    resolve();
                    return;
                }
                Pupils.findById(decoded.id)
                    .then(pupil => resolve(pupil.getWorks()))
                    .catch(error => reject(error));
            });
            return;
        }

        Works.findAll()
            .then(works => resolve(works))
            .catch(error => reject(error))
    })
};

const getWork = (id) => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(work))
            .catch(error => reject(error))
    })
};

const getWorkExercises = (id) => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(
                work.getExercises(
                    { order: [[ Sequelize.literal('work_contents.sort'), 'ASC' ]]})
                )
            )
            .catch(error => reject(error))
    })
};

const getWorkTrainings = (id) => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(
                work.getTrainings(
                    { order: [[ Sequelize.literal('work_trainings.sort'), 'ASC' ]]})
                )
            )
            .catch(error => reject(error))
    })
};

const getWorkPupils = (id) => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(work.getPupils()))
            .catch(error => reject(error))
    })
};

const addOrEditWork = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Works.findById(args.id)
                .then(work => {
                    work.update({ title: args.title });
                    work.setPupils(args.pupils);

                    if (args.exercises)
                        work.setExercises(args.exercises);
                    if (args.trainings)
                        work.setTrainings(args.trainings);

                    resolve(work)
                })
                .catch(error => reject(error));
            return;
        }

        Works.create({ title: args.title })
            .then(work => {
                work.addPupils(args.pupils);

                if (args.exercises)
                    work.setExercises(args.exercises);
                if (args.trainings)
                    work.setTrainings(args.trainings);

                resolve(work)
            })
            .catch(error => reject(error));
    });
};

const sortExercises = (args) => {
    return new Promise((resolve, reject) => {

        WorkContents.count({ where: { id: args.id }})
            .then(count => {

                if (count != 0) {
                    args.sort.forEach(item => {
                        WorkContents.update({ sort: item.order }, { where: { work_id: args.id, exercise_id: item.id }})
                    });
                }
                else {
                    args.sort.forEach(item => {
                        WorkTrainings.update({ sort: item.order }, { where: { work_id: args.id, training_id: item.id }})
                    });
                }
            })
            .catch(error => reject(error));
        resolve(1)
    })
};

export { getWorks, getWork, getWorkExercises, getWorkPupils,  addOrEditWork, sortExercises, getWorkTrainings };
