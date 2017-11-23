import { Pupils, Clients } from '../sequelize';

const getPupils = (args) => {
    return new Promise((resolve, reject) => {

        let query;

        if (args && args === 'trashed') {
            query = { where: { status : "trashed" }}
        }
        else if (args === 'active') {
            query = { where: { status : null }}
        }
        else {
            query = {}
        }

        Pupils.findAll(query)
            .then(pupils => resolve(pupils))
            .catch(error => reject(error));
    })
};

const getPupil = (id) => {
    return new Promise((resolve, reject) => {
        Pupils.findById(id)
            .then(pupil => resolve(pupil))
            .catch(error => reject(error));
    })
};

const getPupilByClientId = (id) => {
    return new Promise((resolve, reject) => {
        Pupils.findOne({ where: { client_id: id }})
            .then(pupil => resolve(pupil))
            .catch(error => reject(error));
    })
};

const addOrEditPupil = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Pupils.update(args, { where: { client_id: args.id }})
                .then(pupil => resolve(pupil))
                .catch(error => reject(error));
        }
        else if (!args.client_id) {
            resolve({error: 'Ошибка. Вы пытаетесь создать ученика без клиента'});
        }
        else {
            Pupils.create(args)
                .then(pupil => resolve(pupil))
                .catch(error => reject(error));
        }
    });
};

const movePupil = ({ id, operation }) => {
    return new Promise((resolve, reject) => {

        if (operation === 'move') {
            Pupils.update({ status: 'trashed' }, { where: { pupil_id: id }})
                .then(result => resolve(result))
                .catch(error => reject(error));
        }
        else if (operation === 'recovery') {
            Pupils.update({ status: null }, { where: { pupil_id: id }})
                .then(result => resolve(result))
                .catch(error => reject(error));
        }
        else if (operation === 'remove') {
            Pupils.destroy({ where: { pupil_id: id }})
                .then(result => resolve(result))
                .catch(error => reject(error))
        }
        else {
            resolve({error: 'Ошибка операции'});
        }
    });
};

export { getPupils, getPupil, addOrEditPupil, movePupil, getPupilByClientId };
