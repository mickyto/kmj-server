import jwt from 'jsonwebtoken';

import config from "../../config";
import { Exercises, Tests, Pupils, Themes } from '../sequelize';

const getExercises = theme => new Promise((resolve, reject) => {

    const query = { include: [Themes] };

    if (theme)
        query.where = { theme_id: theme };

    Exercises.findAll(query)
        .then(exercises => resolve(exercises))
        .catch(error => reject(error))
});

const getExercise = ({ id, token }) => {
    return new Promise((resolve, reject) => {

        const query = { include: [Tests, Themes] };

        if (token) {
            const { id } = jwt.verify(token, config.secret);

            query.include = [
                Themes,
                { model: Tests, limit: 1 },
                {
                    model: Pupils,
                    as: 'admirer',
                    attributes: ['id'],
                    through: { attributes: [] }
                },
                {
                    model: Pupils,
                    as: 'pupils',
                    where: { id },
                    required: false,
                    attributes: ['id'],
                    through: { attributes: ['status', 'attempt', 'program']}
                }
            ];
        }

        Exercises.findById(id, query)
            .then(exercise => resolve(exercise))
            .catch(error => reject(error))
    })
};

const addOrEditExercise = args => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Tests.destroy({ where: { exercise_id: args.id }})
                .then(() => {
                    args.tests.forEach(test => {
                        test.exercise_id = args.id;
                        Tests.create(test);
                    });
                });

            Exercises.update({
                text: args.text,
                code: args.code,
                start: args.start,
                end: args.end,
                theme_id: args.theme_id
            }, { where: { exercise_id: args.id }})
                .then(res => resolve(res))
                .catch(error => reject(error));
            return;
        }

        return resolve(Exercises.create(args, {
            include: [Tests]
        }));
    })
};

export { getExercises, getExercise, addOrEditExercise };
