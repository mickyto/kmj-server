import { ProgExercises, Tests } from '../sequelize';

const getProgExercises = () => {
    return new Promise((resolve, reject) => {
        ProgExercises.findAll()
            .then(progExercises => resolve(progExercises))
            .catch(error => reject(error))
    })
};

const getProgExercise = (id) => {
    return new Promise((resolve, reject) => {
        ProgExercises.findById(id)
            .then(progExercise => resolve(progExercise))
            .catch(error => reject(error))
    })
};

const getTestsByProgExerciseId = (id) => {
    return new Promise((resolve, reject) => {
        Tests.findAll({ where: { prog_exercise_id: id }})
            .then(tests => resolve(tests))
            .catch(error => reject(error))
    })
};

const addOrEditProgExercise = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            ProgExercises.update(args, { where: { progExercise_id: args.id }})
                .then(progExercise => {
                    progExercise.setTests(args.tests);
                    return resolve(progExercise)
                })
                .catch(error => reject(error));
            return;
        }

        ProgExercises.create(args)
            .then(progExercise => {
                progExercise.addTests(args.tests);
                return resolve(progExercise)
            })
            .catch(error => reject(error));
    });
};

const removeProgExercise = (id) => {
    return new Promise((resolve, reject) => {
        ProgExercises.destroy({ where: { progExercise_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getProgExercises, getProgExercise, getTestsByProgExerciseId, addOrEditProgExercise, removeProgExercise };
