import jwt from 'jsonwebtoken';

import config from "../../config";
import { Pupils, Works, Groups } from '../sequelize';

const getPupils = (show, group) => {
    return new Promise((resolve, reject) => {

        if (group == 0) {
            Pupils.findAll({ include: [{ model: Works, as: 'works' }]})
                .then(pupils => resolve(pupils.filter(pupil => pupil.works[0])))
                .catch(error => reject(error));
            return;
        }

        if (group) {
            Groups.findById(group)
                .then(group => resolve(group.getPupils()))
                .catch(error => reject(error));
            return;
        }

        let query;
        if (show && show === 'trashed')
            query = { where: { status : 'trashed' }};
        else if (show === 'active')
            query = { where: { status : null }};
        else
            query = {};

        Pupils.findAll(query)
            .then(pupils => resolve(pupils))
            .catch(error => reject(error));
    })
};

const getPupil = (id, token) => {
    return new Promise((resolve, reject) => {

        let pupilId = id;

        if (token) {
            const decoded = jwt.verify(token, config.secret);
            pupilId = decoded.id;
        }

        Pupils.findById(pupilId)
            .then(pupil => resolve(pupil))
            .catch(error => reject(error));
    })
};

const getPupilGroups = id => {
    return new Promise((resolve, reject) => {
        Pupils.findById(id)
            .then(pupil => resolve(pupil.getGroups()))
            .catch(error => reject(error));
    })
};

const getPupilsByClientId = id => {
    return new Promise((resolve, reject) => {
        Pupils.findAll({ where: { client_id: id }})
            .then(pupils => resolve(pupils))
            .catch(error => reject(error));
    })
};

const getPupilExercises = (id, workId) => {
    return new Promise((resolve, reject) => {
        Pupils.findById(id)
            .then(pupil => pupil.getExercises({ include: [ Works ] })
                .then(exercises => {
                    if (workId) {
                        const filtered = exercises.filter(exercise => {
                            return exercise.works.filter(work => work.id == workId).length > 0
                        });
                        return resolve(filtered)
                    }
                    return resolve(exercises)
                }))
            .catch(error => reject(error));
    })
};

const addOrEditPupil = args => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Pupils.findById(args.id)
                .then(pupil => {
                    Pupils.update(args, { where: { pupil_id: args.id }});
                    pupil.setGroups(args.groups);
                    return resolve(pupil);
                })
                .catch(error => reject(error));
        }
        else if (!args.client_id) {
            resolve({error: 'Ошибка. Вы пытаетесь создать ученика без клиента'});
        }
        else {
            Pupils.create(args)
                .then(pupil => {
                    pupil.addGroups(args.groups);
                    return resolve(pupil)
                })
                .catch(error => reject(error));
        }
    });
};

const movePupil = ({ id, operation }) => {
    return new Promise((resolve, reject) => {

        if (operation === 'move') {
            Pupils.update({ status: 'trashed' }, { where: { pupil_id: id }})
                .then(result => resolve(result))
                .catch(error => reject(error));
        }
        else if (operation === 'recovery') {
            Pupils.update({ status: null }, { where: { pupil_id: id }})
                .then(result => resolve(result))
                .catch(error => reject(error));
        }
        else if (operation === 'remove') {
            Pupils.destroy({ where: { pupil_id: id }})
                .then(result => resolve(result))
                .catch(error => reject(error))
        }
        else {
            resolve({error: 'Ошибка операции'});
        }
    });
};

export { getPupils, getPupil, addOrEditPupil, movePupil, getPupilGroups, getPupilsByClientId, getPupilExercises };
