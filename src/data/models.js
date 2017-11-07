import mongoose from 'mongoose';
import config from "../../config";
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(`mongodb://${config.mongoHost}/${config.mongoName}`);

//productSchema.set('toJSON', {getters: true});

const Clients = db.model('Clients', {
    fio: String,
    email: String,
    phone: String,
    where_from: String,
    _id: Number
});

const Users = db.model('Users', {
    login: String,
    email: String,
    password: String,
    role: String,
    _id: Number
});

export { Users, Clients }

