const {
    Schema,
    model
} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: String, //Nombre    --verificacion de estado
    lasName: String, //Segundo nombre    
    email: String, //Email de use  --valicacion de ocupacion, si cumple los minimos y validacion 
    isValidEmail: Boolean, //Si el a sido confirmado --validad enviando un email al correspondiente
    password: String, //Contraseña encriptada --encriptado y desencriptado
    avatar: String, //Nombre del archivo usado como avatar --hacer funcion creadora del archivo y destructora
    phone: Number, //Numero de telefono    --validacion optativa
    birth: String, //Nacimiento    --informacion util en caso de uso de tarjetas de credito
    licenseType: String, //Tipo de licencia adquirida    --G gratis, M mensual, A anual, P permanente,A Admin
    paymentType: String, //Tipo de pago de licencia      --T tarjeta, C trato comercial y A admin
    paymentLatest: String, //Ultimo pago      
    isSuperUser: Boolean, //Admin o no
    locate: String, //Geolocalizacion       --valizacion y macheo con la anterior localizacion optenida
    latestLocate: String, //Ultima localizacion
    entryApp: String, //Primera vez que se uso el sitio   --inmutable
    groups: Object, //Json que alverga a todos los grupos a los que esta unido --agregar, modificar y eliminar de grupos
    points: Number //Cantidad de puntos que tiene el usuario --agregar y sacar puntos
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
userSchema.methods.suitableEmail = function () {

};

//Envia un email de verficacion
userSchema.methods.validateEmail = function () {

};

//Cambia el email por un nuevo email requiriendo la contraseña para hacerlo ( usa validatePassword() )
userSchema.methods.changeEmail = function () {

};

//Valida que sea un telefo apto
userSchema.methods.suitablePhone = function () {

};

//Valida el formato tomado
userSchema.methods.suitableBirth = function () {

};

//Cambia la fecha de nacimiento requieriendo la contraseña para hacerlo ( usa validatePassword() )
userSchema.methods.changeBirth = function () {

};

//Asigna el tipo de licencia
userSchema.methods.assignmentLicense = function () {

};

//Como se paga el servicio
userSchema.method.assignmentPayment = function () {

};

//Ultimo pago realizado en tal fecha
userSchema.method.assignmentPaymentLatest = function () {

}

//Asigna poderes de admin 
userSchema.method.addAdmin = function () {

}

//Quita poderes de admin
userSchema.method.removeAdmin = function () {

}

//Obtiene y guarda la lozalizacion
userSchema.method.getLocation = function () {

}

//Asigna la fecha del inicio de la cuenta
userSchema.method.entryApp = function () {

}

//Agrega al usuario a un grupo y se le otorga el nivel en este grupo
userSchema.method.addGroup = function () {

}

//Cambia el nivel en un grupo
userSchema.method.modifyGroup = function () {

}

//Elimina a un usuario de un grupo
userSchema.method.removeGroup = function () {

}

//Agrega puntos a el usuario
userSchema.method.addPoints = function (quantity) {

}

//Saca punto a el usuario
userSchema.method.removePoints = function (quantity) {

}

module.exports = model('User', userSchema);