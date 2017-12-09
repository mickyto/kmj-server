import { Pupils, PupilTrainings } from '../sequelize';


const doMagic = () => {
    return new Promise((resolve, reject) => {
        PupilTrainings.findAll()
            .then(results => {

                results.forEach(result => {
                    if (result.pupil_answer == result.right_answer) {
                        result.update({ is_correct: 1 });
                    }
                });

                return resolve(1)
            })
            .catch(error => reject(error));
    })
};


export { doMagic };