import jwt from 'jsonwebtoken';

import config from "../../config";
import { Works, Pupils } from '../sequelize';

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
            .then(work => resolve(work.getExercises()))
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
                    work.setExercises(args.exercises);
                    work.setPupils(args.pupils);
                    resolve(work)
                })
                .catch(error => reject(error))
            return;
        }

        Works.create({ title: args.title })
            .then(work => {
                work.addPupils(args.pupils);
                work.addExercises(args.exercises);
                resolve(work)
            })
            .catch(error => reject(error));
    });
};

const removeWork = (id) => {
    return new Promise((resolve, reject) => {
        Works.destroy({ where: { work_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getWorks, getWork, getWorkExercises, getWorkPupils,  addOrEditWork, removeWork };
