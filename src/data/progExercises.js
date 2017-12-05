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

const getProgExercisesByTheme = (id) => {
    return new Promise((resolve, reject) => {
        ProgExercises.findAll({ where: { theme_id: id }})
            .then(progExercises => resolve(progExercises))
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

            Tests.destroy({ where: { prog_exercise_id: args.id }});

            args.tests.forEach(test => {
                test.prog_exercise_id = args.id;
                Tests.create(test)
                    .then(res => {
                        console.log(test)
                        console.log(res)
                    })
                    .catch(error => reject(error));
            });

            ProgExercises.update({
                text: args.text,
                theme_id: args.theme_id
            }, { where: { prog_exercise_id: args.id }})
                .then(res => resolve(res))
                .catch(error => reject(error));
            return;
        }

        return resolve(ProgExercises.create(args, {
            include: [ Tests ]
        })
            .then(res => {
                console.log(args)
                console.log(res)
            })
            .catch(error => reject(error)));
    })
};

const removeProgExercise = (id) => {
    return new Promise((resolve, reject) => {
        ProgExercises.destroy({ where: { prog_exercise_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getProgExercises, getProgExercise, getProgExercisesByTheme, getTestsByProgExerciseId, addOrEditProgExercise, removeProgExercise };
