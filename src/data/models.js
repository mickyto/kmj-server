import mongoose from 'mongoose';
import config from "../../config";
import autoIncrement from'mongoose-auto-increment';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const db = mongoose.createConnection(`mongodb://${config.mongoHost}/${config.mongoName}`);
autoIncrement.initialize(db);

const clientSchema = new Schema({
    fio: String,
    email: String,
    phone: String,
    where_from: String,
    _id: { type: Number, ref: 'id' }
});
clientSchema.plugin(autoIncrement.plugin, 'Clients');

const userSchema = new Schema({
    login: String,
    email: String,
    password: String,
    role: String,
    _id: { type: Number, ref: 'id' }
});
userSchema.plugin(autoIncrement.plugin, 'Users');


const Clients = db.model('Clients', clientSchema);
const Users = db.model('Users', userSchema);

export { Users, Clients }

