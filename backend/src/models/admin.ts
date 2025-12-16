
import { Schema, model } from 'mongoose';
import { adminDocument } from '../entities/adminEntity';

const adminSchema: Schema<adminDocument> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Admin = model('Admin',adminSchema);

export default Admin;

