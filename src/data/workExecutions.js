import jwt from 'jsonwebtoken';

import config from "../../config";
import { WorkExecutions } from '../sequelize';

const getPupilExecution = (exerciseId, token) => {
    return new Promise((resolve, reject) => {

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) reject(err);
            if (!decoded.id) {
                resolve();
                return;
            }
            WorkExecutions.findOne({where: { pupil_id: decoded.id, exercise_id: exerciseId }})
                .then(executions => resolve(executions))
                .catch(error => reject(error))
        });
    })
};

const getPupilExecutions = (pupilId, workId) => {
    return new Promise((resolve, reject) => {


            WorkExecutions.findOne({where: { pupil_id: decoded.id, exercise_id: exerciseId }})
                .then(executions => resolve(executions))
                .catch(error => reject(error))

    })
};

export { getPupilExecution, getPupilExecutions };