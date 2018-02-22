import jwt from 'jsonwebtoken';

import config from "../../config";
import { Pupils, Works, Groups } from '../sequelize';

const getPupils = (show, group) => new Promise((resolve, reject) => {

    if (group == 0) {
        Pupils.findAll({ include: [{ model: Works, as: 'works' }]})
            .then(pupils => resolve(pupils.filter(pupil => pupil.works[0])))
            .catch(error => reject(error));
        return;
    }

    if (group) {
        Groups.findById(group)
            .then(group => resolve(group.getPupils()))
            .catch(error => reject(error));
        return;
    }

    let query = { include: [{ model: Groups, attributes: ['id', 'title', 'subject_id']}]};
    if (show && show === 'trashed')
        query.where = { status : 'trashed' };
    else if (show === 'active')
        query.where = { status : null };

    Pupils.findAll(query)
        .then(pupils => resolve(pupils))
        .catch(error => reject(error));
});

const getPupil = (id, token) => new Promise((resolve, reject) => {

    let pupilId = id;

    if (token) {
        const decoded = jwt.verify(token, config.secret);
        pupilId = decoded.id;
    }

    Pupils.findById(pupilId, { include: [{ model: Groups, attributes: ['id', 'title', 'subject_id'] }]})
        .then(pupil => resolve(pupil))
        .catch(error => reject(error));
});

const getTrainingWorkResults = trainings => {

    let solved = 0, levelCount = 0, plusLevel = 0;

    trainings.forEach(({ dataValues : { correct, incorrect, changed, speed }}) => {

        speed = speed || 1;
        const primaryLavel = Math.floor(1 + speed * ((+correct || 0) + (+changed || 0) - 2 * (+incorrect || 0)));
        const level = primaryLavel < 0 ? 0 : primaryLavel > 20 ? 20 : primaryLavel;
        plusLevel += level;
        if (level >= 10) { ++solved; levelCount += 10 }
        else levelCount += level;
    });

    return { solved, levelCount, plusLevel };
};

const addOrEditPupil = args => new Promise((resolve, reject) => {

    if (args.id) {
        Pupils.findById(args.id)
            .then(pupil => {
                Pupils.update(args, { where: { pupil_id: args.id }});
                pupil.setGroups(args.groups);
                return resolve(pupil);
            })
            .catch(error => reject(error));
    }
    else if (!args.client_id) {
        resolve({error: 'Ошибка. Вы пытаетесь создать ученика без клиента'});
    }
    else {
        Pupils.create(args)
            .then(pupil => {
                pupil.addGroups(args.groups);
                return resolve(pupil)
            })
            .catch(error => reject(error));
    }
});

const movePupil = ({ id, operation }) => new Promise((resolve, reject) => {

    if (operation === 'move')
        Pupils.update({ status: 'trashed' }, { where: { pupil_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    else if (operation === 'recovery')
        Pupils.update({ status: null }, { where: { pupil_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    else if (operation === 'remove')
        Pupils.destroy({ where: { pupil_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error))
});

const makeFavorite = ({ id, token, kind }) => new Promise((resolve, reject) => {

    const decoded = jwt.verify(token, config.secret);

    Pupils.findById(decoded.id)
        .then(pupil => {
            if (kind == 'training')
                pupil.hasFavorites(id)
                    .then(res => {
                        if (res)
                            pupil.removeFavorites(id);
                        else
                            pupil.addFavorites(id);
                    });
            else
                pupil.hasFavorite_exercise(id)
                    .then(res => {
                        if (res)
                            pupil.removeFavorite_exercise(id);
                        else
                            pupil.addFavorite_exercise(id);
                    });
        })
        .catch(error => reject(error));
    resolve(1)
});

export { getPupils, getPupil, addOrEditPupil, movePupil, getTrainingWorkResults, makeFavorite };
