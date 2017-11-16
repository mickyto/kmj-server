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

const teacherCrud = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Операция не удалась'});
                return;
            }
            resolve(res);
        };

        if (args.id && Object.keys(args).length == 1) {
            Teachers.findOneAndRemove({ _id: args.id }, callback)
        }
        else if (args.id && Object.keys(args).length != 1) {
            Teachers.findOneAndUpdate({ _id: args.id }, args, callback)
        }
        else {
            Teachers.create(args, callback);
        }
    });
};

export { teacherCrud, getTeachers, getTeacher };
