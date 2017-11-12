import { Subjects } from './models';

const getSubjects = (ids) => {

    const query = ids ? { _id: { $in: ids }} : {};
    return new Promise((resolve, reject) => {
        Subjects.find(query, (err, subjects) => {
            if (err) reject(err);
            else resolve(subjects);
        })
    })
};

const removeSubject = (id) => {
    return new Promise((resolve, reject) => {
        Subjects.findOneAndRemove({ _id: id }, (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Не удалось добавить или удалить предмет'});
                return;
            }
            resolve(res);
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

export { subjectCrud, getSubjects, removeSubject };
