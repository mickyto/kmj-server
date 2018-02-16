import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

import config from "../../config";
import { Op, Works, Pupils, Themes, WorkContents, TrainingGroups, Groups, GroupWorks, Subjects, Trainings, Exercises, WorkTrainings } from '../sequelize';

const getWorks = ({ id, token, group, type, withForeign }) => {
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
                where: { [Op.or]: [
                    { id: Sequelize.col('exercises->work_contents.work_id') },
                    { id: Sequelize.col('trainings->work_trainings.work_id') }
                ]},
                attributes: { include: [
                    [Sequelize.fn('COUNT', Sequelize.col('exercises.exercise_id')), 'exercisesCount'],
                    [Sequelize.fn('COUNT', Sequelize.col('trainings.training_id')), 'trainingsCount']
                ]},
                group: ['works.work_id'],
                order: [[Groups, GroupWorks, 'given_at', 'ASC']],
            })
                .then(works => resolve(works))
                .catch(error => reject(error));
            return;
        }

        if (token) {
            const decoded = jwt.verify(token, config.secret);
            id = decoded.id;
        }

        const query = {
            include: [
                { model: Trainings/*, attributes: ['id', 'speed', 'training_group_id'], through: { attributes: [] }*/},
                { model: Exercises },
            ],
            attributes: { include: [
                [Sequelize.fn('COUNT', Sequelize.col('exercises.exercise_id')), 'exercisesCount'],
                [Sequelize.fn('COUNT', Sequelize.col('trainings.training_id')), 'trainingsCount']
            ]},
            group: ['works.work_id'],
        };

        if (!withForeign)
            query.where = {
                [Op.or]: [
                    {id: Sequelize.col('exercises->work_contents.work_id')},
                    {id: Sequelize.col('trainings->work_trainings.work_id')}
                ]
            };
        else
            query.include.push(
                { model: Pupils, as: 'executors', attributes: ['id'], through: { attributes: ['grade'] }, where: { id: id }, required: false }
            );

        Works.findAll({
            ...query, include: [
                ...query.include,
                { model: Groups, attributes: ['id', 'title'], through: { attributes: ['id', 'work_id'] }, include: [{
                    model: Pupils, where: { id }, attributes: ['id'], through: { attributes: [] }
                }], required: true }
            ]
        }).then(groupWorks => {

            Works.findAll({
                ...query, include: [
                    ...query.include,
                    { model: Pupils, as: 'pupils', where: { id }, attributes: ['id'], through: { attributes: ['work_id'] }}
                ]
            }).then(pupilWorks => resolve([...groupWorks, ...pupilWorks]))
        })
            .catch(error => reject(error));
    })
};

const getWorkGroups = id => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(work.getGroups()))
            .catch(error => reject(error))
    })
};

const getWork = ({ id, token, pupil }) => {
    return new Promise((resolve, reject) => {

        const query = {
            include: [
                { model: Exercises },
                { model: Trainings },
                { model: Subjects }
            ],
            order: [[Exercises, WorkContents, 'sort'], [Trainings, WorkTrainings, 'sort']]
        };

        if (token || pupil) {

            if (token) {
                const decoded = jwt.verify(token, config.secret);
                pupil = decoded.id;
            }

            query.include[0].include = [
                { model: Themes },
                {
                    model: Pupils,
                    as: 'pupils',
                    required: false,
                    where: { id: pupil },
                    attributes: ['id'],
                    //through: { attributes: ['status']}
                }
            ];
        }

        Works.findById(id, query)
            .then(work => resolve(work))
            .catch(error => reject(error))
    })
};


const getWorkPupils = ({ id, group, pupil }) => {
    return new Promise((resolve, reject) => {

        if (!group && !pupil) {
            Works.findById(id)
                .then(work => resolve(work.getPupils()))
                .catch(error => reject(error));
            return;
        }

        Works.count({ where: { id }, include: [{
            model: Exercises, where: { start: { [Op.not]: '' }}
        }]})
            .then(count => {
                const query = {
                    attributes: ['id', 'fio',
                        [Sequelize.fn('COUNT', Sequelize.col('exercises->work_executions.status')), 'solvedCount']
                    ],
                    include: [{
                        model: Exercises,
                        attributes: [],
                        as: 'exercises',
                        through: { where: { status: true }},
                        include: [{ model: Works, attributes: [], where: { work_id: id }}]
                    }, {
                        model: Trainings,
                        as: 'trainings',
                        attributes: ['id', 'speed',
                            [Sequelize.fn('SUM', Sequelize.literal('case when `trainings->pupil_trainings`.`status`=0 then 1 end')), 'incorrect'],
                            [Sequelize.fn('SUM', Sequelize.literal('case when `trainings->pupil_trainings`.`status`=1 then 1 end')), 'correct'],
                            [Sequelize.fn('SUM', Sequelize.literal('case when `trainings->pupil_trainings`.`status`=6 then 1 end')), 'changed'],
                        ],
                        through: { attributes: [] },
                        include: [{ model: Works, attributes: [], where: { work_id: id }}]
                    }],
                    group: ['pupils.pupil_id', 'trainings.training_id'],
                    required: true,
                };

                if (pupil)
                    query.where = { id: pupil };
                else
                    query.include.push(
                        { model: Groups, attributes: [], where: { group_id: group }}
                    );

                if (count != 0)
                    query.attributes.push(
                        [Sequelize.fn('SUM', Sequelize.literal('case when attempt = 1 then 2 when attempt = 2 then 1.5 else 1 end')), 'points']
                    );

                Pupils.findAll(query)
                    .then(pupils => resolve(pupils))
                    .catch(error => reject(error))
            }).catch(error => reject(error));
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

export { getWorks, getWork, getWorkPupils, getWorkGroups, addOrEditWork, sortExercises, setGroupWorkDates };




