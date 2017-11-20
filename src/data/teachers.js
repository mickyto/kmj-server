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
        Teachers.findById(id, (err, teacher) => {
            if (err) reject(err);
            else resolve(teacher);
        })
    })
};

const addOrEditTeacher = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, teacher) => {
            if (err) reject(err);
            if (!teacher) {
                resolve({error: 'Не удалось найти преподавателя'});
                return;
            }
            resolve(teacher);
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
        Teachers.findOneAndRemove({ _id: id }, (err, result) => {
            if (err) reject(err);
            if (!result) {
                resolve({error: 'Не удалось найти преподавателя'});
                return;
            }
            resolve(result);
        })
    });
};

export { getTeachers, getTeacher, addOrEditTeacher, removeTeacher };
