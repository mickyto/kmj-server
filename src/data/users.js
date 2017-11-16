import jwt from 'jsonwebtoken';

import { Users } from '../models';
import config from "../../config";


const gerUsers = () => {
    return new Promise((resolve, reject) => {
        Users.find((err, users) => {
            if (err) reject(err);
            else resolve(users)
        })
    })
};

const getUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        Users.findOne({ email: email }).exec((err, user) => {
            if (err) reject(err);

            if (user === null) {
                resolve({error: 'Пользователь не найден'});
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
        });
    });
};

export { gerUsers, getUser };
