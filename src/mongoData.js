import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from "../config"
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(`mongodb://${config.mongoHost}/${config.mongoName}`);

//productSchema.set('toJSON', {getters: true});

export const Users = db.model('Users', {
    login: String,
    email: String,
    password: String,
    role: String,
    _id: Number
});

export const getUser = ({email, password}) => {
    return new Promise((resolve, reject) => {
        Users.findOne({ email: email }).exec((err, res) => {
            if(err) reject(err);
            if(res.password == password) {

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

