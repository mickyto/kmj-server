import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

import config from "../../config";
import { Works, Pupils, WorkContents, Groups, GroupWorks, Trainings, Exercises } from '../sequelize';

const getWorks = ({ id, token, group }) => {
    return new Promise((resolve, reject) => {

        if (group == 0) {
            Works.findAll({ include: [{ model: Pupils, as: 'pupils' }]})
                .then(works => resolve(works.filter(work => work.pupils[0])))
                .catch(error => reject(error));
            return;
        }

        if (!id && !token && !group) {
            Works.findAll()
                .then(works => resolve(works))
                .catch(error => reject(error));
            return;
        }

        if (group) {
            Groups.findById(group)
                .then(group => group.getWorks({ include: [Exercises, Trainings], attribute: ['exercises', 'trainings'] })
                    .then(works => resolve(works.filter(work => work.exercises[0] || work.trainings[0]))));
            return;
        }

        if (token) {
            const decoded = jwt.verify(token, config.secret);
            id = decoded.id;
        }

        Pupils.findById(id, { include: [Groups] })
            .then(pupil => {

                const promises = [pupil.getWorks()];
                pupil.groups.forEach(group => promises.push(group.getWorks()));
                Promise.all(promises).then(values => {

                    const works = [];
                    values.forEach(values => values.forEach(value => {
                        const flag = works.find(work => work.id == value.id);
                        if (!flag)
                            works.push(value)
                    }));
                    return resolve(works);
                });
            })
            .catch(error => reject(error));
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
                work.getGroups({ include: [{
                    model: Pupils,
                    attributes: ['id', 'fio']
                }], where: { id: group }}).then(groups => {

                    const pupils = groups[0] ? groups[0].pupils.map(pupil => {
                            pupil.pupil_works = groups[0].group_works;
                            return pupil
                        }) : [];
                    return resolve(pupils)
                })
            })
            .catch(error => reject(error))
    })
};

const getWorkGroups = (id, { pupil, token }) => {
    return new Promise((resolve, reject) => {

        let pupilId = pupil;

        if (token) {
            const decoded = jwt.verify(token, config.secret);
            pupilId = decoded.id;
        }

        Works.findById(id)
            .then(work => work.getGroups({ include: [Pupils] })
                .then(groups => {
                    if (pupilId){
                        const exact = groups.find(group => group.pupils.find(item => item.id == pupilId));
                        if (exact)
                            return resolve([exact])
                    }
                    return resolve(groups)
                })
            )
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
