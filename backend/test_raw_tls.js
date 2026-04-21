const tls = require('tls');

const host = 'ac-btdfeeo-shard-00-00.kyykxaa.mongodb.net';
const port = 27017;

console.log(`Connecting to ${host}:${port} via TLS...`);

const socket = tls.connect(port, host, {
    servername: host,
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.2'
}, () => {
    console.log('✅ TLS Connected!');
    console.log('Authorized:', socket.authorized);
    console.log('Cipher:', socket.getCipher());
    console.log('Protocol:', socket.getProtocol());
    socket.end();
    process.exit(0);
});

socket.on('error', (err) => {
    console.error('❌ TLS Error:');
    console.error(err);
    process.exit(1);
});

socket.setTimeout(10000, () => {
    console.error('❌ TLS Timeout');
    socket.destroy();
    process.exit(1);
});
