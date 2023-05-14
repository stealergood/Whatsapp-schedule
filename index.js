const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const moment = require('moment-timezone');
const { Client /*, LocalAuth */ } = require('whatsapp-web.js');



const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    },
    // authStrategy: new LocalAuth()
});

client.on('authenticated', (session) => {
    console.log('session restarted');
});

client.initialize();
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
});

client.on('ready', () => {
    console.log("ready to message")
});

client.on('message', async (message) => {
    try {
        const dailyTask = () => {
            console.log("task running..")
            const now = new Date();
            const jakartaTime = moment(now).tz('Asia/Jakarta');
            const dayOfWeek = jakartaTime.day();
            if(dayOfWeek === 0 || dayOfWeek == 7){
                client.sendMessage('6285777818508@c.us', `Minggu Jangan Lupa Deadline Beib😘`);
            }else if(dayOfWeek === 1){
                client.sendMessage('6285777818508@c.us', `Jangan Lupa Absen PBO\nJangan Lupa Absen PBO\nJangan Lupa Absen PBO\nJangan Lupa Absen PBO\nJangan Lupa Absen PBO`);
            }else if(dayOfWeek === 2){
                client.sendMessage('6285777818508@c.us', `Jangan Lupa Absen KWU dan RPL\nJangan Lupa Absen KWU dan RPL\nJangan Lupa Absen KWU dan RPL\nJangan Lupa Absen KWU dan RPL\nJangan Lupa Absen KWU dan RPL`);
            }else if(dayOfWeek === 3){
                client.sendMessage('6285777818508@c.us', `Jangan Lupa Absen Basis Data dan Sistem Operasi\nJangan Lupa Absen Basis Data dan Sistem Operasi\nJangan Lupa Absen Basis Data dan Sistem Operasi\nJangan Lupa Absen Basis Data dan Sistem Operasi\nJangan Lupa Absen Basis Data dan Sistem Operasi`);
            }else if(dayOfWeek === 4){
            }else if(dayOfWeek === 5){
            }else if(dayOfWeek === 6){
                client.sendMessage('6285777818508@c.us', `Jangan Lupa Absen Bahasa Pemprogaman\nJangan Lupa Absen Bahasa Pemprogaman\nJangan Lupa Absen Bahasa Pemprogaman\nJangan Lupa Absen Bahasa Pemprogaman\nJangan Lupa Absen Bahasa Pemprogaman`);
            };
        };
        if(message.body === '/start'){
            await client.sendMessage('6285777818508@c.us', 'Schedule Started...')
            cron.schedule('0 18 * * *', dailyTask, {
                timezone: 'Asia/Jakarta'
            });
        }
    } catch (error) {
        console.log(error)
    }
})