const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const moment = require('moment-timezone');
const { Client , LocalAuth   } = require('whatsapp-web.js');



const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

client.on('authenticated', (session) => {
    console.log('session restarted');
});

client.initialize().catch(_=>_)
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
});

client.on('ready', () => {
    console.log("ready to message")
});

client.on('message', async (message) => {
    try {
        const dailyTask = () => {
            console.log("task running..");
            const now = new Date();
            const jakartaTime = moment(now).tz('Asia/Jakarta');
            const dayOfWeek = jakartaTime.day();
            if(dayOfWeek === 0 || dayOfWeek == 7){
                client.sendMessage('120363044438132481@g.us', `Minggu Jangan Lupa Deadline Beib😘`);
            }else if(dayOfWeek === 1){
                client.sendMessage('120363044438132481@g.us', `Jangan Lupa Absen PBO Sayangku Cintaku❤️`);
            }else if(dayOfWeek === 2){
                client.sendMessage('120363044438132481@g.us', `Jangan Lupa Absen KWU dan RPL Sayangku Cintaku❤️`);
            }else if(dayOfWeek === 3){
                client.sendMessage('120363044438132481@g.us', `Jangan Lupa Absen Basis Data dan SO Sayangku Cintaku❤️`);
            }else if(dayOfWeek === 4){
                client.sendMessage('120363044438132481@g.us', `Kamis Libur Tapi Jangan Lupa Nugas Beib😘`);
            }else if(dayOfWeek === 5){
                client.sendMessage('120363044438132481@g.us', `Jumat Libur Tapi Jangan Lupa Nugas Beib😘`);
            }else if(dayOfWeek === 6){
                client.sendMessage('120363044438132481@g.us', `Jangan Lupa Absen Bahasa Pemprogaman Sayangku Cintaku❤️`);
            };
        };
        if(message.from === '6285777818508@c.us'){
            if(message.body === '/start'){
                await client.sendMessage('6285777818508@c.us', 'Schedule Started...')
                cron.schedule('0 18 * * *', dailyTask, {
                    timezone: 'Asia/Jakarta'
                });
            };
        };
    } catch (error) {
        console.log(error)
    };
})
