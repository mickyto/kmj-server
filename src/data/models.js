import mongoose from 'mongoose';
import config from "../../config"
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(`mongodb://${config.mongoHost}/${config.mongoName}`);

//productSchema.set('toJSON', {getters: true});

const Users = db.model('Users', {
    fio: String,
    email: String,
    phone: String,
    where_from: String,
    _id: Number
});

const Clients = db.model('Clients', {
    login: String,
    email: String,
    password: String,
    role: String,
    _id: Number
});

export { Users }

