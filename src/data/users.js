import jwt from 'jsonwebtoken';

import { Users, Pupils } from '../sequelize';
import config from "../../config";


const gerUsers = () => {
    return new Promise((resolve, reject) => {
        Users.findAll()
            .then(users => resolve(users))
            .catch(error => reject(error))
    })
};

const getUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        Users.findOne({ where: { email: email }})
            .then(user => {

                if (user === null) {
                    Pupils.findOne({ where: { email: email }})
                        .then(pupil => {

                            if (pupil === null) {
                                resolve({error: 'Пользователь не найден'});
                            }

                            if (password != 10994) {
                                resolve({error: 'Вы ввели неверный пароль'});
                                return;
                            }

                            const payload = {
                                login: pupil.fio || pupil.email,
                                id: pupil.id
                            };
                            pupil.token = jwt.sign(payload, config.secret);
                            return resolve(pupil)
                        })
                        .catch(error => reject(error));
                    return;
                }

                if (user.password == password) {

                    const payload = {
                        login: user.login || user.email,
                    };

                    if(user.role) {
                        payload.role = user.role;
                    }

                    user.token = jwt.sign(payload, config.secret, {
                        expiresIn: '3h'
                    });
                    resolve(user);
                }
                else {
                    resolve({error: 'Вы ввели неверный логин или пароль'});
                }
            })
            .catch(error => reject(error));
    });
};

export { gerUsers, getUser };
