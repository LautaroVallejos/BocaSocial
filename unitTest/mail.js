const nodemailer = require("nodemailer");

async function mail(direccion) {
    new Promise(async(resolve, reject) => {
        const transporter = await nodemailer.createTransport({
            host: "smtp.emailondeck.com",
            port: 587,
            secure: false,
            auth: {
                user: "blake.837@zdecadesgl.com", // generated ethereal user
                pass: "" // generated ethereal password
            }
        });

        resolve(transporter);
    })
    .then(async (transporter) => {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'd30728cf11@emailmonkey.club', // sender address
            to: direccion, // list of receivers
            subject: "Recobrar mi contraseña de LigaBaires", // Subject line
            html: 'Gracis por participar de LigaBaires, esperemos que le sea de ayuda el recobrar su contraseña <a href="ligabaires.com/soporteTecnico"> <strong> APRETE ACÁ. </strong> </a>'
        });

        console.log("Preview URL: %s" + nodemailer.getTestMessageUrl(info));
    }).catch((err) => {
        console.error(err);
    })
}


mail("nicolascarlini1@gmail.com")