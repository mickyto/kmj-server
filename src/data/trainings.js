import { Trainings } from '../sequelize';

const getTrainings = (show) => {
    return new Promise((resolve, reject) => {
        const query = show ? { where: { subject_id : show }} : {};
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

const removeTraining = (id) => {
    return new Promise((resolve, reject) => {
        Trainings.destroy({ where: { training_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
};

export { getTrainings, getTraining, addOrEditTraining, removeTraining };
