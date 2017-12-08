import jwt from 'jsonwebtoken';

import config from "../../config";
import { Exercises } from '../sequelize';

const getPupilExecution = (exerciseId, token) => {
    return new Promise((resolve, reject) => {
        console.log(token)

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) reject(err);
            if (!decoded.id) {
                resolve();
                return;
            }
            Exercises.findById(exerciseId)
                .then(exercise => resolve(exercise.getPupils({where: {pupil_id: decoded.id}})))
                .catch(error => reject(error))
        });
    })
};

export { getPupilExecution };