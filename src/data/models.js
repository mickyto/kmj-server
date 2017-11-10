import mongoose from 'mongoose';
import config from "../../config";
import autoIncrement from'mongoose-auto-increment';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const db = mongoose.createConnection(`mongodb://${config.mongoHost}/${config.mongoName}`);
autoIncrement.initialize(db);

const clientSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    fio: String,
    email: String,
    phone: String,
    where_from: String,
    status: String,
});
clientSchema.plugin(autoIncrement.plugin, {
    model: 'Clients',
    startAt: 1
});

const userSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    login: String,
    email: String,
    password: String,
    role: String,
});
userSchema.plugin(autoIncrement.plugin, {
    model: 'Users',
    startAt: 3
});


const Clients = db.model('Clients', clientSchema);
const Users = db.model('Users', userSchema);

export { Users, Clients }

