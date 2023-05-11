const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const moment = require('moment-timezone');
const { Client } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    },
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
        const dailyTask = async () => {
            const now = new Date();
            const jakartaTime = moment(now).tz('Asia/Jakarta');
            const dayOfWeek = jakartaTime.day();
            if(dayOfWeek === 0 || dayOfWeek == 7){
                await client.sendMessage('6285777818508@c.us', `Minggu Jangan Lupa Deadline Beib😘`);
                return !0;
            }else if(dayOfWeek === 1){
                await client.sendMessage('6285777818508@c.us', `Jangan Lupa Absen PBO\nJangan Lupa Absen PBO\nJangan Lupa Absen PBO\nJangan Lupa Absen PBO\nJangan Lupa Absen PBO`);
                return !0;
            }else if(dayOfWeek === 2){
                await client.sendMessage('6285777818508@c.us', `Jangan Lupa Absen KWU dan RPL\nJangan Lupa Absen KWU dan RPL\nJangan Lupa Absen KWU dan RPL\nJangan Lupa Absen KWU dan RPL\nJangan Lupa Absen KWU dan RPL`);
                return !0;
            }else if(dayOfWeek === 3){
                await client.sendMessage('6285777818508@c.us', `Jangan Lupa Absen Basis Data dan Sistem Operasi\nJangan Lupa Absen Basis Data dan Sistem Operasi\nJangan Lupa Absen Basis Data dan Sistem Operasi\nJangan Lupa Absen Basis Data dan Sistem Operasi\nJangan Lupa Absen Basis Data dan Sistem Operasi`);
                return !0;
            }else if(dayOfWeek === 4){
                return !0;
            }else if(dayOfWeek === 5){
                return !0;
            }else if(dayOfWeek === 6){
                await client.sendMessage('6285777818508@c.us', `Jangan Lupa Absen Bahasa Pemprogaman\nJangan Lupa Absen Bahasa Pemprogaman\nJangan Lupa Absen Bahasa Pemprogaman\nJangan Lupa Absen Bahasa Pemprogaman\nJangan Lupa Absen Bahasa Pemprogaman`);
                return !0;
            };
        };

        cron.schedule('0 18 * * *', dailyTask, {
            timezone: 'Asia/Jakarta'
          });
    } catch (error) {
        console.log(error)
    }
})