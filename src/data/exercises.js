import { Exercises, Tests } from '../sequelize';

const getExercises = () => {
    return new Promise((resolve, reject) => {
        Exercises.findAll()
            .then(exercises => resolve(exercises))
            .catch(error => reject(error))
    })
};

const getExercise = (id) => {
    return new Promise((resolve, reject) => {
        Exercises.findById(id)
            .then(exercise => resolve(exercise))
            .catch(error => reject(error))
    })
};

const getExercisesByTheme = (id) => {
    return new Promise((resolve, reject) => {
        Exercises.findAll({ where: { theme_id: id }})
            .then(exercises => resolve(exercises))
            .catch(error => reject(error))
    })
};

const getTestsByExerciseId = (id) => {
    return new Promise((resolve, reject) => {
        Tests.findAll({ where: { exercise_id: id }})
            .then(tests => resolve(tests))
            .catch(error => reject(error))
    })
};

const addOrEditExercise = (args) => {
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

export { getExercises, getExercise, getExercisesByTheme, getTestsByExerciseId, addOrEditExercise };
