import { Teachers } from '../models';

const getTeachers = (ids) => {

    const query = ids ? { _id: { $in: ids }} : {};
    return new Promise((resolve, reject) => {
        Teachers.find(query, (err, teachers) => {
            if (err) reject(err);
            else resolve(teachers);
        })
    })
};

const getTeacher = (id) => {
    return new Promise((resolve, reject) => {

        Teachers.findById(id, (err, pupil) => {
            if (err) reject(err);
            else resolve(pupil);
        })
    })
};

const addOrEditTeacher = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Не удалось найти преподавателя'});
                return;
            }
            resolve(res);
        };

        if (args.id) {
            Teachers.findOneAndUpdate({ _id: args.id }, args, callback)
        }
        else {
            Teachers.create(args, callback);
        }
    });
};

const removeTeacher = (id) => {
    return new Promise((resolve, reject) => {
        Teachers.findOneAndRemove({ _id: id }, (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Не удалось найти преподавателя'});
                return;
            }
            resolve(res);
        })
    });
};

export { getTeachers, getTeacher, addOrEditTeacher, removeTeacher };
