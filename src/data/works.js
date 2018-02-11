import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

import config from "../../config";
import { Op, Works, Pupils, WorkContents, TrainingGroups, Groups, GroupWorks, Subjects, Trainings, Exercises, WorkTrainings } from '../sequelize';

const getWorks = ({ id, token, group, type }) => {
    return new Promise((resolve, reject) => {

        if (!id && !token && !group) {

            if (type === 'math')
                Works.findAll({
                    include: [{
                        model: Trainings,
                        attributes: [],
                        required: true,
                        include: [{
                            model: TrainingGroups,
                            required: true,
                            include: [{
                                model: Subjects,
                                where: {
                                    title: 'Математика'
                                },
                            }]
                        }]
                    }, {
                        model: Groups,
                        attributes: ['id', 'title'],
                    }],
                    attributes: ['id', 'title', [Sequelize.fn('COUNT', Sequelize.col('trainings.training_id')), 'trainingsCount']],
                    group: ['works.work_id']
                }).then(works => resolve(works))
                    .catch(error => reject(error));
            else if (type === 'inf')
                Works.findAll({
                    include: [{
                        model: Exercises,
                        attributes: [],
                        required: true,
                    }],
                    attributes: ['id', 'title', [Sequelize.fn('COUNT', Sequelize.col('exercises.exercise_id')), 'exercisesCount']],
                    group: ['works.work_id']
                }).then(exerciseWorks => {
                    Works.findAll({
                        include: [{
                            model: Trainings,
                            attributes: [],
                            required: true,
                            include: [{
                                model: TrainingGroups,
                                required: true,
                                include: [{
                                    model: Subjects,
                                    where: {
                                        title: 'Информатика'
                                    },
                                }]
                            }]
                        }],
                        attributes: ['id', 'title', [Sequelize.fn('COUNT', Sequelize.col('trainings.training_id')), 'trainingsCount']],
                        group: ['works.work_id']
                    }).then(trainingWorks => resolve([...exerciseWorks, ...trainingWorks]))
                }).catch(error => reject(error));
            else if (type === 'foreign')
                Works.findAll({
                    include: [{
                        model: Pupils,
                        attributes: [],
                        as: 'executors',
                        required: true
                    }]
                }).then(works => resolve(works))
                    .catch(error => reject(error));
            return;
        }

        if (group) {
            Works.findAll({
                include: [
                    { model: Trainings, attributes: [] },
                    { model: Exercises, attributes: [] },
                    { model: Groups, where: { id: group }, attributes: ['id']}
                ],
                attributes: { include: [
                    [Sequelize.fn('COUNT', Sequelize.col('exercises.exercise_id')), 'exercisesCount'],
                    [Sequelize.fn('COUNT', Sequelize.col('trainings.training_id')), 'trainingsCount']
                ]},
                group: ['works.work_id'],
                order: [[Groups, GroupWorks, 'given_at', 'ASC']]
            })
                .then(works => resolve(
                    works.filter(({ dataValues }) => dataValues.exercisesCount || dataValues.trainingsCount))
                )
                .catch(error => reject(error));
            return;
        }

        if (token) {
            const decoded = jwt.verify(token, config.secret);
            id = decoded.id;
        }

        Works.findAll({
            include: [
                { model: Trainings },
                { model: Exercises },
                { model: Groups, include: [{
                    model: Pupils, attributes: [], where: { id: id }
                }], required: true }
            ]
        })
            .then(groupWorks => {
                Works.findAll({
                    include: [
                        { model: Trainings },
                        { model: Exercises },
                        { model: Pupils, attributes: [], as: 'pupils', where: { id }}
                    ]
                })
                    .then(pupilWorks => resolve([...groupWorks, ...pupilWorks]))
            })
            .catch(error => reject(error));
    })
};

const getWork = id => {
    return new Promise((resolve, reject) => {
        Works.findById(id, {
            include: [Exercises, Trainings, Subjects],
            order: [[Exercises, WorkContents, 'sort'], [Trainings, WorkTrainings, 'sort']]
        })
            .then(work => resolve(work))
            .catch(error => reject(error))
    })
};

const getWorkPupils = id => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(work.getPupils()))
            .catch(error => reject(error))
    })
};

const getGroupPupils = (id, group) => {
    return new Promise((resolve, reject) => {

        Works.count({ where: { id }, include: [{
            model: Exercises, where: { start: { [Op.not]: '' }}, required: true
        }]})
            .then(count => {
                const query = {
                    attributes: ['id', 'fio',
                        [Sequelize.fn('SUM', Sequelize.col('exercises->work_executions.status')), 'solvedCount']
                    ],
                    include: [{
                        model: Groups,
                        attributes: [],
                        where: { group_id: group }
                    }, {
                        model: Exercises,
                        attributes: ['id'],
                        include: [{
                            model: Works,
                            attributes: [],
                            where: { work_id: id }
                        }]
                    }, {
                        model: Trainings,
                        as: 'trainings',
                        attributes: ['id', 'speed'],
                        include: [{
                            model: Works,
                            attributes: [],
                            where: { work_id: id }
                        }]
                    }],
                    group: ['pupils.pupil_id', 'trainings.training_id'],
                    required: true,
                };

                if (count != 0)
                    query.attributes.push([Sequelize.fn('SUM', Sequelize.col('exercises->work_executions.attempt')), 'attemptCount']);

                Pupils.findAll(query).then(pupils => resolve(pupils))
                    .catch(error => reject(error))
            });
    })
};

const addOrEditWork = args => {
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
                    work.setSubject(args.subject);

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
                work.setSubject(args.subject);

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

const sortExercises = args => {
    return new Promise((resolve, reject) => {
        Works.findById(args.id)
            .then(work => {
                work.hasExercises(args.sort[0].id)
                    .then(res => {
                        if (res) {
                            args.sort.forEach(sort => {
                                WorkContents.update({ sort: sort.order }, { where: { work_id: args.id, exercise_id: sort.id }})
                            })
                        }
                    });
                work.hasTrainings(args.sort[0].id)
                    .then(res => {
                        if (res) {
                            args.sort.forEach(sort => {
                                WorkTrainings.update({ sort: sort.order }, { where: { work_id: args.id, training_id: sort.id }})
                            })
                        }
                    });
            })
            .catch(error => reject(error));
        resolve(1)
    })
};

const setGroupWorkDates = args => {
    return new Promise((resolve, reject) => {
        GroupWorks.findAll({ where: { work_id: args.id }})
            .then(groups => {
                groups.forEach(group => {
                    const date = args.dates.find(date => date.id == group.group_id);
                    group.update({ date: new Date(date.date) })
                });
            })
            .catch(error => reject(error));
        resolve(1)
    })
};

export { getWorks, getWork, getWorkPupils, getGroupPupils, addOrEditWork, sortExercises, setGroupWorkDates };




