const {
    Schema,
    model
} = require('mongoose');
const bcrypt = require('bcryptjs');
const geoip = require('geoip-lite');
const ip = require('ip')

const userSchema = new Schema({
    username: String, //Nombre de usuario    --verificacion de estado
    name: String, //Primer nombre 
    lastName: String, //Segundo nombre    
    email: {
        type: String,
        unique: true,
        lowercase: true
    }, //Email de use  --valicacion de ocupacion, si cumple los minimos y validacion 
    isValidEmail: Boolean, //Si el a sido confirmado --validad enviando un email al correspondiente
    password: {
        type: String
    }, //Contraseña encriptada --encriptado y desencriptado
    avatar: String, //Nombre del archivo usado como avatar --hacer funcion creadora del archivo y destructora
    phone: String, //Numero de telefono    --validacion optativa
    birth: String, //Nacimiento    --informacion util en caso de uso de tarjetas de credito
    licenseType: {
        type: String,
        default: "G"
    }, //Tipo de licencia adquirida    --G gratis, M mensual, A anual, P permanente,A Admin
    paymentType: {
        type: String,
        default: "G"
    }, //Tipo de pago de licencia      --G gratis, T tarjeta, C trato comercial y A admin
    paymentLatest: Date, //Ultimo pago      
    isSuperUser: {
        type: Boolean,
        default: false
    }, //Admin o no
    locate: {
        type: Object,
        default: []
    }, //Geolocalizacion       --valizacion y macheo con la anterior localizacion optenida
    lastestLocate: {
        type: Object,
        default: []
    }, //Ultima localizacion
    registrationDate: {
        type: Date,
        default: Date.now()
    }, //Primera vez que se uso el sitio   --inmutable
    lastLogin: Date,
    groups: Object, //Json que alverga a todos los grupos a los que esta unido --agregar, modificar y eliminar de grupos
    points: {
        type: Number,
        default: 0
    }, //Cantidad de puntos que tiene el usuario --agregar y sacar puntos
    ip: {
        type: Array,
        default: []
    },
    accountState: {
        type: Boolean,
        default: true
    }
});

//Encripado de la password
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

//Desencriptado para verificacion
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

//Verifica que sea un email apto
userSchema.methods.suitableEmail = function (email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

//Envia un email de verficacion
userSchema.methods.validateEmail = function (email) {

};

//Cambia el email por un nuevo email requiriendo la contraseña para hacerlo ( usa validatePassword() )
userSchema.methods.changeEmail = function (newEmail, password) {
    if (this.suitableEmail(newEmail) && this.validatePassword(password)) {
        this.email = newEmail;
        return true;
    } else {
        return false;
    }
};

//Valida que sea un telefo apto
userSchema.methods.suitablePhone = function () {

};

//Valida el formato tomado
userSchema.methods.suitableBirth = function (birth) {

};

//Cambia la fecha de nacimiento requieriendo la contraseña para hacerlo ( usa validatePassword() )
userSchema.methods.changeBirth = function (newBirth, password) {
    if (this.suitableBirth(newBirth), this.validatePassword(password)) {
        this.birth = newBirth;
        return true;
    } else {
        return false;
    }
};

//Asigna el tipo de licencia
userSchema.methods.assignmentLicense = function (licenseType) {
    switch (licenseType) {
        case "G":
        case "g":
            this.paymentType = "G";
            return true;

        case "T":
        case "t":
            this.paymentType = "T";
            return true;

        case "C":
        case "c":
            this.paymentType = "C";
            return true;

        case "A":
        case "a":
            this.paymentType = "A";
            return true;

        default:
            return false;
    }
};

//Como se paga el servicio --G gratis, T tarjeta, C trato comercial y A admin
userSchema.methods.assignmentPayment = function (paymentType) {
    switch (paymentType) {
        case "G":
        case "g":
            this.paymentType = "G";
            return true;

        case "T":
        case "t":
            this.paymentType = "T";
            return true;

        case "C":
        case "c":
            this.paymentType = "C";
            return true;

        case "A":
        case "a":
            this.paymentType = "A";
            return true;

        default:
            return false;
    }
};

//Ultimo pago realizado en tal fecha
userSchema.methods.assignmentPaymentLatest = function () {
    this.paymentLatest = Date.now();
}

//Asigna poderes de admin 
userSchema.methods.addAdmin = function () {
    this.isSuperUser = true;
}

//Quita poderes de admin
userSchema.methods.removeAdmin = function () {
    this.isSuperUser = false;
}


//Agrega al usuario a un grupo y se le otorga el nivel en este grupo
userSchema.methods.addGroup = function () {

}

//Cambia el nivel en un grupo
userSchema.methods.modifyGroup = function () {

}

//Elimina a un usuario de un grupo
userSchema.methods.removeGroup = function () {

}

module.exports = model('User', userSchema);