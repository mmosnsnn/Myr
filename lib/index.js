const {
    command,
    commands
} = require("./plugins");
let config = require('../config')
const {
    getBuffer,
    decodeJid,
    parseJid,
    parsedJid,
    getJson,
    isIgUrl,
    isUrl,
    getUrl,
    qrcode,
    secondsToDHMS,
    formatBytes,
    sleep,
    clockString,
    runtime,
    AddMp3Meta,
    Mp3Cutter,
    Bitly,
    isNumber,
    getRandom,
    findMusic,
    isAdmin,
} = require("./functions");
const {
    serialize,
    downloadMedia
} = require("./serialize");
const Greetings = require("./Greetings");
module.exports = {
    isPrivate: config.WORK_TYPE.toLowerCase() === "private",
    Greetings,
    isAdmin,
    serialize,
    downloadMedia,
    command,
    commands,
    getBuffer,
    decodeJid,
    parseJid,
    parsedJid,
    getJson,
    isIgUrl,
    isUrl,
    getUrl,
    qrcode,
    secondsToDHMS,
    formatBytes,
    sleep,
    clockString,
    runtime,
    AddMp3Meta,
    Mp3Cutter,
    Bitly,
    isNumber,
    getRandom,
    findMusic,
};