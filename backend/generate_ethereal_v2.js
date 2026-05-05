const nodemailer = require('nodemailer');
const fs = require('fs');

async function main() {
    try {
        let account = await nodemailer.createTestAccount();
        const output = `Host: ${account.smtp.host}\nPort: ${account.smtp.port}\nUser: ${account.user}\nPass: ${account.pass}\nLogin: https://ethereal.email/login`;
        fs.writeFileSync('ethereal_credentials.txt', output);
        console.log('Credentials saved to ethereal_credentials.txt');
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
