import { Exercises, Tests } from '../sequelize';

const getProgExercises = () => {
    return new Promise((resolve, reject) => {
        Exercises.findAll()
            .then(exercises => resolve(exercises))
            .catch(error => reject(error))
    })
};

const getProgExercise = (id) => {
    return new Promise((resolve, reject) => {
        Exercises.findById(id)
            .then(exercise => resolve(exercise))
            .catch(error => reject(error))
    })
};

const getProgExercisesByTheme = (id) => {
    return new Promise((resolve, reject) => {
        Exercises.findAll({ where: { theme_id: id }})
            .then(exercises => resolve(exercises))
            .catch(error => reject(error))
    })
};

const getTestsByProgExerciseId = (id) => {
    return new Promise((resolve, reject) => {
        Tests.findAll({ where: { exercise_id: id }})
            .then(tests => resolve(tests))
            .catch(error => reject(error))
    })
};

const addOrEditProgExercise = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {

            Tests.destroy({ where: { exercise_id: args.id }});

            args.tests.forEach(test => {
                test.exercise_id = args.id;
                Tests.create(test)
            });

            Exercises.update({
                text: args.text,
                theme_id: args.theme_id
            }, { where: { exercise_id: args.id }})
                .then(res => resolve(res))
                .catch(error => reject(error));
            return;
        }

        return resolve(Exercises.create(args, {
            include: [ Tests ]
        }));
    })
};

const removeProgExercise = (id) => {
    return new Promise((resolve, reject) => {
        Exercises.destroy({ where: { exercise_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getProgExercises, getProgExercise, getProgExercisesByTheme, getTestsByProgExerciseId, addOrEditProgExercise, removeProgExercise };
