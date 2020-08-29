const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'abhishekdwivedi037@gmail.com',
        subject: 'Welcome to Serve Me',
        text: `Welcome ${name} to Serve Me. Hope you enjoy our food.`
    })
}

const sendResetMail = (email, link, token)=>{
    sgMail.send({
        to: email,
        from:'abhishekdwivedi037@gmail.com',
        subject: 'Password Reset Request',
        text: `To reset your password please click on given link ${link}/reset/${token}`
    })
}


module.exports = {
    sendWelcomeMail,
    sendResetMail
}