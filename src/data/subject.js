import { Subjects } from './models';

const getSubjects = () => {
    return new Promise((resolve, reject) => {
        Subjects.find({}, (err, subjects) => {
            if (err) reject(err);
            else resolve(subjects);
        })
    })
};

const subjectCrud = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Не удалось добавить или удалить предмет'});
                return;
            }
            resolve(res);
        };

        if (args.id) {
            Subjects.findOneAndRemove({ _id: args.id }, callback)
        }
        else {
            Subjects.create(args, callback);
        }
    });
};

export { subjectCrud, getSubjects };
