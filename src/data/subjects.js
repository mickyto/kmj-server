import { Subjects } from '../models';

const getSubjects = (ids) => {

    // TODO why I need conditional query?
    const query = ids ? { _id: { $in: ids }} : {};
    return new Promise((resolve, reject) => {
        Subjects.find(query, (err, subjects) => {
            if (err) reject(err);
            else resolve(subjects);
        })
    })
};

const addOrEditSubject = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, subject) => {
            if (err) reject(err);
            if (!subject) {
                resolve({error: 'Не удалось изменить или создать новый предмет'});
            }
            resolve(subject);
        };

        if (args.id) {
            Subjects.findOneAndUpdate({ _id: args.id }, args, callback);
            return;
        }

        Subjects.create(args, callback);
    });
};

const removeSubject = (id) => {
    return new Promise((resolve, reject) => {
        Subjects.findOneAndRemove({ _id: id }, (err, result) => {
            if (err) reject(err);
            if (!result) {
                resolve({error: 'Не удалось удалить предмет'});
                return;
            }
            resolve(result);
        })
    })
};

export { getSubjects, addOrEditSubject, removeSubject };
