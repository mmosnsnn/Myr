const {
    Sequelize
} = require('sequelize');
const fs = require('fs');

if (fs.existsSync('config.env')) {
    require('dotenv').config({
        path: './config.env'
    });
}

const toBool = (x) => x === 'true';

const DATABASE_URL = process.env.DATABASE_URL || './assets/database.db';

module.exports = {
    ANTILINK: toBool(process.env.ANTI_LINK) || false,
    LOGS: toBool(process.env.LOGS) || true,
    ANTILINK_ACTION: process.env.ANTI_LINK || 'kick',
    SESSION_ID: process.env.SESSION_ID || '',
    LANG: process.env.LANG || 'EN',
    HANDLERS: process.env.HANDLER === 'false' || process.env.HANDLER === 'null' ? '^': '^[/,!,.,?,#,$,&,@,\,*,+,-]',
    RMBG_KEY: process.env.RMBG_KEY || false,
    BRANCH: 'master',
    caption :process.env.CAPTION || " *•ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴜꜱᴇʀ-ʙᴏᴛ•* ",
    disablepm: process.env.DISABLE_PM || "true",
    autoreaction: process.env.AUTO_REACTION || 'on',
    PACKNAME: process.env.PACKNAME || '',
    WELCOME_MSG: process.env.WELCOME_MSG || 'Hi @user Welcome to @gname',
    GOODBYE_MSG: process.env.GOODBYE_MSG || 'Hi @user It was Nice Seeing you',
    AUTHOR: process.env.AUTHOR || 'ᴛᴏxɪᴄ-ᴋɪᴄʜᴜ🛜❤️!',
    SUDO: process.env.SUDO || '919633687665,919496966726,27717152648',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || '',
    HEROKU_API_KEY: process.env.HEROKU_API_KEY || '',
    OWNER_NAME: process.env.OWNER_NAME || 'TOXIC-BROTHERS',
    BOT_NAME: process.env.BOT_NAME || 'USER-BOT!',
    WORK_TYPE: process.env.WORK_TYPE || 'public',
    DATABASE_URL: DATABASE_URL,
    DATABASE: DATABASE_URL === './assets/database.db'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    }): new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: {
                require: true, rejectUnauthorized: false
            },
        },
        logging: false,
    }),
};
