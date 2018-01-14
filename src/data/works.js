import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

import config from "../../config";
import { Works, Pupils, WorkContents, WorkTrainings, Groups, GroupWorks } from '../sequelize';

const getWorks = token => {
    return new Promise((resolve, reject) => {

        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) reject(err);
                if (!decoded.id) {
                    resolve();
                    return;
                }
                Pupils.findById(decoded.id, { include: [Groups] })
                    .then(pupil => {

                        const promises = [pupil.getWorks()];
                        pupil.groups.forEach(group => promises.push(group.getWorks()));
                        Promise.all(promises).then(values => {

                            const works = [];
                            values.forEach(values => values.forEach(value => {
                                let flag = true;
                                works.forEach(work => {
                                    if (work.id == value.id)
                                        flag = false;
                                });
                                if (flag)
                                    works.push(value)
                            }));
                            return resolve(works);
                        });
                    })
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

const getWorkPupils = (id, group) => {
    return new Promise((resolve, reject) => {

        if (group) {
            Works.findById(id)
                .then(work => resolve(work.getPupils({
                    include: [{ model: Groups, where: { id: group }}]
                })))
                .catch(error => reject(error));
            return;
        }

        Works.findById(id)
            .then(work => resolve(work.getPupils()))
            .catch(error => reject(error))
    })
};

const getGroupPupils = (id, group) => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => {
                work.getGroups({ include: [Pupils], where: { id: group }}).then(groups => {

                    let pupils = [];
                    if (groups[0]) {
                        pupils = groups[0].pupils.map(pupil => {
                            pupil.pupil_works = groups[0].group_works;
                            return pupil
                        });
                    }
                    return resolve(pupils)
                })
            })
            .catch(error => reject(error))
    })
};

const getWorkGroups = (id) => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(work.getGroups()))
            .catch(error => reject(error))
    })
};

const addOrEditWork = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Works.findById(args.id)
                .then(work => {
                    work.update({
                        title: args.title,
                        ...args.counts
                    });
                    work.setPupils(args.pupils);
                    work.setGroups(args.groups);

                    if (args.exercises)
                        work.setExercises(args.exercises);
                    if (args.trainings)
                        work.setTrainings(args.trainings);
                    if (args.grades) {
                        args.grades.forEach(item => {
                            work.addExecutor(item.id, { through: { grade: item.grade }})
                        })
                    }

                    resolve(work)
                })
                .catch(error => reject(error));
            return;
        }

        Works.create({
            title: args.title,
            ...args.counts
        })
            .then(work => {
                work.addPupils(args.pupils);
                work.addGroups(args.groups);

                if (args.exercises)
                    work.addExercises(args.exercises);
                if (args.trainings)
                    work.addTrainings(args.trainings);
                if (args.grades) {
                    args.grades.forEach(item => {
                        work.addExecutor(item.id, { through: { grade: item.grade }})
                    })
                }

                resolve(work)
            })
            .catch(error => reject(error));
    });
};

const sortExercises = (args) => {
    return new Promise((resolve, reject) => {
        WorkContents.findAll({ where: { work_id: args.id }})
            .then(works => {
                works.forEach(work => {
                    const sort = args.sort.find(sort => sort.id == work.exercise_id);
                    work.update({ sort: sort.order })
                });
            })
            .catch(error => reject(error));
        resolve(1)
    })
};

const setGroupWorkDates = (args) => {
    return new Promise((resolve, reject) => {
        GroupWorks.findAll({ where: { work_id: args.id }})
            .then(groups => {
                groups.forEach(group => {
                    const date = args.dates.find(date => date.id == group.group_id);
                    group.update({ date: new Date(date.date).toISOString() })
                });
            })
            .catch(error => reject(error));
        resolve(1)
    })
};

export { getWorks, getWork, getWorkExercises, getWorkPupils, getWorkGroups,
    getGroupPupils, addOrEditWork, sortExercises, getWorkTrainings, setGroupWorkDates };
