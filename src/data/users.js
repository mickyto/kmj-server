import jwt from 'jsonwebtoken';
import { Users } from './models';
import config from "../../config";


const gerUsers = () => {
    return new Promise((resolve, reject) => {
        Users.find((err, users) => {
            if (err) reject(err);
            else resolve(users)
        })
    })
};

const getUser = ({email, password}) => {
    return new Promise((resolve, reject) => {
        Users.findOne({ email: email }).exec((err, res) => {
            if (err) reject(err);

            if (res === null) {
                resolve({error: 'Пользователь не найден'});
                return;
            }

            if (res.password == password) {

                const payload = {
                    login: res.login || res.email,
                };

                if(res.role) {
                    payload.role = res.role;
                }

                res.token = jwt.sign(payload, config.secret, {
                    expiresIn: 1440 // expires in 24 hours
                });
                resolve(res);
            }
            else {
                resolve({error: 'Вы ввели неверный логин или пароль'});
            }
        });
    });
};

export { getUser, gerUsers };
