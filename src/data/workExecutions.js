import jwt from 'jsonwebtoken';

import config from "../../config";
import { WorkExecutions } from '../sequelize';

const getPupilExecution = (exerciseId, { pupil, token }) => {
    return new Promise((resolve, reject) => {

        let pupilId = pupil;

        if (token) {
            const decoded = jwt.verify(token, config.secret);
            pupilId = decoded.id;
        }

        WorkExecutions.findOne({ where: { pupil_id: pupilId, exercise_id: exerciseId }})
            .then(executions => resolve(executions))
            .catch(error => reject(error))
    })
};

export { getPupilExecution };