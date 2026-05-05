const nodemailer = require('nodemailer');

async function main() {
    try {
        let account = await nodemailer.createTestAccount();
        console.log('--- ETHEREAL TEST ACCOUNT ---');
        console.log('Host: ' + account.smtp.host);
        console.log('Port: ' + account.smtp.port);
        console.log('User: ' + account.user);
        console.log('Pass: ' + account.pass);
        console.log('Login URL: https://ethereal.email/login');
        console.log('--- END ---');
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
