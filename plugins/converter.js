const {
    command,
    isPrivate
} = require("../lib/")
const googleTTS = require("google-tts-api");

command(
    {
        pattern: "tts",
        fromMe: isPrivate,
        desc: "text to speech.",
        category: "converter",
    },
    async (message, match,m) => {
        if (!match) {
            message.reply('Where is the text?')
        } else {
            const audio = googleTTS.getAudioUrl(`${match}`, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            })
            message.client.sendMessage(message.jid, {
                audio: {
                    url: audio,
                },
                mimetype: 'audio/mp4',
                ptt: false,
                fileName: `${match}.mp3`,
            }, {
                quoted: m,
            })
        }
    });
