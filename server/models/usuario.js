const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: true,
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        required: true,
        default: true,
    },
    google: {
        type: Boolean,
        required: true,
        default: false,
    },
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);