import { TrainingGroups } from '../sequelize';

const getTrainingGroups = (subject) => {


    const query = subject ? { where: { subject_id: subject }} : {};

    return new Promise((resolve, reject) => {
        TrainingGroups.findAll(query)
            .then(groups => resolve(groups))
            .catch(error => reject(error))
    })
};

const setTrainingGroup = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            TrainingGroups.update(args, { where: { id: args.id }})
                .then(group => resolve(group))
                .catch(error => reject(error));
            return;
        }

        TrainingGroups.create(args)
            .then(group => resolve(group))
            .catch(error => reject(error));
    });
};

const removeTrainingGroup = (id) => {
    return new Promise((resolve, reject) => {
        TrainingGroups.destroy({ where: { id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getTrainingGroups, setTrainingGroup, removeTrainingGroup };
